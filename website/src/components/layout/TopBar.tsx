"use client";

import Link from "next/link";
import { Linkedin, Twitter, Youtube, Instagram } from "lucide-react";
import { TOP_BAR_LINKS, SITE_CONFIG } from "@/lib/constants";

const SOCIAL_LINKS = [
  { icon: Linkedin, href: SITE_CONFIG.socials.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: SITE_CONFIG.socials.twitter, label: "Twitter" },
  { icon: Youtube, href: SITE_CONFIG.socials.youtube, label: "YouTube" },
  { icon: Instagram, href: SITE_CONFIG.socials.instagram, label: "Instagram" },
] as const;

export default function TopBar() {
  return (
    <div className="hidden lg:block bg-manah-navy-dark text-white/70 text-caption">
      <div className="section-container flex items-center justify-between h-9">
        <nav className="flex items-center gap-1" aria-label="Utility navigation">
          {TOP_BAR_LINKS.map((link, i) => (
            <span key={link.href} className="flex items-center">
              {i > 0 && <span className="text-white/20 mx-2.5">|</span>}
              <Link
                href={link.href}
                className="link-underline hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-3.5">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hover:text-manah-gold transition-all duration-200 hover:scale-110"
            >
              <Icon className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
