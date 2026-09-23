import { createFileRoute } from "@tanstack/react-router";
import { EditorialPage } from "@/components/editorial-page";
export const Route = createFileRoute("/pitch-dashboard")({
  head: () => ({ meta: [{ title: "Pitch Dashboard | Fourth Group & Co" }, { name: "description", content: "Manage story pitches and adaptation enquiries." }, { property: "og:title", content: "Pitch Dashboard | Fourth Group & Co" }, { property: "og:description", content: "Manage your adaptation pitches." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <EditorialPage kicker="Your pitches" title="Pitch dashboard" intro="Keep your pitch materials and enquiries organised in one place." points={["Review current pitches", "Update project details", "Track professional enquiries", "Keep rights information current"]} />,
});