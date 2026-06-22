"use client";

import { AlertTriangle, TrendingUp, Info } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PrediksiBobotResponse } from "@/src/interface/prediksi";

interface HasilBobotProps {
  dataBobot?: PrediksiBobotResponse;
  isLoading: boolean;
}

const HasilBobot = ({ dataBobot, isLoading }: HasilBobotProps) => {
  return (
    <>
      {/* HASIL KELUARAN */}
      {dataBobot && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
          {/* CARD UTAMA: PREDIKSI BULAN DEPAN */}
          <div className="bg-neutral-900/40 border border-neutral-800 p-6 rounded-2xl md:col-span-1 flex flex-col justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1">
                PREDIKSI BERAT
              </span>
              {/* BOBOT SEKARANG */}
              <h2 className="text-sm text-neutral-300 mt-3">
                Bobot sekarang mencapai :
              </h2>
              <p className="text-4xl font-extrabold text-amber-400 mt-1">
                {dataBobot.detailTernak.beratAkhir}
                <span className="text-lg font-normal text-neutral-400">Kg</span>
              </p>
              {/* BOBOT PREDIKSI */}
              <h2 className="text-sm text-neutral-300 mt-3">
                Perkiraan bobot bulan depan akan mencapai:
              </h2>
              <p className="text-4xl font-extrabold text-amber-400 mt-1">
                {dataBobot.prediksi.bobotBulanDepan}{" "}
                <span className="text-lg font-normal text-neutral-400">Kg</span>
              </p>
            </div>

            {/* STATUS KLASIFIKASI */}
            <div className="pt-4 border-t border-neutral-800">
              <span className="text-xs text-neutral-400 block">
                Klasifikasi Kondisi Tubuh:
              </span>
              <span
                className={`text-lg font-bold inline-block mt-1 px-3 py-1 rounded-lg ${
                  dataBobot.prediksi.klasifikasi === "Ideal"
                    ? "bg-emerald-950/40 text-emerald-400 border border-emerald-900"
                    : "bg-red-950/40 text-red-400 border border-red-900"
                }`}
              >
                {dataBobot.prediksi.klasifikasi}
              </span>
            </div>
          </div>

          {/* CARD NOTIFIKASI OPERATOR */}
          <div className="bg-neutral-900/40 border border-neutral-800 p-6 rounded-2xl md:col-span-2 flex flex-col gap-4">
            <h3 className="text-base font-semibold text-neutral-200 flex items-center gap-2">
              <Info size={18} className="text-blue-400" /> Pusat Kendali
              Kesehatan Ternak
            </h3>

            {dataBobot.prediksi.butuhPerhatian ? (
              <div className="bg-red-950/30 border border-red-900/50 p-4 rounded-xl flex gap-3 text-red-400 text-sm">
                <AlertTriangle className="shrink-0 mt-0.5" size={18} />
                <p className="font-medium">
                  {dataBobot.prediksi.pesanNotifikasi}
                </p>
              </div>
            ) : (
              <div className="bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-xl text-emerald-400 text-sm">
                ✅ Ternak dalam kondisi prima dan pertumbuhan terpantau stabil
                sesuai standar kurva.
              </div>
            )}

            {/* GRAFIK TREN */}
            <div className="mt-2 flex-1 min-h-45">
              <span className="text-xs text-neutral-400 mb-2 block items-center gap-1">
                <TrendingUp size={14} /> Grafik Tren & Riwayat Pertumbuhan (Kg)
              </span>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={dataBobot.trenGrafik}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                  <XAxis dataKey="bulan" stroke="#737373" fontSize={11} />
                  <YAxis stroke="#737373" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#171717",
                      borderColor: "#404040",
                      color: "#fff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="bobot"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HasilBobot;
