import { useCallback, useEffect, useState } from "react";
import { UserModel } from "../interface/auth";
import toast from "react-hot-toast";

export function UseUser() {
  const [dataUser, setDataUser] = useState<UserModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getDataUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/users");
      const users = await res.json();

      if (!res.ok) {
        const message = users.message || "Gagal mengambil data";
        setError(message);
        toast.error(message);
        return null;
      }

      setDataUser(users);
    } catch {
      setError("Terjadi kesalahan pada jaringan");
      toast.error("Terjadi kesalahan pada jaringan");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getDataUser();
  }, [getDataUser]);

  const deleteUser = async (id: string) => {
    const previousData = [...dataUser];
    setDataUser((prev) => prev.filter((user) => user.id !== id));
    try {
      setIsLoading(true);
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        setDataUser(previousData);
        const errorData = await res.json();
        toast.error(errorData.message || "Gagal menghapus user");
        return { success: false };
      }

      toast.success("User berhasil dihapus");
      return { success: true };
    } catch {
      toast.error("Terjadi kesalahan pada jaringan");
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return { dataUser, isLoading, error, getDataUser, deleteUser };
}
