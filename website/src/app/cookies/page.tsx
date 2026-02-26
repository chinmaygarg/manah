"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { ChevronRight, ArrowUp } from "lucide-react";

/* ─── Cookie Table Data ─── */
const COOKIE_TABLE = [
  {
    category: "Essential",
    cookies: "Session ID, CSRF token, load balancer cookie",
    purpose: "Required for the website to function correctly. These cookies enable core functionality such as security, session management, and network load balancing.",
    duration: "Session / up to 24 hours",
    status: "Always Active",
  },
  {
    category: "Analytics",
    cookies: "_ga, _ga_*, _gid (Google Analytics)",
    purpose: "Help us understand how visitors interact with our website by collecting anonymous statistical data on page views, traffic sources, bounce rate, and user behaviour.",
    duration: "Up to 26 months",
    status: "Optional",
  },
  {
    category: "Functionality",
    cookies: "Language preference, region, display settings, cookie consent state",
    purpose: "Enable enhanced features and personalisation such as remembering your preferred language, region, and display settings across visits.",
    duration: "Up to 12 months",
    status: "Optional",
  },
  {
    category: "Marketing",
    cookies: "Campaign tracking parameters, referral source cookies",
    purpose: "Used to track the effectiveness of our digital campaigns and measure the reach of content shared across platforms. We do not currently serve personalised advertisements.",
    duration: "Up to 6 months",
    status: "Optional",
  },
] as const;

/* ─── Table of Contents Data ─── */
const TOC_ITEMS = [
  { id: "what-are-cookies", label: "What Are Cookies" },
  { id: "how-we-use", label: "How We Use Cookies" },
  { id: "types-of-cookies", label: "Types of Cookies We Use" },
  { id: "third-party-cookies", label: "Third-Party Cookies" },
  { id: "managing-cookies", label: "Managing Cookies" },
  { id: "cookie-consent", label: "Cookie Consent" },
  { id: "changes", label: "Changes to Cookie Policy" },
  { id: "contact", label: "Contact" },
] as const;

export default function CookiePolicyPage() {
  const [activeSection, setActiveSection] = useState<string>(TOC_ITEMS[0].id);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const visibleEntries = entries.filter((entry) => entry.isIntersecting);
    if (visibleEntries.length > 0) {
      const topEntry = visibleEntries.reduce((prev, curr) =>
        prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
      );
      setActiveSection(topEntry.target.id);
    }
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: "-100px 0px -60% 0px",
      threshold: 0,
    });

    const sections = TOC_ITEMS.map((item) => document.getElementById(item.id)).filter(
      Boolean
    ) as HTMLElement[];

    sections.forEach((section) => observerRef.current?.observe(section));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [handleObserver]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="pt-[var(--nav-height)]">
      {/* ─── Hero ─── */}
      <section className="bg-manah-navy text-white">
        <div className="section-container py-16 md:py-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Breadcrumb */}
            <motion.nav variants={fadeUp} className="flex items-center gap-2 text-body-sm text-manah-gray-400 mb-6">
              <Link href="/" className="hover:text-manah-gold transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-manah-gold">Cookie Policy</span>
            </motion.nav>

            <motion.h1
              variants={fadeUp}
              className="font-display text-display-sm md:text-display-md font-bold mb-3"
            >
              Cookie Policy
            </motion.h1>
            <motion.p variants={fadeUp} className="text-manah-gray-400 text-body-md">
              Last updated: February 1, 2026
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── Content ─── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="flex gap-12 lg:gap-16">
            {/* Sidebar TOC — desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <nav className="sticky top-24">
                <p className="font-display font-semibold text-manah-navy text-body-sm uppercase tracking-widest mb-4">
                  On This Page
                </p>
                <ul className="space-y-1">
                  {TOC_ITEMS.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left text-body-sm py-1.5 pl-4 border-l-2 transition-all duration-300 cursor-pointer ${
                          activeSection === item.id
                            ? "border-manah-gold text-manah-navy font-medium"
                            : "border-manah-gray-200 text-manah-gray-500 hover:text-manah-navy hover:border-manah-gray-400"
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Mobile TOC */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-manah-gray-200 shadow-glass">
              <div className="flex overflow-x-auto no-scrollbar gap-1 px-4 py-3">
                {TOC_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`whitespace-nowrap text-caption px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                      activeSection === item.id
                        ? "bg-manah-navy text-white"
                        : "bg-manah-gray-100 text-manah-gray-500"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-3xl lg:pb-0 pb-20">
              {/* 1. What Are Cookies */}
              <section id="what-are-cookies" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    What Are Cookies
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    Cookies are small text files that are placed on your computer, smartphone,
                    tablet, or other device when you visit a website. They are widely used to make
                    websites work more efficiently, to provide a better browsing experience, and to
                    supply information to website operators.
                  </p>
                  <p>
                    Cookies allow a website to recognise your device and remember information about
                    your visit, such as your preferred language, login credentials, font size, and
                    other display preferences. This means you do not have to re-enter information
                    each time you visit or navigate between pages on the same website.
                  </p>
                  <p>
                    Some cookies are &quot;session cookies,&quot; which are temporary and are
                    deleted when you close your browser. Others are &quot;persistent cookies,&quot;
                    which remain on your device for a set period or until you manually delete them.
                    Cookies may be set by the website you are visiting (&quot;first-party
                    cookies&quot;) or by third-party services that are integrated into the website
                    (&quot;third-party cookies&quot;).
                  </p>
                  <p>
                    This Cookie Policy explains how Manah Holding Pvt Ltd and its group companies
                    (&quot;Manah Group,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
                    use cookies and similar technologies on our website at{" "}
                    <Link href="/" className="text-manah-gold hover:underline">
                      www.manah.com
                    </Link>{" "}
                    (the &quot;Website&quot;). This policy should be read alongside our{" "}
                    <Link href="/privacy" className="text-manah-gold hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </section>

              {/* 2. How We Use Cookies */}
              <section id="how-we-use" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    How We Use Cookies
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    Manah Group uses cookies and similar tracking technologies on our Website for
                    the following purposes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-manah-gray-500">
                    <li>
                      <span className="font-medium text-manah-gray-700">
                        Ensuring website functionality:
                      </span>{" "}
                      Essential cookies enable core features such as page navigation, access to
                      secure areas, session management, and security protections. Without these
                      cookies, the Website cannot function properly.
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">
                        Understanding website usage:
                      </span>{" "}
                      Analytics cookies help us understand how visitors interact with our Website,
                      which pages are most frequently visited, and where users encounter errors.
                      This data is collected in an aggregated and anonymous form and helps us
                      continuously improve the performance and content of our Website.
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">
                        Remembering your preferences:
                      </span>{" "}
                      Functionality cookies store your settings and choices, such as language
                      preference and cookie consent status, so that the Website can provide you
                      with a personalised experience on return visits.
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">
                        Measuring campaign effectiveness:
                      </span>{" "}
                      Marketing cookies allow us to track the performance of our digital campaigns,
                      measure referral traffic, and understand which content resonates with our
                      audience. We do not use cookies to serve personalised or targeted
                      advertisements.
                    </li>
                  </ul>
                </div>
              </section>

              {/* 3. Types of Cookies We Use */}
              <section id="types-of-cookies" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Types of Cookies We Use
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    The table below provides a detailed overview of the cookies we use on our
                    Website, categorised by type, purpose, and retention period:
                  </p>

                  {/* Cookie Table */}
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <table className="w-full min-w-[640px] border-collapse text-body-sm">
                      <thead>
                        <tr className="bg-manah-navy text-white">
                          <th className="text-left px-4 py-3 font-semibold rounded-tl-lg">
                            Category
                          </th>
                          <th className="text-left px-4 py-3 font-semibold">
                            Cookies Used
                          </th>
                          <th className="text-left px-4 py-3 font-semibold">
                            Purpose
                          </th>
                          <th className="text-left px-4 py-3 font-semibold">
                            Duration
                          </th>
                          <th className="text-left px-4 py-3 font-semibold rounded-tr-lg">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {COOKIE_TABLE.map((row, i) => (
                          <tr
                            key={row.category}
                            className={`border-b border-manah-gray-200 ${
                              i % 2 === 0 ? "bg-white" : "bg-manah-gray-50"
                            }`}
                          >
                            <td className="px-4 py-4 font-medium text-manah-navy align-top whitespace-nowrap">
                              {row.category}
                            </td>
                            <td className="px-4 py-4 text-manah-gray-500 align-top">
                              {row.cookies}
                            </td>
                            <td className="px-4 py-4 text-manah-gray-500 align-top max-w-xs">
                              {row.purpose}
                            </td>
                            <td className="px-4 py-4 text-manah-gray-500 align-top whitespace-nowrap">
                              {row.duration}
                            </td>
                            <td className="px-4 py-4 align-top">
                              <span
                                className={`inline-block px-2.5 py-1 rounded-full text-caption font-medium ${
                                  row.status === "Always Active"
                                    ? "bg-manah-gold/15 text-manah-gold-dark"
                                    : "bg-manah-gray-100 text-manah-gray-500"
                                }`}
                              >
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* 4. Third-Party Cookies */}
              <section id="third-party-cookies" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Third-Party Cookies
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    In addition to our own cookies, we may allow certain trusted third parties to
                    place cookies on your device when you visit our Website. These third-party
                    cookies are used for the following purposes:
                  </p>
                  <ul className="list-disc pl-6 space-y-3 text-manah-gray-500">
                    <li>
                      <span className="font-medium text-manah-gray-700">
                        Google Analytics (by Google LLC):
                      </span>{" "}
                      We use Google Analytics to collect anonymous statistical data about how
                      visitors use our Website. Google Analytics uses cookies such as{" "}
                      <code className="bg-manah-gray-100 px-1.5 py-0.5 rounded text-manah-navy text-caption">
                        _ga
                      </code>
                      ,{" "}
                      <code className="bg-manah-gray-100 px-1.5 py-0.5 rounded text-manah-navy text-caption">
                        _gid
                      </code>
                      , and{" "}
                      <code className="bg-manah-gray-100 px-1.5 py-0.5 rounded text-manah-navy text-caption">
                        _ga_*
                      </code>{" "}
                      to distinguish unique users, throttle request rates, and track session
                      activity. Google&apos;s privacy policy is available at{" "}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-manah-gold hover:underline"
                      >
                        policies.google.com/privacy
                      </a>
                      . You can opt out of Google Analytics by installing the{" "}
                      <a
                        href="https://tools.google.com/dlpage/gaoptout"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-manah-gold hover:underline"
                      >
                        Google Analytics Opt-out Browser Add-on
                      </a>
                      .
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">
                        Embedded content:
                      </span>{" "}
                      Our Website may include embedded content from third-party platforms such as
                      YouTube (for project videos), LinkedIn (for company updates), or mapping
                      services. These embedded elements may set their own cookies when you interact
                      with them. We do not control these third-party cookies, and their use is
                      governed by the respective privacy policies of those platforms.
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">
                        Hosting and CDN providers:
                      </span>{" "}
                      Our Website is hosted on infrastructure that may use cookies for load
                      balancing, content delivery optimisation, and security (such as DDoS
                      protection). These cookies are classified as essential and are necessary for
                      the reliable delivery of our Website.
                    </li>
                  </ul>
                  <p>
                    We regularly review our third-party service providers and the cookies they
                    set to ensure they comply with our data protection standards. We do not permit
                    third parties to use cookies on our Website for their own advertising purposes.
                  </p>
                </div>
              </section>

              {/* 5. Managing Cookies */}
              <section id="managing-cookies" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Managing Cookies
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    You have full control over which cookies are placed on your device. You can
                    manage your cookie preferences through the following methods:
                  </p>

                  <div>
                    <h3 className="font-display text-heading-md font-semibold text-manah-navy mb-2">
                      Cookie Consent Banner
                    </h3>
                    <p>
                      When you first visit our Website, a cookie consent banner will appear, giving
                      you the option to accept all cookies, reject non-essential cookies, or
                      customise your preferences by category. You can change your preferences at
                      any time by clearing your browser cookies and revisiting the Website.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-display text-heading-md font-semibold text-manah-navy mb-2">
                      Browser Settings
                    </h3>
                    <p className="mb-3">
                      Most web browsers allow you to control cookies through their settings. You
                      can typically configure your browser to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-manah-gray-500">
                      <li>Block all cookies or only third-party cookies</li>
                      <li>Alert you when a cookie is being set</li>
                      <li>Delete existing cookies from your device</li>
                      <li>
                        Browse in &quot;private&quot; or &quot;incognito&quot; mode, which
                        automatically deletes cookies when the session ends
                      </li>
                    </ul>
                    <p className="mt-3">
                      Here are links to cookie management instructions for common browsers:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 text-manah-gray-500 mt-2">
                      <li>
                        <a
                          href="https://support.google.com/chrome/answer/95647"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-manah-gold hover:underline"
                        >
                          Google Chrome
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-manah-gold hover:underline"
                        >
                          Mozilla Firefox
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://support.apple.com/en-in/guide/safari/sfri11471/mac"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-manah-gold hover:underline"
                        >
                          Apple Safari
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://support.microsoft.com/en-us/microsoft-edge/manage-cookies-in-microsoft-edge-168dab11-0753-043d-7c16-ede5947fc64d"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-manah-gold hover:underline"
                        >
                          Microsoft Edge
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-manah-gray-50 rounded-xl p-5 border border-manah-gray-200/60">
                    <p className="text-body-sm text-manah-gray-600">
                      <span className="font-medium text-manah-navy">Please note:</span>{" "}
                      Disabling or blocking certain cookies may affect the functionality of our
                      Website. Essential cookies cannot be disabled as they are strictly necessary
                      for the Website to operate. If you block essential cookies, certain features
                      may not work as intended.
                    </p>
                  </div>
                </div>
              </section>

              {/* 6. Cookie Consent */}
              <section id="cookie-consent" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Cookie Consent
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    In accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act)
                    and best practices in data privacy, we obtain your consent before placing
                    non-essential cookies on your device.
                  </p>
                  <p>Our cookie consent mechanism works as follows:</p>
                  <ul className="list-disc pl-6 space-y-2 text-manah-gray-500">
                    <li>
                      On your first visit to our Website, a cookie consent banner is displayed at
                      the bottom of the screen, informing you about our use of cookies
                    </li>
                    <li>
                      You can choose to &quot;Accept All&quot; cookies, &quot;Reject All&quot;
                      non-essential cookies, or &quot;Manage Preferences&quot; to select specific
                      cookie categories
                    </li>
                    <li>
                      Essential cookies are always active and cannot be disabled, as they are
                      necessary for the basic functionality of the Website
                    </li>
                    <li>
                      Your consent preferences are stored in a local cookie on your device so that
                      the banner is not shown again on subsequent visits, unless you clear your
                      browser data
                    </li>
                    <li>
                      No non-essential cookies are placed on your device until you provide affirmative
                      consent through the cookie consent banner
                    </li>
                    <li>
                      You may change your preferences at any time by deleting your browser cookies
                      and revisiting the Website, which will trigger the consent banner again
                    </li>
                  </ul>
                  <p>
                    We maintain records of consent as required by applicable law and update our
                    cookie consent mechanisms when our cookie practices change.
                  </p>
                </div>
              </section>

              {/* 7. Changes to Cookie Policy */}
              <section id="changes" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Changes to Cookie Policy
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    We may update this Cookie Policy from time to time to reflect changes in the
                    cookies we use, the purposes for which we use them, or changes in applicable
                    law. When we make changes, we will:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-manah-gray-500">
                    <li>
                      Update the &quot;Last updated&quot; date at the top of this page
                    </li>
                    <li>
                      Display the updated cookie consent banner on your next visit if the changes
                      affect the types of cookies we use or how we use them
                    </li>
                    <li>
                      Request fresh consent where required by law, particularly if we introduce new
                      categories of cookies or change the purposes of existing ones
                    </li>
                  </ul>
                  <p>
                    We encourage you to review this Cookie Policy periodically to stay informed
                    about how we use cookies. Your continued use of the Website following the
                    posting of changes constitutes your acknowledgement of the updated policy.
                  </p>
                </div>
              </section>

              {/* 8. Contact */}
              <section id="contact" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Contact
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    If you have any questions about our use of cookies or this Cookie Policy,
                    please contact us:
                  </p>
                  <div className="bg-manah-gray-50 rounded-xl p-6 border border-manah-gray-200/60">
                    <p className="font-semibold text-manah-navy mb-1">
                      Data Protection Officer
                    </p>
                    <p className="text-manah-gray-700 font-medium">
                      Manah Holding Pvt Ltd
                    </p>
                    <div className="mt-3 space-y-1 text-manah-gray-500 text-body-sm">
                      <p>Manah House, Hyderabad, Telangana, India</p>
                      <p>
                        Email:{" "}
                        <a
                          href="mailto:privacy@manah.com"
                          className="text-manah-gold hover:underline"
                        >
                          privacy@manah.com
                        </a>
                      </p>
                      <p>
                        Phone:{" "}
                        <a
                          href="tel:+919676902243"
                          className="text-manah-gold hover:underline"
                        >
                          +91 96769 02243
                        </a>
                      </p>
                    </div>
                  </div>
                  <p>
                    For general inquiries about our data protection practices, please refer to our{" "}
                    <Link href="/privacy" className="text-manah-gold hover:underline">
                      Privacy Policy
                    </Link>{" "}
                    or visit our{" "}
                    <Link href="/contact" className="text-manah-gold hover:underline">
                      Contact page
                    </Link>
                    .
                  </p>
                </div>
              </section>

              {/* Back to top */}
              <div className="pt-8 border-t border-manah-gray-200">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="inline-flex items-center gap-2 text-manah-gold hover:underline text-body-sm cursor-pointer"
                >
                  <ArrowUp className="w-4 h-4" />
                  Back to top
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
