import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage, policyHead } from "@/components/policy-page";
import { POLICY } from "@/data/policies";

export const Route = createFileRoute("/membership-terms")({
  staticData: { sitemap: true },
  head: policyHead("membership-terms", "Membership Terms", "Price, duration, manual renewal and cancellation terms for Fourth Group & Co membership."),
  component: () => (
    <PolicyPage title="Membership Terms" intro="Price, duration, renewal and cancellation."
      sections={[
        { h: "Price", body: <p>${POLICY.priceUsd} USD per membership, subject to the price clearly displayed at checkout.</p> },
        { h: "Duration", body: <p>Each membership lasts {POLICY.durationMonths} months from the date your payment is confirmed.</p> },
        { h: "Manual renewal only", body: <p>Memberships never renew automatically and you will not be charged again without choosing to renew. Before your membership ends you can renew by paying again.</p> },
        { h: "Cancellation", body: <p>You can request cancellation from your dashboard at any time. Access continues until the end of your paid membership period, subject to applicable law.</p> },
        { h: "Refunds", body: <p>See the <a className="text-primary underline" href="/refund-policy">Refund Policy</a>.</p> },
        { h: "Payment", body: <p>Payment is taken through a secure external payment link. We never see or store your card details. Membership is activated after our team confirms the payment.</p> },
      ]} />
  ),
});
