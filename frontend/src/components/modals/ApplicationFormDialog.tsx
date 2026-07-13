import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  APPLICATION_STATUSES,
  JOB_TYPES,
  companies as mockCompanies,
  type Application,
  type ApplicationStatus,
  type Company,
  type JobType,
} from "@/lib/mock-data";

export type ApplicationFormValues = Omit<Application, "id" | "companyName"> & { companyName: string };

interface ApplicationFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValue?: Application | null;
  companies?: Company[];
  onSubmit?: (values: ApplicationFormValues, id?: string) => void;
}

function defaults(companies: Company[]): ApplicationFormValues {
  const first = companies[0];
  return {
    companyId: first?.id ?? "",
    companyName: first?.name ?? "",
    jobTitle: "",
    jobType: "Full-time",
    location: "",
    salary: "",
    applicationDate: new Date().toISOString().slice(0, 10),
    status: "Applied",
    jobUrl: "",
  };
}

export function ApplicationFormDialog({
  open,
  onOpenChange,
  initialValue,
  companies = mockCompanies,
  onSubmit,
}: ApplicationFormDialogProps) {
  const isEdit = !!initialValue;
  const [values, setValues] = useState<ApplicationFormValues>(() => defaults(companies));

  useEffect(() => {
    if (open) {
      setValues(initialValue ? { ...initialValue } : defaults(companies));
    }
  }, [open, initialValue, companies]);

  const set = <K extends keyof ApplicationFormValues>(k: K, v: ApplicationFormValues[K]) =>
    setValues((prev) => ({ ...prev, [k]: v }));

  const handleCompany = (companyId: string) => {
    const co = companies.find((c) => c.id === companyId);
    setValues((prev) => ({ ...prev, companyId, companyName: co?.name ?? prev.companyName }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(values, initialValue?.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit application" : "Add application"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update this application's details." : "Track a new job application."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Company</Label>
              <Select value={values.companyId} onValueChange={handleCompany}>
                <SelectTrigger className="h-10 rounded-xl"><SelectValue placeholder="Select a company" /></SelectTrigger>
                <SelectContent>
                  {companies.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="a-title">Job title</Label>
              <Input id="a-title" required value={values.jobTitle} onChange={(e) => set("jobTitle", e.target.value)} placeholder="Senior Frontend Engineer" className="h-10 rounded-xl" />
            </div>
            <div className="grid gap-2">
              <Label>Job type</Label>
              <Select value={values.jobType} onValueChange={(v) => set("jobType", v as JobType)}>
                <SelectTrigger className="h-10 rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {JOB_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="a-location">Location</Label>
              <Input id="a-location" value={values.location} onChange={(e) => set("location", e.target.value)} placeholder="Bangalore, IN" className="h-10 rounded-xl" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="a-salary">Salary</Label>
              <Input id="a-salary" value={values.salary} onChange={(e) => set("salary", e.target.value)} placeholder="₹36 LPA" className="h-10 rounded-xl" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="a-date">Application date</Label>
              <Input id="a-date" type="date" required value={values.applicationDate.slice(0, 10)} onChange={(e) => set("applicationDate", e.target.value)} className="h-10 rounded-xl" />
            </div>
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select value={values.status} onValueChange={(v) => set("status", v as ApplicationStatus)}>
                <SelectTrigger className="h-10 rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {APPLICATION_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="a-url">Job URL</Label>
              <Input id="a-url" type="url" value={values.jobUrl} onChange={(e) => set("jobUrl", e.target.value)} placeholder="https://…" className="h-10 rounded-xl" />
            </div>
          </div>
          <DialogFooter className="mt-2">
            <Button type="button" variant="outline" className="rounded-xl" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="rounded-xl">{isEdit ? "Save changes" : "Add application"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}