"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ImagePlus, Save, Trash2, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useUploadThing } from "@/src/hooks/useUploadthing";
import { deleteImage } from "@/src/services/kambing-services";
import {
  Kambing,
  JenisHewan,
  JenisKelamin,
  StatusKehamilan,
} from "@/src/generated/prisma/client";
import { KambingFormProps } from "@/src/interface/kambing";

export const KambingForm = ({
  initialData,
  onSubmit,
  isSubmitting,
  submitLabel,
  localStorageKeySuffix = "create",
}: KambingFormProps) => {
  const { data: session } = useSession();
  const [nama, setNama] = useState(initialData?.nama || "");
  const [kodeKambing, setKodeKambing] = useState(
    initialData?.kode_kambing || "",
  );
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
  const [imgUrl, setImgUrl] = useState(initialData?.imageUrl || "");
  const [imgKey, setImgKey] = useState(initialData?.imageKey || "");
  const [isDeleting, setIsDeleting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // Reset form states when initialData changes (Adjusting state during render)
  const [prevInitialData, setPrevInitialData] = useState(initialData);

  if (initialData !== prevInitialData) {
    setPrevInitialData(initialData);
    if (initialData) {
      setNama(initialData.nama || "");
      setKodeKambing(initialData.kode_kambing || "");
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
      setImgUrl(initialData.imageUrl || "");
      setImgKey(initialData.imageKey || "");
    }
  }

  // Mengsikronkan localstorage hanya pada saat di mount
  useEffect(() => {
    const savedUrl = localStorage.getItem(
      `temp_kambing_url_${localStorageKeySuffix}`,
    );
    const savedKey = localStorage.getItem(
      `temp_kambing_key_${localStorageKeySuffix}`,
    );
    const isDeleted =
      localStorage.getItem(`temp_kambing_deleted_${localStorageKeySuffix}`) ===
      "true";

    if (isDeleted) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setImgUrl("");
      setImgKey("");
    } else if (savedUrl && savedKey) {
      setImgUrl(savedUrl);
      setImgKey(savedKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: async (res) => {
      const url = res[0].ufsUrl || res[0].url;
      const key = res[0].key;

      if (imgKey) await deleteImage(imgKey);

      if (url) {
        setImgUrl(url);
        setImgKey(key);
        localStorage.setItem(`temp_kambing_url_${localStorageKeySuffix}`, url);
        localStorage.setItem(`temp_kambing_key_${localStorageKeySuffix}`, key);
        localStorage.removeItem(
          `temp_kambing_deleted_${localStorageKeySuffix}`,
        );
        toast.success("Foto berhasil diunggah");
      }
    },
    onUploadError: (err) => {
      toast.error(`Gagal upload: ${err.message}`);
    },
  });

  const handleRemoveImage = async () => {
    setIsDeleting(true);
    try {
      if (imgKey) await deleteImage(imgKey);
      setImgUrl("");
      setImgKey("");
      localStorage.setItem(
        `temp_kambing_deleted_${localStorageKeySuffix}`,
        "true",
      );
      localStorage.removeItem(`temp_kambing_url_${localStorageKeySuffix}`);
      localStorage.removeItem(`temp_kambing_key_${localStorageKeySuffix}`);
      toast.success("Foto berhasil dihapus");
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus foto");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !kodeKambing) {
      toast.error("Data penting harus diisi");
      setErrors({
        nama: !nama ? ["Nama harus diisi"] : [],
        kode_kambing: !kodeKambing ? ["Kode harus diisi"] : [],
      });
      return;
    }

    onSubmit({
      nama,
      kode_kambing: kodeKambing,
      jenis_hewan: jenisHewan,
      beratAwal: parseFloat(beratAwal) || 0,
      beratAkhir: parseFloat(beratAkhir) || parseFloat(beratAwal) || 0,
      jenis_kelamin: jenisKelamin,
      tgl_lahir: tglLahir ? new Date(tglLahir) : null,
      umur: parseInt(umur) || 0,
      statusHamil: jenisKelamin === "BETINA" ? statusHamil : "TIDAK_HAMIL",
      imageUrl: imgUrl,
      imageKey: imgKey,
      userId: session?.user?.id ?? null,
    } as Kambing);
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
            Nama Kambing
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
            Kode Kambing
          </label>
          <input
            type="text"
            value={kodeKambing}
            onChange={(e) => setKodeKambing(e.target.value)}
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

        {/* PHOTO UPLOAD */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Foto Kambing
          </label>
          {imgUrl ? (
            <div className="relative group rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800">
              <Image
                width={400}
                height={400}
                src={imgUrl}
                alt="Preview"
                className="w-full h-52 object-contain bg-neutral-50 dark:bg-neutral-900"
              />
              <div
                className={`absolute inset-0 bg-black/40 transition-opacity flex items-center justify-center gap-3 ${
                  isDeleting
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={isDeleting || isUploading}
                  className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transform hover:scale-110 transition-all shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Hapus Foto"
                >
                  {isDeleting ? (
                    <div className="animate-spin rounded-full w-5 h-5 border-2 border-white border-t-transparent" />
                  ) : (
                    <Trash2 size={20} />
                  )}
                </button>
                <label
                  className={`p-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transform hover:scale-110 transition-all shadow-lg cursor-pointer ${
                    isDeleting || isUploading
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <ImagePlus size={20} />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    disabled={isDeleting || isUploading}
                    onChange={(e) =>
                      e.target.files?.[0] && startUpload([e.target.files[0]])
                    }
                  />
                </label>
              </div>
            </div>
          ) : (
            <label
              className={`flex flex-col items-center justify-center w-full h-52 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                isUploading
                  ? "bg-amber-50/50 border-amber-300 dark:bg-amber-900/10 dark:border-amber-800"
                  : "bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800/50 dark:border-neutral-700 dark:hover:bg-neutral-800 border-neutral-300 hover:border-amber-500 shadow-sm"
              }`}
            >
              {isUploading ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="animate-spin rounded-full w-8 h-8 border-4 border-amber-700 border-t-transparent" />
                  <span className="text-sm font-medium text-amber-800 dark:text-amber-500">
                    Sedang Mengunggah...
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-700 dark:text-amber-500 mb-1">
                    <UploadCloud size={32} />
                  </div>
                  <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-300">
                    Klik untuk unggah foto
                  </span>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500">
                    PNG, JPG atau WEBP (Maks. 4MB)
                  </span>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) =>
                  e.target.files?.[0] && startUpload([e.target.files[0]])
                }
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

        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className={`mt-auto h-14 flex items-center justify-center bg-amber-700 text-white rounded-xl font-bold hover:bg-amber-800 disabled:opacity-70 gap-2 shadow-lg ${isUploading || isSubmitting ? "cursor-progress" : "cursor-pointer"}`}
        >
          {isSubmitting || isUploading ? (
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
