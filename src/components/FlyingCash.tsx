"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * A stylized "cash flying across the screen" effect. We render a fixed
 * layer of $-bill divs and animate them with GSAP. Lottie would also work
 * here — this is intentionally lightweight so the page stays fast.
 */
export function FlyingCash({ count = 14 }: { count?: number }) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const bills = Array.from(layer.querySelectorAll<HTMLElement>(".bill"));

    const animateBill = (el: HTMLElement) => {
      const startY = gsap.utils.random(10, 90);
      const dur = gsap.utils.random(3.5, 7);
      const delay = gsap.utils.random(0, 4);
      const rot = gsap.utils.random(-180, 180);
      gsap.set(el, {
        x: "-15vw",
        y: `${startY}vh`,
        rotate: gsap.utils.random(-30, 30),
        opacity: 0,
      });
      gsap.to(el, {
        x: "115vw",
        y: `${startY + gsap.utils.random(-15, 15)}vh`,
        rotate: rot,
        opacity: 1,
        duration: dur,
        delay,
        ease: "power1.inOut",
        onComplete: () => animateBill(el),
      });
    };

    bills.forEach(animateBill);
    return () => {
      gsap.killTweensOf(bills);
    };
  }, [count]);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bill absolute select-none font-[family-name:var(--font-display)]"
          style={{
            color: "#1B5E20",
            background: "#C8E6C9",
            border: "2px solid #1B5E20",
            padding: "4px 12px",
            boxShadow: "3px 3px 0 rgba(0,0,0,0.3)",
            fontSize: "1.25rem",
            letterSpacing: "0.08em",
          }}
        >
          $100
        </div>
      ))}
    </div>
  );
}
