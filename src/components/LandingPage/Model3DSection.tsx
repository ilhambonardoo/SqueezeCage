"use client";
import { useMounted } from "@/src/hooks/useMounted";
import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Kerangka from "../utils/Kerangka";
import { Suspense, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Box, X } from "lucide-react";

const Model3DSection = () => {
  const mounted = useMounted();
  const [isShow, setIsSetShow] = useState(false);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <section className="w-full bg-white lg:py-24 pt-5 pb-10 px-4 md:px-8">
        <div className="flex flex-col gap-5">
          <div
            className="relative max-w-7xl mx-auto group overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer shadow-2xl"
            onClick={() => {
              setIsSetShow(true);
            }}
          >
            <video
              className="w-full rounded-2xl cursor-pointer md:rounded-3xl shadow-2xl h-75 md:h-auto lg:h-screen object-cover aspect-video md:aspect-21/9"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="/video/animasi-kandang.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay yang muncul saat hover atau tap (mobile) menggunakan group */}
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2 md:gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.div
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                className="bg-white/20 backdrop-blur-md p-4 md:p-6 rounded-full border border-white/30 shadow-xl"
              >
                <Box className="w-8 h-8 md:w-12 md:h-12 text-white" />
              </motion.div>

              <div className="text-center px-4">
                <p className="text-white font-bold text-lg md:text-2xl tracking-widest md:tracking-[0.2em]">
                  VIEW 3D
                </p>
                <p className="text-white/70 text-[10px] md:text-sm mt-1">
                  Klik untuk eksplorasi kandang
                </p>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isShow && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-1000 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
              >
                <div className="relative w-full h-full max-w-6xl flex flex-col items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSetShow(false);
                    }}
                    className="absolute top-12 md:top-0 right-0 md:m-4 p-3 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors z-1001 cursor-pointer"
                  >
                    <X className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="w-full h-[70vh] md:h-full bg-white/5 rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                  >
                    <Canvas
                      shadows
                      dpr={[1, 2]}
                      camera={{ fov: 75 }}
                      className="w-full h-full"
                      style={{
                        background:
                          "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 50%, #f0f0f0 100%)",
                      }}
                    >
                      <Suspense fallback={null}>
                        <Stage environment="city" intensity={1} adjustCamera>
                          <Kerangka />
                        </Stage>
                      </Suspense>
                      <OrbitControls autoRotate={true} enableZoom makeDefault />
                    </Canvas>
                  </motion.div>
                  <p className="text-white/40 mt-4 text-xs md:text-sm text-center">
                    Gunakan 1 jari untuk memutar • 2 jari untuk zoom
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default Model3DSection;
