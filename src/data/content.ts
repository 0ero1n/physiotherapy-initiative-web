export interface CoreValue {
  title: string;
  description: string;
  icon: "star" | "heart" | "shield" | "hands";
}

export interface LeadershipMember {
  name: string;
  position: string;
  photo: string;
  bio?: string;
}

export interface Program {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  features: string[];
  icon: "academy" | "summer" | "exchange" | "innovation";
  image?: string;
}

export interface Partner {
  name: string;
  type: string;
  description: string;
  focusAreas: string[];
  website?: string;
  logo?: string;
}

export interface Collaborator {
  name: string;
  role: string;
  logo: string;
  website?: string;
}

export const APP_INFO = {
  name: "Tanzania Physiotherapy Initiative",
  shortName: "TPI",
  registrationNumber: "ooNGO/R/9429",
  tagline: "Shaping the future workforce in physiotherapy within Tanzania",
  missionStatement:
    "In response to the growing demand for quality physiotherapy services, the Tanzania Physiotherapy Initiative aims to develop highly skilled and compassionate physiotherapists who can meet the challenges of the evolving healthcare landscape.",
  quoteAuthor: "Dr. Elia Swai",
  establishedYear: "2025",
  contact: {
    address: "Mikumi Street, Kinondoni District, Dar es Salaam, Tanzania",
    city: "Dar es Salaam",
    country: "Tanzania",
    email: "info@physioinitiativetz.org",
    secondaryEmail: "info@tanzaniaphysiotherapy.org",
    phone: "+255 765 359 305",
    hours: "Monday – Friday: 8:00 AM – 5:00 PM EAT",
  },
  socials: {
    instagram: "https://www.instagram.com/ptinitiativetz?srtk=MXIzbTJ1MXljYng1aA==",
    youtube: "https://youtube.com/@physioinitiativetz?si=NEYNbbLF9bMHfeDO",
    linkedin: "https://www.linkedin.com/company/tanzania-physiotherapy-initiative/",
    facebook: "https://facebook.com/tanzaniaphysiotherapy",
    twitter: "https://twitter.com/tanzaniaphysio",
  },
};

export const CORE_VALUES: CoreValue[] = [
  {
    title: "Pursuing Excellence",
    description: "We strive for the highest standards in education, practice, and clinical patient outcomes.",
    icon: "star",
  },
  {
    title: "Leading with Heart",
    description: "We believe in servant leadership, putting the needs of patients first and serving the communities across Tanzania.",
    icon: "heart",
  },
  {
    title: "Integrity at Our Core",
    description: "Honesty and transparency guide our actions, stewardship, and decisions, building lasting trust.",
    icon: "shield",
  },
  {
    title: "Compassion in Action",
    description: "We foster a culture of empathy, active listening, and comprehensive rehabilitation care for all.",
    icon: "hands",
  },
];

export const LEADERSHIP_TEAM: LeadershipMember[] = [
  {
    name: "Emmanuel Jacob",
    position: "Chairperson",
    photo: "/images/leadership/emmanuel_jacob.jpeg",
    bio: "Guiding the strategic direction and governance of the initiative with extensive experience in physical therapy leadership.",
  },
  {
    name: "MacDonald Munuo",
    position: "Executive Secretary",
    photo: "/images/leadership/macdonald_munuo1.png",
    bio: "Directing executive coordination, institutional partnerships, and day-to-day administrative excellence.",
  },
  {
    name: "Estom Uvambe",
    position: "Assistant Secretary General",
    photo: "/images/leadership/estom_uvambe.jpg",
    bio: "Serving as Assistant Secretary General, bringing dedication and strong organizational leadership to advancing the profession, expanding community rehabilitation outreach, and supporting clinical education across Tanzania.",
  },
  {
    name: "Daniel Materu",
    position: "Financial Manager",
    photo: "/images/leadership/materu1.png",
    bio: "Managing fiscal transparency, donor grant accountability, and sustainable financial planning.",
  },
  {
    name: "Edson Mpunga",
    position: "Head of Operations",
    photo: "/images/leadership/edson_mpunga.jpeg",
    bio: "Overseeing field programs, logistics, workshop arrangements, and clinical resource distribution.",
  },
  {
    name: "Dorice Magayane",
    position: "Head of Training & Professional Development",
    photo: "/images/leadership/dorice_magayane1.png",
    bio: "Designing hands-on curricula, continuing education seminars, and expert mentoring pipelines.",
  },
];

export const PROGRAMS: Program[] = [
  {
    id: "academy",
    title: "Tanzania Physiotherapy Academy",
    shortDesc: "Provides practical, competence-based training that effectively links theoretical knowledge with hands-on skills.",
    description:
      "A flagship academy bridging academic education with real-world clinical application. Students and practitioners learn advanced rehabilitation techniques, diagnostic reasoning, and evidence-backed therapy.",
    features: [
      "Competency-based clinical modules",
      "Hands-on biomechanics & electrotherapy labs",
      "Mentorship from certified physiotherapists",
      "Certification of Continuing Professional Development",
    ],
    icon: "academy",
    image: "/images/programs/academy-learning.jpg",
  },
  {
    id: "summer-school",
    title: "Physiotherapy Summer School",
    shortDesc: "Create an immersive learning environment featuring sessions led by experts, advanced techniques, and valuable networking.",
    description:
      "An intensive annual gathering bringing together physiotherapy students and young professionals across East Africa for intensive masterclasses, live demonstrations, and professional symposiums.",
    features: [
      "Guest lectures from international specialists",
      "Specialized rehabilitation workshops (Pediatric, Orthopedic, Neuro)",
      "Student research presentation showcase",
      "Community health clinic outreach days",
    ],
    icon: "summer",
    image: "/images/training/training_3.jpeg",
  },
  {
    id: "exchange",
    title: "International Exchange Programs",
    shortDesc: "Provide students and professionals with insights into diverse healthcare systems to enhance their knowledge and skill sets.",
    description:
      "Cross-border fellowship and exchange initiatives connecting Tanzanian physiotherapists with international institutions, fostering cross-cultural clinical exchange and global best practices.",
    features: [
      "Bilateral hospital clinical rotations",
      "Cross-cultural medical seminars",
      "Collaborative research initiatives",
      "Exposure to specialized rehabilitation measurement technology",
    ],
    icon: "exchange",
    image: "/images/programs/international-exchange.jpg",
  },
  {
    id: "incubation",
    title: "Physiotherapy Innovation Incubation Program",
    shortDesc: "Support young professionals in developing innovative solutions aimed at improving patient care and fostering growth.",
    description:
      "An incubator supporting homegrown assistive technology, affordable therapy aids, and digital health tools customized for Tanzanian healthcare facilities and rural health posts.",
    features: [
      "Affordable assistive device prototyping",
      "Seed micro-grants for clinical research",
      "Entrepreneurship & intellectual property coaching",
      "Testing in local community clinics",
    ],
    icon: "innovation",
    image: "/images/training/training_7.jpeg",
  },
];

export const PARTNERS: Partner[] = [
  {
    name: "Wizara ya Maendeleo ya Jamii, Jinsia, Wanawake na Makundi Maalum",
    type: "Government Ministry",
    logo: "/images/patners/maendeleo-ya-jamii.jpeg",
    description: "Tanzanian government ministry leading national social welfare development, disability inclusion, and empowerment of special groups across the nation.",
    focusAreas: ["Disability Inclusion", "Special Groups Empowerment", "Community Welfare"],
  },
  {
    name: "Muhimbili University of Health & Allied Sciences",
    type: "Academic Institution",
    logo: "/images/patners/MUHAS.png",
    description: "Tanzania’s premier public university for health sciences offering advanced rehabilitation medicine and clinical specialist training.",
    focusAreas: ["Higher Education", "Clinical Research", "Professional Development"],
  },
  {
    name: "Association of Physiotherapist Students in Tanzania",
    type: "Local Partner",
    logo: "/images/patners/APSTA.jpeg",
    description: "Student-led organization promoting physiotherapy education and professional development across university campuses in Tanzania.",
    focusAreas: ["Student Development", "Professional Networking", "Educational Programs"],
  },
  {
    name: "ElevenLabs",
    type: "Technology & AI Partner",
    logo: "/images/collab/eleven-labs.webp",
    description: "Global AI and audio technology pioneer advancing voice accessibility, AI tools, and inclusive digital communication in rehabilitation healthcare.",
    focusAreas: ["Voice Accessibility", "AI Technology", "Digital Health"],
  },
  {
    name: "Circleg",
    type: "Assistive Technology & Mobility",
    logo: "/images/collab/circleg.jpeg",
    description: "Pioneering high-quality, durable prosthetic systems and holistic rehabilitation mobility solutions tailored for low- and middle-income regions.",
    focusAreas: ["Prosthetics", "Mobility Solutions", "Community Rehabilitation"],
  },
  {
    name: "VALD",
    type: "Clinical Technology Partner",
    logo: "/images/patners/vald_logo.jpeg",
    description: "Global pioneer in human movement assessment and musculoskeletal measurement technologies, supporting modern diagnostics.",
    focusAreas: ["Clinical Tools", "Outcome Measurement", "Objective Assessment"],
  },
];

export const COLLABORATORS: Collaborator[] = [
  {
    name: "Wizara ya Maendeleo ya Jamii",
    role: "Government & Social Welfare Authority",
    logo: "/images/collab/maendeleo-ya-jamii.jpeg",
  },
  {
    name: "Google for Nonprofits",
    role: "Cloud & Digital Infrastructure",
    logo: "/images/collab/google-for-non-profit.jpg",
  },
  {
    name: "ElevenLabs",
    role: "AI & Voice Accessibility Tech",
    logo: "/images/collab/eleven-labs.webp",
  },
  {
    name: "Ability Network",
    role: "Mobility & Inclusion Alliance",
    logo: "/images/collab/ability-logo.png",
  },
  {
    name: "Circleg",
    role: "Prosthetics & Mobility Devices",
    logo: "/images/collab/circleg.jpeg",
  },
  {
    name: "Benevity",
    role: "Global Corporate Giving",
    logo: "/images/collab/benevity2.png",
  },
  {
    name: "Goodstack",
    role: "Philanthropic Rail & Verification",
    logo: "/images/collab/goodstack.png",
  },
  {
    name: "New Now",
    role: "Youth & Social Impact Accelerator",
    logo: "/images/collab/new-now.png",
  },
];

export const TRAINING_GALLERY = [
  {
    src: "/images/training/training_1.jpeg",
    title: "Practical Clinical Skills Lab",
    caption: "Hands-on diagnostic assessment techniques guided by senior clinical instructors.",
  },
  {
    src: "/images/training/training_2.jpeg",
    title: "Interactive Workshop Session",
    caption: "Collaborative problem-solving on complex neurological rehabilitation cases.",
  },
  {
    src: "/images/training/training_3.jpeg",
    title: "Summer School Cohort Demonstration",
    caption: "Live biomechanical mobilization demonstration during summer intensive school.",
  },
  {
    src: "/images/training/training_4.jpeg",
    title: "Patient Assessment Training",
    caption: "Students practicing joint range of motion and manual muscle testing protocols.",
  },
  {
    src: "/images/training/training_5.jpeg",
    title: "Small-Group Mentorship",
    caption: "Senior practitioners providing one-on-one technical feedback to student clinicians.",
  },
  {
    src: "/images/training/training_6.jpeg",
    title: "Annual Training Symposium",
    caption: "Gathering of physiotherapy professionals discussing modern Tanzanian healthcare priorities.",
  },
  {
    src: "/images/training/training_7.jpeg",
    title: "Cohort Graduation & Certification",
    caption: "Celebrating newly certified participants completing intensive competency modules.",
  },
];

export const IMPACT_STATS = [
  { value: "2025", label: "Year Founded", description: "Established as a dedicated NGO" },
  { value: "4", label: "Core Programs", description: "Comprehensive training & incubation pillars" },
  { value: "11+", label: "Strategic Partners", description: "Universities, hospitals & international bodies" },
  { value: "100%", label: "Impact Commitment", description: "Advancing community rehabilitation access" },
];

export interface StrategicInitiative {
  id: string;
  title: string;
  theme: string;
  tagline: string;
  location: string;
  partner?: string;
  distance?: string;
  participants?: string;
  summary: string;
  description: string;
  targets?: { label: string; count: string }[];
  pillars?: string[];
  galleryUrl?: string;
  badge?: string;
  image?: string;
}

export const STRATEGIC_INITIATIVES: StrategicInitiative[] = [
  {
    id: "move-for-disability",
    title: "Move for Disability",
    theme: "Inclusion by Design",
    tagline: "Annual Charity Walkathon & Health Expo",
    location: "Tanzania",
    distance: "5KM",
    participants: "Annual Event",
    summary:
      "An annual charity walkathon and health expo organized to bridge the country's mobility gap.",
    description:
      "Move for Disability is an annual charity walkathon and health expo organized by the Tanzania Physiotherapy Initiative to bridge the country’s mobility gap, mobilizing assistive devices and free physiotherapy consultations to champion disability inclusion.",
    targets: [
      { label: "Prosthetics", count: "50+" },
      { label: "Wheelchairs", count: "100+" },
      { label: "White Canes", count: "200+" },
      { label: "Pairs of Crutches", count: "300+" },
    ],
    galleryUrl:
      "https://ibrapixcel90.pixieset.com/movefordisabilityinclusionbydesign26/",
    badge: "Annual Flagship Event",
  },
  {
    id: "career-fair",
    title: "Tanzania Physiotherapy Career Fair",
    theme: "Step Into Your Future",
    tagline: "Connecting Students, Clinicians & Healthcare Employers",
    location: "Tanzania",
    summary:
      "An annual gathering connecting students, clinicians, universities, and healthcare employers to prepare the next generation of physiotherapists.",
    description:
      "The Tanzania Physiotherapy Career Fair connects students, clinicians, universities, and healthcare employers through mentorship, career guidance, and clinical innovation.",
    pillars: [
      "Career guidance and clinical pathways",
      "Specialist mentorship for young clinicians",
      "CV & interview readiness workshops",
      "Modern rehabilitation innovation showcases",
    ],
    badge: "Annual Event",
    image: "/images/initiatives/career-fair.jpg",
  },
  {
    id: "cycle-g-saifee",
    title: "Cycle G × Saifee Health Ride",
    theme: "Preventative Mobility & Active Living",
    tagline: "Community Cycling & Musculoskeletal Wellness Campaign",
    location: "Dar es Salaam, Tanzania",
    partner: "Cycle G & Saifee Hospital",
    summary:
      "An energetic community cycling initiative uniting physiotherapists, cyclists, and health advocates across Dar es Salaam.",
    description:
      "Organized in strategic partnership with Cycle G and Saifee Hospital, this community health ride promotes preventative musculoskeletal wellness, cardiovascular fitness, and active living. Physiotherapists conduct on-the-ground posture checks, bike ergonomics advice, and preventative movement education for participants of all ages.",
    pillars: [
      "Active preventative rehabilitation and cardiovascular mobility",
      "Community posture screenings and cycling ergonomics coaching",
      "Public education challenging sedentary lifestyle risks",
      "Cross-sector partnership linking hospitals and fitness communities",
    ],
    galleryUrl: "https://lobivisuals41.pixieset.com/cyclegxsaifee/",
    badge: "Community Health",
  },
  {
    id: "community-outreach",
    title: "Community Clinical Outreach",
    theme: "Closing the Mobility Gap",
    tagline: "Free Physical Therapy Consultations & Assistive Device Support",
    location: "Peri-urban & Rural Health Centers, Tanzania",
    summary:
      "Mobile rehabilitation camps delivering free physical therapy assessments and device fittings directly to underserved communities.",
    description:
      "Bringing qualified physical therapy care beyond central tertiary hospitals, our clinical outreach teams visit community centers and health posts across Tanzania. Volunteer clinicians provide free functional assessments, caregiver ergonomics workshops, and direct referral pathways for specialized orthopedic and neurological care.",
    pillars: [
      "Free pediatric and adult musculoskeletal assessments",
      "Family and caregiver transfer, posture, and home-care training",
      "Assistive device measurements, adjustments, and rehabilitation",
      "Direct clinical referral pathways to zonal referral hospitals",
    ],
    badge: "Direct Care",
  },
];

export interface WayToGetInvolved {
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  icon: "event" | "donate" | "volunteer" | "partner";
}

export const WAYS_TO_GET_INVOLVED: WayToGetInvolved[] = [
  {
    title: "Participate in Events",
    description:
      "Join the 5KM Move for Disability walkathon, attend the Zanzibar Career Fair, or ride in our preventative health cycling initiatives.",
    ctaText: "Join an event",
    ctaHref: "#move-for-disability",
    icon: "event",
  },
  {
    title: "Sponsor Assistive Devices",
    description:
      "Directly fund essential prosthetics, wheelchairs, white canes, and pairs of crutches for Tanzanians living with mobility challenges.",
    ctaText: "Make a donation pledge",
    ctaHref: "/donate",
    icon: "donate",
  },
  {
    title: "Volunteer Your Expertise",
    description:
      "Are you a physiotherapist, student, or community organizer? Lend your hands to our clinical consultations and workshop sessions.",
    ctaText: "Volunteer with us",
    ctaHref: "/contact?subject=Volunteer%20Application",
    icon: "volunteer",
  },
  {
    title: "Institutional Partnership",
    description:
      "Partner your university, hospital, NGO, or business with our strategic initiatives to amplify health impact nationwide.",
    ctaText: "Discuss partnership",
    ctaHref: "/partners",
    icon: "partner",
  },
];

export const initiativeGalleries = {
  move: "https://ibrapixcel90.pixieset.com/movefordisabilityinclusionbydesign26/",
  cycle: "https://lobivisuals41.pixieset.com/cyclegxsaifee/",
};

export interface InitiativePhotoItem {

  id: string;
  src: string;
  fallbackSrc: string;
  alt: string;
  title: string;
  category: "Move for Disability 2026" | "Cycle G × Saifee" | "Career Fair SUZA" | "Community Outreach";
  caption: string;
  pixiesetUrl?: string;
}

export const INITIATIVE_PHOTOS: InitiativePhotoItem[] = [
  {
    id: "move-1",
    src: "/images/initiatives/move-for-disability-walk.jpg",
    fallbackSrc: "/images/initiatives/move-for-disability-walk.jpg",
    alt: "Move for Disability participants and advocates walking for inclusion in Tanzania",
    title: "Inclusion by Design Walkathon",
    category: "Move for Disability 2026",
    caption: "Inclusive charity walkathon mobilizing thousands of advocates across Tanzania.",
    pixiesetUrl: "https://ibrapixcel90.pixieset.com/movefordisabilityinclusionbydesign26/",
  },
  {
    id: "move-2",
    src: "/images/initiatives/assistive-distribution.jpg",
    fallbackSrc: "/images/initiatives/assistive-distribution.jpg",
    alt: "Assistive devices and wheelchairs ready for community distribution",
    title: "Assistive Device Distribution",
    category: "Move for Disability 2026",
    caption: "Mobilizing wheelchairs, prosthetics, white canes, and crutches for persons with disabilities.",
    pixiesetUrl: "https://ibrapixcel90.pixieset.com/movefordisabilityinclusionbydesign26/",
  },
  {
    id: "move-3",
    src: "/images/initiatives/consultation.jpg",
    fallbackSrc: "/images/initiatives/consultation.jpg",
    alt: "Free physical therapy consultations with community members",
    title: "Free Physiotherapy Consultations",
    category: "Move for Disability 2026",
    caption: "Clinicians providing diagnostic movement assessments to reduce disability stigma.",
    pixiesetUrl: "https://ibrapixcel90.pixieset.com/movefordisabilityinclusionbydesign26/",
  },
  {
    id: "cycle-1",
    src: "/images/initiatives/cycle-g-saifee.jpg",
    fallbackSrc: "/images/initiatives/cycle-g-saifee.jpg",
    alt: "Cycle G × Saifee community health cycling and mobility initiative",
    title: "Cycle G × Saifee Health Ride",
    category: "Cycle G × Saifee",
    caption: "Promoting physical fitness, cardiovascular health, and preventative mobility care.",
    pixiesetUrl: "https://lobivisuals41.pixieset.com/cyclegxsaifee/",
  },
  {
    id: "career-1",
    src: "/images/initiatives/career-fair.jpg",
    fallbackSrc: "/images/initiatives/career-fair.jpg",
    alt: "Tanzania Physiotherapy Career Fair connecting students and employers",
    title: "Step Into Your Future Career Fair",
    category: "Career Fair SUZA",
    caption: "Connecting students and healthcare employers for mentorship and professional growth.",
  },
  {
    id: "community-1",
    src: "/images/initiatives/community-outreach.jpg",
    fallbackSrc: "/images/initiatives/community-outreach.jpg",
    alt: "Physiotherapy community outreach clinic caring for children with disabilities",
    title: "Advancing Regional Rehabilitation",
    category: "Community Outreach",
    caption: "Bridging the national mobility gap through hands-on pediatric and community rehabilitation.",
  },
];

export type ResourceCategory =
  | "All"
  | "Annual Reports"
  | "Strategic Plans"
  | "Clinical Guidelines"
  | "Policy Briefs"
  | "Toolkits & Manuals";

export interface ResourceDocument {
  id: string;
  title: string;
  subtitle: string;
  category: "Annual Reports" | "Strategic Plans" | "Clinical Guidelines" | "Policy Briefs" | "Toolkits & Manuals";
  date: string;
  year: string;
  fileSize: string;
  format: "PDF";
  downloadUrl: string;
  description: string;
  pages: number;
  author: string;
  featured?: boolean;
  tags?: string[];
}

export const PUBLICATIONS: ResourceDocument[] = [
  {
    id: "tpi-annual-report-2025",
    title: "TPI Annual Impact Report 2025",
    subtitle: "Strengthening Tanzania's Physical Rehabilitation Workforce",
    category: "Annual Reports",
    date: "November 2025",
    year: "2025",
    fileSize: "2.4 MB",
    format: "PDF",
    downloadUrl: "/documents/tpi-annual-impact-report-2025.pdf",
    description:
      "A comprehensive review of academic cohorts trained, community clinical outreaches completed, hospital partnerships formalized, and operational milestones achieved across Tanzania.",
    pages: 36,
    author: "Executive Secretariat & Governance Board",
    featured: true,
    tags: ["Annual Report", "Workforce", "Clinical Milestones"],
  },
  {
    id: "move-for-disability-2026-blueprint",
    title: "Move for Disability 2026: Inclusion by Design",
    subtitle: "Strategic Campaign Blueprint & Assistive Device Distribution Framework",
    category: "Strategic Plans",
    date: "January 2026",
    year: "2026",
    fileSize: "1.8 MB",
    format: "PDF",
    downloadUrl: "/documents/move-for-disability-2026-blueprint.pdf",
    description:
      "Strategic roadmap for the 5KM inclusive walkathon in Dar es Salaam, mobilizing 650+ assistive devices (wheelchairs, prosthetics, white canes, crutches) and providing free community health screenings.",
    pages: 24,
    author: "National Organizing Committee & APSTA Alliance",
    featured: true,
    tags: ["Walkathon", "Assistive Devices", "Advocacy"],
  },
  {
    id: "clinical-guidelines-musculoskeletal-2025",
    title: "Clinical Practice Guidelines: Musculoskeletal Rehabilitation",
    subtitle: "Evidence-Based Protocols for Primary & Secondary Health Facilities in Tanzania",
    category: "Clinical Guidelines",
    date: "September 2025",
    year: "2025",
    fileSize: "3.1 MB",
    format: "PDF",
    downloadUrl: "/documents/clinical-guidelines-musculoskeletal-2025.pdf",
    description:
      "Standardized rehabilitation protocols for low-back pain, spinal rehabilitation, and joint mobility adapted for Tanzanian referral hospitals and district healthcare centers.",
    pages: 48,
    author: "Clinical Education Advisory Board",
    featured: true,
    tags: ["Protocols", "Musculoskeletal", "Primary Care"],
  },
  {
    id: "tanzania-physiotherapy-workforce-policy-brief",
    title: "Policy Brief: Bridging Tanzania's Regional Mobility Gap",
    subtitle: "Strategic Recommendations on Physical Therapist Density and Health System Integration",
    category: "Policy Briefs",
    date: "October 2025",
    year: "2025",
    fileSize: "1.4 MB",
    format: "PDF",
    downloadUrl: "/documents/tanzania-physiotherapy-workforce-policy-brief.pdf",
    description:
      "An analytical policy dossier examining the distribution of certified physical therapists across mainland Tanzania and Zanzibar, calling for enhanced public sector deployment.",
    pages: 18,
    author: "TPI Health Policy Working Group",
    tags: ["Policy", "Workforce Density", "Health Systems"],
  },
  {
    id: "suza-career-fair-employability-toolkit",
    title: "Step Into Your Future: Graduate Employability Toolkit",
    subtitle: "Career Pathways, Hospital Mentorship, and Licensing Preparation for Physiotherapy Students",
    category: "Toolkits & Manuals",
    date: "August 2025",
    year: "2025",
    fileSize: "2.0 MB",
    format: "PDF",
    downloadUrl: "/documents/suza-career-fair-employability-toolkit.pdf",
    description:
      "Practical guidance for graduating physiotherapy students in Zanzibar and mainland Tanzania covering licensing examinations, clinical portfolio development, and interview readiness.",
    pages: 28,
    author: "APSTA-SUZA Chapter & TPI Academic Mentors",
    tags: ["Career Fair", "Mentorship", "SUZA"],
  },
  {
    id: "community-rehabilitation-outreach-sop",
    title: "Standard Operating Procedures: Community Outreach Camps",
    subtitle: "Field Protocols for Multidisciplinary Screening and Ergonomic Device Fitting",
    category: "Toolkits & Manuals",
    date: "July 2025",
    year: "2025",
    fileSize: "2.2 MB",
    format: "PDF",
    downloadUrl: "/documents/community-rehabilitation-outreach-sop.pdf",
    description:
      "Operational SOPs for organizing regional pop-up rehabilitation clinics, patient triage protocols, safety compliance, and follow-up referral pathways.",
    pages: 32,
    author: "Clinical Operations Directorate",
    tags: ["SOP", "Outreach", "Screening"],
  },
  {
    id: "assistive-device-fitting-manual",
    title: "Assistive Device Assessment & Fitting Manual",
    subtitle: "Clinical Protocols for Wheelchairs, Pediatric Walkers, White Canes, and Axillary Crutches",
    category: "Clinical Guidelines",
    date: "May 2025",
    year: "2025",
    fileSize: "2.9 MB",
    format: "PDF",
    downloadUrl: "/documents/assistive-device-fitting-manual.pdf",
    description:
      "Technical guidelines ensuring assistive devices are clinically measured, customized, and safely adapted to prevent secondary musculoskeletal deformities and pressure sores.",
    pages: 42,
    author: "Mobility Technology & Rehabilitation Panel",
    tags: ["Assistive Devices", "Wheelchairs", "Clinical Fitting"],
  },
  {
    id: "goniometer-range-of-motion-protocol",
    title: "Range-of-Motion Goniometric Measurement Standards",
    subtitle: "Clinical Assessment Norms for Upper and Lower Extremity Joint Angles",
    category: "Clinical Guidelines",
    date: "April 2025",
    year: "2025",
    fileSize: "1.6 MB",
    format: "PDF",
    downloadUrl: "/documents/goniometer-range-of-motion-protocol.pdf",
    description:
      "Pocket measurement reference protocol for practicing clinicians detailing anatomical landmark alignment, joint axis identification, and normative ranges of motion.",
    pages: 22,
    author: "Tanzania Physiotherapy Academy",
    tags: ["Measurement", "Range of Motion", "Protocol"],
  },
];



