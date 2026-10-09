import { createFileRoute, Link } from "@tanstack/react-router";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Heart, Bookmark, Share2, Flag, Pencil } from "lucide-react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { COMMUNITY_CATEGORIES, COMMUNITY_BOOKS, bookByKey, categoryLabel } from "@/data/community";
import { CommunityBookCard } from "@/components/community-book-card";

export const Route = createFileRoute("/author-community")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Fourth Group Authors & Readers Community | Fourth Group & Co" }, { name: "description", content: "A place for authors to connect, share experiences, review books, and discuss agents, publishing, marketing, and media." },
    { property: "og:title", content: "Fourth Group Authors & Readers Community | Fourth Group & Co" }, { property: "og:description", content: "Open discussion rooms for authors and readers." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
    { rel: "canonical", href: "https://fourthgroupco.lovable.app/author-community" } as never,
  ] }),
  component: CommunityPage,
});

const PAGE = 20;
type Post = { id: string; author_id: string; author_name: string; author_badge: string; category: string; title: string; body: string; pinned: boolean; hidden: boolean; reply_count: number; like_count: number; created_at: string; book_key: string | null };

function Badge({ b }: { b: string }) {
  if (b === "member") return <span className="ml-2 rounded-sm bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Premium Member</span>;
  const label = b === "pro" ? "Pro Member" : b === "moderator" ? "Moderator" : "Fourth Group Team";
  return <span className="ml-2 rounded-sm bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">{label}</span>;
}

function Avatar({ name }: { name: string }) {
  const initials = name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-serif text-sm text-primary">{initials || "?"}</span>;
}

function CommunityPage() {
  const session = useQuery({
    queryKey: ["community-session"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return { userId: null as string | null, staff: false, pro: false };
      const [p, s] = await Promise.all([
        supabase.rpc("has_pro", { _uid: data.user.id }), supabase.rpc("is_staff", { _uid: data.user.id }),
      ]);
      return { userId: data.user.id as string | null, pro: !!p.data, staff: !!s.data };
    },
    staleTime: 60_000,
  });
  if (session.isLoading) return <PageShell><p className="p-12 text-center text-sm">Loading the community…</p></PageShell>;
  return <Board userId={session.data?.userId ?? null} pro={!!session.data?.pro} staff={!!session.data?.staff} />;
}

function Board({ userId, pro, staff }: { userId: string | null; pro: boolean; staff: boolean }) {
  const qc = useQueryClient();
  const [cat, setCat] = useState<string>("all");
  const [sort, setSort] = useState<"latest" | "trending">("latest");
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const posts = useInfiniteQuery({
    queryKey: ["community", cat, sort, search],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      let q = supabase.from("community_posts").select("*").range(pageParam, pageParam + PAGE - 1);
      q = sort === "trending"
        ? q.order("like_count", { ascending: false }).order("reply_count", { ascending: false })
        : q.order("pinned", { ascending: false }).order("created_at", { ascending: false });
      if (cat !== "all") q = q.eq("category", cat);
      if (search.trim()) q = q.or(`title.ilike.%${search.trim()}%,body.ilike.%${search.trim()}%,author_name.ilike.%${search.trim()}%`);
      const { data, error } = await q; if (error) throw error; return data as Post[];
    },
    getNextPageParam: (last, all) => (last.length === PAGE ? all.length * PAGE : undefined),
  });

  const activity = useQuery({
    queryKey: ["community-activity"],
    queryFn: async () => {
      const since = new Date(Date.now() - 7 * 864e5).toISOString();
      const { data } = await supabase.from("community_posts").select("author_name, author_badge").gte("created_at", since).limit(500);
      const counts = new Map<string, { name: string; badge: string; n: number }>();
      for (const r of data ?? []) {
        const e = counts.get(r.author_name) ?? { name: r.author_name, badge: r.author_badge, n: 0 };
        e.n += 1; counts.set(r.author_name, e);
      }
      return [...counts.values()].sort((a, b) => b.n - a.n).slice(0, 5);
    },
  });

  const totals = useQuery({
    queryKey: ["community-totals"],
    queryFn: async () => {
      const [p, m] = await Promise.all([supabase.rpc("community_post_total"), supabase.rpc("community_member_total")]);
      return { posts: Number(p.data ?? 0), members: Number(m.data ?? 0) };
    },
  });

  const mod = useMutation({
    mutationFn: async ({ id, patch, del }: { id: string; patch?: Record<string, unknown>; del?: boolean }) => {
      const r = del ? await supabase.from("community_posts").delete().eq("id", id) : await supabase.from("community_posts").update(patch as never).eq("id", id);
      if (r.error) throw r.error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["community"] }),
    onError: () => toast.error("That action didn't go through."),
  });

  const cats = COMMUNITY_CATEGORIES.filter((c) => c.key !== "pro" || pro || staff);
  const list = posts.data?.pages.flat() ?? [];

  return (
    <PageShell>
      <PageHeader kicker="Community" title="Fourth Group Authors & Readers Community" intro="A global literary network where writers, screenwriters, and avid readers connect, discover new books, leave reviews, and discuss publishing." />
      <div className="mx-auto flex max-w-7xl flex-wrap gap-4 px-5 pt-8">
        <div className="rounded-sm border border-border bg-card px-5 py-3"><p className="font-serif text-2xl text-card-foreground">{(totals.data?.members ?? 0).toLocaleString()}</p><p className="text-xs uppercase tracking-wider text-muted-foreground">Members</p></div>
        <div className="rounded-sm border border-border bg-card px-5 py-3"><p className="font-serif text-2xl text-card-foreground">{(totals.data?.posts ?? 0).toLocaleString()}</p><p className="text-xs uppercase tracking-wider text-muted-foreground">Discussions & Reviews</p></div>
        <p className="self-center text-xs text-muted-foreground">Live counts — they grow as members join and post.</p>
      </div>
      {!userId ? (
        <div className="mx-auto mt-6 flex max-w-7xl flex-wrap items-center gap-3 rounded-sm border border-primary/30 bg-primary/5 px-5 py-4 lg:mx-auto lg:max-w-7xl mx-5">
          <p className="text-sm text-foreground">You're reading as a guest. Sign in free to post, reply, like and save discussions.</p>
          <Button asChild size="sm"><Link to="/auth" search={{ redirect: "/author-community" }}>Sign in or create a free account</Link></Button>
        </div>
      ) : null}
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[220px_1fr_260px]">
        {/* Left sidebar */}
        <nav aria-label="Rooms" className="flex flex-wrap gap-2 lg:flex-col">
          <Button variant={cat === "all" && sort === "latest" ? "default" : "ghost"} className="justify-start" onClick={() => { setCat("all"); setSort("latest"); }}>Latest Posts</Button>
          <Button variant={sort === "trending" ? "default" : "ghost"} className="justify-start" onClick={() => { setCat("all"); setSort("trending"); }}>Trending</Button>
          {cats.map((c) => <Button key={c.key} variant={cat === c.key ? "default" : "ghost"} className="justify-start" onClick={() => { setCat(c.key); setSort("latest"); }}>{c.label}</Button>)}
        </nav>

        {/* Main feed */}
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Input placeholder="Search titles, authors, posts…" value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" aria-label="Search posts" />
            {userId ? <NewPost userId={userId} cats={cats.filter((c) => c.key !== "announcements" || staff)} staff={staff} defaultCat={cat} /> : null}
          </div>
          {posts.isLoading ? <p className="py-8 text-sm text-muted-foreground">Loading posts…</p> : null}
          {!posts.isLoading && !list.length ? <p className="py-8 text-sm text-muted-foreground">No posts here yet — start the first conversation.</p> : null}
          <ul className="divide-y divide-border">
            {list.map((p) => (
              <PostRow key={p.id} post={p} userId={userId} staff={staff} open={openId === p.id}
                onToggle={() => setOpenId(openId === p.id ? null : p.id)}
                onMod={(patch, del) => mod.mutate(del ? { id: p.id, del } : { id: p.id, patch: patch ?? {} })} />
            ))}
          </ul>
          {posts.hasNextPage ? <Button variant="outline" className="mt-4" onClick={() => posts.fetchNextPage()} disabled={posts.isFetchingNextPage}>Load more</Button> : null}
        </div>

        {/* Right sidebar */}
        <aside className="space-y-8">
          <section className="rounded-sm border border-border bg-card p-5">
            <h2 className="font-serif text-lg text-card-foreground">Most active this week</h2>
            {activity.isLoading ? <p className="mt-2 text-xs text-muted-foreground">Loading…</p> : null}
            {!activity.isLoading && !activity.data?.length ? <p className="mt-2 text-xs text-muted-foreground">No activity yet this week — be the first to post.</p> : null}
            <ul className="mt-3 space-y-2">
              {(activity.data ?? []).map((a) => (
                <li key={a.name} className="flex items-center gap-2 text-sm">
                  <Avatar name={a.name} />
                  <span className="text-foreground">{a.name}<Badge b={a.badge} /></span>
                  <span className="ml-auto text-xs text-muted-foreground">{a.n} {a.n === 1 ? "post" : "posts"}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-sm border border-border bg-card p-5">
            <h2 className="font-serif text-lg text-card-foreground">Member resources</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/literary-agents" className="text-primary underline-offset-4 hover:underline">Literary Agents Directory</Link></li>
              <li><Link to="/small-presses" className="text-primary underline-offset-4 hover:underline">Publisher List</Link></li>
              <li><Link to="/search-pitches" className="text-primary underline-offset-4 hover:underline">Screen Pitches</Link></li>
              <li><Link to="/critique-exchange" className="text-primary underline-offset-4 hover:underline">Critique Exchange</Link></li>
              <li><Link to="/grants-awards" className="text-primary underline-offset-4 hover:underline">Grants & Awards</Link></li>
              <li><Link to="/community-guidelines" className="text-primary underline-offset-4 hover:underline">Community Guidelines</Link></li>
            </ul>
          </section>
        </aside>
      </div>
    </PageShell>
  );
}

function PostRow({ post: p, userId, staff, open, onToggle, onMod }: {
  post: Post; userId: string | null; staff: boolean; open: boolean;
  onToggle: () => void; onMod: (patch?: Record<string, unknown>, del?: boolean) => void;
}) {
  const qc = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ title: p.title, body: p.body });
  const [reporting, setReporting] = useState(false);
  const [reason, setReason] = useState("");

  const state = useQuery({
    queryKey: ["post-state", p.id, userId],
    enabled: !!userId,
    queryFn: async () => {
      const [l, b] = await Promise.all([
        supabase.from("community_likes").select("id").eq("post_id", p.id).eq("user_id", userId!).maybeSingle(),
        supabase.from("community_bookmarks").select("id").eq("post_id", p.id).eq("user_id", userId!).maybeSingle(),
      ]);
      return { liked: !!l.data, saved: !!b.data };
    },
  });

  const act = useMutation({
    mutationFn: async ({ kind, on }: { kind: "like" | "bookmark"; on: boolean }) => {
      const table = kind === "like" ? "community_likes" : "community_bookmarks";
      const r = on
        ? await supabase.from(table).insert({ post_id: p.id, user_id: userId! })
        : await supabase.from(table).delete().eq("post_id", p.id).eq("user_id", userId!);
      if (r.error) throw r.error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["post-state", p.id] }); qc.invalidateQueries({ queryKey: ["community"] }); },
    onError: () => toast.error("That action didn't go through."),
  });

  const edit = useMutation({
    mutationFn: async () => {
      if (draft.title.trim().length < 3 || !draft.body.trim()) throw new Error("Title (3+ characters) and body are required.");
      const { error } = await supabase.from("community_posts").update({ title: draft.title.trim().slice(0, 160), body: draft.body.trim().slice(0, 10000) }).eq("id", p.id);
      if (error) throw new Error("Could not save your changes.");
    },
    onSuccess: () => { setEditing(false); qc.invalidateQueries({ queryKey: ["community"] }); toast.success("Post updated"); },
    onError: (e) => toast.error(e.message),
  });

  const report = useMutation({
    mutationFn: async () => {
      if (reason.trim().length < 5) throw new Error("Tell us briefly what's wrong (5+ characters).");
      const { error } = await supabase.from("community_reports").insert({ post_id: p.id, reporter_id: userId!, reason: reason.trim().slice(0, 500) });
      if (error) throw new Error("Could not send your report.");
    },
    onSuccess: () => { setReporting(false); setReason(""); toast.success("Report sent to the moderators"); },
    onError: (e) => toast.error(e.message),
  });

  const share = async () => {
    const url = `${window.location.origin}/author-community#post-${p.id}`;
    try { await navigator.clipboard.writeText(url); toast.success("Link copied"); }
    catch { toast.error("Could not copy the link."); }
  };

  const liked = state.data?.liked ?? false;
  const saved = state.data?.saved ?? false;

  return (
    <li className="py-5" id={`post-${p.id}`}>
      <div className="flex gap-3">
        <Avatar name={p.author_name} />
        <div className="min-w-0 flex-1">
          <button type="button" className="w-full text-left" onClick={onToggle}>
            <p className="text-xs uppercase tracking-wider text-primary">{p.pinned ? "Pinned · " : ""}{categoryLabel(p.category)}{p.hidden ? " · Hidden" : ""}</p>
            <h3 className="mt-1 font-serif text-xl text-foreground">{p.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{p.author_name}<Badge b={p.author_badge} /> · {new Date(p.created_at).toLocaleDateString()}</p>
          </button>

          {editing ? (
            <form className="mt-3 grid gap-2" onSubmit={(e) => { e.preventDefault(); edit.mutate(); }}>
              <Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} maxLength={160} aria-label="Edit title" />
              <Textarea rows={4} value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} maxLength={10000} aria-label="Edit post" />
              <div className="flex gap-2"><Button type="submit" size="sm" disabled={edit.isPending}>Save</Button><Button type="button" size="sm" variant="ghost" onClick={() => setEditing(false)}>Cancel</Button></div>
            </form>
          ) : null}

          {bookByKey(p.book_key) ? <CommunityBookCard book={bookByKey(p.book_key)!} /> : null}
          {open && !editing ? <Thread post={p} userId={userId} staff={staff} /> : null}

          <div className="mt-2 flex flex-wrap items-center gap-1">
            {userId ? (
              <Button size="sm" variant="ghost" onClick={() => act.mutate({ kind: "like", on: !liked })} aria-pressed={liked}>
                <Heart className={`mr-1 size-4 ${liked ? "fill-primary text-primary" : ""}`} />{p.like_count}
              </Button>
            ) : (
              <span className="inline-flex items-center px-2 text-sm text-muted-foreground"><Heart className="mr-1 size-4" />{p.like_count}</span>
            )}
            <Button size="sm" variant="ghost" onClick={onToggle}>{p.reply_count} {p.reply_count === 1 ? "reply" : "replies"}</Button>
            {userId ? (
              <Button size="sm" variant="ghost" onClick={() => act.mutate({ kind: "bookmark", on: !saved })} aria-pressed={saved}>
                <Bookmark className={`mr-1 size-4 ${saved ? "fill-primary text-primary" : ""}`} />{saved ? "Saved" : "Save"}
              </Button>
            ) : null}
            <Button size="sm" variant="ghost" onClick={share}><Share2 className="mr-1 size-4" />Share</Button>
            {userId && p.author_id !== userId ? <Button size="sm" variant="ghost" onClick={() => setReporting(!reporting)}><Flag className="mr-1 size-4" />Report</Button> : null}
            {userId && p.author_id === userId && !editing ? <Button size="sm" variant="ghost" onClick={() => setEditing(true)}><Pencil className="mr-1 size-4" />Edit</Button> : null}
            {staff ? <>
              <Button size="sm" variant="ghost" onClick={() => onMod({ pinned: !p.pinned })}>{p.pinned ? "Unpin" : "Pin"}</Button>
              <Button size="sm" variant="ghost" onClick={() => onMod({ hidden: !p.hidden })}>{p.hidden ? "Unhide" : "Hide"}</Button>
            </> : null}
            {staff || (userId && p.author_id === userId) ? <Button size="sm" variant="ghost" onClick={() => { if (confirm("Delete this post?")) onMod(undefined, true); }}>Delete</Button> : null}
          </div>

          {reporting ? (
            <form className="mt-2 flex flex-wrap gap-2" onSubmit={(e) => { e.preventDefault(); report.mutate(); }}>
              <Input placeholder="What's wrong with this post?" value={reason} onChange={(e) => setReason(e.target.value)} maxLength={500} className="max-w-sm" aria-label="Report reason" />
              <Button type="submit" size="sm" disabled={report.isPending}>Send report</Button>
            </form>
          ) : null}
        </div>
      </div>
    </li>
  );
}

function NewPost({ userId, cats, staff, defaultCat }: { userId: string; cats: readonly { key: string; label: string }[]; staff: boolean; defaultCat: string }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ name: "", category: "", title: "", body: "", book: "" });
  const save = useMutation({
    mutationFn: async () => {
      const category = f.category || (defaultCat !== "all" && cats.some((c) => c.key === defaultCat) ? defaultCat : "discussions");
      if (f.name.trim().length < 1 || f.title.trim().length < 3 || !f.body.trim()) throw new Error("Please add your display name, a title (3+ characters) and your post.");
      const { error } = await supabase.from("community_posts").insert({ author_id: userId, author_name: f.name.trim().slice(0, 80), category, title: f.title.trim().slice(0, 160), body: f.body.trim().slice(0, 10000), book_key: f.book || null });
      if (error) throw new Error(error.message.includes("too quickly") ? error.message : "Could not publish your post.");
    },
    onSuccess: () => { setF({ ...f, title: "", body: "", book: "" }); setOpen(false); qc.invalidateQueries({ queryKey: ["community"] }); toast.success("Posted"); },
    onError: (e) => toast.error(e.message),
  });
  if (!open) return <Button onClick={() => setOpen(true)}>Create Post</Button>;
  const submit = (e: FormEvent) => { e.preventDefault(); save.mutate(); };
  return (
    <form onSubmit={submit} className="grid w-full gap-3 rounded-sm border border-border bg-card p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <Input placeholder="Display name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} maxLength={80} />
        <select aria-label="Room" className="h-9 rounded-md border border-input bg-background px-2 text-sm" value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })}>
          <option value="">Choose a room</option>
          {cats.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
        </select>
      </div>
      <Input placeholder="Title" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} maxLength={160} />
      <select aria-label="Attach a book" className="h-9 rounded-md border border-input bg-background px-2 text-sm" value={f.book} onChange={(e) => setF({ ...f, book: e.target.value })}>
        <option value="">Attach a book card (optional)</option>
        {COMMUNITY_BOOKS.map((b) => <option key={b.key} value={b.key}>{b.title} — {b.author}</option>)}
      </select>
      <Textarea placeholder="What would you like to share?" rows={5} value={f.body} onChange={(e) => setF({ ...f, body: e.target.value })} maxLength={10000} />
      <div className="flex gap-2"><Button type="submit" disabled={save.isPending}>Publish</Button><Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button></div>
      {staff ? <p className="text-xs text-muted-foreground">As staff you can post in Announcements.</p> : null}
    </form>
  );
}

function Thread({ post, userId, staff }: { post: Post; userId: string | null; staff: boolean }) {
  const qc = useQueryClient();
  const replies = useQuery({
    queryKey: ["replies", post.id],
    queryFn: async () => { const { data, error } = await supabase.from("community_replies").select("*").eq("post_id", post.id).order("created_at").limit(500); if (error) throw error; return data; },
  });
  const [name, setName] = useState(""); const [body, setBody] = useState("");
  const send = useMutation({
    mutationFn: async () => {
      if (!name.trim() || !body.trim()) throw new Error("Add your display name and a reply.");
      const { error } = await supabase.from("community_replies").insert({ post_id: post.id, author_id: userId!, author_name: name.trim().slice(0, 80), body: body.trim().slice(0, 5000) });
      if (error) throw new Error("Could not post your reply.");
    },
    onSuccess: () => { setBody(""); qc.invalidateQueries({ queryKey: ["replies", post.id] }); qc.invalidateQueries({ queryKey: ["community"] }); },
    onError: (e) => toast.error(e.message),
  });
  const del = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("community_replies").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["replies", post.id] }),
  });
  return (
    <div className="mt-3 border-l-2 border-primary/30 pl-4">
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{post.body}</p>
      <ul className="mt-4 space-y-3">
        {(replies.data ?? []).map((r) => (
          <li key={r.id} className="text-sm">
            <p className="text-xs text-muted-foreground">{r.author_name}<Badge b={r.author_badge} /> · {new Date(r.created_at).toLocaleDateString()}
              {staff || (userId && r.author_id === userId) ? <button type="button" className="ml-2 underline" onClick={() => del.mutate(r.id)}>delete</button> : null}</p>
            <p className="whitespace-pre-wrap">{r.body}</p>
          </li>
        ))}
      </ul>
      {userId ? (
        <form className="mt-3 grid gap-2" onSubmit={(e) => { e.preventDefault(); send.mutate(); }}>
          <Input placeholder="Display name" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
          <Textarea placeholder="Write a reply" rows={2} value={body} onChange={(e) => setBody(e.target.value)} maxLength={5000} />
          <Button type="submit" size="sm" disabled={send.isPending} className="w-fit">Reply</Button>
        </form>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">
          <Link to="/auth" search={{ redirect: "/author-community" }} className="text-primary underline-offset-4 hover:underline">Sign in free</Link> to reply to this discussion.
        </p>
      )}
    </div>
  );
}
