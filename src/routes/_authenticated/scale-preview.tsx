import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/use-session";
import { CATEGORIES } from "@/data/community";

export const Route = createFileRoute("/_authenticated/scale-preview")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Scale preview (staff only) | Fourth Group & Co" },
      { name: "description", content: "Private staff mock-up of the community at full scale." },
      { property: "og:title", content: "Scale preview | Fourth Group & Co" },
      { property: "og:description", content: "Private staff mock-up." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ScalePreview,
});

const TOTAL_POSTS = 65000;
const TOTAL_MEMBERS = 70000;
const PAGE = 20;
const TOPICS = ["Querying", "First chapters", "Revision", "Book launch", "Screen rights", "Poetry", "Agents", "Marketing"];

function samplePost(i: number) {
  const cat = CATEGORIES[i % CATEGORIES.length];
  return {
    id: i,
    room: cat?.label ?? "Discussions",
    title: `Sample post #${(TOTAL_POSTS - i).toLocaleString()} · ${TOPICS[i % TOPICS.length]}`,
    author: `Sample Member ${((i * 7919) % TOTAL_MEMBERS) + 1}`,
    likes: (i * 37) % 120,
    replies: (i * 13) % 40,
    ago: `${(i % 59) + 1} min ago`,
  };
}

function ScalePreview() {
  const { isAdmin, ready } = useSession();
  const [page, setPage] = useState(0);
  const posts = useMemo(() => Array.from({ length: PAGE }, (_, k) => samplePost(page * PAGE + k)), [page]);
  const pages = Math.ceil(TOTAL_POSTS / PAGE);

  if (!ready) return <PageShell><p className="p-12 text-center text-sm">Checking access…</p></PageShell>;
  if (!isAdmin) return <PageShell><p className="p-12 text-center text-sm text-muted-foreground">This area is for Fourth Group & Co staff only.</p></PageShell>;

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-5 py-10">
        <div role="note" className="rounded-sm border border-primary bg-primary/10 p-4 text-sm">
          <strong>Mock-up only.</strong> These numbers and posts are generated in your browser for staff to picture the
          community at full scale. Nothing is saved, and this page is never shown to visitors or search engines.
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[["Posts", TOTAL_POSTS], ["Active members", TOTAL_MEMBERS], ["Rooms", CATEGORIES.length]].map(([l, v]) => (
            <div key={l as string} className="rounded-sm border bg-card p-5">
              <p className="text-xs uppercase text-muted-foreground">{l}</p>
              <p className="mt-1 font-serif text-3xl text-foreground">{(v as number).toLocaleString()}</p>
            </div>
          ))}
        </div>

        <ul className="mt-8 space-y-3">
          {posts.map((p) => (
            <li key={p.id} className="rounded-sm border bg-card p-4">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="grid size-8 place-items-center rounded-full bg-secondary text-secondary-foreground">
                  {p.author.split(" ").pop()?.slice(0, 2)}
                </span>
                <span className="font-medium text-foreground">{p.author}</span>
                <span>· {p.room}</span>
                <span>· {p.ago}</span>
              </div>
              <p className="mt-2 font-serif text-lg text-foreground">{p.title}</p>
              <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Heart className="size-3.5" />{p.likes}</span>
                <span className="inline-flex items-center gap-1"><MessageCircle className="size-3.5" />{p.replies}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between text-sm">
          <Button variant="outline" disabled={page === 0} onClick={() => setPage((n) => n - 1)}>Previous</Button>
          <span className="text-muted-foreground">Page {(page + 1).toLocaleString()} of {pages.toLocaleString()}</span>
          <Button variant="outline" disabled={page >= pages - 1} onClick={() => setPage((n) => n + 1)}>Next</Button>
        </div>
      </div>
    </PageShell>
  );
}
