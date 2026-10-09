import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/page-shell";
import { OpportunityDirectory } from "@/components/opportunity-directory";
import { GRANTS } from "@/data/opportunities";

export const Route = createFileRoute("/grants-awards")({
  staticData: { sitemap: true },
  head: () => ({ links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/grants-awards" }],
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
      { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "https://fourthgroupco.lovable.app/grants-awards" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHeader
        kicker="Database"
        title="Grants, fellowships and awards"
        intro="Research fellowships, project grants and literary awards. Each entry leads to the funder’s official guidance for current dates and eligibility."
      />
      <OpportunityDirectory category="Grant & award" items={GRANTS} searchPlaceholder="Search grants, awards, genres, or eligibility" renderDetails={(item) => <><p><span className="text-muted-foreground">Award:</span> <strong>{item.amount}</strong></p><p><span className="text-muted-foreground">Deadline:</span> {item.deadline}</p><p><span className="text-muted-foreground">Eligibility:</span> {item.eligibility}</p></>} />
    </PageShell>
  );
}
