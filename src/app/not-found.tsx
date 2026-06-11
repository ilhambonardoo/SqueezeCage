"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { useMounted } from "@/src/hooks/useMounted";

export default function NotFound() {
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <main className="min-h-screen flex items-center justify-center p-5 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/10 dark:bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-700/10 dark:bg-amber-800/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[120px] md:text-[180px] font-bold leading-none tracking-tighter text-amber-900/10 dark:text-amber-100/5 font-plenty select-none">
            404
          </h1>

          <div className="-mt-10 md:-mt-15">
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white font-plenty mb-4">
              Halaman{" "}
              <span className="text-amber-700 dark:text-amber-600">Hilang</span>
            </h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-10">
              Oops! Sepertinya hewan-hewan kami melompat ke halaman yang salah.
              Halaman yang Anda cari tidak dapat ditemukan.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-amber-700 hover:bg-amber-800 text-white rounded-2xl font-bold transition-all shadow-lg shadow-amber-900/20 active:scale-[0.98]"
              >
                <Home size={20} />
                <span>Ke Dashboard</span>
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-20 flex justify-center"
        >
          <div className="w-24 h-1 bg-linear-to-r from-transparent via-amber-700 to-transparent rounded-full" />
        </motion.div>
      </div>
    </main>
  );
}
