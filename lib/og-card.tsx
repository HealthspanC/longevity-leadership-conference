/**
 * Shared Open Graph social-card template.
 *
 * Used by every `opengraph-image.tsx` (and sibling `twitter-image.tsx`) route
 * under `app/speakers/[slug]/`, `app/hosts/[slug]/`, and
 * `app/experiences/[slug]/`. Keeps one source of truth for the 1200×630
 * composite so all three route families render a consistent, brand-aligned
 * social preview.
 *
 * Why a plain helper instead of a React component:
 * - `next/og`'s `ImageResponse` takes a `ReactElement` directly and rasterises
 *   it via Satori at the edge. Returning JSX from a helper keeps each route
 *   file tiny and focused on data fetching + params validation.
 * - No props drilling through provider trees — each route passes its own
 *   fully-resolved data.
 *
 * Satori rendering constraints worth remembering while editing:
 * - Only flexbox layouts (no CSS grid).
 * - No pseudo-elements (::before / ::after).
 * - `<img>` needs absolute URLs; relative paths fail silently.
 * - Inline styles only (no className / Tailwind).
 * - Supports linear gradients, solid colors, and common text properties.
 *
 * Upgrade path:
 * - To use Playfair Display for the title, fetch the TTF at build time and
 *   pass it to `ImageResponse`'s `fonts` option in the calling route. Kept
 *   system-serif here for v1 to minimise the surface area and cold-start cost.
 */

import type { ReactElement } from "react";

export interface OGCardProps {
  /** Absolute URL to the person/activation image. Must include protocol+host. */
  imageUrl: string;
  /** Main headline — speaker name, host name, or activation name. */
  title: string;
  /** Secondary line — role, title, or tagline. */
  subtitle?: string;
  /** Small top-left label above the title. Defaults to the conference name. */
  kicker?: string;
  /** Bottom strip copy. Defaults to the event date/location. */
  footer?: string;
  /**
   * CSS `object-position` to apply to the left-side image. Lets callers pass
   * through the same focal-point tuning used on the site (e.g. "center 10%"
   * for a speaker whose face sits higher in the frame).
   */
  imagePosition?: string;
}

export function renderOGCard({
  imageUrl,
  title,
  subtitle,
  kicker = "Longevity Leadership Conference",
  footer = "April 30, 2026 · Los Angeles",
  imagePosition = "center 20%",
}: OGCardProps): ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        // Brand deep-purple gradient — matches the dark-panel tone used on
        // /about's Hosts + Experiences sections and the home page hero.
        background:
          "linear-gradient(135deg, #2d1b4e 0%, #3c2066 55%, #4a2d6e 100%)",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Left column: photo. Portrait-sized so faces frame well even after
          scrapers' aspect-ratio cropping on Facebook/LinkedIn. */}
      <div
        style={{
          width: "45%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt=""
          width={540}
          height={630}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: imagePosition,
          }}
        />
        {/* Gentle purple tint so the portrait reads as part of the card, not
            a jarring photographic insert. Mirrors the `mix-blend-multiply`
            tint used on the site's speaker/host cards. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(45,27,78,0.10) 0%, rgba(45,27,78,0.0) 30%, rgba(45,27,78,0.0) 70%, rgba(74,45,110,0.35) 100%)",
            display: "flex",
          }}
        />
      </div>

      {/* Right column: content. 55% of the 1200px canvas = 660px — enough
          room for a serif headline at ~64px plus a subtitle and footer
          without crowding. */}
      <div
        style={{
          width: "55%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 60px",
          color: "#ffffff",
        }}
      >
        {/* Kicker — tiny caps label above the title, matches the site's
            section-header pattern. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            color: "#c6b2eb", // purple-light
            fontSize: "18px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "2px",
              background: "#c6b2eb",
              display: "flex",
            }}
          />
          {kicker}
        </div>

        {/* Title + subtitle — weighted toward the vertical center so the
            composition reads as editorial rather than list-item. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div
            style={{
              fontFamily: "'Playfair Display', 'Georgia', serif",
              fontSize: title.length > 28 ? "56px" : "72px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: "26px",
                fontWeight: 500,
                lineHeight: 1.35,
                color: "rgba(255,255,255,0.78)",
                letterSpacing: "-0.005em",
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {/* Footer strip — keeps the event date/location surfaced so the
            card is self-describing even if cropped. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.92)",
              letterSpacing: "0.02em",
            }}
          >
            {footer}
          </div>
          <div
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.04em",
            }}
          >
            Verizon Innovation Lab · Playa Vista
          </div>
        </div>
      </div>
    </div>
  );
}

/** Shared sizing constants so every route exports the same dimensions. */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png" as const;
