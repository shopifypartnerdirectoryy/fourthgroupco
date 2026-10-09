import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage, policyHead } from "@/components/policy-page";
import { POLICY } from "@/data/policies";

export const Route = createFileRoute("/refund-policy")({
  staticData: { sitemap: true },
  head: policyHead("refund-policy", "Refund Policy", "How Fourth Group & Co reviews membership refund requests."),
  component: () => (
    <PolicyPage title="Refund Policy" intro="How membership refund requests are handled."
      sections={[
        { h: "Case-by-case review", body: <p>Refund requests are reviewed individually, subject to applicable law. We consider the circumstances you describe and how the membership has been used.</p> },
        { h: "How to request a refund", body: <p>Sign in and open your dashboard, then choose “Request a refund”. You can also email {POLICY.supportEmail}. You will see the status of your request in your dashboard once we have reviewed it.</p> },
        { h: "Outcome", body: <p>If a refund is approved, it is returned through the original payment method and your membership ends. If declined, we explain why. Your statutory rights are not affected.</p> },
      ]} />
  ),
});
