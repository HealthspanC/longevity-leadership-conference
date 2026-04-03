import { ScrollProgress } from "@/components/scroll-progress";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { Vision } from "@/components/vision";
import { Hosts } from "@/components/hosts";
import { Speakers } from "@/components/speakers";
import { MissionBanner } from "@/components/mission-banner";
import { SpeakBanner } from "@/components/speak-banner";
import { Gallery } from "@/components/gallery";
import { TopicsCloud } from "@/components/topics-cloud";
import { EventDeck } from "@/components/event-deck";
import { Subscribe } from "@/components/subscribe";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Vision />
        <Hosts />
        <Speakers />
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
