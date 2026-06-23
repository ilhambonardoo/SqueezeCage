"use client";

import { useMounted } from "@/src/hooks/useMounted";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-amber-700 text-amber-50 border-t border-amber-700 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:flex md:justify-between gap-8 md:gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4 md:max-w-sm">
            <div className="flex items-center gap-2">
              {/* Box ikon disesuaikan menggunakan kontras amber putih */}
              <div className="p-2 bg-white/20 rounded-xl">
                <Image
                  width={50}
                  height={50}
                  alt="Logo light"
                  src={"/logo/SuqueezeCage_Light.png"}
                />
              </div>
              <span className="font-plenty text-xl text-white tracking-wide uppercase">
                Squeeze Cage
              </span>
            </div>
            <p className="text-sm text-amber-100 leading-relaxed text-justify">
              Integrasi teknologi IoT Timbangan dan Machine Learning FastAPI
              untuk optimalisasi manajemen, pemantauan berat, dan efisiensi
              pakan kelompok ternak.
            </p>
          </div>

          {/* Institution Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Institution
            </h4>
            <p className="text-sm text-amber-100 leading-relaxed">
              Sekolah Vokasi
              <br />
              IPB University (Bogor Agricultural University)
              <br />
              Bogor, Jawa Barat, Indonesia
            </p>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Connect With Us
            </h4>
            <p className="text-sm text-amber-100">
              Ikuti perkembangan riset teknologi peternakan pintar kami melalui
              platform digital.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {/* Tombol sosial media disesuaikan agar menyala putih saat hover */}
              <a
                href="https://www.instagram.com/sekolahvokasiipb?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white rounded-full text-white hover:text-amber-600 transition-all duration-300"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://wa.me/6285389371126"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white rounded-full text-white hover:text-amber-600 transition-all duration-300"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Garis Pembatas Bawah dengan opasitas putih tipis */}
        <hr className="border-white/20 my-6" />

        {/* Hak Cipta / Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-200">
          <p>&copy; {currentYear} Squeeze Cage Project. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span className="transition-colors">Privacy Policy</span>
            <span className="transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
