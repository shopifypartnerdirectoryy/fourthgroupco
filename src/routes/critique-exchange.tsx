import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Flag } from "lucide-react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";
import { SPOTLIGHT_GENRES } from "@/data/policies";

export const Route = createFileRoute("/critique-exchange")({
  staticData: { sitemap: true },
  head: () => ({
    links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/critique-exchange" }],
    meta: [
      { title: "Peer Critique & Beta-Reader Exchange | Fourth Group & Co" },
      { name: "description", content: "Find critique partners and beta readers by genre, form and experience. Members-only, with contact details shared only after both sides agree." },
      { property: "og:title", content: "Peer Critique & Beta-Reader Exchange | Fourth Group & Co" },
      { property: "og:description", content: "Find critique partners and beta readers who read your genre." },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "https://fourthgroupco.lovable.app/critique-exchange" },
    ],
  }),
  component: Page,
});

const FORMS = ["Novel", "Short story", "Poetry", "Memoir", "Screenplay", "Non-fiction"];
const ROLE_LABEL: Record<string, string> = { writer: "Seeking readers", beta_reader: "Beta reader", both: "Writer & reader" };

function Page() {
  const { user, ready } = useSession();
  return (
    <PageShell>
      <PageHeader kicker="Community" title="Peer critique & beta-reader exchange" intro="Find careful readers for your work, and read for others. Contact details are only shared once both members agree." />
      <div className="mx-auto max-w-6xl px-5 py-12">
        <ul className="mb-10 grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
          <li className="border-l-2 border-primary pl-4"><strong className="block text-foreground">1. Create a reader profile</strong>Say what you write, what you read and what you need.</li>
          <li className="border-l-2 border-primary pl-4"><strong className="block text-foreground">2. Send a request</strong>Describe your project briefly. Never paste your manuscript here.</li>
          <li className="border-l-2 border-primary pl-4"><strong className="block text-foreground">3. Agree and connect</strong>Once accepted, both members see each other’s email to arrange the exchange.</li>
        </ul>
        {!ready ? <p className="text-sm">Loading…</p> : user ? <Exchange uid={user.id} /> : (
          <div className="border border-dashed border-border p-10 text-center">
            <p className="font-serif text-2xl text-foreground">Members only</p>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to browse reader profiles and send critique requests.</p>
            <Button asChild className="mt-5"><Link to="/auth" search={{ redirect: "/critique-exchange" }}>Sign in or create an account</Link></Button>
          </div>
        )}
      </div>
    </PageShell>
  );
}

function Exchange({ uid }: { uid: string }) {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["critique", uid],
    queryFn: async () => {
      const [profiles, requests] = await Promise.all([
        supabase.from("critique_profiles").select("*").order("updated_at", { ascending: false }).limit(200),
        supabase.from("critique_requests").select("*").order("created_at", { ascending: false }),
      ]);
      if (profiles.error) throw profiles.error;
      return { profiles: profiles.data, requests: requests.data ?? [] };
    },
  });
  const refresh = () => qc.invalidateQueries({ queryKey: ["critique", uid] });
  const mine = data?.profiles.find((p) => p.user_id === uid);
  const names = useMemo(() => Object.fromEntries((data?.profiles ?? []).map((p) => [p.user_id, p.display_name])), [data]);

  const [genre, setGenre] = useState("all");
  const [form, setForm] = useState("all");
  const [role, setRole] = useState("all");
  const others = (data?.profiles ?? []).filter((p) => p.user_id !== uid && p.open_to_requests &&
    (genre === "all" || p.genres.includes(genre)) && (form === "all" || p.forms.includes(form)) && (role === "all" || p.role === role || p.role === "both"));

  return (
    <div className="grid gap-10 lg:grid-cols-[22rem_1fr]">
      <aside className="space-y-8">
        <ProfileForm uid={uid} existing={mine} onSaved={refresh} />
        <Requests uid={uid} requests={data?.requests ?? []} names={names} onChange={refresh} />
      </aside>
      <section>
        <div className="grid gap-3 sm:grid-cols-3">
          <select aria-label="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} className="h-10 rounded-sm border border-input bg-card px-2 text-sm"><option value="all">All genres</option>{SPOTLIGHT_GENRES.map((g) => <option key={g}>{g}</option>)}</select>
          <select aria-label="Form" value={form} onChange={(e) => setForm(e.target.value)} className="h-10 rounded-sm border border-input bg-card px-2 text-sm"><option value="all">All forms</option>{FORMS.map((g) => <option key={g}>{g}</option>)}</select>
          <select aria-label="Role" value={role} onChange={(e) => setRole(e.target.value)} className="h-10 rounded-sm border border-input bg-card px-2 text-sm"><option value="all">Everyone</option><option value="beta_reader">Beta readers</option><option value="writer">Writers seeking readers</option></select>
        </div>
        <p className="py-4 text-xs uppercase text-muted-foreground" aria-live="polite">{others.length} member{others.length === 1 ? "" : "s"}</p>
        {others.length === 0 ? <p className="border border-dashed border-border p-10 text-center text-sm text-muted-foreground">No matching members yet. Create your profile so others can find you.</p> : (
          <div className="grid gap-4 md:grid-cols-2">
            {others.map((p) => <ProfileCard key={p.id} p={p} canRequest={!!mine} uid={uid} onSent={refresh} />)}
          </div>
        )}
      </section>
    </div>
  );
}

type Profile = NonNullable<Awaited<ReturnType<typeof getProfileType>>>;
async function getProfileType() { return (await supabase.from("critique_profiles").select("*").single()).data; }

function ProfileForm({ uid, existing, onSaved }: { uid: string; existing: Profile | undefined; onSaved: () => void }) {
  const [v, setV] = useState({ display_name: "", role: "both", experience: "emerging", bio: "", looking_for: "", genres: [] as string[], forms: [] as string[], open_to_requests: true });
  useEffect(() => { if (existing) setV({ display_name: existing.display_name, role: existing.role, experience: existing.experience, bio: existing.bio ?? "", looking_for: existing.looking_for ?? "", genres: existing.genres, forms: existing.forms, open_to_requests: existing.open_to_requests }); }, [existing]);
  const toggle = (k: "genres" | "forms", x: string) => setV((s) => ({ ...s, [k]: s[k].includes(x) ? s[k].filter((y) => y !== x) : [...s[k], x].slice(0, k === "genres" ? 8 : 6) }));
  async function save(e: FormEvent) {
    e.preventDefault();
    if (v.display_name.trim().length < 2) return void toast.error("Please add a display name.");
    const row = { ...v, user_id: uid, display_name: v.display_name.trim(), bio: v.bio || null, looking_for: v.looking_for || null, updated_at: new Date().toISOString() };
    const { error } = await supabase.from("critique_profiles").upsert(row, { onConflict: "user_id" });
    if (error) toast.error("Could not save your profile."); else { toast.success("Profile saved"); onSaved(); }
  }
  return (
    <form onSubmit={save} className="grid gap-3 rounded-sm border border-border bg-card p-5 text-sm">
      <h2 className="font-serif text-xl text-card-foreground">{existing ? "Your reader profile" : "Create your reader profile"}</h2>
      <Label>Display name<Input className="mt-1" maxLength={80} value={v.display_name} onChange={(e) => setV({ ...v, display_name: e.target.value })} /></Label>
      <Label>I am<select className="mt-1 h-9 w-full rounded-sm border border-input bg-background px-2" value={v.role} onChange={(e) => setV({ ...v, role: e.target.value })}><option value="both">A writer and a reader</option><option value="writer">A writer seeking readers</option><option value="beta_reader">A beta reader</option></select></Label>
      <Label>Experience<select className="mt-1 h-9 w-full rounded-sm border border-input bg-background px-2" value={v.experience} onChange={(e) => setV({ ...v, experience: e.target.value })}><option value="emerging">Emerging</option><option value="developing">Developing</option><option value="published">Published</option></select></Label>
      <fieldset><legend className="text-xs font-medium">Genres (up to 8)</legend><div className="mt-1 flex flex-wrap gap-1">{SPOTLIGHT_GENRES.map((g) => <button type="button" key={g} aria-pressed={v.genres.includes(g)} onClick={() => toggle("genres", g)} className={`rounded-sm border px-2 py-0.5 text-[11px] ${v.genres.includes(g) ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{g}</button>)}</div></fieldset>
      <fieldset><legend className="text-xs font-medium">Forms</legend><div className="mt-1 flex flex-wrap gap-1">{FORMS.map((g) => <button type="button" key={g} aria-pressed={v.forms.includes(g)} onClick={() => toggle("forms", g)} className={`rounded-sm border px-2 py-0.5 text-[11px] ${v.forms.includes(g) ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{g}</button>)}</div></fieldset>
      <Label>About you<Textarea className="mt-1" maxLength={1000} value={v.bio} onChange={(e) => setV({ ...v, bio: e.target.value })} /></Label>
      <Label>What I’m looking for<Textarea className="mt-1" maxLength={500} value={v.looking_for} onChange={(e) => setV({ ...v, looking_for: e.target.value })} /></Label>
      <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={v.open_to_requests} onChange={(e) => setV({ ...v, open_to_requests: e.target.checked })} /> Show my profile and accept requests</label>
      <Button type="submit" size="sm">Save profile</Button>
    </form>
  );
}

function ProfileCard({ p, canRequest, uid, onSent }: { p: Profile; canRequest: boolean; uid: string; onSent: () => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const send = useMutation({
    mutationFn: async () => {
      if (!title.trim() || msg.trim().length < 10) throw new Error("fields");
      const { error } = await supabase.from("critique_requests").insert({ requester_id: uid, recipient_id: p.user_id, project_title: title.trim(), message: msg.trim() });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Request sent"); setOpen(false); setTitle(""); setMsg(""); onSent(); },
    onError: (e: { message?: string; code?: string }) => toast.error(e.message === "fields" ? "Add a project title and a short message (10+ characters)." : e.code === "23505" ? "You already have a pending request with this member." : "Could not send the request."),
  });
  return (
    <article className="rounded-sm border border-border bg-card p-5 text-sm">
      <div className="flex items-start justify-between gap-2"><h3 className="font-serif text-lg text-card-foreground">{p.display_name}</h3><span className="text-[10px] font-semibold uppercase text-primary">{ROLE_LABEL[p.role]}</span></div>
      <p className="mt-1 text-xs capitalize text-muted-foreground">{p.experience} · {[...p.forms, ...p.genres].join(" · ") || "Open to all"}</p>
      {p.bio ? <p className="mt-3 text-muted-foreground">{p.bio}</p> : null}
      {p.looking_for ? <p className="mt-2 text-xs"><strong>Looking for:</strong> {p.looking_for}</p> : null}
      {canRequest ? (open ? (
        <form className="mt-3 grid gap-2" onSubmit={(e) => { e.preventDefault(); send.mutate(); }}>
          <Input placeholder="Project title" maxLength={200} value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea placeholder="Briefly describe the project and the feedback you want. Don’t paste your manuscript." maxLength={1500} value={msg} onChange={(e) => setMsg(e.target.value)} />
          <div className="flex gap-2"><Button size="sm" type="submit" disabled={send.isPending}>Send request</Button><Button size="sm" type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button></div>
        </form>
      ) : <Button size="sm" variant="outline" className="mt-3" onClick={() => setOpen(true)}>Request a critique swap</Button>) : <p className="mt-3 text-xs text-muted-foreground">Create your profile to send requests.</p>}
    </article>
  );
}

type Req = { id: string; requester_id: string; recipient_id: string; project_title: string; message: string; status: string; reported: boolean; created_at: string };
function Requests({ uid, requests, names, onChange }: { uid: string; requests: Req[]; names: Record<string, string>; onChange: () => void }) {
  const [emails, setEmails] = useState<Record<string, string>>({});
  async function setStatus(id: string, patch: Partial<Req>) {
    const { error } = await supabase.from("critique_requests").update({ ...patch, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) toast.error("Could not update."); else { toast.success("Updated"); onChange(); }
  }
  async function reveal(id: string) {
    const { data, error } = await supabase.rpc("critique_contact", { _request_id: id });
    if (error || !data) toast.error("Contact not available."); else setEmails((e) => ({ ...e, [id]: data }));
  }
  return (
    <section className="rounded-sm border border-border bg-card p-5 text-sm">
      <h2 className="font-serif text-xl text-card-foreground">Your critique pods</h2>
      {requests.length === 0 ? <p className="mt-2 text-xs text-muted-foreground">No requests yet.</p> : requests.map((r) => {
        const incoming = r.recipient_id === uid; const other = names[incoming ? r.requester_id : r.recipient_id] ?? "A member";
        return (
          <div key={r.id} className="mt-3 border-t border-border pt-3">
            <p className="text-xs text-muted-foreground">{incoming ? `From ${other}` : `To ${other}`} · <span className="capitalize">{r.status}</span></p>
            <p className="font-semibold">{r.project_title}</p>
            <p className="text-xs text-muted-foreground">{r.message}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {incoming && r.status === "pending" ? <><Button size="sm" onClick={() => setStatus(r.id, { status: "accepted" })}>Accept</Button><Button size="sm" variant="outline" onClick={() => setStatus(r.id, { status: "declined" })}>Decline</Button></> : null}
              {!incoming && r.status === "pending" ? <Button size="sm" variant="outline" onClick={() => setStatus(r.id, { status: "withdrawn" })}>Withdraw</Button> : null}
              {r.status === "accepted" ? <><Button size="sm" variant="outline" onClick={() => reveal(r.id)}>Show contact</Button><Button size="sm" variant="ghost" onClick={() => setStatus(r.id, { status: "completed" })}>Mark complete</Button></> : null}
              {!r.reported ? <button type="button" className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-destructive" onClick={() => confirm("Report this request to Fourth Group & Co staff?") && setStatus(r.id, { reported: true })}><Flag className="size-3" />Report</button> : <span className="text-[11px] text-muted-foreground">Reported to staff</span>}
            </div>
            {emails[r.id] ? <p className="mt-1 text-xs">Contact: <a className="text-primary underline" href={`mailto:${emails[r.id]}`}>{emails[r.id]}</a></p> : null}
          </div>
        );
      })}
    </section>
  );
}
