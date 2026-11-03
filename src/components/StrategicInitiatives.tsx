import Link from "next/link";
import { ArrowUpRight, MapPin, Users, HeartHandshake, ExternalLink } from "lucide-react";
import { STRATEGIC_INITIATIVES, initiativeGalleries } from "@/data/content";

export { initiativeGalleries };

export default function StrategicInitiatives({
  full = false,
}: {
  full?: boolean;
}) {
  const moveInit = STRATEGIC_INITIATIVES.find((i) => i.id === "move-for-disability") || STRATEGIC_INITIATIVES[0];
  const careerInit = STRATEGIC_INITIATIVES.find((i) => i.id === "career-fair") || STRATEGIC_INITIATIVES[1];
  const cycleInit = STRATEGIC_INITIATIVES.find((i) => i.id === "cycle-g-saifee");
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
          <p>
            From inclusive movement and assistive devices in Dar es Salaam to
            career fairs in Zanzibar, here is how we put inclusion and physiotherapy into action.
          </p>
        </div>

        {/* 1. MOVE FOR DISABILITY 2026 */}
        <article className="initiative-feature" id="move-for-disability">
          <div className="initiative-poster">
            <div className="initiative-poster-top">
              <span className="initiative-badge">Flagship Walkathon & Expo</span>
              <h3>
                Move for
                <br />
                Disability 2026
              </h3>
              <p className="initiative-poster-theme">“{moveInit.theme}”</p>
            </div>
            <div className="initiative-event-facts">
              <div>
                <strong>{moveInit.distance}</strong>
                <span>Inclusive 5KM Walkathon</span>
              </div>
              <div className="initiative-fact-divider" aria-hidden="true" />
              <div>
                <strong>{moveInit.participants}</strong>
                <span>Participants & Advocates</span>
              </div>
            </div>
          </div>

          <div className="initiative-copy">
            <div className="initiative-meta-row">
              <span className="initiative-meta-pill">
                <MapPin size={14} aria-hidden="true" /> {moveInit.location}
              </span>
              <span className="initiative-meta-pill">
                <Users size={14} aria-hidden="true" /> {moveInit.participants} Participants
              </span>
            </div>

            <h3>Movement for everyone</h3>
            <p>
              <strong>Move for Disability 2026 (“Inclusion by Design”)</strong> is a Dar es Salaam
              charity walkathon and health expo organized by the Tanzania Physiotherapy Initiative to bridge
              the country’s mobility gap.
            </p>
            <p>
              Bringing together over 2,000 participants for an inclusive 5KM event, it mobilizes and
              distributes essential assistive devices—targeting 50+ prosthetics, 100+ wheelchairs,
              200+ white canes, and 300+ pairs of crutches—while providing free physiotherapy
              consultations to break disability stigmas.
            </p>

            {moveInit.targets && (
              <div className="initiative-targets-block">
                <h4>Assistive Device Distribution Targets</h4>
                <dl className="initiative-targets">
                  {moveInit.targets.map((t) => (
                    <div key={t.label}>
                      <dt>{t.label}</dt>
                      <dd>{t.count}</dd>
                    </div>
                  ))}
                </dl>
                <p className="initiative-note">
                  Mobilized through donor partnerships, community pledges, and health system alliances.
                </p>
              </div>
            )}

            <div className="initiative-actions">
              <Link
                className="button"
                href={`/donate?cause=assistive-devices`}
              >
                Sponsor assistive devices{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link
                className="button button-outline"
                href={`/contact?subject=${encodeURIComponent("Move for Disability 2026 Participation")}`}
              >
                Register to walk
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

        {/* 2. CAREER FAIR SUZA */}
        <article className="initiative-career" id="career-fair">
          <div>
            <span className="initiative-badge initiative-badge-sub">Workforce & Education</span>
            <h3>{careerInit.title}</h3>
            <p className="initiative-theme">“{careerInit.theme}”</p>
            <div className="initiative-meta-block">
              <p>
                <strong>Location:</strong> {careerInit.location}
              </p>
              {careerInit.partner && (
                <p>
                  <strong>Strategic Partner:</strong> {careerInit.partner}
                </p>
              )}
            </div>
          </div>
          <div className="initiative-copy">
            <p>
              Held at the State University of Zanzibar in partnership with the APSTA–SUZA Chapter,
              the <strong>Tanzania Physiotherapy Career Fair (“Step Into Your Future”)</strong> connects
              students, practitioners, universities, and healthcare employers.
            </p>
            <p>
              The initiative advances regional health development by providing career guidance,
              mentorship, CV workshops, and innovation showcases to prepare the next generation
              of Tanzanian physiotherapists.
            </p>
            {careerInit.pillars && (
              <div className="initiative-pillars-block">
                <h4>Core Pillars & Workshop Focus</h4>
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
                href={`/contact?subject=${encodeURIComponent("Career Fair SUZA Inquiry")}`}
              >
                Inquire or register{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link
                className="text-link"
                href={`/contact?subject=${encodeURIComponent("Career Fair Employer Partnership")}`}
              >
                Partner as healthcare employer
              </Link>
            </div>
          </div>
        </article>

        {/* FULL MODE: 3. CYCLE G X SAIFEE & 4. CLINICAL OUTREACH */}
        {full && cycleInit && (
          <article className="initiative-card-secondary" id="cycle-g-saifee">
            <div className="initiative-card-badge-col">
              <span className="initiative-badge initiative-badge-health">Active Wellness</span>
              <h3>{cycleInit.title}</h3>
              <p className="initiative-theme">“{cycleInit.theme}”</p>
              <div className="initiative-meta-block">
                <p>
                  <strong>Location:</strong> {cycleInit.location}
                </p>
                {cycleInit.partner && (
                  <p>
                    <strong>Partners:</strong> {cycleInit.partner}
                  </p>
                )}
              </div>
            </div>
            <div className="initiative-copy">
              <p>{cycleInit.description}</p>
              {cycleInit.pillars && (
                <div className="initiative-pillars-block">
                  <h4>Wellness Focus Areas</h4>
                  <ul className="career-focus">
                    {cycleInit.pillars.map((pillar) => (
                      <li key={pillar}>{pillar}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="initiative-actions">
                {cycleInit.galleryUrl && (
                  <a
                    className="button"
                    href={cycleInit.galleryUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Cycle G album on Pixieset{" "}
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                )}
                <Link
                  className="text-link"
                  href={`/contact?subject=${encodeURIComponent("Cycle G Health Ride Inquiry")}`}
                >
                  Join community rides <ArrowUpRight size={18} aria-hidden="true" />
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
                See Cycle G × Saifee rides, outreach clinics, and live Pixieset photo documentation.
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


