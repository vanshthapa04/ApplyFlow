import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Company } from "@/types/company";
import type { ApplicationStatus } from "@/types/application";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useCompanies } from "@/hooks/useCompanies";
import { useCreateApplication } from "@/hooks/useCreateApplication";

export default function AddApplicationDialog() {
  const [open, setOpen] =
    useState(false);

  const companies =
    useCompanies();
  const companyList: Company[] = companies.data?.data ?? [];

  const createApplication =
    useCreateApplication();

    const [form, setForm] =
    useState({
      companyId: "",
      jobTitle: "",
      jobType: "",
      location: "",
      salary: "",
      applicationDate: "",
      status: "Applied" as ApplicationStatus,
      jobUrl: "",
    });

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await createApplication.mutateAsync({
      companyId: form.companyId,
      jobTitle: form.jobTitle,
      jobType: form.jobType,
      location: form.location,
      salary: form.salary
        ? Number(form.salary)
        : undefined,
      applicationDate:
        form.applicationDate ||
        undefined,
      status: form.status,
      jobUrl:
        form.jobUrl || undefined,
    });

    setOpen(false);

    setForm({
      companyId: "",
      jobTitle: "",
      jobType: "",
      location: "",
      salary: "",
      applicationDate: "",
      status: "Applied",
      jobUrl: "",
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        render={<Button />}
      >
        + Add Application
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Add Application
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
                companyId:
                  e.target.value,
              })
            }
          >
            <option value="">
              Select Company
            </option>

            {companyList.map((company) => (
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
            required
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
            value={
              form.applicationDate
            }
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
                  status: e.target.value as ApplicationStatus,
                })
              }
          >
            <option>
              Applied
            </option>

            <option>
              Interview
            </option>

            <option>
              Offer
            </option>

            <option>
              Rejected
            </option>

            <option>
              Hired
            </option>
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
            Add Application
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}