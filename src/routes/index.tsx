import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Check, Globe2, Search, Sparkles, Star, Users } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { FAQ, SITE } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fourth Group & Co — A Global Literary Community" },
      { name: "description", content: "A global literary community with curated opportunities, practical resources and meaningful visibility for writers." },
      { property: "og:title", content: "Fourth Group & Co — A Global Literary Community" },
      { property: "og:description", content: "Where serious writers build their careers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const benefits = [
  { icon: Search, title: "Opportunities & Growth", points: ["Curated magazines and small presses", "Grants, residencies and contests", "Current dates and open periods", "Focused literary agent research"] },
  { icon: Users, title: "Community & Visibility", points: ["A searchable author directory", "Literary events and workshops", "Book and writer spotlights", "Connections across the writing world"] },
  { icon: BookOpen, title: "Resources & Tools", points: ["Weekly writing prompts", "Practical publishing guides", "Submission preparation resources", "Craft and career support"] },
  { icon: Globe2, title: "Global Reach", points: ["Writers across countries and continents", "International opportunities", "Cross-border literary events", "A wider professional network"] },
];

const testimonials = [
  { quote: "Fourth Group & Co helped me find opportunities that matched my work instead of wasting another season on dead links.", name: "Adaeze Okonkwo", role: "Fiction writer" },
  { quote: "The research is careful and practical. I spend less time searching and more time working on the book.", name: "Marcus Ilesanmi", role: "Short-story writer" },
  { quote: "The directory gave my work a professional home and introduced me to a generous international community.", name: "Helen Varga", role: "Poet" },
];

function Index() {
  return (
    <PageShell>
      <section className="bg-secondary text-secondary-foreground">
        <div className="mx-auto flex min-h-[510px] max-w-5xl flex-col items-center justify-center px-5 py-16 text-center md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-semibold">
            <Sparkles className="size-4 text-primary" /> Annual Membership — ${SITE.membership}/year
          </div>
          <h1 className="mt-8 max-w-4xl font-serif text-5xl leading-[1.08] md:text-7xl">
            Where Serious Writers<br /><span className="text-primary">Build Their Careers</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-secondary-foreground/75 md:text-lg">
            Join a dedicated literary community. Access curated opportunities, connect with published authors, and find the resources that turn determined writers into published ones.
          </p>
          <Button asChild size="lg" className="mt-8 h-12 rounded-md px-8 font-semibold">
            <Link to="/membership">Join for ${SITE.membership}/year <ArrowRight /></Link>
          </Button>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-5 py-8 text-center md:grid-cols-4">
          {[['500+', 'Active members'], ['40+', 'Countries'], ['1,200+', 'Opportunities listed'], ['300+', 'Publications featured']].map(([number, label]) => (
            <div key={label}><p className="font-serif text-3xl text-primary">{number}</p><p className="mt-1 text-[10px] font-medium uppercase text-muted-foreground">{label}</p></div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20">
        <div className="text-center">
          <h2 className="font-serif text-3xl md:text-4xl">Everything You Need to <span className="text-primary">Succeed as a Writer</span></h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">Fourth Group &amp; Co is more than a directory — it is a launchpad for your literary career.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {benefits.map(({ icon: Icon, title, points }) => (
            <article key={title} className="rounded-md border border-border bg-card p-7 shadow-sm">
              <div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-md bg-accent"><Icon className="size-4 text-primary" /></span><h3 className="font-serif text-xl">{title}</h3></div>
              <ul className="mt-5 space-y-2">{points.map((point) => <li key={point} className="flex gap-2 text-sm text-muted-foreground"><Check className="mt-0.5 size-3.5 shrink-0 text-primary" />{point}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-accent/45">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <h2 className="text-center font-serif text-3xl">What Our Members Say</h2>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.name} className="rounded-md border border-border bg-card p-6 shadow-sm">
                <div className="flex gap-0.5 text-primary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}</div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">“{item.quote}”</p>
                <p className="mt-5 font-serif text-base">{item.name}</p><p className="text-xs text-muted-foreground">{item.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="font-serif text-3xl">Why join Fourth Group &amp; Co?</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">We maintain a focused, spam-free community and carefully researched literary opportunities. Membership directly supports that work.</p>
          <ul className="mt-7 space-y-3">{["Curated opportunities you will not find on free platforms", "A verified, spam-free community", "Exclusive newsletters with industry listings", "Global network spanning 40+ countries", "Editorial credibility through a verified profile"].map((point) => <li key={point} className="flex items-center gap-3 rounded-md bg-muted px-4 py-3 text-sm"><Check className="size-4 text-primary" />{point}</li>)}</ul>
          <div className="mt-7 rounded-md bg-secondary p-7 text-center text-secondary-foreground"><p className="text-[10px] font-semibold uppercase text-secondary-foreground/60">Annual membership</p><p className="mt-2 font-serif text-5xl text-primary">${SITE.membership}</p><p className="mt-2 text-xs text-secondary-foreground/60">per year — full access to all resources</p></div>
        </div>
        <div className="rounded-md border border-border bg-card p-10 text-center shadow-sm"><Sparkles className="mx-auto size-8 text-primary" /><h3 className="mt-5 font-serif text-2xl">Ready to Elevate Your Writing Career?</h3><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Join writers who are taking the step. Complete your membership request securely by email.</p><Button asChild className="mt-6 rounded-md"><Link to="/membership">Get started <ArrowRight /></Link></Button></div>
      </section>

      <section className="bg-accent/35">
        <div className="mx-auto max-w-3xl px-5 py-20"><h2 className="text-center font-serif text-3xl">Frequently Asked Questions</h2><div className="mt-9 space-y-3">{FAQ.map((item) => <article key={item.q} className="rounded-md border border-border bg-card p-5"><h3 className="font-serif text-base">{item.q}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p></article>)}</div></div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 text-center"><h2 className="font-serif text-3xl">Your Literary Career Starts Here</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">Do not let another opportunity pass you by. Join a community dedicated to helping writers find trusted opportunities and get noticed.</p><Button asChild size="lg" className="mt-7 rounded-md"><Link to="/membership">Join the community <ArrowRight /></Link></Button></section>
    </PageShell>
  );
}