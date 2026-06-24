"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { signIn } from "next-auth/react";
import { useMounted } from "@/src/hooks/useMounted";
import Image from "next/image";

const NavbarLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mounted = useMounted();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-transparent shadow-sm" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 pt-3 lg:py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <Image
              width={150}
              height={150}
              alt="Logo Dark"
              src={"/logo/SqueezeCage_KalimatDark.webp"}
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-4 ml-4">
              <button
                onClick={() => signIn()}
                className="text-black cursor-pointer inline-flex justify-center items-center text-sm hover:text-neutral-950 font-medium px-4 py-2"
              >
                Masuk
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-amber-700 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-96 opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        } bg-white border-t mt-4 overflow-hidden`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          <div className="pt-4 flex flex-col space-y-3">
            <button
              className="block w-full text-center px-3 py-2 text-base font-medium text-gray-700 border border-gray-200 rounded-md"
              onClick={() => signIn()}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLanding;
