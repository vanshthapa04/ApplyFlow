import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ApplicationStatus, InterviewStatus } from "@/lib/mock-data";

const applicationStyles: Record<ApplicationStatus, string> = {
  Applied: "bg-blue-50 text-blue-700 border-blue-200",
  Interview: "bg-amber-50 text-amber-700 border-amber-200",
  Offer: "bg-violet-50 text-violet-700 border-violet-200",
  Rejected: "bg-rose-50 text-rose-700 border-rose-200",
  Hired: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", applicationStyles[status])}
    >
      <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </Badge>
  );
}

const interviewStyles: Record<InterviewStatus, string> = {
  Scheduled: "bg-blue-50 text-blue-700 border-blue-200",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Cancelled: "bg-rose-50 text-rose-700 border-rose-200",
  Rescheduled: "bg-amber-50 text-amber-700 border-amber-200",
};

export function InterviewStatusBadge({ status }: { status: InterviewStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", interviewStyles[status])}
    >
      <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </Badge>
  );
}
