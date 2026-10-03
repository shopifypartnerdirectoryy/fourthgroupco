import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, PageShell } from "@/components/page-shell";
import { DirectoryToolbar, EmptyDirectory, GenreTags, Location, SiteLink, StatusBadge } from "@/components/publishing-directory";
import { AGENTS } from "@/data/publishing-directories";

export const Route = createFileRoute("/literary-agents")({
  staticData: { sitemap: true },
  head: () => ({
    links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/literary-agents" }],
    meta: [
      { title: "Literary Agents Directory | Fourth Group & Co" },
      { name: "description", content: "Search 225 literary agents by name, agency, genre, location and query status." },
      { property: "og:title", content: "Literary Agents Directory | Fourth Group & Co" },
      { property: "og:description", content: "Build a focused agent list by genre, location and query status." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://fourthgroupco.lovable.app/literary-agents" },
    ],
  }),
  component: LiteraryAgentsPage,
});

const GENRES = [...new Set(AGENTS.flatMap((item) => item.genres))].sort();

function LiteraryAgentsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [genre, setGenre] = useState("all");
  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    return AGENTS.filter((item) =>
      (!query || `${item.name} ${item.agency} ${item.location} ${item.genres.join(" ")}`.toLowerCase().includes(query)) &&
      (status === "all" || item.status === status) &&
      (genre === "all" || item.genres.includes(genre)),
    );
  }, [search, status, genre]);
  const openCount = AGENTS.filter((item) => item.status === "Open").length;
  const agencies = new Set(AGENTS.map((item) => item.agency)).size;

  return (
    <PageShell>
      <PageHeader kicker="Publish your writing" title="Literary agents" intro="Research agents by the work they represent, their location and current query status. Review every agency’s latest submission guidance before making contact." />
      <section className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <div className="mb-7 grid grid-cols-3 divide-x divide-border border-y border-border bg-card py-5 text-center">
          <div><strong className="block font-serif text-2xl text-foreground">{AGENTS.length}</strong><span className="text-[10px] uppercase text-muted-foreground">Agents</span></div>
          <div><strong className="block font-serif text-2xl text-foreground">{openCount}</strong><span className="text-[10px] uppercase text-muted-foreground">Open</span></div>
          <div><strong className="block font-serif text-2xl text-foreground">{agencies}</strong><span className="text-[10px] uppercase text-muted-foreground">Agencies</span></div>
        </div>
        <DirectoryToolbar search={search} onSearch={setSearch} status={status} onStatus={setStatus} statuses={["Open", "Closed"]} genre={genre} onGenre={setGenre} genres={GENRES} placeholder="Search agents, agencies, genres, or locations" />
        <p className="py-5 text-xs font-medium uppercase text-muted-foreground" aria-live="polite">{results.length} {results.length === 1 ? "agent" : "agents"} found</p>
        {results.length ? <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((item) => (
            <article key={item.id} className="flex min-h-64 flex-col rounded-md border border-border bg-card p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3"><h2 className="font-serif text-lg leading-tight text-card-foreground">{item.name}</h2><StatusBadge status={item.status} /></div>
              <p className="mt-2 text-sm font-semibold text-primary">{item.agency}</p>
              <div className="mt-3"><Location>{item.location}</Location></div>
              <div className="mt-5 flex-1"><GenreTags genres={item.genres} /></div>
              <div className="mt-5 border-t border-border pt-4"><SiteLink href={item.website} label="Visit agency" /></div>
            </article>
          ))}
        </div> : <EmptyDirectory />}
        <p className="mt-8 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">Query status changes frequently. Confirm whether an agent is open, review their individual interests, and follow the official agency guidelines before submitting.</p>
      </section>
    </PageShell>
  );
}
