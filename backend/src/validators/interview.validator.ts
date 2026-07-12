import { z } from "zod";

export const createInterviewSchema = z.object({
  applicationId: z
    .string()
    .uuid("Invalid application id"),

  round: z
    .string()
    .trim()
    .min(2, "Interview round is required"),

  interviewerName: z
    .string()
    .trim()
    .optional(),

  interviewDate: z.coerce.date(),

  mode: z.enum([
    "Online",
    "Offline",
  ]),

  meetingLink: z
    .string()
    .url("Invalid meeting link")
    .optional(),

  location: z
    .string()
    .trim()
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