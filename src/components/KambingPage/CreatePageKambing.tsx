"use client";

import { useMounted } from "@/src/hooks/useMounted";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { KambingForm } from "@/src/components/KambingPage/KambingForm";
import { Kambing } from "@/src/generated/prisma/client";

const CreatePageKambing = () => {
  const router = useRouter();
  const mounted = useMounted();
  const [loading, setLoading] = useState(false);

  const handleCreateSubmit = async (payload: Kambing) => {
    setLoading(true);
    try {
      const res = await fetch("/api/kambing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        toast.error("Gagal menambahkan data kambing");
      } else {
        localStorage.removeItem("temp_kambing_url_create");
        localStorage.removeItem("temp_kambing_key_create");
        localStorage.removeItem("temp_kambing_deleted_create");
        toast.success("Berhasil menambahkan data kambing");
        router.push("/kambing");
      }
    } catch {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <section className="relative z-10 flex flex-col gap-6 md:gap-10 p-5">
      <button
        onClick={() => router.back()}
        className="text-neutral-500 cursor-pointer hover:text-amber-700 flex items-center gap-2"
      >
        <ArrowLeft size={20} /> Kembali
      </button>
      <h1 className="text-3xl font-bold font-plenty">
        Tambah <span className="text-amber-700">Kambing</span>
      </h1>

      {/* PANGGIL FORM UTAMA */}
      <KambingForm
        onSubmit={handleCreateSubmit}
        isSubmitting={loading}
        submitLabel="Tambah Ternak Baru"
        localStorageKeySuffix="create"
      />
    </section>
  );
};

export default CreatePageKambing;
