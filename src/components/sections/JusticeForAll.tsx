"use client";

import dynamic from "next/dynamic";

// Lazy-load the Three.js scene — keeps initial JS bundle slim.
const LadyLibertyScene = dynamic(() => import("./LadyLibertyScene"), {
  ssr: false,
  loading: () => (
    <div className="aspect-square w-full max-w-md mx-auto bg-saul-cream border-4 border-saul-ink shadow-card-thud flex items-center justify-center font-[family-name:var(--font-headline)] uppercase tracking-widest">
      Inflating Lady Liberty…
    </div>
  ),
});

export function JusticeForAll() {
  return (
    <section
      id="justice"
      className="relative py-24 md:py-32 bg-saul-yellow border-y-4 border-saul-ink overflow-hidden"
    >
      <div className="absolute inset-0 halftone-overlay pointer-events-none" />
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <p className="font-[family-name:var(--font-headline)] uppercase tracking-[0.4em] text-saul-red">
            Office Decor of the Month
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl uppercase leading-none mt-2">
            Justice For <span className="text-saul-red">All!</span>
          </h2>
          <p className="mt-2 font-[family-name:var(--font-headline)] uppercase tracking-wider text-saul-ink/70">
            (Mostly.)
          </p>

          <p className="mt-6 text-lg max-w-prose">
            That's the real deal — a regulation-size inflatable Lady Liberty, parked permanently
            on the office roof. Symbol of freedom. Magnet for foot traffic. Drag her around —
            she likes the attention.
          </p>

          <ul className="mt-6 space-y-2 font-[family-name:var(--font-body)]">
            <li>★ Click + drag to rotate</li>
            <li>★ Sways gently when you're not looking</li>
            <li>★ 100% inflatable, 0% deflatable spirits</li>
          </ul>

          <p className="fine-print mt-4">
            *Inflatable not included with services. Available separately for an additional fee.
          </p>
        </div>

        <div className="relative">
          {/* "AS SEEN ON ROOFTOP" badge */}
          <div className="absolute -top-4 -left-4 z-10 bg-saul-red text-saul-cream px-3 py-1 font-[family-name:var(--font-headline)] tracking-wider border-2 border-saul-ink rotate-[-8deg] shadow-[3px_3px_0_#0E0E0E]">
            ★ As Seen On Rooftop ★
          </div>
          <LadyLibertyScene />
        </div>
      </div>
    </section>
  );
}
