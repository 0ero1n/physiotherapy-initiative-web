"use client";

import Link from "next/link";
import Image from "next/image";
import { APP_INFO } from "@/data/content";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="frame footer-main">
        {/* Column 1: Minimal Brand Lockup & Mission */}
        <div className="footer-col footer-col-brand">
          <Link href="/" className="footer-brand-lockup" aria-label="Tanzania Physiotherapy Initiative Home">
            <div className="footer-logo-container">
              <Image
                src="/images/tpi-emblem.png"
                alt="Tanzania Physiotherapy Initiative Logo"
                width={44}
                height={44}
                className="footer-logo-img"
              />
            </div>
            <div className="footer-brand-text">
              <span className="footer-brand-title">Tanzania Physiotherapy Initiative</span>
              <span className="footer-brand-sub">Est. 2025 · Dar es Salaam, Tanzania</span>
            </div>
          </Link>

          <p className="footer-desc">
            Dedicated to advancing physiotherapy education, workforce development, and accessible rehabilitation care across Tanzania.
          </p>

          <div className="footer-socials" aria-label="Social media profiles">
            <a
              href={APP_INFO.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="footer-social-link"
              aria-label="Follow us on Instagram"
            >
              <InstagramIcon size={18} />
              <span>Instagram</span>
            </a>
            <a
              href={APP_INFO.socials.youtube}
              target="_blank"
              rel="noreferrer"
              className="footer-social-link"
              aria-label="Subscribe on YouTube"
            >
              <YoutubeIcon size={18} />
              <span>YouTube</span>
            </a>
            <a
              href={APP_INFO.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="footer-social-link"
              aria-label="Connect on LinkedIn"
            >
              <LinkedinIcon size={18} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="footer-col">
          <h3 className="footer-heading">Navigation</h3>
          <ul className="footer-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Our Mission</Link></li>
            <li><Link href="/approach">Our Approach</Link></li>
            <li><Link href="/initiatives">Get Involved</Link></li>
            <li><Link href="/resources">Publications & Resources</Link></li>
            <li><Link href="/partners">Strategic Partners</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/donate" className="footer-donate-text-link">Donate & Support</Link></li>
          </ul>
        </div>

        {/* Column 3: Focus Areas */}
        <div className="footer-col">
          <h3 className="footer-heading">Initiatives</h3>
          <ul className="footer-links">
            <li><Link href="/initiatives/move-for-disability">Move for Disability</Link></li>
            <li><Link href="/initiatives/career-fair">Tanzania Physiotherapy Career Fair</Link></li>
            <li><Link href="/initiatives/rr-e-clinic">RR e Clinic</Link></li>
            <li><Link href="/initiatives/community-outreach">Clinical Community Outreach</Link></li>
            <li><Link href="/approach/workforce">Workforce Development</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Information */}
        <div className="footer-col footer-col-contact">
          <h3 className="footer-heading">Contact</h3>
          <ul className="footer-contact-list">
            <li>
              <MapPin size={16} className="footer-contact-icon" aria-hidden="true" />
              <span>{APP_INFO.contact.address}</span>
            </li>
            <li>
              <Mail size={16} className="footer-contact-icon" aria-hidden="true" />
              <a href={`mailto:${APP_INFO.contact.email}`}>{APP_INFO.contact.email}</a>
            </li>
            <li>
              <Phone size={16} className="footer-contact-icon" aria-hidden="true" />
              <a href="tel:+255765359305">{APP_INFO.contact.phone}</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Minimal Footer Bottom Bar */}
      <div className="footer-bottom-wrap">
        <div className="frame footer-bottom">
          <p className="footer-copy-text">
            © 2026 Tanzania Physiotherapy Initiative. All rights reserved.
          </p>
          <div className="footer-bottom-right">
            <span className="footer-nonprofit-tag">
              Registered NGO (Reg. ID: {APP_INFO.registrationNumber})
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="footer-back-to-top"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp size={13} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
