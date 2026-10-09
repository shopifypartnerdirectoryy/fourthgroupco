import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage, policyHead } from "@/components/policy-page";

export const Route = createFileRoute("/privacy")({
  staticData: { sitemap: true },
  head: policyHead("privacy", "Privacy Policy", "What personal information Fourth Group & Co collects, why, and how members can manage it."),
  component: () => (
    <PolicyPage title="Privacy Policy" intro="What we collect, why we collect it, and your choices."
      sections={[
        { h: "What we collect", body: <ul className="list-disc space-y-1 pl-5">
          <li>Account details: email address and sign-in information (including Google sign-in if you choose it).</li>
          <li>Forms you send: author spotlight requests (name, email, title, genre) and article requests (name, email, optional story note).</li>
          <li>Member records: saved opportunities, private notes, submission statuses, event registrations, pitches, membership and refund requests.</li>
        </ul> },
        { h: "Why we use it", body: <p>To run your account, review editorial requests, provide member features, administer membership and respond to support requests. Editorial requests are not used for marketing unless you separately agree.</p> },
        { h: "Who can see it", body: <p>Private records are visible only to you and to authorised Fourth Group & Co staff where needed to provide the service. Pitches you choose to list publicly are visible to everyone. We do not sell personal data.</p> },
        { h: "Cookies and analytics", body: <p>We use only the browser storage needed to keep you signed in and remember that you have seen a popup. See the <a className="text-primary underline" href="/cookie-policy">Cookie Policy</a>.</p> },
        { h: "Your rights", body: <p>You can ask to see, correct or delete your information by emailing our support team. Deleting your account removes your private records, subject to records we must keep by law.</p> },
      ]} />
  ),
});
