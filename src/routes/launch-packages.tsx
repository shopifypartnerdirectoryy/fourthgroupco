import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PackageCards } from "@/components/agency";

export const Route = createFileRoute("/launch-packages")({
  staticData: { sitemap: true },
  head: () => ({ links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/launch-packages" }], meta: [
    { title: "Book Launch Packages & Pricing | Fourth Group & Co" }, { name: "description", content: "Three signature book launch marketing packages: Debut Visibility Suite, Bestseller Momentum Campaign and Complete Author Brand & Launch." },
    { property: "og:title", content: "Book Launch Packages & Pricing | Fourth Group & Co" }, { property: "og:description", content: "Three signature book launch marketing packages: Debut Visibility Suite, Bestseller Momentum Campaign and Complete Author Brand & Launch." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "https://fourthgroupco.lovable.app/launch-packages" },
  ] }),
  component: Page,
});

function Page() {
  return <PageShell><PageHeader kicker="Signature Launch Packages" title="Thoughtfully assembled book launch campaigns" intro="Promotional campaigns designed to help authors introduce their books, strengthen visibility and build meaningful connections with readers." /><section className="mx-auto max-w-6xl px-5 py-16"><PackageCards /><p className="mt-10 text-center text-xs text-muted-foreground">Package names are product names, not guarantees of sales or bestseller status. Email audiences are permission-based reader lists. <Link to="/marketing-services" hash="terms" className="text-primary underline">Service terms</Link></p><div className="mt-12 text-center"><Button asChild size="lg" className="h-12 rounded-none"><Link to="/campaign-proposal" search={{ interest: undefined }}>Request a Campaign Proposal <ArrowRight /></Link></Button></div></section></PageShell>;
}
