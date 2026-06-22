import {
  JenisHewan,
  JenisKelamin,
  ProgramTernak,
  StatusKehamilan,
  StatusMenyusui,
} from "@/src/generated/prisma/client";
import { z } from "zod";

export class TernakValidation {
  static readonly CREATE = z.object({
    nama: z.string().min(1, "Nama wajib diisi"),
    kode_hewan: z.string().min(1, "Kode hewan wajib diisi"),
    beratAwal: z.number().nonnegative("Berat tidak boleh negatif"),
    beratAkhir: z.number().nonnegative("Berat tidak boleh negatif"),
    umur: z.number().int().nonnegative(),
    tgl_lahir: z.coerce.date().nullable().optional(),
    jenis_kelamin: z.enum(Object.values(JenisKelamin) as [string, ...string[]]),
    jenis_hewan: z.enum(Object.values(JenisHewan) as [string, ...string[]]),
    statusHamil: z
      .enum(Object.values(StatusKehamilan) as [string, ...string[]])
      .nullable()
      .optional(),
    programTernak: z
      .enum(Object.values(ProgramTernak) as [string, ...string[]])
      .optional()
      .nullable(),
    statusMenyusui: z
      .enum(Object.values(StatusMenyusui) as [string, ...string[]])
      .optional()
      .nullable(),
    tgl_masuk: z.coerce.date().optional(),
    userId: z.string().min(1, "ID user tidak valid"),
    imageUrl: z
      .string()
      .url("URL gambar tidak valid")
      .optional()
      .or(z.literal(""))
      .nullable(),
    imageKey: z.string().optional().or(z.literal("")),
    sekatId: z.string().optional().or(z.literal("")).nullable(),
  });

  static readonly UPDATE = TernakValidation.CREATE.partial();
}
