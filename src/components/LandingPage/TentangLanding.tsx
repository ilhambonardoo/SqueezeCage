"use client";
import { motion } from "framer-motion";
import { useTypewriter } from "@/src/hooks/useTypewriter";
import Link from "next/link";
import { useMounted } from "@/src/hooks/useMounted";

const TentangLanding = () => {
  const fullText =
    "Di titik temu teknologi dan alam, hadir platform berbasis web untuk memahami dan merawat ternak kambing dengan cara baru. Didukung IoT dan Machine Learning, data berat tubuh berubah menjadi informasi real-time yang bermakna. Sistem ini membantu peternak mengambil keputusan lebih tepat—menghubungkan tradisi dengan inovasi, menuju peternakan yang cerdas dan berkelanjutan.";
  const displayedText = useTypewriter(fullText, 30);

  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <section className="w-full bg-amber-700 min-h-100 flex items-center py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col justify-between h-full relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <p className="text-base sm:text-lg md:text-2xl lg:text-4xl text-white font-plenty leading-relaxed">
            {displayedText}
            <span className="animate-pulse">|</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
          className="mt-12 lg:mt-16"
        >
          <Link
            href="#features"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-amber-700 font-semibold rounded-2xl hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
          >
            Tentang kami
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TentangLanding;
