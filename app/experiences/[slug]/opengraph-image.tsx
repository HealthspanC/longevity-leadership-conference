import { ImageResponse } from "next/og";
import { headers } from "next/headers";
import { getExperienceBySlug, EXPERIENCES } from "@/lib/constants";
import { renderOGCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

/**
 * Per-experience Open Graph image (`/experiences/<slug>/opengraph-image`).
 *
 * Next's file-based convention automatically wires this into the parent
 * route's `openGraph.images` metadata — no need to reference it from
 * `generateMetadata`. Scrapers requesting `/experiences/iv-lounge` see
 * the OG tag point here, fetch this route, and get back the rendered
 * 1200×630 PNG.
 *
 * Static generation (not edge runtime): we pair `generateStaticParams`
 * with Node.js runtime (the default) so every experience card is
 * rasterized to a static PNG at build time. Trade-offs:
 *   - Edge runtime is incompatible with `generateStaticParams` in Next 15.
 *   - For a fixed set (3 activations) static generation is strictly
 *     better: zero cold-start, served directly from the CDN.
 *
 * `next/og` composites JSX with Satori, which runs fine in the build-time
 * Node environment — the edge constraint is mainly about low-latency
 * dynamic generation, which we don't need.
 */

export const alt = "Longevity Leadership Conference experience card";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return EXPERIENCES.map((e) => ({ slug: e.id }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exp = getExperienceBySlug(slug);
  if (!exp) {
    // Fallback to a bare brand card for invalid slugs. Scrapers typically
    // never hit this path — the parent `page.tsx` `notFound()`s first — but
    // being defensive here avoids a runtime crash on edge.
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #2d1b4e 0%, #3c2066 55%, #4a2d6e 100%)",
          color: "#fff",
          fontSize: 48,
          fontFamily: "serif",
        }}
      >
        Longevity Leadership Conference
      </div>,
      size,
    );
  }

  // Resolve the hero image to an absolute URL. At request-time the edge
  // runtime fetches this URL to composite into the card — it must be
  // publicly reachable. Using the current request host means the card
  // works both on localhost (dev) and on the production domain without
  // a config switch.
  const hdrs = await headers();
  const host = hdrs.get("host") ?? "www.longevityleadershipconference.com";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const imageUrl = `${protocol}://${host}${exp.heroImage}`;

  return new ImageResponse(
    renderOGCard({
      imageUrl,
      title: exp.name,
      subtitle: `Presented by ${exp.sponsor} — ${exp.tagline}`,
      kicker: "On-Site Experience",
      // Experiences use `objectPosition` (not `imagePosition`) for per-entry
      // crop focus. Pass it through when present so the OG card matches the
      // focal-point tuning used on the site.
      imagePosition:
        "objectPosition" in exp && typeof exp.objectPosition === "string"
          ? exp.objectPosition
          : "center",
    }),
    size,
  );
}
