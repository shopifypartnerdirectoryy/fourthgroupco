import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, ListingGrid } from "@/components/page-shell";

export const Route = createFileRoute("/residencies")({
  head: () => ({
    meta: [
      { title: "Writing Retreats & Residencies | Fourth Group & Co" },
      {
        name: "description",
        content:
          "Funded and low-cost residencies and retreats for writers, with length of stay, costs and application dates.",
      },
      { property: "og:title", content: "Writing Retreats & Residencies | Fourth Group & Co" },
      { property: "og:description", content: "Places to write, with the costs stated up front." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const ITEMS = [
  {
    name: "Headland Cottage",
    meta: "2–6 weeks · Fully funded",
    detail: "A single writer at a time on a working coastal farm, with a stipend for travel.",
    tag: "Funded",
  },
  {
    name: "The Winter House",
    meta: "1 month · $400 contribution",
    detail: "Six writers share a converted schoolhouse; evenings are for reading aloud.",
    tag: "Group",
  },
  {
    name: "Riverbank Studio",
    meta: "1–2 weeks · Free",
    detail: "A quiet room and desk in a city library, offered to local writers year-round.",
    tag: "Urban",
  },
  {
    name: "Highfield Residency",
    meta: "3 months · Funded + stipend",
    detail: "Long-form projects only, with a modest teaching commitment at the host school.",
    tag: "Long stay",
  },
  {
    name: "Saltmarsh Weeks",
    meta: "10 days · Sliding scale",
    detail: "Pay what you can, prioritising writers who have never had a residency before.",
    tag: "Accessible",
  },
  {
    name: "Orchard Retreat",
    meta: "2 weeks · Family friendly",
    detail: "Childcare provided on site, designed for writers who are also carers.",
    tag: "Carers",
  },
];

function Page() {
  return (
    <PageShell>
      <PageHeader
        kicker="Database"
        title="Retreats and residencies"
        intro="Eighty-five places to work, from fully funded months away to a free desk for a fortnight. Costs and application dates are confirmed with each host."
      />
      <ListingGrid items={ITEMS} />
    </PageShell>
  );
}
