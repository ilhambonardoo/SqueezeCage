"use client";

import { useMounted } from "@/src/hooks/useMounted";
import { Plus, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const CreatePageKambing = () => {
  const { data: session } = useSession();
  const [nama, setNama] = useState("");
  const [kodeKambing, setKodeKambing] = useState("");
  const [jenisHewan, setJenisHewan] = useState("KAMBING");
  const [beratAwal, setBeratAwal] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("JANTAN");
  const [tglLahir, setTglLahir] = useState("");
  const [umur, setUmur] = useState("");
  const [statusHamil, setStatusHamil] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSimpan = async () => {
    if (!nama || !kodeKambing) {
      toast.error("Data harus diisi");
      setErrors({
        nama: !nama ? ["Nama harus diisi"] : [],
        kode_kambing: !kodeKambing ? ["Kode harus diisi"] : [],
      });
      return;
    }

    if (jenisKelamin === "JANTAN" && statusHamil !== "") {
      toast.error("Kambing jantan tidak bisa memiliki status hamil");
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      const res = await fetch("/api/kambing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama,
          kode_kambing: kodeKambing,
          jenis_kambing: jenisHewan,
          beratAwal: parseFloat(beratAwal),
          beratAkhir: parseFloat(beratAwal),
          jenis_hewan: jenisHewan,
          jenis_kelamin: jenisKelamin,
          tgl_lahir: tglLahir,
          umur: parseInt(umur),
          statusHamil: statusHamil || "TIDAK_HAMIL",
          tgl_masuk: new Date().toISOString(),
          userId: session?.user?.id,
          imageUrl: imgUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
          if (data.errors.kode_kambing) {
            toast.error(data.errors.kode_kambing[0]);
          } else {
            toast.error("Mohon periksa kembali data Anda");
          }
        } else {
          toast.error(data.message || "Gagal menambahkan data kambing");
        }
      } else {
        await new Promise((resolve) => setInterval(resolve, 2000));
        toast.success("Berhasil menambahkan data kambing");
        router.push("/kambing");
      }
    } catch {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();
  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <section className="relative z-10 flex flex-col gap-6 md:gap-10 p-5">
      <div className="flex flex-col gap-4">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-neutral-500 hover:text-amber-700 dark:text-neutral-400 dark:hover:text-amber-500 transition-colors w-fit cursor-pointer"
        >
          <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/30 transition-colors">
            <ArrowLeft size={20} />
          </div>
        </button>
        <div className="max-w-xl">
          <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-5xl font-plenty text-neutral-900 dark:text-white">
            Tambah{" "}
            <span className="text-amber-700 dark:text-amber-600">Kambing</span>
          </h1>
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400">
            Kelola data ternak Anda dengan mudah. Tambah, edit, dan pantau
            perkembangan kambing di satu tempat.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-neutral-900 p-6 md:p-8 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {" "}
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
              className={`p-3 rounded-xl border bg-transparent text-neutral-900 dark:text-white placeholder:text-neutral-500/60 dark:placeholder:text-neutral-400 focus:ring-2 outline-none transition-all  ${
                errors.nama?.length
                  ? "border-red-500 focus:ring-red-500/30"
                  : "border-neutral-300 dark:border-neutral-700 focus:ring-amber-500"
              }`}
            />
            {errors.nama && (
              <span className="text-xs text-red-500">{errors.nama[0]}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Kode Kambing
            </label>
            <input
              type="text"
              value={kodeKambing}
              onChange={(e) => {
                setKodeKambing(e.target.value);
                if (errors.kode_kambing)
                  setErrors({ ...errors, kode_kambing: [] });
              }}
              placeholder="Contoh: KMB-001"
              className={`p-3 rounded-xl border bg-transparent text-neutral-900 dark:text-white placeholder:text-neutral-500/60 dark:placeholder:text-neutral-400 focus:ring-2 outline-none transition-all ${
                errors.kode_kambing?.length
                  ? "border-red-500 focus:ring-red-500/30"
                  : "border-neutral-300 dark:border-neutral-700 focus:ring-amber-500"
              }`}
            />
            {errors.kode_kambing && (
              <span className="text-xs text-red-500">
                {errors.kode_kambing[0]}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Jenis Hewan
            </label>
            <select
              value={jenisHewan}
              onChange={(e) => setJenisHewan(e.target.value)}
              className="p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none cursor-pointer"
            >
              <option value="KAMBING" className="bg-white dark:bg-neutral-900">
                Kambing
              </option>
              <option value="DOMBA" className="bg-white dark:bg-neutral-900">
                Domba
              </option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Berat Awal (kg)
            </label>
            <input
              type="number"
              value={beratAwal}
              onChange={(e) => {
                setBeratAwal(e.target.value);
                if (errors.beratAwal) setErrors({ ...errors, beratAwal: [] });
              }}
              placeholder="0"
              className={`p-3 rounded-xl border bg-transparent text-neutral-900 dark:text-white placeholder:text-neutral-500/60 dark:placeholder:text-neutral-400 focus:ring-2 outline-none transition-all ${
                errors.beratAwal?.length
                  ? "border-red-500 focus:ring-red-500/30"
                  : "border-neutral-300 dark:border-neutral-700 focus:ring-amber-500"
              }`}
            />
            {errors.beratAwal && (
              <span className="text-xs text-red-500 text-[10px] md:text-xs">
                {errors.beratAwal[0]}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Foto Kambing
            </label>
            <div className="relative group border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl py-15 flex flex-col items-center justify-center gap-2 hover:border-amber-600 transition-colors cursor-pointer bg-neutral-50 dark:bg-neutral-800/50">
              <input
                type="file"
                accept="image/*"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                <Plus size={24} />
                <span className="text-sm">Klik atau seret foto ke sini</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Tanggal Lahir
            </label>
            <input
              type="date"
              value={tglLahir}
              onChange={(e) => {
                setTglLahir(e.target.value);
                if (errors.tgl_lahir) setErrors({ ...errors, tgl_lahir: [] });
              }}
              className={`p-3 rounded-xl border bg-transparent text-neutral-900 dark:text-white focus:ring-2 outline-none transition-all  ${
                errors.tgl_lahir?.length
                  ? "border-red-500 focus:ring-red-500/30"
                  : "border-neutral-300 dark:border-neutral-700 focus:ring-amber-500"
              }`}
            />
            {errors.tgl_lahir && (
              <span className="text-xs text-red-500">
                {errors.tgl_lahir[0]}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Umur (Bulan)
            </label>
            <input
              type="number"
              value={umur}
              onChange={(e) => {
                setUmur(e.target.value);
                if (errors.umur) setErrors({ ...errors, umur: [] });
              }}
              placeholder="0"
              className={`p-3 rounded-xl border bg-transparent text-neutral-900 dark:text-white placeholder:text-neutral-500/60 dark:placeholder:text-neutral-400 focus:ring-2 outline-none transition-all ${
                errors.umur?.length
                  ? "border-red-500 focus:ring-red-500/30"
                  : "border-neutral-300 dark:border-neutral-700 focus:ring-amber-500"
              }`}
            />
            {errors.umur && (
              <span className="text-xs text-red-500">{errors.umur[0]}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Status Hamil (Khusus Betina)
            </label>
            <select
              value={statusHamil}
              onChange={(e) => setStatusHamil(e.target.value)}
              className={`${jenisKelamin === "JANTAN" ? "bg-neutral-100 dark:bg-neutral-800 opacity-50 cursor-not-allowed" : "cursor-pointer"} p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none`}
              disabled={jenisKelamin === "JANTAN"}
            >
              <option
                value="TIDAK_HAMIL"
                className="bg-white dark:bg-neutral-900"
              >
                Tidak Hamil
              </option>
              <option value="HAMIL" className="bg-white dark:bg-neutral-900">
                Hamil
              </option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Jenis Kelamin
            </label>
            <select
              value={jenisKelamin}
              onChange={(e) => {
                const value = e.target.value;
                setJenisKelamin(value);

                if (value == "JANTAN") {
                  setStatusHamil("");
                }
              }}
              className="p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none cursor-pointer"
            >
              <option value="JANTAN" className="bg-white dark:bg-neutral-900">
                Jantan
              </option>
              <option value="BETINA" className="bg-white dark:bg-neutral-900">
                Betina
              </option>
            </select>
          </div>
          <button
            onClick={handleSimpan}
            disabled={loading}
            className="mt-auto h-14 flex items-center justify-center cursor-pointer bg-amber-700 text-white rounded-xl font-bold hover:bg-amber-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-amber-900/20 active:scale-[0.98] gap-2  "
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full w-5 h-5 border-2 border-white/30 border-t-white"></div>
                <span>Menyimpan...</span>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-5">
                <Plus size={25} />
                <span className="mt-1">Tambah Data Kambing</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreatePageKambing;
