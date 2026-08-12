import DashboardLayout from "@/layouts/DashboardLayout";

import AddInterviewDialog from "@/components/interviews/AddInterviewDialog";
import InterviewsTable from "@/components/interviews/InterviewsTable";

import { useInterviews } from "@/hooks/useInterviews";

export default function Interviews() {
  const {
    data,
    isLoading,
    isError,
  } = useInterviews();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-slate-500">
            Loading interviews...
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="rounded-xl border bg-white p-10 text-center">
          <h2 className="text-lg font-semibold text-red-600">
            Failed to load interviews
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Please try refreshing the page.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Interviews
          </h1>

          <p className="mt-2 text-slate-500">
            Schedule and manage all your interviews.
          </p>
        </div>

        <AddInterviewDialog />
      </div>

      <InterviewsTable
        interviews={data ?? []}
      />
    </DashboardLayout>
  );
}