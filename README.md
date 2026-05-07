# Longevity Leadership Conference

A Premium Executive Forum for the Longevity Industry.

## Tech Stack

- **Framework:** Next.js 15 (App Router, React 19, Server Components)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Email capture:** Moosend
- **Deployment:** Vercel

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

---

## Branch model (important)

This site has **two long-running branches** representing the two structural states of an annual conference:

| Branch        | Mode                         | What it shows                                                                |
| ------------- | ---------------------------- | ---------------------------------------------------------------------------- |
| `main`        | **Event upcoming / live**    | Countdown, Reserve Your Seat, ticket purchase flow, future-tense copy        |
| `post-event`  | **Between events**           | Thank-you hero, recap copy, signup form for next year's updates              |

Vercel's **Production Branch** setting determines which mode the live domain serves. To toggle:

1. Vercel dashboard → project → **Settings** → **Git** → **Production Branch** → change → **Save**
2. **Deployments** tab → find the latest deployment for the now-production branch → **"Promote to Production"** (otherwise the switch is dormant until the next push)

The branches diverge in page-level structure (Hero, `/tickets`). Shared infrastructure — components, API routes, design tokens, navbar, footer — should live in both via cherry-picks or periodic rebase (see "Keeping branches in sync" below).

---

## Annual cycle workflow

Roughly:

```
   Event ends
       │
       ▼
┌─────────────────────────────┐
│ Switch production →          │  Vercel Settings → Git → post-event
│ post-event                   │
└─────────────────────────────┘
       │
       │  ── months between events ──
       │  Live site shows thank-you + signup. Captures leads via Moosend.
       │
       ▼
┌─────────────────────────────┐
│ Update `main` for next event │  Edit while live site stays on `post-event`
└─────────────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│ Switch production → main     │  Vercel Settings → Git → main
│ (a few weeks before event)   │
└─────────────────────────────┘
       │
       │  ── event happens ──
       │
       ▼
┌─────────────────────────────┐
│ Refresh `post-event`         │  New keynote photo, year text, etc.
│ with this year's recap       │
└─────────────────────────────┘
       │
       ▼  (loop back to top)
```

### Updating `main` for the next event

Most of the work is data, not code. Files to refresh:

- `lib/constants.ts` — `SITE.date`, `SITE.time`, `SITE.venue`, etc.
- Speaker data and headshots — `lib/` or wherever the speaker list lives + `public/speakers/`
- `app/about/`, `app/agenda/`, `app/sponsors/`, `app/hosts/` — content as needed
- `public/` — refresh OG images, hero video, brand assets if changing
- Page metadata in `app/*/page.tsx` — titles, descriptions, structured data dates

Test by pushing the branch and reviewing the Vercel preview before promoting.

### Updating `post-event` for the next year

After each event ends, freshen `post-event` so it reflects the most-recent event:

- Replace `public/recap/2026-keynote.png` with a new photo (or rename the file and update the reference in `app/tickets/page.tsx`)
- Update year-specific text in `components/thank-you-cta.tsx` (the body paragraph references the year)
- Update past-tense recap stats in `app/tickets/page.tsx` if attendance numbers changed

The success message ("We hope to see you at our next event!") is intentionally year-agnostic — no edit needed.

### Keeping branches in sync

When you fix a bug or add a shared improvement on one branch, propagate to the other.

**Cherry-pick (small fixes):**

```bash
git checkout post-event
git cherry-pick <commit-sha-from-main>
git push
```

**Rebase (annual catch-up, before the post-event refresh):**

```bash
git checkout post-event
git fetch origin
git rebase origin/main
# resolve conflicts in Hero / tickets page (these intentionally diverge)
git push --force-with-lease
```

For a low-traffic conference site, cherry-picking on demand is usually enough. Avoid `git push --force` without `--force-with-lease`.

---

## Tags

| Tag                       | What it represents                                                          |
| ------------------------- | --------------------------------------------------------------------------- |
| `conference-2026-final`   | Live site at the close of the 3rd Annual Conference (April 30, 2026, commit `77ffffc`). |

### Rollback to a tagged state

If something on the live site breaks and you need to revert to a known-good past version:

1. Vercel dashboard → **Deployments** → find the deployment for the desired tag
2. Click the `⋯` menu → **"Promote to Production"**

This is a code-only rollback. Environment variables and external state (Moosend list contents, etc.) are not touched.

---

## Deployment

Pushes to either branch trigger a Vercel build automatically:

- Push to the **production branch** (whichever is currently set in Vercel) → live domain updates
- Push to any other branch → preview deployment at a `*.vercel.app` URL

### Required environment variables

Set in **both** Production and Preview scopes in Vercel → Settings → Environment Variables:

| Variable           | Purpose                                          |
| ------------------ | ------------------------------------------------ |
| `MOOSEND_API_KEY`  | API key for the subscribe form                   |
| `MOOSEND_LIST_ID`  | Moosend list to add subscribers to               |

If either is set to Production-only, preview-deployment form submissions will fail.

### Heads-up: hardcoded production domain

Several files reference `https://www.longevityleadershipconference.com` directly (canonical URLs, OG/Twitter image paths, sitemap, JSON-LD). On preview deployments this means social-card meta and structured data will point to production rather than the preview URL — visual content still renders correctly. Search them via:

```bash
grep -r "longevityleadershipconference.com" app/ components/
```

If you ever migrate domains, update those references.

---

## Project structure

```
app/           → Next.js App Router pages, layouts, API routes
components/    → React components (sections, UI primitives)
lib/           → Utilities, constants, types, speaker/agenda data
public/        → Static assets
  brand/       → Logos, brand marks
  recap/       → Post-event photos (used on /tickets when in post-event mode)
  venue/       → Venue photos
```
