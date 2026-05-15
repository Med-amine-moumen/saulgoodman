"use client";

import Link from "next/link";

export function SiteHeader() {
  return (
    <header
      id="site-header"
      className="fixed top-0 left-0 right-0 z-40 bg-saul-cream border-b-4 border-saul-ink shadow-[0_6px_0_rgba(0,0,0,0.15)] opacity-0"
    >
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
        <Link href="#top" className="flex items-center gap-3 group">
          {/* ADDED: subtle floating animation on the diamond logo */}
          <span className="logo-float inline-block w-9 h-9 bg-saul-yellow border-2 border-saul-ink rotate-45 group-hover:!rotate-[60deg] transition-transform" />
          <span className="font-[family-name:var(--font-display)] text-2xl md:text-3xl tracking-wide">
            SAUL GOODMAN <span className="text-saul-red">&amp; ASSOCIATES</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 font-[family-name:var(--font-headline)] uppercase tracking-wider text-sm">
          <a href="#lawyer" className="hover:text-saul-red">Meet Saul</a>
          <a href="#services" className="hover:text-saul-red">Services</a>
          <a href="#cases" className="hover:text-saul-red">Cases</a>
          <a href="#testimonials" className="hover:text-saul-red">Testimonials</a>
          <a
            href="#contact"
            className="bg-saul-red text-saul-cream px-4 py-2 border-2 border-saul-ink shadow-[3px_3px_0_#0E0E0E] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-transform"
          >
            CALL NOW!
          </a>
        </nav>
      </div>
    </header>
  );
}
