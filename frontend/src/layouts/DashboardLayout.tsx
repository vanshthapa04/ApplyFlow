import type { ReactNode } from "react";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";


interface Props {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 bg-slate-50 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}