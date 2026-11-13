import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://physioinitiativetz.org";
  const now = new Date();

  const coreRoutes = [
    { path: "", priority: 1.0, freq: "weekly" as const },
    { path: "/initiatives", priority: 0.9, freq: "weekly" as const },
    { path: "/approach", priority: 0.9, freq: "weekly" as const },
    { path: "/resources", priority: 0.9, freq: "weekly" as const },
    { path: "/about", priority: 0.8, freq: "monthly" as const },
    { path: "/partners", priority: 0.8, freq: "monthly" as const },
    { path: "/get-involved", priority: 0.8, freq: "monthly" as const },
    { path: "/donate", priority: 0.8, freq: "monthly" as const },
    { path: "/contact", priority: 0.7, freq: "monthly" as const },
  ];

  const initiativeRoutes = [
    "/initiatives/move-for-disability",
    "/initiatives/career-fair",
    "/initiatives/rr-e-clinic",
    "/initiatives/community-outreach",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const programRoutes = [
    "/approach/academy",
    "/approach/summer-school",
    "/approach/exchange",
    "/approach/incubation",
    "/approach/workforce",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [
    ...coreRoutes.map((r) => ({
      url: `${baseUrl}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...initiativeRoutes,
    ...programRoutes,
  ];
}
