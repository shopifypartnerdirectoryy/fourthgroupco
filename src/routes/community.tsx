import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { COMMUNITY_CATEGORIES } from "@/data/community";

export const Route = createFileRoute("/community")({
  staticData: { sitemap: true },
  head: () => ({
    links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/community" }],
    meta: [
      { title: "Author Community Preview | Fourth Group & Co" },
      { name: "description", content: "A look inside the members-only Fourth Group Author Community: rooms for craft, publishing, promotion and screen adaptation." },
      { property: "og:title", content: "Author Community Preview | Fourth Group & Co" },
      { property: "og:description", content: "Rooms for craft, publishing, promotion and adaptation — open to members." },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://fourthgroupco.lovable.app/community" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHeader kicker="Community preview" title="The Fourth Group Author Community" intro="A members-only room where writers trade drafts, submission news and launch plans. Here is what's inside." />
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {COMMUNITY_CATEGORIES.map((c) => (
            <div key={c.key} className="reveal rounded-sm border border-border bg-card p-6">
              <h2 className="font-serif text-xl text-card-foreground">{c.label}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{c.note}</p>
              {c.key === "pro" ? <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-primary">Pro Members</p> : null}
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild><Link to="/author-community">Enter the community</Link></Button>
          <Button asChild variant="outline"><Link to="/membership">See membership</Link></Button>
          <Button asChild variant="ghost"><Link to="/community-guidelines">Community guidelines</Link></Button>
        </div>
      </div>
    </PageShell>
  );
}
