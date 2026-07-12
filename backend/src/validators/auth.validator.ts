import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters"),

  email: z
    .email("Invalid email address")
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z
    .email("Invalid email address")
    .trim()
    .toLowerCase(),

  password: z.string().min(6),
});