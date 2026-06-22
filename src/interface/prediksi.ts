import { JenisHewan } from "../generated/prisma/enums";

// Untuk pakan
export interface HewanPrediksiItem {
  kode_hewan: string;
  nama: string;
  jenis_hewan: JenisHewan;
  status_fisiologi: "Hamil" | "Menyusui" | "Pertumbuhan" | "Dewasa Maintanance";
  target_hijauan: number;
  target_konsentrat: number;
}

export interface PrediksiPakan {
  status: "success" | "error";
  daftarHewan: HewanPrediksiItem[];
  totalHijauan: number;
  totalKonsentrat: number;
  message?: string;
}

// Untuk bobot
export interface TrenGrafikItem {
  bulan: string;
  bobot: number;
}

export interface DetailTernakBobot {
  kode_hewan: string;
  nama: string;
  beratAkhir: number;
  umur: number;
}

export interface PrediksiBobot {
  bobotBulanDepan: number;
  klasifikasi: "Ideal" | "Terlalu Kurus" | "Terlalu Gendut (Obesitas)";
  butuhPerhatian: boolean;
  pesanNotifikasi: string;
}

export interface PrediksiBobotResponse {
  status: "success" | "error";
  message?: string;
  detailTernak: DetailTernakBobot;
  prediksi: PrediksiBobot;
  trenGrafik: TrenGrafikItem[];
}
