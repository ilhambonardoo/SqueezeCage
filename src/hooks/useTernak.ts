"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Ternak } from "../generated/prisma/client";
import toast from "react-hot-toast";
import { StatsData } from "../interface/ternak";
import { getTernakStats } from "../services/ternak-services";

export function useTernak() {
  const [dataTernak, setDataTernak] = useState<Ternak[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [errors, setErrors] = useState("");
  const [stats, setStats] = useState<StatsData | null>(null);

  const isFetched = useRef(false);

  const getDataTernak = useCallback(async () => {
    try {
      setIsloading(true);
      const res = await fetch("/api/ternak");
      const data = await res.json();

      if (!res.ok) {
        setErrors("Gagal mengambil data");
        return;
      }

      setDataTernak(data);
    } catch {
      setErrors("Terjadi kesalahan pada jaringan!");
    } finally {
      setIsloading(false);
    }
  }, []);

  const getStatsTernak = useCallback(async () => {
    try {
      setIsLoadingStats(true);
      const res = await fetch("/api/ternak/stats", { method: "GET" });
      const data = await res.json();

      if (!res.ok) {
        toast.error("Gagal memuat data ternak");
        return;
      }

      setStats(data);
    } catch {
      toast.error("Terjadi kesalahan pada jaringan");
    } finally {
      setIsLoadingStats(false);
    }
  }, []);

  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;

    const initData = async () => {
      await Promise.all([getDataTernak(), getStatsTernak()]);
    };

    initData();
  }, [getStatsTernak, getDataTernak]);

  const deleteTernak = async (id: string) => {
    const previousData = [...dataTernak];
    const previosStats = stats ? { ...stats } : null;

    setDataTernak((prev) => prev.filter((ternak) => ternak.id !== id)); // set data ternak ke sebelumnya apa bila ternak id tidak sama dengan id yang dipilih

    try {
      const res = await fetch(`/api/ternak/${id}`, { method: "DELETE" });

      if (!res.ok) {
        setDataTernak(previousData);
        setStats(previosStats);
        const errorData = await res.json();
        toast.error(errorData.message || "Gagal menghapus data!");
        return { success: false };
      }
      toast.success("Berhasil menghapus data!");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      getTernakStats();

      return { success: true };
    } catch {
      setDataTernak(previousData);
      toast.error("Terjadi kesalahan pada jaringan!");
      return { success: false };
    }
  };

  return {
    dataTernak,
    stats,
    isLoading: isLoading || isLoadingStats,
    errors,
    getDataTernak,
    getStatsTernak,
    deleteTernak,
  };
}
