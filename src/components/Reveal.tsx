"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// Page-wide GSAP entrance and scroll-reveal animations.
//
// Wrap related elements in [data-reveal-group]; its [data-reveal] children
// play in DOM order as one timeline:
//   data-reveal-group              → plays when scrolled into view
//   data-reveal-group="entrance"   → plays on page load (header, hero)
//   data-reveal-delay="0.2"        → entrance start delay, in seconds
//
// Each child picks an animation with data-reveal:
//   (no value) or "mask"            → heading or paragraph: split into masked
//                                     lines that rise into view one by one
//   "up" | "down" | "left" | "right"
//                                   → block slides in from that side
//   "clip-up" | "clip-down" | "clip-left" | "clip-right"
//                                   → image wipes in from that side while
//                                     the photo settles from a zoom
// data-reveal-at overrides where a child starts in the timeline (any GSAP
// position, e.g. "0.3" or "<").
//
// Every [data-reveal] element must sit inside a group: it's hidden in CSS
// until its group builds.

type Slide = "up" | "down" | "left" | "right";
type Clip = "clip-up" | "clip-down" | "clip-left" | "clip-right";
type Kind = "text" | Slide | Clip;

const SLIDES: Record<Slide, gsap.TweenVars> = {
  up: { y: 60 },
  down: { y: -40 },
  left: { x: -80 },
  right: { x: 80 },
};

// Starting clip for each wipe, named by the side it comes in from
const CLIPS: Record<Clip, string> = {
  "clip-up": "inset(100% 0% 0% 0%)",
  "clip-down": "inset(0% 0% 100% 0%)",
  "clip-left": "inset(0% 100% 0% 0%)",
  "clip-right": "inset(0% 0% 0% 100%)",
};

// Where each item starts relative to the previous one, so a group plays as
// one sequence: heading → text → blocks and images.
function position(prev: Kind | null, kind: Kind): gsap.Position {
  if (prev === null) return 0;
  // Heading into paragraph, or paragraph into paragraph: the next element's
  // first line follows the previous last line at the same 0.1s rhythm
  // (0.6s duration - 0.1s), so the text reads as one continuous flow
  if (prev === "text" && kind === "text") return "-=0.5";
  // Consecutive blocks and images cascade 0.15s apart
  if (prev !== "text" && kind !== "text") return "<0.15";
  // Otherwise start just before the previous item finishes
  return "-=0.3";
}

function addToTimeline(
  tl: gsap.core.Timeline,
  el: HTMLElement,
  kind: Kind,
  at: gsap.Position,
): SplitText | null {
  if (kind === "text") {
    // Split by words and lines; each line sits in an overflow-clipped mask
    // and rises into it
    const split = SplitText.create(el, {
      type: "words,lines",
      linesClass: "line",
      mask: "lines",
    });
    tl.from(
      split.lines,
      { yPercent: 100, opacity: 0, stagger: 0.1, duration: 0.6, ease: "expo.out" },
      at,
    );
    return split;
  }

  // Blocks and images use fromTo with explicit end values, so they always
  // land in the right place whatever styles the element currently has

  if (Object.hasOwn(SLIDES, kind)) {
    tl.fromTo(
      el,
      { ...SLIDES[kind as Slide], opacity: 0 },
      { x: 0, y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      at,
    );
    return null;
  }

  // Clip reveal. The photo inside (or the element itself, if it's the img)
  // eases out of a zoom at the same time.
  tl.fromTo(
    el,
    { clipPath: CLIPS[kind as Clip] },
    { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power3.inOut" },
    at,
  );
  const img = el instanceof HTMLImageElement ? el : el.querySelector("img");
  if (img) {
    tl.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.6, ease: "power3.out" }, "<");
  }
  return null;
}

function kindOf(el: HTMLElement): Kind {
  const value = el.dataset.reveal ?? "";
  if (Object.hasOwn(SLIDES, value) || Object.hasOwn(CLIPS, value)) {
    return value as Kind;
  }
  return "text";
}

// Builds and plays one group. Returns a cleanup function.
function revealGroup(group: HTMLElement) {
  const entrance = group.dataset.revealGroup === "entrance";
  let tl: gsap.core.Timeline | null = null;
  let splits: SplitText[] = [];
  let done = false;

  // revert(), not kill(): kill() leaves the from() start values (opacity 0,
  // offsets, clips) inline, and a rebuild would then animate from them to
  // themselves, so nothing would move
  const teardown = () => {
    tl?.scrollTrigger?.kill();
    tl?.revert();
    tl = null;
    splits.forEach((s) => s.revert());
    splits = [];
  };

  const build = () => {
    teardown();
    const items = group.querySelectorAll<HTMLElement>("[data-reveal]");

    tl = gsap.timeline({
      delay: entrance ? Number(group.dataset.revealDelay) || 0 : 0,
      scrollTrigger: entrance
        ? undefined
        : { trigger: group, start: "top 80%", once: true },
      onComplete() {
        done = true;
        // Put text back to normal and drop inline styles, so everything
        // reflows and hovers naturally from now on
        splits.forEach((s) => s.revert());
        splits = [];
        items.forEach((el) => {
          gsap.set([el, ...el.querySelectorAll("img")], {
            clearProps: "transform,opacity,clipPath",
          });
        });
      },
    });

    let prev: Kind | null = null;
    items.forEach((el) => {
      const kind = kindOf(el);
      const at = el.dataset.revealAt ?? position(prev, kind);
      // Hidden in CSS until now, so nothing flashes in unanimated
      gsap.set(el, { visibility: "visible" });
      const split = addToTimeline(tl!, el, kind, at);
      if (split) splits.push(split);
      prev = kind;
    });
  };

  // Line breaks depend on the fonts and the width, so split once fonts are
  // ready, and re-split if the width changes before the group has played
  let alive = true;
  let width = window.innerWidth;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const onResize = () => {
    if (done || entrance || window.innerWidth === width) return;
    width = window.innerWidth;
    clearTimeout(timer);
    timer = setTimeout(build, 200);
  };

  document.fonts.ready.then(() => {
    if (alive) build();
  });
  window.addEventListener("resize", onResize);

  return () => {
    alive = false;
    clearTimeout(timer);
    window.removeEventListener("resize", onResize);
    teardown();
  };
}

// Mount once on the page; renders nothing.
export default function Reveal() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cleanups = gsap.utils
        .toArray<HTMLElement>("[data-reveal-group]")
        .map(revealGroup);
      return () => cleanups.forEach((cleanup) => cleanup());
    });

    // Explicitly tear everything down on unmount (Strict Mode and hot reload
    // remount this), so stale groups never keep building in the background
    return () => mm.revert();
  });

  return null;
}
