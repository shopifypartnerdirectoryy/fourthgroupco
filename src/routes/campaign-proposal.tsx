import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/page-shell";
import { CampaignProposalForm } from "@/components/agency";

export const Route = createFileRoute("/campaign-proposal")({
  staticData: { sitemap: true },
  validateSearch: (s: Record<string, unknown>): { interest?: string } => (typeof s["interest"] === "string" ? { interest: s["interest"].slice(0, 120) } : {}),
  head: () => ({ links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/campaign-proposal" }], meta: [
    { title: "Request a Book Marketing Proposal | Fourth Group & Co" }, { name: "description", content: "Share your book and goals; a Senior Campaign Strategist will prepare a tailored book promotion roadmap. No obligation." },
    { property: "og:title", content: "Request a Book Marketing Proposal | Fourth Group & Co" }, { property: "og:description", content: "Share your book and goals; a Senior Campaign Strategist will prepare a tailored book promotion roadmap. No obligation." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "https://fourthgroupco.lovable.app/campaign-proposal" },
  ] }),
  component: Page,
});

function Page() {
  const { interest } = Route.useSearch();
  return <PageShell><PageHeader kicker="Tailored Campaign Strategy" title="Request a Custom Book Marketing Proposal" intro="Preparing for an upcoming release or revitalizing a backlist title? Share your project details, and our campaign directors will prepare a tailored promotional roadmap for your book." /><section className="mx-auto max-w-2xl px-5 py-14"><CampaignProposalForm {...(interest ? { interest } : {})} /></section></PageShell>;
}
