import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, HeartHandshake, ExternalLink } from "lucide-react";
import { STRATEGIC_INITIATIVES, initiativeGalleries } from "@/data/content";

export { initiativeGalleries };

export default function StrategicInitiatives({
  full = false,
}: {
  full?: boolean;
}) {
  const moveInit = STRATEGIC_INITIATIVES.find((i) => i.id === "move-for-disability") || STRATEGIC_INITIATIVES[0];
  const careerInit = STRATEGIC_INITIATIVES.find((i) => i.id === "career-fair") || STRATEGIC_INITIATIVES[1];
  const rrClinicInit = STRATEGIC_INITIATIVES.find((i) => i.id === "rr-e-clinic");
  const outreachInit = STRATEGIC_INITIATIVES.find((i) => i.id === "community-outreach");

  return (
    <section
      className="initiatives-section section"
      id="strategic-initiatives"
      aria-labelledby="initiatives-heading"
    >
      <div className="frame">
        <div className="section-heading">
          <h2 id="initiatives-heading">
            {full ? "Activities & Strategic Initiatives" : "Current Initiatives"}
          </h2>
        </div>

        {/* 1. MOVE FOR DISABILITY (ANNUAL EVENT) */}
        <article className="initiative-feature" id="move-for-disability">
          <div className="initiative-poster">
            <div className="initiative-poster-top">
              <span className="initiative-badge">Annual Flagship Walkathon & Expo</span>
              <h3>
                Move for
                <br />
                Disability
              </h3>
              <p className="initiative-poster-theme">“{moveInit.theme}”</p>
            </div>
            <div className="initiative-event-facts">
              <div>
                <strong>{moveInit.distance || "5KM"}</strong>
                <span>Inclusive Walkathon</span>
              </div>
              <div className="initiative-fact-divider" aria-hidden="true" />
              <div>
                <strong>Annual</strong>
                <span>Advocacy & Health Expo</span>
              </div>
            </div>
          </div>

          <div className="initiative-copy">
            <div className="initiative-badge-row">
              <span className="initiative-badge initiative-badge-sub">Annual Event</span>
              <span className="initiative-badge initiative-badge-outline">Health & Mobility</span>
            </div>

            <h3>Movement for everyone</h3>
            <p>
              <strong>Move for Disability</strong> is an annual charity walkathon and health expo
              organized to bridge the country’s mobility gap, mobilizing essential assistive devices
              and providing free physiotherapy consultations to champion disability inclusion.
            </p>

            {moveInit.targets && (
              <div className="initiative-targets-block">
                <h4>Assistive Device Distribution Goals</h4>
                <dl className="initiative-targets">
                  {moveInit.targets.map((t) => (
                    <div key={t.label}>
                      <dt>{t.label}</dt>
                      <dd>{t.count}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className="initiative-actions">
              <Link
                className="button"
                href={`/contact?subject=${encodeURIComponent("Move for Disability Event Registration")}`}
              >
                Register for Next Event{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link
                className="button button-outline"
                href={`/donate?cause=assistive-devices`}
              >
                Sponsor assistive devices
              </Link>
              <Link
                className="text-link"
                href="/initiatives/move-for-disability"
              >
                Initiative Details & Dossier <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              {moveInit.galleryUrl && (
                <a
                  className="text-link"
                  href={moveInit.galleryUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View live photos on Pixieset <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </article>

        {/* 2. CAREER FAIR (ANNUAL EVENT WITH PICTURE) */}
        <article className="initiative-career" id="career-fair">
          <div className="initiative-career-visual">
            <div className="initiative-badge-row">
              <span className="initiative-badge initiative-badge-sub">Annual Event</span>
              <span className="initiative-badge initiative-badge-outline">Workforce & Education</span>
            </div>
            <h3>{careerInit.title}</h3>
            <p className="initiative-theme">“{careerInit.theme}”</p>

            {/* Career Fair Picture Section */}
            <div className="initiative-career-image-wrap">
              <Image
                src={careerInit.image || "/images/training/training_3.jpeg"}
                alt="Tanzania Physiotherapy Career Fair"
                width={600}
                height={380}
                className="initiative-career-img"
              />
            </div>
          </div>

          <div className="initiative-copy">
            <p>
              The <strong>Tanzania Physiotherapy Career Fair</strong> is an annual gathering
              connecting students, clinicians, universities, and healthcare employers to guide,
              mentor, and inspire the next generation of Tanzanian rehabilitation professionals.
            </p>
            {careerInit.pillars && (
              <div className="initiative-pillars-block">
                <h4>Core Focus Areas</h4>
                <ul className="career-focus">
                  {careerInit.pillars.map((pillar) => (
                    <li key={pillar}>{pillar}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="initiative-actions">
              <Link
                className="button"
                href={`/contact?subject=${encodeURIComponent("Tanzania Physiotherapy Career Fair Registration")}`}
              >
                Register for Next Event{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link
                className="button button-outline"
                href={`/contact?subject=${encodeURIComponent("Career Fair Employer Partnership")}`}
              >
                Partner as healthcare employer
              </Link>
              <Link
                className="text-link"
                href="/initiatives/career-fair"
              >
                Initiative Details & Dossier <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </article>

        {/* FULL MODE: 3. RR E CLINIC & 4. CLINICAL OUTREACH */}
        {full && rrClinicInit && (
          <article className="initiative-card-secondary" id="rr-e-clinic">
            <div className="initiative-card-badge-col">
              <div
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: 14,
                  overflow: "hidden",
                  background: "#ffffff",
                  border: "1.5px solid rgba(41, 46, 32, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 8,
                  marginBottom: 16,
                  boxShadow: "0 2px 8px rgba(41, 46, 32, 0.05)",
                }}
              >
                <Image
                  src={rrClinicInit.image || "/images/initiatives/rr-e-clinic.jpg"}
                  alt="RR e Clinic logo"
                  width={72}
                  height={72}
                  style={{ objectFit: "contain", width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
              <span className="initiative-badge initiative-badge-health">Digital Health Platform</span>
              <h3>{rrClinicInit.title}</h3>
              <p className="initiative-theme">“{rrClinicInit.theme}”</p>
              <div className="initiative-meta-block">
                <p>
                  <strong>Reach:</strong> {rrClinicInit.location}
                </p>
                {rrClinicInit.partner && (
                  <p>
                    <strong>Partners:</strong> {rrClinicInit.partner}
                  </p>
                )}
              </div>
            </div>
            <div className="initiative-copy">
              <p>{rrClinicInit.description}</p>
              {rrClinicInit.pillars && (
                <div className="initiative-pillars-block">
                  <h4>Digital Health & Rehabilitation Focus</h4>
                  <ul className="career-focus">
                    {rrClinicInit.pillars.map((pillar) => (
                      <li key={pillar}>{pillar}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="initiative-actions">
                <a
                  className="button"
                  href="https://www.instagram.com/rreclinic"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit RR e Clinic on Instagram{" "}
                  <ExternalLink size={16} aria-hidden="true" />
                </a>
                <a
                  className="text-link"
                  href="https://implementome.org/fr/projectdetails/9c2c95ea0e1f4591893330bfbd8fb046"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Implementome Profile <ArrowUpRight size={18} aria-hidden="true" />
                </a>
                <Link
                  className="text-link"
                  href="/initiatives/rr-e-clinic"
                >
                  Initiative Details & Dossier <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        )}

        {full && outreachInit && (
          <article className="initiative-card-secondary" id="community-outreach">
            <div className="initiative-card-badge-col">
              <span className="initiative-badge initiative-badge-care">Clinical Impact</span>
              <h3>{outreachInit.title}</h3>
              <p className="initiative-theme">“{outreachInit.theme}”</p>
              <div className="initiative-meta-block">
                <p>
                  <strong>Location:</strong> {outreachInit.location}
                </p>
                <p>
                  <strong>Focus:</strong> Free assessments & assistive fitting
                </p>
              </div>
            </div>
            <div className="initiative-copy">
              <p>{outreachInit.description}</p>
              {outreachInit.pillars && (
                <div className="initiative-pillars-block">
                  <h4>Community Service Pillars</h4>
                  <ul className="career-focus">
                    {outreachInit.pillars.map((pillar) => (
                      <li key={pillar}>{pillar}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="initiative-actions">
                <Link
                  className="button"
                  href={`/contact?subject=${encodeURIComponent("Clinical Outreach Volunteer")}`}
                >
                  Volunteer as a clinician{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
                <Link
                  className="text-link"
                  href={`/donate?cause=community-outreach`}
                >
                  Sponsor an outreach clinic <HeartHandshake size={18} aria-hidden="true" />
                </Link>
                <Link
                  className="text-link"
                  href="/initiatives/community-outreach"
                >
                  Initiative Details & Dossier <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        )}

        {/* Homepage tease if not full */}
        {!full && (
          <div className="initiative-gallery-link">
            <div>
              <h3>Explore all activities, projects & photo albums</h3>
              <p>
                See Move for Disability, RR e Clinic digital health, and community clinical outreach.
              </p>
            </div>
            <Link className="button" href="/get-involved">
              View all activities & get involved <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}


