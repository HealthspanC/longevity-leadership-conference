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
          "fixed inset-0 z-[1001] flex flex-col items-center justify-center transition-all duration-300 lg:hidden overflow-hidden",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Dark purple background with texture */}
        <div className="absolute inset-0 bg-purple-deep" />
        <div className="absolute inset-0 dark-panel-texture" />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-dark/40 via-transparent to-purple-deep/60" />

        {/* Subtle radial glow accent */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-purple-mid/10 blur-[100px]" />

        {/* Close button — glass pill */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-5 right-5 p-2.5 rounded-full bg-white/[0.08] backdrop-blur-sm border border-white/[0.12] transition-all duration-300 hover:bg-white/[0.14] active:scale-95"
          aria-label="Close menu"
        >
          <X className="w-5 h-5 text-white/80" />
        </button>

        {/* Logo */}
        <div className={cn(
          "mb-10 transition-all duration-300",
          mobileOpen ? "opacity-100 translate-y-0 delay-75" : "opacity-0 -translate-y-4"
        )}>
          <Image
            src="/brand/logo-white.png"
            alt="Healthspan Collective"
            width={4147}
            height={1798}
            className="w-[200px] h-auto"
          />
        </div>

        {/* Nav items with staggered entrance */}
        <nav className="flex flex-col items-center gap-1">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                const id = item.href.replace("#", "");
                const target = document.getElementById(id);
                if (target) {
                  setTimeout(() => {
                    window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
                  }, 350);
                }
              }}
              className={cn(
                "relative text-2xl font-serif font-medium text-white/80 hover:text-white py-3 px-8 rounded-lg transition-all duration-300",
                "hover:bg-white/[0.05]",
                "active:scale-[0.98]",
                mobileOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
              style={{
                transitionDelay: mobileOpen ? `${80 + i * 40}ms` : "0ms",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Decorative divider */}
        <div className={cn(
          "w-16 h-px my-6 bg-gradient-to-r from-transparent via-purple-light/40 to-transparent transition-all duration-400",
          mobileOpen ? "opacity-100 scale-x-100 delay-300" : "opacity-0 scale-x-0"
        )} />

        {/* CTA button */}
        <a
          href={LINKS.tickets}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileOpen(false)}
          className={cn(
            "bg-white text-purple-deep px-8 py-3 rounded-full font-semibold text-sm tracking-wide transition-all duration-300",
            "shadow-[0_0_30px_rgba(168,124,224,0.25)] hover:shadow-[0_0_40px_rgba(168,124,224,0.35)]",
            "hover:-translate-y-0.5 active:scale-[0.97]",
            mobileOpen ? "opacity-100 translate-y-0 delay-[350ms]" : "opacity-0 translate-y-4"
          )}
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
          <a href="#" className="relative shrink-0 h-[78px] md:h-[86px] w-[280px] md:w-[468px]">
            {/* Purple logo — visible on scroll */}
            <Image
              src="/brand/logo.png"
              alt="Healthspan Collective"
              width={3309}
              height={986}
              priority
              className={cn(
                "h-[52px] md:h-[65px] w-auto absolute left-0 top-1/2 -translate-y-1/2 transition-opacity duration-350",
                scrolled ? "opacity-100" : "opacity-0"
              )}
            />
            {/* White logo — visible over video hero */}
            <Image
              src="/brand/logo-white.png"
              alt="Healthspan Collective"
              width={3230}
              height={786}
              priority
              className={cn(
                "h-[62px] md:h-[70px] w-auto absolute left-0 top-1/2 -translate-y-1/2 transition-opacity duration-350",
                scrolled ? "opacity-0" : "opacity-100"
              )}
            />
          </a>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-7 list-none">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const id = item.href.replace("#", "");
                    const target = document.getElementById(id);
                    if (target) {
                      const y = target.getBoundingClientRect().top + window.scrollY;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  }}
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
            className="flex lg:hidden p-1 bg-transparent"
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
