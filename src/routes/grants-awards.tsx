import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, ListingGrid } from "@/components/page-shell";

export const Route = createFileRoute("/grants-awards")({
  head: () => ({
    meta: [
      { title: "Grants & Awards for Writers | Fourth Group & Co" },
      {
        name: "description",
        content:
          "Funding, fellowships and prizes for authors and poets, with eligibility and deadlines verified each season.",
      },
      { property: "og:title", content: "Grants & Awards for Writers | Fourth Group & Co" },
      { property: "og:description", content: "Fellowships, bursaries and prizes open to writers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const ITEMS = [
  {
    name: "Headland Fellowship",
    meta: "$12,000 · Deadline 30 Nov",
    detail: "A year of unrestricted funding for a writer working on a first book in any genre.",
    tag: "Fellowship",
  },
  {
    name: "Common Good Bursary",
    meta: "$3,500 · Rolling",
    detail: "Small grants for writers facing a specific barrier: childcare, travel, equipment or time.",
    tag: "Bursary",
  },
  {
    name: "The Weatherfield Prize",
    meta: "$7,500 · Deadline 15 Feb",
    detail: "Awarded to a published collection of poetry from a small press.",
    tag: "Prize",
  },
  {
    name: "Translators' Fund",
    meta: "$5,000 · Two rounds yearly",
    detail: "Supports sample translations and pitch packages for untranslated works.",
    tag: "Translation",
  },
  {
    name: "Late Start Award",
    meta: "$4,000 · Deadline 1 Sep",
    detail: "For writers publishing a first book after the age of fifty.",
    tag: "Debut",
  },
  {
    name: "Regional Voices Grant",
    meta: "$2,000 · Quarterly",
    detail: "Funding for writers working outside major publishing centres.",
    tag: "Regional",
  },
];

function Page() {
  return (
    <PageShell>
      <PageHeader
        kicker="Database"
        title="Grants, fellowships and awards"
        intro="Over 210 funding opportunities, each with eligibility, award amount and deadline confirmed with the awarding body."
      />
      <ListingGrid items={ITEMS} />
    </PageShell>
  );
}
