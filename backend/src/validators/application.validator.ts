import { z } from "zod";

export const createApplicationSchema = z.object({
  companyId: z.string().uuid("Invalid company id"),

  jobTitle: z
    .string()
    .trim()
    .min(2, "Job title is required"),

  jobType: z.string().trim().optional(),

  location: z.string().trim().optional(),

  salary: z.number().positive().optional(),

  applicationDate: z.coerce.date().optional(),

  status: z
    .enum([
      "Applied",
      "Interview",
      "Offer",
      "Rejected",
      "Hired",
    ])
    .optional(),

  jobUrl: z.string().url().optional(),
});

export const updateApplicationSchema =
  createApplicationSchema.partial();