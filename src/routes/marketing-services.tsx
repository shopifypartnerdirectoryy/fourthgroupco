import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SectionIntro, ServicesCatalogue, ServiceTerms } from "@/components/agency";

export const Route = createFileRoute("/marketing-services")({
  staticData: { sitemap: true },
  head: () => ({ links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/marketing-services" }], meta: [
    { title: "Book Marketing Services & Prices | Fourth Group & Co" }, { name: "description", content: "Book promotion services: reader email campaigns, Goodreads Listopia, book challenges, TikTok and Instagram features, social media, trailers, audiobooks, author websites, Amazon SEO & Ads, author SEO and AI search visibility." },
    { property: "og:title", content: "Book Marketing Services & Prices | Fourth Group & Co" }, { property: "og:description", content: "Book promotion services: reader email campaigns, Goodreads Listopia, book challenges, TikTok and Instagram features, social media, trailers, audiobooks, author websites, Amazon SEO & Ads, author SEO and AI search visibility." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "https://fourthgroupco.lovable.app/marketing-services" },
  ] }),
  component: Page,
});

function Page() {
  return <PageShell><PageHeader kicker="Our Marketing Services" title="Individual services for every stage of a book's life" intro="Explore our individual marketing and creative services. Each solution can be commissioned independently or incorporated into a broader promotional campaign." /><section className="mx-auto max-w-6xl px-5 py-16"><ServicesCatalogue /></section><section id="terms" className="scroll-mt-24 border-t border-border bg-muted/40"><div className="mx-auto max-w-6xl px-5 py-16"><SectionIntro center={false} kicker="Trust & Transparency" title="Service terms in plain language" /><ServiceTerms /><div className="mt-12 text-center"><Button asChild size="lg" className="h-12 rounded-none"><Link to="/campaign-proposal" search={{}}>Request a Campaign Proposal <ArrowRight /></Link></Button></div></div></section></PageShell>;
}
