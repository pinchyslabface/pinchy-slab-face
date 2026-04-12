export type PboStatus = "now" | "next" | "later" | "blocked" | "waiting" | "done";

export type PboLane =
  | "strategy"
  | "tech"
  | "content"
  | "marketing"
  | "sponsorships"
  | "domains"
  | "orchestration";

export type PboRecord = {
  title: string;
  lane: PboLane;
  owner: string;
  status: PboStatus;
  priority?: number;
  nextAction?: string;
  blockers?: string[];
  dependencies?: string[];
  handoffNote?: string;
  lastUpdated?: string;
};
