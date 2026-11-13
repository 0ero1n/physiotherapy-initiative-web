import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  HeartHandshake,
  ExternalLink,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { STRATEGIC_INITIATIVES } from "@/data/content";
import JoinSection from "@/components/JoinSection";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return STRATEGIC_INITIATIVES.map((init) => ({
    id: init.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const initiative = STRATEGIC_INITIATIVES.find((i) => i.id === id);
  if (!initiative) return { title: "Initiative Not Found" };

  return {
    title: `${initiative.title}`,
    description: initiative.description,
    openGraph: {
      title: `${initiative.title} | Tanzania Physiotherapy Initiative`,
      description: initiative.summary,
      images: [
        {
          url: initiative.image || "/images/initiatives/community-outreach.jpg",
          alt: initiative.title,
        },
      ],
    },
  };
}

export default async function InitiativeDetailPage({ params }: PageProps) {
  const { id } = await params;
  const initiative = STRATEGIC_INITIATIVES.find((i) => i.id === id);

  if (!initiative) {
    notFound();
  }

  const otherInitiatives = STRATEGIC_INITIATIVES.filter((i) => i.id !== id);

  return (
    <div className="initiative-detail-page">
      {/* 1. BREADCRUMBS & TOP NAV */}
      <nav className="frame pt-8 pb-4 text-xs text-[#53594b]" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <Link href="/" className="hover:text-[#696112] transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">•</li>
          <li>
            <Link href="/initiatives" className="hover:text-[#696112] transition-colors">
              Strategic Initiatives
            </Link>
          </li>
          <li aria-hidden="true">•</li>
          <li className="font-semibold text-[#1f241a]" aria-current="page">
            {initiative.title}
          </li>
        </ol>
      </nav>

      {/* 2. DEDICATED INITIATIVE HERO */}
      <header className="page-hero-banner" aria-label={initiative.title}>
        <div className="frame page-hero-inner">
          <div className="flex items-center gap-3 mb-3">
            <span className="initiative-badge">
              {initiative.badge || "Strategic Initiative"}
            </span>
            <span className="text-xs text-[rgba(255,255,255,0.7)] flex items-center gap-1">
              <MapPin size={13} aria-hidden="true" />
              {initiative.location}
            </span>
          </div>

          <h1 className="page-hero-title">{initiative.title}</h1>
          <p className="page-hero-desc">“{initiative.theme}” — {initiative.tagline}</p>

          <div className="page-hero-actions">
            <Link
              href={`/contact?subject=${encodeURIComponent(`${initiative.title} Inquiry`)}`}
              className="page-hero-btn primary"
            >
              Get Involved & Volunteer
            </Link>
            <Link
              href={`/donate?cause=${encodeURIComponent(initiative.id)}`}
              className="page-hero-btn secondary"
            >
              Sponsor This Initiative
            </Link>
          </div>
        </div>
      </header>

      {/* 3. MAIN DOSSIER & CONTENT SECTION */}
      <article className="frame section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Visual Asset / Logo / Metadata */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-[#d8decb] bg-[#f4f6ee] shadow-sm">
              <Image
                src={initiative.image || "/images/initiatives/community-outreach.jpg"}
                alt={initiative.title}
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            {/* Quick Fact Card */}
            <div className="p-6 bg-[#f8faf4] border border-[#dfe3d3] rounded-2xl space-y-4 text-sm">
              <h3 className="font-bold text-[#1f241a] text-base border-b border-[#dfe3d3] pb-2">
                Initiative Overview
              </h3>
              <dl className="space-y-2.5">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-[#53594b] font-semibold">
                    Core Theme
                  </dt>
                  <dd className="font-medium text-[#1f241a]">{initiative.theme}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-[#53594b] font-semibold">
                    Primary Reach
                  </dt>
                  <dd className="font-medium text-[#1f241a]">{initiative.location}</dd>
                </div>
                {initiative.partner && (
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-[#53594b] font-semibold">
                      Key Partners
                    </dt>
                    <dd className="font-medium text-[#1f241a]">{initiative.partner}</dd>
                  </div>
                )}
                {initiative.distance && (
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-[#53594b] font-semibold">
                      Course Distance
                    </dt>
                    <dd className="font-medium text-[#1f241a]">{initiative.distance} Walkathon</dd>
                  </div>
                )}
              </dl>

              {/* Gallery & External Platform Links */}
              {initiative.galleryUrl && (
                <div className="pt-3 border-t border-[#dfe3d3]">
                  <a
                    href={initiative.galleryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-ghost w-full justify-center text-xs"
                  >
                    <span>Official Live Documentation & Media</span>
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Narrative, Pillars & Action */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#696112] block mb-2">
                Official Programme Dossier
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1f241a] tracking-tight mb-4">
                About {initiative.title}
              </h2>
              <p className="text-base text-[#494f41] leading-relaxed mb-6">
                {initiative.description}
              </p>
            </div>

            {/* Target Breakdown (for Move for Disability) */}
            {initiative.targets && (
              <div className="p-6 bg-[#eceee2] rounded-2xl border border-[#dfe3d3]">
                <h3 className="font-bold text-[#1f241a] text-lg mb-4">
                  Assistive Device Mobilization Targets
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  {initiative.targets.map((tgt) => (
                    <div key={tgt.label} className="p-3 bg-white rounded-xl shadow-xs border border-[#d8decb]">
                      <div className="text-2xl font-bold text-[#696112] font-mono">{tgt.count}</div>
                      <div className="text-xs text-[#53594b] font-medium mt-1">{tgt.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Strategic Pillars */}
            {initiative.pillars && (
              <div>
                <h3 className="font-bold text-[#1f241a] text-xl mb-4">
                  Core Implementation Pillars
                </h3>
                <ul className="space-y-3">
                  {initiative.pillars.map((pillar) => (
                    <li key={pillar} className="flex items-start gap-3 text-sm text-[#3b4233]">
                      <CheckCircle2 size={18} className="text-[#696112] shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="leading-relaxed">{pillar}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#f8faf4] to-[#eceee2] border border-[#d8decb] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h4 className="font-bold text-[#1f241a] text-base mb-1">
                  Ready to Support This Campaign?
                </h4>
                <p className="text-xs text-[#53594b] leading-relaxed max-w-md">
                  Whether providing clinical hours, assistive devices, or financial support, your contribution directly empowers communities across Tanzania.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href={`/donate?cause=${encodeURIComponent(initiative.id)}`}
                  className="button whitespace-nowrap text-xs"
                >
                  <HeartHandshake size={14} aria-hidden="true" />
                  <span>Sponsor Device</span>
                </Link>
                <Link
                  href={`/contact?subject=${encodeURIComponent(`${initiative.title} Volunteer`)}`}
                  className="button button-ghost whitespace-nowrap text-xs"
                >
                  <span>Volunteer</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 4. OTHER INITIATIVES CAROUSEL / NAVIGATION */}
        <section className="mt-20 pt-12 border-t border-[#dfe3d3]" aria-labelledby="other-initiatives-heading">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <h2 id="other-initiatives-heading" className="text-xl sm:text-2xl font-bold text-[#1f241a]">
                Explore Other Strategic Initiatives
              </h2>
              <p className="text-xs text-[#53594b] mt-1">
                Connecting clinical excellence with nationwide community health impact.
              </p>
            </div>
            <Link href="/initiatives" className="text-link text-xs whitespace-nowrap">
              <span>View all initiatives</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherInitiatives.map((other) => (
              <Link
                key={other.id}
                href={`/initiatives/${other.id}`}
                className="group p-6 rounded-2xl bg-[#f8faf4] border border-[#dfe3d3] hover:border-[#696112] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="initiative-badge text-[10px] mb-3 inline-block">
                    {other.badge || "Initiative"}
                  </span>
                  <h3 className="font-bold text-[#1f241a] text-lg group-hover:text-[#696112] transition-colors mb-2">
                    {other.title}
                  </h3>
                  <p className="text-xs text-[#53594b] line-clamp-3 leading-relaxed">
                    {other.summary}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#e6eadc] flex items-center justify-between text-xs font-semibold text-[#696112]">
                  <span>Explore initiative</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </article>

      <JoinSection />
    </div>
  );
}
