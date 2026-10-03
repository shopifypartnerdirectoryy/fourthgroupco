import { ExternalLink, MapPin, Search } from "lucide-react";
import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DirectoryToolbar({
  search,
  onSearch,
  status,
  onStatus,
  statuses,
  genre,
  onGenre,
  genres,
  placeholder,
}: {
  search: string;
  onSearch: (value: string) => void;
  status: string;
  onStatus: (value: string) => void;
  statuses: string[];
  genre: string;
  onGenre: (value: string) => void;
  genres: string[];
  placeholder: string;
}) {
  return (
    <div className="grid gap-3 border-b border-border pb-6 md:grid-cols-[minmax(0,1fr)_12rem_14rem]">
      <label className="relative block">
        <span className="sr-only">Search directory</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder={placeholder}
          className="h-11 bg-card pl-10"
        />
      </label>
      <Select value={status} onValueChange={onStatus}>
        <SelectTrigger aria-label="Filter by submission status" className="h-11 bg-card">
          <SelectValue placeholder="All statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          {statuses.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select value={genre} onValueChange={onGenre}>
        <SelectTrigger aria-label="Filter by genre" className="h-11 bg-card">
          <SelectValue placeholder="All genres" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All genres</SelectItem>
          {genres.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const open = status === "Open" || status === "Accepting";
  return (
    <span className={open ? "rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase text-primary-foreground" : "rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase text-secondary-foreground"}>
      {status}
    </span>
  );
}

export function GenreTags({ genres }: { genres: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {genres.map((item) => <span key={item} className="rounded-sm border border-border bg-muted px-2 py-1 text-[10px] text-muted-foreground">{item}</span>)}
    </div>
  );
}

export function SiteLink({ href, label = "Visit site" }: { href: string; label?: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      {label}<ExternalLink className="size-3" aria-hidden="true" />
    </a>
  );
}

export function Location({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="size-3" aria-hidden="true" />{children}</span>;
}

export function EmptyDirectory() {
  return <div className="border border-dashed border-border py-16 text-center text-sm text-muted-foreground">No listings match those filters.</div>;
}
