import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PageHeader, PageShell } from "@/components/page-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/search-pitches")({
  staticData: { sitemap: true },
  head: () => ({ links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/search-pitches" }], meta: [{ title: "Search Story Pitches | Fourth Group & Co" }, { name: "description", content: "Browse original stories presented for screen adaptation." }, { property: "og:title", content: "Search Story Pitches | Fourth Group & Co" }, { property: "og:description", content: "Discover adaptation-ready stories." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "https://fourthgroupco.lovable.app/search-pitches" }] }),
  component: Page,
});

function Page() {
  const [q, setQ] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["public-pitches"],
    queryFn: async () => {
      const { data, error } = await supabase.from("pitches").select("id,title,logline,genre,format,rights").eq("published", true).order("created_at", { ascending: false }).limit(100);
      if (error) throw error;
      return data;
    },
  });
  const term = q.trim().toLowerCase();
  const list = (data ?? []).filter((p) => !term || `${p.title} ${p.genre} ${p.logline}`.toLowerCase().includes(term));

  return (
    <PageShell>
      <PageHeader kicker="Movie adaptation" title="Search pitches" intro="Original fiction and nonfiction presented by its authors for film and television." />
      <section className="mx-auto max-w-5xl px-5 py-14">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input aria-label="Search pitches" placeholder="Search by title, genre or keyword" value={q} onChange={(e) => setQ(e.target.value)} />
          <Button asChild><Link to="/create-pitch">Create a pitch</Link></Button>
        </div>
        {isLoading ? <p className="mt-8 text-muted-foreground">Loading pitches…</p> : null}
        {!isLoading && list.length === 0 ? (
          <p className="mt-10 text-center text-muted-foreground">No pitches match yet. Be the first to list yours.</p>
        ) : null}
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {list.map((p) => (
            <article key={p.id} className="rounded-md border border-border bg-card p-6 shadow-sm">
              <span className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">{p.format}</span>
              <h2 className="mt-4 font-serif text-xl text-card-foreground">{p.title}</h2>
              <p className="text-sm text-primary">{p.genre}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.logline}</p>
              {p.rights ? <p className="mt-3 text-xs text-muted-foreground">Rights: {p.rights}</p> : null}
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
