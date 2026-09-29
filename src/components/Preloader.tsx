"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { isPreloaderDone, markPreloaderDone } from "@/lib/preloader";

gsap.registerPlugin(useGSAP);

const WORD = "LATITUDE";

// Full-screen loading screen: the letters rise in, fill with gold from the
// bottom, drop away, then the panel lifts to reveal the page. It's rendered
// on the server so it covers the page from the very first paint.
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const html = document.documentElement;

      // Hand over to the page: unlock scrolling and start the reveals
      const finish = () => {
        html.classList.remove("is-loading");
        markPreloaderDone();
      };

      // Already played (e.g. after a hot reload), or reduced motion: get out
      // of the way immediately
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isPreloaderDone() || reduced) {
        gsap.set(el, { display: "none" });
        finish();
        return;
      }

      const letters = el.querySelectorAll(".preloader-letter");
      const tl = gsap.timeline({ paused: true });

      tl.fromTo(
        letters,
        { y: 0, yPercent: 100 },
        { yPercent: 0, duration: 0.6, stagger: 0.05, ease: "power2.out" },
      )
        .fromTo(
          letters,
          { "--clip": "inset(100% 0% 0% 0%)" },
          { "--clip": "inset(0% 0% 0% 0%)", duration: 0.8, delay: 0.3, ease: "power1.inOut" },
        )
        .to(letters, { yPercent: 100, duration: 0.6, stagger: 0.05, delay: 0.5, ease: "power2.in" })
        // The page's entrance animations start as the panel lifts
        .call(finish)
        .to(el, { yPercent: -100, duration: 0.9, ease: "power3.inOut" }, "<")
        .set(el, { display: "none" });

      // Start once the heading font is in, so the letters render correctly.
      // Strict Mode mounts this twice; only the surviving mount may play.
      let cancelled = false;
      document.fonts.ready.then(() => {
        if (!cancelled) tl.play();
      });
      return () => {
        cancelled = true;
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="preloader-word">
        {[...WORD].map((letter, i) => (
          <span key={i} className="preloader-letter" data-letter={letter}>
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
