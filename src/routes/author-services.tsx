import { createFileRoute } from "@tanstack/react-router";
import { EditorialPage } from "@/components/editorial-page";
export const Route = createFileRoute("/author-services")({
  head: () => ({ meta: [{ title: "Author Services | Fourth Group & Co" }, { name: "description", content: "A guide to professional services authors may need during publication." }, { property: "og:title", content: "Author Services | Fourth Group & Co" }, { property: "og:description", content: "Understand professional services for authors." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <EditorialPage kicker="Resources" title="Author services" intro="Understand the professional support available at each stage of a book’s life." points={["Editing and proofreading", "Cover and interior design", "Publicity and events", "Rights and contract guidance"]} />,
});