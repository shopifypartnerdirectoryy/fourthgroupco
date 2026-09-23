import { createFileRoute } from "@tanstack/react-router";
import { EditorialPage } from "@/components/editorial-page";
export const Route = createFileRoute("/pitch-plans")({
  head: () => ({ meta: [{ title: "Pitch Plans & Pricing | Fourth Group & Co" }, { name: "description", content: "Straightforward options for presenting stories for adaptation." }, { property: "og:title", content: "Pitch Plans & Pricing | Fourth Group & Co" }, { property: "og:description", content: "Choose how to present your story for adaptation." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <EditorialPage kicker="Movie adaptation" title="Plans and pricing" intro="Simple options designed to help writers present their work clearly and professionally." points={["Clear annual pricing", "A guided pitch format", "Control over your story details", "Direct enquiry handling"]} />,
});