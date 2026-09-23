import { createFileRoute } from "@tanstack/react-router";
import { EditorialPage } from "@/components/editorial-page";
export const Route = createFileRoute("/literary-agents")({
  head: () => ({ meta: [{ title: "Literary Agents | Fourth Group & Co" }, { name: "description", content: "Research literary agents by genre, market and submission status." }, { property: "og:title", content: "Literary Agents | Fourth Group & Co" }, { property: "og:description", content: "Find agents actively seeking new writing." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <EditorialPage kicker="Publish your writing" title="Literary agents" intro="Research agents by genre, market and the kind of work they are actively seeking." points={["Genre and market preferences", "Open and closed query periods", "Agency details and submission links", "Verified notes on what to send"]} />,
});