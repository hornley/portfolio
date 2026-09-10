# Scroll-Driven Projects Route Design

## Status

Approved direction for a separate `/projects/` prototype route.

## Goal

Turn the selected projects experience into a scroll-controlled lap around a stylized Suzuka-inspired circuit. The visitor scrolls through one continuous lap; a small F1-style car follows the circuit, checkpoints map to projects, and a stable project panel changes as the car reaches each checkpoint.

The route is a testable prototype separate from the existing home page.

## Design read

This is a motion-led developer portfolio route for clients and hiring managers, using a restrained editorial system with a subtle racing metaphor rather than a game HUD.

Design dials: `DESIGN_VARIANCE 7`, `MOTION_INTENSITY 7`, `VISUAL_DENSITY 3`.

## Reference and boundaries

- Use the Japanese Grand Prix / Suzuka reference for circuit identity and sector rhythm only.
- Do not copy Red Bull Racing branding, logos, imagery, or page assets.
- Use an original inline SVG circuit path and an original minimal car mark.
- Keep the existing portfolio palette: off-white paper, near-black ink, and one cobalt-blue accent.
- Use the current four projects only: Zeni, Kairo, AyudaPay, and SulatBaybayin.

## Route and architecture

Create a static route at `projects/index.html`, served as `/projects/` by the current dependency-free static setup.

The route owns its own `projects/styles.css` and `projects/script.js` so the experiment can evolve without destabilizing the existing home page. The root page may link to the new route, but its existing layout remains unchanged.

Components are represented as small DOM responsibilities:

- `projects-race`: tall scroll container that defines lap progress.
- `projects-race__sticky`: the fixed visual viewport.
- `track-stage`: inline SVG circuit, progress line, checkpoints, and car.
- `project-panel`: stable reading zone for active project content.
- `race-progress`: sector status and progress line.
- `lap-complete`: final state after the last checkpoint.

## Scroll model

- Desktop race section height: approximately `620vh`.
- Mobile race section height: approximately `500vh`.
- Sticky viewport: `100dvh` with a minimum height of `100dvh`.
- Scroll progress is calculated from the race section’s top and total scrollable height.
- The car position is continuously interpolated with `requestAnimationFrame` from the SVG path’s total length.
- The completed portion of the circuit uses the same path with a changing `stroke-dashoffset`.
- Backward scrolling reverses car movement, track progress, active checkpoint, card transitions, and the final lap state naturally.

## Checkpoints and project sequence

The prototype uses four checkpoints:

| Checkpoint | Project | Progress center |
| --- | --- | --- |
| 01 | Zeni | 0.14 |
| 02 | Kairo | 0.38 |
| 03 | AyudaPay | 0.62 |
| 04 | SulatBaybayin | 0.84 |

The active project changes at the midpoint between neighboring checkpoint progress values. This makes each project readable over a stable scroll interval while the car continues moving.

AyudaPay displays the requested achievement label directly beneath its name:

```text
🏆 Champion — Hack-it-UP 2026 · UP SoComSci
```

## Composition

Desktop:

- The track occupies the visual background and right/center field.
- The project panel remains in a readable 32–40% zone, separate from the car.
- When the car crosses to the opposite side of the circuit, the panel can flip sides by toggling a layout class; it never attaches to or chases the car.
- Unvisited track is a pale neutral line.
- Completed track is cobalt blue.
- Checkpoints enlarge and become cobalt when active.

Mobile:

- The circuit occupies the upper 40–45% of the sticky viewport.
- The project panel occupies the lower area.
- The desktop side-flip is disabled; content remains stable below the track.
- Track labels and progress controls remain touch-safe and readable.

## Project panel behavior

The panel changes content at checkpoints with a short opacity/translate transition:

- sector number and project number;
- project name;
- category;
- short verified description where available;
- project link only when a real URL exists;
- a clear muted state for links that still need to be supplied.

The panel uses `aria-live="polite"` so the active project change is announced without interrupting the user. The car remains continuously animated while panel content changes.

## Lap completion

After approximately 94% progress:

- the finish line becomes active;
- the panel changes to `LAP COMPLETE`;
- the route shows `04 projects / 02 wins`;
- a GitHub/contact CTA is shown only when a real destination is available;
- the sticky route releases at the end of the section.

## Reduced motion and fallback

- With `prefers-reduced-motion: reduce`, the sticky composition remains usable but the car and panel transitions are minimized.
- If `IntersectionObserver` or SVG path measurement is unavailable, the content remains available in a visible ordered fallback list.
- The route must not rely on hover for core information.

## Verification criteria

1. `/projects/` loads independently from the existing home page.
2. The route contains an inline Suzuka-inspired circuit and a visible car.
3. The car moves continuously along the circuit as the user scrolls.
4. The completed track visibly follows scroll progress.
5. Four checkpoints map to Zeni, Kairo, AyudaPay, and SulatBaybayin.
6. Project content changes near checkpoints without attaching the card to the car.
7. Reverse scrolling reverses the interaction correctly.
8. Desktop card side-flipping does not reduce readability.
9. Mobile uses a stacked track-then-card composition.
10. AyudaPay carries its champion label and no unverified external URL is invented.
11. Reduced-motion users receive a readable non-cinematic version.
12. The route has a visible final lap-complete state.
