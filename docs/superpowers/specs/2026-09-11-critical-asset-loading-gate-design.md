# Critical Asset Loading Gate

## Context

This portfolio is a dependency-free static site deployed from the repository root. The hero uses five layered avatar images that crossfade as the visitor scrolls, and the projects section uses a large background image. The page should not become interactive until those first-visit visual assets are ready, while below-the-fold media should continue loading without delaying the initial experience.

## Goals

- Preload and decode the five hero avatar images.
- Preload and decode `projects/projects_background.png`.
- Show a lightweight full-screen loading overlay while those six critical assets are preparing.
- Prevent scrolling and interaction until the critical assets are ready.
- Fade the overlay away and unlock the page after the gate completes.
- Keep all other project, achievement, skill, and contact media out of the critical path.
- Remain dependency-free and compatible with the current static Vercel deployment.

## Approach

Add a semantic loading overlay near the start of `body`, with a status label and progress text. Add resource hints for the six critical files in `index.html`. In `script.js`, load the same asset list with `Image` objects, wait for each image's `load` event and `decode()` when supported, then mark the document as ready. The loader will use `Promise.allSettled()` so one failed asset cannot prevent the page from opening.

While the gate is active, a `is-loading` class on `body` locks overflow and a loader backdrop captures pointer input. Once complete, the class changes to `is-ready`; CSS fades the overlay out and removes it from hit testing. A bounded fallback timeout ensures a slow network cannot leave the site permanently locked. The existing `prefers-reduced-motion` behavior will also disable the loader transition for users who request reduced motion.

## Critical asset list

- `avatars/silhouette.png`
- `avatars/drawn.png`
- `avatars/colorless.png`
- `avatars/glitched.png`
- `avatars/clean.png`
- `projects/projects_background.png`

## Failure and accessibility behavior

- A failed image is treated as settled so the rest of the page remains usable.
- The fallback timeout releases the page if the browser cannot settle the asset promises.
- The overlay is marked with `role="status"` and `aria-live="polite"`.
- The page uses `aria-busy="true"` while loading and changes it to `false` when ready.
- Keyboard and pointer interaction remain blocked only during the short critical loading phase.
- Reduced-motion users receive an immediate state change without a fade animation.

## Verification

- Confirm the critical asset URLs resolve from the repository root.
- Run a local static server and check that the loader appears before readiness and disappears afterward.
- Confirm scrolling and navigation work after the gate unlocks.
- Confirm a missing critical asset and a slow load cannot permanently lock the page.
- Run `git diff --check` and inspect the final diff.
