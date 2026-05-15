"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        delay: 3.1, // wait for intro to clear
      });
      gsap.from(".hero-cta", {
        opacity: 0,
        scale: 0.7,
        duration: 0.5,
        ease: "back.out(2)",
        delay: 3.7,
      });

      // Star spins forever
      gsap.to(".hero-star", {
        rotate: 360,
        duration: 18,
        ease: "none",
        repeat: -1,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="top"
      className="relative pt-28 md:pt-36 pb-16 md:pb-24 halftone-overlay overflow-hidden"
    >
      {/* Decorative starbursts */}
      <div className="hero-star starburst hidden md:block" style={{ top: "10%", left: "-3rem", width: "11rem", height: "11rem" }} />
      <div className="hero-star starburst hidden md:block" style={{ bottom: "5%", right: "-3rem", width: "9rem", height: "9rem" }} />

      <div className="mx-auto max-w-6xl px-6 text-center relative z-20">
        <p className="hero-line font-[family-name:var(--font-headline)] uppercase tracking-[0.4em] text-saul-red text-sm md:text-base mb-4">
          ★ ★ ★  Albuquerque's #1 Pick*  ★ ★ ★
        </p>

        <h2 className="hero-line font-[family-name:var(--font-display)] text-5xl md:text-8xl leading-none uppercase">
          You Don't Want A <span className="text-saul-red">Criminal</span> Lawyer
        </h2>
        <h2 className="hero-line font-[family-name:var(--font-display)] text-5xl md:text-8xl leading-none uppercase mt-2">
          {/* ADDED: accent-glow on the yellow word */}
          You Want A <span className="accent-glow bg-saul-yellow px-3 border-4 border-saul-ink shadow-[6px_6px_0_#0E0E0E] inline-block -rotate-1">CRIMINAL</span> Lawyer.
        </h2>

        {/* CHANGED: Bio reframed from web-dev to Criminal Defense Attorney. Constitution speech added. */}
        <p className="hero-line mt-8 max-w-3xl mx-auto font-[family-name:var(--font-body)] text-lg md:text-xl text-saul-ink/85">
          Hi, I'm <strong>Saul Goodman, Esq.</strong> — Criminal Defense Attorney, constitutional scholar
          (I have a replica of the Constitution hanging on my office wall), and the only attorney in
          Albuquerque who'll take your call at 3 AM. <em>Especially</em> at 3 AM.
        </p>

        {/* ADDED: The rights speech — straight from Saul's own commercials */}
        <blockquote className="hero-line mt-6 max-w-3xl mx-auto font-[family-name:var(--font-serif-fine)] italic text-base md:text-lg text-saul-ink/80 border-l-4 border-saul-red pl-4 text-left">
          "Did you know that you have rights? The Constitution says you do.
          And so do I. I believe that until proven guilty, every man, woman,
          and child in this country is innocent. And that's why I fight for
          you, <span className="text-saul-red not-italic font-bold uppercase">Albuquerque!</span>"
        </blockquote>

        <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* ADDED: phone number occasionally pulses red — draws the eye without flashing */}
          <a href="tel:+15055034455" className="btn-infomercial text-2xl md:text-3xl">
            ☎ Call Now! <span className="phone-pulse">505-503-4455</span>
          </a>
          <a
            href="#cases"
            className="font-[family-name:var(--font-headline)] uppercase tracking-wider underline underline-offset-4 decoration-saul-red decoration-4 hover:text-saul-red"
          >
            See My Notable Cases »
          </a>
        </div>

        <p className="fine-print mt-6">
          *According to a survey I conducted of myself. Statistical significance not guaranteed.
        </p>
      </div>
    </section>
  );
}
