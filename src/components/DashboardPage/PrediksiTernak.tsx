"use client";

import { useMounted } from "@/src/hooks/useMounted";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const dataDummy = [
  { bulan: "Jan", berat: 20, prediksi: 20 },
  { bulan: "Feb", berat: 22, prediksi: 22 },
  { bulan: "Mar", berat: 25, prediksi: 25 },
  { bulan: "Apr", berat: 27, prediksi: 27 },
  { bulan: "Mei", berat: null, prediksi: 30 },
  { bulan: "Jun", berat: null, prediksi: 33 },
];

const PrediksiTernak = () => {
  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <>
      <section className="w-full">
        <div className="w-full p-6 lg:p-10">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 italic font-plenty">
              Prediksi Pertumbuhan Berat Ternak
            </h2>
            <p className="text-sm text-zinc-500">
              Analisis tren berat badan aktual vs estimasi ML
            </p>
          </div>

          <div className="h-75 w-full min-h-75">
            <ResponsiveContainer width={"100%"} height={300}>
              <LineChart
                data={dataDummy}
                margin={{ top: 5, right: 30, left: -10, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#333"
                  vertical={false}
                />
                <XAxis
                  dataKey="bulan"
                  stroke="#888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  unit="kg"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#fff" }}
                />
                <Legend />
                {/* Garis Data Aktual */}
                <Line
                  type="monotone"
                  dataKey="berat"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#10b981" }}
                  activeDot={{ r: 6 }}
                  name="Berat Aktual (kg)"
                />
                {/* Garis Prediksi (Putus-putus) */}
                <Line
                  type="monotone"
                  dataKey="prediksi"
                  stroke="#6366f1"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4, fill: "#6366f1" }}
                  name="Prediksi (kg)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
            <p className="text-sm text-emerald-800 dark:text-emerald-300">
              <span className="font-bold">Status Kesehatan:</span> Ternak Anda
              diprediksi{" "}
              <span className="underline italic uppercase">Sehat</span> dengan
              kenaikan berat badan stabil ~2.5kg per bulan.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrediksiTernak;
