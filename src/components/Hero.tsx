"use client";

import Link from "next/link";

export default function Hero({
  title,
  description,
  actionHref,
  actionLabel,
  secondaryHref,
  secondaryLabel,
}: {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace(/^#/, "");
      const target =
        document.getElementById(targetId) ||
        document.querySelector(`[data-alias="${CSS.escape(targetId)}"]`);
      if (target) {
        const header = document.querySelector(".site-header");
        const headerHeight = header ? header.getBoundingClientRect().height : 80;
        const targetY = Math.max(
          0,
          target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20
        );
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="page-hero-banner" aria-label={title}>
      <div className="frame page-hero-inner">
        <h1 className="page-hero-title">{title}</h1>
        <p className="page-hero-desc">{description}</p>
        {(actionHref || secondaryHref) && (
          <div className="page-hero-actions">
            {actionHref && actionLabel && (
              <Link
                href={actionHref}
                onClick={(e) => handleScrollClick(e, actionHref)}
                className="page-hero-btn primary"
              >
                {actionLabel}
              </Link>
            )}
            {secondaryHref && secondaryLabel && (
              <Link
                href={secondaryHref}
                onClick={(e) => handleScrollClick(e, secondaryHref)}
                className="page-hero-btn secondary"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
