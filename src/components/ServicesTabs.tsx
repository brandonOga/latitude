"use client";

import Image from "next/image";
import { useState } from "react";
import Button from "@/components/Button";
import { SERVICES } from "@/lib/content";

export default function ServicesTabs() {
  const [active, setActive] = useState(SERVICES[0].key);
  const panel = SERVICES.find((s) => s.key === active) ?? SERVICES[0];

  return (
    <>
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
              data-reveal="up"
            >
              <span className="tab-curve tab-curve--l" />
              <span className="tab-curve tab-curve--r" />
              <span className="tab-label">{s.title}</span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${panel.key}`}
        aria-labelledby={`tab-${panel.key}`}
        className="panel"
        data-reveal="up"
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
    </>
  );
}
