import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Globe2, Mail } from "lucide-react";
import { PageHeader, PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { EVENT_PROGRAMMES, UPCOMING_EVENTS } from "@/data/editorial-content";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/events")({
  staticData: { sitemap: true },
  head: () => ({
    links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/events" }],
    meta: [
      { title: "Literary Events & Workshops | Fourth Group & Co" },
      { name: "description", content: "Discover Fourth Group & Co readings, craft workshops, author conversations and screen-story events for writers and readers." },
      { property: "og:title", content: "Literary Events & Workshops | Fourth Group & Co" },
      { property: "og:description", content: "Readings, practical workshops and thoughtful literary conversations from the Fourth Group community." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://fourthgroupco.lovable.app/events" },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <PageShell>
      <PageHeader kicker="Fourth Group programme" title="Literary events" intro="Readings, practical workshops and book conversations designed to bring writers and attentive readers into the same room." />

      <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase text-primary">Ways to take part</p>
          <h2 className="mt-3 font-serif text-3xl">A programme built around the work</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Each format has a clear purpose: to share new writing, strengthen a manuscript or open a considered conversation around books.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {EVENT_PROGRAMMES.map((programme) => (
            <article key={programme.name} className="flex flex-col border-t-2 border-primary bg-card p-6 shadow-sm">
              <p className="text-[10px] font-semibold uppercase text-primary">{programme.audience}</p>
              <h2 className="mt-3 font-serif text-2xl">{programme.name}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{programme.detail}</p>
              <p className="mt-auto flex items-center gap-2 pt-7 text-xs font-semibold text-foreground"><Globe2 className="size-4 text-primary" />{programme.access}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/45">
        <div className="mx-auto max-w-5xl px-5 py-14 md:py-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="text-xs font-semibold uppercase text-primary">Coming to the programme</p><h2 className="mt-3 font-serif text-3xl">Events in preparation</h2></div>
            <p className="max-w-sm text-sm text-muted-foreground">Dates and booking details will be announced when each session is confirmed.</p>
          </div>
          <div className="mt-9 divide-y divide-border border-y border-border">
            {UPCOMING_EVENTS.map((event) => (
              <article key={event.title} className="grid gap-4 py-7 sm:grid-cols-[10rem_1fr_auto] sm:items-center">
                <div><span className="text-[10px] font-semibold uppercase text-primary">{event.type}</span><p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground"><CalendarDays className="size-3.5" />To be announced</p></div>
                <div><h3 className="font-serif text-xl">{event.title}</h3><p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{event.note}</p><p className="mt-2 text-xs font-medium text-foreground">{event.format}</p></div>
                <Button asChild variant="outline" size="sm"><a href={`mailto:${SITE.email}?subject=${encodeURIComponent(`Event interest: ${event.title}`)}`}><Mail />Register interest</a></Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary text-secondary-foreground"><div className="mx-auto max-w-3xl px-5 py-16 text-center"><h2 className="font-serif text-3xl">Bring a Fourth Group event to your community</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-secondary-foreground/70">Libraries, festivals, bookshops and writing groups can contact our team about a reading, conversation or practical workshop.</p><Button asChild className="mt-7"><Link to="/contact">Start a conversation <ArrowRight /></Link></Button></div></section>
    </PageShell>
  );
}