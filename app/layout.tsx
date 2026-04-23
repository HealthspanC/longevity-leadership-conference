import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://www.longevityleadershipconference.com"),
  title:
    "Longevity Leadership Conference 2026 | Healthspan Collective & Mission Matters Media | April 30, LA",
  description:
    "The Longevity Leadership Conference 2026 — a premium executive forum for the longevity industry, hosted by Healthspan Collective and Mission Matters Media. April 30, 2026 at the Verizon Innovation Lab, Playa Vista, Los Angeles.",
  keywords: [
    "longevity",
    "healthspan",
    "conference",
    "medical",
    "biotech",
    "wellness",
    "investors",
    "leadership",
    "longevity conference",
    "healthspan summit",
    "biotech conference 2026",
    "longevity industry",
    "regenerative medicine",
    "anti-aging",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/brand/favicon.png",
    apple: "/brand/favicon.png",
  },
  openGraph: {
    title:
      "Longevity Leadership Conference 2026 | Healthspan Collective & Mission Matters Media",
    description:
      "The Longevity Leadership Conference 2026 — hosted by Healthspan Collective and Mission Matters Media. April 30, 2026 at the Verizon Innovation Lab, Playa Vista, Los Angeles.",
    type: "website",
    locale: "en_US",
    url: "https://www.longevityleadershipconference.com",
    siteName: "Longevity Leadership Conference",
    images: [
      {
        url: "https://www.longevityleadershipconference.com/og-image2.jpg",
        width: 1000,
        height: 1000,
        alt: "3rd Annual Longevity Leadership Conference - April 30, 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Longevity Leadership Conference 2026 | Healthspan Collective & Mission Matters Media",
    description:
      "Hosted by Healthspan Collective and Mission Matters Media. April 30, 2026 in Los Angeles.",
    images: ["https://www.longevityleadershipconference.com/og-image2.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-bg text-text antialiased overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
