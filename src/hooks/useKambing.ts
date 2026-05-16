"use client";
import { useCallback, useEffect, useState } from "react";
import { Kambing } from "../generated/prisma/client";
import toast from "react-hot-toast";

export function useKambing() {
  const [dataKambing, setDataKambing] = useState<Kambing[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [errors, setErrors] = useState("");

  const getDataKambing = useCallback(async () => {
    try {
      setIsloading(true);
      const res = await fetch("/api/kambing");
      const data = await res.json();

      if (!res.ok) {
        setErrors("Gagal mengambil data");
        return;
      }

      setDataKambing(data);
    } catch {
      setErrors("Terjadi kesalahan pada jaringan!");
    } finally {
      setIsloading(false);
    }
  }, []);

  useEffect(() => {
    getDataKambing();
  }, [getDataKambing]);

  const deleteKambing = async (id: string) => {
    const previousData = [...dataKambing];
    setDataKambing((prev) => prev.filter((kambing) => kambing.id !== id)); // set data kambing ke sebelumnya apa bila kambing id tidak sama dengan id yang dipilih

    try {
      const res = await fetch(`/api/kambing/${id}`, { method: "DELETE" });

      if (!res.ok) {
        setDataKambing(previousData);
        const errorData = await res.json();
        toast.error(errorData.message || "Gagal menghapus data!");
        return { success: false };
      }
      toast.success("Berhasil menghapus data!");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return { success: true };
    } catch {
      setDataKambing(previousData);
      toast.error("Terjadi kesalahan pada jaringan!");
      return { success: false };
    }
  };

  return {
    dataKambing,
    isLoading,
    errors,
    getDataKambing,
    deleteKambing,
  };
}
