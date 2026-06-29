import { SekatWithKandang } from "@/src/interface/kandang-sekat";
import { Edit, Layers, Trash } from "lucide-react";

export function SekatTable({
  data = [],
  isLoading,
  onEditClick,
  onDeleteClick,
  emptyMessage,
}: {
  data: SekatWithKandang[];
  isLoading: boolean;
  onEditClick: (sekat: SekatWithKandang) => void;
  onDeleteClick: (id: string, name: string) => void;
  emptyMessage?: string;
}) {
  if (isLoading)
    return (
      <div className="text-center p-4 text-sm text-neutral-500">
        Memuat data sekat...
      </div>
    );
  if (data.length === 0)
    return (
      <div className="text-center p-4 text-sm text-neutral-400 border border-dashed rounded-xl">
        {emptyMessage}
      </div>
    );

  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-neutral-50 dark:bg-neutral-800/50 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase border-b border-neutral-200 dark:border-neutral-800">
            <th className="p-4">Kode Sekat</th>
            <th className="p-4">Kandang Induk</th>
            <th className="p-4">Tipe Sekat</th>
            <th className=" text-center p-4">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 text-sm text-neutral-700 dark:text-neutral-300">
          {data.map((sekat) => (
            <tr
              key={sekat.id}
              className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors"
            >
              <td className="p-4 font-bold flex items-center gap-3 text-amber-700 dark:text-amber-500">
                <div className="p-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 rounded-lg">
                  <Layers size={16} />
                </div>
                {sekat.kodeSekat}
              </td>
              <td className="p-4 font-medium">
                {sekat.kandang?.nama || "Tidak Diketahui"}
              </td>
              <td className="p-4">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    sekat.keteranganSekat === "INDIVIDU"
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                      : "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
                  }`}
                >
                  {sekat.keteranganSekat}
                </span>
              </td>

              <td className="p-4 text-center">
                <button
                  onClick={() => onEditClick(sekat)}
                  className="p-2 text-blue-400  hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors cursor-pointer"
                  title="Edit sekat"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDeleteClick(sekat.id, sekat.kodeSekat)}
                  className="p-2 text-red-600  hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors cursor-pointer"
                  title="Hapus Kandang"
                >
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
