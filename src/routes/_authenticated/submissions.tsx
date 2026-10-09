import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ExternalLink, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/_authenticated/submissions")({
  head: () => ({ meta: [
    { title: "My Desk — Submission Tracker | Fourth Group & Co" },
    { name: "description", content: "Your saved opportunities, submissions and deadlines." },
    { property: "og:title", content: "My Desk | Fourth Group & Co" },
    { property: "og:description", content: "Private submission tracker for members." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex, nofollow" },
  ] }),
  component: DeskPage,
});

type Item = Tables<"desk_items">;
export const DESK_STATUSES = [
  ["saved", "Saved"], ["preparing", "Preparing"], ["submitted", "Submitted"], ["awaiting", "Awaiting response"],
  ["accepted", "Accepted"], ["rejected", "Rejected"], ["withdrawn", "Withdrawn"],
] as const;
const label = (s: string) => DESK_STATUSES.find(([k]) => k === s)?.[1] ?? s;

function daysUntil(d: string) {
  const t = new Date(`${d}T00:00:00`); const now = new Date(); now.setHours(0, 0, 0, 0);
  return Math.round((t.getTime() - now.getTime()) / 86400000);
}

function DeskPage() {
  const { user } = Route.useRouteContext();
  const qc = useQueryClient();
  const key = ["desk", user.id];
  const { data: items = [], isLoading } = useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data, error } = await supabase.from("desk_items").select("*").eq("user_id", user.id).order("updated_at", { ascending: false });
      if (error) throw error; return data;
    },
  });
  const update = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<Item> }) => {
      const { error } = await supabase.from("desk_items").update({ ...patch, updated_at: new Date().toISOString() }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: key }); toast.success("Saved"); },
    onError: () => toast.error("Could not save that change."),
  });
  const remove = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("desk_items").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: key }); toast.success("Removed"); },
  });

  const saved = items.filter((i) => i.status === "saved" || i.status === "preparing");
  const pending = items.filter((i) => !["saved", "preparing"].includes(i.status));
  const deadlines = items.filter((i) => i.target_date && !["accepted", "rejected", "withdrawn"].includes(i.status))
    .sort((a, b) => (a.target_date! < b.target_date! ? -1 : 1));

  return (
    <PageShell>
      <PageHeader kicker="My Desk" title="Your submission tracker" intro="Save opportunities, keep private notes, and track every submission from first draft to final answer." />
      <div className="mx-auto max-w-6xl px-5 py-12">
        {isLoading ? <p className="text-sm text-muted-foreground">Loading your desk…</p> : items.length === 0 ? (
          <div className="border border-dashed border-border p-12 text-center">
            <p className="font-serif text-2xl text-foreground">Your desk is empty</p>
            <p className="mt-2 text-sm text-muted-foreground">Use “Save to My Desk” on any magazine, press, agent, grant, contest or residency.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild variant="outline"><Link to="/literary-magazines">Literary magazines</Link></Button>
              <Button asChild variant="outline"><Link to="/grants-awards">Grants & awards</Link></Button>
              <Button asChild variant="outline"><Link to="/contests">Contests</Link></Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <Column title="Saved opportunities" count={saved.length}>
              {saved.map((i) => <DeskCard key={i.id} item={i} onSave={(patch) => update.mutate({ id: i.id, patch })} onRemove={() => remove.mutate(i.id)} />)}
            </Column>
            <Column title="Pending submissions" count={pending.length}>
              {pending.map((i) => <DeskCard key={i.id} item={i} onSave={(patch) => update.mutate({ id: i.id, patch })} onRemove={() => remove.mutate(i.id)} />)}
            </Column>
            <Column title="Upcoming deadlines" count={deadlines.length}>
              {deadlines.length === 0 ? <p className="text-xs text-muted-foreground">Set a personal target date on a saved item to see it here.</p> : deadlines.map((i) => {
                const d = daysUntil(i.target_date!);
                return (
                  <div key={i.id} className="rounded-sm border border-border bg-card p-4 text-sm">
                    <p className="font-semibold text-card-foreground">{i.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Your target: {i.target_date} · <span className={d < 0 ? "text-destructive" : d <= 7 ? "font-semibold text-primary" : ""}>{d < 0 ? `passed ${-d} day(s) ago` : d === 0 ? "today" : `in ${d} day(s)`}</span></p>
                    <p className="mt-1 text-xs text-muted-foreground">Official deadline: {i.official_deadline || "not verified — check the organiser"}</p>
                  </div>
                );
              })}
            </Column>
          </div>
        )}
      </div>
    </PageShell>
  );
}

function Column({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <section aria-label={title}>
      <h2 className="flex items-center justify-between border-b-2 border-primary pb-2 font-serif text-xl text-foreground">{title}<span className="text-xs font-sans text-muted-foreground">{count}</span></h2>
      <div className="mt-4 grid gap-3">{children}</div>
    </section>
  );
}

function DeskCard({ item, onSave, onRemove }: { item: Item; onSave: (p: Partial<Item>) => void; onRemove: () => void }) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(item.notes ?? "");
  const [response, setResponse] = useState(item.response_notes ?? "");
  const [target, setTarget] = useState(item.target_date ?? "");
  const [submittedOn, setSubmittedOn] = useState(item.submitted_on ?? "");

  return (
    <div className="rounded-sm border border-border bg-card p-4 text-sm">
      <p className="text-[10px] font-semibold uppercase text-primary">{item.category}</p>
      <p className="mt-1 font-semibold text-card-foreground">{item.title}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Label htmlFor={`st-${item.id}`} className="sr-only">Status</Label>
        <select id={`st-${item.id}`} value={item.status} onChange={(e) => {
            const status = e.target.value;
            onSave({ status, ...(status === "submitted" && !item.submitted_on ? { submitted_on: new Date().toISOString().slice(0, 10) } : {}) });
          }} className="h-8 rounded-sm border border-input bg-background px-2 text-xs">
          {DESK_STATUSES.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
        </select>
        {item.url ? <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-primary underline">Open <ExternalLink className="size-3" /></a> : null}
        <button type="button" onClick={() => setOpen(!open)} className="text-xs underline">{open ? "Close" : "Notes & dates"}</button>
        <button type="button" onClick={() => confirm("Remove this from your desk?") && onRemove()} aria-label="Remove" className="ml-auto text-muted-foreground hover:text-destructive"><Trash2 className="size-4" /></button>
      </div>
      {item.submitted_on ? <p className="mt-2 text-xs text-muted-foreground">Submitted {item.submitted_on} · {label(item.status)}</p> : null}
      {open ? (
        <form className="mt-3 grid gap-2" onSubmit={(e) => { e.preventDefault(); onSave({ notes: notes || null, response_notes: response || null, target_date: target || null, submitted_on: submittedOn || null }); setOpen(false); }}>
          <Label className="text-xs">Personal target date<Input type="date" value={target} onChange={(e) => setTarget(e.target.value)} className="mt-1 h-9" /></Label>
          <Label className="text-xs">Date submitted<Input type="date" value={submittedOn} onChange={(e) => setSubmittedOn(e.target.value)} className="mt-1 h-9" /></Label>
          <Label className="text-xs">Private notes<Textarea maxLength={4000} value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1" /></Label>
          <Label className="text-xs">Response notes<Textarea maxLength={4000} value={response} onChange={(e) => setResponse(e.target.value)} className="mt-1" /></Label>
          <Button type="submit" size="sm">Save</Button>
        </form>
      ) : null}
    </div>
  );
}
