import { format } from "date-fns";
import { Briefcase } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { StatusBadge } from "@/components/shared/StatusBadge";

import type { RecentApplication } from "@/types/dashboard";

interface RecentApplicationsProps {
  applications: RecentApplication[];
}

export function RecentApplications({
  applications,
}: RecentApplicationsProps) {
  return (
    <Card className="rounded-2xl border-border/70 bg-card text-card-foreground shadow-sm dark:border-slate-800">
      <CardHeader>
        <CardTitle className="text-foreground">
          Recent Applications
        </CardTitle>
      </CardHeader>

      <CardContent>
        {applications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Briefcase className="mb-3 h-10 w-10 text-muted-foreground" />

            <p className="font-medium text-foreground">
              No applications yet
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Start tracking your job applications.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <div
                key={application.id}
                className="flex items-center justify-between rounded-xl border border-border bg-background p-4 transition-colors hover:bg-muted/30 dark:border-slate-800"
              >
                <div>
                  <h3 className="font-medium text-foreground">
                    {application.job_title}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {application.company_name}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Applied on{" "}
                    {format(
                      new Date(
                        application.application_date
                      ),
                      "dd MMM yyyy"
                    )}
                  </p>
                </div>

                <StatusBadge
                  status={application.status as any}
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}