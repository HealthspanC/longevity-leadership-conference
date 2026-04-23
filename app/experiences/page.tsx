import type { Metadata } from "next";
import { AboutPageBody } from "@/components/about-page-body";

/**
 * `/experiences` — shareable URL counterpart to `/about#iwa`.
 *
 * Renders the full About page body via `<AboutPageBody />` with
 * `initialScrollTo="experiences"` so a mount effect scrolls the page
 * directly to the Immersive Wellness Activations section. Gives visitors
 * the same in-context experience as `/about#iwa` — hero intro at the top
 * of the narrative + hosts + experiences + agenda CTA — rather than the
 * stripped-down single-section shell the lean layout used to render.
 *
 * OG: v1 uses the conference brand card (inherited via the explicit
 * `openGraph.images` below — Next doesn't reliably inherit sub-fields
 * from the root metadata once a child redefines `openGraph`). A dedicated
 * "3-activation grid" composite could be built later with a sibling
 * `opengraph-image.tsx` — not required for launch.
 */

export const metadata: Metadata = {
  title: "On-Site Experiences | Longevity Leadership Conference 2026",
  description:
    "Explore the three immersive wellness activations at the Longevity Leadership Conference 2026 — Peptide Shot Bar, IV Lounge, and PEMF Lounge. April 30, 2026 in Los Angeles.",
  alternates: {
    canonical: "/about#iwa",
  },
  openGraph: {
    title: "On-Site Experiences | Longevity Leadership Conference 2026",
    description:
      "Three immersive wellness activations — Peptide Shot Bar, IV Lounge, and PEMF Lounge — presented by ConciergeMD, Regen Therapy, and Pulse PEMF.",
    url: "https://www.longevityleadershipconference.com/experiences",
    type: "website",
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
    title: "On-Site Experiences | Longevity Leadership Conference 2026",
    description:
      "Three immersive wellness activations at the Longevity Leadership Conference — April 30, 2026.",
    images: ["https://www.longevityleadershipconference.com/og-image2.jpg"],
  },
};

export default function ExperiencesListPage() {
  return <AboutPageBody initialScrollTo="experiences" />;
}
