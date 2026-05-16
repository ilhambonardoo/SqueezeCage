import {
  JenisHewan,
  JenisKelamin,
  StatusKehamilan,
} from "@/src/generated/prisma/client";
import { z, type ZodType } from "zod";

export class KambingValidation {
  static readonly CREATE: ZodType = z.object({
    kode_kambing: z.string().min(1, "Kode kambing wajib diisi"),
    jenis_hewan: z.nativeEnum(JenisHewan),
    beratAwal: z.number().positive("Berat harus angka positif"),
    beratAkhir: z.number().positive("Berat harus angka positif"),
    jenis_kelamin: z.nativeEnum(JenisKelamin),
    umur: z.number().int().nonnegative(),
    tgl_lahir: z.coerce.date(),
    statusHamil: z.nativeEnum(StatusKehamilan),
    tgl_masuk: z.coerce.date(),
    userId: z.string().min(1, "ID user tidak valid"),
    imageUrl: z
      .string()
      .url("URL gambar tidak valid")
      .optional()
      .or(z.literal("")),
    imageKey: z.string().optional().or(z.literal("")),
  });

  static readonly UPDATE: ZodType = z.object({
    kode_kambing: z.string().min(1, "Kode kambing wajib diisi").optional(),
    jenis_hewan: z.nativeEnum(JenisHewan).optional(),
    beratAwal: z.number().positive("Berat harus angka positif").optional(),
    beratAkhir: z.number().positive("Berat harus angka positif").optional(),
    jenis_kelamin: z.nativeEnum(JenisKelamin).optional(),
    umur: z.number().int().nonnegative().optional(),
    tgl_lahir: z.coerce.date().optional(),
    statusHamil: z.nativeEnum(StatusKehamilan).optional(),
    tgl_masuk: z.coerce.date().optional(),
    userId: z.string().min(1, "ID user tidak valid").optional(),
    imageUrl: z
      .string()
      .url("URL gambar tidak valid")
      .optional()
      .or(z.literal("")),
    imageKey: z.string().optional().or(z.literal("")),
  });
}
