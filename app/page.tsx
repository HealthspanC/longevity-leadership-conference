import { HomePageBody } from "@/components/home-page-body";

/**
 * `/` — landing page.
 *
 * The actual page body (JSON-LD blocks + all sections + nav/footer/popup)
 * lives in `components/home-page-body.tsx` so it can also be rendered by
 * per-speaker deep-link routes (`/speakers/<slug>`). See that file's
 * JSDoc for the full rationale.
 */

export default function Home() {
  return <HomePageBody />;
}
