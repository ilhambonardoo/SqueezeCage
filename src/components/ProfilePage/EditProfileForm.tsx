"use client";

import { useState } from "react";
import { User, Mail, AtSign, Camera, Save, X, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useUploadThing } from "@/src/hooks/useUploadthing";

interface EditProfileFormProps {
  onClose: () => void;
}

const EditProfileForm = ({ onClose }: EditProfileFormProps) => {
  const { data: session, update } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(
    session?.user?.image || null,
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    nama: session?.user?.nama || "",
    username: session?.user?.username || "",
    email: session?.user?.email || "",
  });

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {},
    onUploadError: (error: Error) => {
      toast.error(`Gagal mengunggah foto: ${error.message}`);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setSelectedFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = session?.user?.image;

      // 1. Upload image if selected
      if (selectedFile) {
        const uploadRes = await startUpload([selectedFile]);
        if (uploadRes && uploadRes[0]) {
          imageUrl = uploadRes[0].ufsUrl;
        }
      } else if (previewImage === null) {
        imageUrl = null;
      }

      // 2. Update user profile
      const response = await fetch(`/api/users/${session?.user?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal memperbarui profil");
      }

      // 3. Update session
      await update({
        nama: formData.nama,
        username: formData.username,
        email: formData.email,
        image: imageUrl,
      });

      toast.success("Profil berhasil diperbarui!");
      onClose();
    } catch {
      toast.error("Gagal memperbarui profil");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 lg:p-8 border border-neutral-200 dark:border-neutral-800 shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
            Edit Profil
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Perbarui informasi akun Anda di sini.
          </p>
        </div>
        <button
          onClick={onClose}
          type="button"
          className="p-2 hover:bg-neutral-100 cursor-pointer dark:hover:bg-neutral-800 rounded-full transition-colors text-neutral-500"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Upload Preview */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-amber-500/20 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
              {previewImage && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute cursor-pointer -top-1 -right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-all z-10"
                >
                  <Trash2 size={14} />
                </button>
              )}
              {previewImage ? (
                <Image
                  src={previewImage}
                  alt="Avatar"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  unoptimized={previewImage?.startsWith("data:")}
                />
              ) : (
                <User size={48} className="text-neutral-400" />
              )}
            </div>
            <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer">
              <Camera size={20} className="text-white" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <p className="text-xs text-neutral-500 mt-2">Klik untuk ganti foto</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
              Nama Lengkap
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                size={18}
              />
              <input
                type="text"
                required
                value={formData.nama}
                onChange={(e) =>
                  setFormData({ ...formData, nama: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="Nama Lengkap"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
              Username
            </label>
            <div className="relative">
              <AtSign
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                size={18}
              />
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="username"
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
              Alamat Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                size={18}
              />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="email@example.com"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 cursor-pointer text-neutral-600 dark:text-neutral-400 font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-all"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-2.5 bg-amber-700 cursor-pointer hover:bg-amber-800 text-white rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full w-4 h-4 border-2 border-white/30 border-t-white" />
                <span>Menyimpan...</span>
              </div>
            ) : (
              <>
                <Save size={18} />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
