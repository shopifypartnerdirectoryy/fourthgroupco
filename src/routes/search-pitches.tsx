import { createFileRoute } from "@tanstack/react-router";
import { EditorialPage } from "@/components/editorial-page";
export const Route = createFileRoute("/search-pitches")({
  head: () => ({ meta: [{ title: "Search Story Pitches | Fourth Group & Co" }, { name: "description", content: "Browse original stories presented for screen adaptation." }, { property: "og:title", content: "Search Story Pitches | Fourth Group & Co" }, { property: "og:description", content: "Discover adaptation-ready stories." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <EditorialPage kicker="Movie adaptation" title="Search pitches" intro="Discover original fiction and nonfiction with clear screen potential." points={["Search by genre", "Review concise story hooks", "Explore audience and format", "Contact writers professionally"]} />,
});