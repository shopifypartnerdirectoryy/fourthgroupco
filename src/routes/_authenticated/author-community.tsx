import { createFileRoute, Link } from "@tanstack/react-router";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { COMMUNITY_CATEGORIES, categoryLabel } from "@/data/community";

export const Route = createFileRoute("/_authenticated/author-community")({
  staticData: { sitemap: false },
  head: () => ({ meta: [
    { title: "Author Community | Fourth Group & Co" }, { name: "description", content: "Members-only discussion rooms." },
    { property: "og:title", content: "Author Community | Fourth Group & Co" }, { property: "og:description", content: "Members-only discussion rooms." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex, nofollow" },
  ] }),
  component: CommunityPage,
});

const PAGE = 25;
type Post = { id: string; author_id: string; author_name: string; author_badge: string; category: string; title: string; body: string; pinned: boolean; hidden: boolean; reply_count: number; created_at: string };

function Badge({ b }: { b: string }) {
  if (b === "member") return null;
  const label = b === "pro" ? "Pro Member" : b === "moderator" ? "Moderator" : "Admin";
  return <span className="ml-2 rounded-sm bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">{label}</span>;
}

function CommunityPage() {
  const { user } = Route.useRouteContext();
  const access = useQuery({
    queryKey: ["community-access", user.id],
    queryFn: async () => {
      const [m, p, s] = await Promise.all([
        supabase.rpc("has_member_access", { _uid: user.id }), supabase.rpc("has_pro", { _uid: user.id }), supabase.rpc("is_staff", { _uid: user.id }),
      ]);
      return { member: !!m.data, pro: !!p.data, staff: !!s.data };
    },
  });
  if (access.isLoading) return <PageShell><p className="p-12 text-center text-sm">Checking your membership…</p></PageShell>;
  if (!access.data?.member) return (
    <PageShell>
      <PageHeader kicker="Members only" title="The Author Community" intro="This room opens once your paid membership is active." />
      <div className="mx-auto flex max-w-3xl flex-wrap gap-3 px-5 py-12">
        <Button asChild><Link to="/membership">Become a member</Link></Button>
        <Button asChild variant="outline"><Link to="/community">Preview the community</Link></Button>
      </div>
    </PageShell>
  );
  return <Board userId={user.id} {...access.data} />;
}

function Board({ userId, pro, staff }: { userId: string; pro: boolean; staff: boolean }) {
  const qc = useQueryClient();
  const [cat, setCat] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const posts = useInfiniteQuery({
    queryKey: ["community", cat],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      let q = supabase.from("community_posts").select("*").order("pinned", { ascending: false }).order("created_at", { ascending: false }).range(pageParam, pageParam + PAGE - 1);
      if (cat !== "all") q = q.eq("category", cat);
      const { data, error } = await q; if (error) throw error; return data as Post[];
    },
    getNextPageParam: (last, all) => (last.length === PAGE ? all.length * PAGE : undefined),
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
      <PageHeader kicker="Members" title="The Author Community" intro="Share drafts, submission news and launch plans with fellow members. Please read the community guidelines." />
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Rooms" className="flex flex-wrap gap-2 lg:flex-col">
          <Button variant={cat === "all" ? "default" : "ghost"} className="justify-start" onClick={() => setCat("all")}>All rooms</Button>
          {cats.map((c) => <Button key={c.key} variant={cat === c.key ? "default" : "ghost"} className="justify-start" onClick={() => setCat(c.key)}>{c.label}</Button>)}
        </nav>
        <div>
          <NewPost userId={userId} cats={cats.filter((c) => c.key !== "announcements" || staff)} staff={staff} defaultCat={cat} />
          {posts.isLoading ? <p className="py-8 text-sm text-muted-foreground">Loading posts…</p> : null}
          {!posts.isLoading && !list.length ? <p className="py-8 text-sm text-muted-foreground">No posts here yet — start the first conversation.</p> : null}
          <ul className="mt-6 divide-y divide-border">
            {list.map((p) => (
              <li key={p.id} className="py-5">
                <button type="button" className="text-left" onClick={() => setOpenId(openId === p.id ? null : p.id)}>
                  <p className="text-xs uppercase tracking-wider text-primary">{p.pinned ? "Pinned · " : ""}{categoryLabel(p.category)}{p.hidden ? " · Hidden" : ""}</p>
                  <h3 className="mt-1 font-serif text-xl text-foreground">{p.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.author_name}<Badge b={p.author_badge} /> · {new Date(p.created_at).toLocaleDateString()} · {p.reply_count} {p.reply_count === 1 ? "reply" : "replies"}</p>
                </button>
                {openId === p.id ? <Thread post={p} userId={userId} staff={staff} /> : null}
                <div className="mt-2 flex flex-wrap gap-2">
                  {staff ? <>
                    <Button size="sm" variant="ghost" onClick={() => mod.mutate({ id: p.id, patch: { pinned: !p.pinned } })}>{p.pinned ? "Unpin" : "Pin"}</Button>
                    <Button size="sm" variant="ghost" onClick={() => mod.mutate({ id: p.id, patch: { hidden: !p.hidden } })}>{p.hidden ? "Unhide" : "Hide"}</Button>
                  </> : null}
                  {staff || p.author_id === userId ? <Button size="sm" variant="ghost" onClick={() => { if (confirm("Delete this post?")) mod.mutate({ id: p.id, del: true }); }}>Delete</Button> : null}
                </div>
              </li>
            ))}
          </ul>
          {posts.hasNextPage ? <Button variant="outline" onClick={() => posts.fetchNextPage()} disabled={posts.isFetchingNextPage}>Load more</Button> : null}
        </div>
      </div>
    </PageShell>
  );
}

function NewPost({ userId, cats, staff, defaultCat }: { userId: string; cats: readonly { key: string; label: string }[]; staff: boolean; defaultCat: string }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ name: "", category: "", title: "", body: "" });
  const save = useMutation({
    mutationFn: async () => {
      const category = f.category || (defaultCat !== "all" && cats.some((c) => c.key === defaultCat) ? defaultCat : "introductions");
      if (f.name.trim().length < 1 || f.title.trim().length < 3 || !f.body.trim()) throw new Error("Please add your display name, a title (3+ characters) and your post.");
      const { error } = await supabase.from("community_posts").insert({ author_id: userId, author_name: f.name.trim().slice(0, 80), category, title: f.title.trim().slice(0, 160), body: f.body.trim().slice(0, 10000) });
      if (error) throw new Error(error.message.includes("too quickly") ? error.message : "Could not publish your post.");
    },
    onSuccess: () => { setF({ ...f, title: "", body: "" }); setOpen(false); qc.invalidateQueries({ queryKey: ["community"] }); toast.success("Posted"); },
    onError: (e) => toast.error(e.message),
  });
  if (!open) return <Button onClick={() => setOpen(true)}>Start a conversation</Button>;
  const submit = (e: FormEvent) => { e.preventDefault(); save.mutate(); };
  return (
    <form onSubmit={submit} className="grid gap-3 rounded-sm border border-border bg-card p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <Input placeholder="Display name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} maxLength={80} />
        <select aria-label="Room" className="h-9 rounded-md border border-input bg-background px-2 text-sm" value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })}>
          <option value="">Choose a room</option>
          {cats.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
        </select>
      </div>
      <Input placeholder="Title" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} maxLength={160} />
      <Textarea placeholder="What would you like to share?" rows={5} value={f.body} onChange={(e) => setF({ ...f, body: e.target.value })} maxLength={10000} />
      <div className="flex gap-2"><Button type="submit" disabled={save.isPending}>Publish</Button><Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button></div>
      {staff ? <p className="text-xs text-muted-foreground">As staff you can post in Announcements.</p> : null}
    </form>
  );
}

function Thread({ post, userId, staff }: { post: Post; userId: string; staff: boolean }) {
  const qc = useQueryClient();
  const replies = useQuery({
    queryKey: ["replies", post.id],
    queryFn: async () => { const { data, error } = await supabase.from("community_replies").select("*").eq("post_id", post.id).order("created_at").limit(500); if (error) throw error; return data; },
  });
  const [name, setName] = useState(""); const [body, setBody] = useState("");
  const send = useMutation({
    mutationFn: async () => {
      if (!name.trim() || !body.trim()) throw new Error("Add your display name and a reply.");
      const { error } = await supabase.from("community_replies").insert({ post_id: post.id, author_id: userId, author_name: name.trim().slice(0, 80), body: body.trim().slice(0, 5000) });
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
              {staff || r.author_id === userId ? <button type="button" className="ml-2 underline" onClick={() => del.mutate(r.id)}>delete</button> : null}</p>
            <p className="whitespace-pre-wrap">{r.body}</p>
          </li>
        ))}
      </ul>
      <form className="mt-3 grid gap-2" onSubmit={(e) => { e.preventDefault(); send.mutate(); }}>
        <Input placeholder="Display name" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
        <Textarea placeholder="Write a reply" rows={2} value={body} onChange={(e) => setBody(e.target.value)} maxLength={5000} />
        <Button type="submit" size="sm" disabled={send.isPending} className="w-fit">Reply</Button>
      </form>
    </div>
  );
}
