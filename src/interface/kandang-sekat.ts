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

export interface SekatPayload {
  kodeSekat: string;
  keteranganSekat: "INDIVIDU" | "KOLONI";
  kandangId: string;
}

export interface EditKandangModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (namaBaru: string) => Promise<{ success: boolean }>;
  currentName: string;
  isSubmitting: boolean;
}

export interface EditSekatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: {
    kodeSekat: string;
    keteranganSekat: "INDIVIDU" | "KOLONI";
    kandangId: string;
  }) => Promise<boolean | void>;
  isSubmitting: boolean;
  dataKandang: Array<{ id: string; nama: string }>;
  initialData: {
    kodeSekat: string;
    keteranganSekat: "INDIVIDU" | "KOLONI";
    kandangId: string;
  } | null;
}
