import { useMemo, useState } from "react";
import { ExternalLink, Mail, Search, Star } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type ShelfBook = { title: string; author: string; format: string; rating: string; image: string; description: string; link: string; tag: string };

export function FilterableShelf({ books }: { books: readonly ShelfBook[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const tags = useMemo(() => ["All", ...Array.from(new Set(books.map((b) => b.tag)))], [books]);
  const shown = books.filter((b) => (tag === "All" || b.tag === tag) && `${b.title} ${b.author}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <>
      <div className="mx-auto mt-8 flex max-w-md items-center gap-2 border-b border-secondary-foreground/25">
        <Search aria-hidden="true" className="size-4 text-primary" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title or author" aria-label="Search books" className="w-full bg-transparent py-2 text-sm text-secondary-foreground outline-none placeholder:text-secondary-foreground/45" />
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by genre">
        {tags.map((t) => (
          <button key={t} type="button" onClick={() => setTag(t)} aria-pressed={tag === t} className={`border px-3 py-1 text-[11px] font-semibold uppercase transition-colors ${tag === t ? "border-primary bg-primary text-primary-foreground" : "border-secondary-foreground/25 text-secondary-foreground/75 hover:border-primary hover:text-primary"}`}>{t}</button>
        ))}
      </div>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((book) => (
          <article key={`${book.title}-${book.image}`} className="flex min-w-0 flex-col">
            <div className="flex aspect-[3/4] items-center justify-center overflow-hidden rounded-sm bg-background/5 p-3"><img src={book.image} alt={`${book.title} book cover`} loading="lazy" className="max-h-full max-w-full object-contain shadow-xl" /></div>
            <p className="mt-5 text-[10px] font-semibold uppercase text-primary">{book.tag}</p>
            <h3 className="mt-2 font-serif text-xl leading-tight">{book.title}</h3><p className="mt-1 text-xs text-secondary-foreground/60">by {book.author} · {book.format}</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-primary">{book.rating !== "Available now" ? <Star aria-hidden="true" className="size-3 shrink-0 fill-current" /> : null}<span>{book.rating}</span></div>
            <p className="mt-4 line-clamp-4 text-xs leading-relaxed text-secondary-foreground/65">{book.description}</p>
            <Button asChild variant="link" className="mt-auto h-auto w-fit px-0 pt-5 text-primary"><a href={book.link} target="_blank" rel="noopener noreferrer">View on Amazon <ExternalLink /></a></Button>
          </article>
        ))}
      </div>
      {shown.length === 0 ? <p className="mt-10 text-center text-sm text-secondary-foreground/60">No books match that search yet.</p> : null}
    </>
  );
}

const schema = z.object({ first_name: z.string().trim().max(100), email: z.string().trim().email("Please enter a valid email address").max(255) });

export function NewsletterSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [error, setError] = useState("");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ first_name: name, email });
    if (!parsed.success) return setError(parsed.error.issues[0]?.message ?? "Please check your details");
    setError(""); setState("busy");
    const { error: err } = await supabase.from("newsletter_subscribers").insert({ email: parsed.data.email.toLowerCase(), first_name: parsed.data.first_name || null });
    if (err && err.code !== "23505") { setState("idle"); return setError("Something went wrong. Please try again."); }
    setState("done");
  }
  return (
    <section className="border-y border-border bg-accent/35">
      <div className="mx-auto max-w-2xl px-5 py-16 text-center">
        <Mail aria-hidden="true" className="mx-auto size-6 text-primary" />
        <p className="mt-4 text-xs font-semibold uppercase text-primary">The Fourth Group Letter</p>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl">New books and opportunities, in your inbox</h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">An occasional note with newly featured titles, open calls, and craft notes from our desk. No spam — unsubscribe any time.</p>
        {state === "done" ? (
          <p className="mt-8 font-serif text-xl text-primary">Thank you — you’re on the list.</p>
        ) : (
          <form onSubmit={submit} noValidate className="mx-auto mt-8 grid max-w-lg gap-3 sm:grid-cols-[1fr_1.4fr_auto]">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="First name" aria-label="First name" className="rounded-none bg-background" />
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" aria-label="Email address" required className="rounded-none bg-background" />
            <Button type="submit" disabled={state === "busy"} className="rounded-none">{state === "busy" ? "Joining…" : "Subscribe"}</Button>
          </form>
        )}
        {error ? <p role="alert" className="mt-3 text-sm text-destructive">{error}</p> : null}
      </div>
    </section>
  );
}
