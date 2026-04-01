import { GALLERY_ITEMS } from "@/lib/constants";
import {
  Monitor,
  Users,
  MessageSquare,
  Activity,
  Heart,
  Trophy,
  MapPin,
  TrendingUp,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "./fade-in";
import { SectionHeader } from "./section-header";

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  Users,
  MessageSquare,
  Activity,
  Heart,
  Trophy,
  MapPin,
  TrendingUp,
};

/* 12-col grid spans for each item */
const gridSpan: Record<string, string> = {
  large: "col-span-12 md:col-span-8 md:row-span-2",
  normal: "col-span-6 md:col-span-4",
  wide: "col-span-12 md:col-span-6",
};

/* Per-item gradient backgrounds using inline styles since they're unique and data-driven */
const gradients: string[] = [
  "linear-gradient(145deg, #2d1b4e 0%, #3c2066 30%, #5b3a8c 70%, #7b52b5 100%)",
  "linear-gradient(160deg, #3c2066, #6b4090)",
  "linear-gradient(135deg, #1e3a4c, #2a6058, #2a7a6e)",
  "linear-gradient(150deg, #2d1b4e, #4a2d6e, #6b4090)",
  "linear-gradient(135deg, #4a2040, #7a3060, #c06080)",
  "linear-gradient(160deg, #1a1a2e, #2d1b4e, #3c2066)",
  "linear-gradient(140deg, #1a2e2a, #2a5a4e, #3a8a7a)",
  "linear-gradient(135deg, #2d1b4e, #5b3a8c)",
];

export function Gallery() {
  return (
    <section id="gallery" className="relative z-2 py-28 lg:py-32">
      <div className="max-w-[1140px] mx-auto px-6">
        <FadeIn>
          <SectionHeader
            label="Past Highlights"
            title="Event Gallery"
            accentWord="Gallery"
            subtitle="Relive the energy and impact of previous Longevity Leadership Conferences."
            centered
          />
        </FadeIn>

        <FadeIn delay={100}>
          <div className="grid grid-cols-12 auto-rows-[200px] gap-3">
            {GALLERY_ITEMS.map((item, i) => {
              const WatermarkIcon = iconMap[item.watermarkIcon];
              const isLarge = item.span === "large";

              return (
                <div
                  key={item.title}
                  className={cn(
                    "group rounded-[12px] overflow-hidden relative cursor-pointer transition-all duration-350 hover:scale-[1.02] hover:z-10 hover:shadow-lg",
                    gridSpan[item.span]
                  )}
                >
                  {/* Background */}
                  <div
                    className="absolute inset-0"
                    style={{ background: gradients[i] }}
                  />

                  {/* Hatch texture */}
                  <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23ffffff' stroke-width='0.3' fill='none' opacity='0.06'%3E%3Cline x1='0' y1='60' x2='60' y2='0'/%3E%3C/g%3E%3C/svg%3E")` }} />

                  {/* Shimmer */}
                  <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.04)_50%,transparent_70%)] bg-[length:200%_100%] animate-[gallery-shimmer_4s_ease-in-out_infinite] pointer-events-none" />

                  {/* Watermark icon */}
                  {WatermarkIcon && (
                    <div className="absolute top-5 right-5 text-white/[0.08] z-[1]">
                      <WatermarkIcon className={cn(isLarge ? "w-16 h-16" : "w-10 h-10")} />
                    </div>
                  )}

                  {/* Content */}
                  <div className="absolute inset-0 flex items-end p-7 z-[2] transition-opacity duration-300 group-hover:opacity-0">
                    <div>
                      <div className="text-[0.6rem] font-bold tracking-[0.15em] uppercase text-white/45 mb-1.5">
                        {item.tag}
                      </div>
                      <div
                        className={cn(
                          "font-serif font-bold text-white/90 leading-tight",
                          isLarge ? "text-2xl" : "text-lg"
                        )}
                      >
                        {item.title}
                      </div>
                      {"description" in item && item.description && (
                        <div className="text-[0.78rem] text-white/45 leading-relaxed mt-1.5 max-w-xs">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,46,0.7)] via-[rgba(26,26,46,0.2)_40%] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex items-end p-7 z-[3]">
                    <span className="text-sm text-white/80 font-medium flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5" />
                      View photos
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
