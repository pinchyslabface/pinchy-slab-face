import "@/styles/globals.css";
import { PsfShell } from "@/components/PsfShell";
import type { ReactNode } from "react";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PsfShell>{children}</PsfShell>
      </body>
    </html>
  );
}
