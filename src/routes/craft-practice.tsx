import { createFileRoute } from "@tanstack/react-router";
import { EditorialPage } from "@/components/editorial-page";
export const Route = createFileRoute("/craft-practice")({
  staticData: { sitemap: true },
  head: () => ({ links: [{ rel: "canonical", href: "https://fourthgroupco.lovable.app/craft-practice" }], meta: [{ title: "Writing Craft & Practice | Fourth Group & Co" }, { name: "description", content: "Practical guidance for strengthening a sustainable writing practice." }, { property: "og:title", content: "Writing Craft & Practice | Fourth Group & Co" }, { property: "og:description", content: "Develop your craft and writing practice." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "https://fourthgroupco.lovable.app/craft-practice" }] }),
  component: () => <EditorialPage kicker="Resources" title="Craft and practice" intro="Practical guidance for better drafts, stronger habits and a writing life you can sustain." points={["Revision and structure", "Character and voice", "Routine and momentum", "Giving and receiving feedback"]} />,
});