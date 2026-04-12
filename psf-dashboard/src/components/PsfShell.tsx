import type { ReactNode } from "react";
import { PsfTabs } from "@/components/PsfTabs";

export function PsfShell({ children }: { children: ReactNode }) {
  return (
    <div>
      <PsfTabs />
      {children}
    </div>
  );
}
