import type { Metadata } from "next";
import { AboutPageBody } from "@/components/about-page-body";

/**
 * `/hosts` — shareable URL counterpart to `/about#hosts`.
 *
 * Renders the full About page body via `<AboutPageBody />` with
 * `initialScrollTo="hosts"` so a mount effect scrolls the page directly
 * to the Hosts section. Gives visitors the same in-context experience as
 * `/about#hosts` — hero intro at the top of the narrative + hosts +
 * experiences + agenda CTA — rather than the stripped-down single-section
 * shell the lean layout used to render.
 *
 * OG: for v1 this page uses the conference brand card (inherited via
 * the explicit `openGraph.images` below — Next doesn't reliably inherit
 * sub-fields from the root metadata once a child redefines `openGraph`).
 * A dedicated "3-host grid" composite could be built later with a
 * sibling `opengraph-image.tsx` — not required for launch.
 */

export const metadata: Metadata = {
  title: "Your Hosts | Longevity Leadership Conference 2026",
  description:
    "Meet the hosts of the Longevity Leadership Conference 2026 — presented by Healthspan Collective in partnership with Mission Matters. April 30, 2026 in Los Angeles.",
  alternates: {
    canonical: "/about#hosts",
  },
  openGraph: {
    title: "Your Hosts | Longevity Leadership Conference 2026",
    description:
      "Meet the hosts of the Longevity Leadership Conference 2026 — presented by Healthspan Collective in partnership with Mission Matters Media.",
    url: "https://www.longevityleadershipconference.com/hosts",
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
    title: "Your Hosts | Longevity Leadership Conference 2026",
    description:
      "Meet the hosts of the Longevity Leadership Conference — April 30, 2026 in Los Angeles.",
    images: ["https://www.longevityleadershipconference.com/og-image2.jpg"],
  },
};

export default function HostsListPage() {
  return <AboutPageBody initialScrollTo="hosts" />;
}
