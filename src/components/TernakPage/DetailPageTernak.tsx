"use client";

import { useMounted } from "@/src/hooks/useMounted";
import {
  ArrowLeft,
  Calendar,
  Scale,
  Info,
  Edit,
  Heart,
  X,
  Home,
  Grid,
  Layers,
  AlertTriangle,
  BrainCircuit,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { TernakWithRelasi } from "@/src/interface/ternak";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMachine } from "@/src/hooks/useMachine";

interface DetailPageTernakProps {
  id: string;
}

const DetailPageTernak = ({ id }: DetailPageTernakProps) => {
  const [isLoadingTernak, setIsLoadingTernak] = useState(true);
  const [data, setData] = useState<TernakWithRelasi | null>(null);
  const [isPhotoOverlayOpen, setIsPhotoOverlayOpen] = useState(false);
  const { dataBobot, isLoading, getDataBobot } = useMachine();

  useEffect(() => {
    const fetchTernakData = async () => {
      setIsLoadingTernak(true);
      try {
        const res = await fetch(`/api/ternak/${id}`, { method: "GET" });
        const result = await res.json();

        if (res.ok) {
          setData(result.data ? result.data : result);
        } else {
          toast.error("Gagal mengambil data!");
        }
      } catch {
        toast.error("Terjadi kesalahan jaringan!");
      } finally {
        setIsLoadingTernak(false);
      }
    };

    if (id) fetchTernakData();
  }, [id]);

  useEffect(() => {
    if (id) {
      getDataBobot(id);
    }
  }, [id, getDataBobot]);

  const closeOverlay = useCallback(() => {
    setIsPhotoOverlayOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeOverlay();
      }
    };

    if (isPhotoOverlayOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isPhotoOverlayOpen, closeOverlay]);

  const router = useRouter();
  const mounted = useMounted();

  if (!mounted) return null;

  if (isLoadingTernak) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-amber-500/20 animate-pulse"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-amber-600 animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-neutral-400 font-medium tracking-wide">
          Data ternak tidak ditemukan
        </p>
        <button
          onClick={() => router.back()}
          className="px-5 cursor-pointer py-2.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-xl font-semibold text-sm transition-all"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-8 lg:py-12 selection:bg-amber-200">
      {/* Dynamic Floating Action Header */}
      <div className="flex justify-between items-center mb-10">
        <button
          onClick={() => router.back()}
          className="group flex items-center cursor-pointer justify-center w-12 h-12 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 active:scale-95 shadow-sm"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
        </button>

        <Link
          href={`/ternak/edit/${id}`}
          className="flex items-center gap-2 px-5 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl hover:opacity-90 transition-all font-semibold text-sm tracking-wide shadow-xl shadow-neutral-900/10 dark:shadow-none active:scale-95"
        >
          <Edit size={16} />
          Edit Informasi
        </Link>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Visual Card */}
        <div className="lg:col-span-5 space-y-6">
          <div
            className={`relative group rounded-[2.5rem] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 shadow-2xl shadow-neutral-200/40 dark:shadow-none ${data.imageUrl ? "cursor-zoom-in" : ""}`}
            onClick={() => data.imageUrl && setIsPhotoOverlayOpen(true)}
          >
            <div className="relative aspect-4/5 w-full overflow-hidden">
              {data.imageUrl ? (
                <Image
                  src={data.imageUrl}
                  alt={data.nama}
                  fill
                  priority
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-neutral-400 gap-3 bg-linear-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
                  <div className="p-4 bg-white dark:bg-neutral-800 rounded-3xl shadow-sm">
                    <Info size={28} className="text-neutral-400" />
                  </div>
                  <span className="text-xs font-semibold tracking-wider uppercase opacity-60">
                    Foto tidak tersedia
                  </span>
                </div>
              )}

              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2 pointer-events-none">
                <span className="px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md text-[11px] font-bold text-white uppercase tracking-widest border border-white/10">
                  {data.jenis_hewan}
                </span>
                <span
                  className={`px-4 py-2 rounded-xl backdrop-blur-md text-[11px] font-bold uppercase tracking-widest border ${
                    data.jenis_kelamin === "JANTAN"
                      ? "bg-blue-500/20 text-blue-200 border-blue-400/20"
                      : "bg-pink-500/20 text-pink-200 border-pink-400/20"
                  }`}
                >
                  {data.jenis_kelamin}
                </span>
                {data.programTernak && (
                  <span className="px-4 py-2 rounded-xl bg-amber-500/20 backdrop-blur-md text-[11px] font-bold text-amber-200 border border-amber-400/20 uppercase tracking-widest">
                    {data.programTernak}
                  </span>
                )}
              </div>
            </div>
          </div>

          {data.statusHamil === "HAMIL" && (
            <div className="flex items-center gap-4 p-5 bg-pink-50 dark:bg-pink-950/20 border border-pink-100 dark:border-pink-900/30 rounded-3xl animate-pulse">
              <div className="w-10 h-10 bg-pink-500 rounded-2xl flex items-center justify-center text-white shadow-md shadow-pink-500/20">
                <Heart size={18} fill="currentColor" />
              </div>
              <div>
                <p className="text-xs font-bold text-pink-700 dark:text-pink-400 uppercase tracking-wider">
                  Status Khusus
                </p>
                <p className="text-sm font-semibold text-pink-900 dark:text-pink-300">
                  Ternak sedang dalam masa kehamilan
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Information Flow */}
        <div className="lg:col-span-7 space-y-6 lg:pt-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-500">
              Kode Ternak: {data.kode_hewan || `#${id.slice(-5)}`}
            </span>
            <h1 className="mt-1 text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white capitalize">
              {data.nama || "Tanpa Nama"}
            </h1>
          </div>

          {/* LOKASI KANDANG & SEKAT */}
          <div className="p-6 bg-linear-to-br from-amber-50/60 to-orange-50/30 dark:from-neutral-900/40 dark:to-neutral-900/10 border border-amber-100/70 dark:border-neutral-800/80 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-500 flex items-center gap-2">
              <Home size={16} /> Penempatan Tata Ruang
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3.5 p-4 bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 rounded-2xl">
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-xl flex items-center justify-center shrink-0">
                  <Layers size={20} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-wide">
                    Gedung / Kandang
                  </p>
                  <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
                    {data.sekat?.kandang?.nama || "Belum Ditempatkan"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 rounded-2xl">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-xl flex items-center justify-center shrink-0">
                  <Grid size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-wide">
                    Nomor Petak Sekat
                  </p>
                  <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
                    {data.sekat?.kodeSekat ? (
                      <span>
                        {data.sekat.kodeSekat}{" "}
                        {data.sekat.keteranganSekat && (
                          <span className="text-xs font-normal text-neutral-400">
                            ({data.sekat.keteranganSekat})
                          </span>
                        )}
                      </span>
                    ) : (
                      "Belum Ada Sekat"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-6 bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/50 dark:border-neutral-800/50 rounded-3xl transition-all">
              <div className="flex items-center gap-3 mb-3 text-neutral-500">
                <Scale size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Massa Tubuh
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white">
                  {data.beratAkhir}
                </span>
                <span className="text-sm font-bold text-neutral-400">kg</span>
              </div>
              <p className="text-xs text-neutral-400 mt-2">
                Berat awal:{" "}
                <span className="font-semibold">{data.beratAwal} kg</span>
              </p>
            </div>

            <div className="p-6 bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/50 dark:border-neutral-800/50 rounded-3xl transition-all">
              <div className="flex items-center gap-3 mb-3 text-neutral-500">
                <Calendar size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Estimasi Umur
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white">
                  {data.umur}
                </span>
                <span className="text-sm font-bold text-neutral-400">
                  Bulan
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-2">
                Lahir:{" "}
                <span className="font-semibold">
                  {data.tgl_lahir
                    ? new Date(data.tgl_lahir).toLocaleDateString("id-ID", {
                        month: "short",
                        year: "numeric",
                      })
                    : "-"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PREDIKSI BOBOT MACHINE LEARNING */}
      {isLoading && (
        <div className="mt-8 text-sm text-amber-500 animate-pulse flex items-center gap-2">
          <BrainCircuit size={16} className="animate-spin" /> Menghitung
          proyeksi pertumbuhan dari core AI...
        </div>
      )}

      {dataBobot && !isLoading && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
          {/* Proyeksi Bulan Depan */}
          <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-3xl flex flex-col justify-between text-white">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <BrainCircuit size={14} /> Prediksi AI Bulan Depan
              </span>
              <p className="text-xs text-neutral-400 mt-2">
                Perkiraan bobot hewan ini bulan depan akan mencapai:
              </p>
              <p className="text-4xl font-black text-white mt-1">
                {dataBobot.prediksi.bobotBulanDepan}{" "}
                <span className="text-base font-normal text-neutral-400">
                  Kg
                </span>
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-800 mt-4">
              <span className="text-[11px] text-neutral-500 block uppercase font-bold tracking-wider">
                Klasifikasi Tubuh:
              </span>
              <span
                className={`text-xs font-bold inline-block mt-1 px-2.5 py-1 rounded-lg ${
                  dataBobot.prediksi.klasifikasi === "Ideal"
                    ? "bg-emerald-950/50 text-emerald-400 border border-emerald-900/40"
                    : "bg-red-950/50 text-red-400 border border-red-900/40"
                }`}
              >
                {dataBobot.prediksi.klasifikasi}
              </span>
            </div>
          </div>

          {/* Notifikasi Perhatian Operator & Grafik Tren */}
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl md:col-span-2 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1">
              Tren Grafik
            </span>

            {/* Notifikasi Operator */}
            {dataBobot.prediksi.butuhPerhatian ? (
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 p-3.5 rounded-2xl flex gap-2.5 text-red-700 dark:text-red-400 text-xs">
                <AlertTriangle className="shrink-0 mt-0.5" size={16} />
                <p className="font-semibold">
                  {dataBobot.prediksi.pesanNotifikasi}
                </p>
              </div>
            ) : (
              <div className="bg-emerald-50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/20 p-3.5 rounded-2xl text-emerald-700 dark:text-emerald-400 text-xs">
                ✅ Ternak berada dalam kurva berat ideal. Lanjutkan skema pakan
                yang berlaku saat ini.
              </div>
            )}

            {/* Grafik Mini */}
            <div className="h-30 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataBobot.trenGrafik}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e5e5"
                    className="hidden dark:block dark:stroke-[#262626]"
                  />
                  <XAxis
                    dataKey="bulan"
                    stroke="#737373"
                    fontSize={10}
                    tickLine={false}
                  />
                  <YAxis stroke="#737373" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#171717",
                      borderColor: "#404040",
                      color: "#fff",
                      fontSize: 11,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="bobot"
                    stroke="#ea580c"
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Photo Lightbox */}
      {isPhotoOverlayOpen && data.imageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm cursor-zoom-out"
          onClick={closeOverlay}
        >
          <button
            className="absolute top-6 cursor-pointer right-6 p-2 rounded-full bg-neutral-800/50 text-white hover:bg-neutral-700/50 transition-colors"
            onClick={closeOverlay}
          >
            <X size={24} />
          </button>

          <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center">
            <Image
              src={data.imageUrl}
              alt={data.nama}
              width={1600}
              height={1600}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPageTernak;
