"use client";

// ============================================================================
// CHANGED (full rewrite of behavior — visual design / text / citation UNCHANGED)
//
// 1. Typewriter now REPLAYS every time the section enters the viewport, and
//    fully RESETS when it leaves (text cleared, opacity 0, pending timers
//    cancelled). IntersectionObserver: threshold 0.05, rootMargin
//    "0px 0px -150px 0px", observer stays active (no disconnect/unobserve).
// 2. The first element (JIMMY label) starts within ~30ms of the trigger —
//    no startup setTimeout/delay before the sequence begins.
// 3. The old synthesized Web-Audio typewriter tick is NOT here (never shipped
//    a tick in the live build; this rewrite uses the real show clip instead).
// 4. Audio = real Kim Wexler clip, plays ON HOVER (mouseenter), pauses on
//    mouseleave, restarts from 0 on re-enter. Mobile: tap to play once.
// 5. "▶ HOVER TO HEAR" badge + dotted underline + cursor:help signal that
//    the section is interactive. Badge fades out while hovered.
// 6. Sad hover state: background darkens, block scales to 1.02, "always"
//    brightens + glows, vignette deepens, slow breath loop — all slow/somber.
// 7. Mute toggle (speaker icon) persists in localStorage "kim-audio-enabled".
// 8. prefers-reduced-motion: instant full text, no typewriter, no replay,
//    no scale/breath/vignette. "always" colour shift + audio still work.
//
// AUDIO FILE — place your trimmed clip here:
//   path on disk:   public/audio/kim-always-down.mp3
//   referenced as:  /audio/kim-always-down.mp3   (see <audio src> below)
// ============================================================================

import { useCallback, useEffect, useRef, useState } from "react";

const JIMMY_LINE = "Kick a man when he's down.";
const KIM_PREFIX = "Jimmy… you are ";
const KIM_ALWAYS = "always";
const KIM_SUFFIX = " down.";
const KIM_TOTAL = KIM_PREFIX.length + KIM_ALWAYS.length + KIM_SUFFIX.length;

const AUDIO_LS_KEY = "kim-audio-enabled";

export function OutroJimmy() {
  const ref = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Pending timer/interval ids — tracked so we can cancel on viewport exit.
  const timersRef = useRef<number[]>([]);

  const [jimmyLabelVisible, setJimmyLabelVisible] = useState(false);
  const [kimLabelVisible, setKimLabelVisible] = useState(false);
  const [jimmyTyped, setJimmyTyped] = useState(0);
  const [kimTyped, setKimTyped] = useState(0);
  const [pulseAlways, setPulseAlways] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [captionVisible, setCaptionVisible] = useState(false);

  const [hovered, setHovered] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isTouch, setIsTouch] = useState(false);
  const [reduce, setReduce] = useState(false);

  // ---- helpers ------------------------------------------------------------

  const cancelAll = useCallback(() => {
    timersRef.current.forEach((id) => {
      clearTimeout(id);
      clearInterval(id);
    });
    timersRef.current = [];
  }, []);

  const resetState = useCallback(() => {
    setJimmyLabelVisible(false);
    setKimLabelVisible(false);
    setJimmyTyped(0);
    setKimTyped(0);
    setPulseAlways(false);
    setShowCursor(false);
    setCaptionVisible(false);
  }, []);

  const push = (id: ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>) => {
    timersRef.current.push(id as unknown as number);
    return id;
  };

  // ---- mount: read prefs, detect touch / reduced-motion -------------------

  useEffect(() => {
    setReduce(
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    );
    setIsTouch(window.matchMedia?.("(hover: none)").matches ?? false);
    try {
      const stored = window.localStorage.getItem(AUDIO_LS_KEY);
      if (stored !== null) setAudioEnabled(stored === "true");
    } catch {
      /* localStorage unavailable — keep default true */
    }
  }, []);

  // ---- the typewriter sequence -------------------------------------------

  const runSequence = useCallback(() => {
    // Step 1 (~0ms): JIMMY label fades in immediately. No startup delay.
    setJimmyLabelVisible(true);

    // Step 2 (300ms): Jimmy line types @ 50ms/char.
    push(
      setTimeout(() => {
        let i = 0;
        const iv = setInterval(() => {
          i += 1;
          setJimmyTyped(i);
          if (i >= JIMMY_LINE.length) clearInterval(iv);
        }, 50);
        push(iv);
      }, 300)
    );

    const jimmyDoneAt = 300 + JIMMY_LINE.length * 50;

    // 3.5s of silence between the two lines — this single beat is what the
    // audio clip waits between "Kick a man when he's down." and Kim's reply,
    // so the second line types exactly when she speaks. No other pause is
    // inserted between the two lines.
    const KIM_GAP_MS = 3500;
    const kimStartAt = jimmyDoneAt + KIM_GAP_MS;
    const kimLabelAt = kimStartAt - 300; // KIM label fades in just before the text
    push(setTimeout(() => setKimLabelVisible(true), kimLabelAt));
    push(
      setTimeout(() => {
        let i = 0;
        const prefixLen = KIM_PREFIX.length;
        const alwaysLen = KIM_ALWAYS.length;
        const tick = () => {
          i += 1;
          setKimTyped(i);
          if (i >= KIM_TOTAL) return;
          // 60ms normally, 130ms across the word "always"
          const next =
            i < prefixLen ? 60 : i < prefixLen + alwaysLen ? 130 : 60;
          if (i === prefixLen + alwaysLen) {
            setPulseAlways(true);
            push(setTimeout(() => setPulseAlways(false), 600));
          }
          push(setTimeout(tick, next));
        };
        push(setTimeout(tick, 60));
      }, kimStartAt)
    );

    const kimDurMs =
      KIM_PREFIX.length * 60 + KIM_ALWAYS.length * 130 + KIM_SUFFIX.length * 60;
    const kimDoneAt = kimStartAt + kimDurMs;

    // Step 6: blinking cursor ~2s, then fades.
    push(setTimeout(() => setShowCursor(true), kimDoneAt + 150));
    push(setTimeout(() => setShowCursor(false), kimDoneAt + 2150));
    // Step 7: faint citation.
    push(setTimeout(() => setCaptionVisible(true), kimDoneAt + 2350));
  }, []);

  // CHANGED: the dialogue no longer plays on scroll. It is now HOVER-DRIVEN —
  // the typewriter + audio start when the cursor enters the section (or on tap
  // on touch devices), and fully reset when the cursor leaves. On unmount we
  // just clear any pending timers.
  useEffect(() => {
    return () => cancelAll();
  }, [cancelAll]);

  // Show the full text immediately when the section comes near, but ONLY for
  // reduced-motion users (they get no typewriter and shouldn't need to hover
  // to read it). Everyone else sees the resting "hover to play" state.
  useEffect(() => {
    if (!reduce) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setJimmyLabelVisible(true);
            setKimLabelVisible(true);
            setJimmyTyped(JIMMY_LINE.length);
            setKimTyped(KIM_TOTAL);
            setCaptionVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  // ---- audio --------------------------------------------------------------

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.75;
  }, []);

  const playClip = useCallback(() => {
    const a = audioRef.current;
    if (!a || !audioEnabled) return;
    try {
      a.currentTime = 0;
      a.play().catch(() => {
        /* autoplay blocked — silently ignore */
      });
    } catch {
      /* ignore */
    }
  }, [audioEnabled]);

  const stopClip = useCallback(() => {
    const a = audioRef.current;
    if (a) a.pause();
  }, []);

  // CHANGED: hover now drives the WHOLE thing — typewriter sequence + audio.
  const onEnter = () => {
    if (isTouch) return; // touch handled by onTap
    setHovered(true);
    if (!reduce) {
      cancelAll();
      resetState();
      runSequence();
    }
    playClip();
  };
  const onLeave = () => {
    if (isTouch) return;
    setHovered(false);
    cancelAll();
    if (!reduce) resetState(); // fully reset so the next hover replays fresh
    stopClip();
  };
  const onTap = () => {
    // Mobile: tap plays the sequence + audio once (no hover-out reset).
    if (!isTouch) return;
    setHovered(true);
    if (!reduce) {
      cancelAll();
      resetState();
      runSequence();
    }
    playClip();
  };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAudioEnabled((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(AUDIO_LS_KEY, String(next));
      } catch {
        /* ignore */
      }
      if (!next) stopClip();
      return next;
    });
  };

  // ---- derived typed slices ----------------------------------------------

  const kimPrefixShown = KIM_PREFIX.slice(0, Math.min(kimTyped, KIM_PREFIX.length));
  const kimAlwaysShown = KIM_ALWAYS.slice(
    0,
    Math.max(0, Math.min(kimTyped - KIM_PREFIX.length, KIM_ALWAYS.length))
  );
  const kimSuffixShown = KIM_SUFFIX.slice(
    0,
    Math.max(0, kimTyped - KIM_PREFIX.length - KIM_ALWAYS.length)
  );
  const kimDone = kimTyped >= KIM_TOTAL;

  // sad-state visual flags (motion-y bits gated by !reduce)
  const motionHover = hovered && !reduce;

  return (
    <section
      ref={ref}
      aria-label="Hover to hear Kim Wexler quote from Better Call Saul"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onTap}
      className="relative py-32 md:py-44 overflow-hidden cursor-help"
      style={{
        background: hovered ? "#000000" : "#050505",
        transition: "background 600ms cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {/* hidden audio element — clip is public/audio/kim-always-down.m4a */}
      <audio ref={audioRef} src="/audio/kim-always-down.m4a" preload="auto" />

      {/* ADDED: prominent resting-state SIGN. Big, clearly visible, somber.
          Fades out the moment the cursor enters (the scene takes over).
          pointer-events-none so it never blocks the section's hover. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6 text-center"
        style={{
          opacity: hovered || reduce ? 0 : 1,
          transition: "opacity 450ms ease-out",
        }}
      >
        <div className="outro-badge-pulse flex flex-col items-center gap-4">
          <span
            className="flex items-center justify-center rounded-full"
            style={{
              width: 64,
              height: 64,
              border: "2px solid rgba(245,230,211,0.55)",
              color: "rgba(245,230,211,0.9)",
              fontSize: 24,
              paddingLeft: 4,
              boxShadow: "0 0 24px rgba(245,230,211,0.12)",
            }}
          >
            ▶
          </span>
          <span
            className="uppercase"
            style={{
              color: "rgba(245,230,211,0.85)",
              letterSpacing: "0.4em",
              fontSize: 15,
            }}
          >
            {isTouch ? "Tap to play the scene" : "Hover to play the scene"}
          </span>
          <span
            style={{
              color: "rgba(180,180,180,0.55)",
              letterSpacing: "0.25em",
              fontSize: 11,
              textTransform: "uppercase",
            }}
          >
            Sound on · Better Call Saul
          </span>
        </div>
      </div>

      {/* top fade */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(245,230,211,0.06) 0%, transparent 100%)",
        }}
      />
      {/* vignette — deepens on hover (motion-gated) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
          opacity: motionHover ? 1 : 0.55,
          transition: "opacity 700ms cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      <div
        className="relative max-w-2xl mx-auto px-6 outro-drift"
        style={{
          transform: motionHover ? "scale(1.02)" : "scale(1)",
          transition: "transform 800ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className={`space-y-10 ${motionHover ? "outro-breath" : "outro-flicker"}`}>
          {/* JIMMY */}
          <div>
            <div
              className="outro-quiet text-sm tracking-[0.35em] uppercase transition-opacity duration-300 ease-out"
              style={{ opacity: jimmyLabelVisible ? 0.6 : 0, color: "rgba(180,180,180,0.85)" }}
            >
              Jimmy
            </div>
            <p
              className="outro-quiet mt-3 text-2xl md:text-3xl leading-relaxed"
              style={{ minHeight: "1.6em" }}
            >
              {jimmyTyped > 0 && (
                <>
                  &ldquo;{JIMMY_LINE.slice(0, jimmyTyped)}
                  {jimmyTyped < JIMMY_LINE.length && (
                    <span aria-hidden="true" className="outro-cursor">|</span>
                  )}
                  {jimmyTyped >= JIMMY_LINE.length && <>&rdquo;</>}
                </>
              )}
            </p>
          </div>

          {/* KIM */}
          <div>
            <div
              className="outro-quiet text-sm tracking-[0.35em] uppercase transition-opacity duration-[400ms] ease-out"
              style={{ opacity: kimLabelVisible ? 0.6 : 0, color: "rgba(180,180,180,0.85)" }}
            >
              Kim
            </div>
            <p
              className="outro-quiet mt-3 text-2xl md:text-3xl leading-relaxed inline-block"
              style={{
                minHeight: "1.6em",
                // dotted underline = classic "more here" affordance
                textDecoration: "underline dotted",
                textDecorationColor: "rgba(150,150,150,0.3)",
                textUnderlineOffset: "8px",
              }}
            >
              {kimTyped > 0 && (
                <>
                  &ldquo;
                  {kimPrefixShown}
                  <em
                    className={`outro-always ${pulseAlways ? "outro-always--pulse" : ""}`}
                    style={{
                      // "always" lands harder on hover: brighter cream + glow.
                      // Kept even under reduced-motion (it's colour, not motion).
                      color:
                        hovered && kimAlwaysShown.length > 0
                          ? "#f5f0e0"
                          : kimAlwaysShown.length > 0
                            ? "rgba(245,230,211,0.98)"
                            : "inherit",
                      textShadow:
                        hovered && kimAlwaysShown.length > 0
                          ? "0 0 12px rgba(245,240,224,0.3)"
                          : "none",
                      transition:
                        "color 1000ms ease-in-out, text-shadow 1000ms ease-in-out",
                    }}
                  >
                    {kimAlwaysShown}
                  </em>
                  <em>{kimSuffixShown}</em>
                  {!kimDone && (
                    <span aria-hidden="true" className="outro-cursor">|</span>
                  )}
                  {kimDone && showCursor && (
                    <span aria-hidden="true" className="outro-cursor">|</span>
                  )}
                  {kimDone && !showCursor && <>&rdquo;</>}
                </>
              )}
            </p>

          </div>
        </div>

        <p
          className="outro-quiet text-center mt-16 text-xs tracking-widest uppercase transition-opacity duration-[1500ms] ease-out"
          style={{ opacity: captionVisible ? 0.55 : 0 }}
        >
          — Better Call Saul, S4E9 "Wiedersehen"
        </p>
      </div>

      {/* mute toggle — somber, keyboard-accessible */}
      <button
        type="button"
        onClick={toggleAudio}
        aria-label={audioEnabled ? "Mute Kim audio" : "Unmute Kim audio"}
        title={audioEnabled ? "Mute Kim audio" : "Unmute Kim audio"}
        className="absolute top-5 right-5 w-6 h-6 flex items-center justify-center text-base leading-none rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-500"
        style={{ color: "rgba(140,140,140,0.7)", background: "transparent" }}
      >
        {audioEnabled ? "🔊" : "🔇"}
      </button>
    </section>
  );
}
