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
    logo: "/images/collab/11-labs.jpeg",
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
    logo: "/images/collab/google-non-profit.jpeg",
  },
  {
    name: "ElevenLabs",
    role: "AI & Voice Accessibility Tech",
    logo: "/images/collab/11-labs.jpeg",
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
    logo: "/images/collab/benevity.jpeg",
  },
  {
    name: "Goodstack",
    role: "Philanthropic Rail & Verification",
    logo: "/images/collab/good-stack.jpeg",
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
    id: "rr-e-clinic",
    title: "RR e Clinic",
    theme: "Digital Rehabilitation & Chronic Pain Education",
    tagline: "Empowering Chronic Musculoskeletal Pain Self-Management in Tanzania",
    location: "National & Regional Digital Reach, Tanzania",
    partner: "Doctor Rafiki Afrika & Innovation Peer",
    summary:
      "A pioneering digital health platform in Tanzania dedicated to educating and guiding people living with chronic musculoskeletal pain conditions.",
    description:
      "RR e Clinic is a dedicated digital health platform in Tanzania that empowers individuals living with chronic musculoskeletal pain conditions. Operating primarily through social media and digital channels, it delivers practical, evidence-based self-management advice, guided workbooks, audio learning resources, and therapeutic exercises in Swahili to alleviate symptoms and enhance quality of life, especially in underserved and rural communities.",
    pillars: [
      "Evidence-based education and practical self-management advice",
      "Swahili digital audio guides and therapeutic exercise workbooks",
      "Direct patient empowerment via accessible social media channels",
      "Tele-rehabilitation reach bridging rural healthcare barriers",
    ],
    galleryUrl: "https://www.instagram.com/rreclinic",
    badge: "Digital Health",
    image: "/images/initiatives/rr-e-clinic.jpg",
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
    title: "Participate in Initiatives",
    description:
      "Join the 5KM Move for Disability walkathon, attend the Zanzibar Career Fair, or engage with RR e Clinic digital health programs.",
    ctaText: "Explore initiatives",
    ctaHref: "#strategic-initiatives",
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
  rrClinic: "https://www.instagram.com/rreclinic",
};

export interface InitiativePhotoItem {

  id: string;
  src: string;
  fallbackSrc: string;
  alt: string;
  title: string;
  category: "Move for Disability 2026" | "RR e Clinic" | "Career Fair SUZA" | "Community Outreach";
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
    id: "rr-clinic-1",
    src: "/images/initiatives/rr-e-clinic.jpg",
    fallbackSrc: "/images/initiatives/rr-e-clinic.jpg",
    alt: "RR e Clinic digital health and chronic musculoskeletal pain self-management platform",
    title: "RR e Clinic Digital Health Platform",
    category: "RR e Clinic",
    caption: "Educating and guiding Tanzanians living with chronic musculoskeletal pain through digital exercises and self-management advice.",
    pixiesetUrl: "https://www.instagram.com/rreclinic",
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
  previewUrl?: string;
  driveUrl?: string;
  isDriveSource?: boolean;
  description: string;
  pages: number;
  author: string;
  featured?: boolean;
  tags?: string[];
}

export const GOOGLE_DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1P8-0bhOQfAD8dXqDsyqAVrzVD7A1CE9f?usp=drive_link";

export const PUBLICATIONS: ResourceDocument[] = [
  {
    id: "physical-therapy-equipment-checklist",
    title: "Physical Therapy Equipment Checklist",
    subtitle: "Essential Clinical Modalities, Rehabilitation Devices & Clinic Setup Standards",
    category: "Toolkits & Manuals",
    date: "November 2026",
    year: "2026",
    fileSize: "74 KB",
    format: "PDF",
    downloadUrl: "/documents/physical-therapy-equipment-checklist.pdf",
    previewUrl: "https://drive.google.com/file/d/179Ev8PHql15DKZzmkTIV3C4Sgv-4EN5p/view?usp=sharing",
    driveUrl: "https://drive.google.com/file/d/179Ev8PHql15DKZzmkTIV3C4Sgv-4EN5p/view?usp=sharing",
    isDriveSource: true,
    description:
      "Standard operational inventory checklist for physical therapy units and clinics, detailing core modalities (hydrocollators, cryotherapy, electrotherapy, traction units), fitness apparatus, parallel bars, balance boards, and diagnostic accessories.",
    pages: 2,
    author: "Clinical Facilities & Operations Directorate",
    featured: true,
    tags: ["Equipment", "Clinic Setup", "Inventory Checklist", "Modalities"],
  },
  {
    id: "move-for-disability-report-2026",
    title: "Move for Disability Report 2026",
    subtitle: "Strategic Campaign Blueprint, Walkathon Impact & Assistive Distribution Report",
    category: "Strategic Plans",
    date: "March 2026",
    year: "2026",
    fileSize: "28 MB",
    format: "PDF",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1Gnhb_0FNuwjbKF-NJVdamoWdSzQ9NBmF",
    previewUrl: "https://drive.google.com/file/d/1Gnhb_0FNuwjbKF-NJVdamoWdSzQ9NBmF/view?usp=sharing",
    driveUrl: "https://drive.google.com/file/d/1Gnhb_0FNuwjbKF-NJVdamoWdSzQ9NBmF/view?usp=sharing",
    isDriveSource: true,
    description:
      "Official comprehensive documentation and outcome dossier for the national Move for Disability campaign, detailing inclusive walkathons, public disability sensitization, multi-disciplinary screenings, and assistive device mobilization across Tanzania.",
    pages: 9,
    author: "National Organizing Committee & APSTA Alliance",
    featured: true,
    tags: ["Walkathon", "Assistive Devices", "Advocacy", "Impact Report"],
  },
  {
    id: "neurology-in-africa",
    title: "Neurology in Africa: Clinical Practice Textbook",
    subtitle: "Practical Diagnostic Protocols and Neurorehabilitation in Resource-Limited Settings",
    category: "Clinical Guidelines",
    date: "2025",
    year: "2025",
    fileSize: "50.3 MB",
    format: "PDF",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1YahKutXZwJw_IUgI9HR69rkfK8P6s6KX",
    previewUrl: "https://drive.google.com/file/d/1YahKutXZwJw_IUgI9HR69rkfK8P6s6KX/view?usp=sharing",
    driveUrl: "https://drive.google.com/file/d/1YahKutXZwJw_IUgI9HR69rkfK8P6s6KX/view?usp=sharing",
    isDriveSource: true,
    description:
      "Extensive clinical textbook and reference work specifically tailored to neurological disease diagnosis, neurorehabilitation, stroke management, neuropathies, and infection-related neurological care adapted for African medical facilities.",
    pages: 480,
    author: "Clinical Neurology Working Group",
    featured: true,
    tags: ["Neurology", "Clinical Guidelines", "Stroke Rehabilitation", "Neuroscience"],
  },
  {
    id: "the-physiotherapists-pocketbook",
    title: "The Physiotherapist’s Pocketbook (3rd Edition)",
    subtitle: "Essential Quick-Reference Guide for Respiratory, Neurological & Musculoskeletal Assessment",
    category: "Toolkits & Manuals",
    date: "2025",
    year: "2025",
    fileSize: "37.1 MB",
    format: "PDF",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1y692AcGVYtxxjB8fHttDWAbcSBqm2hMH",
    previewUrl: "https://drive.google.com/file/d/1y692AcGVYtxxjB8fHttDWAbcSBqm2hMH/view?usp=sharing",
    driveUrl: "https://drive.google.com/file/d/1y692AcGVYtxxjB8fHttDWAbcSBqm2hMH/view?usp=sharing",
    isDriveSource: true,
    description:
      "The premier on-ward reference handbook for physiotherapists and students. Features instant clinical measurement norms, neurological examination charts, cardiopulmonary values, joint mobilization protocols, and drug reference lists.",
    pages: 412,
    author: "Clinical Education Advisory Board",
    featured: true,
    tags: ["Pocketbook", "Assessment", "Musculoskeletal", "Quick Reference"],
  },
  {
    id: "pain-textbook",
    title: "Comprehensive Pain Textbook & Clinical Science",
    subtitle: "Mechanisms, Evidence-Based Assessment, and Multidisciplinary Pain Rehabilitation",
    category: "Clinical Guidelines",
    date: "2025",
    year: "2025",
    fileSize: "121 MB",
    format: "PDF",
    downloadUrl: "https://drive.google.com/file/d/1Wy3fo00-0oSXNMjDAiW1a0VPAQwIOgrC/view?usp=sharing",
    previewUrl: "https://drive.google.com/file/d/1Wy3fo00-0oSXNMjDAiW1a0VPAQwIOgrC/view?usp=sharing",
    driveUrl: "https://drive.google.com/file/d/1Wy3fo00-0oSXNMjDAiW1a0VPAQwIOgrC/view?usp=sharing",
    isDriveSource: true,
    description:
      "Authoritative clinical textbook examining neurobiology, pain taxonomy, chronic pain syndromic management, physical modality interventions, and exercise rehabilitation for acute and chronic musculoskeletal pain.",
    pages: 620,
    author: "International & Regional Pain Rehabilitation Consortium",
    featured: true,
    tags: ["Pain Management", "Clinical Science", "Neurophysiology", "Musculoskeletal"],
  },
];



