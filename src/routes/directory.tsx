import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AUTHORS } from "@/data/opportunities";

export const Route = createFileRoute("/directory")({
  staticData: { sitemap: true },
  head: () => ({ links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/directory" }], meta: [{ title: "Author Directory | Fourth Group & Co" }, { name: "description", content: "Search Fourth Group & Co authors by name, craft and location, including writers available for interviews, readings and events." }, { property: "og:title", content: "Author Directory | Fourth Group & Co" }, { property: "og:description", content: "Meet writers in the Fourth Group literary community." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "https://fourthgroupco.lovable.app/directory" }] }),
  component: AuthorDirectory,
});

const initials = (name: string) => name.split(" ").map((part) => part[0]).join("");

function AuthorDirectory() {
  const [query, setQuery] = useState("");
  const [craft, setCraft] = useState("all");
  const [availability, setAvailability] = useState("all");
  const crafts = [...new Set(AUTHORS.flatMap((author) => author.craft.split(" · ")))].sort();
  const availabilityOptions = [...new Set(AUTHORS.flatMap((author) => author.available))].sort();
  const results = useMemo(() => { const term = query.trim().toLowerCase(); return AUTHORS.filter((author) => (!term || `${author.name} ${author.craft} ${author.location} ${author.bio}`.toLowerCase().includes(term)) && (craft === "all" || author.craft.split(" · ").includes(craft)) && (availability === "all" || author.available.includes(availability))); }, [availability, craft, query]);
  return <PageShell><PageHeader kicker="Community" title="Author directory" intro="Meet writers in the Fourth Group & Co community and find people available for readings, interviews, festivals and conversations." />
    <section className="mx-auto max-w-6xl px-5 py-12 md:py-16"><div className="grid gap-3 border-b border-border pb-6 md:grid-cols-[minmax(0,1fr)_14rem_14rem]"><label className="relative"><span className="sr-only">Search authors</span><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"/><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search names, craft, location, or interests" className="h-11 bg-card pl-10"/></label><Select value={craft} onValueChange={setCraft}><SelectTrigger aria-label="Filter by craft" className="h-11 bg-card"><SelectValue placeholder="All crafts"/></SelectTrigger><SelectContent><SelectItem value="all">All crafts</SelectItem>{crafts.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select><Select value={availability} onValueChange={setAvailability}><SelectTrigger aria-label="Filter by availability" className="h-11 bg-card"><SelectValue placeholder="All availability"/></SelectTrigger><SelectContent><SelectItem value="all">All availability</SelectItem>{availabilityOptions.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div><p className="py-5 text-xs font-medium uppercase text-muted-foreground" aria-live="polite">{results.length} {results.length === 1 ? "author" : "authors"} found</p>
      {results.length ? <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{results.map((author) => <article key={author.name} className={author.featured ? "flex min-h-72 flex-col rounded-md border-2 border-primary bg-card p-6 shadow-sm" : "flex min-h-72 flex-col rounded-md border border-border bg-card p-6 shadow-sm"}><div className="flex items-start gap-4"><div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent font-serif text-accent-foreground">{initials(author.name)}</div><div>{author.featured ? <span className="text-[10px] font-bold uppercase text-primary">Featured author</span> : null}<h2 className="font-serif text-xl">{author.name}</h2><p className="text-sm text-primary">{author.craft}</p></div></div><p className="mt-5 text-sm leading-relaxed text-muted-foreground">{author.bio}</p><div className="mt-auto pt-5"><p className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="size-3"/>{author.location}</p><p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"><BookOpen className="size-3"/>{author.books} {author.books === 1 ? "book" : "books"}</p><div className="mt-4 flex flex-wrap gap-1.5">{author.available.map((item) => <span key={item} className="rounded-sm border border-border bg-muted px-2 py-1 text-[10px] text-muted-foreground">{item}</span>)}</div></div></article>)}</div> : <div className="border border-dashed border-border py-16 text-center text-sm text-muted-foreground">No authors match those filters.</div>}
      <p className="mt-8 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">Directory profiles are editorial introductions, not endorsements. Contact Fourth Group & Co to request an introduction or correct a listing.</p>
    </section></PageShell>;
}