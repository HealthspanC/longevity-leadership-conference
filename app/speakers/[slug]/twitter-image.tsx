/**
 * Twitter-card image for `/speakers/<slug>`.
 *
 * Re-exports the OG image so both `og:image` and `twitter:image` meta
 * tags point at the same branded per-speaker card. Keeping them in sync
 * matters because Twitter's `twitter:image` takes precedence over
 * `og:image` on X/Twitter — having only the OG file would leave tweets
 * showing no preview image at all.
 *
 * Separate file (rather than a single shared one) is required by Next's
 * file-based metadata convention — it looks for these exact filenames.
 */

export {
  alt,
  size,
  contentType,
  generateStaticParams,
  default,
} from "./opengraph-image";
