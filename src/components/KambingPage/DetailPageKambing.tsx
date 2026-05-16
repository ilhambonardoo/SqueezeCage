"use client";

import { useMounted } from "@/src/hooks/useMounted";
import { ArrowLeft, Calendar, Scale, Info, History, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Kambing } from "@/src/generated/prisma/client";

interface DetailPageKambingProps {
  id: string;
}

const DetailPageKambing = ({ id }: DetailPageKambingProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Kambing>();

  useEffect(() => {
    const kambingById = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/kambing/${id}`, { method: "GET" });
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

    if (id) kambingById();
  }, [id]);

  const router = useRouter();
  const mounted = useMounted();

  if (!mounted) return null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 gap-4">
        <p className="text-neutral-500">Data kambing tidak ditemukan</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 rounded-xl"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full py-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:mb-2 ml-2">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white rounded-2xl transition-all font-bold text-sm shadow-sm active:scale-95"
        >
          <ArrowLeft size={18} />
        </button>
      </div>
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="max-w-xl ml-5 mb-5">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl font-plenty text-neutral-900 dark:text-white">
            Detail{" "}
            <span className="text-amber-700 dark:text-amber-600">Ternak</span>
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Informasi lengkap mengenai ternak Anda. Pantau perkembangan berat,
            umur, dan status kesehatan di satu tempat.
          </p>
        </div>
        <Link
          href={`/kambing/edit/${id}`}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl transition-all font-bold text-sm shadow-lg shadow-amber-600/20 active:scale-95"
        >
          <Edit size={18} />
          Edit Informasi
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-5">
        {/* Left Column: Image & Badges */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white dark:bg-neutral-900 p-2 rounded-[2.5rem] border border-neutral-200 dark:border-neutral-800 shadow-xl shadow-neutral-200/50 dark:shadow-none overflow-hidden">
            <div className="relative aspect-square w-full rounded-4xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 group">
              {data.imageUrl ? (
                <Image
                  src={data.imageUrl}
                  alt={data.nama}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-neutral-400 gap-2">
                  <div className="p-4 bg-neutral-200 dark:bg-neutral-700 rounded-full">
                    <Info size={32} />
                  </div>
                  <span className="text-sm font-medium">
                    Foto tidak tersedia
                  </span>
                </div>
              )}
              {/* Status Badge Overlay */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1.5 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest shadow-sm">
                  {data.jenis_hewan}
                </span>
                <span
                  className={`px-3 py-1.5 rounded-full backdrop-blur-md text-[10px] font-bold uppercase tracking-widest shadow-sm ${
                    data.jenis_kelamin === "JANTAN"
                      ? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                      : "bg-pink-500/10 text-pink-600 border border-pink-500/20"
                  }`}
                >
                  {data.jenis_kelamin}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-amber-600 rounded-4xl p-6 text-white shadow-lg shadow-amber-600/30">
            <h3 className="text-amber-100/80 text-xs font-bold uppercase tracking-widest mb-4">
              Ringkasan Status
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
                <span className="text-sm">Status Hamil</span>
                <span className="font-bold">
                  {data.statusHamil === "HAMIL" ? "Ya" : "Tidak"}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
                <span className="text-sm">Masa Ternak</span>
                <span className="font-bold whitespace-nowrap">
                  {Math.floor(
                    (new Date().getTime() -
                      new Date(data.tgl_Masuk).getTime()) /
                      (1000 * 60 * 60 * 24),
                  )}{" "}
                  Hari
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Kenaikan Berat</span>
                <span className="font-bold">
                  +{data.beratAkhir - data.beratAwal} kg
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Cards */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <InfoCard
              icon={<Scale className="text-amber-600" />}
              label="Berat Saat Ini"
              value={`${data.beratAkhir} kg`}
              subValue={`${data.beratAwal} kg (Berat Awal)`}
              color="amber"
            />
            <InfoCard
              icon={<Calendar className="text-blue-600" />}
              label="Umur"
              value={`${data.umur} Bulan`}
              subValue={`Lahir: ${new Date(data.tgl_lahir!).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`}
              color="blue"
            />

            <InfoCard
              icon={<History className="text-purple-600" />}
              label="Tanggal Masuk"
              value={new Date(data.tgl_Masuk).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              subValue="Tercatat di sistem"
              color="purple"
            />
          </div>

          {/* New Section: Catatan Perawatan (Placeholder/Future Proof) */}
          <div className="bg-white dark:bg-neutral-900 rounded-4xl border border-neutral-200 dark:border-neutral-800 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                  <History size={20} className="text-amber-600" />
                </div>
                Log Aktivitas
              </h2>
              <button className="text-xs font-bold text-amber-600 hover:underline">
                Lihat Semua
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-neutral-100 dark:border-neutral-800 flex justify-between items-center italic text-neutral-500 text-sm">
                Belum ada catatan riwayat penimbangan tambahan untuk saat ini.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({
  icon,
  label,
  value,
  subValue,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subValue?: string;
  color: string;
}) => {
  const colorStyles: Record<string, string> = {
    amber: "bg-amber-50 dark:bg-amber-600/10 text-amber-600",
    blue: "bg-blue-50 dark:bg-blue-600/10 text-blue-600",
    emerald: "bg-emerald-50 dark:bg-emerald-600/10 text-emerald-600",
    purple: "bg-purple-50 dark:bg-purple-600/10 text-purple-600",
  };

  return (
    <div className="group bg-white dark:bg-neutral-900 p-6 rounded-4xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
      <div className="flex flex-col gap-4">
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-transform group-hover:scale-110 duration-300 ${colorStyles[color] || "bg-neutral-50"}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">
            {label}
          </p>
          <p className="text-xl font-black text-neutral-900 dark:text-white tracking-tight">
            {value}
          </p>
          {subValue && (
            <p className="text-xs text-neutral-400 mt-1 font-medium italic">
              {subValue}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPageKambing;
