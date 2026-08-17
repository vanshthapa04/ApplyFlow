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
    <div className="flex min-h-screen bg-slate-100 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />

        <main className="flex-1 bg-slate-100 p-8 dark:bg-slate-950">
          {children}
        </main>
      </div>
    </div>
  );
}