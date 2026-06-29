import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { SekatPayload, SekatWithKandang } from "../interface/kandang-sekat";

export function useSekat() {
  const [dataSekat, setDataSekat] = useState<SekatWithKandang[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState("");

  const isFetched = useRef(false);

  const getDataSekat = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/kandang/sekat");
      const data = await res.json();

      if (!res.ok) {
        setErrors("Gagal mengambil data sekat");
        return;
      }

      setDataSekat(data);
    } catch {
      setErrors("Terjadi kesalahan pada jaringan");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;

    getDataSekat();
  }, [getDataSekat]);

  const createDataSekatNew = async (payload: SekatPayload) => {
    try {
      setIsSubmitting(true);
      const res = await fetch("/api/kandang/sekat", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Gagal membuat sekat!");
        return { success: false };
      } else {
        toast.success("Sekat berhasil dibuat!");
      }

      await getDataSekat();
      return { success: true };
    } catch {
      setErrors("Terjadi kesalahan pada jaringan");
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateSekat = async (id: string, payload: SekatPayload) => {
    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/kandang/sekat/${id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || " Gagal merubah data kandang!");
        return { success: false };
      } else {
        toast.success("Sekat berhasil diubah!");
      }

      await getDataSekat();
      return { success: true };
    } catch {
      toast.error("Terjadi kesalahan jaringan saat menghapus data");
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteDataSekat = async (id: string) => {
    try {
      setIsSubmitting(true);

      const res = await fetch(`/api/kandang/sekat/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Gagal menghapus sekat!");
        return { success: false };
      }

      setDataSekat((prevData) => prevData.filter((item) => item.id !== id));
      return { success: true };
    } catch {
      toast.error("Terjadi kesalahan pada jaringan saat menghapus sekat");
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    dataSekat,
    isLoading,
    isSubmitting,
    errors,
    getDataSekat,
    createDataSekatNew,
    updateSekat,
    deleteDataSekat,
  };
}
