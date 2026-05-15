"use client";

export function Footer() {
  return (
    <footer className="bg-saul-ink text-saul-cream pt-16 pb-8 relative">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <div className="font-[family-name:var(--font-display)] text-saul-yellow text-6xl md:text-9xl tracking-wider leading-none">
          (505) 503-4455
        </div>
        <p className="font-[family-name:var(--font-headline)] uppercase tracking-[0.4em] text-saul-cream mt-4 text-lg md:text-2xl">
          ★ Best Lawyer In The Land Of Enchantment! ★
        </p>
        <p className="mt-2 font-[family-name:var(--font-body)] text-saul-cream/70 max-w-2xl mx-auto">
          Open 24/7. Closed never. Available holidays, weekends, weddings, and bar mitzvahs.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 font-[family-name:var(--font-headline)] uppercase tracking-wider text-saul-cream/80">
          <a href="#lawyer" className="hover:text-saul-yellow">Meet Saul</a>
          <a href="#services" className="hover:text-saul-yellow">Services</a>
          <a href="#cases" className="hover:text-saul-yellow">Cases</a>
          <a href="#justice" className="hover:text-saul-yellow">Lady Liberty</a>
          <a href="#testimonials" className="hover:text-saul-yellow">Testimonials</a>
          <a href="#contact" className="hover:text-saul-yellow">Contact</a>
        </div>

        <div className="mt-10 max-w-4xl mx-auto border-t-2 border-dashed border-saul-cream/30 pt-6">
          <p className="finer-print text-saul-cream/70">
            Saul Goodman &amp; Associates is not affiliated with any real legal practice. This is a
            portfolio project — a tribute to a fictional character from <em>Better Call Saul</em> and
            <em> Breaking Bad</em>. The likeness of any actor or copyrighted asset is intentionally
            avoided; placeholders are provided for the site owner to replace with art they have rights
            to. Please do not call this number expecting legal advice. Or do. I'm not your lawyer. Yet.
          </p>
          <p className="finer-print text-saul-cream/50 mt-4">
            © {new Date().getFullYear()} Saul Goodman &amp; Associates (Fictional). All rights
            reserved, dramatically.
          </p>
        </div>
      </div>
    </footer>
  );
}
