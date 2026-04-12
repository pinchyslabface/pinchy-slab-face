export type HandoffPacket = {
  title: string;
  whyItMatters: string;
  decided: string[];
  openQuestions: string[];
  firstStep: string;
};

export function buildHandoffPacket(packet: HandoffPacket) {
  return `## Initiative Ingest

Title:
- ${packet.title}

Why it matters:
- ${packet.whyItMatters}

What is already decided:
${packet.decided.map((item) => `- ${item}`).join("\n")}

What is still open:
${packet.openQuestions.map((item) => `- ${item}`).join("\n")}

What to do first:
- ${packet.firstStep}

Repo docs:
- [MASTER_PLAN.md](/Users/Mike/dev/Pinchy%20Slab%20Face/MASTER_PLAN.md)
- [THREAD_HANDOFF.md](/Users/Mike/dev/Pinchy%20Slab%20Face/THREAD_HANDOFF.md)
- [PBO_PLAN.md](/Users/Mike/dev/Pinchy%20Slab%20Face/PBO_PLAN.md)
- [PBO_APP_SPEC.md](/Users/Mike/dev/Pinchy%20Slab%20Face/PBO_APP_SPEC.md)
`;
}
