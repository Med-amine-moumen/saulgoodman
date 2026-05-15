"use client";

// CHANGED: full content rewrite. Generic TODO placeholders replaced with real show clients,
// restructured into 3 featured big case files + 6 compact dossier cards beneath. Animation
// logic (fly-in, thud, stamp slam, screenshake) is preserved verbatim.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Verdict = "WON!" | "DISMISSED!" | "SETTLED!" | "REDUCED!" | "PENDING";

type FeaturedCase = {
  num: string;
  title: string;
  client: string;
  charges: string;
  outcome: string;
  verdict: Verdict;
  flyFrom: "left" | "right";
};

type CompactCase = {
  num: string;
  client: string;
  charges: string;
  outcome: string;
  verdict: Verdict;
};

// The headliners — full case-file treatment with the showstopper animations.
const FEATURED: FeaturedCase[] = [
  {
    num: "2008-1042",
    title: "U.S. v. White & Pinkman",
    client: "Walter H. White, Ph.D. & Jesse B. Pinkman",
    charges:
      "Allegations stemming from a multi-state investigation involving Los Pollos Hermanos and a person of interest known only as 'Heisenberg.' Conspiracy, distribution, RICO-adjacent.",
    outcome:
      "All charges against my clients managed through a combination of selective recollection, attorney-client privilege, and a vacuum-cleaner repairman in Nebraska. No further comment.",
    verdict: "DISMISSED!",
    flyFrom: "left",
  },
  {
    num: "2002-0317",
    title: "In re: The Kettleman Family",
    client: "Craig & Betsy Kettleman",
    charges:
      "Bernalillo County Treasurer's office. Allegations of embezzlement to the tune of $1.6 million USD, most of which was located inside a vinyl-sided home, beneath a child's mattress.",
    outcome:
      "Funds recovered. Plea entered. Wife took over the operation. I billed appropriately. Twice.",
    verdict: "SETTLED!",
    flyFrom: "right",
  },
  {
    num: "2004-0099",
    title: "State v. Eduardo Salamanca",
    client: "Eduardo 'Lalo' Salamanca",
    charges:
      "First-degree murder. Strong evidence. Stronger client. Bail hearing of a lifetime — argued before a packed courtroom for a $7,000,000 cash bond, which my client posted with the polite confidence of a man who knew where the money was.",
    outcome:
      "Bail granted. Client posted. Client subsequently became unreachable. (Hypothetically: I take no responsibility for any client's travel plans.)",
    verdict: "WON!",
    flyFrom: "left",
  },
];

// The B-side — compact, dossier-style cards in a grid.
const COMPACT: CompactCase[] = [
  {
    num: "2002-0188",
    client: "Tuco Salamanca (and two skateboard-related grievants)",
    charges: "Aggravated assault. Threatened compound fracture. Possible disappearance in desert.",
    outcome: "Negotiated down from 'capital offense' to 'one (1) broken leg, each.' A favorable settlement by any metric.",
    verdict: "REDUCED!",
  },
  {
    num: "2009-0451",
    client: "Huell Babineaux",
    charges: "Pickpocketing. Aiding and abetting. Sitting on $7M worth of cash in a storage unit.",
    outcome: "Various. Mostly favorable. Witness protection arranged, courtesy of an enthusiastic-but-fictional federal agent.",
    verdict: "WON!",
  },
  {
    num: "2009-0212",
    client: "Brandon 'Badger' Mayhew",
    charges: "Possession with intent to distribute. Sting operation. Brief talk-radio career.",
    outcome: "Cooperator deal that — through a series of regrettable coincidences — never quite came together for the prosecution.",
    verdict: "DISMISSED!",
  },
  {
    num: "2002-0623",
    client: "Sandpiper Crossing residents (Irene Landry, et al.)",
    charges: "Systematic elder fraud. Padded billing. Overpriced toiletries. The works.",
    outcome: "Class certified. Massive settlement on the table. Bigger firms tried to take it from me. (Long story.)",
    verdict: "PENDING",
  },
  {
    num: "2002-0317B",
    client: "Craig Kettleman, individually",
    charges: "County Treasurer embezzlement, see Case #2002-0317.",
    outcome: "Plea entered. Brief sentence served. Tax-preparation side business launched on release. Branding TBD.",
    verdict: "SETTLED!",
  },
  {
    num: "2003-0788",
    client: "M. Ehrmantraut (Consulting Matters)",
    charges: "Various 'consulting' engagements of a non-specific operational nature.",
    outcome: "All matters resolved without filings, without court appearances, and — most importantly — without follow-up.",
    verdict: "DISMISSED!",
  },
];

export function NotableCases() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // FEATURED animation — fly in, thud, stamp slam, screenshake (preserved from original)
      gsap.utils.toArray<HTMLElement>(".case-file").forEach((file) => {
        // CHANGED: fly-in distance scales with viewport width so mobile cards
        // don't have to travel 800px through a 375px screen
        const vw = typeof window !== "undefined" ? window.innerWidth : 1000;
        const dist = Math.min(vw, 800);
        const from = file.dataset.from === "right" ? dist : -dist;
        const stamp = file.querySelector<HTMLElement>(".case-stamp");
        const folder = file.querySelector<HTMLElement>(".folder-body");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: file,
            // CHANGED: trigger earlier (was "top 75%") so the animation starts
            // as soon as the card top reaches the bottom 90% of the viewport
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        tl.fromTo(
          folder,
          { x: from, rotate: from < 0 ? -25 : 25, opacity: 0 },
          { x: 0, rotate: 0, opacity: 1, duration: 0.7, ease: "power4.out" }
        );
        tl.to(folder, { y: 10, duration: 0.07, ease: "power1.in" }, ">-0.02");
        tl.to(folder, { y: 0, duration: 0.18, ease: "elastic.out(1, 0.45)" });
        tl.to(ref.current, {
          x: 6,
          duration: 0.05,
          repeat: 5,
          yoyo: true,
          ease: "rough({strength: 2, points: 20})",
        }, "<");
        tl.set(ref.current, { x: 0 });

        if (stamp) {
          tl.fromTo(
            stamp,
            { opacity: 0, scale: 4, rotate: -45, y: -80 },
            { opacity: 1, scale: 1, rotate: -8, y: 0, duration: 0.25, ease: "power4.in" },
            ">-0.1"
          );
          tl.to(stamp, { rotate: -6, duration: 0.12, yoyo: true, repeat: 1, ease: "sine.inOut" });
        }
      });

      // ADDED: lighter stagger reveal for the compact dossier grid (100ms per spec)
      gsap.from(".compact-case", {
        // CHANGED: trigger earlier — was "top 75%"
        scrollTrigger: { trigger: ".compact-grid", start: "top 90%", toggleActions: "play none none none" },
        opacity: 0,
        y: 40,
        rotate: () => gsap.utils.random(-2, 2),
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
      });

      // ADDED: compact stamps slam in after their card settles — start at
      // scale(2) + rotate(-15deg) + opacity 0, land at scale(1) + rotate(-3deg).
      gsap.fromTo(
        ".compact-stamp",
        { opacity: 0, scale: 2, rotate: -15 },
        {
          // CHANGED: trigger earlier — was "top 75%"
          scrollTrigger: { trigger: ".compact-grid", start: "top 90%", toggleActions: "play none none none" },
          opacity: 1,
          scale: 1,
          rotate: -3,
          duration: 0.45,
          stagger: 0.1,
          delay: 0.35,
          ease: "back.out(2.6)",
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="cases"
      className="relative py-24 md:py-32 bg-saul-ink text-saul-cream overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 6px)",
        }}
      />
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <header className="text-center mb-14">
          <p className="font-[family-name:var(--font-headline)] uppercase tracking-[0.4em] text-saul-yellow">
            From the Vault
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl uppercase mt-2">
            {/* ADDED: accent-glow on the yellow word */}
            Notable <span className="text-saul-yellow accent-glow">Cases</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-saul-cream/80">
            A select dossier of representative work. Some matters dramatized.
            Some matters litigated. Some matters <em>both</em>.
          </p>
        </header>

        {/* === FEATURED CASES === */}
        <div className="space-y-10 md:space-y-16">
          {FEATURED.map((c) => (
            <article key={c.num} className="case-file relative" data-from={c.flyFrom}>
              {/* CHANGED: tighter padding on mobile, extra bottom padding so
                  the stamp doesn't overlap the outcome text */}
              <div className="folder-body relative bg-saul-newspaper text-saul-ink border-4 border-saul-ink shadow-card-thud p-4 pb-16 md:p-8 md:pb-12 max-w-3xl mx-auto">
                <div className="absolute -top-7 left-6 bg-saul-newspaper border-4 border-saul-ink border-b-0 px-4 py-1 font-[family-name:var(--font-headline)] uppercase tracking-widest">
                  CASE FILE
                </div>

                <div className="flex items-baseline justify-between flex-wrap gap-2">
                  <span className="font-[family-name:var(--font-serif-fine)] text-sm">
                    CASE #{c.num}
                  </span>
                  <span className="font-[family-name:var(--font-headline)] uppercase text-saul-red tracking-wider">
                    Counsel: S. Goodman, Esq.
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl uppercase mt-2 leading-none">
                  {c.title}
                </h3>
                <p className="mt-1 font-[family-name:var(--font-headline)] uppercase tracking-wider text-saul-ink/70">
                  Client: {c.client}
                </p>

                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-[family-name:var(--font-headline)] uppercase tracking-widest text-saul-red">
                      Brief
                    </div>
                    <p className="font-[family-name:var(--font-body)] mt-1">{c.charges}</p>
                  </div>
                  <div>
                    <div className="text-xs font-[family-name:var(--font-headline)] uppercase tracking-widest text-saul-red">
                      Outcome
                    </div>
                    <p className="font-[family-name:var(--font-serif-fine)] mt-1 italic">
                      {c.outcome}
                    </p>
                  </div>
                </div>

                {/* CHANGED: stamp made responsive — smaller and tucked INSIDE
                    the card on mobile so it doesn't overflow the screen.
                    Desktop keeps the overhanging corner placement. */}
                <div className="case-stamp absolute right-2 bottom-2 md:-right-8 md:-bottom-6 select-none max-w-full" style={{ transformOrigin: "center" }}>
                  <div className="font-[family-name:var(--font-display)] text-saul-stamp text-xl sm:text-2xl md:text-6xl uppercase tracking-wide md:tracking-wider px-2 py-0.5 md:px-4 md:py-2 border-[3px] md:border-[6px] border-saul-stamp rounded-md shadow-stamp whitespace-nowrap"
                    style={{ background: "rgba(245,230,211,0.92)" }}>
                    VERDICT: {c.verdict}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ADDED: Compact dossier grid for the rest of the show's clients */}
        <div className="mt-20">
          <header className="text-center mb-8">
            <p className="font-[family-name:var(--font-headline)] uppercase tracking-[0.4em] text-saul-yellow">
              And Also Representing:
            </p>
            <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl uppercase mt-2">
              {/* ADDED: accent-glow on the yellow word */}
              Additional <span className="text-saul-yellow accent-glow">Dossier</span>
            </h3>
          </header>

          <div className="compact-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPACT.map((c) => (
              <article
                key={c.num}
                /* ADDED: hover lift + glow handled via .compact-case in globals.css */
                className="compact-case relative bg-saul-newspaper text-saul-ink border-4 border-saul-ink shadow-[6px_6px_0_#FFD700] p-5"
              >
                <div className="flex items-center justify-between text-xs font-[family-name:var(--font-headline)] uppercase tracking-widest">
                  <span className="font-[family-name:var(--font-serif-fine)] normal-case tracking-normal">
                    Case #{c.num}
                  </span>
                  {/* ADDED: compact-stamp class so GSAP can slam each stamp in
                      independently of the card's stagger fade */}
                  <span className="compact-stamp inline-block bg-saul-stamp text-saul-cream px-2 py-0.5 -rotate-3 border-2 border-saul-stamp">
                    {c.verdict}
                  </span>
                </div>
                <h4 className="font-[family-name:var(--font-display)] text-xl uppercase mt-2 leading-tight">
                  {c.client}
                </h4>
                <p className="mt-2 text-sm font-[family-name:var(--font-body)] text-saul-ink/85">
                  <span className="font-[family-name:var(--font-headline)] uppercase tracking-wider text-saul-red text-xs block">
                    Brief
                  </span>
                  {c.charges}
                </p>
                <p className="mt-2 text-sm font-[family-name:var(--font-serif-fine)] italic text-saul-ink/90">
                  <span className="font-[family-name:var(--font-headline)] uppercase tracking-wider text-saul-red text-xs not-italic block">
                    Outcome
                  </span>
                  {c.outcome}
                </p>
              </article>
            ))}
          </div>
        </div>

        <p className="finer-print text-center mt-12 text-saul-cream/60">
          All case summaries are dramatizations protected by the First Amendment, attorney-client
          privilege, and Mr. Goodman's vivid imagination. Past performance is not indicative of
          future verdicts. Some clients reachable only via tin can and string.
        </p>
      </div>
    </section>
  );
}
