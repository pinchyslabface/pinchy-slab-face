export type PboProject = {
  name: string;
  currentFocus?: string;
};

export type PboStatusSnapshot = {
  overallHealth?: "green" | "amber" | "red" | "grey";
  overallProgress?: number;
  currentFocus?: string[];
  topPriorities?: string[];
  topRisks?: string[];
  keyBlockers?: string[];
  staffingSummary?: string[];
};
