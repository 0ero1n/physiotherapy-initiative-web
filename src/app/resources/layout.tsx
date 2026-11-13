import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publications & Resources",
  description:
    "Evidence-based clinical guidelines, strategic campaign roadmaps, policy briefs, and field toolkits published by the Tanzania Physiotherapy Initiative.",
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
