import { z } from "zod";

export const createCompanySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Company name is required"),

  website: z
    .string()
    .trim()
    .optional(),

  industry: z
    .string()
    .trim()
    .optional(),

  location: z
    .string()
    .trim()
    .optional(),
});

export const updateCompanySchema = createCompanySchema.partial();