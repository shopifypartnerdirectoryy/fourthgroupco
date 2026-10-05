import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock3, Mail } from "lucide-react";
import { PageHeader, PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { NEWS_ARTICLES } from "@/data/editorial-content";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/news")({
  staticData: { sitemap: true },
  head: () => ({ links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/news" }], meta: [
    { title: "Literary News & Articles | Fourth Group & Co" },
    { name: "description", content: "Read original Fourth Group & Co publishing insight, author conversations, opportunity notes, rights guidance and community news." },
    { property: "og:title", content: "Literary News & Articles | Fourth Group & Co" },
    { property: "og:description", content: "Original publishing insight, author conversations and thoughtful literary coverage." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { property: "og:url", content: "https://fourthgroupco.lovable.app/news" },
  ] }),
  component: NewsPage,
});

function NewsPage() {
  const [lead, ...articles] = NEWS_ARTICLES;
  return <PageShell>
    <PageHeader kicker="Fourth Group journal" title="News and articles" intro="Publishing intelligence, author conversations and careful notes on the opportunities, rights and ideas shaping a writing life." />
    <section className="mx-auto max-w-5xl px-5 py-14 md:py-20">
      <article className="grid gap-8 border-b border-border pb-12 md:grid-cols-[1.15fr_.85fr] md:items-center"><div><p className="text-xs font-semibold uppercase text-primary">{lead.category}</p><h2 className="mt-3 font-serif text-4xl leading-tight">{lead.title}</h2><p className="mt-5 text-base leading-relaxed text-muted-foreground">{lead.excerpt}</p><p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><Clock3 className="size-3.5" />{lead.read}</p></div><div className="flex aspect-[4/3] flex-col justify-end bg-secondary p-8 text-secondary-foreground"><p className="text-xs font-semibold uppercase text-primary">From our editorial desk</p><p className="mt-4 font-serif text-2xl leading-relaxed">“Useful literary coverage begins by asking what a writer can understand, question or do next.”</p></div></article>
      <div className="mt-12"><div className="flex items-end justify-between gap-5"><div><p className="text-xs font-semibold uppercase text-primary">Latest from the journal</p><h2 className="mt-3 font-serif text-3xl">Read, consider, return</h2></div><Button asChild variant="outline" size="sm"><Link to="/craft-practice">Craft essays <ArrowRight /></Link></Button></div><div className="mt-8 divide-y divide-border border-y border-border">{articles.map((article) => <article key={article.title} className="grid gap-3 py-7 md:grid-cols-[10rem_1fr_auto] md:items-start"><p className="text-[10px] font-semibold uppercase text-primary">{article.category}</p><div><h3 className="font-serif text-xl">{article.title}</h3><p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p></div><p className="flex items-center gap-2 text-xs text-muted-foreground"><Clock3 className="size-3.5" />{article.read}</p></article>)}</div></div>
    </section>
    <section className="border-y border-border bg-accent/35"><div className="mx-auto max-w-3xl px-5 py-14 text-center"><Mail className="mx-auto size-6 text-primary" /><h2 className="mt-4 font-serif text-3xl">Have a story for the Fourth Group desk?</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">Send publication news, an award, a community project or an author milestone for editorial consideration.</p><Button asChild className="mt-7"><a href={`mailto:${SITE.email}?subject=News for the Fourth Group editorial desk`}>Write to the editorial desk <ArrowRight /></a></Button></div></section>
  </PageShell>;
}