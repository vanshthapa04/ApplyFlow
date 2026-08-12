import DashboardLayout from "@/layouts/DashboardLayout";
import { useApplications } from "@/hooks/useApplications";
import ApplicationsTable from "@/components/applications/ApplicationsTable";
import { Button } from "@/components/ui/button";
import AddApplicationDialog from "@/components/applications/AddApplicationDialog";

export default function Applications() {
  const { data, isLoading } = useApplications();

  if (isLoading) {
    return (
      <DashboardLayout>
        Loading...
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
  <div>
    <h1 className="text-4xl font-bold">
      Applications
    </h1>

    <p className="mt-2 text-slate-500">
      Manage all your job applications.
    </p>
  </div>

  <AddApplicationDialog />
</div>

      <ApplicationsTable
  applications={data?.data ?? []}
/>
    </DashboardLayout>
  );
}