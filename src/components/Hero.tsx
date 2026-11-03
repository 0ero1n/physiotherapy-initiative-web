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
  return (
    <section className="page-hero-banner" aria-label={title}>
      <div className="frame page-hero-inner">
        <h1 className="page-hero-title">{title}</h1>
        <p className="page-hero-desc">{description}</p>
        {(actionHref || secondaryHref) && (
          <div className="page-hero-actions">
            {actionHref && actionLabel && (
              <Link href={actionHref} className="page-hero-btn primary">
                {actionLabel}
              </Link>
            )}
            {secondaryHref && secondaryLabel && (
              <Link href={secondaryHref} className="page-hero-btn secondary">
                {secondaryLabel}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
