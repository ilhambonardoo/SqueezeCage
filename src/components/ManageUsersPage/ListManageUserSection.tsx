"use client";
import { Edit, Trash, User as UserIcon } from "lucide-react";
import { useMounted } from "@/src/hooks/useMounted";
import { UseUser } from "@/src/hooks/useUser";
import { useRouter } from "next/navigation";
import { UserModel } from "@/src/interface/auth";
import { Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SearchInput from "../utils/SearchInput";
import { useSearchPagination } from "@/src/hooks/useSearchPagination";
import Pagination from "../utils/Pagination";

const ManageUserSection = () => {
  const mounted = useMounted();
  const router = useRouter();

  const { dataUser, isLoading, error, deleteUser } = UseUser();
  const {
    onSearchChange,
    currentItems,
    currentPage,
    filteredData,
    searchTerm,
    setCurrentPage,
    startIndex,
    totalPages,
  } = useSearchPagination(dataUser, 10, ["email", "nama", "role", "username"]);

  const handleDelete = async (id: string) => {
    if (confirm("Apakah anda yakin ingin menghapus user ini?")) {
      await deleteUser(id);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/users/edit/${id}`);
  };

  if (!mounted) return null;

  if (isLoading) {
    return (
      <div className="mx-5 mb-10 overflow-hidden rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm p-20 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-amber-600/20 border-t-amber-600 rounded-full animate-spin"></div>
        <p className="text-neutral-500 animate-pulse text-sm">
          Memuat data user...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-5 mb-10 overflow-hidden rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 p-10 flex flex-col items-center justify-center gap-3 text-center">
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
          <Trash size={24} />
        </div>
        <div>
          <h3 className="text-red-800 dark:text-red-400 font-bold">
            Gagal memuat data
          </h3>
          <p className="text-red-600/80 dark:text-red-400/60 text-sm mt-1">
            {error}
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-end items-end sm:items-center gap-4 mb-6 sm:mb-10 mr-5">
        <SearchInput
          onChange={onSearchChange}
          value={searchTerm}
          placeholder="Cari data user...."
        />
        <Link
          href="/users/create"
          className="w-1/2 mt-10 mb-5 sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl transition-colors text-sm font-semibold cursor-pointer shadow-sm"
        >
          <Plus size={18} />
          Tambah User
        </Link>
      </div>
      <div className="mx-5 mb-10 overflow-hidden rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm dark:shadow-none">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-800 text-sm">
            <thead className="bg-gray-50 dark:bg-neutral-800/50">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-neutral-200 whitespace-nowrap">
                  Profil
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-neutral-200 whitespace-nowrap">
                  Username
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-neutral-200 whitespace-nowrap">
                  Email
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-neutral-200 whitespace-nowrap">
                  Role
                </th>
                <th className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-neutral-200 whitespace-nowrap">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-800">
              {currentItems.map((user: UserModel) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 border border-amber-500/20">
                        {user.image ? (
                          <Image
                            src={user.image}
                            alt={user.nama}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <UserIcon size={20} />
                        )}
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-neutral-200">
                        {user.nama}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-neutral-400 whitespace-nowrap">
                    @{user.username}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-neutral-400 whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                        user.role === "ADMIN"
                          ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                          : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors cursor-pointer"
                        title="Edit User"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer"
                        title="Hapus User"
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
        onPageChange={setCurrentPage}
        startIndex={startIndex}
        totalPages={totalPages}
        totalData={filteredData.length}
      />
    </>
  );
};

export default ManageUserSection;
