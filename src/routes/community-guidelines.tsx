import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage, policyHead } from "@/components/policy-page";
import { POLICY } from "@/data/policies";

export const Route = createFileRoute("/community-guidelines")({
  staticData: { sitemap: true },
  head: policyHead("community-guidelines", "Community Guidelines", "How members of the Fourth Group Author Community treat each other and each other's work."),
  component: () => (
    <PolicyPage title="Community Guidelines" intro="The standards that keep the Author Community generous and safe."
      sections={[
        { h: "Who can post", body: <p>The Author Community is open to members with an active paid membership, plus Fourth Group & Co administrators and moderators. Your display name and badge reflect your real role — Member, Pro Member, Moderator or Admin.</p> },
        { h: "Be generous and specific", body: <p>Critique the work, never the writer. No harassment, hate speech, spam or unsolicited promotion outside the Marketing & Promotion room.</p> },
        { h: "Your work stays yours", body: <p>Sharing an excerpt does not transfer any rights. Do not copy, repost or use another member's writing — including to train AI systems — without written permission.</p> },
        { h: "Moderation", body: <p>Moderators may hide or remove posts that break these guidelines and may suspend access for repeated breaches. Concerns can be sent to {POLICY.supportEmail}.</p> },
      ]} />
  ),
});
