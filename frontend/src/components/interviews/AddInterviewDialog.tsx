import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useCreateInterview,
  useUpdateInterview,
} from "@/hooks/useInterviews";

import { useApplications } from "@/hooks/useApplications";

import type { Application } from "@/types/application";

import type {
  Interview,
  InterviewMode,
  InterviewStatus,
} from "@/types/interview";

interface AddInterviewDialogProps {
  interview?: Interview;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function AddInterviewDialog({
  interview,
  open: controlledOpen,
  onOpenChange,
}: AddInterviewDialogProps) {
  const [open, setOpen] = useState(false);

  const isEdit = !!interview;

  const actualOpen =
    controlledOpen !== undefined ? controlledOpen : open;

  const setActualOpen = (value: boolean) => {
    if (onOpenChange) {
      onOpenChange(value);
    } else {
      setOpen(value);
    }
  };

  const { data: applicationsData } = useApplications();

  const createInterview = useCreateInterview();
  const updateInterview = useUpdateInterview();

  const applications: Application[] = applicationsData?.data ?? [];

  const [applicationId, setApplicationId] = useState("");
  const [round, setRound] = useState("");
  const [interviewerName, setInterviewerName] = useState("");
  const [interviewDate, setInterviewDate] = useState("");

  const [mode, setMode] =
    useState<InterviewMode>("Online");

  const [meetingLink, setMeetingLink] = useState("");
  const [location, setLocation] = useState("");

  const [status, setStatus] =
    useState<InterviewStatus>("Scheduled");

  /*
   * Load interview data when editing
   */
  useEffect(() => {
    if (!actualOpen) return;

    if (interview) {
      setApplicationId(interview.application_id);
      setRound(interview.round);

      setInterviewerName(
        interview.interviewer_name ?? ""
      );

      /*
       * IMPORTANT:
       *
       * Do NOT use:
       *
       * date.getTime() -
       * date.getTimezoneOffset() * 60000
       *
       * That was causing the selected time to shift.
       *
       * datetime-local expects:
       * YYYY-MM-DDTHH:mm
       */

      const date = new Date(interview.interview_date);

      const year = date.getFullYear();
      const month = String(
        date.getMonth() + 1
      ).padStart(2, "0");

      const day = String(
        date.getDate()
      ).padStart(2, "0");

      const hours = String(
        date.getHours()
      ).padStart(2, "0");

      const minutes = String(
        date.getMinutes()
      ).padStart(2, "0");

      const formatted =
        `${year}-${month}-${day}T${hours}:${minutes}`;

      setInterviewDate(formatted);

      setMode(interview.mode);

      setMeetingLink(
        interview.meeting_link ?? ""
      );

      setLocation(
        interview.location ?? ""
      );

      setStatus(interview.status);
    } else {
      resetForm();
    }
  }, [interview, actualOpen]);

  function resetForm() {
    setApplicationId("");
    setRound("");
    setInterviewerName("");
    setInterviewDate("");
    setMode("Online");
    setMeetingLink("");
    setLocation("");
    setStatus("Scheduled");
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!applicationId) {
      toast.error(
        "Please select an application."
      );
      return;
    }

    if (!round.trim()) {
      toast.error(
        "Please enter the interview round."
      );
      return;
    }

    if (!interviewDate) {
      toast.error(
        "Please select an interview date."
      );
      return;
    }

    /*
     * IMPORTANT:
     *
     * interviewDate comes directly from:
     *
     * <input type="datetime-local">
     *
     * Example:
     * 2026-08-15T15:30
     *
     * We send this exact value.
     *
     * DO NOT use:
     * new Date(interviewDate).toISOString()
     *
     * because that converts the local time to UTC.
     */

    const payload = {
      applicationId,
      round: round.trim(),

      interviewerName:
        interviewerName.trim() || undefined,

      interviewDate: interviewDate,

      mode,

      meetingLink:
        meetingLink.trim() || undefined,

      location:
        location.trim() || undefined,

      status,
    };

    console.log(
      "INTERVIEW PAYLOAD:",
      payload
    );

    try {
      if (isEdit && interview) {
        await updateInterview.mutateAsync({
          id: interview.id,
          data: payload,
        });

        toast.success(
          "Interview updated successfully!"
        );
      } else {
        await createInterview.mutateAsync(
          payload
        );

        toast.success(
          "Interview scheduled successfully!"
        );
      }

      setActualOpen(false);
      resetForm();

    } catch (error: any) {
      console.error(
        "INTERVIEW ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ??
          "Something went wrong."
      );
    }
  }

  const isSubmitting =
    createInterview.isPending ||
    updateInterview.isPending;

  return (
    <Dialog
      open={actualOpen}
      onOpenChange={setActualOpen}
    >
      {!isEdit && (
        <DialogTrigger
          render={
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Schedule Interview
            </Button>
          }
        />
      )}

      <DialogContent className="max-w-lg">

        <DialogHeader>
          <DialogTitle>
            {isEdit
              ? "Edit Interview"
              : "Schedule Interview"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Application */}

          <div className="space-y-2">

            <Label>
              Application
            </Label>

            <Select
              value={applicationId}
              onValueChange={(value) =>
                setApplicationId(value ?? "")
              }
            >

              <SelectTrigger>
                <SelectValue
                  placeholder="Select application"
                />
              </SelectTrigger>

              <SelectContent>

                {applications.map(
                  (application: Application) => (
                    <SelectItem
                      key={application.id}
                      value={application.id}
                    >
                      {application.company_name ??
                        "Unknown Company"}{" "}
                      — {application.job_title}
                    </SelectItem>
                  )
                )}

              </SelectContent>

            </Select>

          </div>

          {/* Round */}

          <div className="space-y-2">

            <Label htmlFor="round">
              Interview Round
            </Label>

            <Input
              id="round"
              placeholder="e.g. Technical Round"
              value={round}
              onChange={(e) =>
                setRound(e.target.value)
              }
            />

          </div>

          {/* Interviewer */}

          <div className="space-y-2">

            <Label htmlFor="interviewer">
              Interviewer Name
            </Label>

            <Input
              id="interviewer"
              placeholder="e.g. Rahul Sharma"
              value={interviewerName}
              onChange={(e) =>
                setInterviewerName(
                  e.target.value
                )
              }
            />

          </div>

          {/* Date & Time */}

          <div className="space-y-2">

            <Label htmlFor="interviewDate">
              Date & Time
            </Label>

            <Input
              id="interviewDate"
              type="datetime-local"
              value={interviewDate}
              onChange={(e) =>
                setInterviewDate(
                  e.target.value
                )
              }
            />

          </div>

          {/* Mode */}

          <div className="space-y-2">

            <Label>
              Interview Mode
            </Label>

            <Select
              value={mode}
              onValueChange={(value) =>
                setMode(
                  (value ??
                    "Online") as InterviewMode
                )
              }
            >

              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>

                <SelectItem value="Online">
                  Online
                </SelectItem>

                <SelectItem value="Offline">
                  Offline
                </SelectItem>

              </SelectContent>

            </Select>

          </div>

          {/* Online */}

          {mode === "Online" && (
            <div className="space-y-2">

              <Label htmlFor="meetingLink">
                Meeting Link
              </Label>

              <Input
                id="meetingLink"
                placeholder="https://meet.google.com/..."
                value={meetingLink}
                onChange={(e) =>
                  setMeetingLink(
                    e.target.value
                  )
                }
              />

            </div>
          )}

          {/* Offline */}

          {mode === "Offline" && (
            <div className="space-y-2">

              <Label htmlFor="location">
                Location
              </Label>

              <Input
                id="location"
                placeholder="e.g. Mumbai Office"
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
              />

            </div>
          )}

          {/* Status */}

          <div className="space-y-2">

            <Label>
              Status
            </Label>

            <Select
              value={status}
              onValueChange={(value) =>
                setStatus(
                  (value ??
                    "Scheduled") as InterviewStatus
                )
              }
            >

              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>

                <SelectItem value="Scheduled">
                  Scheduled
                </SelectItem>

                <SelectItem value="Completed">
                  Completed
                </SelectItem>

                <SelectItem value="Cancelled">
                  Cancelled
                </SelectItem>

                <SelectItem value="Rescheduled">
                  Rescheduled
                </SelectItem>

              </SelectContent>

            </Select>

          </div>

          {/* Actions */}

          <div className="flex justify-end gap-3 pt-2">

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setActualOpen(false)
              }
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : isEdit
                ? "Update Interview"
                : "Schedule Interview"}
            </Button>

          </div>

        </form>

      </DialogContent>

    </Dialog>
  );
}