const fs = require("fs");
const path = require("path");

const documents = [
  {
    fileName: "tpi-annual-impact-report-2025.pdf",
    title: "TPI Annual Impact Report 2025",
    subtitle: "Strengthening Tanzania's Physical Rehabilitation Workforce",
    category: "Annual Reports",
    author: "Executive Secretariat & Governance Board",
    date: "November 2025",
    pages: 36,
    summary:
      "Comprehensive review of academic cohorts trained, community clinical outreaches completed, hospital partnerships formalized, and operational milestones achieved across Tanzania.",
  },
  {
    fileName: "move-for-disability-2026-blueprint.pdf",
    title: "Move for Disability 2026: Inclusion by Design",
    subtitle: "Strategic Campaign Blueprint & Assistive Device Distribution Framework",
    category: "Strategic Plans",
    author: "National Organizing Committee & APSTA Alliance",
    date: "January 2026",
    pages: 24,
    summary:
      "Roadmap for the 5KM inclusive walkathon in Dar es Salaam, mobilizing 650+ assistive devices (wheelchairs, prosthetics, white canes, crutches) and providing free community health screenings.",
  },
  {
    fileName: "clinical-guidelines-musculoskeletal-2025.pdf",
    title: "Clinical Practice Guidelines: Musculoskeletal Rehabilitation",
    subtitle: "Evidence-Based Protocols for Primary & Secondary Health Facilities in Tanzania",
    category: "Clinical Guidelines",
    author: "Clinical Education Advisory Board",
    date: "September 2025",
    pages: 48,
    summary:
      "Standardized rehabilitation protocols for low-back pain, spinal rehabilitation, and joint mobility adapted for Tanzanian referral and district healthcare settings.",
  },
  {
    fileName: "tanzania-physiotherapy-workforce-policy-brief.pdf",
    title: "Policy Brief: Bridging Tanzania's Regional Mobility Gap",
    subtitle: "Strategic Recommendations on Physical Therapist Density and Health System Integration",
    category: "Policy Briefs",
    author: "TPI Health Policy Working Group",
    date: "October 2025",
    pages: 18,
    summary:
      "An analytical policy dossier examining the distribution of certified physical therapists across mainland Tanzania and Zanzibar, calling for enhanced public sector deployment.",
  },
  {
    fileName: "suza-career-fair-employability-toolkit.pdf",
    title: "Step Into Your Future: Graduate Employability Toolkit",
    subtitle: "Career Pathways, Hospital Mentorship, and Licensing Preparation for Physiotherapy Students",
    category: "Toolkits & Manuals",
    author: "APSTA-SUZA Chapter & TPI Academic Mentors",
    date: "August 2025",
    pages: 28,
    summary:
      "Practical guidance for graduating physiotherapy students in Zanzibar and mainland Tanzania covering licensing examinations, clinical portfolio development, and interview readiness.",
  },
  {
    fileName: "community-rehabilitation-outreach-sop.pdf",
    title: "Standard Operating Procedures: Community Outreach Camps",
    subtitle: "Field Protocols for Multidisciplinary Screening and Ergonomic Device Fitting",
    category: "Toolkits & Manuals",
    author: "Clinical Operations Directorate",
    date: "July 2025",
    pages: 32,
    summary:
      "Operational SOPs for organizing regional pop-up rehabilitation clinics, patient triage protocols, safety compliance, and follow-up referral pathways.",
  },
  {
    fileName: "assistive-device-fitting-manual.pdf",
    title: "Assistive Device Assessment & Fitting Manual",
    subtitle: "Clinical Protocols for Wheelchairs, Pediatric Walkers, White Canes, and Axillary Crutches",
    category: "Clinical Guidelines",
    author: "Mobility Technology & Rehabilitation Panel",
    date: "May 2025",
    pages: 42,
    summary:
      "Technical guidelines ensuring assistive devices are clinically measured, customized, and safely adapted to prevent secondary musculoskeletal deformities and pressure sores.",
  },
  {
    fileName: "goniometer-range-of-motion-protocol.pdf",
    title: "Range-of-Motion Goniometric Measurement Standards",
    subtitle: "Clinical Assessment Norms for Upper and Lower Extremity Joint Angles",
    category: "Clinical Guidelines",
    author: "Tanzania Physiotherapy Academy",
    date: "April 2025",
    pages: 22,
    summary:
      "Pocket measurement reference protocol for practicing clinicians detailing anatomical landmark alignment, joint axis identification, and normative ranges of motion.",
  },
];

function buildPdf(doc) {
  const streamBody = [
    "BT",
    "/F1 18 Tf",
    "50 720 Td",
    `(${escapePdf(doc.title)}) Tj`,
    "/F1 11 Tf",
    "0 -24 Td",
    `(${escapePdf(doc.subtitle)}) Tj`,
    "/F2 9 Tf",
    "0 -28 Td",
    `(Tanzania Physiotherapy Initiative | Official Publication Series) Tj`,
    "0 -16 Td",
    `(Category: ${escapePdf(doc.category)} | Published: ${escapePdf(doc.date)} | Pages: ${doc.pages}) Tj`,
    "0 -16 Td",
    `(Author: ${escapePdf(doc.author)}) Tj`,
    "/F1 11 Tf",
    "0 -32 Td",
    `(EXECUTIVE SUMMARY & ABSTRACT:) Tj`,
    "/F2 10 Tf",
    "0 -18 Td",
    `(${escapePdf(doc.summary.slice(0, 80))}) Tj`,
    "0 -14 Td",
    `(${escapePdf(doc.summary.slice(80, 160))}) Tj`,
    "0 -14 Td",
    `(${escapePdf(doc.summary.slice(160, 240))}) Tj`,
    "0 -36 Td",
    `(Official Repository: P.O. BOX 80651, Kinondoni, Dar es Salaam, Tanzania) Tj`,
    "0 -14 Td",
    `(Inquiries: info@physioinitiativetz.org | Web: https://physioinitiativetz.org/resources) Tj`,
    "ET",
  ].join("\n");

  const streamLength = Buffer.byteLength(streamBody, "utf8");

  const parts = [];
  parts.push("%PDF-1.4\n");

  // Obj 1: Catalog
  const o1 = "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";
  // Obj 2: Pages
  const o2 = "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n";
  // Obj 3: Page
  const o3 = `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj\n`;
  // Obj 4: Stream
  const o4 = `4 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamBody}\nendstream\nendobj\n`;
  // Obj 5: Font 1
  const o5 = "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n";
  // Obj 6: Font 2
  const o6 = "6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n";

  const offsets = [0];
  let currentOffset = Buffer.byteLength(parts[0], "utf8");

  const objs = [o1, o2, o3, o4, o5, o6];
  for (let i = 0; i < objs.length; i++) {
    offsets.push(currentOffset);
    currentOffset += Buffer.byteLength(objs[i], "utf8");
    parts.push(objs[i]);
  }

  const xrefOffset = currentOffset;
  let xref = `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objs.length; i++) {
    xref += String(offsets[i]).padStart(10, "0") + " 00000 n \n";
  }
  parts.push(xref);

  const trailer = `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  parts.push(trailer);

  return parts.join("");
}

function escapePdf(str) {
  return (str || "").replace(/[()\\]/g, "\\$&");
}

const outDir = path.join(__dirname, "../public/documents");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

documents.forEach((doc) => {
  const filePath = path.join(outDir, doc.fileName);
  const pdfContent = buildPdf(doc);
  fs.writeFileSync(filePath, pdfContent, "utf8");
  console.log(`Generated: ${doc.fileName} (${fs.statSync(filePath).size} bytes)`);
});

