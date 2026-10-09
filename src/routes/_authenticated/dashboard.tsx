import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { POLICY } from "@/data/policies";
import { useSession } from "@/hooks/use-session";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [
    { title: "Member Dashboard | Fourth Group & Co" },
    { name: "description", content: "Your membership, desk, events and pitches in one place." },
    { property: "og:title", content: "Member Dashboard | Fourth Group & Co" },
    { property: "og:description", content: "Private member workspace." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex, nofollow" },
  ] }),
  component: Dashboard,
});

const STATUS_TEXT: Record<string, string> = {
  pending_payment: "Awaiting payment confirmation", active: "Active", expired: "Expired", cancelled: "Cancelled", refunded: "Refunded",
};

function Dashboard() {
  const { user } = Route.useRouteContext();
  const { isAdmin } = useSession();
  const qc = useQueryClient();
  const uid = user.id;

  const { data } = useQuery({
    queryKey: ["dashboard", uid],
    queryFn: async () => {
      const [m, desk, rsvps, pitches, refunds] = await Promise.all([
        supabase.from("memberships").select("*").eq("user_id", uid).order("created_at", { ascending: false }).limit(1).maybeSingle(),
        supabase.from("desk_items").select("status, target_date").eq("user_id", uid),
        supabase.from("event_rsvps").select("id, event_title").eq("user_id", uid),
        supabase.from("pitches").select("id, published").eq("user_id", uid),
        supabase.from("refund_requests").select("*").eq("user_id", uid).order("created_at", { ascending: false }),
      ]);
      return { membership: m.data, desk: desk.data ?? [], rsvps: rsvps.data ?? [], pitches: pitches.data ?? [], refunds: refunds.data ?? [] };
    },
  });
  const refresh = () => qc.invalidateQueries({ queryKey: ["dashboard", uid] });

  const join = useMutation({
    mutationFn: async () => { const { error } = await supabase.from("memberships").insert({ user_id: uid }); if (error) throw error; },
    onSuccess: () => { refresh(); if (POLICY.paymentUrl) window.open(POLICY.paymentUrl, "_blank", "noopener"); },
    onError: () => toast.error("Could not start your membership request."),
  });
  const cancel = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.rpc("request_membership_cancellation", { _id: id }); if (error) throw error; },
    onSuccess: () => { refresh(); toast.success("Cancellation recorded. Access continues until your paid period ends."); },
  });
  const [reason, setReason] = useState("");
  const refund = useMutation({
    mutationFn: async () => {
      if (reason.trim().length < 10) throw new Error("short");
      const { error } = await supabase.from("refund_requests").insert({ user_id: uid, membership_id: data?.membership?.id ?? null, reason: reason.trim() });
      if (error) throw error;
    },
    onSuccess: () => { setReason(""); refresh(); toast.success("Refund request submitted for review."); },
    onError: (e) => toast.error(e.message === "short" ? "Please describe your reason (at least 10 characters)." : "Could not submit the request."),
  });

  const m = data?.membership;
  const today = new Date().toISOString().slice(0, 10);
  const isActive = m?.status === "active" && (!m.expires_on || m.expires_on >= today);
  const desk = data?.desk ?? [];

  return (
    <PageShell>
      <PageHeader kicker="Member dashboard" title="Your workspace" intro={`Signed in as ${user.email}`} />
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-12 md:grid-cols-2 lg:grid-cols-3">
        <Card title="Membership">
          {!m ? (<>
            <p>You don’t have a membership yet. ${POLICY.priceUsd} USD for {POLICY.durationMonths} months, renewed manually.</p>
            <Button className="mt-4" onClick={() => join.mutate()} disabled={join.isPending}>Start membership</Button>
          </>) : (<>
            <p className="font-semibold text-foreground">{isActive ? "Active" : m.status === "active" ? "Expired" : STATUS_TEXT[m.status]}</p>
            {m.expires_on ? <p>Paid through {m.expires_on}. Renewal is manual — you won’t be charged automatically.</p> : null}
            {m.status === "pending_payment" ? (POLICY.paymentUrl
              ? <Button asChild className="mt-3"><a href={POLICY.paymentUrl} target="_blank" rel="noopener noreferrer">Pay securely</a></Button>
              : <p className="mt-2">Online payment opens soon. We’ll email you the secure payment link; your membership activates once payment is confirmed.</p>) : null}
            {isActive && !m.cancel_requested_at ? <Button variant="outline" className="mt-3" onClick={() => confirm("Request cancellation? Access continues until your paid period ends.") && cancel.mutate(m.id)}>Request cancellation</Button> : null}
            {m.cancel_requested_at ? <p className="mt-2">Cancellation requested. Access continues until {m.expires_on ?? "the end of your paid period"}.</p> : null}
          </>)}
          <p className="mt-3 text-xs"><Link to="/membership-terms" className="underline">Membership terms</Link></p>
        </Card>
        <Card title="My Desk">
          <p>{desk.length} saved · {desk.filter((d) => ["submitted", "awaiting"].includes(d.status)).length} pending · {desk.filter((d) => d.target_date && d.target_date >= today).length} upcoming target dates</p>
          <Button asChild variant="outline" className="mt-4"><Link to="/submissions">Open submission tracker</Link></Button>
        </Card>
        <Card title="Events">
          {data?.rsvps.length ? <ul className="list-disc pl-5">{data.rsvps.map((r) => <li key={r.id}>{r.event_title}</li>)}</ul> : <p>No event registrations yet.</p>}
          <Button asChild variant="outline" className="mt-4"><Link to="/events">Browse events</Link></Button>
        </Card>
        <Card title="Screen pitches">
          <p>{data?.pitches.length ?? 0} pitches · {data?.pitches.filter((p) => p.published).length ?? 0} listed publicly</p>
          <Button asChild variant="outline" className="mt-4"><Link to="/pitch-dashboard">Pitch dashboard</Link></Button>
        </Card>
        <Card title="Refunds">
          {data?.refunds.map((r) => <p key={r.id} className="text-xs">Request from {r.created_at.slice(0, 10)}: <strong>{r.status.replace("_", " ")}</strong>{r.decision_notes ? ` — ${r.decision_notes}` : ""}</p>)}
          {m && m.status !== "refunded" ? (
            <form className="mt-2 grid gap-2" onSubmit={(e) => { e.preventDefault(); refund.mutate(); }}>
              <Textarea value={reason} onChange={(e) => setReason(e.target.value)} maxLength={2000} placeholder="Tell us why you’re requesting a refund" aria-label="Refund reason" />
              <Button type="submit" variant="outline" size="sm" disabled={refund.isPending}>Request a refund</Button>
            </form>
          ) : <p>Refund requests are available once you have a membership.</p>}
          <p className="mt-2 text-xs"><Link to="/refund-policy" className="underline">Refund policy</Link></p>
        </Card>
        <Card title="Support">
          <p>Email <a href={`mailto:${POLICY.supportEmail}`} className="text-primary underline">{POLICY.supportEmail}</a></p>
          {isAdmin ? <Button asChild className="mt-4"><Link to="/admin">Open admin</Link></Button> : null}
        </Card>
      </div>
    </PageShell>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="rounded-sm border border-border bg-card p-6 text-sm text-muted-foreground shadow-sm"><h2 className="mb-3 font-serif text-xl text-card-foreground">{title}</h2>{children}</section>;
}
