import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/page-shell";

export const Route = createFileRoute("/directory")({
  head: () => ({
    meta: [
      { title: "Author Directory | Fourth Group & Co" },
      {
        name: "description",
        content:
          "Find authors, poets and screenwriters in the Fourth Group & Co directory — books, genres and availability for events and interviews.",
      },
      { property: "og:title", content: "Author Directory | Fourth Group & Co" },
      { property: "og:description", content: "A global directory of working writers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const AUTHORS = [
  { name: "Adaeze Okonkwo", genre: "Literary fiction", place: "Lagos", books: 2 },
  { name: "Helen Varga", genre: "Poetry", place: "Bristol", books: 1 },
  { name: "Marcus Ilesanmi", genre: "Short stories", place: "Toronto", books: 3 },
  { name: "Priya Raghavan", genre: "Memoir", place: "Chennai", books: 1 },
  { name: "Tomas Reddy", genre: "Screenwriting", place: "Dublin", books: 2 },
  { name: "Camille Esparza", genre: "Poetry · Translation", place: "Mexico City", books: 4 },
  { name: "Ola Sandvik", genre: "Nature writing", place: "Bergen", books: 2 },
  { name: "Iris Lenoir", genre: "Historical fiction", place: "Montreal", books: 3 },
  { name: "Nuru Adeyemi", genre: "Speculative fiction", place: "Nairobi", books: 1 },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

function Page() {
  return (
    <PageShell>
      <PageHeader
        kicker="Community"
        title="The author directory"
        intro="Four hundred and eighty writers keep a profile here: their books, the work they take on, and whether they are open to events, panels and interviews. A profile is free for any writer."
      />
      <div className="mx-auto grid max-w-6xl gap-5 px-5 py-14 md:grid-cols-2 lg:grid-cols-3">
        {AUTHORS.map((a) => (
          <article key={a.name} className="flex gap-4 rounded-xl border border-border bg-card p-6">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent font-serif text-accent-foreground">
              {initials(a.name)}
            </div>
            <div>
              <h2 className="font-serif text-lg text-card-foreground">{a.name}</h2>
              <p className="text-sm text-primary">{a.genre}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {a.place} · {a.books} {a.books === 1 ? "book" : "books"}
              </p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
