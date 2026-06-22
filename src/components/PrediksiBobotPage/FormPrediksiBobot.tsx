"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import { useTernak } from "@/src/hooks/useTernak";
import HasilBobot from "./HasilBobot";
import { useMachine } from "@/src/hooks/useMachine";

export default function PrediksiBobotPage() {
  const { dataTernak } = useTernak();
  const { dataBobot, isLoading, getDataBobot } = useMachine();
  const [selectedTernakId, setSelectedTernakId] = useState("");

  useEffect(() => {
    getDataBobot(selectedTernakId);
  }, [selectedTernakId, getDataBobot]);

  return (
    <div className="p-6 md:p-8 text-white max-w-5xl mx-auto flex flex-col gap-6 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Analisis & Prediksi Bobot Ternak
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Pilih ID/Kode hewan ternak untuk melihat metrik kesehatan, klasifikasi
          tubuh, dan proyeksi berat badan dari Machine Learning.
        </p>
      </div>

      {/* DROPDOWN KODE HEWAN */}
      <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800/80 max-w-md">
        <label className="text-sm font-medium text-neutral-400 block mb-2">
          Pilih Kode/Tag Hewan Ternak
        </label>
        <div className="relative flex items-center">
          <select
            value={selectedTernakId}
            onChange={(e) => setSelectedTernakId(e.target.value)}
            className="w-full h-12 pl-4 pr-10 rounded-xl border border-neutral-800 bg-transparent text-neutral-200 outline-none focus:ring-2 focus:ring-amber-500/50 text-sm appearance-none cursor-pointer"
          >
            <option className="bg-neutral-900" value="">
              -- Pilih Kode Hewan --
            </option>
            {dataTernak.map((t) => (
              <option className="bg-neutral-900" key={t.id} value={t.id}>
                {t.kode_hewan} - {t.nama}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 text-neutral-400 pointer-events-none w-4 h-4" />
        </div>
      </div>

      {/* LOADING */}
      {isLoading && (
        <div className="text-amber-500 animate-pulse text-sm">
          Sedangkan menghitung proyeksi pertumbuhan...
        </div>
      )}

      <HasilBobot isLoading={isLoading} dataBobot={dataBobot} />
    </div>
  );
}
