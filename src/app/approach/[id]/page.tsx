import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Calendar,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  ArrowLeft,
  Briefcase,
  HeartHandshake,
} from "lucide-react";
import { PROGRAMS } from "@/data/content";
import JoinSection from "@/components/JoinSection";

interface ProgramDetail {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  overview: string;
  image: string;
  duration: string;
  cohort: string;
  credentials: string;
  location: string;
  modules: { title: string; desc: string }[];
  outcomes: string[];
}

const PROGRAM_DETAILS: Record<string, ProgramDetail> = {
  academy: {
    id: "academy",
    title: "Tanzania Physiotherapy Academy",
    badge: "Flagship Clinical Education",
    tagline: "Bridging academic theory with high-impact clinical competencies.",
    description:
      "A premier clinical training academy designed for physiotherapy students and newly graduated clinicians. Through simulated patient rounds, biomechanics labs, and supervised outpatient clinics, participants master modern rehabilitation protocols.",
    overview:
      "Tanzania Physiotherapy Academy addresses the critical gap between university lecture halls and clinical frontline delivery. We equip practitioners with evidence-based musculoskeletal assessment, neuro-rehabilitation methodologies, pediatric habilitation, and ethical patient communication.",
    image: "/images/programs/academy-learning.jpg",
    duration: "12-Week Modular Program / Year-Round CPD",
    cohort: "Physiotherapy Students, Interns & Registered Therapists",
    credentials: "CPD Certificate of Clinical Competence",
    location: "Dar es Salaam & Regional Clinical Teaching Centers",
    modules: [
      {
        title: "Clinical Biomechanics & Functional Goniometry",
        desc: "Advanced joint angle quantification, gait analysis, and kinetic chain assessment using standardized clinical tools.",
      },
      {
        title: "Manual Therapy & Mobilization Protocols",
        desc: "Hands-on spinal mobilization, soft tissue release techniques, and trigger point interventions backed by current evidence.",
      },
      {
        title: "Neurological Rehabilitation Pathways",
        desc: "Stroke recovery facilitation, sensory integration, and neuromuscular re-education strategies for adult and pediatric cohorts.",
      },
      {
        title: "Clinical Documentation & Patient Advocacy",
        desc: "Systematic SOAP notes, patient-reported outcome measures (PROMs), and interdisciplinary hospital communications.",
      },
    ],
    outcomes: [
      "Immediate readiness for independent hospital ward and outpatient clinic practice",
      "Mastery of objective diagnostic tools including goniometry and manual muscle testing (MMT)",
      "Direct mentorship from senior consultant physiotherapists across Tanzania",
      "Officially recognized Continuing Professional Development (CPD) hours",
    ],
  },
  "summer-school": {
    id: "summer-school",
    title: "Physiotherapy Summer School",
    badge: "Annual Clinical Intensive",
    tagline: "An immersive regional gathering uniting rising physiotherapists.",
    description:
      "An intensive annual gathering bringing together physiotherapy students and young healthcare professionals from across East Africa for intensive masterclasses, live demonstrations, and collaborative symposiums.",
    overview:
      "Every year, the Summer School transforms clinical education into an energetic community experience. Participants spend 7 days engaged in hands-on workshops, real-world case competitions, and community outreach clinics where they treat patients under the guidance of leading specialists.",
    image: "/images/training/training_3.jpeg",
    duration: "7-Day Intensive Residential Workshop",
    cohort: "Undergraduate Students & Post-Grad Practitioners",
    credentials: "Summer School Fellow Certificate",
    location: "Rotating National Host Campuses (Tanzania)",
    modules: [
      {
        title: "Emergency Sports Trauma & On-Field Management",
        desc: "Pitch-side acute injury triage, functional taping, concussion protocols, and rapid return-to-play assessment.",
      },
      {
        title: "Pediatric Rehabilitation Masterclass",
        desc: "Early intervention strategies for cerebral palsy, clubfoot correction support, and congenital developmental delays.",
      },
      {
        title: "Community Outreach & Mobile Clinical Camps",
        desc: "Setting up pop-up physical therapy diagnostic stations in underserved peri-urban and rural communities.",
      },
      {
        title: "Clinical Research & Scientific Writing",
        desc: "Formulating clinical questions, conducting literature reviews, and drafting abstract submissions for regional congresses.",
      },
    ],
    outcomes: [
      "Peer-to-peer network spanning over 20 regional universities and health colleges",
      "Hands-on practice on diverse patient demographics through supervised mobile camps",
      "Access to international visiting scholars and specialist clinical mentors",
      "Publication opportunities in the Initiative's scientific review digest",
    ],
  },
  exchange: {
    id: "exchange",
    title: "International Exchange Programs",
    badge: "Global Health Fellowship",
    tagline: "Broadening horizons through cross-border clinical exchange.",
    description:
      "Cross-border fellowship and exchange initiatives connecting Tanzanian physiotherapists with international institutions, fostering cross-cultural clinical exchange and global best practices in healthcare.",
    overview:
      "Through partnerships with international universities, hospital networks, and global health organizations, this program facilitates bilateral clinical rotations. Tanzanian practitioners learn about specialized robotic rehabilitation and advanced diagnostics, while visiting fellows gain deep insight into resource-efficient community rehabilitation.",
    image: "/images/programs/international-exchange.jpg",
    duration: "4 to 8-Week Hospital Rotations",
    cohort: "Senior Students, Clinical Officers & Junior Faculty",
    credentials: "Global Health Exchange Certificate",
    location: "Bilateral Partner Hospitals (Tanzania & Global)",
    modules: [
      {
        title: "Comparative Healthcare Systems & Resource Navigation",
        desc: "Understanding multi-tiered public and private rehabilitation frameworks and universal health coverage.",
      },
      {
        title: "Advanced Assistive Tech & Assistive Robotics",
        desc: "Exposure to robotic gait trainers, biofeedback devices, and hydrotherapy rehabilitation setups.",
      },
      {
        title: "Cross-Cultural Clinical Communication",
        desc: "Patient-centered counseling respecting cultural beliefs, linguistic diversity, and community health contexts.",
      },
      {
        title: "Knowledge Transfer & Institutional Capacity Building",
        desc: "Translating international clinical protocols into adaptable standard operating procedures for Tanzanian wards.",
      },
    ],
    outcomes: [
      "International clinical immersion with direct observational and assisted rounds",
      "Strengthened bilateral academic institutional partnerships",
      "Lifelong international alumni network of rehabilitation leaders",
      "Dissemination workshop hosted at the home institution following rotation",
    ],
  },
  incubation: {
    id: "incubation",
    title: "Physiotherapy Innovation Incubation Program",
    badge: "HealthTech & Assistive Devices",
    tagline: "Engineering homegrown rehabilitation solutions for local realities.",
    description:
      "Supporting young professionals and engineers in developing innovative solutions aimed at improving patient care, affordable assistive devices, and digital health tools.",
    overview:
      "The Innovation Incubation program bridges technology and clinical need. We provide maker-space access, clinical trial supervision, and seed mentorship to bring accessible rehabilitation tools—such as locally manufactured crutches, standing frames, and mobile telerehabilitation apps—to market.",
    image: "/images/training/training_7.jpeg",
    duration: "6-Month Incubation Cycle",
    cohort: "Clinical Innovators, Biomedical Students & Tech Founders",
    credentials: "Innovation Fellow & Seed Grant Eligibility",
    location: "Dar es Salaam Maker Hub & Clinical Testbeds",
    modules: [
      {
        title: "Clinical Need Identification & Human-Centered Design",
        desc: "Shadowing therapists and patients to identify unaddressed ergonomic and therapeutic bottlenecks.",
      },
      {
        title: "Rapid Prototyping & Local Materials Engineering",
        desc: "Utilizing local timber, aluminum, vulcanized rubber, and 3D printing to create durable assistive devices.",
      },
      {
        title: "Clinical Safety Testing & Regulatory Compliance",
        desc: "Navigating medical device standards, bio-compatibility testing, and national regulatory approval pathways.",
      },
      {
        title: "Social Enterprise & Sustainable Distribution",
        desc: "Crafting viable business models, unit economics, and partnerships with NGOs and public health dispensaries.",
      },
    ],
    outcomes: [
      "Functional, clinically tested assistive device prototype ready for real patients",
      "Seed micro-grant funding and pitch opportunity before healthcare angel investors",
      "Patent, copyright, and intellectual property legal guidance",
      "Direct pathway for pilot deployment in public regional hospitals",
    ],
  },
  workforce: {
    id: "workforce",
    title: "Workforce Development & Clinical Pathways",
    badge: "National Workforce Strategy",
    tagline: "Scaling trained, accredited physiotherapy talent across all 31 regions.",
    description:
      "Our comprehensive workforce development initiative partners with national universities, regional referral hospitals, and the Ministry of Health to build a resilient, well-distributed clinical rehabilitation workforce.",
    overview:
      "Tanzania faces a critical shortage of physiotherapists in district and rural health centers. The Workforce Development initiative addresses this systemic bottleneck through structured transition programs: taking university graduates into supported clinical residencies, offering continuing education for frontline providers, and advocating for public health facility cadre expansion.",
    image: "/images/training/training_5.jpeg",
    duration: "Ongoing Continuous Initiative",
    cohort: "Frontline Health Workers, Clinical Officers & Allied Professionals",
    credentials: "National Clinical Practice Endorsements",
    location: "Nationwide Coverage (Urban, District & Rural Hospitals)",
    modules: [
      {
        title: "Standardized Clinical Competency Framework",
        desc: "Aligning university curricula with current World Physiotherapy standards and national health priorities.",
      },
      {
        title: "Regional Mentorship & Preceptor Networks",
        desc: "Connecting rural district therapists with senior hospital consultants via digital case reviews and supervision visits.",
      },
      {
        title: "Interprofessional Primary Care Integration",
        desc: "Training nurses and clinical officers in early rehabilitation identification and timely physical therapy referrals.",
      },
      {
        title: "Workforce Retention & Career Fair Pathways",
        desc: "Annual recruitment fairs, scholarship matching, and rural placement incentives to ensure equitable nationwide care.",
      },
    ],
    outcomes: [
      "Equitable distribution of skilled rehabilitation practitioners across rural and urban facilities",
      "High clinical retention through structured mentorship and professional community support",
      "Strengthened collaboration between academic institutions and public healthcare employers",
      "Standardized rehabilitation service quality across national district hospitals",
    ],
  },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return [
    { id: "academy" },
    { id: "summer-school" },
    { id: "exchange" },
    { id: "incubation" },
    { id: "workforce" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const program = PROGRAM_DETAILS[id];
  if (!program) return { title: "Program Not Found" };

  return {
    title: `${program.title} | Approach & Clinical Pathways`,
    description: program.description,
    openGraph: {
      title: `${program.title} | Tanzania Physiotherapy Initiative`,
      description: program.tagline,
      images: [
        {
          url: program.image,
          alt: program.title,
        },
      ],
    },
  };
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { id } = await params;
  const program = PROGRAM_DETAILS[id];

  if (!program) {
    notFound();
  }

  const otherPrograms = Object.values(PROGRAM_DETAILS).filter((p) => p.id !== id);

  return (
    <div className="program-detail-page">
      {/* 1. BREADCRUMBS */}
      <nav className="frame pt-5 sm:pt-8 pb-3 sm:pb-4 text-xs text-[#53594b]" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <li>
            <Link href="/" className="hover:text-[#696112] transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">•</li>
          <li>
            <Link href="/approach" className="hover:text-[#696112] transition-colors">
              Approach & Programs
            </Link>
          </li>
          <li aria-hidden="true">•</li>
          <li className="font-semibold text-[#1f241a]" aria-current="page">
            {program.title}
          </li>
        </ol>
      </nav>

      {/* 2. DEDICATED PROGRAM HERO */}
      <header className="page-hero-banner" aria-label={program.title}>
        <div className="frame page-hero-inner">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 flex-wrap justify-center">
            <span className="initiative-badge">{program.badge}</span>
            <span className="text-xs text-[rgba(255,255,255,0.85)] flex items-center gap-1">
              <Award size={13} aria-hidden="true" />
              {program.credentials}
            </span>
          </div>

          <h1 className="page-hero-title">{program.title}</h1>
          <p className="page-hero-desc">{program.tagline}</p>

          <div className="page-hero-actions">
            <Link
              href={`/contact?subject=${encodeURIComponent(`${program.title} Application`)}`}
              className="page-hero-btn primary"
            >
              Apply / Inquire About Enrollment
            </Link>
            <Link href="/approach" className="page-hero-btn secondary">
              All 4 Clinical Pathways
            </Link>
          </div>
        </div>
      </header>

      {/* 3. MAIN CONTENT ARTICLE */}
      <article className="frame section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Image & Program Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-[#d8decb] bg-[#f4f6ee] shadow-sm">
              <Image
                src={program.image}
                alt={`${program.title} session in action`}
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            {/* Quick Facts Card */}
            <div className="p-5 sm:p-6 bg-[#f8faf4] border border-[#dfe3d3] rounded-2xl space-y-4 text-sm">
              <h3 className="font-bold text-[#1f241a] text-base border-b border-[#dfe3d3] pb-2 flex items-center gap-2">
                <BookOpen size={16} className="text-[#696112]" aria-hidden="true" />
                <span>Program Specifications</span>
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-[#53594b] font-semibold flex items-center gap-1.5">
                    <Calendar size={13} aria-hidden="true" />
                    <span>Duration & Schedule</span>
                  </dt>
                  <dd className="font-medium text-[#1f241a] mt-0.5">{program.duration}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-[#53594b] font-semibold flex items-center gap-1.5">
                    <Users size={13} aria-hidden="true" />
                    <span>Target Cohort</span>
                  </dt>
                  <dd className="font-medium text-[#1f241a] mt-0.5">{program.cohort}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-[#53594b] font-semibold flex items-center gap-1.5">
                    <Award size={13} aria-hidden="true" />
                    <span>Certification / Outcome</span>
                  </dt>
                  <dd className="font-medium text-[#1f241a] mt-0.5">{program.credentials}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-[#53594b] font-semibold flex items-center gap-1.5">
                    <Briefcase size={13} aria-hidden="true" />
                    <span>Host Locations</span>
                  </dt>
                  <dd className="font-medium text-[#1f241a] mt-0.5">{program.location}</dd>
                </div>
              </dl>

              <div className="pt-3 border-t border-[#dfe3d3]">
                <Link
                  href={`/contact?subject=${encodeURIComponent(`${program.title} Information Request`)}`}
                  className="button button-ghost w-full justify-center text-xs"
                >
                  <span>Request Full Curriculum Syllabus</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Deep-dive narrative & Modules */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#696112] block mb-2">
                Program Dossier & Curriculum
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1f241a] tracking-tight mb-4">
                About {program.title}
              </h2>
              <p className="text-base text-[#494f41] leading-relaxed mb-4">
                {program.description}
              </p>
              <p className="text-sm text-[#53594b] leading-relaxed">
                {program.overview}
              </p>
            </div>

            {/* Curriculum Modules */}
            <div>
              <h3 className="font-bold text-[#1f241a] text-xl mb-4 flex items-center gap-2">
                <GraduationCap size={20} className="text-[#696112]" aria-hidden="true" />
                <span>Core Curriculum Modules</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {program.modules.map((m, idx) => (
                  <div
                    key={m.title}
                    className="p-4 rounded-xl border border-[#dfe3d3] bg-[#f8faf4] hover:border-[#696112] transition-colors"
                  >
                    <div className="text-xs font-bold text-[#696112] font-mono mb-1">
                      Module 0{idx + 1}
                    </div>
                    <h4 className="font-semibold text-sm text-[#1f241a] mb-1.5">
                      {m.title}
                    </h4>
                    <p className="text-xs text-[#53594b] leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Expected Learning Outcomes */}
            <div className="p-5 sm:p-6 bg-[#eceee2] rounded-2xl border border-[#dfe3d3]">
              <h3 className="font-bold text-[#1f241a] text-lg mb-3">
                Expected Competency Outcomes
              </h3>
              <ul className="space-y-2.5">
                {program.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2.5 text-xs text-[#3b4233]">
                    <CheckCircle2 size={16} className="text-[#696112] shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="leading-relaxed font-medium">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Call to Action Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#f8faf4] to-[#eceee2] border border-[#d8decb] flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6">
              <div>
                <h4 className="font-bold text-[#1f241a] text-base mb-1">
                  Interested in Participating or Partnering?
                </h4>
                <p className="text-xs text-[#53594b] leading-relaxed max-w-md">
                  Whether enrolling as a practitioner, placing student interns, or hosting a clinical cohort, we welcome your collaboration.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto">
                <Link
                  href={`/contact?subject=${encodeURIComponent(`${program.title} Enrollment`)}`}
                  className="button whitespace-nowrap text-xs w-full sm:w-auto justify-center"
                >
                  <HeartHandshake size={14} aria-hidden="true" />
                  <span>Enroll Today</span>
                </Link>
                <Link href="/approach" className="button button-ghost text-xs w-full sm:w-auto justify-center">
                  <span>Back to All Programs</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* 4. EXPLORE OTHER PATHWAYS */}
      <section className="frame section pt-0" aria-label="Explore other pathways">
        <div className="border-t border-[#dfe3d3] pt-10 sm:pt-12">
          <div className="flex items-center justify-between mb-6 sm:mb-8 flex-wrap gap-4">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#696112] block mb-1">
                Clinical Ecosystem
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1f241a]">
                Explore Other Pathways
              </h3>
            </div>
            <Link
              href="/approach"
              className="text-xs font-semibold text-[#696112] hover:underline inline-flex items-center gap-1"
            >
              <span>View All Programs Overview</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {otherPrograms.map((p) => (
              <Link
                key={p.id}
                href={`/approach/${p.id}`}
                className="group block p-5 rounded-2xl bg-[#f8faf4] border border-[#dfe3d3] hover:border-[#696112] transition-all hover:shadow-md"
              >
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#696112] block mb-1.5">
                  {p.badge}
                </span>
                <h4 className="font-bold text-sm text-[#1f241a] group-hover:text-[#696112] transition-colors mb-2 line-clamp-1">
                  {p.title}
                </h4>
                <p className="text-xs text-[#53594b] line-clamp-2 leading-relaxed mb-4">
                  {p.tagline}
                </p>
                <span className="text-xs font-semibold text-[#696112] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Learn more</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <JoinSection />
    </div>
  );
}
