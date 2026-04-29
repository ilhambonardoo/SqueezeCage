"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, spring } from "framer-motion";
import {
  LayoutDashboard,
  Beef,
  UserCircle,
  LogOut,
  Menu,
  X,
  ChevronRight,
  User2Icon,
  Edit,
} from "lucide-react";
import { cn } from "@/src/utils/cn";
import ThemeToggle from "../utils/ThemeToggle";
import { signOut, useSession } from "next-auth/react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Kambing",
    href: "/kambing",
    icon: Beef,
  },
  {
    title: "Profil",
    href: "/profile",
    icon: UserCircle,
  },
  {
    title: "Manajemen Users",
    href: "/users",
    icon: User2Icon,
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);

    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(true);
      else setIsOpen(false);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return null;

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarVariants = {
    open: {
      width: "240px",
      transition: { type: spring, stiffness: 300, damping: 30 },
    },
    closed: {
      width: isMobile ? "0px" : "70px",
      transition: { type: spring, stiffness: 300, damping: 30 },
    },
  };

  const navItemVariants = {
    hover: { scale: 1.02, x: 5 },
    tap: { scale: 0.98 },
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 p-2
        bg-amber-700 rounded-xl shadow-lg cursor-pointer border border-neutral-100 text-white hover:bg-amber-600 transition-colors`}
      >
        {isOpen ? <X size={17} /> : <Menu size={17} />}
      </button>

      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        variants={sidebarVariants}
        animate={isOpen ? "open" : "closed"}
        className={cn(
          "fixed top-0 left-0 h-screen bg-white dark:bg-neutral-900 z-40 overflow-hidden flex flex-col shadow-xl",
          !isOpen && isMobile && "-translate-x-full ",
        )}
      >
        {isOpen && (
          <div className="px-4 pt-20">
            <div className="bg-neutral-50 dark:bg-neutral-800/50 p-3 rounded-2xl border border-neutral-100 dark:border-neutral-800 flex items-center gap-3 group">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 truncate">
                  {session?.user.nama || "User"}
                </p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                  {session?.user.username || "@username"}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 hover:bg-white cursor-pointer dark:hover:bg-neutral-700 rounded-lg text-neutral-400 hover:text-amber-700 dark:hover:text-amber-500 transition-colors shadow-sm"
              >
                <Edit size={14} />
              </motion.button>
            </div>
          </div>
        )}

        <nav
          className={`flex-1 px-2 py-3 space-y-1 ${isOpen ? "mt-2" : "mt-20"}`}
        >
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  variants={navItemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className={cn(
                    "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-500 shadow-sm"
                      : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-50",
                  )}
                >
                  <item.icon
                    size={20}
                    className={cn(
                      "shrink-0 transition-colors",
                      isActive
                        ? "text-amber-700 dark:text-amber-500"
                        : "group-hover:text-amber-700 dark:group-hover:text-amber-500",
                    )}
                  />

                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="font-medium whitespace-nowrap"
                      >
                        {item.title}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute left-0 w-1 h-8 bg-amber-700 rounded-r-full"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  {isOpen && isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="ml-auto"
                    >
                      <ChevronRight
                        size={16}
                        className="text-amber-700 dark:text-amber-500"
                      />
                    </motion.div>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <ThemeToggle isOpen={isOpen} />

        <div className="p-3 border-t border-neutral-100 dark:border-neutral-800">
          <motion.button
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(254, 242, 242, 1)",
            }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-xl text-red-500 transition-colors duration-200 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20",
              !isOpen && "justify-center",
            )}
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
          >
            <LogOut size={20} className="shrink-0" />
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-medium whitespace-nowrap text-sm"
                >
                  Keluar
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.aside>

      <div
        className="hidden lg:block transition-all duration-300 pointer-events-none"
        style={{ width: isOpen ? "240px" : "70px" }}
      />
    </>
  );
};

export default Sidebar;
