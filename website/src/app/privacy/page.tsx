"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { ChevronRight, ArrowUp } from "lucide-react";

/* ─── Table of Contents Data ─── */
const TOC_ITEMS = [
  { id: "introduction", label: "Introduction" },
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use", label: "How We Use Your Information" },
  { id: "legal-basis", label: "Legal Basis for Processing" },
  { id: "information-sharing", label: "Information Sharing" },
  { id: "data-security", label: "Data Security" },
  { id: "data-retention", label: "Data Retention" },
  { id: "your-rights", label: "Your Rights" },
  { id: "cookies-tracking", label: "Cookies & Tracking" },
  { id: "international-transfers", label: "International Data Transfers" },
  { id: "childrens-privacy", label: "Children's Privacy" },
  { id: "changes", label: "Changes to This Policy" },
  { id: "contact", label: "Contact Us" },
] as const;

export default function PrivacyPolicyPage() {
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
              <span className="text-manah-gold">Privacy Policy</span>
            </motion.nav>

            <motion.h1
              variants={fadeUp}
              className="font-display text-display-sm md:text-display-md font-bold mb-3"
            >
              Privacy Policy
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
              {/* 1. Introduction */}
              <section id="introduction" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Introduction
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    Manah Holding Pvt Ltd and its group companies (collectively referred to as
                    &quot;Manah Group,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
                    are committed to protecting your privacy and ensuring the security of your
                    personal data. This Privacy Policy explains how we collect, use, disclose, and
                    safeguard your information when you visit our website at{" "}
                    <Link href="/" className="text-manah-gold hover:underline">
                      www.manah.com
                    </Link>{" "}
                    (the &quot;Website&quot;), interact with our services, or engage with us
                    through any other channel.
                  </p>
                  <p>
                    This policy applies to all visitors, clients, prospective clients, suppliers,
                    partners, and other individuals whose personal data we process. By accessing or
                    using our Website, you acknowledge that you have read and understood this Privacy
                    Policy.
                  </p>
                  <p>
                    As an Engineering, Procurement, and Construction (EPC) enterprise operating in
                    India and internationally, we comply with the Digital Personal Data Protection
                    Act, 2023 (DPDP Act), the Information Technology Act, 2000, and other applicable
                    data protection regulations in the jurisdictions where we operate.
                  </p>
                </div>
              </section>

              {/* 2. Information We Collect */}
              <section id="information-we-collect" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Information We Collect
                  </h2>
                </div>
                <div className="space-y-6 text-manah-gray-600 text-body-md leading-relaxed">
                  <div>
                    <h3 className="font-display text-heading-md font-semibold text-manah-navy mb-2">
                      Personal Information You Provide
                    </h3>
                    <p className="mb-3">
                      We collect personal information that you voluntarily provide to us when you
                      submit inquiries, request quotations, apply for employment, or otherwise
                      communicate with us. This includes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-manah-gray-500">
                      <li>Full name, job title, and professional designation</li>
                      <li>Email address and telephone number(s)</li>
                      <li>Company or organisation name and business address</li>
                      <li>Project details and requirements submitted through inquiry forms</li>
                      <li>Resume, curriculum vitae, and employment history (for career applicants)</li>
                      <li>Correspondence records and communication preferences</li>
                      <li>Payment and billing information (for contractual engagements)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-display text-heading-md font-semibold text-manah-navy mb-2">
                      Technical Data Collected Automatically
                    </h3>
                    <p className="mb-3">
                      When you access our Website, we automatically collect certain technical
                      information through cookies, server logs, and similar technologies:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-manah-gray-500">
                      <li>Internet Protocol (IP) address and approximate geolocation</li>
                      <li>Browser type, version, and language preferences</li>
                      <li>Operating system and device information</li>
                      <li>Pages visited, time spent on each page, and navigation patterns</li>
                      <li>Referring website URL and search engine queries</li>
                      <li>Date and time of access</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-display text-heading-md font-semibold text-manah-navy mb-2">
                      Cookies and Tracking Technologies
                    </h3>
                    <p>
                      We use cookies, web beacons, and similar tracking technologies to enhance your
                      browsing experience and gather analytics data. For detailed information about
                      the cookies we use and how to manage them, please refer to our{" "}
                      <Link href="/cookies" className="text-manah-gold hover:underline">
                        Cookie Policy
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </section>

              {/* 3. How We Use Your Information */}
              <section id="how-we-use" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    How We Use Your Information
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    We process your personal data for specific, legitimate purposes. Your
                    information is used to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-manah-gray-500">
                    <li>
                      <span className="font-medium text-manah-gray-700">Service delivery:</span>{" "}
                      Respond to project inquiries, process quotation requests, and fulfil
                      contractual obligations related to our EPC, aerospace, green energy, and
                      technology services
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Communication:</span>{" "}
                      Send you relevant updates about our services, project developments, and
                      industry insights, provided you have opted in to receive such communications
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Website improvement:</span>{" "}
                      Analyse usage patterns and site performance to enhance user experience,
                      optimise content, and improve the functionality of our Website
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Recruitment:</span>{" "}
                      Evaluate job applications, conduct background checks where permitted, and
                      manage the hiring process across our divisions
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Legal compliance:</span>{" "}
                      Meet regulatory requirements, respond to lawful requests from government
                      authorities, and enforce our legal rights
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Security:</span>{" "}
                      Detect, prevent, and address fraud, security breaches, and other malicious or
                      unlawful activity on our Website and systems
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Business operations:</span>{" "}
                      Manage vendor relationships, procurement processes, and supply chain
                      coordination across our global operations
                    </li>
                  </ul>
                </div>
              </section>

              {/* 4. Legal Basis for Processing */}
              <section id="legal-basis" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Legal Basis for Processing
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    Under the Digital Personal Data Protection Act, 2023 (DPDP Act) and other
                    applicable laws, we process your personal data on the following lawful bases:
                  </p>
                  <ul className="list-disc pl-6 space-y-3 text-manah-gray-500">
                    <li>
                      <span className="font-medium text-manah-gray-700">Consent:</span>{" "}
                      Where you have given clear and informed consent for us to process your
                      personal data for specific purposes, such as subscribing to our newsletter or
                      submitting a project inquiry. You may withdraw your consent at any time by
                      contacting us.
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Contractual necessity:</span>{" "}
                      Processing that is necessary for the performance of a contract to which you
                      are a party, or to take steps at your request prior to entering into a
                      contract, including project quotations and service agreements.
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Legitimate interests:</span>{" "}
                      Processing that is necessary for the legitimate business interests of Manah
                      Group, such as improving our services, preventing fraud, ensuring network
                      security, and conducting internal analytics, provided such interests are not
                      overridden by your fundamental rights.
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Legal obligation:</span>{" "}
                      Processing that is necessary to comply with a legal obligation under Indian
                      law or the laws of other jurisdictions where we operate, including tax
                      regulations, company law requirements, and government reporting obligations.
                    </li>
                  </ul>
                </div>
              </section>

              {/* 5. Information Sharing */}
              <section id="information-sharing" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Information Sharing
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    Manah Group does not sell, rent, or trade your personal data. We may share your
                    information with third parties only in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-3 text-manah-gray-500">
                    <li>
                      <span className="font-medium text-manah-gray-700">
                        Group companies and affiliates:
                      </span>{" "}
                      We may share information within the Manah Group of Companies, including Manah
                      Dynamics, Manah Aerospace, and our technology divisions, to coordinate
                      services and manage cross-divisional operations.
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">
                        Service providers:
                      </span>{" "}
                      We engage trusted third-party vendors who provide services on our behalf, such
                      as website hosting, cloud infrastructure, analytics, email delivery, and IT
                      support. These providers are contractually obligated to protect your data and
                      use it solely for the purposes we specify.
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">
                        Legal and regulatory authorities:
                      </span>{" "}
                      We may disclose your data when required by law, court order, or government
                      regulation, or when we believe in good faith that disclosure is necessary to
                      protect the rights, property, or safety of Manah Group, our employees, or the
                      public.
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">
                        Business transfers:
                      </span>{" "}
                      In the event of a merger, acquisition, reorganisation, or sale of assets, your
                      personal data may be transferred as part of the transaction. We will notify
                      you of any such change and ensure the receiving entity adheres to this Privacy
                      Policy.
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">
                        Professional advisors:
                      </span>{" "}
                      We may share information with our legal counsel, auditors, consultants, and
                      financial advisors as necessary for the conduct of our business.
                    </li>
                  </ul>
                </div>
              </section>

              {/* 6. Data Security */}
              <section id="data-security" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Data Security
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    We implement industry-standard technical and organisational measures to protect
                    your personal data against unauthorised access, alteration, disclosure, or
                    destruction. These measures include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-manah-gray-500">
                    <li>
                      Encryption of data in transit using TLS/SSL protocols and encryption of
                      sensitive data at rest using AES-256 standards
                    </li>
                    <li>
                      Role-based access controls ensuring that only authorised personnel can access
                      personal data on a need-to-know basis
                    </li>
                    <li>
                      Regular security assessments, vulnerability scanning, and penetration testing
                      of our systems and infrastructure
                    </li>
                    <li>
                      Secure data centres with physical access controls, surveillance, and
                      environmental protections
                    </li>
                    <li>
                      Employee training on data protection obligations, information security
                      awareness, and incident response procedures
                    </li>
                    <li>
                      A documented incident response plan to address data breaches promptly,
                      including notification to affected individuals and the Data Protection Board
                      of India as required under the DPDP Act
                    </li>
                  </ul>
                  <p>
                    While we take every reasonable precaution to safeguard your data, no method of
                    transmission over the Internet or electronic storage is completely secure. We
                    cannot guarantee absolute security but are committed to continuously improving
                    our security posture.
                  </p>
                </div>
              </section>

              {/* 7. Data Retention */}
              <section id="data-retention" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Data Retention
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    We retain your personal data only for as long as necessary to fulfil the
                    purposes for which it was collected, or as required by applicable law. The
                    retention period depends on the nature of the data and the purpose of
                    processing:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-manah-gray-500">
                    <li>
                      <span className="font-medium text-manah-gray-700">Inquiry and quotation data:</span>{" "}
                      Retained for up to 3 years from the date of last interaction, unless a
                      contractual relationship is established
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Contractual data:</span>{" "}
                      Retained for the duration of the contract plus 8 years thereafter, in
                      accordance with the Indian Limitation Act, 1963 and Companies Act, 2013
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Job application data:</span>{" "}
                      Retained for up to 2 years from the date of application, or longer if the
                      applicant is hired
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Website analytics data:</span>{" "}
                      Retained for up to 26 months in aggregated, anonymised form
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Tax and financial records:</span>{" "}
                      Retained for a minimum of 8 years as required under Indian tax law
                    </li>
                  </ul>
                  <p>
                    When personal data is no longer needed, we securely delete or anonymise it in
                    accordance with our data retention schedule. Anonymised data that cannot be
                    used to identify individuals may be retained indefinitely for statistical and
                    analytical purposes.
                  </p>
                </div>
              </section>

              {/* 8. Your Rights */}
              <section id="your-rights" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Your Rights
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    Under the Digital Personal Data Protection Act, 2023 (DPDP Act) and applicable
                    data protection laws, you have the following rights regarding your personal
                    data:
                  </p>
                  <ul className="list-disc pl-6 space-y-3 text-manah-gray-500">
                    <li>
                      <span className="font-medium text-manah-gray-700">Right to access:</span>{" "}
                      You may request a summary of your personal data that we hold, including the
                      processing activities performed on your data and the identities of all Data
                      Fiduciaries and Data Processors with whom your data has been shared.
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Right to correction:</span>{" "}
                      You have the right to request the correction of inaccurate or misleading
                      personal data, and to complete any data that is incomplete.
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Right to erasure:</span>{" "}
                      You may request the deletion of your personal data where it is no longer
                      necessary for the purpose for which it was collected, subject to legal
                      retention requirements.
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Right to withdraw consent:</span>{" "}
                      Where processing is based on consent, you may withdraw your consent at any
                      time. Withdrawal of consent does not affect the lawfulness of processing
                      carried out prior to withdrawal.
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Right to grievance redressal:</span>{" "}
                      You have the right to register a complaint with our Data Protection Officer.
                      If you are not satisfied with our response, you may escalate the matter to the
                      Data Protection Board of India.
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Right to nominate:</span>{" "}
                      Under the DPDP Act, you have the right to nominate another individual to
                      exercise your rights in the event of your death or incapacity.
                    </li>
                  </ul>
                  <p>
                    To exercise any of these rights, please contact our Data Protection Officer at{" "}
                    <a
                      href="mailto:privacy@manah.com"
                      className="text-manah-gold hover:underline"
                    >
                      privacy@manah.com
                    </a>
                    . We will respond to your request within 30 days of receipt. We may request
                    verification of your identity before processing your request.
                  </p>
                </div>
              </section>

              {/* 9. Cookies & Tracking */}
              <section id="cookies-tracking" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Cookies & Tracking
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    Our Website uses cookies and similar tracking technologies to distinguish you
                    from other users, provide a personalised experience, and analyse website
                    traffic. Cookies are small text files stored on your device that help us
                    understand how you interact with our Website.
                  </p>
                  <p>We use the following categories of cookies:</p>
                  <ul className="list-disc pl-6 space-y-2 text-manah-gray-500">
                    <li>
                      <span className="font-medium text-manah-gray-700">Essential cookies:</span>{" "}
                      Necessary for the Website to function properly, including session management,
                      security tokens, and load balancing. These cannot be disabled.
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Analytics cookies:</span>{" "}
                      Used to collect anonymous statistics about Website usage, including page views,
                      traffic sources, and user behaviour. We use Google Analytics for this purpose.
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Functionality cookies:</span>{" "}
                      Remember your preferences such as language settings, region, and display
                      options to provide enhanced features.
                    </li>
                    <li>
                      <span className="font-medium text-manah-gray-700">Marketing cookies:</span>{" "}
                      Track your online activity to help deliver relevant content and measure the
                      effectiveness of our campaigns.
                    </li>
                  </ul>
                  <p>
                    You can manage your cookie preferences through our cookie consent banner or by
                    adjusting your browser settings. For comprehensive information, please visit
                    our{" "}
                    <Link href="/cookies" className="text-manah-gold hover:underline">
                      Cookie Policy
                    </Link>
                    .
                  </p>
                </div>
              </section>

              {/* 10. International Data Transfers */}
              <section id="international-transfers" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    International Data Transfers
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    As a global EPC enterprise with operations across India, the Middle East, and
                    Southeast Asia, your personal data may be transferred to and processed in
                    countries outside your country of residence. When we transfer data
                    internationally, we implement appropriate safeguards to ensure that your
                    personal data receives an adequate level of protection.
                  </p>
                  <p>These safeguards include:</p>
                  <ul className="list-disc pl-6 space-y-2 text-manah-gray-500">
                    <li>
                      Ensuring transfers comply with the conditions specified by the Central
                      Government of India under Section 16 of the DPDP Act, 2023, which permits
                      transfers to countries and territories not restricted by notification
                    </li>
                    <li>
                      Executing data processing agreements with contractual clauses that require
                      recipients to maintain security standards equivalent to those we apply
                    </li>
                    <li>
                      Restricting data transfers to countries and regions with adequate data
                      protection frameworks, or ensuring supplementary measures are in place
                    </li>
                    <li>
                      Applying technical safeguards such as encryption and pseudonymisation to data
                      before transfer
                    </li>
                  </ul>
                  <p>
                    Manah Group does not transfer personal data to any country or territory that
                    has been restricted by the Central Government of India under the DPDP Act.
                  </p>
                </div>
              </section>

              {/* 11. Children's Privacy */}
              <section id="childrens-privacy" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Children&apos;s Privacy
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    Our Website and services are intended for business professionals and are not
                    directed at individuals under the age of 18. We do not knowingly collect,
                    solicit, or process personal data from children or minors.
                  </p>
                  <p>
                    In accordance with Section 9 of the DPDP Act, 2023, any processing of personal
                    data of a child (defined as an individual under 18 years of age) requires
                    verifiable consent from the child&apos;s parent or lawful guardian. We do not
                    undertake processing that may cause any detrimental effect on the well-being of
                    a child, and we do not engage in tracking or behavioural monitoring of children.
                  </p>
                  <p>
                    If we learn that we have inadvertently collected personal data from a child
                    without appropriate parental consent, we will take immediate steps to delete
                    such data. If you believe a child has provided us with personal data, please
                    contact us at{" "}
                    <a
                      href="mailto:privacy@manah.com"
                      className="text-manah-gold hover:underline"
                    >
                      privacy@manah.com
                    </a>
                    .
                  </p>
                </div>
              </section>

              {/* 12. Changes to This Policy */}
              <section id="changes" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Changes to This Policy
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    We may update this Privacy Policy from time to time to reflect changes in our
                    data processing practices, legal requirements, or business operations. When we
                    make material changes, we will:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-manah-gray-500">
                    <li>
                      Post the revised Privacy Policy on this page with an updated &quot;Last
                      updated&quot; date
                    </li>
                    <li>
                      Notify you via email or a prominent notice on our Website if the changes are
                      significant
                    </li>
                    <li>
                      Seek fresh consent where required by law, particularly for changes that affect
                      the purposes of processing or the categories of data collected
                    </li>
                  </ul>
                  <p>
                    We encourage you to review this Privacy Policy periodically to stay informed
                    about how we protect your personal data. Your continued use of our Website
                    following the posting of changes constitutes your acceptance of such changes.
                  </p>
                </div>
              </section>

              {/* 13. Contact Us */}
              <section id="contact" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-manah-gold rounded-full" />
                  <h2 className="font-display text-heading-xl font-bold text-manah-navy">
                    Contact Us
                  </h2>
                </div>
                <div className="space-y-4 text-manah-gray-600 text-body-md leading-relaxed">
                  <p>
                    If you have any questions, concerns, or requests regarding this Privacy Policy
                    or our data processing practices, please contact our Data Protection Officer:
                  </p>
                  <div className="bg-manah-gray-50 rounded-xl p-6 border border-manah-gray-200/60">
                    <p className="font-semibold text-manah-navy mb-1">Data Protection Officer</p>
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
                    If you are not satisfied with our response or believe that your data protection
                    rights have been violated, you may file a complaint with the Data Protection
                    Board of India as established under the DPDP Act, 2023.
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
