"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { signIn } from "next-auth/react";
import { useMounted } from "@/src/hooks/useMounted";
import Image from "next/image";
import { menuItems } from "@/src/constant/navbarMenu";
import { usePathname } from "next/navigation";

const NavbarLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mounted = useMounted();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const guideHref = useMemo(() => {
    if (typeof window !== "undefined") {
      const savedTab = localStorage.getItem("lastActiveTab");
      if (savedTab) {
        return `/guide?tab=${savedTab}`;
      }
    }
    return "/guide?tab=1";
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-transparent backdrop-blur-xs shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            <Image
              width={140}
              height={40}
              alt="Logo SqueezeCage"
              src="/logo/SqueezeCage_KalimatDark.webp"
              className="h-9 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {menuItems.map((menu) => {
              const SubIcon = menu.icon;
              const isActive =
                menu.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(menu.href);
              const targetHref = menu.id === 3 ? guideHref : menu.href;

              return (
                <Link
                  key={menu.id}
                  href={targetHref}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out group ${
                    isActive
                      ? "text-amber-700 bg-amber-50/80 font-semibold shadow-sm"
                      : "text-slate-400 hover:text-amber-600 hover:bg-amber-50/40"
                  }`}
                >
                  <SubIcon
                    size={18}
                    className={`transition-colors duration-200 ${
                      isActive
                        ? "text-amber-600"
                        : "text-slate-400 group-hover:text-amber-600"
                    }`}
                  />
                  <span className="capitalize">{menu.nama}</span>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center">
            <button
              onClick={() => signIn()}
              className="cursor-pointer inline-flex justify-center items-center text-sm font-medium px-5 py-2.5 rounded-lg text-white bg-amber-600 hover:bg-amber-700 active:scale-95 shadow-sm shadow-amber-600/10 hover:shadow-md hover:shadow-amber-600/20 transition-all duration-200 ease-in-out"
            >
              Masuk
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-amber-700 hover:bg-amber-50/50 focus:outline-none transition-colors"
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

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-112 opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        } bg-white border-b border-gray-100 overflow-hidden shadow-lg`}
      >
        <div className="px-4 pt-2 pb-6 space-y-4">
          <div className="flex flex-col space-y-1">
            {menuItems.map((menu) => {
              const SubIcon = menu.icon;
              const isActive =
                menu.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(menu.href);
              const targetHref = menu.id === 3 ? guideHref : menu.href;

              return (
                <Link
                  key={menu.id}
                  href={targetHref}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
                    isActive
                      ? "text-amber-700 bg-amber-50 font-semibold"
                      : "text-slate-600 hover:text-amber-700 hover:bg-slate-50"
                  }`}
                >
                  <SubIcon
                    size={20}
                    className={isActive ? "text-amber-600" : "text-slate-400"}
                  />
                  <span className="capitalize">{menu.nama}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              className="w-full text-center px-4 py-3 text-base font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm active:scale-[0.98] transition-all"
              onClick={() => {
                setIsMobileMenuOpen(false);
                signIn();
              }}
            >
              Masuk ke Aplikasi
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLanding;
