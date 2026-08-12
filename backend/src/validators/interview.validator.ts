import { z } from "zod";

export const createInterviewSchema = z.object({
  applicationId: z.string().uuid(),

  round: z
    .string()
    .min(1, "Interview round is required"),

  interviewerName: z
    .string()
    .optional(),

  interviewDate: z
    .string()
    .min(1, "Interview date is required"),

  mode: z.enum(["Online", "Offline"]),

  meetingLink: z
    .string()
    .optional(),

  location: z
    .string()
    .optional(),

  status: z
    .enum([
      "Scheduled",
      "Completed",
      "Cancelled",
      "Rescheduled",
    ])
    .optional(),
});

export const updateInterviewSchema =
  createInterviewSchema.partial();