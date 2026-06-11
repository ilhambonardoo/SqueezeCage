import { Ternak } from "../generated/prisma/client";
import {
  JenisHewan,
  JenisKelamin,
  StatusKehamilan,
} from "../generated/prisma/enums";

export interface TernakModel {
  kode_hewan: string;
  jenis_hewan: JenisHewan;
  beratAwal: number;
  beratAkhir: number;
  nama: string;
  jenis_kelamin: JenisKelamin;
  umur: number;
  tgl_lahir: Date | null;
  statusHamil: StatusKehamilan | null;
  tgl_masuk?: Date;
  imageUrl?: string | null;
  imageKey?: string | null;
  userId?: string | null;
}

export interface TernakFormProps {
  initialData?: TernakModel | null;
  onSubmit: (
    data: Ternak,
    file: File | null,
    isImageRemoved: boolean,
  ) => Promise<void>;
  isSubmitting: boolean;
  submitLabel: string;
}

export interface StatsData {
  total: number;
  jantan: number;
  betina: number;
  domba: number;
  kambing: number;
}
