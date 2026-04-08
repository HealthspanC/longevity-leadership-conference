"use client";

import { useState } from "react";
import Image from "next/image";
import { Ticket } from "lucide-react";

export function TicketEmbed() {
  const [showEmbed, setShowEmbed] = useState(false);

  return (
    <div className="bg-white rounded-[20px] ring-1 ring-purple-mid/[0.1] shadow-[0_8px_40px_rgba(91,58,140,0.08)] overflow-hidden">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-purple-deep via-purple-mid to-[#3c2066]" />
      {/* Card header */}
      <div className="px-8 pt-7 pb-4 text-center border-b border-black/[0.04]">
        <h2 className="font-serif text-[1.4rem] font-bold text-text mb-1">
          Select Your Ticket
        </h2>
        <p className="text-[0.85rem] text-text-secondary">
          Limited availability &mdash; early registration recommended
        </p>
      </div>

      {showEmbed ? (
        <div className="relative">
          <div className="flex justify-center p-6 md:p-8">
            <iframe
              src="https://luma.com/embed/event/evt-x1JHI9BBgriHX92/simple"
              width="600"
              height="1200"
              frameBorder="0"
              style={{
                border: "none",
                borderRadius: "8px",
                maxWidth: "100%",
              }}
              allow="fullscreen; payment"
              aria-hidden="false"
              tabIndex={0}
              title="Get tickets on Luma"
            />
          </div>
          <div className="flex justify-center pb-6">
            <button
              onClick={() => setShowEmbed(false)}
              className="text-[0.8rem] text-text-secondary hover:text-text transition-colors duration-300 cursor-pointer"
            >
              &larr; Back to overview
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowEmbed(true)}
          className="group relative w-full cursor-pointer"
        >
          {/* Hero image */}
          <div className="relative aspect-square overflow-hidden">
            <Image
              src="/og-image2.jpg"
              alt="Longevity Leadership Conference 2026"
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            {/* Subtle bottom fade */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-purple-deep/40 to-transparent" />
          </div>

          {/* CTA below image */}
          <div className="flex flex-col items-center bg-gradient-to-b from-purple-deep to-[#3c2066] px-6 py-8">
            <div className="flex items-center gap-2.5 bg-white/95 text-purple-deep font-semibold text-[0.95rem] tracking-wide px-8 py-4 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] ring-1 ring-white/30 transition-all duration-500 ease-out group-hover:bg-white group-hover:shadow-[0_6px_30px_rgba(91,58,140,0.35)] group-hover:-translate-y-0.5 group-hover:ring-purple-light/40">
              <Ticket className="w-5 h-5" />
              View Available Tickets
            </div>
            <p className="mt-3 text-[0.78rem] text-white/40">
              Powered by Luma
            </p>
          </div>
        </button>
      )}
    </div>
  );
}
