"use client";

import { useMounted } from "@/src/hooks/useMounted";
import {
  ArrowLeft,
  Calendar,
  Scale,
  Info,
  History,
  Edit,
  Heart,
  TrendingUp,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { Ternak } from "@/src/generated/prisma/client";

interface DetailPageTernakProps {
  id: string;
}

const DetailPageTernak = ({ id }: DetailPageTernakProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Ternak>();
  // State untuk mengontrol visibilitas overlay foto
  const [isPhotoOverlayOpen, setIsPhotoOverlayOpen] = useState(false);

  useEffect(() => {
    const fetchTernakData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/ternak/${id}`, { method: "GET" });
        const result = await res.json();

        if (res.ok) {
          setData(result);
        } else {
          toast.error("Gagal mengambil data!");
        }
      } catch {
        toast.error("Terjadi kesalahan jaringan!");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchTernakData();
  }, [id]);

  // Fungsi untuk menutup overlay
  const closeOverlay = useCallback(() => {
    setIsPhotoOverlayOpen(false);
  }, []);

  // Menambahkan listener untuk tombol Esc untuk menutup overlay
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeOverlay();
      }
    };

    if (isPhotoOverlayOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Mencegah scrolling pada body saat overlay terbuka
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

  if (isLoading) {
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
          className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-xl font-semibold text-sm transition-all"
        >
          Kembali
        </button>
      </div>
    );
  }

  const masaTernak = Math.floor(
    (new Date().getTime() - new Date(data.tgl_Masuk).getTime()) /
      (1000 * 60 * 60 * 24),
  );
  const kenaikanBerat = data.beratAkhir - data.beratAwal;

  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-8 lg:py-12 selection:bg-amber-200">
      {/* Dynamic Floating Action Header */}
      <div className="flex justify-between items-center mb-12">
        <button
          onClick={() => router.back()}
          className="group flex items-center justify-center w-12 h-12 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 active:scale-95 shadow-sm"
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

      {/* Main Content Layout - Asymmetric Modern Look */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Cinematic Visual Card */}
        <div className="lg:col-span-5 space-y-6">
          <div
            className={`relative group rounded-[2.5rem] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 shadow-2xl shadow-neutral-200/40 dark:shadow-none ${data.imageUrl ? "cursor-zoom-in" : ""}`}
            // Menampilkan overlay saat card diklik jika ada foto
            onClick={() => data.imageUrl && setIsPhotoOverlayOpen(true)}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              {data.imageUrl ? (
                <Image
                  src={data.imageUrl}
                  alt={data.nama}
                  fill
                  priority
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-neutral-400 gap-3 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
                  <div className="p-4 bg-white dark:bg-neutral-800 rounded-3xl shadow-sm">
                    <Info size={28} className="text-neutral-400" />
                  </div>
                  <span className="text-xs font-semibold tracking-wider uppercase opacity-60">
                    Foto tidak tersedia
                  </span>
                </div>
              )}

              {/* Artistic Blur Overlay Badges */}
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
              </div>
            </div>
          </div>

          {/* Health & Pregnancy Quick Badge */}
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
        <div className="lg:col-span-7 space-y-8 lg:pt-4">
          {/* Header Title Typography */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-500">
              ID Ternak: #{id.slice(-5)}
            </span>
            <h1 className="mt-2 text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white capitalize">
              {data.nama || "Tanpa Nama"}
            </h1>
          </div>

          <hr className="border-neutral-200 dark:border-neutral-800" />

          {/* Grid Stats Minimalist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Weight Card */}
            <div className="p-6 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/50 dark:border-neutral-800/50 rounded-3xl transition-all hover:bg-neutral-100/50 dark:hover:bg-neutral-900">
              <div className="flex items-center gap-3 mb-4 text-neutral-500">
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

            {/* Age Card */}
            <div className="p-6 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/50 dark:border-neutral-800/50 rounded-3xl transition-all hover:bg-neutral-100/50 dark:hover:bg-neutral-900">
              <div className="flex items-center gap-3 mb-4 text-neutral-500">
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

          {/* Progress Analytics Minimalist */}
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <TrendingUp size={16} /> Metrik Perkembangan
            </h3>

            <div className="space-y-4">
              {/* Progress 1: Masa Ternak */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-neutral-500">Durasi Pemeliharaan</span>
                  <span className="text-neutral-900 dark:text-white font-bold">
                    {masaTernak} Hari
                  </span>
                </div>
                <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-600 rounded-full"
                    style={{ width: `${Math.min(masaTernak / 3.65, 100)}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1 italic">
                  Masuk pada{" "}
                  {new Date(data.tgl_Masuk).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Progress 2: Kenaikan Berat */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-neutral-500">Tren Pertumbuhan</span>
                  <span
                    className={`font-bold ${kenaikanBerat >= 0 ? "text-emerald-600" : "text-rose-600"}`}
                  >
                    {kenaikanBerat >= 0 ? `+${kenaikanBerat}` : kenaikanBerat}{" "}
                    kg
                  </span>
                </div>
                <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${kenaikanBerat >= 0 ? "bg-emerald-500" : "bg-rose-500"}`}
                    style={{
                      width: `${Math.min(Math.abs(kenaikanBerat) * 4, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Logs Section */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-md font-bold tracking-tight flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
                <History size={16} className="text-neutral-400" />
                Catatan Aktivitas Belakangan
              </h2>
            </div>
            <div className="p-5 bg-neutral-50 dark:bg-neutral-900/30 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 text-center">
              <p className="text-xs italic text-neutral-400">
                Belum ada log penimbangan atau riwayat medis tambahan yang
                direkam untuk hewan ini.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Overlay (Lightbox) */}
      {isPhotoOverlayOpen && data.imageUrl && (
        // Overlay Latar Belakang (Gelap Transparan)
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm cursor-zoom-out animate-fade-in"
          // Menutup overlay jika latar belakang diklik
          onClick={closeOverlay}
        >
          {/* Tombol Tutup (Pojok Kanan Atas) */}
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-neutral-800/50 text-white hover:bg-neutral-700/50 transition-colors"
            onClick={closeOverlay}
          >
            <X size={24} />
          </button>

          {/* Kontainer Foto (Agar foto tidak terlalu besar dan responsif) */}
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center">
            {/* Foto Ukuran Penuh */}
            <Image
              src={data.imageUrl}
              alt={data.nama}
              width={1600} // Lebar maksimum foto
              height={1600} // Tinggi maksimum foto
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl animate-scale-in"
              // Mencegah klik pada foto menutup overlay
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPageTernak;
