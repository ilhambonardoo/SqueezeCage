"use client";
import { useTernak } from "@/src/hooks/useTernak";
import { useMounted } from "@/src/hooks/useMounted";

const HeroSectionDashboard = () => {
  const mounted = useMounted();

  const { stats, isLoading } = useTernak();

  if (!mounted) return null;
  return (
    <section className="p-6  pt-20 lg:pt-12 lg:p-10 pb-8 transition-colors duration-300">
      <div className="flex flex-col lg:flex-row gap-9">
        <div className="w-full lg:w-1/2 ">
          <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-plenty text-neutral-900 dark:text-neutral-50">
              Dashboard Insight
            </h1>
            <div className="h-1 w-20 bg-amber-600 rounded-full" />
          </div>
          <p className="text-lg font-sans leading-relaxed text-neutral-600 dark:text-neutral-400 text-justify">
            Bukan lagi sekadar menggembala, kini peternak merangkai masa
            depan—di mana setiap langkah kambing terpantau oleh jaringan pintar
            yang setia menjaga. Di balik sunyi kandang, data mengalir lembut,
            menghadirkan kepastian dalam setiap keputusan. Teknologi IoT pun
            menjelma sahabat tak terlihat, memastikan kesehatan, kenyamanan, dan
            kehidupan ternak tetap terjaga dalam harmoni antara alam dan
            inovasi.
          </p>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="relative group w-full max-w-md">
            <div className="relative flex flex-col gap-2 w-full border border-neutral-200 dark:border-neutral-800 rounded-3xl h-64 justify-center items-center bg-white dark:bg-neutral-900 shadow-xl transition-all duration-300 hover:border-amber-500/50">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mb-2">
                <span className="text-2xl">🐐</span>
              </div>
              <p className="text-sm uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 font-bold">
                Total Ternak
              </p>
              {isLoading ? (
                <div className="h-16 w-24 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-2xl mt-2" />
              ) : (
                <>
                  <p className="text-7xl font-plenty text-amber-700 dark:text-amber-500 tabular-nums">
                    {stats?.total || 0}{" "}
                    <span className="text-xl font-plenty text-neutral-400">
                      Ekor
                    </span>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionDashboard;
