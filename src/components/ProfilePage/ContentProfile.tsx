"use client";

import { useSession } from "next-auth/react";
import { User, Mail, Shield, Camera, AtSign, Settings2 } from "lucide-react";
import Image from "next/image";
import { useMounted } from "@/src/hooks/useMounted";
import EditProfileForm from "./EditProfileForm";
import { useRouter, useSearchParams } from "next/navigation";

const ContentProfile = () => {
  const { data: session } = useSession();

  const mounted = useMounted();
  const searchParams = useSearchParams();
  const router = useRouter();

  if (!mounted) {
    return null;
  }

  const isEditing = searchParams.get("edit");

  const setIsEditing = (val: boolean) => {
    if (val) {
      router.push("/profile?edit=true");
    } else {
      router.push("/profile");
    }
  };

  if (isEditing) {
    return (
      <div className="mx-5 mb-10">
        <EditProfileForm onClose={() => setIsEditing(false)} />
      </div>
    );
  }

  return (
    <div className="mx-5 mb-10 grid grid-cols-1 lg:flex-col gap-8">
      {/* Kiri: Avatar & Quick Info */}
      <div className=" space-y-6 ">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-amber-500/20 mb-4 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="Avatar"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={64} className="text-neutral-400" />
                )}
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="absolute bottom-4 right-0 p-2 bg-amber-600 text-white rounded-full shadow-lg hover:bg-amber-700 transition-all cursor-pointer"
              >
                <Camera size={16} />
              </button>
            </div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
              {session?.user?.nama || "User"}
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              @{session?.user?.username || "username"}
            </p>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-500 text-xs font-semibold uppercase tracking-wider">
              <Shield size={12} className="mr-1" />
              {session?.user?.role || "OPERATOR"}
            </div>
          </div>
        </div>
      </div>

      {/* Kanan: View Detail */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 lg:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <User size={20} className="text-amber-600" />
              Informasi Pribadi
            </h3>
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-500 rounded-xl text-sm font-bold hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all cursor-pointer"
            >
              <Settings2 size={16} />
              Edit Profil
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-xs font-medium text-neutral-500 dark:text-neutral-500 uppercase">
                Nama Lengkap
              </p>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800">
                <User size={18} className="text-neutral-400" />
                <span className="text-neutral-900 dark:text-white font-medium">
                  {session?.user?.nama || "-"}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium text-neutral-500 dark:text-neutral-500 uppercase">
                Username
              </p>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800">
                <AtSign size={18} className="text-neutral-400" />
                <span className="text-neutral-900 dark:text-white font-medium">
                  {session?.user?.username || "-"}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium text-neutral-500 dark:text-neutral-500 uppercase">
                Alamat Email
              </p>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800">
                <Mail size={18} className="text-neutral-400" />
                <span className="text-neutral-900 dark:text-white font-medium">
                  {session?.user?.email || "-"}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium text-neutral-500 dark:text-neutral-500 uppercase">
                Role Akses
              </p>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800">
                <Shield size={18} className="text-neutral-400" />
                <span className="text-neutral-900 dark:text-white font-medium">
                  {session?.user?.role || "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentProfile;
