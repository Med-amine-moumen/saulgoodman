"use client";

const HEADLINES = [
  "BREAKING: Local Lawyer Wins Case With Pure Charisma!",
  "EXCLUSIVE: Saul Goodman Offers Free Coffee With Every Consultation!",
  "JUST IN: Constitution Still Says You Have Rights!",
  "ALERT: Better Call Saul!! Operators Standing By!!",
  "URGENT: Limited Time Offer — Two Lawyers For The Price Of One!",
  "FLASH: Justice Has Never Been This Affordable!",
];

export function BreakingNewsTicker({ tone = "red" }: { tone?: "red" | "yellow" }) {
  const bg = tone === "red" ? "bg-saul-red text-saul-cream" : "bg-saul-yellow text-saul-ink";
  return (
    <div className={`${bg} border-y-4 border-saul-ink overflow-hidden relative`}>
      <div className="ticker-track py-2 font-[family-name:var(--font-headline)] text-lg tracking-wider">
        {[...HEADLINES, ...HEADLINES].map((h, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-3">
            <span className="text-saul-ink font-black">★</span>
            <span className="uppercase">{h}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
