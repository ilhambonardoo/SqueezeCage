import { KandangWithSekat } from "@/src/interface/kandang-sekat";
import { Edit, Home, Layers, Trash } from "lucide-react";

export function KandangTable({
  data = [],
  isLoading,
  onEditClick,
  onDeleteClick,
  emptyMessage = "Belum ada bangunan kandang.",
}: {
  data: KandangWithSekat[];
  isLoading: boolean;
  onEditClick: (id: string, name: string) => void;
  onDeleteClick: (id: string, name: string) => void;
  emptyMessage?: string;
}) {
  if (isLoading)
    return (
      <div className="text-center p-4 text-sm text-neutral-500">
        Memuat data kandang...
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
            <th className="p-4">Nama Kandang</th>
            <th className="p-4 text-center">Jumlah Sekat</th>
            <th className="p-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 text-sm text-neutral-700 dark:text-neutral-300">
          {data.map((kandang) => (
            <tr
              key={kandang.id}
              className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors"
            >
              <td className="p-4 font-medium flex items-center gap-3">
                <div className="p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-500 rounded-lg">
                  <Home size={16} />
                </div>
                {kandang.nama}
              </td>
              <td className="p-4 text-center font-semibold text-neutral-500">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                  <Layers size={12} />
                  {kandang.sekatList?.length || 0} Sekat
                </span>
              </td>
              <td className="p-4 text-center">
                <button
                  onClick={() => onEditClick(kandang.id, kandang.nama)}
                  className="p-2 text-blue-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors cursor-pointer"
                  title="Edit Kandang"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDeleteClick(kandang.id, kandang.nama)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors cursor-pointer"
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
