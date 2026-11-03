import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://physioinitiativetz.org"),
  title: "Tanzania Physiotherapy Initiative | Shaping the future workforce in physiotherapy",
  description: "Shaping the future workforce in physiotherapy within Tanzania through practical training, shared knowledge, and professional development.",
  authors: [{ name: "Tanzania Physiotherapy Initiative" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/images/Logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Tanzania Physiotherapy Initiative",
    description: "Shaping the future workforce in physiotherapy within Tanzania.",
    url: "https://physioinitiativetz.org",
    siteName: "Tanzania Physiotherapy Initiative",
    images: [{ url: "/images/training/training_5.jpeg", alt: "TPI professionals learning together at a workshop" }],
    locale: "en_TZ",
    type: "website",
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
