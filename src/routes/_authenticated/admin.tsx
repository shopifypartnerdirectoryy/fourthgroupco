import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";

export const Route = createFileRoute("/_authenticated/admin")({
  staticData: { sitemap: false },
  head: () => ({ meta: [
    { title: "Admin | Fourth Group & Co" }, { name: "description", content: "Staff administration." },
    { property: "og:title", content: "Admin | Fourth Group & Co" }, { property: "og:description", content: "Staff administration." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex, nofollow" },
  ] }),
  component: AdminPage,
});

const sel = "h-8 rounded-sm border border-input bg-background px-2 text-xs";

function AdminPage() {
  const { isAdmin, ready } = useSession();
  if (!ready) return <PageShell><p className="p-12 text-center text-sm">Checking access…</p></PageShell>;
  if (!isAdmin) return <PageShell><p className="p-12 text-center text-sm text-muted-foreground">This area is for Fourth Group & Co staff only.</p></PageShell>;
  return (
    <PageShell>
      <PageHeader kicker="Staff" title="Administration" intro="Review requests, approve content and manage memberships. Nothing is published without review." />
      <div className="mx-auto max-w-6xl px-5 py-10">
        <Tabs defaultValue="spotlights">
          <TabsList className="flex h-auto flex-wrap">
            <TabsTrigger value="spotlights">Spotlights</TabsTrigger>
            <TabsTrigger value="claims">Article requests</TabsTrigger>
            <TabsTrigger value="memberships">Memberships</TabsTrigger>
            <TabsTrigger value="refunds">Refunds</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="pitches">Pitches</TabsTrigger>
            <TabsTrigger value="weekly">Weekly spotlights</TabsTrigger>
            <TabsTrigger value="reports">Critique reports</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
          </TabsList>
          <TabsContent value="spotlights"><Spotlights /></TabsContent>
          <TabsContent value="claims"><Claims /></TabsContent>
          <TabsContent value="memberships"><Memberships /></TabsContent>
          <TabsContent value="refunds"><Refunds /></TabsContent>
          <TabsContent value="testimonials"><Testimonials /></TabsContent>
          <TabsContent value="pitches"><Pitches /></TabsContent>
          <TabsContent value="weekly"><Weekly /></TabsContent>
          <TabsContent value="reports"><Reports /></TabsContent>
          <TabsContent value="team"><Team /></TabsContent>
          <TabsContent value="referrals"><Referrals /></TabsContent>
          <TabsContent value="roles"><Roles /></TabsContent>
        </Tabs>
      </div>
    </PageShell>
  );
}

function useTable<T>(key: string, fn: () => PromiseLike<{ data: T[] | null; error: unknown }>) {
  return useQuery({ queryKey: ["admin", key], queryFn: async () => { const { data, error } = await fn(); if (error) throw error; return data ?? []; } });
}
function useUpdate(table: "spotlight_submissions" | "memberships" | "refund_requests" | "testimonials" | "pitches" | "weekly_spotlights" | "critique_requests", key: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Record<string, unknown> }) => {
      const { error } = await supabase.from(table).update(patch as never).eq("id", id); if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin", key] }); toast.success("Updated"); },
    onError: () => toast.error("Update failed"),
  });
}
const Empty = () => <p className="py-8 text-sm text-muted-foreground">Nothing here yet.</p>;
const Row = ({ children }: { children: React.ReactNode }) => <div className="grid gap-2 border-b border-border py-4 text-sm md:grid-cols-[1fr_auto] md:items-start">{children}</div>;

function Spotlights() {
  const { data = [] } = useTable("spotlights", () => supabase.from("spotlight_submissions").select("*").order("created_at", { ascending: false }));
  const up = useUpdate("spotlight_submissions", "spotlights");
  if (!data.length) return <Empty />;
  return <div>{data.map((s) => (
    <Row key={s.id}>
      <div><p className="font-semibold">{s.project_title} <span className="font-normal text-muted-foreground">· {s.genre}</span></p>
        <p className="text-xs text-muted-foreground">{s.full_name} · <a className="underline" href={`mailto:${s.email}`}>{s.email}</a> · {s.created_at.slice(0, 10)}</p>
        <NoteEditor initial={s.admin_notes ?? ""} onSave={(admin_notes) => up.mutate({ id: s.id, patch: { admin_notes: admin_notes || null, updated_at: new Date().toISOString() } })} /></div>
      <select aria-label="Status" className={sel} value={s.status} onChange={(e) => up.mutate({ id: s.id, patch: { status: e.target.value, updated_at: new Date().toISOString() } })}>
        {["new", "in_review", "contacted", "scheduled", "published", "declined"].map((v) => <option key={v} value={v}>{v.replace("_", " ")}</option>)}
      </select>
    </Row>))}</div>;
}

function Claims() {
  const { data = [] } = useTable("claims", () => supabase.from("article_claims").select("*").order("created_at", { ascending: false }));
  if (!data.length) return <Empty />;
  return <div>{data.map((c) => <Row key={c.id}><div><p className="font-semibold">{c.first_name} {c.last_name}</p><p className="text-xs text-muted-foreground"><a className="underline" href={`mailto:${c.email}`}>{c.email}</a> · {c.created_at.slice(0, 10)}</p>{c.story ? <p className="mt-1 text-xs">{c.story}</p> : null}</div></Row>)}</div>;
}

function Memberships() {
  const { data = [] } = useTable("memberships", () => supabase.from("memberships").select("*").order("created_at", { ascending: false }));
  const up = useUpdate("memberships", "memberships");
  if (!data.length) return <Empty />;
  const activate = (id: string) => {
    const start = new Date(); const end = new Date(start); end.setFullYear(end.getFullYear() + 1);
    up.mutate({ id, patch: { status: "active", started_on: start.toISOString().slice(0, 10), expires_on: end.toISOString().slice(0, 10), updated_at: new Date().toISOString() } });
  };
  return <div>{data.map((m) => (
    <Row key={m.id}>
      <div><p className="font-semibold">{m.contact_name ?? `Member ${m.user_id.slice(0, 8)}`} · {m.plan === "pro" ? "Pro" : "Standard"} · {m.status.replace("_", " ")}{m.referral_code ? ` · referral ${m.referral_code}` : ""}</p>
        <p className="text-xs text-muted-foreground">Requested {m.created_at.slice(0, 10)}{m.expires_on ? ` · paid through ${m.expires_on}` : ""}{m.cancel_requested_at ? " · cancellation requested" : ""} · terms {m.terms_version}</p></div>
      <div className="flex flex-wrap gap-2">
        {m.status !== "active" ? <Button size="sm" onClick={() => { if (confirm("Confirm payment was received and activate for 12 months?")) activate(m.id); }}>Confirm payment</Button> : null}
        <select aria-label="Status" className={sel} value={m.status} onChange={(e) => up.mutate({ id: m.id, patch: { status: e.target.value, updated_at: new Date().toISOString() } })}>
          {["pending_payment", "active", "expired", "cancelled", "refunded"].map((v) => <option key={v} value={v}>{v.replace("_", " ")}</option>)}
        </select>
      </div>
    </Row>))}</div>;
}

function Refunds() {
  const { data = [] } = useTable("refunds", () => supabase.from("refund_requests").select("*").order("created_at", { ascending: false }));
  const up = useUpdate("refund_requests", "refunds");
  if (!data.length) return <Empty />;
  return <div>{data.map((r) => (
    <Row key={r.id}>
      <div><p className="font-semibold">Member {r.user_id.slice(0, 8)} · {r.status.replace("_", " ")}</p><p className="mt-1 text-xs">{r.reason}</p>
        <NoteEditor label="Decision notes (visible to member)" initial={r.decision_notes ?? ""} onSave={(decision_notes) => up.mutate({ id: r.id, patch: { decision_notes: decision_notes || null, updated_at: new Date().toISOString() } })} /></div>
      <select aria-label="Status" className={sel} value={r.status} onChange={(e) => up.mutate({ id: r.id, patch: { status: e.target.value, updated_at: new Date().toISOString() } })}>
        {["submitted", "in_review", "approved", "declined"].map((v) => <option key={v} value={v}>{v.replace("_", " ")}</option>)}
      </select>
    </Row>))}</div>;
}

function Testimonials() {
  const qc = useQueryClient();
  const { data = [] } = useTable("testimonials", () => supabase.from("testimonials").select("*").order("created_at", { ascending: false }));
  const up = useUpdate("testimonials", "testimonials");
  const [f, setF] = useState({ member_name: "", specialty: "", quote: "", portrait_url: "", profile_url: "" });
  async function add(e: FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from("testimonials").insert({ member_name: f.member_name.trim(), quote: f.quote.trim(), specialty: f.specialty || null, portrait_url: f.portrait_url || null, profile_url: f.profile_url || null });
    if (error) { toast.error("Check the fields (links must start with https://)."); return; }
    setF({ member_name: "", specialty: "", quote: "", portrait_url: "", profile_url: "" });
    qc.invalidateQueries({ queryKey: ["admin", "testimonials"] }); toast.success("Saved as draft");
  }
  return <div>
    <form onSubmit={add} className="grid gap-2 border-b border-border py-4 md:grid-cols-2">
      <Input required placeholder="Member name" value={f.member_name} onChange={(e) => setF({ ...f, member_name: e.target.value })} />
      <Input placeholder="Genre / specialty" value={f.specialty} onChange={(e) => setF({ ...f, specialty: e.target.value })} />
      <Input placeholder="Portrait URL (https://, with permission)" value={f.portrait_url} onChange={(e) => setF({ ...f, portrait_url: e.target.value })} />
      <Input placeholder="Profile link (https://)" value={f.profile_url} onChange={(e) => setF({ ...f, profile_url: e.target.value })} />
      <Textarea required className="md:col-span-2" placeholder="Their words (only with the member's permission)" value={f.quote} onChange={(e) => setF({ ...f, quote: e.target.value })} />
      <Button type="submit" className="md:w-fit">Add testimonial</Button>
    </form>
    {data.map((t) => <Row key={t.id}><div><p className="font-semibold">{t.member_name}</p><p className="text-xs">{t.quote}</p></div>
      <select aria-label="Status" className={sel} value={t.status} onChange={(e) => up.mutate({ id: t.id, patch: { status: e.target.value } })}>{["draft", "published", "archived"].map((v) => <option key={v}>{v}</option>)}</select></Row>)}
  </div>;
}

function Pitches() {
  const { data = [] } = useTable("pitches", () => supabase.from("pitches").select("id, title, genre, format, logline, published, created_at").order("created_at", { ascending: false }));
  if (!data.length) return <Empty />;
  return <div>{data.map((p) => <Row key={p.id}><div><p className="font-semibold">{p.title} <span className="font-normal text-muted-foreground">· {p.format} · {p.genre}</span></p><p className="text-xs">{p.logline}</p></div><span className="text-xs">{p.published ? "Public" : "Private"}</span></Row>)}</div>;
}

function NoteEditor({ initial, onSave, label = "Internal notes" }: { initial: string; onSave: (v: string) => void; label?: string }) {
  const [v, setV] = useState(initial);
  return <div className="mt-2 flex gap-2"><Textarea aria-label={label} placeholder={label} value={v} maxLength={4000} onChange={(e) => setV(e.target.value)} className="min-h-9 text-xs" /><Button type="button" size="sm" variant="outline" onClick={() => onSave(v)}>Save</Button></div>;
}

function Weekly() {
  const qc = useQueryClient();
  const { data = [] } = useTable("weekly", () => supabase.from("weekly_spotlights").select("*").order("week_start", { ascending: false }));
  const up = useUpdate("weekly_spotlights", "weekly");
  const blank = { kind: "book", title: "", creator_name: "", specialty: "", description: "", image_url: "", link_url: "", week_start: new Date().toISOString().slice(0, 10) };
  const [f, setF] = useState(blank);
  async function add(e: FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from("weekly_spotlights").insert({ ...f, title: f.title.trim(), creator_name: f.creator_name.trim(), description: f.description.trim(), specialty: f.specialty || null, image_url: f.image_url || null, link_url: f.link_url || null });
    if (error) { toast.error("Check the fields (description 10+ characters, links must start with https://)."); return; }
    setF(blank); qc.invalidateQueries({ queryKey: ["admin", "weekly"] }); toast.success("Saved as draft — publish it when ready");
  }
  return <div>
    <form onSubmit={add} className="grid gap-2 border-b border-border py-4 md:grid-cols-2">
      <select aria-label="Type" className="h-9 rounded-sm border border-input bg-background px-2 text-sm" value={f.kind} onChange={(e) => setF({ ...f, kind: e.target.value })}><option value="book">Book of the Week</option><option value="creative">Creative of the Week</option></select>
      <label className="text-xs">Week starting<Input type="date" required value={f.week_start} onChange={(e) => setF({ ...f, week_start: e.target.value })} /></label>
      <Input required placeholder="Book or project title" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />
      <Input required placeholder="Author / creative name" value={f.creator_name} onChange={(e) => setF({ ...f, creator_name: e.target.value })} />
      <Input placeholder="Genre or specialty" value={f.specialty} onChange={(e) => setF({ ...f, specialty: e.target.value })} />
      <Input placeholder="Image URL (https://, with permission)" value={f.image_url} onChange={(e) => setF({ ...f, image_url: e.target.value })} />
      <Input className="md:col-span-2" placeholder="Link (https://) e.g. Amazon or portfolio" value={f.link_url} onChange={(e) => setF({ ...f, link_url: e.target.value })} />
      <Textarea required className="md:col-span-2" placeholder="Short description" value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} />
      <Button type="submit" className="md:w-fit">Add spotlight</Button>
    </form>
    {data.map((w) => <Row key={w.id}><div><p className="font-semibold">{w.kind === "book" ? "Book" : "Creative"} · {w.title} <span className="font-normal text-muted-foreground">· {w.creator_name}</span></p><p className="text-xs text-muted-foreground">Week of {w.week_start} — shows on the homepage once published and the week has started</p></div>
      <select aria-label="Status" className={sel} value={w.status} onChange={(e) => up.mutate({ id: w.id, patch: { status: e.target.value } })}>{["draft", "published", "archived"].map((v) => <option key={v}>{v}</option>)}</select></Row>)}
  </div>;
}

function Reports() {
  const { data = [] } = useTable("reports", () => supabase.from("critique_requests").select("*").eq("reported", true).order("created_at", { ascending: false }));
  const up = useUpdate("critique_requests", "reports");
  if (!data.length) return <Empty />;
  return <div>{data.map((r) => <Row key={r.id}><div><p className="font-semibold">{r.project_title} <span className="font-normal text-muted-foreground">· {r.status}</span></p><p className="text-xs">{r.message}</p><p className="text-xs text-muted-foreground">From {r.requester_id.slice(0, 8)} to {r.recipient_id.slice(0, 8)} · {r.created_at.slice(0, 10)}</p></div>
    <div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => up.mutate({ id: r.id, patch: { status: "withdrawn", reported: false } })}>Close request</Button><Button size="sm" variant="ghost" onClick={() => up.mutate({ id: r.id, patch: { reported: false } })}>Dismiss report</Button></div></Row>)}</div>;
}

function Team() {
  const qc = useQueryClient();
  const { data = [] } = useTable("team", () => supabase.from("team_applications").select("*").order("created_at", { ascending: false }));
  const decide = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => { const { error } = await supabase.rpc("decide_team_application", { _id: id, _status: status }); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin", "team"] }); toast.success("Updated"); },
    onError: () => toast.error("Update failed"),
  });
  if (!data.length) return <Empty />;
  return <div>{data.map((a) => (
    <Row key={a.id}>
      <div><p className="font-semibold">{a.full_name} · {a.role_interest} · {a.status}{a.referral_code ? ` · code ${a.referral_code}` : ""}</p>
        <p className="text-xs text-muted-foreground">{a.email}{a.phone ? ` · ${a.phone}` : ""}{a.country ? ` · ${a.country}` : ""} · {a.created_at.slice(0, 10)}</p>
        <p className="mt-1 text-xs">{a.motivation}</p></div>
      <div className="flex flex-wrap gap-2">
        {a.status !== "approved" ? <Button size="sm" onClick={() => decide.mutate({ id: a.id, status: "approved" })}>Approve & issue code</Button> : <Button size="sm" variant="outline" onClick={() => decide.mutate({ id: a.id, status: "suspended" })}>Suspend</Button>}
        {a.status === "pending" ? <Button size="sm" variant="ghost" onClick={() => decide.mutate({ id: a.id, status: "rejected" })}>Reject</Button> : null}
      </div>
    </Row>))}</div>;
}

function Referrals() {
  const { data: team = [] } = useTable("team", () => supabase.from("team_applications").select("*").order("created_at", { ascending: false }));
  const { data: ms = [] } = useTable("memberships", () => supabase.from("memberships").select("*").order("created_at", { ascending: false }));
  const codes = team.filter((t) => t.referral_code);
  if (!codes.length) return <Empty />;
  return <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left text-xs uppercase text-muted-foreground"><th className="py-2">Code</th><th>Team member</th><th>Status</th><th>Confirmed paid referrals</th><th>Awaiting payment</th></tr></thead><tbody>
    {codes.map((t) => {
      const mine = ms.filter((m) => m.referral_code === t.referral_code);
      return <tr key={t.id} className="border-t border-border"><td className="py-2 font-mono">{t.referral_code}</td><td>{t.full_name}</td><td>{t.status}</td>
        <td>{mine.filter((m) => m.started_on).length}</td><td>{mine.filter((m) => m.status === "pending_payment").length}</td></tr>;
    })}</tbody></table>
    <p className="mt-3 text-xs text-muted-foreground">Only memberships whose payment was confirmed by staff are counted as referrals.</p></div>;
}

function Roles() {
  const [email, setEmail] = useState(""); const [role, setRole] = useState<"moderator" | "admin">("moderator");
  const run = useMutation({
    mutationFn: async (grant: boolean) => { const { error } = await supabase.rpc("admin_set_role", { _email: email, _role: role, _grant: grant }); if (error) throw error; },
    onSuccess: () => toast.success("Role updated"),
    onError: (e: Error) => toast.error(e.message.includes("No account") ? "No account uses that email yet." : "Update failed"),
  });
  return <div className="grid max-w-md gap-3 py-6">
    <p className="text-sm text-muted-foreground">Give or remove moderator or admin access. The person must already have an account.</p>
    <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
    <select aria-label="Role" className={sel} value={role} onChange={(e) => setRole(e.target.value as "moderator" | "admin")}><option value="moderator">Moderator</option><option value="admin">Admin</option></select>
    <div className="flex gap-2"><Button size="sm" onClick={() => run.mutate(true)}>Grant</Button><Button size="sm" variant="outline" onClick={() => run.mutate(false)}>Remove</Button></div>
  </div>;
}
