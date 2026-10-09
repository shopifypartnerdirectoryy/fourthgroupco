import { SaveToDesk } from "@/components/save-to-desk";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, PageShell } from "@/components/page-shell";
import { DirectoryToolbar, EmptyDirectory, GenreTags, Location, SiteLink, StatusBadge } from "@/components/publishing-directory";
import { PRESSES } from "@/data/publishing-directories";

export const Route = createFileRoute("/small-presses")({
  staticData: { sitemap: true },
  head: () => ({
    links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/small-presses" }],
    meta: [
      { title: "Small Presses Directory | Fourth Group & Co" },
      { name: "description", content: "Search independent publishers by genre and submission status, with links to official guidelines." },
      { property: "og:title", content: "Small Presses Directory | Fourth Group & Co" },
      { property: "og:description", content: "Find independent presses publishing fiction, poetry, nonfiction and translated literature." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://fourthgroupco.lovable.app/small-presses" },
    ],
  }),
  component: SmallPressesPage,
});

const GENRES = [...new Set(PRESSES.flatMap((item) => item.genres))].sort();

function SmallPressesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [genre, setGenre] = useState("all");
  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    return PRESSES.filter((item) =>
      (!query || `${item.name} ${item.description} ${item.location} ${item.genres.join(" ")}`.toLowerCase().includes(query)) &&
      (status === "all" || item.status === status) &&
      (genre === "all" || item.genres.includes(genre)),
    );
  }, [search, status, genre]);

  return (
    <PageShell>
      <PageHeader kicker="Publish your writing" title="Small and independent presses" intro="Search independent publishers by genre and current submission status, then visit the press directly for its latest manuscript requirements." />
      <section className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <DirectoryToolbar search={search} onSearch={setSearch} status={status} onStatus={setStatus} statuses={["Accepting", "Closed"]} genre={genre} onGenre={setGenre} genres={GENRES} placeholder="Search presses, genres, or locations" />
        <p className="py-5 text-xs font-medium uppercase text-muted-foreground" aria-live="polite">{results.length} {results.length === 1 ? "press" : "presses"} found</p>
        {results.length ? <div className="grid gap-4 md:grid-cols-2">
          {results.map((item) => (
            <article key={item.name} className="flex min-h-60 flex-col rounded-md border border-border bg-card p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3"><h2 className="font-serif text-xl text-card-foreground">{item.name}</h2><StatusBadge status={item.status} /></div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              <div className="mt-4"><GenreTags genres={item.genres} /></div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4"><Location>{item.location}</Location><SiteLink href={item.website} label={`Visit ${item.name}`} /></div>
              <SaveToDesk item={{ key: `Small press:${item.name}`, title: item.name, category: "Small press", url: item.website }} />
            </article>
          ))}
        </div> : <EmptyDirectory />}
        <p className="mt-8 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">Submission status is a guide, not a guarantee. Review each press’s official guidelines before sending your manuscript.</p>
      </section>
    </PageShell>
  );
}
