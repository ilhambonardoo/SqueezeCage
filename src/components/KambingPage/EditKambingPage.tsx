"use client";

import { useMounted } from "@/src/hooks/useMounted";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { KambingForm } from "@/src/components/KambingPage/KambingForm";
import { KambingModel } from "@/src/interface/kambing";
import { Kambing } from "@/src/generated/prisma/client";
import { useUploadThing } from "@/src/hooks/useUploadthing";

interface EditKambingPageProps {
  id: string;
}

const EditKambingPage = ({ id }: EditKambingPageProps) => {
  const router = useRouter();
  const mounted = useMounted();
  const [initialData, setInitialData] = useState<KambingModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const { startUpload } = useUploadThing("imageUploader", {
    onUploadError: (error: Error) => {
      toast.error(`Gagal mengunggah foto kambing : ${error.message}`);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/kambing/${id}`);
        if (!res.ok) throw new Error("Gagal mengambil data");
        const data = await res.json();
        setInitialData(data);
      } catch {
        toast.error("Gagal mengambil data kambing");
        router.push("/kambing");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, router]);

  const handleUpdate = async (
    formData: Kambing,
    selecetedFile: File | null,
    isImageRemoved: boolean,
  ) => {
    setUpdating(true);
    try {
      let finalImageUrl = initialData?.imageUrl || null;
      let finalImageKey = initialData?.imageKey || null;
      let oldImageKeyToDelete = null;

      if (selecetedFile) {
        if (initialData?.imageKey) {
          oldImageKeyToDelete = initialData.imageKey;
        }

        const uploadRes = await startUpload([selecetedFile]);
        if (uploadRes && uploadRes[0]) {
          finalImageUrl = uploadRes[0].ufsUrl;
          finalImageKey = uploadRes[0].key;
        } else {
          setUpdating(false);
          return;
        }
      } else if (isImageRemoved) {
        if (initialData?.imageKey) {
          oldImageKeyToDelete = initialData.imageKey;
        }
        finalImageUrl = null;
        finalImageKey = null;
      }

      const finalPayload = {
        ...formData,
        imageUrl: finalImageUrl,
        imageKey: finalImageKey,
        oldImageKeyToDelete,
      };

      const res = await fetch(`/api/kambing/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Gagal memperbarui data");
      } else {
        toast.success("Data kambing berhasil diperbarui");
        router.push(`/kambing`);
        router.refresh();
      }
    } catch {
      toast.error("Terjadi Kesalahan Sistem");
    } finally {
      setUpdating(false);
    }
  };

  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
      </div>
    );
  }

  return (
    <section className="relative z-10 flex flex-col gap-6 md:gap-10 p-5">
      <button
        onClick={() => router.back()}
        className="text-neutral-500 cursor-pointer hover:text-amber-700 flex items-center gap-2"
      >
        <ArrowLeft size={20} /> Kembali
      </button>
      <h1 className="text-3xl font-bold font-plenty">
        Edit <span className="text-amber-700">Kambing</span>
      </h1>

      <KambingForm
        initialData={initialData}
        onSubmit={handleUpdate}
        isSubmitting={updating}
        submitLabel="Simpan Perubahan"
      />
    </section>
  );
};

export default EditKambingPage;
