"use client";
import { tabs } from "@/src/constant/Guidebook";
import { useMounted } from "@/src/hooks/useMounted";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const GuideBookLandingPage = () => {
  const mounted = useMounted();
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTabId = Number(searchParams.get("tab")) || 1;

  useEffect(() => {
    localStorage.setItem("lastActiveTab", String(activeTabId));
  }, [activeTabId]);

  const handleTabChange = (id: number) => {
    router.push(`/guide?tab=${id}`, { scroll: false });
  };

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  if (!mounted) return null;

  return (
    <div className="w-full h-auto bg-neutral-50">
      <div className="w-full max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-5 rounded-2xl border-slate-100 py-20 md:py-32">
        <div className="flex flex-col gap-6">
          <div className="mb-6">
            <h2 className="text-3xl font-plenty text-slate-800 mb-1">
              Buku Panduan
            </h2>
            <p className="text-slate-500 text-xs  sm:text-sm">
              SMART SQUEEZE CAGE V1.0
            </p>
          </div>
          <div className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-slate-100">
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none snap-x snap-mandatory">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                const isSelected = activeTabId === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center cursor-pointer gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-200 active:scale-[0.98] snap-start flex-none md:w-full whitespace-nowrap md:whitespace-normal ${
                      isSelected
                        ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
                        : "bg-slate-100 text-slate-600 hover:text-amber-700 hover:bg-amber-50/50"
                    }`}
                  >
                    <IconComponent
                      size={18}
                      className={isSelected ? "text-white" : "text-slate-400"}
                    />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/4 bg-white p-6 border border-slate-200 rounded-xl">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            {activeTab.title}
          </h2>
          {activeTab.content}
        </div>
      </div>
    </div>
  );
};

export default GuideBookLandingPage;
