"use client";

import { useState } from "react";

const DISCLAIMERS = [
  "Saul Goodman is not a real attorney and this is not a real law firm. This is a portfolio site, pal.",
  "Submitting this form does not create an attorney-client relationship, a friendship, or any other lasting commitment.",
  "All information provided will be used to follow up about web development inquiries — not legal matters, real estate, plea deals, or alibis.",
  "Estimated response time: 1–3 business days. Estimated court time: not applicable.",
  "Saul reserves the right to decline any case, project, or hand-shake at his sole discretion.",
  "Fees are negotiable. Payment plans available. Cash preferred. Fruit baskets accepted as bonus only.",
  "Form data is not stored on a server in this demo — it lives only in your browser. Future versions may write to a database that Saul promises (winks) to keep secure.",
  "Saul Goodman & Associates is fictional. Bob Odenkirk is not affiliated with this project. The likeness of any character is not reproduced — only the vibe.",
  "Void where prohibited. Void where Saul has previously been escorted out.",
  "By submitting, you agree to be charmed against your better judgment.",
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: Wire up to a real form handler (Formspree, Resend, API route, etc.)
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-saul-yellow border-y-4 border-saul-ink overflow-hidden"
    >
      <div className="absolute inset-0 halftone-overlay pointer-events-none" />
      <div className="mx-auto max-w-4xl px-6 relative z-10">
        <header className="text-center">
          <p className="font-[family-name:var(--font-headline)] uppercase tracking-[0.4em] text-saul-red">
            ★ Don't Wait! Don't Hesitate! ★
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-6xl md:text-9xl uppercase leading-[0.85] mt-2">
            FREE
            <br />
            <span className="text-saul-red text-shadow-pop">CONSULTATION!</span>
          </h2>
          {/* CHANGED: pitch is now legal-services-flavored, not project-shipped flavored */}
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            One quick call and I'll be at the precinct before the booking officer finishes
            asking you to sign anything. <strong>That's why I fight for you, Albuquerque!</strong>
          </p>
          <p className="mt-1 fine-print">
            No retainer to start. No commitment. No catch. (Catch is in the fine print at the bottom.)
          </p>
        </header>

        <div className="mt-12 grid md:grid-cols-2 gap-8 items-start">
          {/* CTA column */}
          <div className="bg-saul-cream border-4 border-saul-ink p-6 shadow-card-thud">
            <p className="font-[family-name:var(--font-headline)] uppercase tracking-[0.3em] text-saul-red text-sm">
              The fastest way is to —
            </p>
            <a
              href="tel:+15055034455"
              className="btn-infomercial mt-3 w-full text-center text-3xl md:text-5xl block"
            >
              ☎ CALL NOW!
            </a>
            <p className="fine-print mt-2 text-center">*or fill out the form below</p>

            <div className="mt-6 font-[family-name:var(--font-display)] text-4xl md:text-5xl text-center tracking-wider">
              (505) 503-4455
            </div>
            <div className="text-center font-[family-name:var(--font-headline)] tracking-wider uppercase text-saul-ink/70 mt-1">
              Operators standing by. Allegedly.
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="bg-saul-cream border-4 border-saul-ink p-6 shadow-card-thud space-y-4"
          >
            {submitted ? (
              <div className="text-center py-8">
                <div className="font-[family-name:var(--font-display)] text-4xl text-saul-red">
                  CASE OPENED!
                </div>
                <p className="mt-2 font-[family-name:var(--font-body)]">
                  Saul will be in touch. Probably. Stay near a phone.
                </p>
                <p className="fine-print mt-4">
                  (No data was actually sent — wire this form to your handler of choice.)
                </p>
              </div>
            ) : (
              <>
                <Field label="Your Name" name="name" placeholder="Walter H." />
                <Field label="Phone Number" name="phone" placeholder="(505) 555-0100" />
                <Field label="Email Address" name="email" type="email" placeholder="you@example.com" />
                <div>
                  <label className="block font-[family-name:var(--font-headline)] uppercase tracking-wider text-sm mb-1">
                    Briefly Describe Your Situation
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full bg-white border-4 border-saul-ink p-2 font-[family-name:var(--font-body)] focus:outline-none focus:shadow-[0_0_0_4px_#FFD700]"
                    placeholder="Be honest. Saul has heard worse."
                  />
                </div>
                <button type="submit" className="btn-infomercial w-full text-2xl">
                  SUBMIT MY CASE! »
                </button>
                <p className="fine-print">
                  By submitting, you confirm none of the above is intended as actual legal counsel.
                </p>
              </>
            )}
          </form>
        </div>

        {/* The wall of disclaimers — the funniest part on purpose */}
        <div className="mt-12 border-t-2 border-dashed border-saul-ink/60 pt-6">
          <p className="font-[family-name:var(--font-headline)] uppercase tracking-widest text-saul-ink/70 text-xs mb-2">
            Legal Disclaimers (Please Read All 10):
          </p>
          <div className="finer-print space-y-1 max-w-3xl">
            {DISCLAIMERS.map((d, i) => (
              <p key={i}>
                {i + 1}. {d}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block font-[family-name:var(--font-headline)] uppercase tracking-wider text-sm mb-1">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full bg-white border-4 border-saul-ink p-2 font-[family-name:var(--font-body)] focus:outline-none focus:shadow-[0_0_0_4px_#FFD700]"
      />
    </div>
  );
}
