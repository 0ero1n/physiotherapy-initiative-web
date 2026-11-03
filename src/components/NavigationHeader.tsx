"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight, Heart } from "lucide-react";

const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/approach", "Our Approach"],
  ["/initiatives", "Activities & Projects"],
  ["/resources", "Resources"],
  ["/partners", "Partners"],
  ["/contact", "Contact"],
];

export default function NavigationHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close mobile nav automatically on route change
  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <header className={`site-header ${open ? "menu-is-open" : ""}`} suppressHydrationWarning>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="nav-frame" suppressHydrationWarning>
        <Link
          href="/"
          className="brand"
          aria-label="Tanzania Physiotherapy Initiative home"
          onClick={() => setOpen(false)}
          suppressHydrationWarning
        >
          <div className="brand-logo-container" suppressHydrationWarning>
            <Image
              src="/images/our-logo.jpeg"
              alt="Tanzania Physiotherapy Initiative"
              width={42}
              height={42}
              className="brand-logo-img"
              priority
            />
          </div>
          <div className="brand-text-col" suppressHydrationWarning>
            <span className="brand-name">Tanzania Physiotherapy Initiative</span>
            <span className="brand-established">Est. 2025</span>
          </div>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Action button on desktop */}
        <div className="nav-actions" suppressHydrationWarning>
          <Link
            className="nav-btn nav-btn-white"
            href="/donate"
            aria-label="Make a donation to support physiotherapy education"
            suppressHydrationWarning
          >
            Donate
          </Link>
        </div>

        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X color="#ffffff" size={22} strokeWidth={2.4} /> : <Menu color="#ffffff" size={22} strokeWidth={2.4} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              document
                .querySelector<HTMLButtonElement>(".menu-toggle")
                ?.focus();
            }
          }}
        >
          <div className="mobile-nav-inner">
            <div className="mobile-nav-links">
              {links.map(([href, label]) => {
                const isActive = path === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`mobile-nav-link ${isActive ? "active" : ""}`}
                  >
                    <span>{label}</span>
                    <ChevronRight size={16} className="mobile-nav-chevron" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>

            <div className="mobile-nav-actions">
              <Link
                className="mobile-btn-secondary"
                href="/initiatives"
                onClick={() => setOpen(false)}
              >
                Get Involved
              </Link>
              <Link
                className="mobile-btn-primary"
                href="/donate"
                onClick={() => setOpen(false)}
              >
                <Heart size={16} strokeWidth={2.5} fill="#4a450b" aria-hidden="true" />
                <span>Donate</span>
              </Link>
            </div>

            <div className="mobile-nav-footer">
              <span className="mobile-nav-tagline">Tanzania Physiotherapy Initiative</span>
              <a href="tel:+255765359305" className="mobile-nav-meta">
                +255 765 359 305
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
