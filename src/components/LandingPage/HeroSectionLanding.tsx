"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMounted } from "@/src/hooks/useMounted";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSectionLanding = () => {
  const mounted = useMounted();
  const sectionRef = useRef(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageWrapperRef = useRef(null);

  const finalTitle =
    "Penimbangan Berat Kambing Berbasis IoT & Machine Learning";
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
          scale: 1.15,
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
      className="relative bg-white w-full overflow-hidden min-h-screen flex flex-col items-center justify-center pt-32 pb-20"
    >
      <div className="flex flex-col space-y-8 max-w-7xl px-8 pb-20 md:px-22 mx-auto z-20 w-full">
        <h1
          ref={textRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-plenty font-medium tracking-tight text-gray-900 leading-[1.1] text-center md:text-left min-h-45 md:min-h-40 flex items-center"
        >
          {finalTitle}
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-amber-700 text-white font-semibold rounded-2xl hover:bg-amber-800 transition-all shadow-lg shadow-amber-200 group"
          >
            Mulai Sekarang
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="max-w-full mx-auto px-6 lg:px-0 relative z-10 mt-12 w-full flex justify-center">
        <div
          ref={imageWrapperRef}
          className="relative overflow-hidden shadow-2xl origin-center rounded-3xl"
          style={{ width: "85%" }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
          <Image
            src="/kambing.jpg"
            alt="Smart Livestock Management"
            width={1200}
            height={800}
            className="w-full h-auto object-cover aspect-video md:aspect-21/9"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSectionLanding;
