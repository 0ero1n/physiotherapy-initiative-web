"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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

  return (
    <header className="site-header" suppressHydrationWarning>
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

        {/* Clean action button matching live physioinitiativetz.org */}
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
          {open ? <X color="#ffffff" size={24} /> : <Menu color="#ffffff" size={24} />}
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
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={path === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}

          <div className="mobile-nav-actions">
            <Link
              className="nav-btn nav-btn-outline"
              href="/initiatives"
              onClick={() => setOpen(false)}
            >
              Get Involved
            </Link>
            <Link
              className="nav-btn nav-btn-white"
              href="/donate"
              onClick={() => setOpen(false)}
            >
              Donate
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
