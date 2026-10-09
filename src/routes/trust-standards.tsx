import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Quote, ShieldCheck } from "lucide-react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import { POLICY, TRUST_FAQ } from "@/data/policies";

export const Route = createFileRoute("/trust-standards")({
  staticData: { sitemap: true },
  head: () => ({
    links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/trust-standards" }],
    meta: [
      { title: "Trust & Transparency | Fourth Group & Co" },
      { name: "description", content: "How Fourth Group & Co handles membership, refunds, privacy, copyright and editorial review — in plain language." },
      { property: "og:title", content: "Trust & Transparency | Fourth Group & Co" },
      { property: "og:description", content: "Plain answers about membership, privacy, copyright and editorial review." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "https://fourthgroupco.lovable.app/trust-standards" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: TRUST_FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }],
  }),
  component: TrustPage,
});

function TrustPage() {
  const { data: stories, isLoading } = useQuery({
    queryKey: ["testimonials", "published"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("id, member_name, specialty, quote, portrait_url, profile_url").eq("status", "published").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <PageShell>
      <PageHeader kicker="Trust & Transparency" title="How we work, in plain language" intro="Membership, privacy, copyright and editorial review — what we do, and what we never promise." />

      <section className="mx-auto max-w-3xl px-5 py-14">
        <h2 className="font-serif text-3xl text-foreground">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="mt-6">
          {TRUST_FAQ.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`}>
              <AccordionTrigger className="text-left font-serif text-lg">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="border-y border-border bg-muted/45">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-xs font-semibold uppercase text-primary">In Their Words</p>
          <h2 className="mt-3 font-serif text-3xl text-foreground">Member stories</h2>
          {isLoading ? <p className="mt-6 text-sm text-muted-foreground">Loading…</p> : stories && stories.length ? (
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {stories.map((s) => (
                <article key={s.id} className="border-t-2 border-primary bg-card p-6 shadow-sm">
                  <Quote className="size-5 text-primary" aria-hidden="true" />
                  <p className="mt-4 font-serif text-lg leading-relaxed text-card-foreground">{s.quote}</p>
                  <div className="mt-5 flex items-center gap-3">
                    {s.portrait_url ? <img src={s.portrait_url} alt="" className="size-10 rounded-full object-cover" loading="lazy" /> : null}
                    <div className="text-xs"><p className="font-semibold text-foreground">{s.profile_url ? <a href={s.profile_url} target="_blank" rel="noreferrer" className="underline">{s.member_name}</a> : s.member_name}</p>{s.specialty ? <p className="text-muted-foreground">{s.specialty}</p> : null}</div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-6 max-w-xl text-sm text-muted-foreground">Member stories will appear here once members have given permission to share them. We only publish genuine, approved words from real members.</p>
          )}
          {POLICY.reviewUrl ? (
            <a href={POLICY.reviewUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary underline">Read or leave an independent review <ExternalLink className="size-4" /></a>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex items-start gap-4"><ShieldCheck className="mt-1 size-6 text-primary" aria-hidden="true" />
          <div>
            <h2 className="font-serif text-2xl text-foreground">Policies</h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <li><Link to="/membership-terms" className="text-primary underline">Membership Terms</Link></li>
              <li><Link to="/refund-policy" className="text-primary underline">Refund Policy</Link></li>
              <li><Link to="/privacy" className="text-primary underline">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-primary underline">Terms of Service</Link></li>
              <li><Link to="/cookie-policy" className="text-primary underline">Cookie Policy</Link></li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">Support: <a className="text-primary underline" href={`mailto:${POLICY.supportEmail}`}>{POLICY.supportEmail}</a></p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
