import { LINKS } from "@/lib/constants";
import { ChevronRight } from "lucide-react";
import { FadeIn } from "./fade-in";

export function MissionBanner() {
  return (
    <section className="relative z-[3] py-24 bg-purple-deep overflow-hidden">
      {/* Decorative overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_40%,rgba(192,96,128,0.15),transparent_50%),radial-gradient(circle_at_90%_60%,rgba(42,122,110,0.1),transparent_40%),radial-gradient(circle_at_50%_20%,rgba(91,58,140,0.2),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23ffffff' stroke-width='0.3' fill='none' opacity='0.05'%3E%3Cline x1='0' y1='60' x2='60' y2='0'/%3E%3C/g%3E%3C/svg%3E")` }} />

      <div className="max-w-[1140px] mx-auto px-6">
        <FadeIn>
          <div className="relative z-10 text-center max-w-[700px] mx-auto">
            <span className="inline-flex items-center gap-2.5 text-[0.7rem] font-bold tracking-[0.25em] uppercase text-purple-light mb-6 before:content-[''] before:w-6 before:h-px before:bg-purple-light after:content-[''] after:w-6 after:h-px after:bg-purple-light">
              Our Mission
            </span>
            <p className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] italic leading-[1.5] text-white mb-8">
              &ldquo;We envision a society where living to 100 in excellent
              health is the norm, not the exception &mdash; where every
              generation benefits from scientific advancements in health and
              longevity.&rdquo;
            </p>
            <a
              href={LINKS.tickets}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white text-purple-deep py-4 px-9 rounded-full font-bold text-[0.95rem] transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
            >
              Be Part of the Future
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
