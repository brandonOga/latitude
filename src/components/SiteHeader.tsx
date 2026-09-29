"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Contact", href: "#contact" },
];

export default function SiteHeader() {
  // Compact header once the page has scrolled away from the top
  const [scrolled, setScrolled] = useState(false);
  // href of the section currently in view, or null above the first one
  const [active, setActive] = useState<string | null>(null);
  // Mobile menu (below the desktop breakpoint)
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Measure the header once on load and expose it as --header-h, so the hero
  // can fill the rest of the screen. The bar's height doesn't change on
  // scroll (only the hanging logo shrinks), so there's no need to re-measure.
  useEffect(() => {
    const height = headerRef.current?.offsetHeight;
    if (height) {
      document.documentElement.style.setProperty("--header-h", `${height}px`);
    }
  }, []);

  // While the mobile menu is open: lock page scroll, close on Escape, and
  // close if the window grows past the desktop breakpoint
  useEffect(() => {
    if (!menuOpen) return;
    const html = document.documentElement;
    html.classList.add("menu-open");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const desktop = window.matchMedia("(min-width: 1200px)");
    const onChange = () => desktop.matches && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onChange);
    return () => {
      html.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onChange);
    };
  }, [menuOpen]);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 8);

      // Active section: the last one whose top has passed 40% down the
      // viewport. At the very bottom, the last section wins even if it's
      // too short to reach that line.
      const line = window.innerHeight * 0.4;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      let current: string | null = null;
      for (const { href } of NAV) {
        const el = document.querySelector(href);
        if (el && el.getBoundingClientRect().top <= line) current = href;
      }
      setActive(atBottom ? NAV[NAV.length - 1].href : current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={[
        "site-header",
        scrolled && "is-scrolled",
        menuOpen && "is-menu-open",
      ]
        .filter(Boolean)
        .join(" ")}
      data-reveal-group="entrance"
    >
      <div className="container header-inner">
        {/* The logo image already includes the name and tagline */}
        <a href="#top" className="brand" data-reveal="down">
          <Image
            src="/assets/latitude-logo.jpeg"
            alt="Latitude Zimbabwe Financial Advisory"
            width={1254}
            height={1254}
            sizes="150px"
            className="logo"
            priority
          />
        </a>
        <nav className="nav" data-reveal="down">
          {NAV.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={href === active ? "is-active" : undefined}
              aria-current={href === active ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <Button
          href="#contact"
          size="sm"
          className="header-cta"
          data-reveal="down"
        >
          Book a consultation
        </Button>

        {/* Mobile only: opens the menu panel */}
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
          data-reveal="down"
        >
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
        </button>
      </div>

      {/* Mobile menu panel; inert while closed so it can't be tabbed into */}
      <div id="mobile-menu" className="mobile-menu" inert={!menuOpen}>
        <nav className="container mobile-nav" aria-label="Mobile">
          {NAV.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={href === active ? "is-active" : undefined}
              aria-current={href === active ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <Button
            href="#contact"
            className="mobile-cta"
            onClick={() => setMenuOpen(false)}
          >
            Book a consultation
          </Button>
        </nav>
      </div>
    </header>
  );
}
