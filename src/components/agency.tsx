import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { z } from "zod";
import { ArrowRight, Check, Film, Loader2, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { BUDGETS, GENRES, GOALS, LEADERSHIP, PACKAGES, PILLARS, SERVICE_TERMS, WHY, campaignTag, type Service } from "@/data/agency";
import { BOOKS } from "@/data/books";
import { EMAIL_MAX, EMAIL_MIN, EMAIL_STEP, emailCampaignPrice, usd } from "@/lib/pricing";
import { SITE } from "@/data/site";

export function SectionIntro({ kicker, title, intro, center = true }: { kicker: string; title: string; intro?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{kicker}</p>
      <h2 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">{title}</h2>
      {intro ? <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{intro}</p> : null}
    </div>
  );
}

export function PackageCards() {
  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch">
      {PACKAGES.map((p) => (
        <article key={p.id} className={`relative flex flex-col rounded-sm border bg-card p-8 text-card-foreground transition-shadow hover:shadow-lg ${p.badge ? "border-primary shadow-md lg:-my-3 lg:py-11" : "border-border"}`}>
          {p.badge ? <span className="absolute -top-3 left-8 bg-secondary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">{p.badge}</span> : null}
          <p className="font-serif text-sm text-primary">Package {p.number}</p>
          <h3 className="mt-2 font-serif text-2xl leading-tight">{p.name}</h3>
          <p className="mt-5 font-serif text-xl italic text-primary">Tailored to your book</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.audience}</p>
          <ul className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
            {p.includes.map((i) => <li key={i} className="flex gap-3"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{i}</li>)}
          </ul>
          <Button asChild className="mt-8 h-12 rounded-none" variant={p.badge ? "default" : "outline"}>
            <Link to="/campaign-proposal" search={{ interest: p.name }}>{p.cta} <ArrowRight /></Link>
          </Button>
        </article>
      ))}
    </div>
  );
}

function EmailSelector() {
  const [contacts, setContacts] = useState(EMAIL_MIN);
  return (
    <div className="mt-5 rounded-sm border border-border bg-background p-5">
      <div className="flex items-baseline justify-between gap-4">
        <Label htmlFor="email-contacts" className="text-xs uppercase tracking-wider text-muted-foreground">Contacts</Label>
        <p aria-live="polite" className="text-right"><span className="font-serif text-2xl">{contacts.toLocaleString("en-US")}</span><span className="ml-3 font-serif text-2xl text-primary">{usd(emailCampaignPrice(contacts))}</span></p>
      </div>
      <Slider id="email-contacts" aria-label="Number of email contacts" className="mt-4" min={EMAIL_MIN} max={EMAIL_MAX} step={EMAIL_STEP} value={[contacts]} onValueChange={(v) => setContacts(v[0] ?? EMAIL_MIN)} />
      <div className="mt-2 flex justify-between text-[11px] text-muted-foreground"><span>1,000</span><span>10,000</span></div>
    </div>
  );
}

export function ServiceCard({ s }: { s: Service }) {
  return (
    <article id={s.id} className="flex scroll-mt-24 flex-col rounded-sm border border-border bg-card p-7 text-card-foreground">
      <p className="font-serif text-sm text-primary">{s.number}</p>
      <h4 className="mt-2 font-serif text-2xl leading-tight"><a href={`#${s.id}`} className="hover:text-primary">{s.title}</a></h4>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
      <dl className="mt-5 divide-y divide-border border-y border-border text-sm">
        {s.prices.map((r) => (
          <div key={r.label} className="flex items-baseline justify-between gap-4 py-2.5">
            <dt>{r.label}{r.detail ? <span className="block text-xs text-muted-foreground">{r.detail}</span> : null}</dt>
            <dd className="font-serif text-lg">{r.price}</dd>
          </div>
        ))}
      </dl>
      {s.emailSelector ? <EmailSelector /> : null}
      {s.includes ? <ul className="mt-5 grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">{s.includes.map((i) => <li key={i} className="flex gap-2"><Check className="size-3.5 shrink-0 text-primary" />{i}</li>)}</ul> : null}
      {s.note ? <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{s.note}</p> : null}
      <Button asChild variant="link" className="mt-auto h-auto w-fit px-0 pt-6 text-primary">
        <Link to="/campaign-proposal" search={{ interest: s.title }}>{s.cta} <ArrowRight /></Link>
      </Button>
    </article>
  );
}

export function ServicesCatalogue() {
  return (
    <div className="mt-6 space-y-16">
      <nav aria-label="Jump to a department" className="sticky top-0 z-20 -mx-5 overflow-x-auto border-y border-border bg-background/95 px-5 py-3 backdrop-blur">
        <ul className="flex w-max gap-2">
          {PILLARS.map((p) => (
            <li key={p.id}><a href={`#pillar-${p.id}`} className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"><span className="font-serif text-primary">{p.letter}</span>{p.short ?? p.title}</a></li>
          ))}
        </ul>
      </nav>
      {PILLARS.map((p) => (
        <section key={p.id} className="scroll-mt-36" aria-labelledby={`pillar-${p.id}`}>
          <div className="flex items-baseline gap-4 border-b border-border pb-4">
            <span className="font-serif text-3xl text-primary">{p.letter}</span>
            <h3 id={`pillar-${p.id}`} className="scroll-mt-36 font-serif text-2xl md:text-3xl">{p.title}</h3>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">{p.services.map((s) => <ServiceCard key={s.id} s={s} />)}</div>
        </section>
      ))}
    </div>
  );
}

export function PillarSummary() {
  return (
    <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {PILLARS.map((p) => (
        <Link key={p.id} to="/marketing-services" hash={p.services[0]?.id ?? ""} className="group bg-card p-7 transition-colors hover:bg-accent">
          <span className="font-serif text-3xl text-primary">{p.letter}</span>
          <h3 className="mt-4 font-serif text-xl">{p.title}</h3>
          <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">{p.services.map((s) => <li key={s.id}>{s.title}</li>)}</ul>
          <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-primary">Explore services <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" /></span>
        </Link>
      ))}
    </div>
  );
}

export function CampaignCards({ limit }: { limit?: number }) {
  const list = limit ? BOOKS.filter((b, i, all) => all.findIndex((x) => x.title === b.title) === i).slice(0, limit) : BOOKS;
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {list.map((b) => (
        <article key={b.image} className="group flex flex-col border border-secondary-foreground/15 bg-secondary-foreground/[0.03] p-5">
          <div className="grid aspect-[4/5] place-items-center overflow-hidden bg-background/5 p-4">
            <img src={b.image} alt={`${b.title} book cover`} loading="lazy" className="max-h-full w-auto object-contain shadow-xl transition-transform duration-500 group-hover:scale-[1.03]" />
          </div>
          <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">{campaignTag(b.title)}</p>
          <h3 className="mt-2 font-serif text-lg leading-tight">{b.title}</h3>
          <p className="mt-1 text-xs opacity-70">{b.author}</p>
          <p className="mt-1 text-xs opacity-60">{b.tag}</p>
        </article>
      ))}
    </div>
  );
}

export const SCREEN_SERVICES = ["Book-to-screen assessment", "Story positioning", "Adaptation synopsis preparation", "Pitch deck development", "Screen adaptation presentation materials", "Industry introductions where available and authorised"];

export function ScreenDivision({ asH1 = false }: { asH1?: boolean }) {
  const H = asH1 ? "h1" : "h2";
  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Book-to-Screen Packaging &amp; Representation</p>
        <H className="mt-3 font-serif text-4xl leading-tight md:text-5xl">Preparing stories for the screen conversation</H>
        <p className="mt-5 text-sm leading-relaxed opacity-75">We explore the screen potential of compelling literary works and support suitable authors in preparing their stories for consideration by film and television industry professionals.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="h-12 rounded-none"><Link to="/campaign-proposal" search={{ interest: "Book-to-Screen Packaging" }}>Submit Your Story for Assessment <ArrowRight /></Link></Button>
          <Button asChild variant="link" className="h-12 text-primary"><Link to="/screen-adaptation">About the division</Link></Button>
        </div>
        <p className="mt-6 text-xs opacity-60">Assessment does not promise an adaptation, producer interest, distribution or representation.</p>
      </div>
      <ul className="grid gap-px border border-current/15 bg-current/10 sm:grid-cols-2">
        {SCREEN_SERVICES.map((s, i) => (
          <li key={s} className="flex gap-4 bg-secondary p-6 text-secondary-foreground"><span className="font-serif text-primary">0{i + 1}</span><span className="flex-1 text-sm">{s}</span>{i === 0 ? <Film className="size-4 text-primary" /> : null}</li>
        ))}
      </ul>
    </div>
  );
}

export function WhyGrid() {
  return (
    <div className="mt-12 grid gap-px overflow-hidden border-y border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {WHY.map(([t, d]) => <article key={t} className="bg-background p-7"><span className="block h-px w-10 bg-primary" /><h3 className="mt-5 font-serif text-xl">{t}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p></article>)}
    </div>
  );
}

export function ServiceTerms() {
  return (
    <dl className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-2">
      {SERVICE_TERMS.map(([t, d]) => <div key={t} className="border-t border-border pt-4"><dt className="font-serif text-lg">{t}</dt><dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</dd></div>)}
    </dl>
  );
}

export function LeadershipCards() {
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {LEADERSHIP.map((m, i) => (
        <article key={m.name} className={`flex flex-col border bg-card text-card-foreground ${i === 0 ? "border-primary" : "border-border"}`}>
          <div className="grid aspect-[4/3] place-items-center bg-muted">
            {m.photo ? <img src={m.photo} alt={m.name} className="size-full object-cover" /> : <UserRound aria-label="Portrait to come" className="size-14 text-muted-foreground/50" />}
          </div>
          <div className="p-7">
            <p className="font-serif text-sm text-primary">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 font-serif text-2xl">{m.name}</h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">{m.role}</p>
            
          </div>
        </article>
      ))}
    </div>
  );
}

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(120, "Please keep this under 120 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  project_title: z.string().trim().min(1, "Please enter your book or project title").max(200),
  genre: z.string().min(1, "Please choose a genre"),
  campaign_goal: z.string().min(1, "Please choose your primary campaign goal"),
  budget_range: z.string().optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Please agree so we can contact you about your proposal" }) }),
});
type Values = { full_name: string; email: string; project_title: string; genre: string; campaign_goal: string; budget_range: string; consent: boolean };
type Key = keyof Values;
const EMPTY: Values = { full_name: "", email: "", project_title: "", genre: "", campaign_goal: "", budget_range: "", consent: false };

export function CampaignProposalForm({ interest }: { interest?: string }) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Key, string>>>({});
  const [honeypot, setHoneypot] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const set = <K extends Key>(k: K, v: Values[K]) => { setValues((p) => ({ ...p, [k]: v })); setErrors((e) => ({ ...e, [k]: undefined })); };

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (state === "busy") return;
    const parsed = schema.safeParse({ ...values, budget_range: values.budget_range || undefined });
    if (!parsed.success) {
      const next: typeof errors = {};
      for (const i of parsed.error.issues) next[i.path[0] as Key] ??= i.message;
      setErrors(next);
      return;
    }
    if (honeypot) { setState("done"); return; }
    setState("busy");
    const d = parsed.data;
    const { error } = await supabase.from("campaign_requests").insert({
      full_name: d.full_name, email: d.email.toLowerCase(), project_title: d.project_title, genre: d.genre,
      campaign_goal: d.campaign_goal, budget_range: d.budget_range ?? null, interest: interest?.slice(0, 120) ?? null, consent: true,
    });
    if (error) { setState("error"); return; }
    setState("done");
    setValues(EMPTY);
  }

  if (state === "done") {
    return (
      <div role="status" className="rounded-sm border border-primary/50 bg-card p-8 text-center text-card-foreground md:p-10">
        <p className="font-serif text-3xl">Thank you — your request has been received.</p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">A Senior Campaign Strategist will review your project and reply by email with a tailored proposal. Questions in the meantime? Write to <a href={`mailto:${SITE.email}`} className="text-primary underline underline-offset-4">{SITE.email}</a>.</p>
        <Button variant="outline" className="mt-6 rounded-none" onClick={() => setState("idle")}>Submit another project</Button>
      </div>
    );
  }

  const err = (k: Key) => errors[k] ? <p id={`cp-${k}-err`} className="text-xs text-destructive">{errors[k]}</p> : null;
  const text = (k: "full_name" | "email" | "project_title", label: string, type = "text", auto?: string) => (
    <div className="grid gap-2">
      <Label htmlFor={`cp-${k}`}>{label} <span aria-hidden="true" className="text-primary">*</span></Label>
      <Input id={`cp-${k}`} type={type} autoComplete={auto} value={values[k]} onChange={(e) => set(k, e.target.value)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `cp-${k}-err` : undefined} className="h-11 bg-background" />
      {err(k)}
    </div>
  );
  const select = (k: "genre" | "campaign_goal" | "budget_range", label: string, options: string[], required = true) => (
    <div className="grid gap-2">
      <Label htmlFor={`cp-${k}`}>{label} {required ? <span aria-hidden="true" className="text-primary">*</span> : <span className="text-xs text-muted-foreground">(optional)</span>}</Label>
      <Select value={values[k]} onValueChange={(v) => set(k, v)}>
        <SelectTrigger id={`cp-${k}`} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `cp-${k}-err` : undefined} className="h-11 bg-background"><SelectValue placeholder="Select" /></SelectTrigger>
        <SelectContent>{options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
      </Select>
      {err(k)}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 rounded-sm border border-border bg-card p-6 text-card-foreground shadow-sm md:p-9">
      {interest ? <p className="border-l-2 border-primary pl-3 text-sm">Enquiring about: <span className="font-semibold">{interest}</span></p> : null}
      <div className="grid gap-5 sm:grid-cols-2">{text("full_name", "Full name", "text", "name")}{text("email", "Email address", "email", "email")}</div>
      {text("project_title", "Book / project title")}
      <div className="grid gap-5 sm:grid-cols-2">{select("genre", "Genre", GENRES)}{select("campaign_goal", "Primary campaign goal", GOALS)}</div>
      {select("budget_range", "Estimated budget range", BUDGETS, false)}
      <div className="grid gap-2">
        <div className="flex items-start gap-3">
          <Checkbox id="cp-consent" checked={values.consent} onCheckedChange={(c) => set("consent", c === true)} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "cp-consent-err" : undefined} className="mt-0.5" />
          <Label htmlFor="cp-consent" className="text-xs font-normal leading-relaxed text-muted-foreground">I agree that Fourth Group &amp; Co may store these details and contact me about my proposal, as described in the <Link to="/privacy" className="text-primary underline underline-offset-2">Privacy Policy</Link>.</Label>
        </div>
        {err("consent")}
      </div>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" aria-hidden="true" />
      {state === "error" ? <p role="alert" className="rounded-sm border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">Your request could not be sent. Your details are still here — please try again, or email {SITE.email}.</p> : null}
      <Button type="submit" disabled={state === "busy"} className="h-12 rounded-none text-xs font-semibold tracking-[0.16em]">
        {state === "busy" ? <><Loader2 className="animate-spin" /> Sending…</> : "REQUEST CAMPAIGN PROPOSAL"}
      </Button>
      <p className="text-center text-xs text-muted-foreground">Every submission is reviewed by a Senior Campaign Strategist. No obligation.</p>
    </form>
  );
}
