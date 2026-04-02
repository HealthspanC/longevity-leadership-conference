import { INVOLVE_CARDS } from "@/lib/constants";
import { Mic, FileText, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "./fade-in";
import { SectionHeader } from "./section-header";

const iconMap: Record<string, React.ElementType> = {
  Mic,
  FileText,
};

const colorStyles = {
  purple: {
    iconBg: "bg-white/[0.12]",
    iconColor: "text-purple-light",
    linkColor: "text-purple-light",
    accentBar: "bg-purple-light",
  },
  rose: {
    iconBg: "bg-white/[0.12]",
    iconColor: "text-rose-pale",
    linkColor: "text-rose-pale",
    accentBar: "bg-rose",
  },
  teal: {
    iconBg: "bg-white/[0.12]",
    iconColor: "text-teal",
    linkColor: "text-teal",
    accentBar: "bg-teal",
  },
} as const;

export function GetInvolved() {
  return (
    <section
      id="involve"
      className="relative z-[3] py-24 lg:py-28 bg-purple-deep overflow-hidden"
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
          <SectionHeader
            label="Get Involved"
            title="Join the Movement"
            accentWord="Movement"
            subtitle="Multiple pathways to engage with the longevity leadership community."
            centered
            dark
          />
        </FadeIn>

        <FadeIn delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[720px] mx-auto">
            {INVOLVE_CARDS.map((card) => {
              const Icon = iconMap[card.icon];
              const styles = colorStyles[card.color];
              return (
                <div
                  key={card.title}
                  className="group bg-white/[0.07] backdrop-blur-sm border border-white/[0.1] rounded-[12px] p-10 px-7 text-center transition-all duration-350 hover:-translate-y-1 hover:bg-white/[0.12] relative"
                >
                  {/* Accent bar on hover */}
                  <div
                    className={cn(
                      "absolute top-0 left-0 right-0 h-[3px] rounded-t-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                      styles.accentBar
                    )}
                  />
                  <div
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5",
                      styles.iconBg,
                      styles.iconColor
                    )}
                  >
                    {Icon && <Icon className="w-6 h-6" />}
                  </div>
                  <h3 className="font-bold text-lg mb-2.5 text-white">
                    {card.title}
                  </h3>
                  <p className="text-[0.88rem] text-white/60 leading-relaxed mb-6">
                    {card.description}
                  </p>
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-1.5 font-semibold text-[0.88rem] transition-all hover:gap-2.5",
                      styles.linkColor
                    )}
                  >
                    Apply Now
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
