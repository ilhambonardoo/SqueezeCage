"use client";

import { useEffect, useRef } from "react";

import { ArrowRight } from "lucide-react";
import { useMounted } from "@/src/hooks/useMounted";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const HeroSectionLanding = () => {
  const mounted = useMounted();
  const sectionRef = useRef(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageWrapperRef = useRef(null);

  const finalTitle =
    "Penimbangan Berat Ternak Berbasis IoT & Machine Learning (SqueezeCage)";
  const chars = "----------------------";

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2000",
          pin: true,
          scrub: 2,
          invalidateOnRefresh: true,
        },
      });

      const scrambleObj = { value: 0 };

      tl.to(
        scrambleObj,
        {
          value: 1,
          ease: "none",
          duration: 1,
          onUpdate: () => {
            const progress = scrambleObj.value;
            if (textRef.current) {
              textRef.current.innerText = finalTitle
                .split("")
                .map((letter, index) => {
                  const threshold = index / finalTitle.length;
                  if (letter === " ") return " ";
                  if (progress > threshold + 0.01) {
                    return finalTitle[index];
                  }
                  return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");
            }
          },
        },
        0,
      );

      tl.to(
        imageWrapperRef.current,
        {
          scale: 1.2,
          width: "100%",
          borderRadius: "0px",
          ease: "none",
        },
        0,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      className="bg-white w-full overflow-hidden min-h-screen flex flex-col items-center justify-center pt-20 md:pt-32"
    >
      <div className="flex flex-col space-y-8 max-w-7xl px-6 md:px-22 mx-auto z-20 md:py-15 w-full">
        <h1
          ref={textRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-plenty font-medium tracking-tight text-gray-900 leading-[1.1] text-center md:text-left min-h-40 sm:min-h-50 md:min-h-40 flex items-center"
        >
          {finalTitle}
        </h1>

        <div className="hidden md:flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"></div>
      </div>

      <div className="max-w-full mx-auto px-4 lg:px-0 relative z-10 mt-8 md:mt-12 w-full flex justify-center">
        <div
          ref={imageWrapperRef}
          className="relative overflow-hidden shadow-2xl origin-center rounded-2xl md:rounded-3xl w-[95%] md:w-[85%]"
        >
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent z-10"></div>

          <div className="absolute bottom-8 lg:bottom-30 lg:right-40 left-1/2 -translate-x-1/2 md:left-auto md:right-12 md:bottom-12 md:translate-x-0 flex items-center justify-center z-20 w-[calc(100%-2rem)] md:w-auto">
            <motion.button
              initial={{ opacity: 0 }}
              whileHover={{ scale: 0.9, opacity: 0.6 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              onClick={() => signIn()}
              className="w-full md:w-auto bg-amber-600 cursor-pointer inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 hover:bg-amber-700 text-white font-semibold rounded-xl md:rounded-2xl transition-all shadow-lg group whitespace-nowrap"
            >
              Masuk
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 transition-transform" />
            </motion.button>
          </div>
          <video
            className="w-full h-133 md:h-auto lg:h-screen object-cover aspect-video md:aspect-21/9"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/video/video-kambing.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionLanding;
