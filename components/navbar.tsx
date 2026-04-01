"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, LINKS } from "@/lib/constants";
import { Menu, X } from "lucide-react";

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
          "fixed top-0 left-0 right-0 z-[1000] transition-all duration-350",
          scrolled
            ? "bg-white/82 backdrop-blur-xl backdrop-saturate-150 border-b border-white/40 shadow-[0_1px_12px_rgba(0,0,0,0.06)] py-3"
            : "py-5"
        )}
      >
        <div className="flex items-center justify-between max-w-[1280px] mx-auto px-6">
          {/* Logo */}
          <a href="#" className="relative shrink-0">
            {/* Purple logo — visible on scroll */}
            <Image
              src="/brand/logo.png"
              alt="Healthspan Collective"
              width={3309}
              height={986}
              priority
              className={cn(
                "w-[220px] h-auto transition-opacity duration-350",
                scrolled ? "opacity-100" : "opacity-0"
              )}
            />
            {/* White logo — visible over video hero */}
            <Image
              src="/brand/logo-white.png"
              alt="Healthspan Collective"
              width={4147}
              height={1798}
              priority
              className={cn(
                "w-[220px] h-auto absolute top-1/2 left-0 -translate-y-1/2 transition-opacity duration-350",
                scrolled ? "opacity-0" : "opacity-100"
              )}
            />
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-7 list-none">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    scrolled
                      ? "text-text-secondary hover:text-purple"
                      : "text-white/80 hover:text-white"
                  )}
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

          {/* Mobile hamburger */}
          <button
            className="flex md:hidden p-1 bg-transparent"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className={cn("w-6 h-6 transition-colors duration-350", scrolled ? "text-text" : "text-white")} />
          </button>
        </div>
      </nav>
    </>
  );
}
