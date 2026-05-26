"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, spring } from "framer-motion";
import { Menu, X, ChevronRight, Edit, LogOut } from "lucide-react";
import { cn } from "@/src/utils/cn";
import ThemeToggle from "../utils/ThemeToggle";
import { signOut, useSession } from "next-auth/react";
import { menuItems } from "@/src/constant/sidebarMenu";
import { useMounted } from "@/src/hooks/useMounted";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [openMenu, setOpenMenu] = useState<string[]>([]);
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
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

  const mounted = useMounted();
  if (!mounted) return null;

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleSubMenu = (title: string) => {
    setOpenMenu((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

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
                onClick={() => {
                  router.push("/profile?edit=true");
                }}
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
            const hasChildren = item.children && item.children.length > 0;
            const isSubOpen = openMenu.includes(item.title);
            const isActive =
              (item.href !== undefined &&
                item.href !== "/" &&
                pathname.startsWith(item.href)) ||
              pathname === item.href ||
              item.children?.some(
                (child) =>
                  pathname === child.href ||
                  (child.href !== "/" && pathname.startsWith(child.href)),
              );

            return (
              <div key={item.title} className="w-full">
                <motion.div
                  variants={navItemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => {
                    if (isOpen && hasChildren) {
                      toggleSubMenu(item.title);
                    }
                  }}
                  className={cn(
                    "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-500 shadow-sm"
                      : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-50",
                  )}
                >
                  {!isOpen || !hasChildren ? (
                    <Link
                      href={item.href! || item.children?.[0].href || "#"}
                      className="absolute inset-0"
                    />
                  ) : null}

                  <item.icon
                    size={20}
                    className={cn(
                      "shrink-0 transition-colors",
                      isActive
                        ? "text-amber-700 dark:text-amber-500"
                        : "group-hover:text-amber-700 dark:group-hover:text-amber-500",
                    )}
                  />

                  {!isOpen && (
                    <div className="absolute left-16 scale-0 group-hover:scale-100 transition-all origin-left bg-neutral-800 text-white text-xs px-2 py-1 rounded shadow-xl whitespace-nowrap z-50">
                      {item.title}
                    </div>
                  )}

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

                  {/* Icon Arrow untuk DropDown */}
                  {isOpen && hasChildren && (
                    <motion.div
                      animate={{ rotate: isSubOpen ? 90 : 0 }}
                      className="ml-auto"
                    >
                      <ChevronRight size={14} />
                    </motion.div>
                  )}

                  {isActive && !hasChildren && (
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
                </motion.div>

                {/* Submenu Container */}
                <AnimatePresence>
                  {isOpen && hasChildren && isSubOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-1"
                    >
                      <div className="pl-4 pr-2 space-y-1 py-1">
                        {item.children.map((child) => {
                          const isChildActive =
                            pathname === child.href ||
                            (child.href === "/" && pathname === "/kambing");

                          const SubIcon = child.icon;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                "flex items-center gap-2 py-2 px-3 text-sm rounded-lg transition-colors relative",
                                isChildActive
                                  ? "text-amber-700 dark:text-amber-500 font-semibold bg-amber-50/50 dark:bg-amber-950/20"
                                  : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50 hover:bg-neutral-50 dark:hover:bg-neutral-800",
                              )}
                            >
                              {SubIcon && (
                                <SubIcon
                                  size={16}
                                  className={cn(
                                    "shrink-0",
                                    isChildActive
                                      ? "text-amber-700"
                                      : "text-neutral-400",
                                  )}
                                />
                              )}
                              <span>{child.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
