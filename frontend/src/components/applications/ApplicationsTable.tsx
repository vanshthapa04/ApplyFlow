import type { Application } from "@/types/application";

import StatusBadge from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useDeleteApplication } from "@/hooks/useDeleteApplication";
import EditApplicationDialog from "./EditApplicationDialog";
interface Props {
  applications: Application[];

}


export default function ApplicationsTable({
  applications,
}: Props) {
    const deleteApplication = useDeleteApplication();
  if (!applications.length) {
    return (
      <div className="rounded-2xl border bg-white p-12 text-center">
        <h2 className="text-xl font-semibold">
          No Applications Found
        </h2>

        <p className="mt-2 text-slate-500">
          Start by adding your first application.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr className="border-b">
            <th className="px-6 py-4 text-left">
              Company
            </th>

            <th className="px-6 py-4 text-left">
              Job Title
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-left">
              Applied On
            </th>
            <th className="px-6 py-4 text-center">
  Actions
</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((application) => (
            <tr
              key={application.id}
              className="border-b last:border-none hover:bg-slate-50"
            >
              <td className="px-6 py-5 font-medium">
                {application.company_name}
              </td>

              <td className="px-6 py-5">
                {application.job_title}
              </td>

              <td className="px-6 py-5">
                <StatusBadge
                  status={application.status}
                />
              </td>

              <td className="px-6 py-5 text-slate-500">
                {new Date(
                  application.application_date
                ).toLocaleDateString()}
              </td>
              <td className="px-6 py-5">
  <div className="flex justify-center gap-2">
  <EditApplicationDialog
  application={application}
/>

    <Button
  size="icon"
  variant="ghost"
  onClick={() => {
    if (
      confirm(
        "Delete this application?"
      )
    ) {
      deleteApplication.mutate(
        application.id
      );
    }
  }}
>
  <Trash2
    size={18}
    className="text-red-500"
  />
</Button>
  </div>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}