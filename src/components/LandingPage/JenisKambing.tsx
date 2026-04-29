"use client";

import { useMounted } from "@/src/hooks/useMounted";
import { useTypewriter } from "@/src/hooks/useTypewriter";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const goats = [
  {
    id: 3,
    name: "Kambing 3",
    src: "/kambing3.jpg",
  },
  {
    id: 4,
    name: "Kambing 4",
    src: "/kambing4.jpg",
  },
  {
    id: 5,
    name: "Kambing 5",
    src: "/kambing5.jpg",
  },
];

const JenisKambing = () => {
  const fullText =
    "Kami menghadirkan dua program studi unggulan, yaitu Teknologi Rekayasa Komputer dan Teknologi Manajemen Ternak berbasis IoT, yang dirancang untuk menjawab kebutuhan industri modern. Melalui kolaborasi ini, mahasiswa dibekali kemampuan dalam mengembangkan sistem cerdas, mulai dari perangkat lunak, perangkat keras, hingga integrasi Internet of Things untuk mendukung pengelolaan peternakan yang efisien dan berkelanjutan. Program ini menekankan penerapan teknologi dalam monitoring kesehatan ternak, dan manajemen penimbangan dengan metode CRUD.";

  const displayText = useTypewriter(fullText, 30);

  const mounted = useMounted();
  if (!mounted) return null;
  return (
    <>
      <section className="w-full bg-white pt-16 md:pt-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center px-6 lg:px-22">
          <div className="w-full md:w-1/2">
            <Swiper
              modules={[Pagination]}
              pagination={{
                clickable: true,
                dynamicBullets: false,
              }}
              loop={true}
              speed={500}
              spaceBetween={0}
              slidesPerView={1}
              className="w-full"
            >
              {goats.map((goat) => (
                <SwiperSlide key={goat.id}>
                  <div className="p-2 md:p-4">
                    <Image
                      src={goat.src}
                      alt={goat.name}
                      height={600}
                      width={800}
                      className="w-full h-auto object-cover rounded-3xl md:rounded-4xl shadow-md"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="w-full md:w-1/2 p-4 md:p-10">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6 font-plenty">
                Ternak dan Teknologi
              </h2>
              <p className="text-base md:text-lg text-justify md:text-left text-gray-700 leading-relaxed font-nb">
                {displayText}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JenisKambing;
