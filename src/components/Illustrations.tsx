// ADDED: In-character SVG illustrations. No copyrighted imagery, no external URLs.
// All shapes are originals: scales of justice, generic Saul-shaped silhouette,
// strip-mall storefront, Constitution scroll, Cinnabon Easter egg.

import type { SVGProps } from "react";

export function ScalesOfJustice(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" {...props}>
      <path
        d="M100 30v140M70 175h60M55 50h90"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="square"
      />
      {/* left pan */}
      <path d="M30 60l25 0l25 0l-25 40z" fill="currentColor" />
      {/* right pan */}
      <path d="M120 60l25 0l25 0l-25 40z" fill="currentColor" />
      {/* chains */}
      <path
        d="M55 50v10M145 50v10"
        stroke="currentColor"
        strokeWidth="3"
      />
      {/* base */}
      <circle cx="100" cy="30" r="6" fill="currentColor" />
    </svg>
  );
}

/**
 * REVERTED: back to the simpler avatar — black suit, plain yellow tie,
 * brown combover hair, symmetric smile. This is the version the user wanted.
 */
export function LawyerSilhouette(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 220" fill="none" {...props}>
      {/* shoulders / suit */}
      <path
        d="M20 220 C 20 160, 60 140, 100 140 C 140 140, 180 160, 180 220 Z"
        fill="#0E0E0E"
      />
      {/* shirt */}
      <path d="M80 145l20 18l20 -18l-5 25h-30z" fill="#F5E6D3" />
      {/* hideous yellow tie */}
      <path d="M95 158l10 0l8 60h-26z" fill="#FFD700" stroke="#0E0E0E" strokeWidth="2" />
      {/* neck */}
      <rect x="88" y="120" width="24" height="25" fill="#D4A574" />
      {/* head */}
      <ellipse cx="100" cy="90" rx="42" ry="50" fill="#D4A574" />

      {/* CHANGED: hair — sandy blonde combover, slightly receding at temples.
          Color changed from orangey-brown #B85A2A to natural sandy #B8956A. */}
      <path
        d="M58 92
           C 58 72, 66 56, 82 50
           C 92 44, 108 44, 118 50
           C 134 56, 142 72, 142 92
           L 140 84
           C 135 70, 124 62, 110 60
           L 108 58
           Q 100 56, 92 58
           L 90 60
           C 76 62, 65 70, 60 84 Z"
        fill="#B8956A"
      />
      {/* widow's peak — small dip in the middle of the hairline */}
      <path
        d="M93 58 Q 100 64 107 58 L 105 56 Q 100 58 95 56 Z"
        fill="#B8956A"
      />
      {/* CHANGED: combover streak highlights — clearer (stroke 2 was 1.5),
          warmer darker sandy tone for definition rather than orange contrast */}
      <path
        d="M68 58 Q 84 50 102 52 M70 66 Q 86 58 108 60 M76 74 Q 92 66 116 68"
        stroke="#8E6E48"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* CHANGED: sideburns — short, tapered, NOT long. Previously extended
          to y=114 which read as a jaw beard. Now stops at y=98 — neat. */}
      <path d="M60 90 Q 62 96 66 98 L 70 92 Z" fill="#B8956A" />
      <path d="M140 90 Q 138 96 134 98 L 130 92 Z" fill="#B8956A" />

      {/* eyes */}
      <circle cx="85" cy="92" r="3" fill="#0E0E0E" />
      <circle cx="115" cy="92" r="3" fill="#0E0E0E" />
      {/* eyebrows — slightly raised, charismatic-confident */}
      <path d="M77 82 Q 85 79 93 82 M107 82 Q 115 79 123 82" stroke="#0E0E0E" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* CHANGED: smug asymmetric smirk — right corner pulled up.
          Left mouth corner low at (82, 116), middle near-flat, right corner
          up at (118, 109). Two-segment curve gives a salesman half-smile. */}
      <path
        d="M82 116 Q 95 119 102 117 Q 112 114 118 109"
        stroke="#0E0E0E"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* lapel */}
      <path d="M70 175 L 100 165 L 130 175" stroke="#FFD700" strokeWidth="2" fill="none" />
    </svg>
  );
}

export function ConstitutionScroll(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" {...props}>
      <rect x="40" y="30" width="120" height="140" rx="4" fill="#F5E6D3" stroke="#0E0E0E" strokeWidth="4" />
      <text x="100" y="60" textAnchor="middle" fontFamily="serif" fontSize="14" fill="#0E0E0E" fontWeight="bold">We The People</text>
      <path d="M55 80h90M55 95h90M55 110h70M55 125h90M55 140h60" stroke="#0E0E0E" strokeWidth="2" strokeLinecap="round" />
      {/* red wax seal */}
      <circle cx="155" cy="155" r="14" fill="#C8102E" stroke="#0E0E0E" strokeWidth="2" />
      <text x="155" y="159" textAnchor="middle" fontFamily="serif" fontSize="9" fill="#F5E6D3" fontWeight="bold">SG</text>
    </svg>
  );
}

export function StripMall(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 240 120" fill="none" {...props}>
      {/* building */}
      <rect x="0" y="30" width="240" height="80" fill="#D4B896" stroke="#0E0E0E" strokeWidth="3" />
      {/* awning */}
      <path d="M0 30 L 240 30 L 230 50 L 10 50 Z" fill="#C8102E" stroke="#0E0E0E" strokeWidth="3" />
      {/* sign */}
      <rect x="60" y="5" width="120" height="25" fill="#FFD700" stroke="#0E0E0E" strokeWidth="3" />
      <text x="120" y="23" textAnchor="middle" fontFamily="sans-serif" fontSize="14" fill="#0E0E0E" fontWeight="900">SAUL GOODMAN</text>
      {/* door */}
      <rect x="100" y="60" width="40" height="50" fill="#0E0E0E" />
      <rect x="105" y="65" width="14" height="20" fill="#FFD700" />
      <rect x="121" y="65" width="14" height="20" fill="#FFD700" />
      {/* windows */}
      <rect x="15" y="60" width="70" height="40" fill="#87CEEB" stroke="#0E0E0E" strokeWidth="2" />
      <rect x="155" y="60" width="70" height="40" fill="#87CEEB" stroke="#0E0E0E" strokeWidth="2" />
      {/* lettering on window */}
      <text x="50" y="85" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fill="#C8102E" fontWeight="900">ATTORNEY</text>
      <text x="190" y="85" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fill="#C8102E" fontWeight="900">AT LAW</text>
    </svg>
  );
}

export function CinnabonRoll(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 60" fill="none" {...props}>
      <circle cx="30" cy="30" r="26" fill="#D4915D" stroke="#0E0E0E" strokeWidth="2" />
      <path
        d="M30 30 m -18 0 a 18 18 0 1 1 36 0 a 14 14 0 1 0 -28 0 a 10 10 0 1 1 20 0 a 6 6 0 1 0 -12 0"
        stroke="#8B5A2B"
        strokeWidth="2"
        fill="none"
      />
      <ellipse cx="30" cy="28" rx="14" ry="4" fill="#F5E6D3" opacity="0.7" />
    </svg>
  );
}

export function Gavel(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 80" fill="none" {...props}>
      <rect x="10" y="50" width="60" height="10" rx="2" fill="currentColor" />
      <rect x="35" y="20" width="10" height="40" fill="currentColor" />
      <rect x="20" y="15" width="40" height="20" rx="3" fill="currentColor" stroke="#0E0E0E" strokeWidth="2" />
    </svg>
  );
}
