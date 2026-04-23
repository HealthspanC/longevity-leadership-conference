import type { MetadataRoute } from "next";
import { SPEAKERS, HOSTS, EXPERIENCES } from "@/lib/constants";

/**
 * Sitemap generator for the Longevity Leadership Conference site.
 *
 * Surfaces every crawlable URL to search engines. Priorities descend from
 * the home page (1.0) through the event-critical pages (/about, /tickets
 * at 0.9) to the social-share deep-link routes (0.5) — those routes exist
 * for OG previews rather than SEO, and their canonical URLs already point
 * back at the main pages, so they don't need aggressive ranking signals.
 *
 * Speaker / host / experience sub-routes are all listed. Even though each
 * one declares a canonical URL back to `/` or `/about`, listing them here
 * helps Google discover and crawl them in the first place — important
 * because their OG metadata is the whole point of these routes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://longevityleadershipconference.com";
  const now = new Date();

  // Top-level canonical pages.
  const core: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/tickets`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Hub pages for the three deep-link families. These are shareable in
  // their own right (a "see all the hosts" URL), so they warrant a middle
  // priority — above individual items, below the top-level pages.
  const hubs: MetadataRoute.Sitemap = [
    {
      url: `${base}/hosts`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/experiences`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Per-item deep-link routes. Declared with low priority (0.5) because
  // each one's canonical URL points back at a top-level page — they exist
  // primarily to serve per-item OG cards to social scrapers, not to rank
  // independently in search.
  const speakerRoutes: MetadataRoute.Sitemap = SPEAKERS.map((s) => ({
    url: `${base}/speakers/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const hostRoutes: MetadataRoute.Sitemap = HOSTS.map((h) => ({
    url: `${base}/hosts/${h.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const experienceRoutes: MetadataRoute.Sitemap = EXPERIENCES.map((e) => ({
    url: `${base}/experiences/${e.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...core,
    ...hubs,
    ...speakerRoutes,
    ...hostRoutes,
    ...experienceRoutes,
  ];
}
