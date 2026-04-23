"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, LINKS } from "@/lib/constants";
import { Menu, X } from "lucide-react";

export function Navbar({
  variant = "home",
}: {
  variant?: "home" | "about";
} = {}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // `activeSection` tracks which in-page section (by element id) is currently
  // in view. Drives the persistent nav-item underline (only the home-page
  // NAV_ITEMS ids cause an underline match) AND the URL-sync effect further
  // below (which runs on both `/` and `/about`). Null above all tracked
  // sections (hero / About intro) or on unrelated routes.
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const isTicketsPage = pathname === "/tickets";
  // `variant` is set by the body component that knows its own context.
  // Home-body routes (`/`, `/speakers/<slug>`) render the video hero — navbar
  // starts white-on-dark and switches to dark-on-cream on scroll. About-body
  // routes (`/about`, `/hosts`, `/hosts/<slug>`, `/experiences`,
  // `/experiences/<slug>`) render the cream editorial hero — navbar starts
  // dark-on-cream from first paint.
  //
  // Previously this was inferred from `usePathname()` pattern matching, but
  // Turbopack's SSR compile cache produced inconsistent results on dynamic
  // and list routes under `/hosts*` and `/experiences/<slug>` — an
  // `isAboutLikePage` expression resolved to false even though the same
  // `pathname.startsWith(...)` predicate resolved to true for the sibling
  // `isActive` underline computation on the same render. An explicit prop
  // sidesteps that entirely.
  const darkMode = scrolled || variant === "about";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Scroll spy ─────────────────────────────────────────────
     Tracks which hash-anchor section (`#sponsors`, `#speakers`, etc.) the
     user is currently viewing. Drives two separate consumers:
       1. The navbar underline — which nav item gets the persistent
          underline (only meaningful on `/`, since NAV_ITEMS hash targets
          all live on the home page).
       2. The URL-sync effect below — `replaceState`s the hash into the
          address bar so the URL tracks scroll position on `/` and
          `/about` alike, for copy/shareability.

     Uses scroll position rather than IntersectionObserver for predictable
     cross-direction behavior: a section is "active" once its top edge has
     passed just under the navbar (150px comfort offset), and stays active
     until the next section's top crosses the same line. Above all tracked
     sections (hero / About intro in view), `activeSection` is null.

     Runs on `/` and `/about`; on other routes we clear state so the
     route-match rule (`pathname === item.href`) takes over cleanly and
     no scroll listener is left attached. */
  useEffect(() => {
    if (pathname !== "/" && pathname !== "/about") {
      setActiveSection(null);
      return;
    }
    // Section ids in document order. Chosen deliberately rather than
    // derived from NAV_ITEMS:
    //   - Home leads with `#conference` — the Vision section ("The
    //     Conference / For Industry Insiders"), which opens with the
    //     "if you are serious about building in the longevity space…"
    //     quote. Not a nav item. Deliberately NOT on the hero `<section>`
    //     — we want the clean `/` URL while the hero video is in view,
    //     and `/#conference` to kick in only once the user scrolls to
    //     the actual conference pitch.
    //   - Home also includes `#partner` (the "Partner with Us" banner in
    //     `event-deck.tsx`). Same rationale — real section with an id,
    //     not in NAV_ITEMS. No underline side effect for either, since
    //     the underline logic only matches `NAV_ITEMS.href`.
    //   - About tracks its three content sections: Hosts, Experiences
    //     (via the `#iwa` canonical wrapper, matching existing deep-link
    //     conventions), and the Agenda CTA. The cream intro at the top
    //     has no id, so it stays as `/about` with no hash.
    const sectionIds =
      pathname === "/"
        ? ["conference", "sponsors", "speakers", "gallery", "partner", "venue", "subscribe"]
        : ["hosts", "iwa", "agenda"];

    const handleScroll = () => {
      const scrollY = window.scrollY + 150; // ≈ navbar height + comfort margin
      let active: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= scrollY) {
          active = id; // keep updating; last one wins in document order
        } else {
          break; // sectionIds are in document order — no need to keep checking
        }
      }

      // Near-bottom override: the last section (Subscribe) plus the footer
      // together may not be tall enough to push Subscribe's top past the
      // 150px trigger line — max scrollY is `documentHeight - viewportHeight`,
      // which can land with Subscribe's top still at ~300–500px. In that case
      // the user is visibly reading Subscribe but the main loop above would
      // leave the previous section (Venue) marked active. Treat the bottom
      // 150px of the document as "in the last section" regardless of
      // offsetTop math.
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (
        maxScroll > 0 &&
        maxScroll - window.scrollY < 150 &&
        sectionIds.length > 0
      ) {
        active = sectionIds[sectionIds.length - 1];
      }

      setActiveSection(active);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // prime initial state on mount / route change
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  /* ── URL sync ───────────────────────────────────────────────
     Mirror the scroll spy's `activeSection` into the URL bar so the
     address is copy/shareable for whatever the user is currently
     reading. `replaceState` (not `pushState`) because passive scrolling
     must not pollute browser history — otherwise Back would take as
     many clicks as sections scrolled through, which breaks "Back leaves
     the site."

     Two guards:
       1. Outer Next guard (`pathname === "/" || pathname === "/about"`)
          — skips route changes away from the scroll-sync's domain.
       2. Inner live-DOM guard (`window.location.pathname === pathname`)
          — catches modal pushStates that bypass Next's router. When a
          user clicks a speaker card on `/`, `speakers.tsx` calls
          `history.pushState("/speakers/<slug>")` directly, which
          doesn't trigger a Next re-render. `usePathname()` still
          reports "/" but `window.location.pathname` is the truth.
          Without this guard we'd clobber the modal's URL. */
  useEffect(() => {
    if (pathname !== "/" && pathname !== "/about") return;
    if (window.location.pathname !== pathname) return;
    const nextHash = activeSection ? `#${activeSection}` : "";
    const nextURL = pathname + nextHash;
    const currentURL = window.location.pathname + window.location.hash;
    if (nextURL !== currentURL) {
      window.history.replaceState(null, "", nextURL);
    }
  }, [activeSection, pathname]);

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
                // Let cross-page routes (e.g. "/about") navigate normally —
                // close the menu but let the browser handle the link.
                if (item.href.startsWith("/")) {
                  setMobileOpen(false);
                  return;
                }
                e.preventDefault();
                setMobileOpen(false);
                const id = item.href.replace("#", "");
                const target = document.getElementById(id);
                if (target) {
                  setTimeout(() => {
                    window.scrollTo({ top: target.offsetTop - 100, behavior: "smooth" });
                    // See desktop handler below for rationale — keep the URL
                    // in sync with the section the user just navigated to.
                    history.pushState(null, "", item.href);
                  }, 350);
                } else {
                  window.location.href = "/" + item.href;
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
          onClick={() => { track('Ticket Click', { location: 'mobile-nav' }); setMobileOpen(false); }}
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
          <Link href="/" className="relative shrink-0 h-[78px] md:h-[86px] w-[280px] md:w-[468px]">
            {/* Purple logo — visible on scroll */}
            <Image
              src="/brand/logo.png"
              alt="Healthspan Collective"
              width={3309}
              height={986}
              sizes="(max-width: 768px) 280px, 468px"
              className={cn(
                "h-[52px] md:h-[65px] w-auto absolute left-0 top-1/2 -translate-y-1/2 transition-opacity duration-350",
                darkMode ? "opacity-100" : "opacity-0"
              )}
            />
            {/* White logo — visible over video hero */}
            <Image
              src="/brand/logo-white.png"
              alt="Healthspan Collective"
              width={3230}
              height={786}
              priority
              quality={100}
              sizes="(max-width: 768px) 280px, 468px"
              className={cn(
                "h-[62px] md:h-[70px] w-auto absolute left-0 top-1/2 -translate-y-1/2 transition-opacity duration-350",
                darkMode ? "opacity-0" : "opacity-100"
              )}
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-5 xl:gap-7 list-none">
            {NAV_ITEMS.map((item) => {
              // An item is "active" in three ways:
              //   - Route match: `pathname === item.href` (e.g. /about is active on /about)
              //   - Scroll spy: hash items are active when their target section
              //     is currently in view (only meaningful on the home page)
              //   - Deep-link route family: `/speakers/<slug>` activates
              //     "#speakers"; `/hosts*` and `/experiences*` activate "/about"
              //     (those items live under About's narrative). Without this,
              //     a user landing on `/speakers/sanjiv` from a shared link
              //     would see no active underline at all.
              // When active, the underline holds at full width and the text
              // color matches the hover color permanently, so the user has a
              // continuous indicator of where they are on the site.
              const isActive = (() => {
                if (item.href.startsWith("/")) {
                  // Direct route match (e.g. "/about" on /about)
                  if (pathname === item.href) return true;
                  // Hosts and experiences routes fold into /about's nav item,
                  // since those sections are canonical content under /about.
                  if (
                    item.href === "/about" &&
                    (pathname.startsWith("/hosts") ||
                      pathname.startsWith("/experiences"))
                  ) {
                    return true;
                  }
                  return false;
                }
                // Hash items: home-page scroll spy match, OR a deep-link
                // route whose family maps back to this hash. Currently only
                // speakers routes map this way (`#speakers`).
                if (pathname === "/" && activeSection === item.href.slice(1)) {
                  return true;
                }
                if (
                  item.href === "#speakers" &&
                  pathname.startsWith("/speakers")
                ) {
                  return true;
                }
                return false;
              })();
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      // Let cross-page routes (e.g. "/about") navigate normally.
                      if (item.href.startsWith("/")) return;
                      e.preventDefault();
                      const id = item.href.replace("#", "");
                      const target = document.getElementById(id);
                      if (target) {
                        const y = target.getBoundingClientRect().top + window.scrollY - 100;
                        window.scrollTo({ top: y, behavior: "smooth" });
                        // Mirror native anchor behavior: reflect the clicked
                        // section in the URL bar so the address is copy/shareable
                        // and the browser Back button returns to the previous
                        // section. We `preventDefault()` above to do a custom
                        // smooth-scroll with navbar-offset math, which skips the
                        // URL update that native `#hash` navigation would do —
                        // `pushState` adds it back.
                        history.pushState(null, "", item.href);
                      } else {
                        window.location.href = "/" + item.href;
                      }
                    }}
                    // "page" for a full route match, "location" for an in-page
                    // section — both are valid aria-current values and give
                    // screen readers a correct read of "where am I" depending
                    // on whether the item is a route or an anchor.
                    aria-current={
                      isActive
                        ? item.href.startsWith("/")
                          ? "page"
                          : "location"
                        : undefined
                    }
                    className={cn(
                      "group relative text-[0.8rem] xl:text-sm font-medium transition-colors whitespace-nowrap py-1",
                      darkMode
                        ? isActive
                          ? "text-purple"
                          : "text-text-secondary hover:text-purple"
                        : isActive
                          ? "text-white"
                          : "text-white/80 hover:text-white"
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute left-0 -bottom-0.5 h-[1.5px] transition-all duration-300 ease-out rounded-full",
                        darkMode ? "bg-purple" : "bg-white",
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href={LINKS.tickets}
                onClick={() => track('Ticket Click', { location: 'navbar' })}
                className={cn(
                  "shrink-0 whitespace-nowrap px-5 xl:px-6 py-2.5 rounded-full font-semibold text-[0.8rem] xl:text-sm transition-all hover:-translate-y-0.5",
                  isTicketsPage && !scrolled
                    ? "bg-white text-purple-deep hover:bg-white/90 shadow-[0_2px_16px_rgba(255,255,255,0.2)]"
                    : "bg-purple-deep text-white hover:bg-purple shadow-[0_2px_12px_rgba(45,27,78,0.2)]"
                )}
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
            <Menu className={cn("w-6 h-6 transition-colors duration-350", darkMode ? "text-text" : "text-white")} />
          </button>
        </div>
      </nav>

    </>
  );
}
