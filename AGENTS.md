# Noosa landing page

React 19 + Vite + Tailwind CSS v4. The page is a Figma Make export that has been
restructured by hand — treat `src/` as normal source code you own, not as
generated output.

## Development server

```bash
pnpm install
pnpm dev
```

Vite serves on `$PORT` (default 8443). Inside Figma Make the server is already
running and hot-reloads on save. `.claude/launch.json` is wired up so Claude Code
can start and preview it too.

Other scripts: `pnpm build`, `pnpm preview`, `pnpm typecheck`, `pnpm format`.

> **Careful with `pnpm format`.** It runs oxfmt 0.2.0, which has two sharp edges:
> it formats the whole working directory (it will happily rewrite `node_modules`,
> so the script is scoped to `src`), and it drops the `;` separators inside
> *single-line* TypeScript type literals, turning `{ a: string; b: string }` into
> invalid syntax. Multi-line type literals are fine, so every `}: {` in this repo
> is written multi-line. Typecheck after formatting.

## Layout model — read this first

The page is normal document flow. Each section is a full-width band that owns its
own vertical padding, and caps its contents at **1440px** via `Container`
(`src/components/landing/layout.tsx`). Adding, moving or resizing a section is
just editing that section — nothing downstream needs touching.

**The navigation bar is the one deliberate exception**: it spans the full width of
the screen at any size, so its contents sit against the viewport edges rather than
the 1440px content column. Do not wrap it in a `Container`.

Inside it, the wordmark and the actions group each sit in a `flex-1` frame from
`xl` up. Equal frames on both sides are what hold the Discover/Tickets/My Events
pills dead centre — measured to 0px off at 1280, 1440, 1600 and 2000. Sizing the
wordmark frame to the actions' literal width would drift every time a breakpoint
adds or drops one of those buttons. The pills only appear at `xl` because below
about 1200px the wordmark, pills and actions cannot all fit with equal frames;
they would either overlap or sit visibly off centre.

- `Container` — `max-w-[1440px] mx-auto w-full`. Use it for anything new.
- `SECTION_X` — the shared horizontal gutter (`px-[20px] md:px-[32px]`). Applied
  to the `<section>`, so full-bleed decoration (the hero glow, the Indonesia map,
  the footer glow) can sit outside it and still run edge to edge.
- The page background is `#131313`, set on `html`/`body` in `src/index.css` as
  well as on the layout, so overscroll bounce and any uncovered area match.

Breakpoints are Tailwind defaults. The load-bearing ones:

| Width | What changes |
| ----- | ------------ |
| `< sm` (640) | Growth stats go from 2 columns to 1 |
| `< md` (768) | Nav drops the search and bell buttons; type steps down |
| `< lg` (1024) | Feature cards and testimonials go single column; how-it-works drops its pinned stepper for a plain stacked list |
| `< xl` (1280) | Nav drops the Discover/Tickets/My Events pills (see below) |
| `xl` (1280) | Growth stats go to all 4 across |

Verified with no horizontal overflow at 360, 480, 768, 1024, 1280, 1440, 2000 and
2560px.

## Project structure

- `index.html` — Vite shell; the `<title>` and `<html lang>` are filled in by Figma Make at build time
- `src/main.tsx` — React entrypoint; mounts `App` and imports `index.css`
- `src/index.css` — Tailwind import plus the four Plus Jakarta Sans `@font-face` rules
- `src/App.tsx` — the page background and overflow guard
- `src/components/LandingPage.tsx` — composes the sections in document order
- `src/components/landing/layout.tsx` — `Container` and `SECTION_X`, the 1440px cap and page gutter
- `src/components/landing/*.tsx` — one file per section; shared bits (`StatCard`, `FeatureCard`, `StepCard`, `NavLink`, …) are defined in the section that uses them
- `src/hooks.ts` — `useInView`, `useCountUp`, `usePrefersReducedMotion`; the scroll-triggered animation primitives
- `src/components/icons.tsx` — the inline SVG icons and the Noosa wordmark
- `src/components/icon-paths.ts` — SVG path geometry for those icons, named
- `src/components/landing/indonesia-map-dots.ts` — 5,216 path strings for the map in `NusantaraSection`; generated data, never hand-edit
- `src/assets/` — every image the page renders, named after where it appears
- `public/fonts/` — the four Plus Jakarta Sans woff2 files
- `design/` — original Figma exports, referenced by nothing (see `design/README.md`)
- `vite.config.ts`, `.figma/`, `.mise.toml`, `.npmrc` — Figma Make platform config; leave alone unless you are deliberately leaving the platform

## Styling

Tailwind v4 via `@tailwindcss/vite` (configured in `vite.config.ts`); no
`tailwind.config.js` and no PostCSS config needed. Global CSS and Tailwind theme
customization go in `src/index.css`, with `@import` first, then `@font-face`.

The export uses arbitrary-value utilities throughout (`text-[48px]`,
`bg-[#131313]`, `font-['Plus_Jakarta_Sans:Bold',sans-serif]`). The recurring
values are:

- background `#131313`, raised surface `#181818` (feature cards, nav bar, language
  switcher), control surface `#212121` (nav pills and icon buttons), hairline
  `rgba(245,245,245,0.1)`
- a card's bottom fade must reuse the card's own RGB for the transparent stop
  (`from-[rgba(24,24,24,0)]` for a `#181818` card) — a plain `transparent` drifts
  through black on the way down
- text `#f5f5f5`, muted `rgba(245,245,245,0.8)`, disabled `rgba(245,245,245,0.4)`
- accent `#d8444b`, accent wash `rgba(216,68,75,0.1)`

Worth promoting to `@theme` tokens in `src/index.css` before the palette grows.

## Animation

`GrowthSection` is the only animated section so far. The pattern to copy:

- `useInView()` returns `[ref, inView]`. Attach the ref to the block you want to
  animate; `inView` flips true once and stays true, so entrance animations do not
  replay on every scroll past. Each animated block owns its own observer rather
  than sharing one for the whole section — the growth chart and the stat row are
  ~450px apart, so a single trigger would have run the counters while they were
  still below the fold.
- Line drawing uses `pathLength={1}` on the `<path>`, which renormalises the line
  to a length of 1 whatever its real geometry. A dash of length 1 then covers the
  whole line: `strokeDashoffset: 1` hides it, easing to `0` draws it in from the
  path's start. No `getTotalLength()` measurement needed.
- `useCountUp(target, active)` ticks 0 → target on `requestAnimationFrame` with an
  ease-out. Stats are stored as `{ value: 74, suffix: "K" }` so the number can be
  interpolated and the suffix appended.
- Every animation checks `usePrefersReducedMotion()` and jumps to the finished
  state instead. Keep that up in anything new.
- Counting digits are wrapped in `aria-hidden` with the final value on an
  `aria-label`, so screen readers get "74K" rather than a stream of numbers.

`HowItWorksSection` pins itself while the reader scrolls through its three steps.
The track is `STEPS.length x 100vh` tall and the panel inside it is `sticky
top-0 h-screen`; a scroll listener turns the track's progress into the active
step index. Nothing blocks the wheel — the page scrolls normally the whole time,
it simply has nowhere else to go until the track is used up, so step 03 is always
reached before the next section appears. Blocking scroll with `preventDefault`
would break keyboard, trackpad momentum and assistive tech, so don't.

- Below `lg` there is no pinning at all: every step renders expanded with its own
  screenshot. A tall sticky block is a bad trade on a phone.
- The panel's screenshots are `max-h-full object-contain` inside a `flex-1
  min-h-0` row, so they shrink to fit short viewports instead of clipping
  (verified down to 680px tall).
- The red rail is always present and just changes colour, so text never shifts
  sideways as the active step moves; the body copy is revealed by animating the
  grid row from `0fr` to `1fr`, which gives a height transition for free.

The organizer logo strip is a pure-CSS marquee (`organizer-marquee` keyframes in
`src/index.css`). Two things keep the loop seamless, and both are easy to break:

- The track renders `LOGOS` twice and translates by `-50%`, so it lands exactly
  on the start of the second copy.
- The spacing is a right **margin on each logo**, not `gap` on the flex track.
  With a container `gap` the seam is half a gap short of the internal spacing and
  visibly stutters once per cycle. Verified exact: one copy is 2263px and half
  the track is 2263px at desktop, 1783/1783 at mobile.

It pauses on hover and honours `motion-reduce`. Adding or removing a logo needs
no other change — the maths is all relative.

`useTypewriter(phrases)` drives the rotating red line in the hero. It types a
phrase, holds it for 2s, backspaces it and moves to the next, looping. Two things
worth keeping if you reuse it:

- Every phrase is rendered invisibly in the same CSS grid cell as the live text,
  so the cell is always as large as the longest one and the headline never
  reflows. Measured stable at 613x58 on desktop and 350x77 on mobile across a
  full cycle. Add a phrase and the reservation adjusts on its own.
- The live text is `aria-hidden` with one static phrase in an `sr-only` span, so
  screen readers are not read a stream of keystrokes.

## Known gaps

- **Nothing is interactive.** Every button, nav item and footer link is a `<div>`
  or `<p>` with no handler, `href` or `<button>`. Wiring them up also means
  fixing the semantics (`<a>`, `<button>`, focus states).
- **No mobile menu.** Below `xl` the nav hides the pills, and below `md` the
  search and bell buttons too, so on anything smaller than a large laptop there
  is no way to reach Discover / Tickets / My Events. A hamburger and drawer is
  the missing piece, and it is what would let the pills come back at `lg`.
- `indonesia-map-dots.ts` is ~1.3 MB of the JS bundle. If bundle size starts to
  matter, move it to a static `.svg` in `public/` and render it as an `<img>`.
- The four feature screenshots have real alt text; the remaining images are
  decorative and correctly carry `alt=""`. The hero and how-it-works previews
  are arguably meaningful and could use descriptions too.
- Feature screenshots are finished composites from Figma — the app window with
  its red highlight glow already flattened in — so each card renders exactly one
  image at its own aspect ratio. The export originally drew the highlight a
  second time as a separate positioned layer; those duplicate files now live in
  `design/unused-overlay-layers/`. If you swap a screenshot, use one that is
  already composited, and let the image size itself rather than forcing it into
  a fixed box.
- No git history yet. `git init` before the next round of changes would make all
  of this a lot easier to undo.
