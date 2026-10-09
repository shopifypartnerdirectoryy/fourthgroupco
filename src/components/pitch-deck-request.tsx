import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";

/** Lets a signed-in industry reader ask a pitch owner for the full deck. The owner decides; contact is shared only on approval. */
export function PitchDeckRequest({ pitchId, ownerId }: { pitchId: string; ownerId: string }) {
  const { user } = useSession();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  if (user?.id === ownerId) return <p className="mt-3 text-xs text-muted-foreground">This is your pitch.</p>;
  if (sent) return <p role="status" className="mt-3 text-xs text-primary">Request sent. The writer will review it.</p>;
  if (!open) return <Button size="sm" variant="outline" className="mt-3" onClick={() => setOpen(true)}>Request pitch deck</Button>;
  if (!user) return <p className="mt-3 text-xs"><Link to="/auth" search={{ redirect: "/search-pitches" }} className="text-primary underline">Sign in</Link> to request the full deck.</p>;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2 || msg.trim().length < 10) return void toast.error("Add your name and a short message (10+ characters).");
    setBusy(true);
    const { error } = await supabase.from("pitch_deck_requests").insert({ pitch_id: pitchId, requester_id: user!.id, owner_id: ownerId, requester_name: name.trim(), company: company.trim() || null, message: msg.trim() });
    setBusy(false);
    if (error) toast.error(error.code === "23505" ? "You already have a pending request for this pitch." : "Could not send the request.");
    else { toast.success("Request sent"); setSent(true); }
  }
  return (
    <form onSubmit={submit} className="mt-3 grid gap-2">
      <Input placeholder="Your name" maxLength={120} value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Company (optional)" maxLength={160} value={company} onChange={(e) => setCompany(e.target.value)} />
      <Textarea placeholder="Why you’d like to read the deck" maxLength={1500} value={msg} onChange={(e) => setMsg(e.target.value)} />
      <div className="flex gap-2"><Button size="sm" type="submit" disabled={busy}>Send request</Button><Button size="sm" type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button></div>
    </form>
  );
}
