import { CalendarDays } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InterviewStatusBadge } from "@/components/shared/StatusBadge";

interface Interview {
  id: string;
  company: string;
  role: string;
  interview_date: string;
  interview_type: string;
  status: "Scheduled" | "Completed" | "Cancelled" | "Rescheduled";
}

interface UpcomingInterviewsProps {
  interviews: Interview[];
}

export function UpcomingInterviews({
  interviews,
}: UpcomingInterviewsProps) {
  return (
    <Card className="rounded-2xl border-border/70 shadow-sm">
      <CardHeader>
        <CardTitle>Upcoming Interviews</CardTitle>
      </CardHeader>

      <CardContent>
        {interviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CalendarDays className="mb-3 h-10 w-10 text-muted-foreground" />

            <p className="font-medium">
              No upcoming interviews
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Interviews will appear here once scheduled.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {interviews.map((interview) => (
              <div
                key={interview.id}
                className="rounded-xl border p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">
                      {interview.role}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {interview.company}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(
                        interview.interview_date
                      ).toLocaleString()}
                    </p>
                  </div>

                  <InterviewStatusBadge
                    status={interview.status}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}