import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageHeader, PageShell } from "./page-shell";

export function EditorialPage({
  kicker,
  title,
  intro,
  points,
}: {
  kicker: string;
  title: string;
  intro: string;
  points: string[];
}) {
  return (
    <PageShell>
      <PageHeader kicker={kicker} title={title} intro={intro} />
      <section className="mx-auto max-w-4xl px-5 py-14 md:py-20">
        <div className="grid gap-4 md:grid-cols-2">
          {points.map((point) => (
            <div key={point} className="flex gap-3 rounded-md border border-border bg-card p-5 shadow-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <p className="text-sm leading-relaxed text-muted-foreground">{point}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="font-serif text-2xl text-foreground">Ready to take the next step?</p>
          <Link
            to="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Contact Fourth Group &amp; Co <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}