import { createFileRoute } from "@tanstack/react-router";
import { EditorialPage } from "@/components/editorial-page";
export const Route = createFileRoute("/events")({
  head: () => ({ meta: [{ title: "Literary Events | Fourth Group & Co" }, { name: "description", content: "Readings, workshops, festivals and literary gatherings for writers." }, { property: "og:title", content: "Literary Events | Fourth Group & Co" }, { property: "og:description", content: "Find literary events and gatherings." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <EditorialPage kicker="Community" title="Literary events" intro="Find readings, workshops, festivals and gatherings where writers meet readers and one another." points={["Readings and launches", "Workshops and masterclasses", "Festivals and conferences", "Online and in-person events"]} />,
});