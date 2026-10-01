import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/page-shell";
import { FEATURES, SITE } from "@/data/site";

export const Route = createFileRoute("/about")({
  staticData: { sitemap: true },
  head: () => ({ links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/about" }],
    meta: [
      { title: "About Fourth Group & Co" },
      {
        name: "description",
        content:
          "Fourth Group & Co is a global network for authors, poets and screenwriters, built on verified listings and plain dealing.",
      },
      { property: "og:title", content: "About Fourth Group & Co" },
      { property: "og:description", content: "Who we are and how the platform works." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "https://fourthgroupco.lovable.app/about" },
    ],
  }),
  component: Page,
});

const TEAM = [
  { name: "Mou Barrac", role: "Founder & Managing Director", note: "Sets the direction of Fourth Group & Co and oversees partnerships, membership and the overall reader and writer experience." },
  { name: "Aliyu Adam", role: "Editorial Director", note: "Leads the research desk, verifies every listing, and edits the Journal, author spotlights and featured articles." },
  { name: "James Kamy", role: "Head of Film Adaptation & Partnerships", note: "Runs the movie adaptation programme, reviews story pitches and builds relationships with producers and presses." },
  { name: "Emily Grace", role: "Community & Author Relations Manager", note: "Looks after members and directory authors, hosts literary events, and answers questions at hello@fourthgroupco.com." },
];

function Page() {
  return (
    <PageShell>
      <PageHeader
        kicker="About us"
        title="A network built for the people doing the writing"
        intro={SITE.tagline}
      />
      <div className="mx-auto max-w-3xl px-5 py-14">
        <p className="text-base leading-relaxed text-muted-foreground">
          Fourth Group &amp; Co began as a shared list passed between a handful of writers who were tired
          of chasing dead links and expired deadlines. It grew into a research desk: every magazine,
          press, grant, contest and residency we publish is confirmed with the organisation before it
          goes live, and reviewed again each season.
        </p>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          We do not sell editorial services, we do not charge for a directory profile, and we do not
          take a cut of anything a writer wins. Membership pays for the research, and that is the whole
          business model.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-serif text-lg text-card-foreground">{f.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-serif text-3xl text-foreground">Our team</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {TEAM.map((m) => (
            <div key={m.name} className="flex gap-4 rounded-xl border border-border bg-card p-6">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary font-serif text-secondary-foreground">
                {m.name.split(" ").map((x) => x[0]).join("")}
              </div>
              <div>
                <h3 className="font-serif text-lg text-card-foreground">{m.name}</h3>
                <p className="text-sm text-primary">{m.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.note}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-base text-muted-foreground">
          Questions, corrections or listings to add?{" "}
          <a href={`mailto:${SITE.email}`} className="text-foreground underline underline-offset-4">
            {SITE.email}
          </a>
        </p>
      </div>
    </PageShell>
  );
}
