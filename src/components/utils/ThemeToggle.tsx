"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useMounted } from "@/src/hooks/useMounted";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const mounted = useMounted();

  if (!mounted) {
    return <div className="h-10 w-full"></div>;
  }

  const isDark = theme === "dark";

  return (
    <div className="w-full px-2">
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="group relative  cursor-pointer flex w-full items-center gap-3 overflow-hidden rounded-xl p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
        aria-label="Toggle theme"
      >
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 ring-1 ring-zinc-200 dark:ring-zinc-700">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isDark ? "dark" : "light"}
              initial={{ y: 10, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -10, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-amber-500" />
              ) : (
                <Moon className="h-5 w-5 text-blue-600" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute inset-0 -z-10 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </button>
    </div>
  );
}
