import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Pencil } from "lucide-react";

import { useCompanies } from "@/hooks/useCompanies";
import { useUpdateApplication } from "@/hooks/useUpdateApplication";

import type {
  Application,
  ApplicationStatus,
} from "@/types/application";
import type { Company } from "@/types/company";

interface Props {
  application: Application;
}

export default function EditApplicationDialog({
  application,
}: Props) {
  const [open, setOpen] = useState(false);

  const companies = useCompanies();
  const updateApplication =
    useUpdateApplication();

  const [form, setForm] = useState({
    companyId: application.company_id,
    jobTitle: application.job_title,
    jobType: application.job_type || "",
    location: application.location || "",
    salary: application.salary?.toString() || "",
    applicationDate:
      application.application_date.slice(0, 10),
    status:
      application.status as ApplicationStatus,
    jobUrl: application.job_url || "",
  });

  useEffect(() => {
    if (open) {
      setForm({
        companyId: application.company_id,
        jobTitle: application.job_title,
        jobType: application.job_type || "",
        location: application.location || "",
        salary:
          application.salary?.toString() || "",
        applicationDate:
          application.application_date.slice(
            0,
            10
          ),
        status:
          application.status as ApplicationStatus,
        jobUrl:
          application.job_url || "",
      });
    }
  }, [open, application]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await updateApplication.mutateAsync({
      id: application.id,
      data: {
        companyId: form.companyId,
        jobTitle: form.jobTitle,
        jobType: form.jobType,
        location: form.location,
        salary: form.salary
          ? Number(form.salary)
          : undefined,
        applicationDate:
          form.applicationDate,
        status: form.status,
        jobUrl:
          form.jobUrl || undefined,
      },
    });

    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        render={
          <Button
            size="icon"
            variant="ghost"
          />
        }
      >
        <Pencil size={18} />
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Edit Application
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <select
            required
            className="w-full rounded-md border p-3"
            value={form.companyId}
            onChange={(e) =>
              setForm({
                ...form,
                companyId: e.target.value,
              })
            }
          >
            <option value="">
              Select Company
            </option>

            {(companies.data?.data ??
              []).map((company: Company) => (
              <option
                key={company.id}
                value={company.id}
              >
                {company.name}
              </option>
            ))}
          </select>

          <Input
            placeholder="Job Title"
            value={form.jobTitle}
            onChange={(e) =>
              setForm({
                ...form,
                jobTitle:
                  e.target.value,
              })
            }
          />

          <Input
            placeholder="Job Type"
            value={form.jobType}
            onChange={(e) =>
              setForm({
                ...form,
                jobType:
                  e.target.value,
              })
            }
          />

          <Input
            placeholder="Location"
            value={form.location}
            onChange={(e) =>
              setForm({
                ...form,
                location:
                  e.target.value,
              })
            }
          />

          <Input
            type="number"
            placeholder="Salary"
            value={form.salary}
            onChange={(e) =>
              setForm({
                ...form,
                salary:
                  e.target.value,
              })
            }
          />

          <Input
            type="date"
            value={form.applicationDate}
            onChange={(e) =>
              setForm({
                ...form,
                applicationDate:
                  e.target.value,
              })
            }
          />

          <select
            className="w-full rounded-md border p-3"
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status:
                  e.target
                    .value as ApplicationStatus,
              })
            }
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
            <option>Hired</option>
          </select>

          <Input
            placeholder="Job URL"
            value={form.jobUrl}
            onChange={(e) =>
              setForm({
                ...form,
                jobUrl:
                  e.target.value,
              })
            }
          />

          <Button
            className="w-full"
            type="submit"
          >
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}