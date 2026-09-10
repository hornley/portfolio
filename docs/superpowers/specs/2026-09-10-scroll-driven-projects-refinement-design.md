# Scroll-Driven Projects Refinement Design

## Status

Approved focused pass for the `/projects/` route.

## Intent

Keep the existing scroll/motion-path architecture while reducing the visual language to three dominant elements: the active project, the Suzuka-inspired circuit, and the moving car.

The route should feel like an editorial portfolio using an F1 lap as navigation, not like a race dashboard.

## Preserve

- `/projects/` route.
- Sticky viewport and tall scroll section.
- Inline SVG Suzuka-inspired circuit.
- Continuous scroll-driven car motion along the existing SVG path.
- Cobalt completed-track trail.
- Checkpoint-driven project switching.
- Mobile stacked track and project composition.
- Lap-complete ending state.
- Temporary abstract artwork until real project screenshots are provided.

## Motion correctness

The completed trail and car share one normalized `progress` value. The gray circuit is the only authored SVG path. The blue trail is a `<use>` of that exact path, while the car and checkpoints sample that same path geometry. The car uses the shared value to sample the path, and the completed path uses the actual SVG geometry length for its dash array and offset.

This is a hard invariant: the endpoint of the blue trail must coincide with the center of the car at every scroll position, including after responsive SVG resizing. There must be no disconnected blue segments ahead of the car. No mobile-only progress values, arbitrary offsets, checkpoint corrections, or manually tuned trail percentages are allowed.

Verify the invariant at 0%, 10%, 25%, 50%, 75%, 90%, and 100% on desktop and mobile, including after resize. At 0% the trail is invisible; at 100% the entire circuit is blue.

## Composition pass

The race viewport and track stage become full-viewport elements rather than being constrained by the centered page container. The sticky race layer uses the full browser width, while the project panel keeps a comfortable left margin and occupies substantially more of the left side.

The current circuit scale and overall right-side composition are preserved. The larger stage gives the circuit room to render without being clipped by the page container; it should remain visually dominant and recognizable, with only the existing intentional edge bleed.

The project panel is a flat editorial block with no rounded corners, floating shadow, glass effect, or dashboard chrome. Its internal order is:

```text
large project artwork / preview
centered project title
award line, when applicable
category
short description
project link
```

The panel remains fixed on the left on desktop and stacks below the track on mobile. Its position does not change between projects.

## Simplify

- Keep the project panel permanently on the left on desktop; remove dynamic side switching.
- Give the circuit the visual majority on the right and allow the track to bleed/crop outside the viewport.
- Remove `ON TRACK`, numeric scroll percentage, duplicate lap/status labels, progress HUD, and other dashboard-like readouts.
- Reduce checkpoint markers to small numbered dots.
- Replace the permanent `01—04` background text with a dynamic ghosted current number that transitions `01 → 02 → 03 → 04`.
- Keep the oversized ghosted `SUZUKA` wordmark.
- Reduce the car graphic and remove the drop shadow so it reads as a flat black/white/electric-blue editorial mark.

## Project artwork

The left panel includes a large artwork slot above the project content. For this draft, the slot uses the existing abstract portfolio preview language as a temporary fallback. It is structured so a real project screenshot or uploaded artwork can replace the fallback without changing the scroll architecture.

Each active project includes:

- project number;
- title;
- award line, when applicable;
- category;
- verified description where available;
- project link or an honest muted missing-link state;
- project-specific artwork slot above the title.

The artwork and text fade/translate together at checkpoint changes rather than being replaced abruptly. Long titles such as SulatBaybayin must remain readable without colliding with the artwork or metadata.

## Car smoke

Add a restrained smoke group behind the car, inside the `#race-car` group and before the car body. Smoke puffs use muted gray/off-white fills, remain subordinate to the track and project panel, and rotate with the car because they are positioned in the car's local coordinate system. Reduced-motion mode disables the smoke animation while preserving the car and trail fallback behavior.

## Visual hierarchy

Desktop composition:

```text
LEFT EDITORIAL PANEL              RIGHT / CROPPED CIRCUIT
large project artwork             Suzuka path
centered project title            blue completed trail
award + category + description    small car with smoke
project link                      numbered checkpoint dots
```

The track is intentionally oversized and cropped. The card remains readable and stable while the circuit supplies movement and spatial drama.

## Interaction behavior

- Scroll progress continues to drive one continuous car path.
- Project index still changes at the existing checkpoint boundaries.
- Panel text and artwork receive the existing short crossfade/translate transition.
- Ghost number transitions at the same checkpoint as the panel.
- Reverse scrolling reverses the same transitions naturally.
- On mobile, the panel remains below the track and does not flip sides.
- The full-width stage must not introduce a second motion coordinate system; responsive layout changes affect presentation only, not normalized path progress.

## Accessibility and fallback

- Keep `aria-live="polite"` on the active project panel.
- Keep reduced-motion support; content updates instantly and the car can remain static.
- Checkpoint dots remain decorative because the project panel carries the readable project content.
- Project artwork remains decorative until real screenshots are supplied.

## Verification criteria

1. The existing motion-path and sticky scroll behavior still works.
2. At 0%, 10%, 25%, 50%, 75%, and 100% progress, the completed trail ends at the car center.
3. The same car/trail invariant holds on desktop and mobile layouts.
4. The project panel never moves from the left side on desktop.
5. The track is visually dominant and visibly cropped/bleeding on desktop while remaining recognizable as Suzuka.
6. Dashboard-like status, percentage, and duplicate progress UI are removed.
7. Checkpoints are small numbered dots with the blue completed trail preserved.
8. Ghosted current project number changes with the active project and stays secondary to `SUZUKA`.
9. `SUZUKA` remains visible as oversized ghost typography.
10. The car is smaller and flatter while remaining visible along the path.
11. Every project has a distinct, large artwork slot above its content.
12. Panel artwork and text transition together at checkpoints.
13. Real future screenshots can replace the artwork slots without changing scroll logic.
14. The car has restrained rear smoke, with animation disabled for reduced motion.
15. Mobile remains readable and reduced-motion behavior still works.
