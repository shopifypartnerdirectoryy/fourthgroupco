import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/page-shell";
import { OpportunityDirectory } from "@/components/opportunity-directory";
import { CONTESTS } from "@/data/opportunities";

export const Route = createFileRoute("/contests")({
  staticData: { sitemap: true },
  head: () => ({ links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/contests" }],
    meta: [
      { title: "Writing Contests & Competitions | Fourth Group & Co" },
      {
        name: "description",
        content:
          "Open writing contests for poetry, fiction, essay and screenwriting, with entry fees, prizes and deadlines.",
      },
      { property: "og:title", content: "Writing Contests & Competitions | Fourth Group & Co" },
      { property: "og:description", content: "Open competitions with verified deadlines and prizes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "https://fourthgroupco.lovable.app/contests" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHeader
        kicker="Database"
        title="Writing contests now open"
        intro="Compare established competitions across poetry, fiction, essays and books, with fees and prize information shown plainly."
      />
      <OpportunityDirectory items={CONTESTS} searchPlaceholder="Search contests, genres, or entry fees" renderDetails={(item) => <><p><span className="text-muted-foreground">Prize:</span> <strong>{item.prize}</strong></p><p><span className="text-muted-foreground">Entry:</span> {item.fee}</p><p><span className="text-muted-foreground">Deadline:</span> {item.deadline}</p></>} />
    </PageShell>
  );
}
