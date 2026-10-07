"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { preloaderDone } from "@/lib/preloader";

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
//
// Small screens, where the columns stack, play it differently:
//   - a scrolled group is too tall to play all at once, so each child waits
//     until it is itself scrolled into view; children that arrive together
//     still play as one sequence
//   - sideways slides and wipes ("left", "right", "clip-left", "clip-right")
//     come up from below instead: there's no neighbouring column to come in
//     from, and a sideways offset would make the page scroll sideways
//   - blocks travel less and text lines follow each other faster

type Slide = "up" | "down" | "left" | "right";
type Clip = "clip-up" | "clip-down" | "clip-left" | "clip-right";
type Kind = "text" | Slide | Clip;

// Below the width where the two-column sections stack (see globals.css)
const isStacked = () => window.matchMedia("(max-width: 959px)").matches;

const SLIDES: Record<Slide, gsap.TweenVars> = {
  up: { y: 60 },
  down: { y: -40 },
  left: { x: -80 },
  right: { x: 80 },
};

// What the sideways animations become once the columns stack
const STACKED_KINDS: Partial<Record<Kind, Kind>> = {
  left: "up",
  right: "up",
  "clip-left": "clip-up",
  "clip-right": "clip-up",
};

// Shorter travel on a small screen
const STACKED_UP: gsap.TweenVars = { y: 40 };

const LINE_DURATION = 0.6;
// Delay between text lines. Tighter when stacked: narrow columns wrap into
// many more lines.
const lineStagger = (stacked: boolean) => (stacked ? 0.06 : 0.1);

// Starting clip for each wipe, named by the side it comes in from
const CLIPS: Record<Clip, string> = {
  "clip-up": "inset(100% 0% 0% 0%)",
  "clip-down": "inset(0% 0% 100% 0%)",
  "clip-left": "inset(0% 100% 0% 0%)",
  "clip-right": "inset(0% 0% 0% 100%)",
};

// Where each item starts relative to the previous one, so a group plays as
// one sequence: heading → text → blocks and images.
function position(prev: Kind | null, kind: Kind, stacked: boolean): gsap.Position {
  if (prev === null) return 0;
  // Heading into paragraph, or paragraph into paragraph: the next element's
  // first line follows the previous last line at the same rhythm as the
  // lines themselves, so the text reads as one continuous flow
  if (prev === "text" && kind === "text") {
    return `-=${LINE_DURATION - lineStagger(stacked)}`;
  }
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
  stacked: boolean,
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
      {
        yPercent: 100,
        opacity: 0,
        stagger: lineStagger(stacked),
        duration: LINE_DURATION,
        ease: "expo.out",
      },
      at,
    );
    return split;
  }

  // Blocks and images use fromTo with explicit end values, so they always
  // land in the right place whatever styles the element currently has

  if (Object.hasOwn(SLIDES, kind)) {
    tl.fromTo(
      el,
      { ...(stacked && kind === "up" ? STACKED_UP : SLIDES[kind as Slide]), opacity: 0 },
      { x: 0, y: 0, opacity: 1, duration: stacked ? 0.8 : 1, ease: "power3.out" },
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

function kindOf(el: HTMLElement, stacked: boolean): Kind {
  const value = el.dataset.reveal ?? "";
  if (Object.hasOwn(SLIDES, value) || Object.hasOwn(CLIPS, value)) {
    const kind = value as Kind;
    return (stacked && STACKED_KINDS[kind]) || kind;
  }
  return "text";
}

// Adds each item to the timeline in DOM order. Returns the text splits made.
function addItems(tl: gsap.core.Timeline, items: HTMLElement[]): SplitText[] {
  const stacked = isStacked();
  const splits: SplitText[] = [];
  let prev: Kind | null = null;
  items.forEach((el) => {
    const kind = kindOf(el, stacked);
    // data-reveal-at is relative to what plays before it, so it means nothing
    // on an item that opens the timeline (as it can when stacked)
    const at =
      (prev !== null && el.dataset.revealAt) || position(prev, kind, stacked);
    // Hidden in CSS until now, so nothing flashes in unanimated
    gsap.set(el, { visibility: "visible" });
    const split = addToTimeline(tl, el, kind, at, stacked);
    if (split) splits.push(split);
    prev = kind;
  });
  return splits;
}

// Puts text back to normal and drops inline styles, so everything reflows
// and hovers naturally once its animation has finished
function settle(items: HTMLElement[], splits: SplitText[]) {
  splits.forEach((s) => s.revert());
  items.forEach((el) => {
    gsap.set([el, ...el.querySelectorAll("img")], {
      clearProps: "transform,opacity,clipPath",
    });
  });
}

// Plays the [data-reveal] items inside root straight away, the same way a
// group would. For content swapped in after its group has already played
// (e.g. a newly opened tab).
export function playReveal(root: HTMLElement): gsap.core.Timeline {
  // Anything still hidden hasn't been scrolled to yet (stacked layout), and
  // will play when it is
  const items = Array.from(
    root.querySelectorAll<HTMLElement>("[data-reveal]"),
  ).filter((el) => getComputedStyle(el).visibility !== "hidden");
  let splits: SplitText[] = [];
  const tl = gsap.timeline({ onComplete: () => settle(items, splits) });
  splits = addItems(tl, items);
  return tl;
}

// Builds and plays one group. Returns a cleanup function.
function revealGroup(group: HTMLElement) {
  const entrance = group.dataset.revealGroup === "entrance";
  let tl: gsap.core.Timeline | null = null;
  let splits: SplitText[] = [];
  let done = false;

  // Stacked layout only: the triggers still waiting for their item, the items
  // that have already played, and the timelines (with their text splits)
  // still playing
  let waiting: ScrollTrigger[] = [];
  const played = new Set<HTMLElement>();
  const playing = new Map<gsap.core.Timeline, SplitText[]>();

  // revert(), not kill(): kill() leaves the from() start values (opacity 0,
  // offsets, clips) inline, and a rebuild would then animate from them to
  // themselves, so nothing would move
  const teardown = () => {
    tl?.scrollTrigger?.kill();
    tl?.revert();
    tl = null;
    splits.forEach((s) => s.revert());
    splits = [];
    waiting.forEach((trigger) => trigger.kill());
    waiting = [];
  };

  // Plays the items that have just been scrolled into view as one sequence
  const playBatch = (items: HTMLElement[], entered: Element[]) => {
    // In DOM order, whatever order the triggers fired in
    const batch = items.filter((el) => entered.includes(el) && !played.has(el));
    if (!batch.length) return;
    batch.forEach((el) => played.add(el));
    done = played.size === items.length;

    const batchTl = gsap.timeline({
      onComplete() {
        settle(batch, playing.get(batchTl) ?? []);
        playing.delete(batchTl);
      },
    });
    playing.set(batchTl, addItems(batchTl, batch));
  };

  const build = () => {
    teardown();
    const items = Array.from(
      group.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    // Stacked: every item waits for its own turn on screen. Text is split as
    // it plays, so nothing here depends on the width.
    if (!entrance && isStacked()) {
      waiting = ScrollTrigger.batch(
        items.filter((el) => !played.has(el)),
        {
          start: "top 90%",
          once: true,
          onEnter: (entered) => playBatch(items, entered),
        },
      );
      return;
    }

    tl = gsap.timeline({
      delay: entrance ? Number(group.dataset.revealDelay) || 0 : 0,
      scrollTrigger: entrance
        ? undefined
        : { trigger: group, start: "top 80%", once: true },
      onComplete() {
        done = true;
        settle(items, splits);
        splits = [];
      },
    });

    // Leaves out anything that already played while the layout was stacked
    splits = addItems(
      tl,
      items.filter((el) => !played.has(el)),
    );
  };

  // Line breaks depend on the fonts and the width, so split once fonts are
  // ready, and re-split if the width changes before the group has played.
  // That also switches between the stacked and side-by-side behaviour.
  let alive = true;
  let width = window.innerWidth;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const onResize = () => {
    if (done || entrance || window.innerWidth === width) return;
    width = window.innerWidth;
    clearTimeout(timer);
    timer = setTimeout(build, 200);
  };

  // Also wait for the preloader, so nothing plays hidden behind it; entrance
  // groups then start as its panel lifts
  Promise.all([document.fonts.ready, preloaderDone]).then(() => {
    if (alive) build();
  });
  window.addEventListener("resize", onResize);

  return () => {
    alive = false;
    clearTimeout(timer);
    window.removeEventListener("resize", onResize);
    teardown();
    playing.forEach((batchSplits, batchTl) => {
      batchTl.revert();
      batchSplits.forEach((s) => s.revert());
    });
    playing.clear();
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
