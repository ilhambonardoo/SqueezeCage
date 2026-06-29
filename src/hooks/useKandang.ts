import { useCallback, useEffect, useRef, useState } from "react";
import { KandangWithSekat } from "../interface/kandang-sekat";
import toast from "react-hot-toast";

export function useKandang() {
  const [dataKandang, setDataKandang] = useState<KandangWithSekat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmmiting] = useState(false);
  const [errors, setErrors] = useState("");

  const isFetched = useRef(false);

  const getDataKandang = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/kandang");
      const data = await res.json();

      if (!res.ok) {
        setErrors("Gagal mengambil data kandang");
        return;
      }

      setDataKandang(data);
    } catch {
      setErrors("Terjadi kesalahan pada jaringan");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;

    getDataKandang();
  }, [getDataKandang]);

  const createDataKandangNew = async (nama: string) => {
    try {
      setIsSubmmiting(true);
      const res = await fetch("/api/kandang", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ nama }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Gagal membuat kandang!");
        return { success: false };
      } else {
        toast.success("Kandang berhasil dibuat!");
      }
      await getDataKandang();
      return { success: true };
    } catch {
      setErrors("Terjadi kesalahan pada jaringan");
    } finally {
      setIsSubmmiting(false);
    }
  };

  const updateKandang = async (id: string, nama: string) => {
    try {
      setIsSubmmiting(true);
      const res = await fetch(`/api/kandang/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Gagal merubah data kandang!");
        return { success: false };
      } else {
        toast.success("Berhasil merubah data kandang!");
      }

      await getDataKandang();
      return { success: true };
    } catch {
      toast.error("Terjadi kesalahan jaringan saat menghapus data");
      return { success: false };
    } finally {
      setIsSubmmiting(false);
    }
  };

  const deleteDataKandang = async (id: string) => {
    try {
      setIsSubmmiting(true);

      const res = await fetch(`/api/kandang/${id}`, { method: "DELETE" });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Gagal menghapus data kandang");
        return { success: false };
      }

      setDataKandang((prevData) =>
        prevData.filter((kandang) => kandang.id !== id),
      );

      return { success: true };
    } catch {
      toast.error("Terjadi kesalahan jaringan saat menghapus data");
      return { success: false };
    } finally {
      setIsSubmmiting(false);
    }
  };

  return {
    dataKandang,
    isLoading,
    isSubmitting,
    errors,
    getDataKandang,
    createDataKandangNew,
    updateKandang,
    deleteDataKandang,
  };
}
