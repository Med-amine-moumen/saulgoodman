"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// CHANGED: Services replaced wholesale — the web-dev meta-joke is out. These are the actual
// legal specialties Saul Goodman & Associates advertise, in Saul's own pitch voice.
type Service = {
  title: string;
  pitch: string;
  body: string;
  disclaimer: string;
  badge?: string;
};

const SERVICES: Service[] = [
  {
    title: "Criminal Defense",
    pitch: "Charged? Not Convicted!",
    body:
      "Felonies, misdemeanors, white-collar, blue-collar, no-collar. Whatever they say you did, we'll find another way to say it. Open 24/7, payment plans available.",
    disclaimer: "*No guarantees of acquittal. Past verdicts are not predictive. Cash retainer required.",
    badge: "MOST POPULAR!",
  },
  {
    title: "DUI / DWI",
    pitch: "Blew A .15? Let's Talk.",
    body:
      "Field-sobriety challenges, breathalyzer calibration motions, lane-change technicalities. If the officer didn't dot every i, I'll find the gap. One phone call.",
    disclaimer: "*Saul does not condone drinking and driving. Saul does, however, condone calling Saul.",
    badge: "RAPID RESPONSE!",
  },
  {
    title: "Drug Offenses",
    pitch: "Possession Is 9/10ths Of My Caseload!",
    body:
      "From an eighth in your glovebox to allegations involving non-specific blue-tinted commodities. Search-warrant challenges, chain-of-custody, illegal-stop motions — my specialty.",
    disclaimer: "*Representation does not imply approval of underlying conduct. Just the prices.",
  },
  {
    title: "Civil Rights",
    pitch: "The Constitution Says You Have Them!",
    body:
      "Unlawful search, excessive force, wrongful arrest. The Bill of Rights isn't just a poster in my office — it's the poster in my office, AND a viable cause of action.",
    disclaimer: "*Section 1983 claims subject to qualified immunity. Don't get me started.",
  },
  {
    title: "Personal Injury",
    pitch: "Slip & Fall? Slippin' Jimmy's Your Guy!",
    body:
      "Wet floors, cracked sidewalks, that one banana peel — if it caused you to come into sudden, unplanned contact with the ground, I want to hear about it. Especially if there were witnesses.",
    disclaimer: "*Saul has no formal training in the orchestration of slip-and-fall events. (Allegedly.)",
    badge: "NO WIN, NO FEE!*",
  },
  {
    title: "Constitutional Law",
    pitch: "I Have A Replica On My Wall!",
    body:
      "First Amendment? Fourth Amendment? Fourteenth? You name it, I'll cite it from memory. Federal court appearances available with two weeks notice and an espresso.",
    disclaimer: "*The replica is from a museum gift shop. The arguments are real.",
  },
  {
    title: "Plea Bargaining",
    pitch: "Death Penalty → Broken Legs!",
    body:
      "Outcome-engineering since 1993. The art of getting the prosecution to take less than they wanted — usually a lot less. (See: Tuco Salamanca, 2002.)",
    disclaimer: "*Outcomes depend on facts, judge, prosecutor, jurisdiction, and Saul's mood that morning.",
    badge: "AS SEEN IN COURT!",
  },
  {
    title: "Asset Forfeiture",
    pitch: "They Took It? Let's Get It Back!",
    body:
      "Civil and criminal forfeiture defense. Cars, cash, real estate, that one weird collection in your basement — if the government grabbed it, there's a procedure to challenge it. There's always a procedure.",
    disclaimer: "*Recovered assets subject to attorney's fees, court costs, and one (1) celebratory dinner.",
  },
];

export function Services() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        // CHANGED: replay each time the section enters the viewport
        // CHANGED: trigger earlier + play-once-stay-visible (no reset → can't get stuck hidden)
        scrollTrigger: { trigger: ref.current, start: "top 90%", toggleActions: "play none none none" },
        opacity: 0,
        y: 60,
        rotate: () => gsap.utils.random(-3, 3),
        stagger: 0.08,
        duration: 0.7,
        ease: "back.out(1.5)",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="services"
      className="relative py-24 md:py-32 bg-saul-cream halftone-overlay"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* CHANGED: header now reads as a strip-mall legal-services menu, not a tech-services menu */}
        <header className="text-center mb-12">
          <p className="font-[family-name:var(--font-headline)] uppercase tracking-[0.3em] text-saul-red">
            ★ Full Service. Full Representation. Full Stop. ★
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl uppercase mt-2">
            Legal <span className="bg-saul-yellow border-4 border-saul-ink px-3 inline-block -rotate-1">SPECIALTIES</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg">
            Whatever they're charging you with, I've defended worse. Every service comes with my
            <strong> personal guarantee*</strong> — and a complimentary keychain while supplies last.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, idx) => (
            <article
              key={s.title}
              className="service-card group relative bg-saul-newspaper paper-grain border-4 border-saul-ink p-6 shadow-[8px_8px_0_#0E0E0E] transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0_#C8102E] hover:rotate-[-1deg]"
            >
              {s.badge && (
                <div className="absolute -top-3 -left-3 bg-saul-red text-saul-cream px-3 py-1 font-[family-name:var(--font-headline)] text-sm tracking-wider border-2 border-saul-ink rotate-[-6deg]">
                  {s.badge}
                </div>
              )}
              <div className="free-stamp">FREE!</div>

              <div className="text-xs font-[family-name:var(--font-headline)] uppercase tracking-wider text-saul-red">
                Service #{String(idx + 1).padStart(2, "0")}
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-3xl mt-1 uppercase leading-none">
                {s.title}
              </h3>
              <p className="font-[family-name:var(--font-headline)] text-saul-ink/80 uppercase tracking-wider mt-1">
                → {s.pitch}
              </p>
              <p className="mt-3 text-base">{s.body}</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="font-[family-name:var(--font-display)] text-saul-red text-2xl">
                  Call Today!
                </span>
                <span className="font-[family-name:var(--font-headline)] tracking-wider">↗</span>
              </div>

              <p className="fine-print mt-3">{s.disclaimer}</p>
            </article>
          ))}
        </div>

        <p className="finer-print text-center mt-8 max-w-3xl mx-auto">
          *Personal guarantee is non-binding, non-transferable, and ceases upon receipt of payment.
          Offers void where prohibited, where mildly inconvenient, or where Saul has previously been
          asked to leave the building.
        </p>
      </div>
    </section>
  );
}
