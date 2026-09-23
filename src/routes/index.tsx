import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, BookOpen } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import {
  SITE,
  TOOLS,
  PROMPT,
  ANNOUNCEMENT,
  BOOKS,
  PAST_SPOTLIGHTS,
  ARTISTS,
  FEATURES,
} from "@/data/site";
import heroDesk from "@/assets/hero-desk.jpg";
import coverOne from "@/assets/cover-one.jpg";
import coverTwo from "@/assets/cover-two.jpg";
import coverThree from "@/assets/cover-three.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Fourth Group & Co — Writing Community for Authors, Poets & Screenwriters",
      },
      {
        name: "description",
        content:
          "A global writers network: verified literary magazines, small presses, grants, contests and residencies, plus an author directory and weekly prompts.",
      },
      {
        property: "og:title",
        content: "Fourth Group & Co — Writing Community for Authors, Poets & Screenwriters",
      },
      {
        property: "og:description",
        content:
          "Verified submission opportunities, an author directory and weekly prompts for working writers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const COVERS = [coverOne, coverTwo, coverThree];

function Index() {
  return (
    <PageShell>
      {/* Membership banner */}
      <div className="border-b border-border/70 bg-primary/5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 px-5 py-3 text-center">
          <p className="text-sm text-foreground">
            Unlock the full literary database — join {SITE.name} for ${SITE.membership}/year.
          </p>
          <Link
            to="/membership"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary underline underline-offset-4"
          >
            Become a member <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pt-14">
        <h1 className="max-w-4xl font-serif text-4xl leading-[1.1] text-foreground md:text-6xl">
          Writing communities for authors, poets and screenwriters
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{SITE.tagline}</p>

        <Link to="/news" className="group mt-10 block overflow-hidden rounded-2xl border border-border">
          <img
            src={heroDesk}
            alt="A writer's desk with an open notebook, fountain pen and coffee"
            width={1600}
            height={1008}
            className="h-[280px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] md:h-[420px]"
          />
          <div className="bg-card p-6 md:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Daily news</p>
            <h2 className="mt-2 font-serif text-2xl text-card-foreground">
              Independent booksellers report a steady year of growth
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Community-run shops continue to gain ground through online ordering, strong genre sales and
              partnerships that help readers discover smaller presses.
            </p>
          </div>
        </Link>
      </section>

      {/* Announcement + prompt */}
      <section className="mx-auto mt-14 grid max-w-6xl gap-5 px-5 lg:grid-cols-[1.5fr_1fr]">
        <article className="rounded-2xl border border-border bg-card p-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {ANNOUNCEMENT.kicker}
          </p>
          <h2 className="mt-3 font-serif text-2xl leading-snug text-card-foreground">
            {ANNOUNCEMENT.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{ANNOUNCEMENT.body}</p>
          <Link
            to="/news"
            hash="author-commitments"
            className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            Read the full statement <ArrowRight className="size-3.5" />
          </Link>
        </article>

        <article className="rounded-2xl border border-primary/30 bg-accent/60 p-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Writing prompt</p>
          <h3 className="mt-3 font-serif text-xl text-foreground">{PROMPT.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{PROMPT.body}</p>
          <Link
            to="/writing-prompts"
            className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            All prompts <ArrowRight className="size-3.5" />
          </Link>
        </article>
      </section>

      {/* Newsletter stat */}
      <section className="mx-auto mt-14 max-w-6xl px-5">
        <div className="rounded-2xl border border-border bg-secondary/50 px-8 py-12 text-center">
          <p className="text-sm text-muted-foreground">Our free weekly newsletters reach</p>
          <p className="mt-2 font-serif text-6xl text-foreground">{SITE.subscribers}</p>
          <p className="mt-2 text-sm text-muted-foreground">subscribers, and counting</p>
        </div>
      </section>

      {/* Tools */}
      <section className="mx-auto mt-20 max-w-6xl px-5">
        <h2 className="font-serif text-3xl text-foreground">Tools for writers</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <Link
              key={tool.to}
              to={tool.to}
              className="flex items-center justify-between rounded-xl border border-border bg-card px-6 py-5 transition-colors hover:border-primary/50"
            >
              <span className="font-serif text-lg text-card-foreground">{tool.label}</span>
              <span className="text-sm text-primary">{tool.count}</span>
            </Link>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          One of the most active online writing communities for authors — connect through our{" "}
          <Link to="/directory" className="text-foreground underline underline-offset-4">
            global author directory
          </Link>
          , discover{" "}
          <Link to="/contests" className="text-foreground underline underline-offset-4">
            contests and submission opportunities
          </Link>
          ,{" "}
          <Link to="/grants-awards" className="text-foreground underline underline-offset-4">
            grants and awards
          </Link>
          , and explore our{" "}
          <Link to="/resources" className="text-foreground underline underline-offset-4">
            publishing resources
          </Link>
          .
        </p>
      </section>

      {/* Book of the week */}
      <section className="mx-auto mt-20 max-w-6xl px-5">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Book of the week</p>
        <h2 className="mt-3 font-serif text-3xl text-foreground">Discover your next great read</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Handpicked selections from our community — literary fiction, poetry, memoir and more.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {BOOKS.map((book, i) => (
            <article key={book.slug} className="overflow-hidden rounded-2xl border border-border bg-card">
              <img
                src={COVERS[i]}
                alt={`Cover artwork for ${book.title}`}
                loading="lazy"
                width={800}
                height={1200}
                className="h-64 w-full object-cover"
              />
              <div className="p-6">
                <span className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">
                  Book of the week
                </span>
                <h3 className="mt-4 font-serif text-xl text-card-foreground">{book.title}</h3>
                <p className="text-sm text-muted-foreground">by {book.author}</p>
                <p className="mt-1 text-xs text-primary">{book.meta}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{book.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <BookOpen className="size-3.5" /> {book.reads}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="size-3.5" /> {book.comments}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Past spotlights */}
      <section className="mx-auto mt-20 max-w-6xl px-5">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Previously featured</p>
        <h2 className="mt-3 font-serif text-3xl text-foreground">From our past spotlights</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PAST_SPOTLIGHTS.map((book) => (
            <article key={book.title} className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-serif text-lg text-card-foreground">{book.title}</h3>
              <p className="text-sm text-muted-foreground">{book.author}</p>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <BookOpen className="size-3.5" /> {book.reads}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MessageCircle className="size-3.5" /> {book.comments}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Illustrators */}
      <section className="mx-auto mt-20 max-w-6xl px-5">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Illustrator of the week
        </p>
        <h2 className="mt-3 font-serif text-3xl text-foreground">This week's featured artists</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {ARTISTS.map((artist) => (
            <article key={artist.name} className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-serif text-lg text-card-foreground">{artist.name}</h3>
              <p className="text-sm text-primary">{artist.craft}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{artist.note}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Why join */}
      <section className="mx-auto mt-20 max-w-6xl px-5">
        <div className="rounded-2xl border border-border bg-secondary/40 p-8 md:p-12">
          <h2 className="font-serif text-3xl text-foreground">Why writers join us</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title}>
                <h3 className="font-serif text-lg text-foreground">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
          <Link
            to="/membership"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Join for ${SITE.membership}/year <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
