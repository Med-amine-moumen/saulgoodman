"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TITLE_TOP = "BETTER";
const TITLE_MID = "CALL";
const TITLE_BOT = "SAUL!";

const SKIPPED_KEY = "saul-intro-skipped";

export function IntroSequence() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [skippable, setSkippable] = useState(false);

  useEffect(() => {
    // Returning visitors get the express lane.
    const alreadySaw = typeof window !== "undefined" && sessionStorage.getItem(SKIPPED_KEY);
    setSkippable(true);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "back.out(2)" },
        onComplete: () => finalize(),
      });
      tlRef.current = tl;

      gsap.set(".intro-letter", { yPercent: 120, opacity: 0, rotate: () => gsap.utils.random(-25, 25) });
      gsap.set(".intro-starburst", { scale: 0, rotate: -45, opacity: 0 });
      gsap.set(".intro-phone", { opacity: 0, scale: 0.6 });
      gsap.set(".intro-subline", { opacity: 0, y: 30 });
      gsap.set("#site-header", { opacity: 0, y: -40 });
      gsap.set(".intro-flag", { scaleX: 0, transformOrigin: "left" });

      // 0.0–0.4s — starbursts burst in behind
      tl.to(".intro-starburst", {
        scale: 1,
        rotate: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.35,
      });

      // 0.4–1.6s — letters snap in one by one (BETTER -> CALL -> SAUL!)
      tl.to(".intro-letter", {
        yPercent: 0,
        opacity: 1,
        rotate: 0,
        stagger: { each: 0.06, from: "start" },
        duration: 0.4,
      }, 0.25);

      // 1.6–1.9s — flag stripes wipe across underneath
      tl.to(".intro-flag", { scaleX: 1, duration: 0.45, ease: "power3.out" }, 1.4);

      // 1.7–2.1s — phone number flashes in
      tl.fromTo(
        ".intro-phone",
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(3)" },
        1.6
      );
      tl.to(".intro-phone", { opacity: 0.4, repeat: 3, yoyo: true, duration: 0.12 }, ">");

      // 2.1–2.4s — subline reveals
      tl.to(".intro-subline", { opacity: 1, y: 0, duration: 0.4 }, 2.0);

      // 2.5–3.0s — condense to header
      tl.to(rootRef.current, {
        scale: 0.85,
        opacity: 0,
        y: -40,
        duration: 0.5,
        ease: "power3.in",
      }, 2.55);
      tl.to("#site-header", { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, "-=0.25");
      tl.set(rootRef.current, { display: "none" });

      // Returning-visitor express lane: jump to the end.
      if (alreadySaw) {
        tl.progress(1);
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const finalize = () => {
    if (typeof window !== "undefined") sessionStorage.setItem(SKIPPED_KEY, "1");
    document.body.style.overflow = "";
    // The intro was a fixed full-screen overlay that locked scroll and shifted
    // layout. Every ScrollTrigger created behind it cached stale start/end
    // positions, so play-once "gsap.from" sections (portrait, credentials,
    // services, cases…) stayed at opacity:0 until a SECOND scroll forced a
    // recalc. Now that the page is scrollable and laid out, refresh them all
    // so above-the-fold triggers fire immediately.
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  const skip = () => {
    tlRef.current?.progress(1);
    // progress(1) seeks the timeline and does NOT fire its onComplete, so run
    // the same cleanup (scroll unlock + ScrollTrigger refresh) explicitly.
    finalize();
  };

  // Lock scroll only while intro plays.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const unlock = () => {
      document.body.style.overflow = "";
      ScrollTrigger.refresh();
    };
    const t = setTimeout(unlock, 3200);
    return () => {
      clearTimeout(t);
      unlock();
    };
  }, []);

  // Fonts load async (next/font); a swap after the refresh above would shift
  // text layout and re-stale the trigger positions. Refresh again once the
  // real fonts are in.
  useEffect(() => {
    if (typeof document === "undefined" || !document.fonts) return;
    let active = true;
    document.fonts.ready
      .then(() => {
        if (active) ScrollTrigger.refresh();
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return (
    <div
      ref={rootRef}
      id="intro-sequence"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-saul-cream halftone-overlay"
      aria-label="Saul Goodman intro animation"
    >
      {/* Starbursts decorating the corners */}
      <div className="intro-starburst starburst" style={{ top: "12%", left: "8%" }} />
      <div className="intro-starburst starburst" style={{ top: "10%", right: "10%", width: "10rem", height: "10rem" }} />
      <div className="intro-starburst starburst" style={{ bottom: "12%", left: "12%", width: "8rem", height: "8rem" }} />
      <div className="intro-starburst starburst" style={{ bottom: "10%", right: "8%" }} />

      {/* Title card */}
      <div className="relative text-center px-6 max-w-5xl">
        <div className="intro-flag h-3 mb-6 flag-stripes border-y-2 border-saul-ink" />

        <h1 className="leading-[0.85] font-[family-name:var(--font-display)] uppercase">
          <TitleLine line={TITLE_TOP} color="text-saul-ink" size="text-6xl md:text-9xl" />
          <TitleLine line={TITLE_MID} color="text-saul-red text-shadow-pop" size="text-7xl md:text-[11rem]" />
          <TitleLine line={TITLE_BOT} color="text-saul-ink text-shadow-pop-red" size="text-8xl md:text-[13rem]" />
        </h1>

        <div className="intro-flag h-3 mt-6 flag-stripes border-y-2 border-saul-ink" />

        <p className="intro-subline mt-6 font-[family-name:var(--font-headline)] tracking-[0.3em] uppercase text-saul-ink/80 text-lg md:text-2xl">
          Attorney at Law &nbsp;•&nbsp; Albuquerque, NM
        </p>

        <div className="intro-phone mt-4">
          <span className="inline-block bg-saul-yellow border-4 border-saul-ink px-6 py-2 font-[family-name:var(--font-display)] text-3xl md:text-5xl tracking-wider shadow-[6px_6px_0_#0E0E0E]">
            ☎ 1-505-503-4455
          </span>
        </div>
      </div>

      {skippable && (
        <button
          type="button"
          onClick={skip}
          className="absolute top-4 right-4 text-xs md:text-sm font-[family-name:var(--font-headline)] uppercase tracking-wider bg-saul-ink text-saul-cream px-3 py-1 border-2 border-saul-ink hover:bg-saul-red transition-colors"
        >
          Skip Intro »
        </button>
      )}

      {/* TODO: audio toggle — sting / horn when intro fires
      <button id="audio-toggle">🔊</button>
      */}
    </div>
  );
}

function TitleLine({ line, color, size }: { line: string; color: string; size: string }) {
  return (
    <div className={`${color} ${size} overflow-hidden`}>
      {line.split("").map((ch, i) => (
        <span key={i} className="intro-letter inline-block">
          {ch === " " ? " " : ch}
        </span>
      ))}
    </div>
  );
}
