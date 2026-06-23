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
    <div className="p-6 md:p-8 text-neutral-900 dark:text-white max-w-5xl mx-auto flex flex-col gap-6 min-h-screen transition-colors duration-300">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Analisis & Prediksi Bobot Ternak
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Pilih ID/Kode hewan ternak untuk melihat metrik kesehatan, klasifikasi
          tubuh, dan proyeksi berat badan dari Machine Learning.
        </p>
      </div>

      {/* DROPDOWN KODE HEWAN */}
      <div className="bg-neutral-100/70 dark:bg-neutral-900/50 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800/80 max-w-md transition-colors duration-300">
        <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400 block mb-2">
          Pilih Kode/Tag Hewan Ternak
        </label>
        <div className="relative flex items-center">
          <select
            value={selectedTernakId}
            onChange={(e) => setSelectedTernakId(e.target.value)}
            className="w-full h-12 pl-4 pr-10 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-transparent text-neutral-800 dark:text-neutral-200 outline-none focus:ring-2 focus:ring-amber-500/50 text-sm appearance-none cursor-pointer transition-all"
          >
            <option
              className="bg-white text-neutral-800 dark:bg-neutral-900 dark:text-white"
              value=""
            >
              -- Pilih Kode Hewan --
            </option>
            {dataTernak.map((t) => (
              <option
                className="bg-white text-neutral-800 dark:bg-neutral-900 dark:text-white"
                key={t.id}
                value={t.id}
              >
                {t.kode_hewan} - {t.nama}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 text-neutral-500 dark:text-neutral-400 pointer-events-none w-4 h-4" />
        </div>
      </div>

      {/* LOADING */}
      {isLoading && (
        <div className="text-amber-600 dark:text-amber-500 animate-pulse text-sm font-medium">
          Sedang menghitung proyeksi pertumbuhan...
        </div>
      )}

      <HasilBobot isLoading={isLoading} dataBobot={dataBobot} />
    </div>
  );
}
