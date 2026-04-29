"use client";

import { members } from "@/src/constant/members";
import { useMounted } from "@/src/hooks/useMounted";
import { easeOut, motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

interface MemberModel {
  name: string;
  image: string;
  role: string;
}

const KelompokSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        easeOut,
      },
    },
  };

  const mounted = useMounted();
  if (!mounted) return null;

  const MemberCard = ({
    member,
    index,
  }: {
    member: MemberModel;
    index: number;
  }) => (
    <motion.div key={index} variants={itemVariants} className="group relative">
      <div className="flex flex-col items-center text-center h-full">
        <div className="relative mb-5 md:mb-6 transform transition-transform duration-300 group-hover:scale-105">
          <div className="absolute inset-0 bg-linear-to-br from-amber-400 to-amber-600 rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-linear-to-br from-gray-100 to-gray-200 border-4 border-white shadow-lg overflow-hidden group-hover:shadow-xl transition-shadow duration-300">
            <div className="w-full h-full bg-linear-to-br from-amber-100 to-amber-50 flex items-center justify-center">
              <div className="text-4xl md:text-5xl font-bold text-amber-200">
                {member.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>

        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-amber-700 transition-colors duration-300"
        >
          {member.name}
        </motion.h3>

        <p className="text-sm md:text-base text-amber-600 font-medium mt-1 mb-3 md:mb-4">
          {member.role}
        </p>

        {/* Social Links */}
        <div className="flex gap-3 md:opacity-0 group-hover:opacity-100 transition-all duration-300 md:translate-y-2 group-hover:translate-y-0">
          <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-amber-700 hover:text-white transition-all duration-300">
            <Mail size={16} className="md:w-[18px] md:h-[18px]" />
          </button>
        </div>

        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-1 bg-linear-to-r from-amber-600 to-amber-400 group-hover:w-16 transition-all duration-300 rounded-full"></div>
      </div>
    </motion.div>
  );

  return (
    <section className="relative w-full overflow-hidden bg-linear-to-b from-white via-amber-50 to-white pt-24 pb-20 md:pt-44 md:pb-32">
      <div className="absolute top-20 right-0 w-72 h-72 md:w-96 md:h-96 bg-amber-100 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-80 md:h-80 bg-amber-50 rounded-full blur-3xl opacity-40 pointer-events-none"></div>

      <div className="mx-auto px-4 sm:px-6 md:px-8 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 md:mb-20"
        >
          <h1 className="text-gray-900 text-3xl sm:text-5xl lg:text-6xl text-center font-semibold font-plenty leading-tight">
            Para Pengembang
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-amber-700 block mt-1 sm:mt-2">
              Proyek
            </span>
          </h1>
          <p className="mt-4 md:mt-6 text-center text-gray-600 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-2">
            Kami adalah tim yang berdedikasi untuk mengembangkan solusi IoT yang
            inovatif dan efisien dalam manajemen kesehatan ternak kambing.
          </p>
        </motion.div>

        {/* Mobile Slider */}
        <div className="block sm:hidden">
          <style jsx global>{`
            .swiper-pagination-bullet {
              background: #d97706 !important;
            }
          `}</style>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="pb-12"
          >
            {members.map((member, index) => (
              <SwiperSlide key={index}>
                <MemberCard member={member} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Grid */}
        <motion.div
          className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {members.map((member, index) => (
            <MemberCard key={index} member={member} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default KelompokSection;
