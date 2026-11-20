import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ScreenDivision } from "@/components/agency";

export const Route = createFileRoute("/screen-adaptation")({
  staticData: { sitemap: true },
  head: () => ({ links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/screen-adaptation" }], meta: [
    { title: "Book-to-Screen Packaging & Representation | Fourth Group & Co" }, { name: "description", content: "Book-to-screen assessment, adaptation synopses, pitch decks and presentation materials for authors preparing stories for film and television professionals." },
    { property: "og:title", content: "Book-to-Screen Packaging & Representation | Fourth Group & Co" }, { property: "og:description", content: "Book-to-screen assessment, adaptation synopses, pitch decks and presentation materials for authors preparing stories for film and television professionals." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "https://fourthgroupco.lovable.app/screen-adaptation" },
  ] }),
  component: Page,
});

function Page() {
  return <PageShell><section className="bg-secondary text-secondary-foreground"><div className="mx-auto max-w-6xl px-5 py-20"><ScreenDivision asH1 /></div></section><section className="mx-auto max-w-4xl px-5 py-16 text-sm leading-relaxed text-muted-foreground"><h2 className="font-serif text-3xl text-foreground">How assessment works</h2><p className="mt-4">Share your book through the proposal form and choose Book-to-Screen Packaging as your goal. We review the story's visual engine, central conflict and audience, then recommend which presentation materials would help it travel. You keep all rights in your work.</p><p className="mt-4">Writers can also use our existing <Link to="/movie-adaptation" className="text-primary underline">pitch library</Link> to publish an adaptation pitch.</p><div className="mt-12 text-center"><Button asChild size="lg" className="h-12 rounded-none"><Link to="/campaign-proposal" search={{}}>Request a Campaign Proposal <ArrowRight /></Link></Button></div></section></PageShell>;
}
