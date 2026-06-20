import { Kandang, Sekat } from "../generated/prisma/client";
import { KeteranganSekat } from "../generated/prisma/enums";

// Untuk server backend/services
export interface CreateKandangInput {
  nama: string;
}

export interface CreateSekatInput {
  kodeSekat: string;
  keteranganSekat: KeteranganSekat;
  kandangId: string;
}

export interface KandangWithSekat extends Kandang {
  sekatList: Sekat[];
}

export interface SekatWithKandang extends Sekat {
  kandang: Kandang;
}

// Untuk frontend/hook
export interface CreateSekatPayload {
  kodeSekat: string;
  keteranganSekat: "INDIVIDU" | "KOLONI";
  kandangId: string;
}
