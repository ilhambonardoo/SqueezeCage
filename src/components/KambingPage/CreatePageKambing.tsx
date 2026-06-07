"use client";

import { useMounted } from "@/src/hooks/useMounted";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { KambingForm } from "@/src/components/KambingPage/KambingForm";
import { Kambing } from "@/src/generated/prisma/client";
import { useUploadThing } from "@/src/hooks/useUploadthing";

const CreatePageKambing = () => {
  const router = useRouter();
  const mounted = useMounted();
  const [loading, setLoading] = useState(false);

  const { startUpload } = useUploadThing("imageUploader", {
    onUploadError: (error: Error) => {
      toast.error(`Gagal mengunggah foto kambing: ${error.message}`);
    },
  });

  const handleCreateSubmit = async (
    formData: Kambing,
    selectedFile: File | null,
    isImageRemoved: boolean,
  ) => {
    setLoading(true);
    try {
      let finalImageUrl = null;
      let finalImagekey = null;

      if (selectedFile && !isImageRemoved) {
        const uploadRes = await startUpload([selectedFile]);
        if (uploadRes && uploadRes[0]) {
          finalImageUrl = uploadRes[0].ufsUrl;
          finalImagekey = uploadRes[0].key;
        } else {
          setLoading(false);
          return;
        }
      }

      const finalPayload = {
        ...formData,
        imageUrl: finalImageUrl,
        imageKey: finalImagekey,
      };

      const res = await fetch("/api/kambing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload),
      });

      if (!res.ok) {
        const errData = await res.json();
        toast.error(errData.message || "Gagal menambahkan data kambing");
      } else {
        toast.success("Berhasil menambahkan data kambing");
        router.push("/kambing");
        router.refresh();
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
      />
    </section>
  );
};

export default CreatePageKambing;
