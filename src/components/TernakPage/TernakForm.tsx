"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ImagePlus,
  Save,
  Trash2,
  UploadCloud,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import {
  Ternak,
  JenisHewan,
  JenisKelamin,
  StatusKehamilan,
  ProgramTernak,
  StatusMenyusui,
} from "@/src/generated/prisma/client";
import { TernakFormProps } from "@/src/interface/ternak";

export const TernakForm = ({
  initialData,
  onSubmit,
  isSubmitting,
  submitLabel,
  kandangList = [],
}: TernakFormProps) => {
  const { data: session } = useSession();

  // State untuk basic form ternak
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

  const [statusMenyusui, setStatusMenyusui] = useState<StatusMenyusui>(
    (initialData?.statusMenyusui as StatusMenyusui) || "TIDAK_MENYUSUI",
  );

  const [programTernak, setProgramTernak] = useState<ProgramTernak>(
    (initialData?.programTernak as ProgramTernak) || "FATTENING",
  );

  // State untuk upload file, foto dan seabgaianya
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.imageUrl || null,
  );
  const [isImageRemoved, setIsImageRemoved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // State untuk kandang dan sekat
  const [selectedKandangId, setSelectedKandangId] = useState<string>(
    initialData?.sekat?.kandangId || "",
  );
  const [selectedSekatId, setSelectedSekatId] = useState<string>(
    initialData?.sekatId || "",
  );

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
      setStatusMenyusui(
        (initialData.statusMenyusui as StatusMenyusui) || "TIDAK_MENYUSUI",
      );
      setProgramTernak(
        (initialData.programTernak as ProgramTernak) || "FATTENING",
      );
      setPreviewUrl(initialData.imageUrl || null);
      setIsImageRemoved(false);
      setSelectedFile(null);

      setSelectedKandangId(initialData?.sekat?.kandangId || "");
      setSelectedSekatId(initialData?.sekatId || "");
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
      statusMenyusui:
        jenisKelamin === "BETINA" ? statusMenyusui : "TIDAK_MENYUSUI",
      programTernak: programTernak,
      sekatId: selectedSekatId || null,
      userId: session?.user?.id ?? null,
    } as Ternak;

    await onSubmit(baseFormPayload, selectedFile, isImageRemoved);
  };

  const sekatTersaring = useMemo(() => {
    if (!selectedKandangId) return [];

    const kandangTerpilih = kandangList.find((k) => k.id === selectedKandangId);

    return kandangTerpilih?.sekatList || [];
  }, [selectedKandangId, kandangList]);

  // Reusable Tailwind classes untuk kerapihan & konsistensi form input
  const inputClass =
    "w-full h-12 px-4 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-transparent text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500/50 transition-all text-sm disabled:opacity-40 disabled:cursor-not-allowed";
  const selectWrapperClass = "relative w-full flex items-center";
  const selectClass =
    "w-full h-12 pl-4 pr-10 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-transparent text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500/50 transition-all text-sm appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";
  const selectIconClass =
    "absolute right-3 text-neutral-400 pointer-events-none w-4 h-4";
  const optionClass =
    "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white";

  return (
    <form
      onSubmit={handleFormSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-neutral-900/50 p-6 md:p-8 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800"
    >
      <div className="flex flex-col gap-5">
        {/* INPUT NAMA */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
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
            className={`${inputClass} ${errors.nama?.length ? "border-red-500 focus:ring-2 focus:ring-red-500/30" : ""}`}
          />
        </div>

        {/* INPUT KODE */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
            Kode Hewan
          </label>
          <input
            type="text"
            value={kodeHewan}
            onChange={(e) => setKodeHewan(e.target.value)}
            placeholder="Contoh: KMB-001"
            className={inputClass}
          />
        </div>

        {/* INPUT JENIS HEWAN */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
            Jenis Hewan
          </label>
          <div className={selectWrapperClass}>
            <select
              value={jenisHewan}
              onChange={(e) => setJenisHewan(e.target.value as JenisHewan)}
              className={selectClass}
            >
              <option className={optionClass} value="KAMBING">
                Kambing
              </option>
              <option className={optionClass} value="DOMBA">
                Domba
              </option>
            </select>
            <ChevronDown className={selectIconClass} />
          </div>
        </div>

        {/* INPUT JENIS KELAMIN */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
            Jenis Kelamin
          </label>
          <div className={selectWrapperClass}>
            <select
              value={jenisKelamin}
              onChange={(e) => setJenisKelamin(e.target.value as JenisKelamin)}
              className={selectClass}
            >
              <option className={optionClass} value="JANTAN">
                Jantan
              </option>
              <option className={optionClass} value="BETINA">
                Betina
              </option>
            </select>
            <ChevronDown className={selectIconClass} />
          </div>
        </div>

        {/* INPUT PROGRAM TERNAK */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
            Program Klasifikasi Ternak
          </label>
          <div className={selectWrapperClass}>
            <select
              value={programTernak}
              onChange={(e) =>
                setProgramTernak(e.target.value as ProgramTernak)
              }
              className={selectClass}
            >
              <option className={optionClass} value="FATTENING">
                Fattening (Penggemukan)
              </option>
              <option className={optionClass} value="BREEDING">
                Breeding (Pembibitan)
              </option>
            </select>
            <ChevronDown className={selectIconClass} />
          </div>
        </div>

        {/* STATUS HAMIL */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
            Status Hamil (Khusus Betina)
          </label>
          <div className={selectWrapperClass}>
            <select
              value={statusHamil}
              onChange={(e) =>
                setStatusHamil(e.target.value as StatusKehamilan)
              }
              disabled={jenisKelamin === "JANTAN"}
              className={selectClass}
            >
              <option className={optionClass} value="TIDAK_HAMIL">
                Tidak Hamil
              </option>
              <option className={optionClass} value="HAMIL">
                Hamil
              </option>
            </select>
            <ChevronDown className={selectIconClass} />
          </div>
        </div>

        {/* DROPDOWN STATUS MENYUSUI */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
            Status Menyusui (Khusus Betina)
          </label>
          <div className={selectWrapperClass}>
            <select
              value={statusMenyusui}
              onChange={(e) =>
                setStatusMenyusui(e.target.value as StatusMenyusui)
              }
              disabled={jenisKelamin === "JANTAN"}
              className={selectClass}
            >
              <option className={optionClass} value="TIDAK_MENYUSUI">
                Tidak Menyusui
              </option>
              <option className={optionClass} value="MENYUSUI">
                Menyusui
              </option>
            </select>
            <ChevronDown className={selectIconClass} />
          </div>
        </div>

        {/* SECTION PREVIEW & PICKER FOTO */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
            Foto Ternak
          </label>
          {previewUrl ? (
            <div className="relative group rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/30">
              <Image
                width={400}
                height={400}
                src={previewUrl}
                alt="Preview"
                className="w-full h-55 object-contain bg-neutral-50 dark:bg-neutral-900"
                unoptimized={previewUrl.startsWith("blob:")}
              />
              <div className="absolute inset-0 bg-black/40 transition-opacity flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transform hover:scale-110 transition-all shadow-lg cursor-pointer"
                  title="Hapus Foto"
                >
                  <Trash2 size={18} />
                </button>
                <label className="p-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transform hover:scale-110 transition-all shadow-lg cursor-pointer">
                  <ImagePlus size={18} />
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
            <label className="flex flex-col items-center justify-center w-full h-55 border-2 border-dashed rounded-xl cursor-pointer transition-all bg-neutral-50/50 hover:bg-neutral-100/50 dark:bg-neutral-800/20 dark:border-neutral-800 dark:hover:bg-neutral-800/50 border-neutral-300 hover:border-amber-500/80 shadow-sm">
              <div className="flex flex-col items-center gap-2">
                <div className="p-3.5 bg-amber-100/80 dark:bg-amber-950/40 rounded-full text-amber-700 dark:text-amber-500 mb-1">
                  <UploadCloud size={26} />
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

      <div className="flex flex-col gap-5">
        {/* WEIGHT INPUTS */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
            Berat Awal (kg)
          </label>
          <input
            type="number"
            step="0.1"
            value={beratAwal}
            onChange={(e) => setBeratAwal(e.target.value)}
            placeholder="0.0"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
            Berat Akhir (kg)
          </label>
          <input
            type="number"
            step="0.1"
            value={beratAkhir}
            onChange={(e) => setBeratAkhir(e.target.value)}
            placeholder="0.0"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
            Tanggal Lahir
          </label>
          <input
            type="date"
            value={tglLahir}
            onChange={(e) => setTglLahir(e.target.value)}
            className={`${inputClass} dark:scheme-dark`}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
            Umur (Bulan)
          </label>
          <input
            type="number"
            value={umur}
            onChange={(e) => setUmur(e.target.value)}
            placeholder="0"
            className={inputClass}
          />
        </div>

        {/* PILIHAN MASTER KANDANG */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
            Lokasi Bangunan Kandang
          </label>
          <div className={selectWrapperClass}>
            <select
              value={selectedKandangId}
              onChange={(e) => {
                setSelectedKandangId(e.target.value);
                setSelectedSekatId("");
              }}
              className={selectClass}
            >
              <option className={optionClass} value="" disabled hidden>
                -- Pilih Gedung Kandang --
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
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
            Nomor / Kode Sekat Ruangan
          </label>
          <div className={selectWrapperClass}>
            <select
              value={selectedSekatId}
              onChange={(e) => setSelectedSekatId(e.target.value)}
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

        {/* TOMBOL SUBMIT */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-4 h-12 flex items-center justify-center bg-amber-700 text-white rounded-xl font-bold hover:bg-amber-800 disabled:opacity-70 gap-2 shadow-lg transition-all ${isSubmitting ? "cursor-progress" : "cursor-pointer"}`}
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full w-5 h-5 border-2 border-white/30 border-t-white" />
          ) : (
            <>
              <Save size={18} />
              <span>{submitLabel}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
