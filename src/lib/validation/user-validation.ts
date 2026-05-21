import { Role } from "@/src/generated/prisma/client";
import { z, type ZodType } from "zod";

export class UserValidation {
  static readonly CREATE: ZodType = z.object({
    nama: z
      .string()
      .min(3, { message: "Nama minimal 3 karakter" })
      .max(255, { message: "Nama maksimal 255 karakter" }),
    username: z
      .string()
      .min(3, { message: "Username minimal 3 karakter" })
      .max(50, { message: "Username maksimal 50 karakter" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username hanya boleh mengandung huruf, angka, dan underscore",
      }),
    email: z.string().email({ message: "Format email tidak valid" }),
    password: z.string().min(6, { message: "Password minimal 6 karakter" }),
    role: z.nativeEnum(Role),
  });

  static readonly UPDATE: ZodType = z.object({
    nama: z
      .string()
      .min(3, { message: "Nama minimal 3 karakter" })
      .max(255, { message: "Nama maksimal 255 karakter" })
      .optional(),
    username: z
      .string()
      .min(3, { message: "Username minimal 3 karakter" })
      .max(50, { message: "Username maksimal 50 karakter" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username hanya boleh mengandung huruf, angka, dan underscore",
      })
      .optional(),
    email: z.string().email({ message: "Format email tidak valid" }).optional(),
    password: z
      .string()
      .min(6, { message: "Password minimal 6 karakter" })
      .optional()
      .or(z.literal("")),
    role: z.nativeEnum(Role).optional(),
  });
}
