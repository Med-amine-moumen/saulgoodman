"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ADDED: in-character SVG illustration replaces the photo placeholder
import { LawyerSilhouette, CinnabonRoll } from "@/components/Illustrations";

const CATCHPHRASES = [
  "Better Call Saul!",
  "It's all good, man!",
  "Did you know that you have rights? The Constitution says you do, and so do I.",
  "I'll bend the law until it breaks!",
  "When the going gets tough, you don't want a criminal lawyer. You want a *criminal* lawyer.",
  "S'all good, man.",
];

// CHANGED: credentials lean into the show's actual bits (Samoa, mug, "se habla español")
const CREDENTIALS = [
  "World's 2nd Greatest Lawyer (Mug Available in Gift Shop)",
  "Juris Doctor, University of American Samoa (Go Land Crabs!)",
  "Constitutional Scholar — Replica Hanging in My Office",
  "¡Se Habla Español! Spanish-Speaking Lawyer Available!",
  "Member, New Mexico Bar Association (Look It Up!)",
  "Voted Most Likely To Get You Off (By Me, Myself, & I)",
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function MeetYourLawyer() {
  const ref = useRef<HTMLElement>(null);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const phraseRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Portrait flies in
      gsap.from(".portrait-frame", {
        // CHANGED: trigger earlier + play-once-stay-visible (no reset → can't get stuck hidden)
        scrollTrigger: { trigger: ref.current, start: "top 90%", toggleActions: "play none none none" },
        x: -120,
        rotate: -8,
        opacity: 0,
        duration: 0.9,
        ease: "back.out(1.8)",
      });
      // Credentials stagger
      gsap.from(".credential-item", {
        // CHANGED: this is the one that was leaving the credentials list BLANK.
        // The "reset" action snapped the items back to opacity:0 after a
        // mis-cached trigger position. play-once-stay-visible fixes it.
        scrollTrigger: { trigger: ".credentials-list", start: "top 92%", toggleActions: "play none none none" },
        x: 60,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  // Catchphrase rotator
  useEffect(() => {
    const t = setInterval(() => {
      const el = phraseRef.current;
      if (!el) {
        setPhraseIdx((i) => (i + 1) % CATCHPHRASES.length);
        return;
      }
      gsap.to(el, {
        opacity: 0,
        y: -10,
        duration: 0.25,
        onComplete: () => {
          setPhraseIdx((i) => (i + 1) % CATCHPHRASES.length);
          gsap.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
        },
      });
    }, 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      ref={ref}
      id="lawyer"
      className="relative py-24 md:py-32 bg-saul-newspaper paper-grain border-y-4 border-saul-ink"
    >
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* CHANGED: photo placeholder swapped for an in-character SVG silhouette so the site
            is self-contained and copyright-safe (no Bob Odenkirk likeness). */}
        <div className="portrait-frame relative">
          <div className="relative aspect-square bg-saul-yellow border-[10px] border-saul-ink shadow-[16px_16px_0_#C8102E] overflow-hidden">
            {/* Vintage TV scanlines */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  "repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0 2px, transparent 2px 4px)",
              }}
            />
            <LawyerSilhouette className="absolute inset-0 w-full h-full p-6" aria-label="Stylized portrait of Saul Goodman" />
            {/* "ON AIR" sticker */}
            <div className="absolute top-3 left-3 z-20 bg-saul-red text-saul-cream px-2 py-1 text-xs font-[family-name:var(--font-headline)] tracking-widest border-2 border-saul-ink">
              ● ON AIR
            </div>
            {/* CHANNEL stamp */}
            <div className="absolute bottom-3 right-3 z-20 bg-saul-ink text-saul-yellow px-2 py-1 text-xs font-[family-name:var(--font-headline)] tracking-widest">
              CH. 14
            </div>
            {/* nameplate */}
            <div className="absolute bottom-3 left-3 z-20 bg-saul-cream border-2 border-saul-ink px-2 py-1 text-xs font-[family-name:var(--font-headline)] tracking-widest">
              SAUL GOODMAN, ESQ.
            </div>
          </div>
          <p className="fine-print mt-2 text-center">
            *Illustration is a stylized likeness, not the actor. Actor portrayal. Hairline not guaranteed.
          </p>
        </div>

        {/* === CREDENTIALS + ROTATOR === */}
        <div>
          <p className="font-[family-name:var(--font-headline)] uppercase tracking-[0.3em] text-saul-red mb-2">
            Meet Your Lawyer
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl uppercase leading-none">
            Saul <span className="text-saul-red">Goodman</span>
          </h2>

          <div className="mt-6 min-h-[5rem] bg-saul-ink text-saul-yellow border-4 border-saul-ink p-4 font-[family-name:var(--font-serif-fine)] text-lg md:text-xl">
            <span className="text-saul-red text-2xl mr-2">“</span>
            <span ref={phraseRef} className="italic">
              {CATCHPHRASES[phraseIdx]}
            </span>
            <span className="text-saul-red text-2xl ml-2">”</span>
          </div>

          <h3 className="mt-8 font-[family-name:var(--font-headline)] uppercase tracking-wider text-2xl">
            Credentials, Awards & Self-Awarded Honors:
          </h3>
          <ul className="credentials-list mt-3 space-y-2">
            {CREDENTIALS.map((c) => (
              <li
                key={c}
                className="credential-item flex items-start gap-2 font-[family-name:var(--font-body)] text-base md:text-lg"
              >
                <span className="text-saul-red font-bold mt-1">★</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>

          <p className="fine-print mt-4">
            None of the above constitutes a verifiable credential. None whatsoever. Move along.
          </p>

          {/* ADDED: real bio block — keeps the joke credentials above, adds the show's biographical
              details (American Samoa JD, HHM, Chuck) plus the Gene Takavic Easter egg in fine print. */}
          <div className="mt-8 border-t-4 border-double border-saul-ink pt-5">
            <h3 className="font-[family-name:var(--font-headline)] uppercase tracking-wider text-xl text-saul-red">
              The Official Record (Mostly Accurate):
            </h3>
            <dl className="mt-3 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 font-[family-name:var(--font-body)] text-sm md:text-base">
              <dt className="font-[family-name:var(--font-headline)] uppercase tracking-wider text-saul-ink/70">Legal name</dt>
              <dd>James Morgan McGill, Esq. (friends call me Jimmy)</dd>

              <dt className="font-[family-name:var(--font-headline)] uppercase tracking-wider text-saul-ink/70">Doing business as</dt>
              <dd><strong>Saul Goodman</strong> — because, y'know, S'all Good, Man.</dd>

              <dt className="font-[family-name:var(--font-headline)] uppercase tracking-wider text-saul-ink/70">Juris Doctor</dt>
              <dd>University of American Samoa <span className="fine-print align-middle">(an accredited institution — Go Land Crabs!)</span></dd>

              <dt className="font-[family-name:var(--font-headline)] uppercase tracking-wider text-saul-ink/70">Previously</dt>
              <dd>Associate at Hamlin, Hamlin &amp; McGill (HHM). Brother of the late Charles L. McGill, Esq.</dd>

              <dt className="font-[family-name:var(--font-headline)] uppercase tracking-wider text-saul-ink/70">Currently</dt>
              <dd>Founder, Saul Goodman &amp; Associates — strip-mall office, Albuquerque, NM</dd>
            </dl>

            {/* Gene Takavic Easter egg — proudly in fine print */}
            <div className="mt-4 flex items-start gap-3 bg-saul-newspaper paper-grain border-2 border-dashed border-saul-ink/40 p-3">
              <CinnabonRoll className="w-12 h-12 shrink-0" />
              <p className="finer-print">
                Notice to creditors, process servers, and certain federal agencies: in the unlikely
                event that Mr. Goodman is unavailable, please direct all inquiries to a particular
                Cinnabon location in Omaha, Nebraska, where a Mr. <strong>Gene Takavic</strong> manages
                the day-to-day. No relation. Definitely no relation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
