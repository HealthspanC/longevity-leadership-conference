import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  accentWord?: string | string[];
  subtitle?: string;
  centered?: boolean;
  dark?: boolean;
}

export function SectionHeader({
  label,
  title,
  accentWord,
  subtitle,
  centered = false,
  dark = false,
}: SectionHeaderProps) {
  const accentWords = accentWord ? (Array.isArray(accentWord) ? accentWord : [accentWord]) : [];
  const accentClass = dark ? "text-purple-light" : "text-purple";

  return (
    <div className={cn(centered && "text-center", "mb-14")}>
      {label && (
        <span
          className={cn(
            "inline-flex items-center gap-2.5 text-[0.7rem] font-bold tracking-[0.25em] uppercase mb-3.5",
            dark ? "text-purple-light" : "text-purple-mid",
            "before:content-[''] before:w-6 before:h-px",
            dark ? "before:bg-purple-light" : "before:bg-purple-mid"
          )}
        >
          {label}
        </span>
      )}
      <h2
        className={cn(
          "font-serif text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-[1.15] mb-4",
          dark ? "text-white" : "text-text"
        )}
      >
        {accentWords.length > 0 ? (
          <>
            {accentWords.reduce<{ remaining: string; elements: React.ReactNode[] }>(
              (acc, word, i) => {
                const idx = acc.remaining.indexOf(word);
                if (idx === -1) return acc;
                const before = acc.remaining.slice(0, idx);
                const after = acc.remaining.slice(idx + word.length);
                return {
                  remaining: after,
                  elements: [
                    ...acc.elements,
                    before,
                    <span key={i} className={accentClass}>{word}</span>,
                  ],
                };
              },
              { remaining: title, elements: [] }
            ).elements}
            {title.slice(title.lastIndexOf(accentWords[accentWords.length - 1]) + accentWords[accentWords.length - 1].length)}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-[1.05rem] leading-[1.75] max-w-[580px]",
            centered && "mx-auto",
            dark ? "text-white/65" : "text-text-secondary"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
