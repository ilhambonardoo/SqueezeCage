"use client";

import { useMounted } from "@/src/hooks/useMounted";

const HeroSectionProfile = () => {
  const mounted = useMounted();
  if (!mounted) {
    return null;
  }
  return (
    <section>
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="max-w-xl ml-5 mt-15">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl font-plenty text-neutral-900 dark:text-white">
            Profil{" "}
            <span className="text-amber-700 dark:text-amber-600">Pengguna</span>
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Kelola informasi pribadi dan pengaturan akun Anda. Pastikan data
            Anda selalu terbarui untuk pengalaman terbaik.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionProfile;
