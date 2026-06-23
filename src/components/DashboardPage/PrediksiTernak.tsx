"use client";

import { useMounted } from "@/src/hooks/useMounted";
import { useEffect, useState } from "react";
import { GiGoat, GiSheep } from "react-icons/gi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface AnimalStats {
  total: number;
  rata_rata_berat: number;
  prediksi_bobot_total: number;
}

interface DashboardData {
  KAMBING: AnimalStats;
  DOMBA: AnimalStats;
}

interface ChartItem {
  tanggal: string;
  berat: number;
  jenis: "KAMBING" | "DOMBA";
}

export default function DashboardPage() {
  const mounted = useMounted();
  const [data, setData] = useState<DashboardData | null>(null);
  const [chartData, setChartData] = useState<ChartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch("/api/dashboard/summary");
        if (!response.ok) {
          throw new Error("Gagal mengambil data dashboard");
        }
        const json = await response.json();
        if (json.status === "success") {
          setData(json.data);
          setChartData(json.chartData || []);
        }
      } catch (error) {
        console.error(error);
        setError("Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading)
    return <div className="p-8 text-center">Memuat data dashboard...</div>;
  if (error)
    return <div className="p-8 text-red-500 text-center">Error: {error}</div>;
  if (!data) return null;

  if (!mounted) {
    return null;
  }

  return (
    <div className="p-8 w-full mx-auto space-y-8 text-gray-900 dark:text-gray-100">
      {/* RECHARTS GRAFIK TREN BOBOT */}
      <div className="bg-white dark:bg-neutral-900  p-6 rounded-2xl shadow-md border border-gray-100 dark:border-slate-800">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Tren Berat Pemeriksaan Ternak
        </h2>
        <div className="w-full h-80">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="tanggal" stroke="#888888" fontSize={12} />
                <YAxis unit=" kg" stroke="#888888" fontSize={12} />
                <Tooltip formatter={(value) => [`${value} kg`]} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="berat"
                  stroke="#b45309"
                  name="Berat Pemeriksaan"
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
              Belum ada data riwayat berat untuk ditampilkan di grafik.
            </div>
          )}
        </div>
      </div>

      {/* GRID KARTU STATISTIK */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* KARTU STATISTIK KAMBING */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-amber-700 flex gap-2">
              <GiGoat size={25} /> Kelompok Kambing
            </h2>
            <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-amber-900/20 dark:text-amber-300">
              {data.KAMBING.total} Ekor
            </span>
          </div>
          <hr className="mb-4 border-gray-200 dark:border-slate-700" />
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Rata-rata Berat Saat Ini
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {data.KAMBING.rata_rata_berat} kg
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Prediksi Total Bobot Kelompok (Bulan Depan)
              </p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {data.KAMBING.prediksi_bobot_total ?? 0} kg
              </p>
            </div>
          </div>
        </div>

        {/* KARTU STATISTIK DOMBA */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-700 flex gap-2">
              <GiSheep size={25} /> Kelompok Domba
            </h2>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-900/20 dark:text-blue-300">
              {data.DOMBA.total} Ekor
            </span>
          </div>
          <hr className="mb-4 border-gray-200 dark:border-slate-700" />
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Rata-rata Berat Saat Ini
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {data.DOMBA.rata_rata_berat} kg
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Prediksi Total Bobot Kelompok (Bulan Depan)
              </p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {data.DOMBA.prediksi_bobot_total ?? 0} kg
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
