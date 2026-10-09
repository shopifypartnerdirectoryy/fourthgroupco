import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage, policyHead } from "@/components/policy-page";
import { POLICY } from "@/data/policies";

export const Route = createFileRoute("/terms")({
  staticData: { sitemap: true },
  head: policyHead("terms", "Terms of Service", "The terms that apply when you use Fourth Group & Co's website, accounts and member services."),
  component: () => (
    <PolicyPage title="Terms of Service" intro="The ground rules for using Fourth Group & Co."
      sections={[
        { h: "Who we are", body: <p>Fourth Group & Co ({POLICY.website}) is a literary and creative community platform for authors, poets, screenwriters and other creatives. We are not a publisher or literary agency.</p> },
        { h: "Your account", body: <p>You must give accurate details and keep your sign-in secure. You are responsible for activity on your account. We may suspend accounts that misuse the service or harm other members.</p> },
        { h: "Your content", body: <p>You keep ownership of everything you submit. You give us permission to store and display it only as needed to provide the features you choose (for example, a public pitch you list). You confirm you have the right to share it.</p> },
        { h: "Opportunity listings", body: <p>Directory information is provided for convenience and can change. Always confirm details with the organiser. We do not guarantee publication, awards, funding or placements.</p> },
        { h: "Membership", body: <p>Membership terms, renewal and cancellation are described in the <a className="text-primary underline" href="/membership-terms">Membership Terms</a> and <a className="text-primary underline" href="/refund-policy">Refund Policy</a>.</p> },
        { h: "Liability", body: <p>The service is provided as is, to the extent permitted by applicable law. Nothing in these terms limits rights you have under applicable consumer law.</p> },
      ]} />
  ),
});
