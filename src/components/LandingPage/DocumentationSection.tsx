"use client";
import { useMounted } from "@/src/hooks/useMounted";
import Image from "next/image";
import { motion } from "framer-motion";
import { sections } from "@/src/constant/documentSection";

const DocumentationSection = () => {
  const mounted = useMounted();
  if (!mounted) {
    return null;
  }

  return (
    <section className="w-full bg-white py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="font-plenty text-4xl md:text-6xl text-black mb-4 uppercase tracking-wider">
            Collaboration
          </h2>
          <div className="w-24 h-1 bg-[#FFB60C] mx-auto rounded-full" />
        </div>

        <div className="flex flex-col gap-20 md:gap-32">
          {sections.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col ${
                index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-8 md:gap-16`}
            >
              <div className="w-full md:w-2/5 flex justify-center">
                <div className="relative group p-4 bg-gray-50 rounded-2xl transition-all duration-500 hover:shadow-xl hover:bg-white border border-gray-100">
                  <Image
                    src={item.logo}
                    width={item.width}
                    height={item.height}
                    alt={item.title}
                    style={{ width: "auto", height: "auto" }}
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="w-full md:w-3/5 text-center md:text-left">
                <h3 className="font-plenty text-2xl md:text-3xl text-black mb-6 leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base text-justify md:text-left">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DocumentationSection;
