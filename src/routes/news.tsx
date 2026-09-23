import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/page-shell";
import { NEWS } from "@/data/site";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Literary News & Announcements | Fourth Group & Co" },
      {
        name: "description",
        content:
          "Publishing news, submission season updates and announcements from the Fourth Group & Co writing community.",
      },
      { property: "og:title", content: "Literary News & Announcements | Fourth Group & Co" },
      { property: "og:description", content: "News for authors, poets and screenwriters." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHeader
        kicker="Newsroom"
        title="News and announcements"
        intro="Publishing news that affects working writers, plus statements and updates from us."
      />
      <div className="mx-auto max-w-3xl px-5 py-14">
        {NEWS.map((item) => (
          <article key={item.id} id={item.id} className="border-b border-border py-10 first:pt-0">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">{item.kicker}</p>
            <h2 className="mt-3 font-serif text-2xl leading-snug text-foreground">{item.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.body}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
