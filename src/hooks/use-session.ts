import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

/** Client-side session + admin flag. Admin rights are enforced by database policies, this only drives UI. */
export function useSession() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    async function load(u: User | null) {
      if (!active) return;
      setUser(u);
      if (u) {
        const { data } = await supabase.from("user_roles").select("role").eq("user_id", u.id).eq("role", "admin").maybeSingle();
        if (active) setIsAdmin(!!data);
      } else setIsAdmin(false);
      if (active) setReady(true);
    }
    supabase.auth.getUser().then(({ data }) => load(data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") load(session?.user ?? null);
    });
    return () => { active = false; sub.subscription.unsubscribe(); };
  }, []);

  return { user, isAdmin, ready };
}
