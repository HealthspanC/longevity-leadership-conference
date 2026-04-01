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
  ],
  openGraph: {
    title: "3rd Annual Longevity Leadership Conference",
    description:
      "A Premium Executive Forum for the Longevity Industry. April 30, 2026 at the Verizon Innovation Lab, Playa Vista, CA.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "3rd Annual Longevity Leadership Conference",
    description:
      "A Premium Executive Forum for the Longevity Industry. April 30, 2026.",
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
