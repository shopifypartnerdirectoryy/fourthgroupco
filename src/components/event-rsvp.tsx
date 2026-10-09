import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { CalendarCheck, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";

/** Registers interest in an event. Dates are announced later; one registration per member per event. */
export function EventRsvp({ eventKey, title }: { eventKey: string; title: string }) {
  const { user, ready } = useSession();
  const [id, setId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [needAuth, setNeedAuth] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("event_rsvps").select("id").eq("user_id", user.id).eq("event_key", eventKey).maybeSingle().then(({ data }) => setId(data?.id ?? null));
  }, [user, eventKey]);

  async function toggle() {
    if (!user) { setNeedAuth(true); return; }
    setBusy(true);
    if (id) {
      const { error } = await supabase.from("event_rsvps").delete().eq("id", id);
      if (error) toast.error("Could not cancel."); else { setId(null); toast.success("Registration cancelled"); }
    } else {
      const { data, error } = await supabase.from("event_rsvps").upsert({ user_id: user.id, event_key: eventKey, event_title: title }, { onConflict: "user_id,event_key" }).select("id").single();
      if (error) toast.error("Could not register."); else { setId(data.id); toast.success("You're registered — we'll email you when the date is announced."); }
    }
    setBusy(false);
  }

  return (
    <div className="grid justify-items-start gap-1 sm:justify-items-end">
      <Button variant={id ? "default" : "outline"} size="sm" onClick={toggle} disabled={!ready || busy} aria-pressed={!!id}>
        {id ? <CalendarCheck /> : <CalendarPlus />}{id ? "Registered" : "Register"}
      </Button>
      {needAuth && !user ? <p className="text-xs text-muted-foreground"><Link to="/auth" search={{ redirect: "/events" }} className="text-primary underline">Sign in</Link> to register.</p> : null}
    </div>
  );
}
