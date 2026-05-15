# Audio drop-in

Active clip:

```
public/audio/kim-always-down.m4a
```

- **Exact filename:** `kim-always-down.m4a`
- **Referenced in code as:** `/audio/kim-always-down.m4a`
  (Next.js serves everything in `public/` from the site root, so
  `public/audio/kim-always-down.mp3` → `/audio/kim-always-down.mp3`.)
- **Used by:** `src/components/sections/OutroJimmy.tsx` (the `<audio>` element)

## Sourcing the clip

- getyarn.io → search "Jimmy you are always down" → download MP3, or
- a YouTube clip of the S4E9 "Wiedersehen" scene → extract audio → trim
  to just **"Jimmy… you are always down."** (~2–3 seconds).

Keep it small (ideally < 100 KB). MP3 or OGG both fine — if you use OGG,
change the `src` extension in `OutroJimmy.tsx` accordingly.

Until the file is added, the section still works visually — the
typewriter plays, hover just silently does nothing audio-wise
(the `.play()` call is wrapped in `.catch()`).
