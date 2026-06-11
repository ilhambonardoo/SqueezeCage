"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus, Save, Trash2, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import {
  Ternak,
  JenisHewan,
  JenisKelamin,
  StatusKehamilan,
} from "@/src/generated/prisma/client";
import { TernakFormProps } from "@/src/interface/ternak";

export const TernakForm = ({
  initialData,
  onSubmit,
  isSubmitting,
  submitLabel,
}: TernakFormProps) => {
  const { data: session } = useSession();
  const [nama, setNama] = useState(initialData?.nama || "");
  const [kodeHewan, setKodeHewan] = useState(initialData?.kode_hewan || "");
  const [jenisHewan, setJenisHewan] = useState<JenisHewan>(
    (initialData?.jenis_hewan as JenisHewan) || "KAMBING",
  );
  const [beratAwal, setBeratAwal] = useState<string>(
    initialData?.beratAwal?.toString() || "",
  );
  const [beratAkhir, setBeratAkhir] = useState<string>(
    initialData?.beratAkhir?.toString() || "",
  );
  const [jenisKelamin, setJenisKelamin] = useState<JenisKelamin>(
    (initialData?.jenis_kelamin as JenisKelamin) || "JANTAN",
  );
  const [tglLahir, setTglLahir] = useState(
    initialData?.tgl_lahir
      ? new Date(initialData.tgl_lahir).toISOString().split("T")[0]
      : "",
  );
  const [umur, setUmur] = useState(initialData?.umur?.toString() || "");
  const [statusHamil, setStatusHamil] = useState<StatusKehamilan>(
    (initialData?.statusHamil as StatusKehamilan) || "TIDAK_HAMIL",
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.imageUrl || null,
  );
  const [isImageRemoved, setIsImageRemoved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // Reset form states when initialData changes (Adjusting state during render)
  const [prevInitialData, setPrevInitialData] = useState(initialData);

  if (initialData !== prevInitialData) {
    setPrevInitialData(initialData);
    if (initialData) {
      setNama(initialData.nama || "");
      setKodeHewan(initialData.kode_hewan || "");
      setJenisHewan((initialData.jenis_hewan as JenisHewan) || "KAMBING");
      setBeratAwal(initialData.beratAwal?.toString() || "");
      setBeratAkhir(initialData.beratAkhir?.toString() || "");
      setJenisKelamin((initialData.jenis_kelamin as JenisKelamin) || "JANTAN");
      setTglLahir(
        initialData.tgl_lahir
          ? new Date(initialData.tgl_lahir).toISOString().split("T")[0]
          : "",
      );
      setUmur(initialData.umur?.toString() || "");
      setStatusHamil(
        (initialData.statusHamil as StatusKehamilan) || "TIDAK_HAMIL",
      );

      // Also sync images from initialData here
      setPreviewUrl(initialData.imageUrl || null);
      setIsImageRemoved(false);
      setSelectedFile(null);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        toast.error("Ukuran file terlalu besar! Maksimal 4MB.");
        return;
      }

      setSelectedFile(file);
      setIsImageRemoved(false);

      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);
    }
  };

  const handleRemoveImage = async () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsImageRemoved(true);
    toast.success("Foto dilepas (Klik simpan untuk menyimpan)");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !kodeHewan) {
      toast.error("Data penting harus diisi");
      setErrors({
        nama: !nama ? ["Nama harus diisi"] : [],
        kode_hewan: !kodeHewan ? ["Kode harus diisi"] : [],
      });
      return;
    }

    const baseFormPayload = {
      nama,
      kode_hewan: kodeHewan,
      jenis_hewan: jenisHewan,
      beratAwal: parseFloat(beratAwal) || 0,
      beratAkhir: parseFloat(beratAkhir) || parseFloat(beratAwal) || 0,
      jenis_kelamin: jenisKelamin,
      tgl_lahir: tglLahir ? new Date(tglLahir) : null,
      umur: parseInt(umur) || 0,
      statusHamil: jenisKelamin === "BETINA" ? statusHamil : "TIDAK_HAMIL",
      userId: session?.user?.id ?? null,
    } as Ternak;

    await onSubmit(baseFormPayload, selectedFile, isImageRemoved);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-neutral-900 p-6 md:p-8 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800"
    >
      <div className="flex flex-col gap-4">
        {/* INPUT NAMA */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Nama Hewan
          </label>
          <input
            type="text"
            value={nama}
            onChange={(e) => {
              setNama(e.target.value);
              if (errors.nama) setErrors({ ...errors, nama: [] });
            }}
            placeholder="Contoh: Si Putih"
            className={`p-3 rounded-xl border bg-transparent text-neutral-900 dark:text-white outline-none transition-all ${errors.nama?.length ? "border-red-500 focus:ring-2 focus:ring-red-500/30" : "border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-amber-500"}`}
          />
        </div>

        {/* INPUT KODE */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Kode Hewan
          </label>
          <input
            type="text"
            value={kodeHewan}
            onChange={(e) => setKodeHewan(e.target.value)}
            placeholder="Contoh: KMB-001"
            className="p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white outline-none"
          />
        </div>

        {/* INPUT JENIS HEWAN */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Jenis Hewan
          </label>
          <select
            value={jenisHewan}
            onChange={(e) => setJenisHewan(e.target.value as JenisHewan)}
            className="p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent dark:bg-neutral-900 text-neutral-900 dark:text-white outline-none"
          >
            <option value="KAMBING">Kambing</option>
            <option value="DOMBA">Domba</option>
          </select>
        </div>

        {/* INPUT JENIS KELAMIN */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Jenis Kelamin
          </label>
          <select
            value={jenisKelamin}
            onChange={(e) => setJenisKelamin(e.target.value as JenisKelamin)}
            className="p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent dark:bg-neutral-900 text-neutral-900 dark:text-white outline-none"
          >
            <option value="JANTAN">Jantan</option>
            <option value="BETINA">Betina</option>
          </select>
        </div>

        {/* SECTION PREVIEW & PICKER FOTO (SUDAH DIOPTIMASI) */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Foto Ternak
          </label>
          {previewUrl ? (
            <div className="relative group rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800">
              <Image
                width={400}
                height={400}
                src={previewUrl}
                alt="Preview"
                className="w-full h-52 object-contain bg-neutral-50 dark:bg-neutral-900"
                unoptimized={previewUrl.startsWith("blob:")} // Agar tidak error membaca local object blob url
              />
              <div className="absolute inset-0 bg-black/40 transition-opacity flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transform hover:scale-110 transition-all shadow-lg cursor-pointer"
                  title="Hapus Foto"
                >
                  <Trash2 size={20} />
                </button>
                <label className="p-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transform hover:scale-110 transition-all shadow-lg cursor-pointer">
                  <ImagePlus size={20} />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed rounded-xl cursor-pointer transition-all bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800/50 dark:border-neutral-700 dark:hover:bg-neutral-800 border-neutral-300 hover:border-amber-500 shadow-sm">
              <div className="flex flex-col items-center gap-2">
                <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-700 dark:text-amber-500 mb-1">
                  <UploadCloud size={32} />
                </div>
                <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-300">
                  Klik untuk pilih foto
                </span>
                <span className="text-xs text-neutral-400 dark:text-neutral-500">
                  PNG, JPG atau WEBP (Maks. 4MB)
                </span>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* WEIGHT INPUTS */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Berat Awal (kg)
          </label>
          <input
            type="number"
            step="0.1"
            value={beratAwal}
            onChange={(e) => setBeratAwal(e.target.value)}
            placeholder="0.0"
            className="p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Berat Akhir (kg)
          </label>
          <input
            type="number"
            step="0.1"
            value={beratAkhir}
            onChange={(e) => setBeratAkhir(e.target.value)}
            placeholder="0.0"
            className="p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Tanggal Lahir
          </label>
          <input
            type="date"
            value={tglLahir}
            onChange={(e) => setTglLahir(e.target.value)}
            className="p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Umur (Bulan)
          </label>
          <input
            type="number"
            value={umur}
            onChange={(e) => setUmur(e.target.value)}
            placeholder="0"
            className="p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Status Hamil (Khusus Betina)
          </label>
          <select
            value={statusHamil}
            onChange={(e) => setStatusHamil(e.target.value as StatusKehamilan)}
            disabled={jenisKelamin === "JANTAN"}
            className="p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent dark:bg-neutral-900 text-neutral-900 dark:text-white outline-none disabled:opacity-50"
          >
            <option value="TIDAK_HAMIL">Tidak Hamil</option>
            <option value="HAMIL">Hamil</option>
          </select>
        </div>

        {/* TOMBOL SUBMIT */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-auto h-14 flex items-center justify-center bg-amber-700 text-white rounded-xl font-bold hover:bg-amber-800 disabled:opacity-70 gap-2 shadow-lg ${isSubmitting ? "cursor-progress" : "cursor-pointer"}`}
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full w-5 h-5 border-2 border-white/30 border-t-white" />
          ) : (
            <>
              <Save size={20} />
              <span>{submitLabel}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
