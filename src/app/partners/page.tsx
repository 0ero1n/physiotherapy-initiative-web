import type { Metadata } from "next";
import Image from "next/image";
import Hero from "@/components/Hero";
import JoinSection from "@/components/JoinSection";
import CollaboratorsMarquee from "@/components/CollaboratorsMarquee";
import { PARTNERS } from "@/data/content";
import { Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Partners | Tanzania Physiotherapy Initiative",
  description:
    "Collaborating across university medical centers, international rehabilitation networks, and local health leaders to strengthen physiotherapy in Tanzania.",
};

export default function Partners() {
  return (
    <>
      <Hero
        title="Progress is a Shared Effort."
        description="Collaborating across university medical centers, international rehabilitation networks, and local health leaders to strengthen physiotherapy in Tanzania."
        actionHref="/contact"
        actionLabel="Partner With Us"
        secondaryHref="/about"
        secondaryLabel="About Our Mission"
      />

      <figure className="frame wide-photo">
        <Image
          src="/images/training/training_6.jpeg"
          alt="A collaborative discussion at a physiotherapy workshop"
          width={1500}
          height={700}
          priority
        />
      </figure>

      <section className="frame section partners-main-section">
        <div className="section-heading">
          <h2>Our Strategic Partners</h2>
          <p>
            Different perspectives. A common purpose. Meet the university faculties, hospital
            centers, and global health organizations in our active network.
          </p>
        </div>

        <div className="partner-list">
          {PARTNERS.map((p) => (
            <article key={p.name} className="partner-card-row">
              <div className="partner-info-col">
                <div className="partner-logo-wrap">
                  {p.logo ? (
                    <Image
                      src={p.logo}
                      alt={`${p.name} logo`}
                      width={88}
                      height={88}
                      className="partner-logo-img"
                    />
                  ) : (
                    <div className="partner-logo-fallback" aria-hidden="true">
                      <Building2 size={26} />
                    </div>
                  )}
                </div>

                <div className="partner-title-group">
                  <h3>
                    {p.name.startsWith("Association of")
                      ? "Student Association (APSTA)"
                      : p.name.startsWith("Wizara ya Maendeleo ya Jamii")
                      ? "Wizara ya Maendeleo ya Jamii"
                      : p.name}
                  </h3>
                  <span className="partner-type">{p.type}</span>
                </div>
              </div>

              <div className="partner-details-col">
                {(p.name.startsWith("Association of") || p.name.startsWith("Wizara ya Maendeleo ya Jamii")) && (
                  <p className="partner-full-name">{p.name}</p>
                )}
                <p className="partner-desc">{p.description}</p>
                <ul className="partner-focus-list">
                  {p.focusAreas.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Marquee Ticker of Collaborators Passing Smoothly at the Bottom */}
      <CollaboratorsMarquee />

      <JoinSection />
    </>
  );
}
