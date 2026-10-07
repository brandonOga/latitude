"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState } from "react";
import Button from "@/components/Button";
import { playReveal } from "@/components/Reveal";
import { SERVICES } from "@/lib/content";

export default function ServicesTabs() {
  const [active, setActive] = useState(SERVICES[0].key);
  const panel = SERVICES.find((s) => s.key === active) ?? SERVICES[0];

  const panelRef = useRef<HTMLDivElement>(null);
  const reveal = useRef<gsap.core.Timeline | null>(null);
  // Tabs whose content has already animated in. The first one plays with
  // the rest of the section.
  const seen = useRef(new Set<string>([SERVICES[0].key]));

  // The first time a tab is opened, its content animates in the same way
  // the first tab's did
  useGSAP(
    () => {
      // Finish the previous tab's animation if it's still running
      reveal.current?.progress(1);
      reveal.current = null;
      if (seen.current.has(active)) return;
      seen.current.add(active);

      const el = panelRef.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // The section is still animating in, and that covers this content too
      if (gsap.isTweening(el.querySelectorAll("[data-reveal]"))) return;
      reveal.current = playReveal(el);
    },
    { dependencies: [active] },
  );

  return (
    // Tabs and panel are one shape, so they slide in as a single block
    <div data-reveal="up">
      <div role="tablist" className="tabs">
        {SERVICES.map((s) => {
          const on = s.key === active;
          return (
            <button
              key={s.key}
              type="button"
              role="tab"
              id={`tab-${s.key}`}
              aria-selected={on}
              aria-controls={`panel-${s.key}`}
              className={on ? "tab tab--on" : "tab"}
              onClick={() => setActive(s.key)}
            >
              <span className="tab-curve tab-curve--l" />
              <span className="tab-curve tab-curve--r" />
              <span className="tab-label">
                {/* " Services" is hidden on phones so all three tabs fit */}
                {s.title.replace(/ Services$/, "")}
                {s.title.endsWith(" Services") && (
                  <span className="tab-suffix"> Services</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${panel.key}`}
        aria-labelledby={`tab-${panel.key}`}
        className="panel"
        ref={panelRef}
      >
        <div className="panel-grid">
          <div className="panel-media" data-reveal="clip-left">
            <Image
              key={panel.img}
              src={panel.img}
              alt={panel.alt}
              fill
              sizes="(max-width: 860px) 100vw, 600px"
              className={`cover panel-img panel-img--${panel.key}`}
            />
          </div>
          <div className="panel-copy" data-reveal="right">
            <h4 className="panel-title">{panel.title}</h4>
            <ul className="offer-list">
              {panel.items.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
            <Button href="#contact" variant="light" className="panel-cta">
              Enquire Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
