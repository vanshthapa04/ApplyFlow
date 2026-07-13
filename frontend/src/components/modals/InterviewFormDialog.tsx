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
  INTERVIEW_MODES,
  INTERVIEW_STATUSES,
  applications as mockApplications,
  type Application,
  type Interview,
  type InterviewMode,
  type InterviewStatus,
} from "@/lib/mock-data";

export type InterviewFormValues = Omit<Interview, "id">;

interface InterviewFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValue?: Interview | null;
  applications?: Application[];
  onSubmit?: (values: InterviewFormValues, id?: string) => void;
}

function defaults(apps: Application[]): InterviewFormValues {
  return {
    applicationId: apps[0]?.id ?? "",
    round: "",
    interviewerName: "",
    interviewDate: new Date().toISOString().slice(0, 16),
    mode: "Online",
    meetingLink: "",
    location: "",
    status: "Scheduled",
  };
}

// datetime-local inputs need `YYYY-MM-DDTHH:mm` (no seconds, no Z).
function toInputDateTime(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function InterviewFormDialog({
  open,
  onOpenChange,
  initialValue,
  applications = mockApplications,
  onSubmit,
}: InterviewFormDialogProps) {
  const isEdit = !!initialValue;
  const [values, setValues] = useState<InterviewFormValues>(() => defaults(applications));

  useEffect(() => {
    if (open) {
      setValues(
        initialValue
          ? { ...initialValue, interviewDate: toInputDateTime(initialValue.interviewDate) }
          : defaults(applications),
      );
    }
  }, [open, initialValue, applications]);

  const set = <K extends keyof InterviewFormValues>(k: K, v: InterviewFormValues[K]) =>
    setValues((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(values, initialValue?.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit interview" : "Schedule interview"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update the interview details." : "Schedule an interview for one of your applications."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2 sm:col-span-2">
              <Label>Application</Label>
              <Select value={values.applicationId} onValueChange={(v) => set("applicationId", v)}>
                <SelectTrigger className="h-10 rounded-xl"><SelectValue placeholder="Select an application" /></SelectTrigger>
                <SelectContent>
                  {applications.map((a) => (
                    <SelectItem key={a.id} value={a.id}>
                      {a.jobTitle} — {a.companyName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="i-round">Round</Label>
              <Input id="i-round" required value={values.round} onChange={(e) => set("round", e.target.value)} placeholder="System Design" className="h-10 rounded-xl" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="i-interviewer">Interviewer name</Label>
              <Input id="i-interviewer" value={values.interviewerName} onChange={(e) => set("interviewerName", e.target.value)} placeholder="Priya Menon" className="h-10 rounded-xl" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="i-date">Interview date</Label>
              <Input id="i-date" type="datetime-local" required value={values.interviewDate} onChange={(e) => set("interviewDate", e.target.value)} className="h-10 rounded-xl" />
            </div>
            <div className="grid gap-2">
              <Label>Mode</Label>
              <Select value={values.mode} onValueChange={(v) => set("mode", v as InterviewMode)}>
                <SelectTrigger className="h-10 rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {INTERVIEW_MODES.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            {values.mode === "Online" ? (
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="i-link">Meeting link</Label>
                <Input id="i-link" type="url" value={values.meetingLink} onChange={(e) => set("meetingLink", e.target.value)} placeholder="https://meet…" className="h-10 rounded-xl" />
              </div>
            ) : (
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="i-loc">Location</Label>
                <Input id="i-loc" value={values.location} onChange={(e) => set("location", e.target.value)} placeholder="Office address" className="h-10 rounded-xl" />
              </div>
            )}
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select value={values.status} onValueChange={(v) => set("status", v as InterviewStatus)}>
                <SelectTrigger className="h-10 rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {INTERVIEW_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-2">
            <Button type="button" variant="outline" className="rounded-xl" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="rounded-xl">{isEdit ? "Save changes" : "Schedule interview"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}