"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, LINKS } from "@/lib/constants";
import { ChevronRight, Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[999] bg-bg/97 backdrop-blur-2xl flex flex-col items-center justify-center gap-7 transition-opacity duration-300 md:hidden",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-5 right-5 p-2"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className="text-xl font-semibold text-text hover:text-purple transition-colors"
          >
            {item.label}
          </a>
        ))}
        <a
          href={LINKS.tickets}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileOpen(false)}
          className="bg-purple-deep text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-md"
        >
          Get Tickets
        </a>
      </div>

      {/* Navbar */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[1000] py-4 transition-all duration-350",
          scrolled &&
            "bg-bg/92 backdrop-blur-2xl border-b border-border-light py-2.5 shadow-sm"
        )}
      >
        <div className="flex items-center justify-between max-w-[1140px] mx-auto px-6">
          <a href="#" className="flex items-center gap-2.5 font-bold text-base text-text tracking-tight">
            <div className="w-9 h-9 bg-purple-deep rounded-[10px] flex items-center justify-center relative overflow-hidden">
              <span className="font-black text-xs text-white tracking-wide relative z-10">
                LLC
              </span>
              <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-[radial-gradient(circle,rgba(192,96,128,0.4),transparent)]" />
            </div>
            LLC &rsquo;26
          </a>

          <ul className="hidden md:flex items-center gap-8 list-none">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-text-secondary hover:text-purple transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={LINKS.tickets}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-deep text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:bg-purple hover:-translate-y-0.5 shadow-[0_2px_12px_rgba(45,27,78,0.2)]"
              >
                Get Tickets
              </a>
            </li>
          </ul>

          <button
            className="flex md:hidden flex-col gap-[5px] p-1 bg-transparent"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>
    </>
  );
}
