import { LINKS } from "@/lib/constants";
import { ChevronRight } from "lucide-react";
import { FadeIn } from "./fade-in";

export function SpeakBanner() {
  return (
    <section
      className="relative z-[3] py-10 bg-purple-deep overflow-hidden"
    >
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_40%,rgba(192,96,128,0.15),transparent_50%),radial-gradient(circle_at_90%_60%,rgba(42,122,110,0.1),transparent_40%),radial-gradient(circle_at_50%_20%,rgba(91,58,140,0.2),transparent_50%)] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23ffffff' stroke-width='0.3' fill='none' opacity='0.05'%3E%3Cline x1='0' y1='60' x2='60' y2='0'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-[1140px] mx-auto px-6">
        <FadeIn>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <p className="text-white/70 text-[0.9rem]">
              Interested in sharing your expertise on stage?
            </p>
            <a
              href={LINKS.applySpeaker}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white py-2.5 px-6 rounded-full font-semibold text-[0.85rem] transition-all hover:bg-white hover:text-purple-deep hover:-translate-y-0.5"
            >
              Apply to Speak
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
