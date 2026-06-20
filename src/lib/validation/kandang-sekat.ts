import { KeteranganSekat } from "@/src/generated/prisma/enums";
import z from "zod";

export class KandangSekatValidation {
  static readonly KandangSchema = z.object({
    nama: z
      .string()
      .min(1, "Nama kandang wajib diisi")
      .max(50, "Nama terlalu panjang"),
  });

  static readonly SekatSchema = z.object({
    kodeSekat: z.string().min(2, "Kode sekat minimal 2 karakter"),
    keteranganSekat: z.preprocess((val) => {
      if (typeof val === "string") return val.trim().toUpperCase();
      return val;
    }, z.nativeEnum(KeteranganSekat)),
    kandangId: z.string(),
  });
}
