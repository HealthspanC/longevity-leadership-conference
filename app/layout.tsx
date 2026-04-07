import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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
  metadataBase: new URL("https://longevityleadershipconference.com"),
  title: "3rd Annual Longevity Leadership Conference | April 30, 2026",
  description:
    "A Premium Executive Forum for the Longevity Industry. Join investors, medical professionals, and trailblazers at the Verizon Innovation Lab, Playa Vista, CA.",
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
  openGraph: {
    title: "3rd Annual Longevity Leadership Conference",
    description:
      "A Premium Executive Forum for the Longevity Industry. April 30, 2026 at the Verizon Innovation Lab, Playa Vista, CA.",
    type: "website",
    locale: "en_US",
    url: "https://longevityleadershipconference.com",
    siteName: "Longevity Leadership Conference",
    images: [
      {
        url: "https://longevityleadershipconference.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "3rd Annual Longevity Leadership Conference - April 30, 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "3rd Annual Longevity Leadership Conference",
    description:
      "A Premium Executive Forum for the Longevity Industry. April 30, 2026.",
    images: ["https://longevityleadershipconference.com/og-image.png"],
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
      </body>
    </html>
  );
}
