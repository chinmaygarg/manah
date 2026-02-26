"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cookie, X, Settings2, CheckCircle2 } from "lucide-react";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const consent = localStorage.getItem("manah-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem("manah-cookie-consent", JSON.stringify(prefs));
    setVisible(false);
  };

  const acceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true, functional: true });
  };

  const acceptSelected = () => {
    saveConsent(preferences);
  };

  const rejectAll = () => {
    saveConsent(DEFAULT_PREFERENCES);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-glass-lg border border-manah-gray-200/60 overflow-hidden">
            {/* Main Banner */}
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-manah-gold/10 flex items-center justify-center shrink-0">
                  <Cookie className="w-5 h-5 text-manah-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-heading-md font-semibold text-manah-navy mb-1">
                    We value your privacy
                  </h3>
                  <p className="text-manah-gray-500 text-body-sm">
                    We use cookies to enhance your browsing experience, analyse site traffic, and personalize content.
                    You can manage your preferences or accept all cookies.{" "}
                    <Link href="/cookies" className="text-manah-gold hover:underline">
                      Learn more
                    </Link>
                  </p>
                </div>
                <button
                  onClick={rejectAll}
                  className="text-manah-gray-400 hover:text-manah-gray-600 transition-colors shrink-0 cursor-pointer"
                  aria-label="Close cookie banner"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Preferences Panel */}
              <AnimatePresence>
                {showPreferences && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 pt-5 border-t border-manah-gray-200/50 space-y-3">
                      {[
                        { key: "necessary" as const, label: "Necessary", desc: "Essential for the website to function. Always on.", locked: true },
                        { key: "analytics" as const, label: "Analytics", desc: "Help us understand how visitors interact with our site.", locked: false },
                        { key: "functional" as const, label: "Functional", desc: "Enable enhanced features and personalization.", locked: false },
                        { key: "marketing" as const, label: "Marketing", desc: "Used to deliver relevant advertisements.", locked: false },
                      ].map((cookie) => (
                        <div key={cookie.key} className="flex items-center justify-between py-2">
                          <div>
                            <p className="text-body-sm font-medium text-manah-navy">{cookie.label}</p>
                            <p className="text-caption text-manah-gray-400">{cookie.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={preferences[cookie.key]}
                              disabled={cookie.locked}
                              onChange={(e) =>
                                setPreferences((prev) => ({ ...prev, [cookie.key]: e.target.checked }))
                              }
                              className="sr-only peer"
                            />
                            <div className={`w-10 h-5.5 rounded-full transition-colors duration-300 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:w-4.5 after:h-4.5 after:transition-transform after:duration-300 peer-checked:after:translate-x-[18px] ${
                              cookie.locked
                                ? "bg-manah-gold cursor-not-allowed"
                                : "bg-manah-gray-200 peer-checked:bg-manah-gold"
                            }`} />
                          </label>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button onClick={acceptAll} className="btn-primary text-body-sm py-2.5 px-6 cursor-pointer">
                  Accept All
                </button>
                {showPreferences ? (
                  <button onClick={acceptSelected} className="btn-secondary text-body-sm py-2.5 px-6 cursor-pointer">
                    <CheckCircle2 className="w-4 h-4" />
                    Save Preferences
                  </button>
                ) : (
                  <button
                    onClick={() => setShowPreferences(true)}
                    className="btn-secondary text-body-sm py-2.5 px-6 cursor-pointer"
                  >
                    <Settings2 className="w-4 h-4" />
                    Manage Preferences
                  </button>
                )}
                <button
                  onClick={rejectAll}
                  className="text-body-sm text-manah-gray-500 hover:text-manah-navy transition-colors cursor-pointer"
                >
                  Reject All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
