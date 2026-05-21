import {
  JenisHewan,
  JenisKelamin,
  StatusKehamilan,
} from "../generated/prisma/enums";

export interface KambingModel {
  kode_kambing: string;
  jenis_hewan: JenisHewan;
  beratAwal: number;
  beratAkhir: number;
  nama: string;
  jenis_kelamin: JenisKelamin;
  umur: number;
  tgl_lahir: Date;
  statusHamil: StatusKehamilan;
  tgl_masuk: Date;
  imageUrl: string;
  imageKey: string;
  userId?: string;
}
