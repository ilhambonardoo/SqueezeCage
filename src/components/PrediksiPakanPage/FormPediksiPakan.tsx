"use client";

import { useState, useMemo, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { KandangWithSekat } from "@/src/interface/kandang-sekat";
import HasilPakan from "./HasilPakan";
import { useMachine } from "@/src/hooks/useMachine";

export default function PrediksiPakanPage() {
  const [kandangList, setKandangList] = useState<KandangWithSekat[]>([]);
  const [selectedKandangId, setSelectedKandangId] = useState("");
  const [selectedSekatId, setSelectedSekatId] = useState("");

  const { dataPrediksi, isLoading, getDataPakan } = useMachine();

  useEffect(() => {
    async function fetchKandangDanSekat() {
      try {
        const res = await fetch("/api/kandang");
        const data = await res.json();
        setKandangList(data);
      } catch (error) {
        console.error("Gagal memuat data kandang:", error);
        toast.error("Gagal mengambil data master kandang");
      }
    }
    fetchKandangDanSekat();
  }, []);

  useEffect(() => {
    if (selectedSekatId) {
      getDataPakan(selectedSekatId);
    }
  }, [selectedSekatId, getDataPakan]);

  const sekatTersaring = useMemo(() => {
    if (!selectedKandangId) return [];
    const kandangTerpilih = kandangList.find((k) => k.id === selectedKandangId);
    return kandangTerpilih?.sekatList || [];
  }, [selectedKandangId, kandangList]);

  // Reusable Tailwind classes biar konsisten dengan UI gelap Anda
  const selectWrapperClass = "relative w-full flex items-center";
  const selectClass =
    "w-full h-12 pl-4 pr-10 rounded-xl border border-neutral-800 bg-transparent text-neutral-200 outline-none focus:ring-2 focus:ring-amber-500/50 transition-all text-sm appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";
  const selectIconClass =
    "absolute right-3 text-neutral-400 pointer-events-none w-4 h-4";
  const optionClass = "bg-neutral-900 text-white";

  return (
    <div className="p-6 md:p-8 text-white max-w-5xl mx-auto flex flex-col gap-6 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Prediksi Kebutuhan Pakan
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Pilih lokasi area kandang dan nomor petak sekat untuk melihat
          akumulasi kebutuhan target hijauan dan konsentrat dari AI.
        </p>
      </div>

      {/* FILTER DROPDOWN AREA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800/80 shadow-sm">
        {/* PILIHAN KANDANG */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-400">
            Gedung Kandang Induk
          </label>
          <div className={selectWrapperClass}>
            <select
              value={selectedKandangId}
              onChange={(e) => {
                setSelectedKandangId(e.target.value);
                setSelectedSekatId(""); // Reset sekat jika kandang berubah
              }}
              className={selectClass}
            >
              <option className={optionClass} value="">
                -- Pilih Bangunan Kandang --
              </option>
              {kandangList.map((kandang) => (
                <option
                  className={optionClass}
                  key={kandang.id}
                  value={kandang.id}
                >
                  {kandang.nama}
                </option>
              ))}
            </select>
            <ChevronDown className={selectIconClass} />
          </div>
        </div>

        {/* PILIHAN SEKAT */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-400">
            Nomor / Kode Sekat Ruangan
          </label>
          <div className={selectWrapperClass}>
            <select
              value={selectedSekatId}
              onChange={(e) => {
                setSelectedSekatId(e.target.value);
              }}
              disabled={!selectedKandangId}
              className={selectClass}
            >
              <option className={optionClass} value="">
                -- Pilih Petak Sekat --
              </option>
              {sekatTersaring.map((sekat) => (
                <option className={optionClass} key={sekat.id} value={sekat.id}>
                  {sekat.kodeSekat} ({sekat.keteranganSekat})
                </option>
              ))}
            </select>
            <ChevronDown className={selectIconClass} />
          </div>
        </div>
      </div>

      {/* LOADING STATE */}
      {isLoading && (
        <div className="flex items-center gap-3 text-amber-500 bg-amber-950/20 border border-amber-900/30 p-4 rounded-xl justify-center animate-pulse">
          <div className="animate-spin rounded-full w-5 h-5 border-2 border-amber-500/30 border-t-amber-500" />
          <span className="text-sm font-medium">
            Model Machine Learning sedang menghitung pakan sekat...
          </span>
        </div>
      )}

      <HasilPakan dataPrediksi={dataPrediksi} isLoading={isLoading} />
    </div>
  );
}
