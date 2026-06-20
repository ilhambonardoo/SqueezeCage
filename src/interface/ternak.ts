import { Ternak } from "../generated/prisma/client";
import {
  JenisHewan,
  JenisKelamin,
  ProgramTernak,
  StatusKehamilan,
} from "../generated/prisma/enums";

// Model Ternak model ini untuk keperluan Form/Input Data
export interface TernakModel {
  kode_hewan: string;
  jenis_hewan: JenisHewan;
  beratAwal: number;
  beratAkhir: number;
  nama: string;
  jenis_kelamin: JenisKelamin | null;
  umur: number;
  tgl_lahir: Date | null;
  statusHamil: StatusKehamilan | null;
  tgl_masuk?: Date;
  imageUrl?: string | null;
  imageKey?: string | null;
  userId?: string | null;
  sekatId: string | null;
  programTernak?: ProgramTernak | null;
  sekat?: {
    id: string;
    kodeSekat: string;
    keteranganSekat: string | null;
    kandangId: string;
    kandang?: {
      id: string;
      nama: string;
    };
  } | null;
}

// Model Ternak With Relasi untuk keperluan tampilan/read only data
export interface TernakWithRelasi extends Omit<
  TernakModel,
  "tgl_masuk" | "tgl_lahir"
> {
  id: string;
  tgl_masuk: Date | string;
  tgl_lahir: Date | string | null;
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
  kandangList: {
    id: string;
    nama: string;
    sekatList: {
      id: string;
      kodeSekat: string;
      keteranganSekat: string;
    }[];
  }[];
}

export interface StatsData {
  total: number;
  jantan: number;
  betina: number;
  domba: number;
  kambing: number;
}
