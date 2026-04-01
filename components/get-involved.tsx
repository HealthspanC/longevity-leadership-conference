import { INVOLVE_CARDS } from "@/lib/constants";
import { Mic, FileText, PlusCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "./fade-in";
import { SectionHeader } from "./section-header";

const iconMap: Record<string, React.ElementType> = {
  Mic,
  FileText,
  PlusCircle,
};

const colorStyles = {
  purple: {
    iconBg: "bg-purple-wash",
    iconColor: "text-purple",
    linkColor: "text-purple",
    accentBar: "bg-purple",
  },
  rose: {
    iconBg: "bg-rose-pale",
    iconColor: "text-rose",
    linkColor: "text-rose",
    accentBar: "bg-rose",
  },
  teal: {
    iconBg: "bg-[#eef8f6]",
    iconColor: "text-teal",
    linkColor: "text-teal",
    accentBar: "bg-teal",
  },
} as const;

export function GetInvolved() {
  return (
    <section
      id="involve"
      className="relative z-2 py-24 lg:py-28 bg-bg-warm border-t border-b border-border-light"
    >
      <div className="max-w-[1140px] mx-auto px-6">
        <FadeIn>
          <SectionHeader
            label="Get Involved"
            title="Join the Movement"
            accentWord="Movement"
            subtitle="Multiple pathways to engage with the longevity leadership community."
            centered
          />
        </FadeIn>

        <FadeIn delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {INVOLVE_CARDS.map((card) => {
              const Icon = iconMap[card.icon];
              const styles = colorStyles[card.color];
              return (
                <div
                  key={card.title}
                  className="group bg-bg-card border border-border-light rounded-[12px] p-10 px-7 text-center shadow-sm transition-all duration-350 hover:-translate-y-1 hover:shadow-lg relative"
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
                  <h3 className="font-bold text-lg mb-2.5 text-text">
                    {card.title}
                  </h3>
                  <p className="text-[0.88rem] text-text-secondary leading-relaxed mb-6">
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
