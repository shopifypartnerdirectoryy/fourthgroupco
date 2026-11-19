import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { LeadershipCards, SectionIntro, WhyGrid } from "@/components/agency";

export const Route = createFileRoute("/about")({
  staticData: { sitemap: true },
  head: () => ({ links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/about" }],
    meta: [
      { title: "About Fourth Group & Co | Book Marketing & Publicity Agency" },
      { name: "description", content: "Fourth Group & Co is a premium book promotion, publicity and literary marketing agency for authors, poets, independent publishers and storytellers." },
      { property: "og:title", content: "About Fourth Group & Co | Book Marketing & Publicity Agency" },
      { property: "og:description", content: "A strategic partner for authors and literary professionals. Meet our leadership team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "https://fourthgroupco.lovable.app/about" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHeader kicker="About Us" title="A Strategic Partner for Authors and Literary Professionals." intro="Your Story. Our Strategy. Greater Reach." />
      <section className="mx-auto max-w-3xl space-y-5 px-5 py-16 text-base leading-relaxed text-muted-foreground">
        <p className="font-serif text-2xl leading-snug text-foreground">Fourth Group &amp; Co was built around the belief that a book's journey does not end at publication.</p>
        <p>We work with authors, poets, independent publishers and storytellers to develop professional promotional strategies, create compelling marketing materials and expand the visibility of literary works.</p>
        <p>Our services bring together creative production, digital marketing, reader outreach and author development under one professional agency.</p>
        <p>Our goal is to make professional book promotion more accessible, strategic and effective through carefully structured services and personalised campaign support.</p>
      </section>
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <SectionIntro kicker="Our Leadership & Team" title="Driven by Vision. United by a Passion for Stories." />
          <LeadershipCards />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16">
        <SectionIntro kicker="Why Fourth Group & Co" title="A professional partner for your literary work" />
        <WhyGrid />
        <div className="mt-12 text-center"><Button asChild size="lg" className="h-12 rounded-none"><Link to="/campaign-proposal" search={{ interest: undefined }}>Request a Campaign Proposal <ArrowRight /></Link></Button></div>
      </section>
    </PageShell>
  );
}
