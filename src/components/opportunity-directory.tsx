import { useMemo, useState } from "react";
import { CalendarDays, ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge, GenreTags } from "@/components/publishing-directory";
import { SaveToDesk } from "@/components/save-to-desk";

type BaseItem = {
  name: string;
  summary: string;
  status: string;
  genres: string[];
  website: string;
};

export function OpportunityDirectory<T extends BaseItem>({
  items,
  searchPlaceholder,
  renderDetails,
  category = "Opportunity",
}: {
  category?: string;
  items: T[];
  searchPlaceholder: string;
  renderDetails: (item: T) => React.ReactNode;
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [genre, setGenre] = useState("all");
  const statuses = [...new Set(items.map((item) => item.status))].sort();
  const genres = [...new Set(items.flatMap((item) => item.genres))].sort();
  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    return items.filter((item) =>
      (!query || `${item.name} ${item.summary} ${item.genres.join(" ")}`.toLowerCase().includes(query)) &&
      (status === "all" || item.status === status) &&
      (genre === "all" || item.genres.includes(genre)),
    );
  }, [genre, items, search, status]);

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 md:py-16">
      <div className="grid gap-3 border-b border-border pb-6 md:grid-cols-[minmax(0,1fr)_12rem_14rem]">
        <label className="relative block">
          <span className="sr-only">Search opportunities</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={searchPlaceholder} className="h-11 bg-card pl-10" />
        </label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger aria-label="Filter by status" className="h-11 bg-card"><SelectValue placeholder="All statuses" /></SelectTrigger>
          <SelectContent><SelectItem value="all">All statuses</SelectItem>{statuses.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={genre} onValueChange={setGenre}>
          <SelectTrigger aria-label="Filter by genre" className="h-11 bg-card"><SelectValue placeholder="All genres" /></SelectTrigger>
          <SelectContent><SelectItem value="all">All genres</SelectItem>{genres.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2 py-5 text-xs font-medium uppercase text-muted-foreground" aria-live="polite">
        <CalendarDays className="size-4" aria-hidden="true" />{results.length} {results.length === 1 ? "opportunity" : "opportunities"} found
      </div>
      {results.length ? <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {results.map((item) => (
          <article key={item.name} className="flex min-h-72 flex-col rounded-md border border-border bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3"><h2 className="font-serif text-xl leading-tight text-card-foreground">{item.name}</h2><StatusBadge status={item.status} /></div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
            <div className="mt-4"><GenreTags genres={item.genres} /></div>
            <div className="mt-5 grid flex-1 content-end gap-2 border-t border-border pt-4 text-xs">{renderDetails(item)}</div>
            <a href={item.website} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Check official details <ExternalLink className="size-3" aria-hidden="true" />
            </a>
            <SaveToDesk item={{ key: `${category}:${item.name}`, title: item.name, category, url: item.website, deadline: (item as { deadline?: string }).deadline }} />
          </article>
        ))}
      </div> : <div className="border border-dashed border-border py-16 text-center text-sm text-muted-foreground">No opportunities match those filters.</div>}
      <p className="mt-8 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">Dates, fees, eligibility and award amounts can change. Confirm every detail on the organiser’s official website before applying.</p>
    </section>
  );
}