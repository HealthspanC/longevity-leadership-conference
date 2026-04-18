import { ScrollProgress } from "@/components/scroll-progress";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { Vision } from "@/components/vision";
import { Sponsors } from "@/components/sponsors";
import { Hosts } from "@/components/hosts";
import { Speakers } from "@/components/speakers";
import { MissionBanner } from "@/components/mission-banner";
import { SpeakBanner } from "@/components/speak-banner";
import { Gallery } from "@/components/gallery";
import { TopicsCloud } from "@/components/topics-cloud";
import { EventDeck } from "@/components/event-deck";
import { Subscribe } from "@/components/subscribe";
import { Footer } from "@/components/footer";
import { PromoPopup } from "@/components/promo-popup";
import { SITE, LINKS, SPEAKERS, HOSTS } from "@/lib/constants";

function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Healthspan Collective",
    url: "https://healthspan.community",
    logo: "https://longevityleadershipconference.com/brand/logo.png",
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
    url: "https://longevityleadershipconference.com",
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
    url: "https://longevityleadershipconference.com",
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
    image: "https://longevityleadershipconference.com/og-image.png",
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

export default function Home() {
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
        <Hosts />
        <Speakers />
        <TopicsCloud />
        <SpeakBanner />
        <Gallery />
        <EventDeck />
        <Subscribe />
      </main>
      <Footer />
      <PromoPopup />
    </>
  );
}
