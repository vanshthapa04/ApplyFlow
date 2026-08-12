import DashboardLayout from "@/layouts/DashboardLayout";
import AddCompanyDialog from "@/components/companies/AddCompanyDialog";
import { useCompanies } from "@/hooks/useCompanies";
import type { Company } from "@/types/company";
import { Pencil, Trash2 } from "lucide-react";
import DeleteCompanyDialog from "@/components/companies/DeleteCompanyDialog";
import EditCompanyDialog from "@/components/companies/EditCompanyDialog";
export default function Companies() {
  const { data, isLoading } = useCompanies();

  const companies: Company[] = data?.data ?? [];

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Companies
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all companies you've applied to.
          </p>
        </div>

        <AddCompanyDialog />
      </div>

      {isLoading ? (
        <div className="rounded-2xl border bg-white p-20 text-center">
          Loading...
        </div>
      ) : companies.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-20 text-center">
          <h2 className="text-2xl font-semibold">
            No Companies Yet
          </h2>

          <p className="mt-2 text-slate-500">
            Click <strong>Add Company</strong> to create your first company.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Company</th>
                <th className="p-4 text-left">Industry</th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-left">Website</th>
<th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {companies.map((company) => (
                <tr
                  key={company.id}
                  className="border-t"
                >
                  <td className="p-4 font-medium">
                    {company.name}
                  </td>

                  <td className="p-4">
                    {company.industry || "-"}
                  </td>

                  <td className="p-4">
                    {company.location || "-"}
                  </td>

                  <td className="p-4">
  {company.website ? (
    <a
      href={company.website}
      target="_blank"
      rel="noreferrer"
      className="font-medium text-blue-600 hover:underline"
    >
      Visit Website
    </a>
  ) : (
    "-"
  )}
</td>

<td className="p-4">
  <div className="flex justify-center gap-3">
  <EditCompanyDialog company={company} />

  <DeleteCompanyDialog
  id={company.id}
  name={company.name}
/>
  </div>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}