"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Globe,
  Phone,
  Linkedin,
  Youtube,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAVIGATION, SITE_CONFIG, type NavItem } from "@/lib/constants";

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
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [mobileOpen]);

  const handleMenuEnter = useCallback((label: string) => setActiveMenu(label), []);
  const handleMenuLeave = useCallback(() => setActiveMenu(null), []);

  return (
    <>
      {/* ─── Top Utility Bar ─── */}
      <div className="hidden lg:block bg-manah-navy-dark text-white/70 text-caption">
        <div className="section-container flex items-center justify-between h-9">
          <div className="flex items-center gap-6">
            <a href="tel:+919676902243" className="flex items-center gap-1.5 hover:text-manah-gold transition-colors">
              <Phone className="w-3 h-3" />
              <span>+91 96769 02243</span>
            </a>
            <span className="text-white/30">|</span>
            <span>Hyderabad, India</span>
          </div>
          <div className="flex items-center gap-5">
            <button aria-label="Select language, currently English" className="flex items-center gap-1.5 hover:text-manah-gold transition-colors">
              <Globe className="w-3.5 h-3.5" />
              <span>EN</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <span className="text-white/30">|</span>
            <div className="flex items-center gap-3">
              <a href={SITE_CONFIG.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-manah-gold transition-colors"><Linkedin className="w-3.5 h-3.5" /></a>
              <a href={SITE_CONFIG.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-manah-gold transition-colors"><Youtube className="w-3.5 h-3.5" /></a>
            </div>
          </div>
        </div>
      </div>

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
              {/* Dark background: white version via CSS filter */}
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
            <nav className="hidden xl:flex items-center gap-1 ml-auto mr-4">
              {NAVIGATION.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && handleMenuEnter(item.label)}
                  onMouseLeave={handleMenuLeave}
                  onFocus={() => item.children && handleMenuEnter(item.label)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      handleMenuLeave();
                    }
                  }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 px-3.5 py-2.5 text-body-sm font-medium rounded-lg transition-all duration-200",
                      pathname === item.href || pathname.startsWith(item.href + "/")
                        ? "text-manah-gold"
                        : isScrolled
                          ? "text-manah-gray-700 hover:text-manah-navy hover:bg-manah-gray-50"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200",
                        activeMenu === item.label && "rotate-180"
                      )} />
                    )}
                  </Link>

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {item.children && activeMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                      >
                        <div className="relative bg-white rounded-2xl shadow-glass-lg border border-manah-gray-200/40 overflow-hidden">
                          {/* Gold accent bar */}
                          <div className="h-[2px] bg-gradient-to-r from-transparent via-manah-gold to-transparent" />

                          <div className={cn(
                            "grid gap-0.5 p-2",
                            item.children.length > 4 ? "grid-cols-2 min-w-[440px]" : "min-w-[260px]"
                          )}>
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="group/item relative flex flex-col gap-0.5 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-manah-gold/[0.06]"
                              >
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 rounded-full bg-manah-gold transition-all duration-200 group-hover/item:h-5" />
                                <span className="text-body-sm font-semibold text-manah-gray-700 group-hover/item:text-manah-navy transition-colors">
                                  {child.label}
                                </span>
                                {child.description && (
                                  <span className="text-caption text-manah-gray-400 group-hover/item:text-manah-gray-500 transition-colors">
                                    {child.description}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button aria-label="Search" className={cn(
                "hidden lg:flex items-center justify-center w-10 h-10 rounded-lg transition-all",
                isScrolled
                  ? "hover:bg-manah-gray-50 text-manah-gray-500 hover:text-manah-navy"
                  : "hover:bg-white/10 text-white/80 hover:text-white"
              )}>
                <Search className="w-5 h-5" />
              </button>
              <Link href="/contact" className="hidden lg:flex btn-primary text-body-sm py-2.5 px-6">
                Get in Touch
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={cn(
                  "xl:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors",
                  isScrolled ? "text-manah-navy" : "text-white"
                )}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

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
                  <span className="font-display font-bold text-heading-md text-manah-navy">Menu</span>
                  <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-2 rounded-lg hover:bg-manah-gray-50">
                    <X className="w-5 h-5 text-manah-gray-600" />
                  </button>
                </div>
                <nav className="space-y-1">
                  {NAVIGATION.map((item, i) => (
                    <MobileNavItem key={item.label} item={item} index={i} onClose={() => setMobileOpen(false)} />
                  ))}
                </nav>
                <div className="mt-8 pt-6 border-t border-manah-gray-200">
                  <Link href="/contact" className="btn-primary w-full justify-center" onClick={() => setMobileOpen(false)}>
                    Get in Touch
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileNavItem({ item, index, onClose }: { item: NavItem; index: number; onClose: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {item.children ? (
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className={cn(
              "flex items-center justify-between w-full py-3 px-3 rounded-xl text-body-md font-medium transition-colors",
              pathname.startsWith(item.href) ? "text-manah-gold" : "text-manah-gray-700 hover:bg-manah-gray-50"
            )}
          >
            {item.label}
            <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", expanded && "rotate-180")} />
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
            pathname === item.href ? "text-manah-gold" : "text-manah-gray-700 hover:bg-manah-gray-50"
          )}
        >
          {item.label}
        </Link>
      )}
    </motion.div>
  );
}
