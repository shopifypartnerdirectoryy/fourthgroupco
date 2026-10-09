import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/page-shell";
import { OpportunityDirectory } from "@/components/opportunity-directory";
import { RESIDENCIES } from "@/data/opportunities";

export const Route = createFileRoute("/residencies")({
  staticData: { sitemap: true },
  head: () => ({ links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/residencies" }],
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
      { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "https://fourthgroupco.lovable.app/residencies" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHeader
        kicker="Database"
        title="Retreats and residencies"
        intro="Explore respected places offering writers protected time, accommodation and creative community, with funding information shown up front."
      />
      <OpportunityDirectory category="Residency" items={RESIDENCIES} searchPlaceholder="Search residencies, locations, or funding" renderDetails={(item) => <><p><span className="text-muted-foreground">Location:</span> <strong>{item.location}</strong></p><p><span className="text-muted-foreground">Duration:</span> {item.duration}</p><p><span className="text-muted-foreground">Funding:</span> {item.funding}</p></>} />
    </PageShell>
  );
}
