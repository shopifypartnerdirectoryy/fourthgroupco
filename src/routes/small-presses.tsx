import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, ListingGrid } from "@/components/page-shell";

export const Route = createFileRoute("/small-presses")({
  head: () => ({
    meta: [
      { title: "Small Presses Directory | Fourth Group & Co" },
      {
        name: "description",
        content:
          "Independent and small presses accepting manuscripts, with submission windows and agent requirements.",
      },
      { property: "og:title", content: "Small Presses Directory | Fourth Group & Co" },
      {
        property: "og:description",
        content: "Independent publishers open to unagented manuscripts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const ITEMS = [
  {
    name: "Saltmarsh Books",
    meta: "Literary fiction · Unagented welcome",
    detail: "Publishes six titles a year with a long editorial relationship and generous royalty terms.",
    tag: "Fiction",
  },
  {
    name: "Ochre Press",
    meta: "Poetry · Open March",
    detail: "Full-length collections and pamphlets, with a strong commitment to debut poets.",
    tag: "Poetry",
  },
  {
    name: "Ferry House",
    meta: "Memoir & essay · Query first",
    detail: "Narrative non-fiction with an eye for voice. Query with fifty pages and a synopsis.",
    tag: "Non-fiction",
  },
  {
    name: "Blue Kiln",
    meta: "Translation · Rolling",
    detail: "Works in translation from any language, paired with a translator advocacy programme.",
    tag: "Translation",
  },
  {
    name: "Thistle & Thread",
    meta: "Children's & YA · Open Aug–Oct",
    detail: "Middle grade and young adult, with illustration commissioned in-house.",
    tag: "YA",
  },
  {
    name: "Ninth Wave",
    meta: "Speculative · Unagented welcome",
    detail: "Science fiction and fantasy novels from 70,000 words, no simultaneous submissions.",
    tag: "Genre",
  },
];

function Page() {
  return (
    <PageShell>
      <PageHeader
        kicker="Database"
        title="Small and independent presses"
        intro="More than 120 publishers who read unagented work, with submission windows, genres and terms confirmed directly with each press."
      />
      <ListingGrid items={ITEMS} />
    </PageShell>
  );
}
