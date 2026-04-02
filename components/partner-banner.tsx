import { INVOLVE_CARDS } from "@/lib/constants";
import { ChevronRight } from "lucide-react";
import { FadeIn } from "./fade-in";

export function PartnerBanner() {
  return (
    <section className="relative z-[3] py-10 bg-bg">
      <div className="max-w-[1140px] mx-auto px-6">
        <FadeIn>
          <div className="flex items-center justify-center">
            <a
              href={INVOLVE_CARDS[1].href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-[1.5px] border-purple/30 text-purple-deep py-2.5 px-6 rounded-full font-semibold text-[0.85rem] transition-all hover:bg-purple-deep hover:text-white hover:border-purple-deep hover:-translate-y-0.5"
            >
              Become a Summit Partner
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
