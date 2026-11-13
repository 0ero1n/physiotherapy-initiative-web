import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";

const montserrat = localFont({
  src: [
    {
      path: "../../public/fonts/Montserrat-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Montserrat-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Montserrat-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Montserrat-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#696112",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://physioinitiativetz.org"),
  title: {
    default: "Tanzania Physiotherapy Initiative | Shaping the Future Workforce",
    template: "%s | Tanzania Physiotherapy Initiative",
  },
  description:
    "A registered non-profit NGO dedicated to shaping the future physiotherapy workforce in Tanzania through clinical excellence, hands-on training, and rehabilitation advocacy.",
  keywords: [
    "physiotherapy Tanzania",
    "Tanzania Physiotherapy Initiative",
    "clinical training Dar es Salaam",
    "rehabilitation Tanzania",
    "assistive devices Tanzania",
    "Move for Disability 2026",
    "RR e Clinic",
  ],
  authors: [{ name: "Tanzania Physiotherapy Initiative", url: "https://physioinitiativetz.org" }],
  creator: "Tanzania Physiotherapy Initiative",
  publisher: "Tanzania Physiotherapy Initiative",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/images/tpi-emblem.png", sizes: "388x390", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Tanzania Physiotherapy Initiative",
    description: "Shaping the future workforce in physiotherapy within Tanzania.",
    url: "https://physioinitiativetz.org",
    siteName: "Tanzania Physiotherapy Initiative",
    images: [
      {
        url: "/images/training/training_5.jpeg",
        width: 1200,
        height: 630,
        alt: "TPI healthcare professionals in a clinical skills workshop",
      },
    ],
    locale: "en_TZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanzania Physiotherapy Initiative",
    description: "Shaping the future workforce in physiotherapy within Tanzania.",
    images: ["/images/training/training_5.jpeg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={montserrat.className} suppressHydrationWarning>
        <NavigationHeader />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
