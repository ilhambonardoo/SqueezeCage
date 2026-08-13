"use client";

import { Cpu, Layers, Box } from "lucide-react";
import Model3DSection from "./Model3DSection";
import { useMounted } from "@/src/hooks/useMounted";
import Image from "next/image";

export default function AboutLandingPage() {
  const mounted = useMounted();

  if (!mounted) return null;
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <section className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-extrabold font-plenty text-slate-900 tracking-tight sm:text-5xl">
            Mengenal <span className="text-amber-600">SmartSqueeze Cage</span>
          </h1>
          <p className="text-slate-500 text-justify  leading-relaxed font-light">
            SmartSqueeze Cage adalah sistem kandang pintar berbasis IoT
            (Internet of Things) dan Machine Learning yang dirancang untuk
            mengoptimalkan manajemen berat, prediksi makanan dan efisiensi
            lingkungan ternak secara otomatis dan real-time.
          </p>
        </section>

        <section className="bg-white rounded-2xl lg:h-[70vh] h-90vh border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center gap-2">
            <Box className="text-amber-600" size={22} />
            <h2 className="text-xl font-bold text-slate-900">
              Visualisasi 3D Kandang
            </h2>
          </div>

          <div className="bg-slate-900 h-auto w-full flex flex-col items-center justify-center text-slate-400">
            <Model3DSection />
          </div>
        </section>

        <div className="space-y-8">
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Layers className="text-amber-600" size={22} />
              <h2 className="text-xl font-bold text-slate-900 border-none">
                Skema & Alur Rangkaian Elektronik
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center justify-center">
                <Image
                  src={"/skema.webp"}
                  alt="Skema Rangkaian Elektronik SmartSqueeze Cage"
                  width={700}
                  height={450}
                  className="w-full h-auto object-contain rounded-lg shadow-sm"
                />
              </div>

              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Interkoneksi Komponen Sistem
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Rangkaian ini mengintegrasikan seluruh modul IoT ke dalam satu
                  kesatuan sirkuit yang efisien dan andal:
                </p>

                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900">
                        Manajemen Daya Mandiri:
                      </strong>{" "}
                      Menggunakan kombinasi baterai Li-ion 18650, modul TP4056
                      untuk pengisian daya aman, saklar rocker, dan regulator
                      step-up untuk menyuplai daya stabil.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900">
                        Dual Sensor Tekanan (Load Cell):
                      </strong>{" "}
                      Dua unit sensor berat dihubungkan ke penguat sinyal HX711
                      independen untuk membaca data tekanan mekanis sasis
                      kandang secara presisi.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900">
                        Antarmuka Pengguna Efisien:
                      </strong>{" "}
                      Display TFT LCD ILI9341 dipasang sebagai output visual
                      utama, didukung oleh 4 tombol taktil (*push button*)
                      eksternal untuk konfigurasi menu lokal.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Cpu className="text-amber-600" size={24} />
              <h2 className="text-2xl font-bold text-slate-900">
                Spesifikasi Komponen Utama
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-base">
                    NodeMCU ESP32
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Otak utama sistem yang mengontrol logika sensor, aktuator,
                    serta memiliki konektivitas Wi-Fi/Bluetooth terintegrasi.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
                  Pinout: GPIO Digital/Analog
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-base">
                    Load Cell + HX711
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Dua pasang sensor berat dengan amplifier HX711 24-bit untuk
                    mendeteksi tekanan sasis kandang secara akurat.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
                  Protokol: Serial Data (DT/SCK)
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-base">
                    TFT LCD ILI9341
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Layar warna resolusi tinggi untuk menampilkan pembacaan
                    grafik data sensor dan navigasi menu lokal secara real-time.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
                  Protokol: SPI Interface
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-base">
                    Baterai 18650 + TP4056 + StepUp
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Sistem catu daya mandiri dengan proteksi pengisian ulang
                    (*charge*) dan penaik tegangan stabil ke 5V DC.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
                  Output: Stable 5V / 3.3V
                </div>
              </div>
            </div>
          </section>
        </div>

        <hr className="border-slate-200" />
      </div>
    </div>
  );
}
