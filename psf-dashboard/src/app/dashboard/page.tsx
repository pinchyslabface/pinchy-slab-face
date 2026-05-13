import { InitiativeHandoffCard } from "@/components/InitiativeHandoffCard";

export default function DashboardPage() {
  return (
    <main>
      <h1>PSF Dashboard</h1>
      <p>Simple project view with a fast path to hand off an initiative.</p>
      <section>
        <h2>How it works</h2>
        <p>
          Read the project, pick an initiative, copy the handoff packet, and
          paste it into a fresh Codex chat.
        </p>
      </section>
      <InitiativeHandoffCard />
    </main>
  );
}
