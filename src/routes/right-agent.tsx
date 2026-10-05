import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { BookOpen, BriefcaseBusiness, Film, Globe2, Headphones, LibraryBig } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/right-agent")({
  staticData: { sitemap: true },
  head: () => ({ links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/right-agent" }], meta: [{ title: "Rights Agents & Book Rights Guidance | Fourth Group & Co" }, { name: "description", content: "Understand translation, screen, audio, serial and licensing rights, then share your book with Fourth Group & Co." }, { property: "og:title", content: "Rights Agents & Book Rights Guidance | Fourth Group & Co" }, { property: "og:description", content: "A practical guide to subsidiary rights and rights representation." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "https://fourthgroupco.lovable.app/right-agent" }] }),
  component: RightsAgentPage,
});

const RIGHTS = [
  { icon: Globe2, title: "Translation rights", text: "Present a book to publishers working in other languages and territories." },
  { icon: Film, title: "Film and television rights", text: "Prepare adaptation rights for producers, studios and streaming teams." },
  { icon: Headphones, title: "Audio rights", text: "Consider audiobook rights separately from print and digital editions." },
  { icon: BookOpen, title: "Serial rights", text: "License extracts or instalments to magazines, newspapers and digital publications." },
  { icon: BriefcaseBusiness, title: "Merchandising and licensing", text: "Explore carefully matched uses of characters, settings and recognisable story elements." },
  { icon: LibraryBig, title: "Book club and reprint rights", text: "Handle special editions, large-print editions and selected reprints." },
];
const OPERATIONS = [
  ["Rights teams", "Some agencies handle subsidiary rights in-house while others work with trusted specialists in each territory."],
  ["International networks", "Sub-agents bring local market knowledge, publisher relationships and language expertise."],
  ["Rights fairs", "Agents schedule focused meetings at international publishing and screen markets throughout the year."],
  ["Commission", "A rights representative normally receives an agreed percentage only when a licence or sale is completed."],
];
const OPTIONS = ["Translation rights", "Film and television rights", "Audio rights", "Serial rights", "Merchandising and licensing", "Book club and reprint rights"];

function RightsAgentPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const required = ["name", "email", "title", "genre", "status", "pitch"];
    if (required.some((field) => !String(form.get(field) ?? "").trim()) || selected.length === 0) {
      setError("Please complete the required fields and choose at least one right.");
      return;
    }
    setError("");
    const subject = encodeURIComponent(`Rights enquiry: ${String(form.get("title"))}`);
    const body = encodeURIComponent(`Name: ${form.get("name")}\nEmail: ${form.get("email")}\nCountry: ${form.get("country")}\nBook: ${form.get("title")}\nGenre: ${form.get("genre")}\nPublication status: ${form.get("status")}\nPublisher / imprint: ${form.get("publisher")}\nISBN / ASIN: ${form.get("isbn")}\nRights requested: ${selected.join(", ")}\nRights still available: ${form.get("available")}\nSales and press: ${form.get("sales")}\n\nSynopsis / rights pitch:\n${form.get("pitch")}`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  }
  return <PageShell>
    <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
      <p className="text-xs font-semibold uppercase text-primary">Publishing rights</p>
      <h1 className="mt-3 font-serif text-4xl text-foreground md:text-5xl">Rights agents</h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">A rights agent helps an author or publisher place the additional rights attached to a book. The right arrangement depends on what you own, what has already been licensed and where the work can travel next.</p>
      <h2 className="mt-14 font-serif text-2xl">Core responsibilities</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{RIGHTS.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-md border border-border bg-card p-5"><Icon className="size-5 text-primary" /><h3 className="mt-4 font-serif text-lg">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}</div>
      <h2 className="mt-14 font-serif text-2xl">How rights representation works</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">{OPERATIONS.map(([title, text]) => <article key={title} className="rounded-md border border-border bg-card p-5"><h3 className="font-serif text-lg">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}</div>
      <aside className="mt-8 border-l-4 border-primary bg-accent p-6"><h2 className="font-serif text-xl">Why it matters</h2><p className="mt-2 max-w-4xl text-sm leading-relaxed text-muted-foreground">Strong rights work can create new readers and income beyond the first edition. Before approaching anyone, read your publishing agreement, note every right you retained and collect a concise record of sales, reviews and previous offers.</p></aside>
    </section>
    <section className="border-t border-border bg-muted/50"><form onSubmit={submit} noValidate className="mx-auto max-w-5xl px-5 py-14 md:py-20">
      <p className="text-xs font-semibold uppercase text-primary">Rights enquiry</p><h2 className="mt-3 font-serif text-3xl">Tell us about your book</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">Share the essentials and your preferred rights. Submitting an enquiry does not create a contract or fee.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Field id="ra-name" name="name" label="Full name *" /><Field id="ra-email" name="email" label="Email *" type="email" /><Field id="ra-country" name="country" label="Country" /><Field id="ra-title" name="title" label="Book title *" /><Field id="ra-genre" name="genre" label="Genre *" /><Field id="ra-status" name="status" label="Publication status *" placeholder="Published, forthcoming, or unpublished" /><Field id="ra-publisher" name="publisher" label="Publisher or imprint" /><Field id="ra-isbn" name="isbn" label="ISBN or ASIN" />
      </div>
      <fieldset className="mt-6 rounded-md border border-border bg-card p-5"><legend className="px-2 text-sm font-medium">Rights you want represented *</legend><div className="mt-2 grid gap-3 md:grid-cols-2">{OPTIONS.map((option) => <label key={option} className="flex items-center gap-3 text-sm"><Checkbox checked={selected.includes(option)} onCheckedChange={(checked) => setSelected(checked ? [...selected, option] : selected.filter((item) => item !== option))} />{option}</label>)}</div></fieldset>
      <div className="mt-6 grid gap-5"><TextField id="ra-available" name="available" label="Which rights are still available or have reverted to you?" rows={3} /><TextField id="ra-sales" name="sales" label="Sales, awards, reviews or press" rows={3} /><TextField id="ra-pitch" name="pitch" label="Synopsis and rights pitch *" rows={6} /></div>
      {error ? <p role="alert" className="mt-5 text-sm text-destructive">{error}</p> : null}<Button type="submit" className="mt-6">Prepare email to our rights desk</Button>
    </form></section>
  </PageShell>;
}

function Field({ id, name, label, type = "text", placeholder }: { id: string; name: string; label: string; type?: string; placeholder?: string }) { return <div className="grid gap-2"><Label htmlFor={id}>{label}</Label><Input id={id} name={name} type={type} placeholder={placeholder} className="bg-card" /></div>; }
function TextField({ id, name, label, rows }: { id: string; name: string; label: string; rows: number }) { return <div className="grid gap-2"><Label htmlFor={id}>{label}</Label><Textarea id={id} name={name} rows={rows} className="bg-card" /></div>; }