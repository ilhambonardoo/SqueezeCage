"use client";
import { useState } from "react";
import { Layers, Save, X } from "lucide-react";
import { EditSekatModalProps } from "@/src/interface/kandang-sekat";

export function EditSekatModal({
  isOpen,
  onClose,
  onSave,
  isSubmitting,
  dataKandang,
  initialData,
}: EditSekatModalProps) {
  const [kodeSekat, setKodeSekat] = useState(initialData?.kodeSekat ?? "");
  const [keteranganSekat, setKeteranganSekat] = useState<"INDIVIDU" | "KOLONI">(
    initialData?.keteranganSekat ?? "INDIVIDU",
  );
  const [kandangId, setKandangId] = useState(initialData?.kandangId ?? "");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl rounded-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers size={18} className="text-amber-700" />
            <h3 className="font-bold text-base">Ubah Data Ruang Sekat</h3>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 cursor-pointer hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave({ kodeSekat, keteranganSekat, kandangId });
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-neutral-500">
              Pindahkan ke Kandang Induk
            </label>
            <select
              value={kandangId}
              onChange={(e) => setKandangId(e.target.value)}
              className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-xl bg-transparent dark:bg-neutral-900 outline-none text-sm focus:ring-2 focus:ring-amber-500"
            >
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
                className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-xl bg-transparent outline-none text-sm focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-neutral-500">
                Kapasitas Keterangan
              </label>
              <select
                value={keteranganSekat}
                onChange={(e) =>
                  setKeteranganSekat(e.target.value as "INDIVIDU" | "KOLONI")
                }
                className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-xl bg-transparent dark:bg-neutral-900 outline-none text-sm focus:ring-2 focus:ring-amber-500"
              >
                <option value="INDIVIDU">Individu (1 Ekor)</option>
                <option value="KOLONI">Koloni (Grup/Banyak)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-2 pt-3 border-t border-neutral-100 dark:border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 h-10 border border-neutral-200 cursor-pointer dark:border-neutral-700 rounded-xl text-xs font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 h-10 bg-amber-700 hover:bg-amber-800 cursor-pointer text-white font-bold rounded-xl text-xs flex items-center gap-2 disabled:opacity-50 transition-colors"
            >
              <Save size={14} />
              <span>{isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
