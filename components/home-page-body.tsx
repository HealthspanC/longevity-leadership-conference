import { ScrollProgress } from "@/components/scroll-progress";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { Vision } from "@/components/vision";
import { Sponsors } from "@/components/sponsors";
import { Speakers } from "@/components/speakers";
import { SpeakBanner } from "@/components/speak-banner";
import { Gallery } from "@/components/gallery";
import { TopicsCloud } from "@/components/topics-cloud";
import { EventDeck } from "@/components/event-deck";
import { Subscribe } from "@/components/subscribe";
import { Footer } from "@/components/footer";
import { SITE, LINKS, SPEAKERS, HOSTS } from "@/lib/constants";

/**
 * Shared home-page body.
 *
 * Rendered by both `app/page.tsx` (landing `/`) and the per-speaker
 * deep-link route `app/speakers/[slug]/page.tsx` (`/speakers/<slug>`).
 *
 * Why share a body instead of keeping the slug route as a lean shell:
 * human visitors arriving from a tweet/DM expect to land on the real
 * site with that speaker's modal opened on top — not on what looks like
 * a standalone page of just the speakers carousel. Rendering the full
 * home body everywhere keeps the experience coherent. Scrapers never
 * execute mount logic (they only read OG meta), so the layout has zero
 * impact on social previews.
 *
 * `initialSpeakerSlug` is forwarded to `<Speakers />`. The Speakers
 * component's own `initialSlug` mount effect handles:
 *   - scrolling `#speakers` into view (so when the user closes the
 *     modal, they land at the section rather than y=0);
 *   - rotating the carousel to the matching card;
 *   - opening the speaker's modal.
 *
 * Server component by design — no client-only logic lives here, just
 * composition. The JSON-LD blocks stay server-rendered, which is ideal
 * for crawlers that don't execute JS.
 */

function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Healthspan Collective",
    url: "https://healthspan.community",
    logo: "https://www.longevityleadershipconference.com/brand/logo.png",
    sameAs: [
      "https://www.instagram.com/healthspan_collective/",
      "https://www.linkedin.com/company/healthspanpro/",
      "https://www.youtube.com/@healthspan_collective",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Longevity Leadership Conference",
    url: "https://www.longevityleadershipconference.com",
    publisher: {
      "@type": "Organization",
      name: "Healthspan Collective",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function EventJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Conference",
    name: `${SITE.edition} ${SITE.name}`,
    description: SITE.description,
    url: "https://www.longevityleadershipconference.com",
    startDate: "2026-04-30T10:00:00-07:00",
    endDate: "2026-04-30T17:00:00-07:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: SITE.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Playa Vista",
        addressRegion: "CA",
        addressCountry: "US",
      },
    },
    image: "https://www.longevityleadershipconference.com/og-image.png",
    organizer: [
      {
        "@type": "Organization",
        name: "Healthspan Collective",
        url: "https://healthspan.community",
        sameAs: [
          "https://www.instagram.com/healthspan_collective/",
          "https://www.linkedin.com/company/healthspanpro/",
          "https://www.youtube.com/@healthspan_collective",
        ],
      },
      {
        "@type": "Organization",
        name: "Mission Matters Media",
        url: "https://missionmatters.com",
        sameAs: [
          "https://www.linkedin.com/in/adamtorres8/",
          "https://www.youtube.com/@MissionMattersBusiness",
        ],
      },
    ],
    performer: [
      ...HOSTS.map((h) => ({
        "@type": "Person",
        name: h.name,
        jobTitle: h.title,
      })),
      ...SPEAKERS.map((s) => ({
        "@type": "Person",
        name: s.name,
        jobTitle: s.role,
      })),
    ],
    offers: {
      "@type": "Offer",
      url: LINKS.tickets,
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function HomePageBody({
  initialSpeakerSlug,
}: {
  initialSpeakerSlug?: string;
} = {}) {
  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <EventJsonLd />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Vision />
        <Sponsors />
        <Speakers initialSlug={initialSpeakerSlug} />
        <TopicsCloud />
        <SpeakBanner />
        <Gallery />
        <EventDeck />
        <Subscribe />
      </main>
      <Footer />
    </>
  );
}
