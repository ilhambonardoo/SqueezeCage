"use client";
import { useState } from "react";
import { useKandang } from "@/src/hooks/useKandang";
import { useSekat } from "@/src/hooks/useSekat";
import { KandangTable } from "@/src/components/Kandang/KandangTable";
import { SekatTable } from "@/src/components/Kandang/SekatTable";
import { Home, Layers, Plus, Save } from "lucide-react";
import toast from "react-hot-toast";
import { SekatWithKandang } from "@/src/interface/kandang-sekat";
import { useMounted } from "@/src/hooks/useMounted";
import { useSearchPagination } from "@/src/hooks/useSearchPagination";
import SearchInput from "../utils/SearchInput";
import Pagination from "../utils/Pagination";
import ConfirmDeleteDialog from "../utils/ConfirmDeleteDialog";

const KandangForm = () => {
  const mounted = useMounted();

  // Untuk custom hook useKandang dan useSekat
  const {
    dataKandang,
    isLoading: loadKandang,
    isSubmitting: subKandang,
    createDataKandangNew,
    deleteDataKandang,
  } = useKandang();
  const {
    dataSekat,
    isLoading: loadSekat,
    isSubmitting: subSekat,
    createDataSekatNew,
    deleteDataSekat,
  } = useSekat();

  // Untuk search dan pagination tabel
  const {
    searchTerm: searchKandang,
    onSearchChange: onSearchKandangChange,
    currentItems: currentKandangItems,
    currentPage: currentKandangPage,
    totalPages: totalKandangPages,
    startIndex: startKandangIndex,
    setCurrentPage: setCurrentKandangPage,
    filteredData: filteredKandangData,
  } = useSearchPagination(dataKandang, 10, ["nama"]);

  const {
    searchTerm: searchSekat,
    onSearchChange: onSearchSekatChange,
    currentItems: currentSekatItems,
    currentPage: currentSekatPage,
    totalPages: totalSekatPages,
    startIndex: startSekatIndex,
    setCurrentPage: setCurrentSekatPage,
    filteredData: filteredSekatData,
  } = useSearchPagination(dataSekat as SekatWithKandang[], 10, [
    "kodeSekat",
    "keteranganSekat",
  ]);

  // State basic
  const [namaKandang, setNamaKandang] = useState("");
  const [kodeSekat, setKodeSekat] = useState("");
  const [keteranganSekat, setKeteranganSekat] = useState<"INDIVIDU" | "KOLONI">(
    "INDIVIDU",
  );
  const [kandangId, setKandangId] = useState("");
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    id: string;
    name: string;
    type: "KANDANG" | "SEKAT";
  }>({
    open: false,
    id: "",
    name: "",
    type: "KANDANG",
  });

  // Handle basic create dan delete
  const handleKandangSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaKandang.trim())
      return toast.error("Nama kandang tidak boleh kosong");

    const success = await createDataKandangNew(namaKandang);
    if (success) setNamaKandang("");
  };

  const handleSekatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kodeSekat.trim() || !kandangId)
      return toast.error("Semua kolom sekat wajib diisi");

    const success = await createDataSekatNew({
      kodeSekat,
      keteranganSekat,
      kandangId,
    });
    if (success) {
      setKodeSekat("");
    }
  };

  const handleConfirmDelete = async () => {
    if (deleteModal.type === "KANDANG") {
      const success = await deleteDataKandang(deleteModal.id);

      if (success) {
        toast.success(`Berhasil menghapus data ${deleteModal.name}`);
        setDeleteModal((prev) => ({ ...prev, open: false }));
      } else {
        toast.error(`Gagal menghapus data ${deleteModal.name}`);
      }
    }

    if (deleteModal.type === "SEKAT") {
      const success = await deleteDataSekat(deleteModal.id);
      if (success) {
        toast.success(`Berhasil menghapus data ${deleteModal.name}`);

        setDeleteModal((prev) => ({ ...prev, open: false }));
      } else {
        toast.error(`Gagal menghapus data ${deleteModal.name}`);
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="p-4 sm:p-6 md:p-13 pt-15 w-full mx-auto flex flex-col gap-8 min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      {/* HEADER PAGE */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight">
          Manajemen Area Kandang
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          Kelola master data bangunan kandang dan batas sekat internal
          peternakan.
        </p>
      </div>

      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col md:flex-row w-full items-stretch gap-6">
          {/* FORM KANDANG */}
          <form
            onSubmit={handleKandangSubmit}
            className="p-6 bg-white min-h-88 md:h-87.5 w-full md:w-1/2 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-md flex flex-col justify-between gap-4"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 font-bold text-base text-neutral-800 dark:text-neutral-200">
                  <Home size={18} className="text-amber-700" />
                  <h2>Tambah Bangunan Kandang Baru</h2>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Buat lokasi kandang untuk menampung sejumlah sekat.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-neutral-500">
                  Nama Lokasi/Gedung Kandang
                </label>
                <input
                  type="text"
                  value={namaKandang}
                  onChange={(e) => setNamaKandang(e.target.value)}
                  placeholder="Contoh: Kandang Penggemukan B"
                  className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-xl bg-transparent outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm placeholder:text-neutral-400"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={subKandang}
              className="w-full h-11 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-colors cursor-pointer mt-auto"
            >
              <Plus size={16} />
              <span>{subKandang ? "Menyimpan..." : "Buat Kandang"}</span>
            </button>
          </form>

          {/* FORM SEKAT */}
          <form
            onSubmit={handleSekatSubmit}
            className="p-6 bg-white min-h-88 md:h-87.5 w-full md:w-1/2 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-md flex flex-col justify-between gap-4"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 font-bold text-base text-neutral-800 dark:text-neutral-200">
                  <Layers size={18} className="text-amber-700" />
                  <h2>Tambah Batas Sekat Ruangan</h2>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Tambahkan pembatas ruangan dan hubungkan ke kandang induk.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-neutral-500">
                  Hubungkan ke Kandang Induk
                </label>
                <select
                  value={kandangId}
                  onChange={(e) => setKandangId(e.target.value)}
                  className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-xl bg-transparent dark:bg-neutral-900 outline-none text-sm focus:ring-2 focus:ring-amber-500 placeholder:text-neutral-400"
                >
                  <option value="" disabled hidden>
                    -- Pilih Kandang Penampung --
                  </option>
                  {dataKandang.map((k) => (
                    <option key={k.id} value={k.id}>
                      {k.nama}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-neutral-500">
                    Kode Ruang Sekat
                  </label>
                  <input
                    type="text"
                    value={kodeSekat}
                    onChange={(e) => setKodeSekat(e.target.value)}
                    placeholder="Contoh: SKT-A01"
                    className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-xl bg-transparent outline-none text-sm focus:ring-2 focus:ring-amber-500 placeholder:text-neutral-400"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-neutral-500">
                    Kapasitas Keterangan
                  </label>
                  <select
                    value={keteranganSekat}
                    onChange={(e) =>
                      setKeteranganSekat(
                        e.target.value as "INDIVIDU" | "KOLONI",
                      )
                    }
                    className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-xl bg-transparent dark:bg-neutral-900 outline-none text-sm"
                  >
                    <option value="INDIVIDU">Individu (1 Ekor)</option>
                    <option value="KOLONI">Koloni (Grup/Banyak)</option>
                  </select>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={subSekat || !kandangId}
              className="w-full h-11 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-colors cursor-pointer mt-auto"
            >
              <Save size={16} />
              <span>{subSekat ? "Menyimpan..." : "Simpan Sekat"}</span>
            </button>
          </form>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-6 py-4 md:py-10">
          {/* TABEL DAFTAR KANDANG */}
          <div className="flex flex-col w-full md:w-1/2 gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Daftar Gedung Kandang
                </h3>
              </div>
              <SearchInput
                value={searchKandang}
                onChange={onSearchKandangChange}
                placeholder="Cari kandang..."
              />
            </div>
            <KandangTable
              data={currentKandangItems}
              isLoading={loadKandang}
              emptyMessage={
                searchKandang
                  ? "Tidak ada kandang yang cocok dengan pencarian Anda."
                  : "Belum ada bangunan kandang."
              }
              onDeleteClick={(id, name) =>
                setDeleteModal({
                  open: true,
                  id,
                  name,
                  type: "KANDANG",
                })
              }
            />
            <Pagination
              currentPage={currentKandangPage}
              endIndex={startKandangIndex + currentKandangItems.length}
              startIndex={startKandangIndex}
              onPageChange={setCurrentKandangPage}
              totalData={filteredKandangData.length}
              totalPages={totalKandangPages}
            />
          </div>

          {/* TABEL DAFTAR SEKAT */}
          <div className="flex flex-col w-full md:w-1/2 gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Daftar Sekat Aktif
                </h3>
              </div>
              <div>
                <SearchInput
                  value={searchSekat}
                  onChange={onSearchSekatChange}
                  placeholder="Cari sekat"
                />
              </div>
            </div>

            <SekatTable
              data={currentSekatItems}
              isLoading={loadSekat}
              onDeleteClick={(id, name) =>
                setDeleteModal({
                  open: true,
                  id,
                  name,
                  type: "SEKAT",
                })
              }
              emptyMessage={
                searchSekat
                  ? "Tidak ada sekat yang cocok dengan pencarian Anda."
                  : "Belum ada sekat."
              }
            />

            <Pagination
              currentPage={currentSekatPage}
              endIndex={startSekatIndex + currentSekatItems.length}
              startIndex={startSekatIndex}
              onPageChange={setCurrentSekatPage}
              totalData={filteredSekatData.length}
              totalPages={totalSekatPages}
            />
          </div>
        </div>
      </div>

      <ConfirmDeleteDialog
        open={deleteModal.open}
        title={
          deleteModal.type === "KANDANG"
            ? "Hapus Gedung Kandang"
            : "Hapus Batas Sekat"
        }
        description={
          deleteModal.type === "KANDANG"
            ? "Apakah Anda yakin ingin menghapus kandang ini? Semua sekat di dalamnya juga akan ikut terhapus otomatis."
            : "Apakah Anda yakin ingin menghapus sekat ruangan ini?"
        }
        itemName={deleteModal.name}
        loading={subKandang} // Mengikuti state loading submit/proses hapus dari hook
        onClose={() => setDeleteModal((prev) => ({ ...prev, open: false }))}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default KandangForm;
