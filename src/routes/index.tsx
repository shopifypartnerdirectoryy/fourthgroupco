import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe2, Quote } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { NewsletterSignup } from "@/components/home-extras";
import { CampaignCards, CampaignProposalForm, PackageCards, PillarSummary, ScreenDivision, SectionIntro, WhyGrid } from "@/components/agency";
import { AGENCY } from "@/data/agency";
import heroDesk from "@/assets/hero-desk.jpg";
import earlyMornings from "@/assets/early-mornings-with-dick.jpg";
import nobelPursuits from "@/assets/nobel-pursuits.jpg";
import stjarnasStars from "@/assets/stjarnas-stars.jpg";

const TITLE = "Fourth Group & Co | Premium Book Marketing & Publicity Agency";
const DESC = "Discover professional book promotion, literary publicity, author marketing, book launch campaigns and creative promotional services with Fourth Group & Co.";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({ links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/" }],
    meta: [
      { title: TITLE }, { name: "description", content: DESC },
      { property: "og:title", content: TITLE }, { property: "og:description", content: DESC },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "https://fourthgroupco.lovable.app/" },
    ],
  }),
  component: Index,
});

const REVIEW_DRAFTS = [
  "I appreciated having a clear plan for introducing my book to the readers most likely to connect with it. The process felt considered, not one-size-fits-all.",
  "The creative direction gave me a more cohesive way to talk about my book across its launch materials and outreach.",
  "It was reassuring to have the campaign pieces organized around my goals and timeline, with room for my own voice.",
];

function Index() {
  return (
    <PageShell>
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <img src={heroDesk} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover opacity-15" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 md:py-28 lg:grid-cols-[1.25fr_.75fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Premier Book Publicity &amp; Strategic Marketing</p>
            <h1 className="mt-6 font-serif text-4xl leading-[1.08] md:text-6xl">Strategic Book Campaigns Built to Reach Readers, Press, and Producers.</h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-secondary-foreground/75 md:text-lg">Fourth Group &amp; Co partners with discerning authors, independent presses, and storytellers to execute high-impact book launches, targeted reader outreach, cinematic trailers, and bespoke author branding.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-none px-7"><Link to="/launch-packages">Explore Launch Packages <ArrowRight /></Link></Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-none border-secondary-foreground/30 bg-transparent px-7 text-secondary-foreground hover:bg-secondary-foreground/10 hover:text-secondary-foreground"><a href="#proposal">Request a Campaign Assessment</a></Button>
            </div>
            <p className="mt-8 font-serif text-lg italic text-primary">{AGENCY.tagline}</p>
          </div>
          <div className="relative hidden h-[420px] lg:block" aria-hidden="true">
            <img src={nobelPursuits} alt="" className="absolute left-0 top-10 w-40 rotate-[-6deg] shadow-2xl" />
            <img src={earlyMornings} alt="" className="absolute left-24 top-0 z-10 w-48 shadow-2xl" />
            <img src={stjarnasStars} alt="" className="absolute right-0 top-24 w-40 rotate-[5deg] shadow-2xl" />
          </div>
        </div>
      </section>

      <section className="bg-background"><div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">About Us</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">A literary marketing agency built around authors.</h2>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
          <p>Fourth Group &amp; Co is a book promotion and publicity agency. We work with authors, poets, independent publishers and storytellers to help their books reach the readers they were written for.</p>
          <p>We plan launch campaigns, create trailers and promotional visuals, run reader outreach and social features, and build author websites, all shaped around each book and its audience.</p>
          <Button asChild variant="link" className="h-auto px-0 text-primary"><Link to="/about">More about Fourth Group &amp; Co <ArrowRight /></Link></Button>
        </div>
      </div></section>

      <section className="bg-secondary text-secondary-foreground"><div className="mx-auto max-w-6xl px-5 py-20">
        <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Featured Client Campaigns</p><h2 className="mt-3 font-serif text-4xl md:text-5xl">Books we have championed</h2><p className="mt-4 text-sm text-secondary-foreground/65">Selected fiction, memoir, and non-fiction titles represented and promoted by Fourth Group &amp; Co.</p></div>
        <CampaignCards limit={8} />
        <div className="mt-10 text-center"><Button asChild variant="link" className="text-primary"><Link to="/client-campaigns">See all client campaigns <ArrowRight /></Link></Button></div>
      </div></section>

      <section className="bg-background"><div className="mx-auto max-w-6xl px-5 py-20">
        <SectionIntro kicker="Signature Launch Packages" title="Campaigns assembled for launch" intro="Thoughtfully assembled promotional campaigns designed to help authors introduce their books, strengthen visibility and build meaningful connections with readers." />
        <PackageCards />
      </div></section>

      <section className="border-y border-border bg-muted/40"><div className="mx-auto max-w-6xl px-5 py-20">
        <SectionIntro kicker="Our Marketing Services" title="Nine departments, one complete marketing partner" intro="Explore our individual marketing and creative services. Each solution can be commissioned independently or incorporated into a broader promotional campaign." />
        <PillarSummary />
        <div className="mt-10 text-center"><Button asChild variant="outline" className="h-11 rounded-none"><Link to="/marketing-services">View all services &amp; pricing <ArrowRight /></Link></Button></div>
      </div></section>

      <section className="bg-background"><div className="mx-auto max-w-6xl px-5 py-20">
        <SectionIntro kicker="Author Reflections" title="What Our Members Say" intro="Illustrative review drafts for layout only—not verified client testimonials. Replace with approved feedback before presenting these as real experiences." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REVIEW_DRAFTS.map((review) => (
            <figure key={review} className="flex flex-col border border-border bg-card p-7 text-card-foreground">
              <Quote aria-hidden="true" className="size-5 text-primary" />
              <blockquote className="mt-4 font-serif text-xl leading-snug">“{review}”</blockquote>
              <figcaption className="mt-auto pt-5 text-xs text-muted-foreground">Author reflection</figcaption>
            </figure>
          ))}
        </div>
      </div></section>

      <section className="border-t border-secondary-foreground/10 bg-secondary text-secondary-foreground"><div className="mx-auto max-w-6xl px-5 py-20"><ScreenDivision /></div></section>

      <section className="bg-background"><div className="mx-auto max-w-6xl px-5 py-20">
        <SectionIntro kicker="Why Fourth Group & Co" title="Strategic promotion. Creative marketing. Greater literary visibility." />
        <WhyGrid />
        <p className="mt-6 text-center text-xs text-muted-foreground">We never guarantee sales, rankings, reviews or media placements. <Link to="/marketing-services" hash="terms" className="text-primary underline">Read our service terms</Link>.</p>
      </div></section>

      <section id="proposal" className="scroll-mt-10 border-y border-border bg-accent/35"><div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Tailored Campaign Strategy</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">Request a Custom Book Marketing Proposal.</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">Preparing for an upcoming release or revitalizing a backlist title? Share your project details, and our campaign directors will prepare a tailored promotional roadmap for your book.</p>
          <p className="mt-4 text-xs text-muted-foreground">Every submission is reviewed by a Senior Campaign Strategist. No obligation.</p>
        </div>
        <CampaignProposalForm />
      </div></section>

      <section className="bg-background"><div className="mx-auto max-w-4xl px-5 py-16 text-center">
        <Globe2 className="mx-auto size-6 text-primary" />
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">A wider initiative</p>
        <h2 className="mt-3 font-serif text-3xl">The Fourth Group Literary Network</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">A wider literary initiative connecting authors, poets, screenwriters and publishing professionals through industry insights, literary opportunities, creative connections and professional resources.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm"><Link to="/literary-magazines" className="text-primary underline-offset-4 hover:underline">Literary magazines</Link><Link to="/literary-agents" className="text-primary underline-offset-4 hover:underline">Literary agents</Link><Link to="/grants-awards" className="text-primary underline-offset-4 hover:underline">Grants</Link><Link to="/news" className="text-primary underline-offset-4 hover:underline">Literary journal</Link><Link to="/author-community" className="text-primary underline-offset-4 hover:underline">Community</Link></div>
      </div></section>

      <NewsletterSignup />
    </PageShell>
  );
}
