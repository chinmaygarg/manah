"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight, Calendar, Tag, ExternalLink, Image as ImageIcon, Play } from "lucide-react";

const TABS = ["Press Releases", "News", "Blog & Insights", "Gallery"];

const PRESS_RELEASES = [
  {
    id: 1,
    title: "Manah Group Secures $12M Transmission Line Contract",
    date: "January 15, 2025",
    excerpt: "Manah Dynamics awarded turnkey EPC contract for 400kV double circuit transmission line spanning 180 kilometres.",
  },
  {
    id: 2,
    title: "Manah Aerospace Obtains EASA Part 145 Certification",
    date: "December 8, 2024",
    excerpt: "Manah Aerospace achieves European Aviation Safety Agency certification, enabling servicing of international carriers at our facilities.",
  },
  {
    id: 3,
    title: "Green Energy Division Commissions 5 TPD Hydrogen Pilot Plant",
    date: "November 20, 2024",
    excerpt: "Our latest green hydrogen facility begins operations with PEM electrolyzer technology.",
  },
  {
    id: 4,
    title: "Manah Group Named 'Fastest Growing EPC Company' at Infrastructure Awards",
    date: "October 5, 2024",
    excerpt: "Recognition for 500%+ year-over-year growth and diversified project portfolio spanning multiple sectors.",
  },
];

const NEWS = [
  {
    id: 1,
    title: "The Global Green Hydrogen Push Creates Opportunities for EPC Players",
    source: "Economic Times",
    date: "January 22, 2025",
    excerpt: "Leading EPC companies including Manah Group are positioning to capitalize on green hydrogen missions worldwide.",
  },
  {
    id: 2,
    title: "Strategic Manufacturing: Defence Electronics Sees Record Growth",
    source: "Business Standard",
    date: "December 15, 2024",
    excerpt: "Electronics manufacturing services companies report surging orders as defence indigenization accelerates.",
  },
  {
    id: 3,
    title: "Global MRO Industry Poised for Exponential Growth",
    source: "Aviation Week",
    date: "November 10, 2024",
    excerpt: "The burgeoning global aviation sector drives demand for expanded MRO capabilities and infrastructure.",
  },
];

const BLOG = [
  {
    id: 1,
    title: "The Future of Global Green Hydrogen: Challenges and Opportunities",
    author: "Mr. Mohendra Kumar Pati",
    date: "January 28, 2025",
    category: "Green Energy",
    excerpt: "An analysis of global green hydrogen ambitions, the technology landscape, and the role of EPC companies in building hydrogen infrastructure.",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "Digital Twins in Infrastructure: Transforming Asset Management",
    author: "Mr. Prem Kumar",
    date: "December 20, 2024",
    category: "Technology",
    excerpt: "How digital twin technology is revolutionizing how we design, build, and manage large-scale infrastructure assets.",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "Building Resilient Power Grids for the Global Energy Transition",
    author: "Cdr. Pravin Sharad Dixit (Retd.)",
    date: "November 15, 2024",
    category: "Infrastructure",
    excerpt: "The critical role of transmission infrastructure in integrating renewable energy into power grids worldwide.",
    readTime: "7 min read",
  },
];

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState("Press Releases");

  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="relative bg-manah-navy text-white overflow-hidden -mt-20 pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(200,169,110,0.1),transparent_60%)]" />
        <div className="section-container py-24 md:py-28 relative z-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-manah-gold font-semibold text-body-sm tracking-widest uppercase mb-4">
              Media Centre
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-display-lg md:text-display-xl font-bold mb-6">
              News &{" "}
              <span className="text-gradient-gold">Insights</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-manah-gray-300 text-body-lg">
              Stay updated with the latest from Manah Group — press releases, industry news, thought leadership, and media coverage.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── Tab Navigation ─── */}
      <section className="bg-white border-b border-manah-gray-200 sticky top-[var(--nav-height)] z-20">
        <div className="section-container">
          <div className="flex gap-0 overflow-x-auto no-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-4 text-body-sm font-medium whitespace-nowrap border-b-2 transition-all duration-300 cursor-pointer ${
                  activeTab === tab
                    ? "border-manah-gold text-manah-navy"
                    : "border-transparent text-manah-gray-500 hover:text-manah-navy"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Tab Content ─── */}
      <section className="section-padding bg-manah-gray-50">
        <div className="section-container">
          <AnimatePresence mode="wait">
            {activeTab === "Press Releases" && (
              <motion.div
                key="press"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {PRESS_RELEASES.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-xl p-6 border border-manah-gray-200/60 hover:shadow-card-hover transition-all duration-400"
                  >
                    <div className="flex items-center gap-2 text-caption text-manah-gray-400 mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                      <span className="px-2 py-0.5 bg-manah-gold/10 text-manah-gold rounded-full text-caption font-medium">
                        Press Release
                      </span>
                    </div>
                    <h3 className="font-display text-heading-md font-bold text-manah-navy mb-2 hover:text-manah-gold transition-colors cursor-pointer">
                      {item.title}
                    </h3>
                    <p className="text-manah-gray-500 text-body-sm">{item.excerpt}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "News" && (
              <motion.div
                key="news"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {NEWS.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-xl p-6 border border-manah-gray-200/60 hover:shadow-card-hover transition-all duration-400"
                  >
                    <div className="flex items-center gap-2 text-caption text-manah-gray-400 mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                      <span className="flex items-center gap-1 text-manah-accent-blue">
                        <ExternalLink className="w-3 h-3" /> {item.source}
                      </span>
                    </div>
                    <h3 className="font-display text-heading-md font-bold text-manah-navy mb-2 hover:text-manah-gold transition-colors cursor-pointer">
                      {item.title}
                    </h3>
                    <p className="text-manah-gray-500 text-body-sm">{item.excerpt}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "Blog & Insights" && (
              <motion.div
                key="blog"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {BLOG.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-xl overflow-hidden border border-manah-gray-200/60 hover:shadow-card-hover transition-all duration-400"
                  >
                    <div className="aspect-[16/9] bg-manah-gray-100 flex items-center justify-center text-manah-gray-400 text-body-sm">
                      Blog Cover Image
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-0.5 bg-manah-navy/5 text-manah-navy text-caption rounded-full font-medium">
                          {item.category}
                        </span>
                        <span className="text-caption text-manah-gray-400">{item.readTime}</span>
                      </div>
                      <h3 className="font-display text-heading-md font-bold text-manah-navy mb-2 line-clamp-2 hover:text-manah-gold transition-colors cursor-pointer">
                        {item.title}
                      </h3>
                      <p className="text-manah-gray-500 text-body-sm line-clamp-2 mb-3">{item.excerpt}</p>
                      <div className="flex items-center justify-between text-caption text-manah-gray-400">
                        <span>By {item.author}</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "Gallery" && (
              <motion.div
                key="gallery"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Array.from({ length: 12 }, (_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className={`rounded-xl overflow-hidden bg-manah-gray-100 cursor-pointer hover:opacity-90 transition-opacity ${
                        i === 0 || i === 5 ? "col-span-2 row-span-2" : ""
                      }`}
                    >
                      <div className={`w-full flex items-center justify-center text-manah-gray-400 ${
                        i === 0 || i === 5 ? "aspect-square" : "aspect-[4/3]"
                      }`}>
                        {i < 8 ? (
                          <ImageIcon className="w-8 h-8 opacity-50" />
                        ) : (
                          <div className="text-center">
                            <Play className="w-8 h-8 opacity-50 mx-auto mb-1" />
                            <span className="text-caption">Video</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
