import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/page-shell";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Publishing Resources for Writers | Fourth Group & Co" },
      {
        name: "description",
        content:
          "Guides on querying agents, submission etiquette, contracts, rights and building a readership.",
      },
      { property: "og:title", content: "Publishing Resources for Writers | Fourth Group & Co" },
      { property: "og:description", content: "Practical guides for getting published." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const GUIDES = [
  {
    title: "How to write a query letter",
    body: "The three paragraphs that matter, what agents skip, and the comparison titles that help rather than hurt.",
  },
  {
    title: "Reading your contract",
    body: "Advances, royalty splits, rights reversion and the clauses worth negotiating before you sign.",
  },
  {
    title: "Submission etiquette",
    body: "Simultaneous submissions, withdrawal notes, follow-up timing and how to take a rejection usefully.",
  },
  {
    title: "Building a readership slowly",
    body: "Newsletters, local events and bookshop relationships — the work that compounds over years.",
  },
  {
    title: "Preparing a manuscript",
    body: "Formatting, front matter, word-count expectations by genre, and a final self-edit checklist.",
  },
  {
    title: "Working with an editor",
    body: "What developmental, line and copy edits actually cover, and what a fair rate looks like.",
  },
];

function Page() {
  return (
    <PageShell>
      <PageHeader
        kicker="Guides"
        title="Publishing resources"
        intro="Plain-language guides to the parts of publishing that nobody explains: querying, contracts, rights and the slow work of finding readers."
      />
      <div className="mx-auto grid max-w-6xl gap-5 px-5 py-14 md:grid-cols-2">
        {GUIDES.map((g) => (
          <article key={g.title} className="rounded-xl border border-border bg-card p-7">
            <h2 className="font-serif text-xl text-card-foreground">{g.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{g.body}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
