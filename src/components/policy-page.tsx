import type { ReactNode } from "react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { POLICY } from "@/data/policies";

export const policyHead = (slug: string, title: string, description: string) => () => ({
  links: [{ rel: "canonical", href: `https://fourthgroupco.lovable.app/${slug}` }],
  meta: [
    { title: `${title} | Fourth Group & Co` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} | Fourth Group & Co` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { property: "og:url", content: `https://fourthgroupco.lovable.app/${slug}` },
  ],
});

export function PolicyPage({ title, intro, sections }: { title: string; intro: string; sections: { h: string; body: ReactNode }[] }) {
  return (
    <PageShell>
      <PageHeader kicker="Policies" title={title} intro={intro} />
      <article className="mx-auto max-w-3xl px-5 py-14">
        <p role="note" className="rounded-sm border border-primary/40 bg-accent/40 p-4 text-sm text-foreground">
          <strong>Draft · version {POLICY.termsVersion}.</strong> {POLICY.draftNotice}
        </p>
        {sections.map((s) => (
          <section key={s.h} className="mt-10">
            <h2 className="font-serif text-2xl text-foreground">{s.h}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">{s.body}</div>
          </section>
        ))}
        <p className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
          Questions? Email <a className="font-semibold text-primary underline" href={`mailto:${POLICY.supportEmail}`}>{POLICY.supportEmail}</a>.
        </p>
      </article>
    </PageShell>
  );
}
