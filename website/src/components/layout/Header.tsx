"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAVIGATION, type NavItem } from "@/lib/constants";
import TopBar from "./TopBar";
import MegaMenuPanel from "./MegaMenuPanel";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [mobileOpen]);

  // Close mega-menu on Escape
  useEffect(() => {
    if (!activeMenu) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMenu(null);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [activeMenu]);

  const handleMenuEnter = useCallback(
    (label: string) => setActiveMenu(label),
    []
  );
  const handleMenuLeave = useCallback(() => setActiveMenu(null), []);

  const activeItem = NAVIGATION.find((item) => item.label === activeMenu);

  return (
    <>
      {/* ─── Top Utility Bar ─── */}
      <TopBar />

      {/* ─── Main Header ─── */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-glass border-b border-manah-gray-200/50"
            : "bg-transparent"
        )}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="relative z-10 flex items-center group">
              <Image
                src="/images/logo.avif"
                alt="Manah Group of Companies"
                width={328}
                height={88}
                className={cn(
                  "h-12 w-auto transition-all duration-500 group-hover:scale-[1.03]",
                  isScrolled
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                )}
                priority
              />
              <Image
                src="/images/logo.avif"
                alt="Manah Group of Companies"
                width={328}
                height={88}
                className={cn(
                  "absolute left-0 h-12 w-auto transition-all duration-500 brightness-0 invert group-hover:scale-[1.03]",
                  isScrolled
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                )}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden xl:flex items-center gap-0.5 ml-auto mr-4"
              onMouseLeave={handleMenuLeave}
            >
              {NAVIGATION.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    item.children
                      ? handleMenuEnter(item.label)
                      : setActiveMenu(null)
                  }
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "relative flex items-center gap-1 px-3 py-2.5 text-body-sm font-medium tracking-wide uppercase transition-all duration-200",
                      pathname === item.href ||
                        pathname.startsWith(item.href + "/")
                        ? "text-manah-gold"
                        : isScrolled
                          ? "text-manah-gray-700 hover:text-manah-navy"
                          : "text-white/90 hover:text-white"
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform duration-200",
                          activeMenu === item.label && "rotate-180"
                        )}
                      />
                    )}
                    {/* Gold underline for active/hover */}
                    <span
                      className={cn(
                        "absolute bottom-0 left-3 right-3 h-[2px] bg-manah-gold rounded-full transition-all duration-300",
                        activeMenu === item.label ||
                          pathname === item.href ||
                          pathname.startsWith(item.href + "/")
                          ? "opacity-100 scale-x-100"
                          : "opacity-0 scale-x-0"
                      )}
                    />
                  </Link>
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={cn(
                  "xl:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors",
                  isScrolled ? "text-manah-navy" : "text-white"
                )}
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ─── Mega Menu Panel (Desktop) ─── */}
        <AnimatePresence>
          {activeItem && activeItem.children && (
            <MegaMenuPanel
              key={activeItem.label}
              item={activeItem}
              onClose={handleMenuLeave}
            />
          )}
        </AnimatePresence>
      </header>

      {/* ─── Dim overlay when mega-menu is open ─── */}
      <AnimatePresence>
        {activeMenu && activeItem?.children && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/10 z-40 hidden xl:block"
            onClick={handleMenuLeave}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              role="presentation"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 xl:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 h-full w-[85vw] max-w-[400px] bg-white z-50 xl:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-display font-bold text-heading-md text-manah-navy">
                    Menu
                  </span>
                  <button
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                    className="p-2 rounded-lg hover:bg-manah-gray-50"
                  >
                    <X className="w-5 h-5 text-manah-gray-600" />
                  </button>
                </div>
                <nav className="space-y-1">
                  {NAVIGATION.map((item, i) => (
                    <MobileNavItem
                      key={item.label}
                      item={item}
                      index={i}
                      onClose={() => setMobileOpen(false)}
                    />
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileNavItem({
  item,
  index,
  onClose,
}: {
  item: NavItem;
  index: number;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: index * 0.05,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {item.children ? (
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className={cn(
              "flex items-center justify-between w-full py-3 px-3 rounded-xl text-body-md font-medium transition-colors",
              pathname.startsWith(item.href)
                ? "text-manah-gold"
                : "text-manah-gray-700 hover:bg-manah-gray-50"
            )}
          >
            {item.label}
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                expanded && "rotate-180"
              )}
            />
          </button>
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="ml-3 pl-3 pb-2 space-y-0.5 border-l-2 border-manah-gold/20">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onClose}
                      className="group/mob flex flex-col gap-0.5 py-2 px-3 rounded-lg hover:bg-manah-gold/[0.06] transition-colors"
                    >
                      <span className="text-body-sm font-medium text-manah-gray-600 group-hover/mob:text-manah-navy transition-colors">
                        {child.label}
                      </span>
                      {child.description && (
                        <span className="text-caption text-manah-gray-400">
                          {child.description}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <Link
          href={item.href}
          onClick={onClose}
          className={cn(
            "block py-3 px-3 rounded-xl text-body-md font-medium transition-colors",
            pathname === item.href
              ? "text-manah-gold"
              : "text-manah-gray-700 hover:bg-manah-gray-50"
          )}
        >
          {item.label}
        </Link>
      )}
    </motion.div>
  );
}
