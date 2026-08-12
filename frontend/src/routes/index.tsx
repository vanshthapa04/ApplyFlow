import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";

import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { RecentApplications } from "@/components/dashboard/RecentApplications";
import { UpcomingInterviews } from "@/components/dashboard/UpcomingInterviews";
import { QuickActions } from "@/components/dashboard/QuickActions";

import { ApplicationFormDialog } from "@/components/modals/ApplicationFormDialog";
import { CompanyFormDialog } from "@/components/modals/CompanyFormDialog";
import { InterviewFormDialog } from "@/components/modals/InterviewFormDialog";

import { useDashboard } from "@/hooks/useDashboard";

import {
  applications,
  interviews,
  companies,
} from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

function DashboardPage() {
  const [appOpen, setAppOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [interviewOpen, setInterviewOpen] = useState(false);

  const {
    data: dashboard,
    isLoading,
    error,
  } = useDashboard();

  if (isLoading) {
    return (
      <AppShell>
        <div className="p-10">
          Loading dashboard...
        </div>
      </AppShell>
    );
  }

  if (error || !dashboard) {
    return (
      <AppShell>
        <div className="p-10 text-red-500">
          Failed to load dashboard.
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">

      <PageHeader
  title="Dashboard"
  description="Track your job search activity."
  actions={
    <QuickActions
      onNewApplication={() => setAppOpen(true)}
      onNewCompany={() => setCompanyOpen(true)}
      onNewInterview={() => setInterviewOpen(true)}
    />
  }
/>
        <DashboardStats
          overview={dashboard.overview}
        />

        <DashboardCharts
          monthlyTrend={dashboard.monthlyTrend}
          statusDistribution={
            dashboard.statusDistribution
          }
        />
                <div className="grid gap-6 lg:grid-cols-2">

<RecentApplications
  applications={dashboard.recentApplications}
/>

<UpcomingInterviews
  interviews={interviews.map((interview) => {
    const application = applications.find(
      (a) => a.id === interview.applicationId
    );

    const company = companies.find(
      (c) => c.id === application?.companyId
    );

    return {
      id: interview.id,
      company: company?.name ?? "Unknown Company",
      role: interview.round,
      interview_date: interview.interviewDate,
      interview_type: interview.mode,
      status: interview.status,
    };
  })}
/>

</div>

<ApplicationFormDialog
open={appOpen}
onOpenChange={setAppOpen}
/>

<CompanyFormDialog
open={companyOpen}
onOpenChange={setCompanyOpen}
/>

<InterviewFormDialog
open={interviewOpen}
onOpenChange={setInterviewOpen}
/>
</div>
    </AppShell>
  );
}