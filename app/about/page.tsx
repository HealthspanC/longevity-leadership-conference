import type { Metadata } from "next";
import { AboutPageBody } from "@/components/about-page-body";

export const metadata: Metadata = {
  title: "About | Longevity Leadership Conference 2026 | April 30, LA",
  description:
    "Meet the hosts, explore on-site wellness activations, and view the full-day agenda for the Longevity Leadership Conference 2026 — April 30, 2026 at the Verizon Innovation Lab, Playa Vista.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Longevity Leadership Conference 2026",
    description:
      "Hosts, on-site wellness experiences, and the full-day agenda for April 30, 2026 in Los Angeles.",
    url: "https://longevityleadershipconference.com/about",
    type: "website",
    // Explicit image — Next merges top-level metadata keys, but once a page
    // redefines `openGraph`, sub-fields from the parent layout don't reliably
    // carry through. Repeating the home page's OG asset here keeps social
    // shares of /about rendering the same conference branding card.
    images: [
      {
        url: "https://longevityleadershipconference.com/og-image2.jpg",
        width: 1000,
        height: 1000,
        alt: "3rd Annual Longevity Leadership Conference - April 30, 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Longevity Leadership Conference 2026",
    description:
      "Hosts, on-site wellness experiences, and the full-day agenda — April 30, 2026 in Los Angeles.",
    images: ["https://longevityleadershipconference.com/og-image2.jpg"],
  },
};

/**
 * `/about` — full about page.
 *
 * The body (hero + hosts + experiences + agenda CTA + nav/footer) lives in
 * `components/about-page-body.tsx` so it can also be rendered by the list
 * pages (`/hosts`, `/experiences`) and per-slug deep-link routes
 * (`/hosts/<slug>`, `/experiences/<slug>`). See that file's JSDoc for
 * the full rationale.
 */
export default function AboutPage() {
  return <AboutPageBody />;
}
