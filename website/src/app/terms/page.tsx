"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { ChevronRight, ArrowUp } from "lucide-react";

/* ─── Table of Contents Data ─── */
const TOC_ITEMS = [
  { id: "acceptance", label: "Acceptance of Terms" },
  { id: "use-of-website", label: "Use of Website" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "project-inquiries", label: "Project Inquiries & Quotations" },
  { id: "third-party-links", label: "Third-Party Links" },
  { id: "disclaimer", label: "Disclaimer of Warranties" },
  { id: "limitation-liability", label: "Limitation of Liability" },
  { id: "indemnification", label: "Indemnification" },
  { id: "governing-law", label: "Governing Law" },
  { id: "dispute-resolution", label: "Dispute Resolution" },
  { id: "modifications", label: "Modifications" },
  { id: "severability", label: "Severability" },
  { id: "contact", label: "Contact Information" },
] as const;

export default function TermsPage() {
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
              <span className="text-manah-gold">Terms &amp; Conditions</span>
            </motion.nav>

            <motion.h1
              variants={fadeUp}
              className="font-display text-display-sm md:text-display-md font-bold mb-3"
            >
              Terms &amp; Conditions
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
              {/* 1. Acceptance of Terms */}
              <section id="acceptance" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Acceptance of Terms
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    These Terms and Conditions (&quot;Terms&quot;) constitute a legally binding
                    agreement between you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;)
                    and Manah Holding Pvt Ltd and its group companies (collectively,
                    &quot;Manah Group,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;),
                    governing your access to and use of the website located at{" "}
                    <Link href="/" className="text-manah-gold hover:underline">
                      www.manah.com
                    </Link>{" "}
                    (the &quot;Website&quot;).
                  </p>
                  <p>
                    By accessing, browsing, or using this Website, you acknowledge that you have
                    read, understood, and agree to be bound by these Terms, together with our{" "}
                    <Link href="/privacy" className="text-manah-gold hover:underline">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link href="/cookies" className="text-manah-gold hover:underline">
                      Cookie Policy
                    </Link>
                    , which are incorporated herein by reference. If you do not agree to these
                    Terms, you must discontinue use of the Website immediately.
                  </p>
                  <p>
                    These Terms apply to all visitors, clients, prospective clients, vendors,
                    partners, and any other individuals or entities who access or use the Website.
                    By using the Website on behalf of a company or other legal entity, you
                    represent and warrant that you have the authority to bind such entity to these
                    Terms.
                  </p>
                </div>
              </section>

              {/* 2. Use of Website */}
              <section id="use-of-website" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Use of Website
                  </h2>
                </div>
                <div className="space-y-6 text-manah-gray-600 text-body-md leading-relaxed">
                  <div>
                    <h3 className="font-display text-heading-md font-semibold text-manah-navy mb-2">
                      Permitted Use
                    </h3>
                    <p>
                      You may access and use the Website for lawful purposes only, including
                      learning about Manah Group&apos;s services, submitting project inquiries,
                      exploring career opportunities, and contacting our team. You agree to use
                      the Website in accordance with all applicable laws, regulations, and these
                      Terms.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-display text-heading-md font-semibold text-manah-navy mb-2">
                      Prohibited Activities
                    </h3>
                    <p className="mb-3">
                      You shall not, and shall not permit any third party to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-manah-gray-500">
                      <li>
                        Use the Website in any manner that could disable, damage, overburden, or
                        impair the Website or interfere with any other party&apos;s use of the
                        Website
                      </li>
                      <li>
                        Attempt to gain unauthorised access to any systems, servers, or networks
                        connected to the Website through hacking, password mining, or any other
                        means
                      </li>
                      <li>
                        Use any automated system, including bots, spiders, scrapers, or data mining
                        tools, to access, monitor, or copy any content from the Website without
                        our prior written consent
                      </li>
                      <li>
                        Transmit any viruses, malware, trojan horses, or other harmful computer
                        code through or to the Website
                      </li>
                      <li>
                        Use the Website to send unsolicited commercial communications, spam, or
                        chain letters
                      </li>
                      <li>
                        Impersonate any person or entity, or falsely state or misrepresent your
                        affiliation with any person or entity
                      </li>
                      <li>
                        Reproduce, duplicate, sell, resell, or exploit any portion of the Website
                        for commercial purposes without our express written permission
                      </li>
                      <li>
                        Engage in any activity that violates the Information Technology Act, 2000,
                        or any other applicable Indian or international law
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3. Intellectual Property */}
              <section id="intellectual-property" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Intellectual Property
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    All content on this Website, including but not limited to text, graphics,
                    photographs, images, videos, logos, trademarks, trade names, service marks,
                    icons, software, source code, designs, layouts, page headers, button icons,
                    and the overall look and feel of the Website (collectively,
                    &quot;Content&quot;), is the exclusive property of Manah Holding Pvt Ltd
                    and/or its licensors and is protected by Indian and international copyright,
                    trademark, patent, and other intellectual property laws.
                  </p>
                  <p>
                    The &quot;Manah&quot; name, the Manah Group logo, &quot;Manah Dynamics,&quot;
                    &quot;Manah Aerospace,&quot; and all related names, logos, product and service
                    names, designs, and slogans are trademarks of Manah Holding Pvt Ltd. You may
                    not use these marks without our prior written permission.
                  </p>
                  <p>
                    No part of this Website may be reproduced, distributed, modified, transmitted,
                    reused, downloaded, reposted, or used for any public or commercial purpose
                    without the express written consent of Manah Group. You are granted a limited,
                    revocable, non-exclusive licence to access and view the Content on this Website
                    solely for your personal, non-commercial, informational purposes.
                  </p>
                  <p>
                    Any unauthorised use of the Content may violate copyright, trademark, and other
                    applicable laws and could result in criminal or civil penalties under the
                    Copyright Act, 1957, the Trade Marks Act, 1999, and the Information Technology
                    Act, 2000.
                  </p>
                </div>
              </section>

              {/* 4. Project Inquiries & Quotations */}
              <section id="project-inquiries" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Project Inquiries &amp; Quotations
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    Information presented on this Website, including descriptions of our EPC
                    services, sector capabilities, project portfolios, and divisional offerings,
                    is provided for general informational purposes only. Such information does not
                    constitute a binding offer, proposal, or commitment by Manah Group to provide
                    any specific services or to enter into any contract.
                  </p>
                  <p>
                    Any quotation, estimate, or proposal provided through or in connection with
                    this Website is preliminary in nature and subject to the following conditions:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-manah-gray-500">
                    <li>
                      All quotations are indicative and non-binding unless and until a formal
                      written agreement, purchase order, or contract is executed by authorised
                      representatives of both parties
                    </li>
                    <li>
                      Manah Group reserves the right to modify, withdraw, or decline any quotation
                      at any time prior to the execution of a formal agreement
                    </li>
                    <li>
                      Project timelines, costs, specifications, and deliverables are subject to
                      detailed technical assessment, site surveys, and engineering reviews
                    </li>
                    <li>
                      Final terms of engagement, including scope of work, payment schedules,
                      warranties, and liability provisions, shall be governed exclusively by the
                      formal contract executed between the parties
                    </li>
                    <li>
                      Any reliance placed on information provided through the Website or preliminary
                      communications is at your own risk
                    </li>
                  </ul>
                </div>
              </section>

              {/* 5. Third-Party Links */}
              <section id="third-party-links" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Third-Party Links
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    This Website may contain hyperlinks, references, or embedded content that
                    direct you to websites, services, or resources operated by third parties. These
                    links are provided solely for your convenience and informational purposes.
                  </p>
                  <p>
                    Manah Group does not endorse, approve, control, or assume any responsibility
                    for the content, accuracy, privacy policies, practices, or opinions expressed
                    on any third-party websites. The inclusion of a link does not imply any
                    affiliation, sponsorship, or partnership between Manah Group and the operator
                    of the linked website.
                  </p>
                  <p>
                    You access third-party websites entirely at your own risk and subject to the
                    terms and conditions of those websites. We strongly recommend that you review
                    the privacy policy and terms of use of every third-party website you visit. We
                    shall not be liable for any loss or damage arising from your use of or reliance
                    on any third-party content, products, or services.
                  </p>
                </div>
              </section>

              {/* 6. Disclaimer of Warranties */}
              <section id="disclaimer" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Disclaimer of Warranties
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    THIS WEBSITE AND ALL CONTENT, MATERIALS, INFORMATION, AND SERVICES PROVIDED
                    THROUGH IT ARE OFFERED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot;
                    BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY.
                  </p>
                  <p>
                    To the fullest extent permitted by applicable law, Manah Group disclaims all
                    warranties, including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-manah-gray-500">
                    <li>
                      Implied warranties of merchantability, fitness for a particular purpose, and
                      non-infringement
                    </li>
                    <li>
                      Warranties that the Website will be uninterrupted, error-free, secure, or
                      free of viruses or other harmful components
                    </li>
                    <li>
                      Warranties regarding the accuracy, completeness, reliability, timeliness, or
                      suitability of any content or information on the Website
                    </li>
                    <li>
                      Warranties that defects or errors will be corrected, or that the server
                      hosting the Website is free of viruses or other malicious software
                    </li>
                  </ul>
                  <p>
                    Information on this Website, including project descriptions, technical
                    specifications, service capabilities, and corporate data, may contain
                    inaccuracies or typographical errors. Manah Group reserves the right to make
                    corrections and changes at any time without notice.
                  </p>
                </div>
              </section>

              {/* 7. Limitation of Liability */}
              <section id="limitation-liability" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Limitation of Liability
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, MANAH HOLDING PVT LTD, ITS
                    SUBSIDIARIES, AFFILIATES, DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, AND
                    LICENSORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                    CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO
                    DAMAGES FOR LOSS OF PROFITS, REVENUE, GOODWILL, DATA, OR OTHER INTANGIBLE
                    LOSSES, ARISING OUT OF OR IN CONNECTION WITH:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-manah-gray-500">
                    <li>
                      Your access to, use of, or inability to access or use the Website
                    </li>
                    <li>
                      Any content, information, or materials obtained from or through the Website
                    </li>
                    <li>
                      Unauthorised access to or alteration of your transmissions or data
                    </li>
                    <li>
                      Any conduct or content of any third party on or connected to the Website
                    </li>
                    <li>
                      Any errors, omissions, or inaccuracies in the Content
                    </li>
                  </ul>
                  <p>
                    In no event shall the total aggregate liability of Manah Group for all claims
                    arising out of or related to the Website exceed the amount of INR 10,000
                    (Indian Rupees Ten Thousand) or the amount you have paid to Manah Group in the
                    12 months preceding the claim, whichever is greater. This limitation applies
                    regardless of the legal theory upon which the claim is based, whether in
                    contract, tort (including negligence), strict liability, or otherwise.
                  </p>
                </div>
              </section>

              {/* 8. Indemnification */}
              <section id="indemnification" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Indemnification
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    You agree to indemnify, defend, and hold harmless Manah Holding Pvt Ltd, its
                    subsidiaries, affiliates, officers, directors, employees, agents, contractors,
                    and licensors from and against any and all claims, demands, actions, damages,
                    losses, liabilities, costs, and expenses (including reasonable legal fees and
                    court costs) arising out of or related to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-manah-gray-500">
                    <li>Your use of or access to the Website</li>
                    <li>Your violation of these Terms or any applicable law or regulation</li>
                    <li>
                      Your infringement of any intellectual property or other rights of any third
                      party
                    </li>
                    <li>
                      Any content, data, or information you submit, post, or transmit through the
                      Website
                    </li>
                    <li>
                      Any misrepresentation made by you in connection with your use of the Website
                    </li>
                  </ul>
                  <p>
                    This indemnification obligation shall survive the termination or expiration of
                    these Terms and your use of the Website.
                  </p>
                </div>
              </section>

              {/* 9. Governing Law */}
              <section id="governing-law" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Governing Law
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    These Terms shall be governed by, construed, and enforced in accordance with
                    the laws of the Republic of India, without regard to its conflict of law
                    principles.
                  </p>
                  <p>
                    Subject to the arbitration clause below, any legal proceedings arising out of
                    or relating to these Terms or your use of the Website shall be brought
                    exclusively in the courts of competent jurisdiction located in Hyderabad,
                    Telangana, India. You irrevocably consent to the personal jurisdiction and
                    venue of such courts and waive any objection to the laying of venue of any
                    action or proceeding in such courts.
                  </p>
                  <p>
                    If you access this Website from outside India, you are responsible for
                    compliance with the laws of your jurisdiction to the extent they are applicable.
                    Nothing in these Terms shall limit Manah Group&apos;s right to bring
                    enforcement proceedings in any jurisdiction.
                  </p>
                </div>
              </section>

              {/* 10. Dispute Resolution */}
              <section id="dispute-resolution" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Dispute Resolution
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    Any dispute, controversy, or claim arising out of or relating to these Terms,
                    including the validity, invalidity, breach, or termination thereof, shall be
                    resolved through the following procedure:
                  </p>
                  <ul className="list-disc pl-6 space-y-3 text-manah-gray-500">
                    <li>
                      <span className="font-medium text-manah-gray-700">Negotiation:</span>{" "}
                      The parties shall first attempt to resolve the dispute amicably through good
                      faith negotiations within thirty (30) days of written notice of the dispute.
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Arbitration:</span>{" "}
                      If the dispute cannot be resolved through negotiation, it shall be referred
                      to and finally resolved by arbitration in accordance with the Arbitration and
                      Conciliation Act, 1996 (as amended). The arbitration shall be conducted by a
                      sole arbitrator mutually appointed by the parties, or in the absence of
                      agreement, appointed in accordance with the provisions of the Act.
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Seat of arbitration:</span>{" "}
                      The seat and venue of arbitration shall be Hyderabad, Telangana, India.
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Language:</span>{" "}
                      The arbitration proceedings shall be conducted in the English language.
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Award:</span>{" "}
                      The arbitral award shall be final and binding on both parties and may be
                      entered as a judgment in any court of competent jurisdiction. Each party shall
                      bear its own costs of arbitration unless the arbitrator determines otherwise.
                    </li>
                  </ul>
                  <p>
                    Notwithstanding the foregoing, either party may seek interim or injunctive
                    relief from a court of competent jurisdiction in Hyderabad to prevent
                    irreparable harm pending the outcome of arbitration.
                  </p>
                </div>
              </section>

              {/* 11. Modifications */}
              <section id="modifications" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Modifications
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    Manah Group reserves the right to modify, amend, or update these Terms at any
                    time and at our sole discretion. Changes will be effective immediately upon
                    posting the revised Terms on this page with an updated &quot;Last updated&quot;
                    date.
                  </p>
                  <p>
                    It is your responsibility to review these Terms periodically. Your continued
                    use of the Website following the posting of revised Terms constitutes your
                    acceptance of and agreement to the changes. If you do not agree to the revised
                    Terms, you must stop using the Website immediately.
                  </p>
                  <p>
                    For material changes that significantly affect your rights or obligations, we
                    will make reasonable efforts to provide advance notice, such as displaying a
                    prominent notification on the Website or sending an email to registered users.
                  </p>
                </div>
              </section>

              {/* 12. Severability */}
              <section id="severability" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Severability
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    If any provision of these Terms is held to be invalid, illegal, void, or
                    unenforceable by a court of competent jurisdiction, such provision shall be
                    modified to the minimum extent necessary to make it valid and enforceable, or
                    if modification is not possible, shall be severed from these Terms.
                  </p>
                  <p>
                    The invalidity or unenforceability of any provision shall not affect the
                    validity or enforceability of the remaining provisions of these Terms, which
                    shall continue in full force and effect. The failure of Manah Group to exercise
                    or enforce any right or provision of these Terms shall not constitute a waiver
                    of such right or provision.
                  </p>
                </div>
              </section>

              {/* 13. Contact Information */}
              <section id="contact" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Contact Information
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    If you have any questions, concerns, or feedback regarding these Terms and
                    Conditions, please contact our legal department:
                  </p>
                  <div className="bg-manah-gray-50 rounded-xl p-6 border border-manah-gray-200/60">
                    <p className="font-semibold text-manah-navy mb-1">Legal Department</p>
                    <p className="text-manah-gray-700 font-medium">
                      Manah Holding Pvt Ltd
                    </p>
                    <div className="mt-3 space-y-1 text-manah-gray-500 text-body-sm">
                      <p>Manah House, Hyderabad, Telangana, India</p>
                      <p>
                        Email:{" "}
                        <a
                          href="mailto:legal@manah.com"
                          className="text-manah-gold hover:underline"
                        >
                          legal@manah.com
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
                    For project-specific inquiries and business communications, please visit our{" "}
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
