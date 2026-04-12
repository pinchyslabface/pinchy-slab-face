"use client";

import { useState } from "react";
import { buildHandoffPacket, type HandoffPacket } from "@/lib/handoff-packet";

const samplePacket: HandoffPacket = {
  title: "First market and signup flow",
  whyItMatters:
    "PSF needs a clear path from first interest to real email signups before the launch promo plan and first send can work cleanly.",
  decided: [
    "PSF uses a local PBO layer.",
    "The team is just Josiah and Mike.",
    "Ballina is the first public launch moment.",
    "PSF should support multi-city signups from day one.",
  ],
  openQuestions: [
    "How should we describe the first live market versus the broader multi-city structure?",
    "Which signup fields are truly worth asking at first signup?",
  ],
  firstStep:
    "Open a fresh Codex chat, paste this packet, and ask it to recommend the simplest first market decision and signup path that is ready before Ballina.",
};

export function InitiativeHandoffCard() {
  const [copied, setCopied] = useState(false);
  const packet = buildHandoffPacket(samplePacket);

  async function handleCopy() {
    await navigator.clipboard.writeText(packet);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section>
      <h2>Pick Up Initiative</h2>
      <p>
        Click once, paste into a fresh Codex chat, and the next chat has enough
        context to continue.
      </p>
      <button type="button" onClick={handleCopy}>
        {copied ? "Copied" : "Copy handoff packet"}
      </button>
      <pre>{packet}</pre>
    </section>
  );
}
