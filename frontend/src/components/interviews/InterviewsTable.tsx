import { useState } from "react";
import {
  CalendarDays,
  Clock,
  ExternalLink,
  MapPin,
  MoreHorizontal,
  Pencil,
  Trash2,
  UserRound,
  Video,
} from "lucide-react";

import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

import { useDeleteInterview } from "@/hooks/useInterviews";

import AddInterviewDialog from "./AddInterviewDialog";

import type { Interview } from "@/types/interview";

interface InterviewsTableProps {
  interviews: Interview[];
}

export default function InterviewsTable({
  interviews,
}: InterviewsTableProps) {
  const [selectedInterview, setSelectedInterview] =
    useState<Interview | null>(null);

  const [deleteId, setDeleteId] =
    useState<string | null>(null);

  const deleteInterview = useDeleteInterview();

  /*
   * IMPORTANT:
   * PostgreSQL stores interview_date as:
   *
   * timestamp without time zone
   *
   * Therefore, we should NOT convert it between
   * UTC and local time here.
   *
   * The backend returns something like:
   * 2026-08-12T15:30:00
   *
   * We want to display exactly:
   * 3:30 PM
   */

  function parseLocalDate(date: Date | string) {
    if (date instanceof Date) {
      return date;
    }

    // Remove timezone information if the backend
    // happens to return it.
    const cleanDate = date.replace(/Z$/, "");

    return new Date(cleanDate);
  }

  function formatDate(date: Date | string) {
    const parsedDate = parseLocalDate(date);

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function formatTime(date: Date | string) {
    const parsedDate = parseLocalDate(date);

    return parsedDate.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  async function handleDelete() {
    if (!deleteId) return;

    try {
      await deleteInterview.mutateAsync(deleteId);

      toast.success(
        "Interview deleted successfully."
      );

      setDeleteId(null);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to delete interview."
      );
    }
  }

  function statusClass(status: string) {
    switch (status) {
      case "Scheduled":
        return "bg-blue-50 text-blue-700";

      case "Completed":
        return "bg-green-50 text-green-700";

      case "Cancelled":
        return "bg-red-50 text-red-700";

      case "Rescheduled":
        return "bg-orange-50 text-orange-700";

      default:
        return "bg-slate-50 text-slate-700";
    }
  }

  if (!interviews.length) {
    return (
      <div className="rounded-xl border bg-white p-12 text-center">
        <CalendarDays className="mx-auto mb-4 h-10 w-10 text-slate-400" />

        <h3 className="text-lg font-semibold">
          No interviews yet
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Schedule your first interview to start
          tracking your interview journey.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Interview
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Date & Time
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Mode
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {interviews.map((interview) => (
                <tr
                  key={interview.id}
                  className="transition hover:bg-slate-50"
                >
                  {/* Interview */}

                  <td className="px-6 py-5">
                    <div className="font-semibold">
                      {interview.round}
                    </div>

                    {interview.interviewer_name && (
                      <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                        <UserRound className="h-3.5 w-3.5" />

                        {interview.interviewer_name}
                      </div>
                    )}

                    <div className="mt-1 text-xs text-slate-400">
                      Application ID:{" "}
                      {interview.application_id.slice(
                        0,
                        8
                      )}
                      ...
                    </div>
                  </td>

                  {/* Date & Time */}

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarDays className="h-4 w-4 text-slate-400" />

                      {formatDate(
                        interview.interview_date
                      )}
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                      <Clock className="h-4 w-4" />

                      {formatTime(
                        interview.interview_date
                      )}
                    </div>
                  </td>

                  {/* Mode */}

                  <td className="px-6 py-5">
                    {interview.mode === "Online" ? (
                      <div>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Video className="h-4 w-4 text-blue-600" />

                          Online
                        </div>

                        {interview.meeting_link && (
                          <a
                            href={
                              interview.meeting_link
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 flex items-center gap-1 text-xs text-blue-600 hover:underline"
                          >
                            Join meeting

                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <MapPin className="h-4 w-4 text-orange-600" />

                          Offline
                        </div>

                        {interview.location && (
                          <div className="mt-1 text-xs text-slate-500">
                            {interview.location}
                          </div>
                        )}
                      </div>
                    )}
                  </td>

                  {/* Status */}

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                        interview.status
                      )}`}
                    >
                      {interview.status}
                    </span>
                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            setSelectedInterview(
                              interview
                            )
                          }
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() =>
                            setDeleteId(interview.id)
                          }
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Dialog */}

      {selectedInterview && (
        <AddInterviewDialog
          interview={selectedInterview}
          open={true}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedInterview(null);
            }
          }}
        />
      )}

      {/* Delete Confirmation */}

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteId(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete interview?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. The
              interview will be permanently removed
              from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteInterview.isPending
                ? "Deleting..."
                : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}