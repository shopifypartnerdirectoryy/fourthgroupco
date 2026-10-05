import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Compass, Mail } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { AUTHOR_SERVICES } from "@/data/editorial-content";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/author-services")({
  staticData: { sitemap: true },
  head: () => ({ links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/author-services" }], meta: [
    { title: "Editorial & Author Services | Fourth Group & Co" },
    { name: "description", content: "Explore Fourth Group & Co manuscript, editing, book design, publication, publicity, rights and author-platform support." },
    { property: "og:title", content: "Editorial & Author Services | Fourth Group & Co" },
    { property: "og:description", content: "Thoughtful professional support from manuscript development through publication and readership." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { property: "og:url", content: "https://fourthgroupco.lovable.app/author-services" },
  ] }),
  component: AuthorServicesPage,
});

function AuthorServicesPage() {
  return <PageShell>
    <section className="bg-secondary text-secondary-foreground"><div className="mx-auto max-w-5xl px-5 py-16 text-center md:py-24"><p className="text-xs font-semibold uppercase text-primary">Fourth Group author services</p><h1 className="mx-auto mt-4 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">Support for the life of a book</h1><p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-secondary-foreground/70">Editorial, publishing and visibility support shaped around the work itself—not a one-size-fits-all package.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button asChild size="lg"><a href={`mailto:${SITE.email}?subject=Author services enquiry`}>Tell us about your book <ArrowRight /></a></Button><Button asChild size="lg" variant="outline" className="border-secondary-foreground/30 bg-transparent text-secondary-foreground hover:bg-secondary-foreground/10 hover:text-secondary-foreground"><Link to="/contact">Ask a question</Link></Button></div></div></section>

    <section className="mx-auto max-w-6xl px-5 py-16"><div className="mx-auto max-w-2xl text-center"><p className="text-xs font-semibold uppercase text-primary">Choose the right next step</p><h2 className="mt-3 font-serif text-3xl">Work begins with a conversation</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">We first consider the manuscript, the author’s goal and the stage of the project. Any recommended scope is then explained clearly before work begins.</p></div><div className="mt-12 divide-y divide-border border-y border-border">{AUTHOR_SERVICES.map((service) => <article key={service.name} className="grid gap-6 py-8 md:grid-cols-[11rem_1fr_1fr]"><div><span className="text-[10px] font-semibold uppercase text-primary">{service.stage}</span><h2 className="mt-2 font-serif text-2xl">{service.name}</h2></div><p className="text-sm leading-relaxed text-muted-foreground">{service.detail}</p><ul className="space-y-2">{service.includes.map((item) => <li key={item} className="flex gap-2 text-sm text-muted-foreground"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{item}</li>)}</ul></article>)}</div></section>

    <section className="border-y border-border bg-muted/45"><div className="mx-auto grid max-w-5xl gap-8 px-5 py-14 md:grid-cols-[auto_1fr_auto] md:items-center"><Compass className="size-10 text-primary" /><div><h2 className="font-serif text-2xl">Not sure what your book needs?</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Send a short description of the project, its current stage and the outcome you are working towards. We will suggest the most useful starting point.</p></div><Button asChild><a href={`mailto:${SITE.email}?subject=Help choosing an author service`}><Mail />Email the team</a></Button></div></section>
  </PageShell>;
}