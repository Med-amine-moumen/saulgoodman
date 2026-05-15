"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// CHANGED: added Walt + Jesse explicitly (per spec). Kept Mike/Kim/Chuck. Reordered so
// the most quotable cards lead. Treatments mapped per character voice.
type Testimonial = {
  quote: string;
  author: string;
  // ADDED: "wexler" treatment — measured, professional, Kim's voice
  treatment: "redacted" | "complaint" | "diner" | "official" | "chem" | "tweaker" | "wexler";
};

const TESTIMONIALS: Testimonial[] = [
  // ADDED: three Kim Wexler quotes — clean, professional, no jokes. Her quote
  // anchors the section. The earlier in-character "[no comment]" card stays
  // below as a callback to her own deposition-era reticence.
  {
    quote:
      "Jimmy McGill is the most resourceful attorney I've ever worked with. If you're in trouble, you call him. End of story.",
    author: "Kim Wexler, Esq. — Former Partner, Wexler-McGill",
    treatment: "wexler",
  },
  {
    quote:
      "He fights for his clients harder than anyone in Albuquerque. Sometimes too hard. But that's exactly what you want in a defense attorney.",
    author: "Kim Wexler — Schweikart & Cokely (Former)",
    treatment: "wexler",
  },
  {
    quote:
      "I've seen him take cases nobody else would touch — and win. Underestimate him at your own risk.",
    author: "Kim Wexler, Attorney at Law",
    treatment: "wexler",
  },
  {
    quote: "We — and by 'we' I mean a hypothetical client — appreciate Mr. Goodman's discretion and willingness to entertain unconventional retainer arrangements.",
    author: "W. White, chemistry educator (retired)",
    treatment: "chem",
  },
  {
    quote: "Yo, Saul's the man! He got me out of, like, three things I am LEGALLY not allowed to talk about. Bitch.",
    author: "J. Pinkman",
    treatment: "tweaker",
  },
  {
    quote: "He's competent. Sometimes.",
    author: "Mike E.",
    treatment: "official",
  },
  {
    quote: "[ no comment ]",
    author: "Kim W., on the record",
    treatment: "redacted",
  },
  {
    quote: "He's an animal.",
    author: "Chuck M., delivered by certified mail",
    treatment: "complaint",
  },
  {
    quote: "Saul got me off with a warning AND a fruit basket. 11/10!",
    author: "Anonymous Client #4471",
    treatment: "diner",
  },
];

export function Testimonials() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        // CHANGED: replay each time the section enters the viewport
        // CHANGED: trigger earlier + play-once-stay-visible (no reset → can't get stuck hidden)
        scrollTrigger: { trigger: ref.current, start: "top 90%", toggleActions: "play none none none" },
        opacity: 0,
        y: 60,
        rotate: () => gsap.utils.random(-4, 4),
        stagger: 0.12,
        duration: 0.7,
        ease: "back.out(1.6)",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="testimonials"
      className="relative py-24 md:py-32 bg-saul-cream halftone-overlay"
    >
      <div className="mx-auto max-w-6xl px-6">
        <header className="text-center mb-12">
          <p className="font-[family-name:var(--font-headline)] uppercase tracking-[0.4em] text-saul-red">
            Glowing Reviews* From Happy** Clients***
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl uppercase mt-2">
            <span className="bg-saul-yellow border-4 border-saul-ink px-3 inline-block -rotate-1">TESTIMONIALS</span>
          </h2>
          <p className="fine-print mt-3">
            *Star ratings inferred from tone. **Some clients no longer reachable. ***By Saul's definition of "happy."
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  if (t.treatment === "redacted") {
    return (
      <article className="testimonial-card relative bg-white border-4 border-saul-ink p-8 shadow-card-thud">
        <div className="absolute inset-x-4 top-6 h-8 bg-saul-ink" />
        <div className="absolute inset-x-12 top-16 h-6 bg-saul-ink" />
        <div className="absolute inset-x-8 top-24 h-6 bg-saul-ink" />
        <div className="pt-36">
          <p className="font-[family-name:var(--font-serif-fine)] text-3xl italic text-saul-ink/40">
            "{t.quote}"
          </p>
          <p className="mt-4 font-[family-name:var(--font-headline)] uppercase tracking-wider">
            — {t.author}
          </p>
        </div>
        <div className="absolute -top-3 -right-3 bg-saul-ink text-saul-yellow px-3 py-1 font-[family-name:var(--font-headline)] tracking-widest text-sm rotate-3">
          PRIVILEGED
        </div>
      </article>
    );
  }

  if (t.treatment === "complaint") {
    return (
      <article className="testimonial-card relative bg-[#F9F3E1] border-4 border-saul-ink p-8 shadow-card-thud paper-grain">
        <div className="font-[family-name:var(--font-serif-fine)] text-saul-ink/60 text-xs uppercase tracking-widest mb-2">
          Re: Mr. Goodman — Formal Complaint
        </div>
        <p className="font-[family-name:var(--font-serif-fine)] text-2xl leading-relaxed italic">
          "{t.quote}"
        </p>
        <div className="border-t-2 border-dashed border-saul-ink/40 my-4" />
        <p className="font-[family-name:var(--font-serif-fine)] uppercase tracking-wider text-sm">
          Sincerely,<br />
          {t.author}
        </p>
        <div className="absolute -bottom-2 -right-2 rotate-12">
          <div className="border-4 border-saul-stamp text-saul-stamp font-[family-name:var(--font-display)] text-xl px-2 py-1 opacity-80">
            CERTIFIED
          </div>
        </div>
      </article>
    );
  }

  if (t.treatment === "diner") {
    return (
      <article className="testimonial-card relative bg-saul-yellow border-4 border-saul-ink p-8 shadow-card-thud">
        <p className="font-[family-name:var(--font-display)] uppercase text-3xl md:text-4xl leading-tight">
          "{t.quote}"
        </p>
        <p className="mt-4 font-[family-name:var(--font-headline)] uppercase tracking-wider text-saul-red">
          ★★★★★★★★★★★ — {t.author}
        </p>
        <div className="absolute -top-4 right-6 bg-saul-red text-saul-cream px-3 py-1 font-[family-name:var(--font-headline)] tracking-widest text-xs rotate-6">
          REAL REVIEW!
        </div>
      </article>
    );
  }

  // ADDED: Walter White's testimonial — clinical, careful, "speaking hypothetically"
  if (t.treatment === "chem") {
    return (
      <article className="testimonial-card relative bg-[#E8F5E9] border-4 border-[#1B5E20] p-8 shadow-card-thud">
        <div className="font-[family-name:var(--font-serif-fine)] text-[#1B5E20] text-xs uppercase tracking-widest mb-2">
          Hypothetical Statement, For The Record
        </div>
        <p className="font-[family-name:var(--font-body)] text-lg leading-relaxed text-saul-ink">
          "{t.quote}"
        </p>
        <div className="border-t-2 border-dotted border-[#1B5E20]/40 my-4" />
        <p className="font-[family-name:var(--font-headline)] uppercase tracking-wider text-sm text-[#1B5E20]">
          — {t.author}
        </p>
        <div className="absolute -top-3 -right-3 bg-[#1B5E20] text-[#FFEB3B] px-3 py-1 font-[family-name:var(--font-display)] tracking-widest text-sm rotate-3 border-2 border-[#1B5E20]">
          Br
        </div>
      </article>
    );
  }

  // ADDED: Jesse's testimonial — loud, all-caps energy, hand-scrawled feel
  if (t.treatment === "tweaker") {
    return (
      <article className="testimonial-card relative bg-saul-cream border-4 border-saul-ink p-8 shadow-card-thud overflow-hidden">
        {/* spray-paint splat */}
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-saul-red opacity-90 rotate-12"
          style={{ clipPath: "polygon(50% 0%, 80% 10%, 100% 35%, 95% 70%, 70% 100%, 35% 95%, 5% 75%, 0% 40%, 15% 10%)" }} />
        <p className="relative font-[family-name:var(--font-display)] uppercase text-2xl md:text-3xl leading-tight text-saul-ink">
          "{t.quote}"
        </p>
        <p className="relative mt-4 font-[family-name:var(--font-headline)] uppercase tracking-wider text-saul-red text-lg">
          — {t.author}, yo
        </p>
        <div className="absolute -bottom-3 -right-3 bg-saul-ink text-saul-yellow px-3 py-1 font-[family-name:var(--font-display)] tracking-widest text-lg rotate-[-6deg]">
          SCIENCE!
        </div>
      </article>
    );
  }

  // ADDED: Kim Wexler treatment — clean cream card, yellow accent border,
  // a small KW initials badge in red. Measured typography, no jokes. Matches
  // the existing card system so it doesn't visually fight other testimonials.
  if (t.treatment === "wexler") {
    return (
      <article className="testimonial-card relative bg-saul-newspaper border-4 border-saul-ink p-8 shadow-card-thud paper-grain">
        <div className="absolute -top-3 -left-3 w-12 h-12 bg-saul-red text-saul-cream rounded-full flex items-center justify-center font-[family-name:var(--font-display)] text-xl tracking-wider border-2 border-saul-ink shadow-[2px_2px_0_#0E0E0E]">
          KW
        </div>
        <div className="absolute top-0 right-0 bottom-0 w-1.5 bg-saul-yellow" />
        <div className="font-[family-name:var(--font-headline)] uppercase tracking-[0.2em] text-saul-red text-xs mb-3 pl-10">
          From the Bar
        </div>
        <p className="font-[family-name:var(--font-body)] text-lg leading-relaxed text-saul-ink">
          "{t.quote}"
        </p>
        <div className="border-t-2 border-dashed border-saul-ink/30 my-4" />
        <p className="font-[family-name:var(--font-headline)] uppercase tracking-wider text-sm text-saul-red">
          — {t.author}
        </p>
      </article>
    );
  }

  // "official" (default — Mike's vibe)
  return (
    <article className="testimonial-card relative bg-saul-ink text-saul-cream border-4 border-saul-ink p-8 shadow-card-thud">
      <p className="font-[family-name:var(--font-serif-fine)] text-2xl italic">
        "{t.quote}"
      </p>
      <p className="mt-4 font-[family-name:var(--font-headline)] uppercase tracking-widest text-saul-yellow">
        — {t.author}
      </p>
      <div className="absolute -top-3 left-6 bg-saul-yellow text-saul-ink px-3 py-1 font-[family-name:var(--font-headline)] tracking-widest text-sm rotate-[-4deg]">
        ON THE RECORD
      </div>
    </article>
  );
}
