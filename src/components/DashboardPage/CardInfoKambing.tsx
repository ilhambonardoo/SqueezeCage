"use client";
import { useKambing } from "@/src/hooks/useKambing";
import { useMounted } from "@/src/hooks/useMounted";

const CardInfoKambing = () => {
  const mounted = useMounted();
  const { stats, isLoading } = useKambing();

  if (!mounted) return null;

  const cardItems = [
    {
      label: "Total Kambing",
      count: stats?.kambing || 0,
      icon: "🐐",
      bgIcon: "bg-amber-100 dark:bg-amber-900/30",
      hoverBorder: "hover:border-amber-500/50",
    },
    {
      label: "Total Domba",
      count: stats?.domba || 0,
      icon: "🐑",
      bgIcon: "bg-blue-100 dark:bg-blue-900/30",
      hoverBorder: "hover:border-blue-500/50",
    },
    {
      label: "Ternak Jantan",
      count: stats?.jantan || 0,
      icon: "♂️",
      bgIcon: "bg-purple-100 dark:bg-purple-900/30",
      hoverBorder: "hover:border-purple-500/50",
    },
    {
      label: "Ternak Betina",
      count: stats?.betina || 0,
      icon: "♀️",
      bgIcon: "bg-pink-100 dark:bg-pink-900/30",
      hoverBorder: "hover:border-pink-500/50",
    },
  ];

  return (
    <section className="w-full p-6 lg:p-10 pt-2">
      <div className="mb-8">
        <h2 className="text-xl lg:text-2xl font-plenty text-neutral-800 dark:text-neutral-100">
          Informasi Komposisi Ternak
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Bagian untuk mempermudah melihat proporsi sebaran jenis hewan dan
          jenis kelamin ternak.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardItems.map((item, index) => (
          <div
            key={index}
            className={`relative flex flex-col justify-between p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl h-48 shadow-sm transition-all duration-300 ${item.hoverBorder} hover:shadow-md`}
          >
            {/* Bagian Atas Card: Label & Icon */}
            <div className="flex items-center justify-between w-full">
              <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 font-bold">
                {item.label}
              </p>
              <div
                className={`w-10 h-10 ${item.bgIcon} rounded-2xl flex items-center justify-center text-xl shadow-inner`}
              >
                {item.icon}
              </div>
            </div>

            <div className="mt-4">
              {isLoading ? (
                <div className="h-14 w-24 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-2xl" />
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-plenty text-neutral-800 dark:text-neutral-100 tabular-nums">
                    {item.count}
                  </span>
                  <span className="text-sm font-plenty text-neutral-400 dark:text-neutral-500">
                    Ekor
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardInfoKambing;
