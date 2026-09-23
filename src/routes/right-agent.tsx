import { createFileRoute } from "@tanstack/react-router";
import { EditorialPage } from "@/components/editorial-page";
export const Route = createFileRoute("/right-agent")({
  head: () => ({ meta: [{ title: "Find the Right Literary Agent | Fourth Group & Co" }, { name: "description", content: "A practical route to building a focused literary agent list." }, { property: "og:title", content: "Find the Right Literary Agent | Fourth Group & Co" }, { property: "og:description", content: "Build a focused agent shortlist for your manuscript." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <EditorialPage kicker="Agent research" title="Find the right agent" intro="Build a thoughtful shortlist instead of sending the same query everywhere." points={["Match by genre and audience", "Review recent deals and interests", "Check query requirements", "Track each submission clearly"]} />,
});