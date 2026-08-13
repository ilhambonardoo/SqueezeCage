"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useMounted } from "@/src/hooks/useMounted";
import { faqData } from "@/src/constant/FaQ";

export default function QuestionsLandingPage() {
  const [openId, setOpenId] = useState<number | null>(null);
  const mounted = useMounted();

  if (!mounted) return null;

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 text-slate-800">
      <div className="max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10 mx-auto">
        <div className="space-y-3">
          <h1 className="text-3xl font-plenty  font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Frequently Asked Questions (FaQ)
          </h1>
          <p className="text-sm text-slate-500 max-w-lg text-justify">
            Punya pertanyaan mengenai sistem IoT, hardware, atau keamanan
            SmartSqueeze Cage? Temukan jawabannya di bawah ini.
          </p>
        </div>

        <div className="space-y-4 mx-auto">
          {faqData.map((faq) => {
            const CategoryIcon = faq.icon;
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-amber-300 shadow-md shadow-amber-600/5"
                    : "border-slate-200 shadow-sm hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-5 flex items-start justify-between gap-4 focus:outline-none cursor-pointer select-none"
                >
                  <div className="flex gap-3">
                    <div
                      className={`p-2 rounded-lg mt-0.5 shrink-0 ${
                        isOpen
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <CategoryIcon size={18} />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                        {faq.category}
                      </span>
                      <h3
                        className={`font-semibold text-sm md:text-base transition-colors ${
                          isOpen ? "text-amber-800" : "text-slate-800"
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <ChevronDown
                    size={18}
                    className={`text-slate-400 mt-2 shrink-0 transition-transform duration-300 ${
                      isOpen ? "transform rotate-180 text-amber-600" : ""
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen
                      ? "max-h-60 opacity-100 border-t border-slate-100 bg-slate-50/50"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="p-5 text-xs md:text-sm text-slate-600 leading-relaxed pl-14">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
