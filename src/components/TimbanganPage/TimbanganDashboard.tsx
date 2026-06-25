"use client";
import { motion } from "framer-motion";
import { LiveWeightCard } from "./LineWeightCard";
import { useMounted } from "@/src/hooks/useMounted";

export const TimbanganDashboard = () => {
  const mounted = useMounted();
  if (!mounted) {
    return null;
  }
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-4 md:p-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto pb-20">
        <main className="lg:order-2 justify-center flex flex-col gap-6 lg:gap-10 w-full items-start">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-4xl md:rounded-[3rem] p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 w-full lg:flex-1"
          >
            <LiveWeightCard />
          </motion.section>
        </main>
      </div>
    </div>
  );
};
