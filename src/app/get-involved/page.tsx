import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import JoinSection from "@/components/JoinSection";
import {
  Stethoscope,
  GraduationCap,
  Building2,
  Heart,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Join Tanzania Physiotherapy Initiative as a clinical volunteer, student practitioner, institutional partner, or assistive device sponsor.",
};

const pathways = [
  {
    icon: Stethoscope,
    badge: "Clinical Practice",
    title: "Physiotherapists & Mentors",
    description:
      "Share your expertise with emerging clinicians, lead clinical skills workshops, and participate in community rehabilitation outreach camps across Tanzania.",
    points: [
      "Facilitate hands-on clinical skills modules",
      "Provide 1-on-1 mentorship to recent graduates",
      "Volunteer in community screening and assistive device fittings",
    ],
    ctaText: "Volunteer as a Clinician",
    ctaHref: "/contact?subject=Clinical+Volunteer+Inquiry",
  },
  {
    icon: GraduationCap,
    badge: "Students & Graduates",
    title: "Students & Early-Career Clinicians",
    description:
      "Accelerate your clinical competence through specialized workshops, career mentorship, and networking at our annual career fairs in Zanzibar and mainland Tanzania.",
    points: [
      "Participate in State University of Zanzibar (SUZA) Career Fair",
      "Access peer learning circles and clinical case discussions",
      "Gain exposure to diverse hospital and community rehabilitation settings",
    ],
    ctaText: "Connect with Student Programs",
    ctaHref: "/contact?subject=Student+Practitioner+Inquiry",
  },
  {
    icon: Building2,
    badge: "Institutions & NGOs",
    title: "Strategic & Institutional Partners",
    description:
      "Collaborate with us to strengthen workforce policy, develop accredited training curricula, and expand rehabilitation access in underserved health facilities.",
    points: [
      "Joint health workforce research and curriculum enhancement",
      "Hospital department exchanges and clinical equipment grants",
      "Collaborative advocacy for physical therapy recognition in public health",
    ],
    ctaText: "Explore Institutional Partnerships",
    ctaHref: "/partners",
  },
  {
    icon: Heart,
    badge: "Philanthropy & Mobility",
    title: "Donors & Device Sponsors",
    description:
      "Directly fund mobility devices—including wheelchairs, prosthetics, white canes, and crutches—for 650+ Tanzanians with physical disabilities through Move for Disability 2026.",
    points: [
      "100% direct allocation towards certified assistive technology",
      "Transparent distribution reports and recipient impact verification",
      "Support clinical training scholarships for students with financial need",
    ],
    ctaText: "Sponsor Assistive Devices",
    ctaHref: "/donate",
  },
];

const faqs = [
  {
    q: "Who can volunteer with the Tanzania Physiotherapy Initiative?",
    a: "We welcome licensed physiotherapists, occupational therapists, rehabilitation doctors, clinical educators, and university physiotherapy students from both Tanzania and abroad.",
  },
  {
    q: "Do I need to be located in Dar es Salaam to participate?",
    a: "No. While our administrative base and several flagship events operate in Dar es Salaam and Zanzibar, we run community outreach across multiple regions and support remote mentoring and digital workshops.",
  },
  {
    q: "How are donated assistive devices distributed?",
    a: "All devices—such as wheelchairs, crutches, and white canes—are assessed and fitted by certified physiotherapists to ensure individual safety, proper ergonomic fit, and long-term functionality.",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <Hero
        title="Move with Us. Shape the Future."
        description="Every movement counts. Whether you are a practicing clinician, student, institutional partner, or passionate supporter, there is a meaningful pathway for you to strengthen rehabilitation care across Tanzania."
        actionHref="#pathways"
        actionLabel="Explore Involvement Pathways"
        secondaryHref="/donate"
        secondaryLabel="Support Our Mission"
      />

      {/* Pathways Grid */}
      <section id="pathways" className="section frame" aria-labelledby="pathways-heading">
        <div className="section-heading">
          <h2 id="pathways-heading">
            Four pathways
            <br />
            to make an impact.
          </h2>
          <p>
            Choose the engagement path that matches your clinical background, institutional focus, or
            philanthropic goals.
          </p>
        </div>

        <div className="involvement-grid">
          {pathways.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="involvement-card">
                <div className="involvement-card-header">
                  <div className="involvement-icon-box">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <span className="involvement-badge">{item.badge}</span>
                </div>
                <h3 className="involvement-card-title">{item.title}</h3>
                <p className="involvement-card-desc">{item.description}</p>
                <ul className="involvement-points">
                  {item.points.map((pt) => (
                    <li key={pt}>
                      <CheckCircle2 size={16} className="text-[#696112] flex-shrink-0" aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <div className="involvement-card-cta">
                  <Link href={item.ctaHref} className="button involvement-btn">
                    <span>{item.ctaText}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cross-Link Banner to Activities & Projects */}
      <section className="section frame pt-0">
        <div className="initiatives-crosslink-card">
          <div className="initiatives-crosslink-text">
            <h3>Looking for our active events & photo galleries?</h3>
            <p>
              Explore Move for Disability 2026, the SUZA Career Fair in Zanzibar, our RR e Clinic
              digital health platform, and live high-resolution photo archives.
            </p>
          </div>
          <Link href="/initiatives" className="button crosslink-button">
            <span>Browse All Activities & Projects</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="section frame pt-0" aria-labelledby="faq-heading">
        <div className="section-heading">
          <h2 id="faq-heading">
            Frequently asked
            <br />
            questions.
          </h2>
          <p>Everything you need to know about joining and supporting our community.</p>
        </div>

        <div className="faq-grid">
          {faqs.map((faq) => (
            <div key={faq.q} className="faq-card">
              <div className="faq-icon-row">
                <HelpCircle size={18} className="text-[#696112]" aria-hidden="true" />
                <h4>{faq.q}</h4>
              </div>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <JoinSection />
    </>
  );
}
