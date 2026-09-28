"use client";

import Image from "next/image";
import { useState } from "react";
import { SERVICES, pad } from "@/lib/content";

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
      >
        <h3 className="panel-title">{panel.title}</h3>
        <p className="panel-intro">{panel.intro}</p>
        <div className="panel-grid">
          <div className="panel-media">
            <Image
              key={panel.img}
              src={panel.img}
              alt={panel.alt}
              fill
              sizes="(max-width: 860px) 100vw, 600px"
              className={`cover panel-img panel-img--${panel.key}`}
            />
          </div>
          <div className="offer-list">
            {panel.items.map((text, i) => (
              <div key={text} className="offer">
                <div className="offer-num">{pad(i + 1)}</div>
                <div className="offer-text">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
