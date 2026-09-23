import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { SITE, FAQ } from "@/data/site";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Membership | Fourth Group & Co" },
      {
        name: "description",
        content: `Join Fourth Group & Co for $${SITE.membership} a year: full access to verified submission databases, an author profile and submission tracking.`,
      },
      { property: "og:title", content: "Membership | Fourth Group & Co" },
      {
        property: "og:description",
        content: `Full database access for $${SITE.membership} a year.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const INCLUDED = [
  "Every magazine, press, grant, contest and residency listing",
  "Submission tracking with deadlines and responses",
  "An author profile in the directory",
  "The weekly newsletter and prompt",
  "Early notice when reading periods open",
  "Member-only guides on contracts and rights",
];

function Page() {
  return (
    <PageShell>
      <PageHeader
        kicker="Membership"
        title={`Full access for $${SITE.membership} a year`}
        intro="One flat annual price. No tiers, no upsells, and nothing withheld for a higher plan."
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="font-serif text-2xl text-foreground">What's included</h2>
          <ul className="mt-6 space-y-3">
            {INCLUDED.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-14 font-serif text-2xl text-foreground">Questions</h2>
          <div className="mt-6 space-y-6">
            {FAQ.map((f) => (
              <div key={f.q}>
                <p className="font-medium text-foreground">{f.q}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Annual</p>
          <p className="mt-3 font-serif text-5xl text-card-foreground">${SITE.membership}</p>
          <p className="mt-1 text-sm text-muted-foreground">per year, cancel any time</p>
          <a
            href={`mailto:${SITE.email}?subject=Membership`}
            className="mt-6 block rounded-full bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Become a member
          </a>
          <Link
            to="/contact"
            className="mt-3 block rounded-full border border-border px-5 py-3 text-center text-sm text-foreground"
          >
            Ask a question first
          </Link>
        </aside>
      </div>
    </PageShell>
  );
}
