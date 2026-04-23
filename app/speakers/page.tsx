import { redirect } from "next/navigation";

/**
 * Bare `/speakers` route.
 *
 * The site doesn't have a dedicated speakers landing page — the speakers
 * carousel lives in a section on the home page (`#speakers`). This route
 * exists only as a catch-all so bookmarks / stray links to `/speakers`
 * (without a slug) don't 404. Redirects to the home page's speakers
 * section, preserving the in-page UX users already know.
 *
 * Individual per-speaker URLs (`/speakers/<slug>`) are handled by the
 * sibling `[slug]/page.tsx` dynamic route.
 */
export default function SpeakersIndex() {
  redirect("/#speakers");
}
