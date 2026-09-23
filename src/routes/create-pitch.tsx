import { createFileRoute } from "@tanstack/react-router";
import { EditorialPage } from "@/components/editorial-page";
export const Route = createFileRoute("/create-pitch")({
  head: () => ({ meta: [{ title: "Create a Story Pitch | Fourth Group & Co" }, { name: "description", content: "Prepare your story pitch for film and television professionals." }, { property: "og:title", content: "Create a Story Pitch | Fourth Group & Co" }, { property: "og:description", content: "Turn your story into a focused adaptation pitch." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <EditorialPage kicker="Movie adaptation" title="Create a pitch" intro="Organise the essential details of your story before sharing it with industry readers." points={["Write a concise logline", "Introduce the central characters", "Describe the story arc", "State the rights available"]} />,
});