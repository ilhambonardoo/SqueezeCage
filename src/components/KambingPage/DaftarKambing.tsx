"use client";
import { useMounted } from "@/src/hooks/useMounted";
import { Edit, Plus, Trash, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Kambing } from "@/src/generated/prisma/client";
import { useKambing } from "@/src/hooks/useKambing";
import { useSearchPagination } from "@/src/hooks/useSearchPagination";
import SearchInput from "../utils/SearchInput";
import Pagination from "../utils/Pagination";

const DaftarKambing = () => {
  const { dataKambing, isLoading, errors, deleteKambing } = useKambing();
  const {
    searchTerm,
    onSearchChange,
    currentItems,
    currentPage,
    totalPages,
    startIndex,
    setCurrentPage,
    filteredData,
  } = useSearchPagination(dataKambing, 10, [
    "kode_kambing",
    "nama",
    "jenis_hewan",
    "jenis_kelamin",
  ]);

  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (confirm("Apakah anda yaking ingin menghapus data ini?"))
      await deleteKambing(id);
  };

  const handleUpdate = async (id: string) => {
    router.push(`/kambing/edit/${id}`);
  };

  const mounted = useMounted();
  if (!mounted) return null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (errors) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 gap-4">
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-center max-w-md">
          <p className="font-bold mb-2">Terjadi Kesalahan</p>
          <p className="text-sm">
            Gagal memuat data kambing. Silakan coba segarkan halaman atau
            hubungi admin.
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-semibold hover:opacity-80 transition-all cursor-pointer"
        >
          Segarkan Halaman
        </button>
      </div>
    );
  }

  return (
    <>
      <section>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="max-w-xl ml-5 mt-15">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl font-plenty text-neutral-900 dark:text-white">
              Daftar{" "}
              <span className="text-amber-700 dark:text-amber-600">
                Kambing
              </span>
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Kelola data ternak Anda dengan mudah. Tambah, edit, dan pantau
              perkembangan kambing di satu tempat.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-end items-end sm:items-center gap-4 mb-6 sm:mb-10 mr-5">
          <SearchInput
            onChange={onSearchChange}
            value={searchTerm}
            placeholder="Cari kambing...."
          />

          <button
            onClick={() => router.push("/kambing/create")}
            className="w-1/2 mt-10 mb-5 sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl transition-colors text-sm font-semibold cursor-pointer shadow-sm"
          >
            <Plus size={18} />
            Tambah Kambing
          </button>
        </div>
        <div className="mx-5 mb-10 overflow-hidden rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm dark:shadow-none">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-800 text-sm">
              <thead className="bg-gray-50 dark:bg-neutral-800/50">
                <tr>
                  <th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-neutral-200 whitespace-nowrap">
                    Kode
                  </th>
                  <th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-neutral-200 whitespace-nowrap">
                    Nama
                  </th>
                  <th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-neutral-200 whitespace-nowrap">
                    Jenis
                  </th>
                  <th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-neutral-200 whitespace-nowrap">
                    Foto
                  </th>
                  <th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-neutral-200 whitespace-nowrap">
                    Berat Awal (kg)
                  </th>
                  <th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-neutral-200 whitespace-nowrap">
                    Berat Sekarang (kg)
                  </th>
                  <th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-neutral-200 whitespace-nowrap">
                    Jenis Kelamin
                  </th>
                  <th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-neutral-200 whitespace-nowrap">
                    Tgl Masuk
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-gray-900 dark:text-neutral-200 whitespace-nowrap">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-800">
                {currentItems.map((item: Kambing) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors"
                  >
                    <td className="px-4 py-4 text-gray-600 dark:text-neutral-400 whitespace-nowrap">
                      {item.kode_kambing}
                    </td>

                    <td className="px-4 py-4 font-semibold text-gray-900 dark:text-neutral-200 whitespace-nowrap">
                      {item.nama}
                    </td>

                    <td className="px-4 py-4 text-gray-600 dark:text-neutral-400 whitespace-nowrap">
                      {item.jenis_hewan}
                    </td>
                    <td className="px-4 py-4">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.nama}
                          width={400}
                          height={400}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-neutral-800 flex items-center justify-center text-gray-400">
                          <Plus size={16} />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 text-gray-600 dark:text-neutral-400 whitespace-nowrap">
                      {item.beratAwal}
                    </td>
                    <td className="px-4 py-4 text-gray-600 dark:text-neutral-400 whitespace-nowrap">
                      {item.beratAkhir}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          item.jenis_kelamin === "JANTAN"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                            : "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400 border border-pink-200 dark:border-pink-800"
                        }`}
                      >
                        {item.jenis_kelamin}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-600 dark:text-neutral-400 whitespace-nowrap">
                      {new Date(item.tgl_Masuk).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-4 py-4 text-center whitespace-nowrap">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => router.push(`/kambing/${item.id}`)}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/20 rounded-lg transition-colors cursor-pointer"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-lg transition-colors cursor-pointer"
                          onClick={() => handleUpdate(item.id)}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          endIndex={startIndex + 10}
          startIndex={startIndex}
          onPageChange={setCurrentPage}
          totalData={filteredData.length}
          totalPages={totalPages}
        />
      </section>
    </>
  );
};

export default DaftarKambing;
