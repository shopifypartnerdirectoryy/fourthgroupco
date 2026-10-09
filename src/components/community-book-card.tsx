import type { CommunityBook } from "@/data/community";

export function CommunityBookCard({ book }: { book: CommunityBook }) {
  return (
    <div className="mt-3 flex max-w-md gap-3 rounded-sm border border-border bg-card p-3">
      <img src={book.image} alt={`Cover of ${book.title}`} loading="lazy" className="h-24 w-16 shrink-0 rounded-sm object-cover" />
      <div className="min-w-0">
        <p className="font-serif text-base leading-tight text-card-foreground">{book.title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{book.author} · {book.format}</p>
        <a href={book.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block rounded-sm bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">View on Amazon</a>
      </div>
    </div>
  );
}
