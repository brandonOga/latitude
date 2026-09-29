"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { INDUSTRIES, pad } from "@/lib/content";

const N = INDUSTRIES.length;

// Three copies of the list so there are always cards on both sides of the
// active one. After each slide settles, the position is shifted back into the
// middle copy without animating, which makes the loop seamless.
const SLIDES = [0, 1, 2].flatMap((copy) =>
  INDUSTRIES.map((industry, i) => ({ ...industry, i, copy })),
);

export default function IndustriesCarousel() {
  // Index into SLIDES of the active card (the one at the left edge)
  const [pos, setPos] = useState(N);
  const [animate, setAnimate] = useState(true);
  const touchX = useRef<number | null>(null);

  const active = ((pos % N) + N) % N;

  const go = (step: number) => {
    setAnimate(true);
    setPos((p) => Math.min(Math.max(p + step, 0), SLIDES.length - 1));
  };

  // Once a slide finishes, jump back into the middle copy
  const settle = (e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget) return;
    if (pos >= 2 * N || pos < N) {
      setAnimate(false);
      setPos(N + active);
    }
  };

  // Re-enable the transition after the silent jump has painted
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimate(true)),
    );
    return () => cancelAnimationFrame(id);
  }, [animate]);

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Industries"
    >
      <div
        className="carousel-viewport"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <ul
          className={animate ? "carousel-track is-animated" : "carousel-track"}
          style={{ "--pos": pos } as React.CSSProperties}
          onTransitionEnd={settle}
          role="list"
        >
          {SLIDES.map(({ name, img, description, i, copy }) => (
            <li
              key={`${copy}-${name}`}
              className="carousel-slide"
              aria-hidden={copy !== 1 || undefined}
              // Only the middle copy is on screen at load, so only it animates
              data-reveal={copy === 1 ? "clip-up" : undefined}
            >
              <Image src={img} alt="" fill sizes="440px" className="cover" />
              <div className="slide-overlay">
                <span className="slide-num">{pad(i + 1)}</span>
                <div className="slide-body">
                  <h3 className="slide-title h5">{name}</h3>
                  <p className="slide-desc">
                    <span>{description}</span>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="carousel-controls">
        {/* Announces the current industry to screen readers only */}
        <span className="sr-only" aria-live="polite">
          {pad(active + 1)} of {pad(N)}: {INDUSTRIES[active].name}
        </span>
        <div className="carousel-arrows">
          <button
            type="button"
            className="carousel-arrow"
            aria-label="Previous industry"
            onClick={() => go(-1)}
            data-reveal="up"
          >
            <FaArrowLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            className="carousel-arrow"
            aria-label="Next industry"
            onClick={() => go(1)}
            data-reveal="up"
          >
            <FaArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
