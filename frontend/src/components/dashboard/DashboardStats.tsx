import {
  Briefcase,
  CheckCircle2,
  Clock,
  Send,
  Trophy,
  XCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { DashboardOverview } from "@/types/dashboard";

interface DashboardStatsProps {
  overview: DashboardOverview;
}

const statCards = [
  {
    key: "totalApplications",
    label: "Total Applications",
    icon: Briefcase,
    tint: "text-primary bg-primary/10",
  },
  {
    key: "applied",
    label: "Applied",
    icon: Send,
    tint: "text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400",
  },
  {
    key: "interview",
    label: "Interview",
    icon: Clock,
    tint: "text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400",
  },
  {
    key: "offer",
    label: "Offer",
    icon: Trophy,
    tint: "text-violet-600 bg-violet-50 dark:bg-violet-950/40 dark:text-violet-400",
  },
  {
    key: "rejected",
    label: "Rejected",
    icon: XCircle,
    tint: "text-rose-600 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400",
  },
  {
    key: "hired",
    label: "Hired",
    icon: CheckCircle2,
    tint: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
] as const;

export function DashboardStats({
  overview,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {statCards.map((card) => {
        const Icon = card.icon;

        const value =
          overview[
            card.key as keyof DashboardOverview
          ];

        return (
          <Card
            key={card.key}
            className="rounded-2xl border-border/70 bg-card text-card-foreground shadow-sm transition-all hover:shadow-md dark:border-slate-800"
          >
            <CardContent className="p-4">
              <div
                className={`grid h-9 w-9 place-items-center rounded-xl ${card.tint}`}
              >
                <Icon className="h-4 w-4" />
              </div>

              <div className="mt-4">
                <p className="text-2xl font-semibold text-foreground">
                  {value}
                </p>

                <p className="text-xs text-muted-foreground">
                  {card.label}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}