import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CampaignCards } from "@/components/agency";

export const Route = createFileRoute("/client-campaigns")({
  staticData: { sitemap: true },
  head: () => ({ links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/client-campaigns" }], meta: [
    { title: "Featured Client Campaigns | Fourth Group & Co" }, { name: "description", content: "Selected fiction, memoir and non-fiction titles represented and promoted by Fourth Group & Co." },
    { property: "og:title", content: "Featured Client Campaigns | Fourth Group & Co" }, { property: "og:description", content: "Selected fiction, memoir and non-fiction titles represented and promoted by Fourth Group & Co." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "https://fourthgroupco.lovable.app/client-campaigns" },
  ] }),
  component: Page,
});

function Page() {
  return <PageShell><PageHeader kicker="Featured Client Campaigns" title="Books we have promoted" intro="Selected fiction, memoir, and non-fiction titles represented and promoted by Fourth Group & Co." /><section className="bg-secondary text-secondary-foreground"><div className="mx-auto max-w-6xl px-5 py-16"><CampaignCards /></div></section><section className="mx-auto max-w-6xl px-5 py-12"><div className="mt-12 text-center"><Button asChild size="lg" className="h-12 rounded-none"><Link to="/campaign-proposal" search={{ interest: undefined }}>Request a Campaign Proposal <ArrowRight /></Link></Button></div></section></PageShell>;
}
