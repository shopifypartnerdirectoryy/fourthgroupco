import { DeckRequests } from "@/components/deck-requests";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PageHeader, PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/pitch-dashboard")({
  staticData: { sitemap: false },
  head: () => ({ links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/pitch-dashboard" }], meta: [{ title: "Pitch Dashboard | Fourth Group & Co" }, { name: "description", content: "Manage story pitches and adaptation enquiries." }, { property: "og:title", content: "Pitch Dashboard | Fourth Group & Co" }, { property: "og:description", content: "Manage your adaptation pitches." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { property: "og:url", content: "https://fourthgroupco.lovable.app/pitch-dashboard" }, { name: "robots", content: "noindex, follow" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = Route.useRouteContext();
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["my-pitches", user.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("pitches").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  async function toggle(id: string, published: boolean) {
    await supabase.from("pitches").update({ published: !published, updated_at: new Date().toISOString() }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["my-pitches", user.id] });
  }
  async function remove(id: string) {
    if (!confirm("Delete this pitch?")) return;
    await supabase.from("pitches").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["my-pitches", user.id] });
  }

  return (
    <PageShell>
      <PageHeader kicker="Your pitches" title="Pitch dashboard" intro={`Signed in as ${user.email ?? "writer"}. Keep your pitches current and choose which ones are listed publicly.`} />
      <section className="mx-auto max-w-4xl px-5 py-14">
        <div className="flex justify-end"><Button asChild><Link to="/create-pitch">New pitch</Link></Button></div>
        {isLoading ? <p className="mt-8 text-muted-foreground">Loading your pitches…</p> : null}
        {data && data.length === 0 ? (
          <div className="mt-8 rounded-md border border-dashed border-border p-10 text-center">
            <p className="font-serif text-2xl text-foreground">No pitches yet</p>
            <p className="mt-2 text-sm text-muted-foreground">Your first pitch takes about ten minutes.</p>
          </div>
        ) : null}
        <div className="mt-8 grid gap-4">
          {data?.map((p) => (
            <article key={p.id} className="rounded-md border border-border bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-serif text-xl text-card-foreground">{p.title}</h2>
                  <p className="text-sm text-primary">{p.genre} · {p.format}</p>
                </div>
                <span className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">{p.published ? "Listed" : "Private"}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{p.logline}</p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => toggle(p.id, p.published)}>{p.published ? "Make private" : "List publicly"}</Button>
                <Button size="sm" variant="ghost" onClick={() => remove(p.id)}>Delete</Button>
              </div>
            </article>
          ))}
        </div>
        <DeckRequests uid={user.id} />
      </section>
    </PageShell>
  );
}
