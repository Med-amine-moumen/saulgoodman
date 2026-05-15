"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function LiveCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [connected, setConnected] = useState(false);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const es = new EventSource("/api/counter");
    es.addEventListener("count", (evt: MessageEvent) => {
      try {
        const data = JSON.parse(evt.data);
        if (typeof data.count === "number") {
          setCount((prev) => {
            if (prev !== null && data.count !== prev && numRef.current) {
              gsap.fromTo(
                numRef.current,
                { scale: 1.35, color: "#FFD700" },
                { scale: 1, color: "inherit", duration: 0.5, ease: "back.out(2)" }
              );
            }
            return data.count;
          });
          setConnected(true);
        }
      } catch {}
    });
    es.onerror = () => setConnected(false);
    return () => es.close();
  }, []);

  return (
    <div className="bg-saul-ink text-saul-cream border-y-4 border-saul-yellow py-3">
      <div className="mx-auto max-w-7xl px-4 flex items-center justify-center gap-4 flex-wrap text-center">
        <span
          className={`inline-flex items-center gap-2 font-[family-name:var(--font-headline)] uppercase tracking-widest text-sm ${
            connected ? "text-saul-yellow" : "text-saul-cream/60"
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${connected ? "bg-saul-yellow animate-pulse" : "bg-saul-cream/40"}`} />
          LIVE
        </span>
        <span className="font-[family-name:var(--font-headline)] uppercase tracking-wider">
          Clients Helped This Month:
        </span>
        <span
          ref={numRef}
          className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-saul-yellow inline-block min-w-[5ch]"
        >
          {count === null ? "…" : count.toLocaleString()}
        </span>
        <span className="font-[family-name:var(--font-headline)] uppercase tracking-wider text-saul-red">
          ★ AND COUNTING!
        </span>
      </div>
    </div>
  );
}
