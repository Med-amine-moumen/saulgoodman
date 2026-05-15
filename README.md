# Saul Goodman, Attorney at Law — Portfolio Site

> *"You don't want a criminal lawyer. You want a **criminal** lawyer."*

A single-page scrolling portfolio styled like one of Saul Goodman's late-night TV commercials. Loud yellow + red, halftone texture, GSAP-choreographed animations, an R3F inflatable Lady Liberty, an SSE-powered live counter, and disclaimers in 6px font.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v4** (zero-config, theme tokens in `globals.css`)
- **GSAP + ScrollTrigger** for all scroll-driven animation
- **React Three Fiber** + `drei` for the Lady Liberty scene
- **`lottie-react`** installed and ready (current animations use GSAP — drop in Lottie JSON when you want)
- **Server-Sent Events** for the live "clients helped" counter
- **`next/font`** for Anton, Bebas Neue, Oswald, and Special Elite

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The intro plays once per session — refresh the tab in a new private window to see it again, or hit **Skip Intro »** in the top right.

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx            # next/font loaders + global wrapper
│  ├─ page.tsx              # the single page — composes all sections
│  ├─ globals.css           # Tailwind v4 @theme tokens + reusable effects
│  └─ api/counter/route.ts  # SSE endpoint streaming the live counter
├─ components/
│  ├─ IntroSequence.tsx     # GSAP title-card intro
│  ├─ SiteHeader.tsx        # Fixed header (fades in after intro)
│  ├─ FlyingCash.tsx        # Particle layer of stylized $100 bills
│  ├─ BreakingNewsTicker.tsx
│  ├─ LiveCounter.tsx       # EventSource client for /api/counter
│  └─ sections/
│     ├─ Hero.tsx
│     ├─ MeetYourLawyer.tsx
│     ├─ Services.tsx
│     ├─ NotableCases.tsx       # The showstopper: case files fly in, stamps slam
│     ├─ LadyLibertyScene.tsx   # R3F canvas (dynamic, client-only)
│     ├─ JusticeForAll.tsx      # Wraps the R3F scene + copy
│     ├─ Testimonials.tsx
│     ├─ Contact.tsx
│     └─ Footer.tsx
└─ lib/cn.ts
```

## Customizing your portfolio

### 1. Drop in your photo
[src/components/sections/MeetYourLawyer.tsx](src/components/sections/MeetYourLawyer.tsx#L78) has a placeholder marked with `TODO: Replace with actual Saul image`. Either:

- Put your image at `public/portrait.jpg` (square, ~800×800), or
- Replace the placeholder `<div>` block with `<Image src="/portrait.jpg" … />` from `next/image`.

Keep the yellow border + red drop-shadow so it still feels like a TV commercial frame.

### 2. Replace the three "cases"
[src/components/sections/NotableCases.tsx](src/components/sections/NotableCases.tsx#L21) — the `CASES` array. Each entry needs `num`, `title`, `client`, `charges` (the brief), `outcome`, and `verdict`. Search the file for `TODO:` to find what to swap.

### 3. Catchphrase rotator + credentials
[src/components/sections/MeetYourLawyer.tsx](src/components/sections/MeetYourLawyer.tsx#L8) — edit `CATCHPHRASES` and `CREDENTIALS`. They cycle on a 4.5s timer.

### 4. Services
[src/components/sections/Services.tsx](src/components/sections/Services.tsx#L17) — edit the `SERVICES` array. Each card supports an optional yellow `badge` ("FREE!", "BEST VALUE!", etc).

### 5. Testimonials
[src/components/sections/Testimonials.tsx](src/components/sections/Testimonials.tsx#L17) — edit the `TESTIMONIALS` array. Each one picks a `treatment`:

| treatment    | Visual                                              |
|--------------|-----------------------------------------------------|
| `official`   | Black card, yellow accent ("ON THE RECORD")         |
| `redacted`   | Black bars over the quote ("PRIVILEGED")            |
| `complaint`  | Typewriter complaint letter ("CERTIFIED")           |
| `diner`      | Loud yellow review card with 11-star rating         |

### 6. Phone number
The number appears in the intro, header, contact, and footer. Search the repo for `505-503-4455` / `(505) 503-4455` and replace.

### 7. Audio
There is a commented-out audio-toggle placeholder in [IntroSequence.tsx](src/components/IntroSequence.tsx) — drop in an `<audio>` element + button when you have an audio clip you have rights to.

### 8. Contact form handler
[src/components/sections/Contact.tsx](src/components/sections/Contact.tsx#L34) — the `onSubmit` handler currently just toggles the success state. Wire it to your handler of choice:

- **Formspree** — change `<form>` to `action="https://formspree.io/f/your-id"` + `method="POST"`.
- **Resend / API route** — `fetch('/api/contact', { method: 'POST', body: … })` and add a route.
- **Vercel** — works out of the box.

## How the live counter works

[src/app/api/counter/route.ts](src/app/api/counter/route.ts) holds a module-scope `counter` integer and a `Set` of subscribers. Each `GET` request opens a `ReadableStream` that emits `event: count` messages whenever the ticker fires (every 3–7 seconds). All connected browsers see the same number.

On serverless platforms (Vercel) each cold start gets a fresh baseline — that's intentional for a demo. For real cross-process state, swap the in-memory counter for Redis (e.g. Upstash) and pub/sub the increments.

The client lives in [LiveCounter.tsx](src/components/LiveCounter.tsx) — opens an `EventSource`, animates the digit on change with GSAP, shows a green "LIVE" pill when connected.

## Deploy to Vercel

```bash
# Push to GitHub, then:
npx vercel
# or:
git push   # if linked
```

That's it. SSE works on Vercel's Node runtime (already configured via `export const runtime = "nodejs"` in the counter route).

## Performance notes

- Three.js + `drei` are dynamically imported in [JusticeForAll.tsx](src/components/sections/JusticeForAll.tsx#L7) so the initial bundle stays slim.
- All animation runs through GSAP; no Framer Motion.
- Fonts are loaded via `next/font` (zero CLS, no extra network).
- The flying-cash layer renders 14 cheap divs and animates with GSAP — it's not a Lottie.

If you swap any heavy art in, lazy-load it the same way Lady Liberty is loaded.

## What's intentionally goofy

- Every disclaimer is in-character. Don't sand them off.
- Yellow + red are used aggressively on purpose. Don't pastel-ify them.
- The "thud + screenshake" on the Notable Cases section is the showstopper. Keep it.

## Credits / legalese

This is a fan tribute to a fictional character. No copyrighted show assets, no actor likenesses. All visuals are originals or styled placeholders for you to replace.
