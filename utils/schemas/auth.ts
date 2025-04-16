import { z } from "zod";

export const signUpSchema = z.object({
  email: z
    .string()
    .email("Must be a valid email address"),
  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Za-z]/, "Must include at least one letter")
    .regex(/\d/,       "Must include at least one number")
    .regex(
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
      "Must include at least one special character"
    ),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
