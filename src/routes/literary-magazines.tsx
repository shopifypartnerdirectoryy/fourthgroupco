import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, ListingGrid } from "@/components/page-shell";

export const Route = createFileRoute("/literary-magazines")({
  head: () => ({
    meta: [
      { title: "Literary Magazines Database | Fourth Group & Co" },
      {
        name: "description",
        content:
          "Browse verified literary magazines with reading periods, submission fees and response times, curated by Fourth Group & Co.",
      },
      { property: "og:title", content: "Literary Magazines Database | Fourth Group & Co" },
      {
        property: "og:description",
        content: "Verified journals and magazines open to poetry, fiction and essays.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const ITEMS = [
  {
    name: "The Harbour Review",
    meta: "Poetry · Essays · Open Sept–Dec",
    detail: "Quarterly print journal with a preference for long-lined poems and place-based essays. No reading fee.",
    tag: "Print",
  },
  {
    name: "Lantern Quarterly",
    meta: "Fiction · Open year-round",
    detail: "Short fiction up to 5,000 words. Pays on acceptance and responds within eight weeks.",
    tag: "Paying",
  },
  {
    name: "Common Field",
    meta: "Nature writing · Open Jan–Mar",
    detail: "Essays and reportage on land, farming and climate. Welcomes first publications.",
    tag: "Online",
  },
  {
    name: "Nightshift",
    meta: "Genre & speculative · Rolling",
    detail: "Speculative short fiction and flash. Strong track record with debut authors.",
    tag: "Paying",
  },
  {
    name: "The Ninth Letter Box",
    meta: "Hybrid forms · Open Oct–Feb",
    detail: "Prose poetry, lyric essay and anything that resists a category.",
    tag: "Hybrid",
  },
  {
    name: "Riverlight",
    meta: "Poetry · Open Apr–Jun",
    detail: "A poetry-only journal publishing twice a year, with translation always welcome.",
    tag: "Translation",
  },
];

function Page() {
  return (
    <PageShell>
      <PageHeader
        kicker="Database"
        title="Literary magazines open to submissions"
        intro="Over 340 journals, each checked by hand for reading period, fees, payment and response time. A sample of the database is shown below."
      />
      <ListingGrid items={ITEMS} />
    </PageShell>
  );
}
