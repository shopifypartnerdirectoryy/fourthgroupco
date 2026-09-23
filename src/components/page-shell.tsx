import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHeader({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="border-b border-secondary-foreground/15 bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-6xl px-5 py-16 text-center md:py-20">
        <p className="text-xs font-semibold uppercase text-primary">{kicker}</p>
        <h1 className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-secondary-foreground/70">{intro}</p>
      </div>
    </section>
  );
}

export function ListingGrid({
  items,
}: {
  items: { name: string; meta: string; detail: string; tag: string }[];
}) {
  return (
    <div className="mx-auto grid max-w-6xl gap-5 px-5 py-14 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.name}
          className="rounded-md border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <span className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">
            {item.tag}
          </span>
          <h2 className="mt-4 font-serif text-xl text-card-foreground">{item.name}</h2>
          <p className="mt-1 text-sm text-primary">{item.meta}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
        </article>
      ))}
    </div>
  );
}
