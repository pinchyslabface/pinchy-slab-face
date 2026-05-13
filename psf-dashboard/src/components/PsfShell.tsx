"use client";

import type { ReactNode } from "react";
import { PsfTabs } from "@/components/PsfTabs";
import { usePathname } from "next/navigation";

const publicRoutes = new Set(["/", "/subscribe", "/thank-you"]);

export function PsfShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPublicRoute = publicRoutes.has(pathname);

  return (
    <div>
      {!isPublicRoute && <PsfTabs />}
      {children}
    </div>
  );
}
