import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock3, Feather } from "lucide-react";
import { PageHeader, PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { CRAFT_ESSAYS } from "@/data/editorial-content";

export const Route = createFileRoute("/craft-practice")({
  staticData: { sitemap: true },
  head: () => ({ links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/craft-practice" }], meta: [
    { title: "Writing Craft & Practice | Fourth Group & Co" },
    { name: "description", content: "Original Fourth Group & Co essays on revision, voice, structure, character, feedback and building a sustainable writing practice." },
    { property: "og:title", content: "Writing Craft & Practice | Fourth Group & Co" },
    { property: "og:description", content: "Practical, considered essays for stronger drafts and a sustainable writing life." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { property: "og:url", content: "https://fourthgroupco.lovable.app/craft-practice" },
  ] }),
  component: CraftPage,
});

function CraftPage() {
  const [lead, ...essays] = CRAFT_ESSAYS;
  return <PageShell>
    <PageHeader kicker="The Fourth Group writing desk" title="Craft and practice" intro="Original essays about the decisions inside a draft and the habits that help writers return to the page." />
    <section className="mx-auto max-w-5xl px-5 py-14 md:py-20">
      <article className="grid gap-8 border-y border-border py-9 md:grid-cols-[.8fr_1.2fr] md:items-center">
        <div className="flex aspect-[4/3] items-center justify-center bg-secondary text-secondary-foreground"><Feather className="size-16 text-primary" /></div>
        <div><p className="text-xs font-semibold uppercase text-primary">Featured essay · {lead.topic}</p><h2 className="mt-3 font-serif text-3xl leading-tight">{lead.title}</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{lead.excerpt}</p><p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><Clock3 className="size-3.5" />{lead.length} · {lead.byline}</p></div>
      </article>
      <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
        {essays.map((essay) => <article key={essay.title} className="bg-card p-7"><p className="text-[10px] font-semibold uppercase text-primary">{essay.topic}</p><h2 className="mt-3 font-serif text-2xl leading-tight">{essay.title}</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{essay.excerpt}</p><div className="mt-6 flex items-center justify-between gap-3 text-xs text-muted-foreground"><span>{essay.byline}</span><span>{essay.length}</span></div></article>)}
      </div>
    </section>
    <section className="border-y border-border bg-accent/35"><div className="mx-auto max-w-3xl px-5 py-14 text-center"><p className="text-xs font-semibold uppercase text-primary">Put it into practice</p><h2 className="mt-3 font-serif text-3xl">Take an idea back to the page</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">The Fourth Group prompt library offers a clear starting point for fiction, poetry and memoir.</p><Button asChild className="mt-7"><Link to="/writing-prompts">Explore writing prompts <ArrowRight /></Link></Button></div></section>
  </PageShell>;
}