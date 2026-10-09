import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";

export type DeskOpportunity = { key: string; title: string; category: string; url?: string; deadline?: string };

export function SaveToDesk({ item }: { item: DeskOpportunity }) {
  const { user, ready } = useSession();
  const [savedId, setSavedId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [prompt, setPrompt] = useState(false);

  useEffect(() => {
    if (!user) { setSavedId(null); return; }
    supabase.from("desk_items").select("id").eq("user_id", user.id).eq("opportunity_key", item.key).maybeSingle()
      .then(({ data }) => setSavedId(data?.id ?? null));
  }, [user, item.key]);

  async function toggle() {
    if (!user) { setPrompt(true); return; }
    setBusy(true);
    if (savedId) {
      const { error } = await supabase.from("desk_items").delete().eq("id", savedId);
      if (error) toast.error("Could not remove it. Please try again.");
      else { setSavedId(null); toast.success("Removed from your desk"); }
    } else {
      const { data, error } = await supabase.from("desk_items")
        .upsert({ user_id: user.id, opportunity_key: item.key, title: item.title, category: item.category, url: item.url ?? null, official_deadline: item.deadline ?? null }, { onConflict: "user_id,opportunity_key" })
        .select("id").single();
      if (error) toast.error("Could not save it. Please try again.");
      else { setSavedId(data.id); toast.success("Saved to My Desk"); }
    }
    setBusy(false);
  }

  return (
    <div className="mt-3">
      <button type="button" onClick={toggle} disabled={!ready || busy} aria-pressed={!!savedId}
        className="inline-flex items-center gap-1.5 rounded-sm border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:border-primary hover:text-primary disabled:opacity-60">
        {busy ? <Loader2 className="size-3.5 animate-spin" /> : savedId ? <BookmarkCheck className="size-3.5 text-primary" /> : <Bookmark className="size-3.5" />}
        {savedId ? "Saved to My Desk" : "Save to My Desk"}
      </button>
      {prompt && !user ? (
        <p role="status" className="mt-2 text-xs text-muted-foreground">
          A free account is needed to save opportunities.{" "}
          <Link to="/auth" search={{ redirect: typeof window !== "undefined" ? window.location.pathname : "/submissions" }} className="font-semibold text-primary underline">Sign in or create one</Link>
        </p>
      ) : null}
    </div>
  );
}
