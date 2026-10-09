import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

/** Pitch-deck requests a writer has received or sent. Email is shared only after the owner approves. */
export function DeckRequests({ uid }: { uid: string }) {
  const qc = useQueryClient();
  const key = ["deck-requests", uid];
  const { data = [] } = useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data, error } = await supabase.from("pitch_deck_requests").select("*, pitches(title)").order("created_at", { ascending: false });
      if (error) throw error; return data;
    },
  });
  const [emails, setEmails] = useState<Record<string, string>>({});
  const [replies, setReplies] = useState<Record<string, string>>({});
  async function decide(id: string, status: "approved" | "declined") {
    const { error } = await supabase.from("pitch_deck_requests").update({ status, owner_reply: replies[id]?.trim() || null, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) toast.error("Could not update."); else { toast.success(status === "approved" ? "Approved — you can now see their email" : "Declined"); qc.invalidateQueries({ queryKey: key }); }
  }
  async function reveal(id: string) {
    const { data, error } = await supabase.rpc("deck_request_contact", { _request_id: id });
    if (error || !data) toast.error("Contact not available."); else setEmails((e) => ({ ...e, [id]: data }));
  }
  const incoming = data.filter((r) => r.owner_id === uid);
  const outgoing = data.filter((r) => r.requester_id === uid);
  return (
    <div className="mt-12 grid gap-8">
      <section>
        <h2 className="font-serif text-2xl text-foreground">Pitch-deck requests received</h2>
        {incoming.length === 0 ? <p className="mt-2 text-sm text-muted-foreground">No requests yet. Requests arrive when a signed-in reader asks to see the full deck for a public pitch.</p> : incoming.map((r) => (
          <article key={r.id} className="mt-4 rounded-md border border-border bg-card p-5 text-sm">
            <p className="text-xs text-muted-foreground">For “{r.pitches?.title}” · {r.created_at.slice(0, 10)} · <span className="capitalize">{r.status}</span></p>
            <p className="mt-1 font-semibold">{r.requester_name}{r.company ? ` · ${r.company}` : ""}</p>
            <p className="mt-1 text-muted-foreground">{r.message}</p>
            {r.status === "pending" ? (<>
              <Textarea className="mt-3" placeholder="Optional reply" maxLength={1500} value={replies[r.id] ?? ""} onChange={(e) => setReplies({ ...replies, [r.id]: e.target.value })} />
              <div className="mt-2 flex gap-2"><Button size="sm" onClick={() => decide(r.id, "approved")}>Approve & share contact</Button><Button size="sm" variant="outline" onClick={() => decide(r.id, "declined")}>Decline</Button></div>
            </>) : null}
            {r.status === "approved" ? (emails[r.id] ? <p className="mt-2 text-xs">Send your deck to <a className="text-primary underline" href={`mailto:${emails[r.id]}`}>{emails[r.id]}</a></p> : <Button size="sm" variant="outline" className="mt-2" onClick={() => reveal(r.id)}>Show their email</Button>) : null}
          </article>
        ))}
      </section>
      {outgoing.length ? <section>
        <h2 className="font-serif text-2xl text-foreground">Deck requests you sent</h2>
        {outgoing.map((r) => (
          <article key={r.id} className="mt-4 rounded-md border border-border bg-card p-5 text-sm">
            <p className="font-semibold">{r.pitches?.title ?? "Pitch"} · <span className="capitalize">{r.status}</span></p>
            {r.owner_reply ? <p className="mt-1 text-muted-foreground">Reply: {r.owner_reply}</p> : null}
            {r.status === "approved" ? (emails[r.id] ? <p className="mt-2 text-xs">Writer’s email: <a className="text-primary underline" href={`mailto:${emails[r.id]}`}>{emails[r.id]}</a></p> : <Button size="sm" variant="outline" className="mt-2" onClick={() => reveal(r.id)}>Show writer’s email</Button>) : null}
          </article>
        ))}
      </section> : null}
    </div>
  );
}
