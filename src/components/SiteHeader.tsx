"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
      className={scrolled ? "site-header is-scrolled" : "site-header"}
      data-reveal-group="entrance"
    >
      <div className="container header-inner">
        <a href="#top" className="brand" data-reveal="down">
          <Image
            src="/assets/latitude-mark.png"
            alt="Latitude logo"
            width={80}
            height={80}
            className="logo"
            priority
          />
          <div className="brand-text">
            <span className="brand-name h6">Latitude</span>
            <span className="brand-sub">Zimbabwe Financial Advisory</span>
          </div>
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
        <Button href="#contact" size="sm" data-reveal="down">
          Book a consultation
        </Button>
      </div>
    </header>
  );
}
