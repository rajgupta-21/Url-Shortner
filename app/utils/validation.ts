import z from "zod";

export const UserValidation = z.object({
  updatedName: z
    .string()
    .min(1, "Name is required")
    .regex(/^[\p{L}]+([\p{L}'-][\p{L}]+)*$/u),

  updatedEmail: z.string().email("Invalid email format"),

  userId: z.string().min(1, "User ID is required"),
});
