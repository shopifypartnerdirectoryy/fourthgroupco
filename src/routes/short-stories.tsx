import { createFileRoute } from "@tanstack/react-router";
import { EditorialPage } from "@/components/editorial-page";
export const Route = createFileRoute("/short-stories")({
  head: () => ({ meta: [{ title: "Short Story Opportunities | Fourth Group & Co" }, { name: "description", content: "Markets, competitions and practical resources for short-story writers." }, { property: "og:title", content: "Short Story Opportunities | Fourth Group & Co" }, { property: "og:description", content: "Find places for your short fiction." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <EditorialPage kicker="Publish your writing" title="Short stories" intro="Find journals, competitions and presses looking for short fiction." points={["Markets grouped by length", "Payment and rights information", "Current submission windows", "Genre-specific opportunities"]} />,
});