import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FAQ } from "@/data/site";
import { POLICY, PLANS, type PlanKey } from "@/data/policies";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";

export const Route = createFileRoute("/membership")({
  staticData: { sitemap: true },
  head: () => ({ links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/membership" }],
    meta: [
      { title: "Membership | Fourth Group & Co" },
      { name: "description", content: "Standard and Pro membership with Fourth Group & Co: $25 for 12 months, the members-only Author Community and full directory access." },
      { property: "og:title", content: "Membership | Fourth Group & Co" },
      { property: "og:description", content: "Standard and Pro membership for writers — $25 for 12 months." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "https://fourthgroupco.lovable.app/membership" },
    ],
  }),
  component: Page,
});

const DRAFT_KEY = "fg-checkout-draft";
const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(255),
  plan: z.enum(["standard", "pro"]),
  referral: z.string().trim().regex(/^(\d{4})?$/, "Referral codes are exactly four digits"),
  terms: z.literal(true, { errorMap: () => ({ message: "Please accept the membership terms" }) }),
});

function Page() {
  return (
    <PageShell>
      <PageHeader kicker="Membership" title="Join Fourth Group & Co" intro="Two plans, both $25 for 12 months. Browse the site freely — membership opens the Author Community and member tools." />
      <div className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="font-serif text-3xl text-foreground">Why subscribe?</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {(Object.keys(PLANS) as PlanKey[]).map((k) => {
            const p = PLANS[k];
            return (
              <div key={k} className="reveal rounded-sm border border-border bg-card p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{k === "pro" ? "Why upgrade to Pro?" : "Standard"}</p>
                <h3 className="mt-2 font-serif text-2xl text-card-foreground">{p.name}</h3>
                <p className="mt-2 font-serif text-4xl text-card-foreground">${p.priceUsd}<span className="text-sm text-muted-foreground"> / {p.durationMonths} months</span></p>
                <ul className="mt-5 space-y-2">
                  {p.benefits.map((b) => <li key={b} className="flex gap-3 text-sm text-muted-foreground"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{b}</li>)}
                </ul>
                <p className="mt-5 text-xs text-muted-foreground">{p.refundNote} Renews manually — never charged automatically.</p>
              </div>
            );
          })}
        </div>
        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="font-serif text-2xl text-foreground">Questions</h2>
            <div className="mt-6 space-y-6">
              {FAQ.map((f) => (<div key={f.q}><p className="font-medium text-foreground">{f.q}</p><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.a}</p></div>))}
            </div>
            <p className="mt-8 text-sm text-muted-foreground">Read the <Link to="/membership-terms" className="text-primary underline">Membership Terms</Link>, <Link to="/refund-policy" className="text-primary underline">Refund Policy</Link> and <Link to="/community-guidelines" className="text-primary underline">Community Guidelines</Link>.</p>
          </div>
          <Checkout />
        </div>
      </div>
    </PageShell>
  );
}

function Checkout() {
  const { user, ready } = useSession();
  const navigate = useNavigate();
  const [f, setF] = useState({ name: "", email: "", plan: "standard" as PlanKey, referral: "", terms: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<null | { plan: PlanKey }>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (raw) { try { setF((v) => ({ ...v, ...JSON.parse(raw) })); } catch { /* ignore */ } }
  }, []);
  useEffect(() => { if (user?.email && !f.email) setF((v) => ({ ...v, email: user.email! })); }, [user, f.email]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const r = schema.safeParse(f);
    if (!r.success) { const m: Record<string, string> = {}; r.error.issues.forEach((i) => { m[String(i.path[0])] = i.message; }); setErrors(m); return; }
    setErrors({}); setBusy(true);
    try {
      if (r.data.referral) {
        const { data: ok } = await supabase.rpc("validate_referral_code", { _code: r.data.referral });
        if (!ok) { setErrors({ referral: "That referral code isn't recognised. Check it or leave it blank." }); return; }
      }
      if (!user) {
        sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ ...f, terms: false }));
        toast.info("Create a free account or sign in to continue — your details are saved.");
        navigate({ to: "/auth", search: { redirect: "/membership" } as never });
        return;
      }
      const { error } = await supabase.from("memberships").insert({
        user_id: user.id, plan: r.data.plan, referral_code: r.data.referral || null, contact_name: r.data.name, terms_version: POLICY.termsVersion,
      });
      if (error) throw error;
      sessionStorage.removeItem(DRAFT_KEY);
      setDone({ plan: r.data.plan });
      if (POLICY.paymentUrl) window.open(POLICY.paymentUrl, "_blank", "noopener");
    } catch {
      toast.error("We couldn't record your membership request. Please try again.");
    } finally { setBusy(false); }
  }

  if (done) return (
    <div className="rounded-sm border border-border bg-card p-8">
      <h2 className="font-serif text-2xl text-card-foreground">Request received</h2>
      <p className="mt-3 text-sm text-muted-foreground">Your {PLANS[done.plan].name} request is saved and awaiting payment. {POLICY.paymentUrl ? "Complete payment in the window that opened." : `Our team will email you a secure payment link. You can also write to ${POLICY.supportEmail}.`} Access switches on once our team confirms your payment.</p>
      <Button asChild className="mt-6"><Link to="/dashboard">Go to my dashboard</Link></Button>
    </div>
  );

  const err = (k: string) => errors[k] ? <p className="mt-1 text-xs text-destructive">{errors[k]}</p> : null;
  return (
    <form onSubmit={submit} noValidate className="h-fit rounded-sm border border-border bg-card p-7">
      <h2 className="font-serif text-2xl text-card-foreground">Membership checkout</h2>
      <div className="mt-5 grid gap-4">
        <label className="text-sm">Full name<Input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className="mt-1" />{err("name")}</label>
        <label className="text-sm">Email<Input type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className="mt-1" />{err("email")}</label>
        <fieldset className="text-sm"><legend>Plan</legend>
          <div className="mt-1 grid grid-cols-2 gap-2">
            {(Object.keys(PLANS) as PlanKey[]).map((k) => (
              <label key={k} className={`cursor-pointer rounded-sm border p-3 ${f.plan === k ? "border-primary bg-accent/40" : "border-border"}`}>
                <input type="radio" name="plan" className="sr-only" checked={f.plan === k} onChange={() => setF({ ...f, plan: k })} />
                <span className="block font-semibold">{PLANS[k].name}</span><span className="text-xs text-muted-foreground">${PLANS[k].priceUsd} · {PLANS[k].durationMonths} months</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="text-sm">Team referral code <span className="text-muted-foreground">(optional)</span><Input inputMode="numeric" maxLength={4} value={f.referral} onChange={(e) => setF({ ...f, referral: e.target.value.replace(/\D/g, "") })} className="mt-1" placeholder="4 digits" />{err("referral")}</label>
        <label className="flex gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={f.terms} onChange={(e) => setF({ ...f, terms: e.target.checked })} className="mt-1" />I accept the Membership Terms{f.plan === "pro" ? " and understand Pro membership is non-refundable" : ""}.</label>{err("terms")}
      </div>
      <Button type="submit" disabled={busy || !ready} className="mt-6 w-full">{busy ? "Saving…" : "Proceed to secure checkout"}</Button>
      <p className="mt-3 text-xs text-muted-foreground">We never ask for card details on this form. {POLICY.paymentUrl ? "Payment is taken by our secure payment provider." : "Online payment is being set up — after you submit, our team sends a secure payment link and activates your membership once payment is confirmed."}</p>
    </form>
  );
}
