import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, PageShell } from "@/components/page-shell";
import { DirectoryToolbar, EmptyDirectory, GenreTags, SiteLink, StatusBadge } from "@/components/publishing-directory";
import { MAGAZINES } from "@/data/publishing-directories";

export const Route = createFileRoute("/literary-magazines")({
  staticData: { sitemap: true },
  head: () => ({
    links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/literary-magazines" }],
    meta: [
      { title: "Literary Magazines Directory | Fourth Group & Co" },
      { name: "description", content: "Search literary magazines by genre and submission status, with official publication links." },
      { property: "og:title", content: "Literary Magazines Directory | Fourth Group & Co" },
      { property: "og:description", content: "Explore respected journals publishing poetry, fiction, essays and memoir." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://fourthgroupco.lovable.app/literary-magazines" },
    ],
  }),
  component: LiteraryMagazinesPage,
});

const GENRES = [...new Set(MAGAZINES.flatMap((item) => item.genres))].sort();

function LiteraryMagazinesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [genre, setGenre] = useState("all");
  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    return MAGAZINES.filter((item) =>
      (!query || `${item.name} ${item.description} ${item.genres.join(" ")}`.toLowerCase().includes(query)) &&
      (status === "all" || item.status === status) &&
      (genre === "all" || item.genres.includes(genre)),
    );
  }, [search, status, genre]);

  return (
    <PageShell>
      <PageHeader kicker="Publish your writing" title="Literary magazines" intro="Explore established journals publishing poetry, fiction, essays and memoir. Always confirm current guidelines on the publication’s official site before submitting." />
      <section className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <DirectoryToolbar search={search} onSearch={setSearch} status={status} onStatus={setStatus} statuses={["Open", "Closed"]} genre={genre} onGenre={setGenre} genres={GENRES} placeholder="Search magazines, genres, or descriptions" />
        <p className="py-5 text-xs font-medium uppercase text-muted-foreground" aria-live="polite">{results.length} {results.length === 1 ? "magazine" : "magazines"} found</p>
        {results.length ? <div className="grid gap-4">
          {results.map((item) => (
            <article key={item.name} className="grid gap-5 rounded-md border border-border bg-card p-5 shadow-sm md:grid-cols-[minmax(0,1fr)_13rem] md:p-6">
              <div>
                <div className="flex flex-wrap items-center gap-2"><h2 className="font-serif text-xl text-card-foreground">{item.name}</h2><StatusBadge status={item.status} /></div>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                <div className="mt-4"><GenreTags genres={item.genres} /></div>
              </div>
              <dl className="grid content-start gap-2 border-t border-border pt-4 text-xs md:border-l md:border-t-0 md:pl-5 md:pt-0">
                <div className="flex justify-between gap-3"><dt className="text-muted-foreground">Reading</dt><dd className="font-medium">{item.reading}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-muted-foreground">Payment</dt><dd className="font-medium">{item.payment}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-muted-foreground">Typical response</dt><dd className="font-medium">{item.response}</dd></div>
                <div className="mt-2 md:text-right"><SiteLink href={item.website} label={`Visit ${item.name}`} /></div>
              </dl>
            </article>
          ))}
        </div> : <EmptyDirectory />}
        <p className="mt-8 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">Submission windows and policies can change. Fourth Group & Co links you directly to each publication so you can review its latest requirements.</p>
      </section>
    </PageShell>
  );
}
