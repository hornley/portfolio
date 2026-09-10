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
- Responsive track/project composition with the track stage using the full available width.
- Mobile track-above-card composition.
- Lap-complete ending state.
- Temporary abstract artwork until real project screenshots are provided.
- Car smoke deferred for a future visual pass.

## Motion correctness

The completed trail and car share one normalized `progress` value. The gray circuit is the only authored SVG path. The blue trail is a `<use>` of that exact path, while the car and checkpoints sample that same path geometry. The car uses the shared value to sample the path, and the completed path uses the actual SVG geometry length for its dash array and offset.

This is a hard invariant: the endpoint of the blue trail must coincide with the center of the car at every scroll position, including after responsive SVG resizing. There must be no disconnected blue segments ahead of the car. No mobile-only progress values, arbitrary offsets, checkpoint corrections, or manually tuned trail percentages are allowed.

Verify the invariant at 0%, 10%, 25%, 50%, 75%, 90%, and 100% on desktop and mobile, including after resize. At 0% the trail is invisible; at 100% the entire circuit is blue.

The normalized scroll mapping includes one shared, small boundary buffer at both ends of the race section. The car and completed trail hold at the path origin briefly before motion begins, and hold at the finish briefly before the sticky section releases. The buffer is the same on desktop and mobile and does not alter the canonical path progress once the lap is active.

## Track-stage width

The `.track-stage` container must no longer be constrained to the narrower content width used in the current draft. It should expand to use the full available viewport width within the page's outer margins. The sticky race layer and track canvas must not be sized by the project-card column.

This is required so more of the Suzuka circuit remains visible, the circuit is not clipped by an unnecessarily narrow wrapper, the left project card can grow without forcing the track offscreen, and the full desktop width can be used for the project-card-plus-circuit composition. Responsive resizing must change presentation only, not the normalized path progress or motion-path source.

The current circuit scale and overall right-side composition are preserved. The larger stage should allow most of the Suzuka circuit to remain visible without shrinking it excessively. Cropping must be minimal and intentional, caused by the viewport composition rather than by a too-narrow track-stage wrapper.

## Project panel composition

The active project panel should occupy a substantially larger portion of the left side of the viewport, with comfortable outer margins so it feels editorial rather than boxed-in. It should read as the primary featured project card, not a small metadata panel.

The project panel remains a flat editorial block with no rounded corners, floating shadow, glass effect, or dashboard chrome. Its internal order is:

```text
large project artwork / preview
left-aligned project title
award line, when applicable
category
short description
project link / directional CTA
```

The image preview is the dominant visual element and uses most of the card width. The image may be centered or full-width within its slot, but the title, award, category, description, and link remain left-aligned to preserve the portfolio's editorial language.

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
- project-specific artwork slot above the title, using most of the card width.

The artwork and text fade/translate together at checkpoint changes rather than being replaced abruptly. Long titles such as SulatBaybayin must remain readable without colliding with the artwork or metadata.

## Deferred car smoke

Smoke is intentionally excluded from the current implementation so the car/path alignment can remain easy to evaluate. In a future visual pass, add a restrained smoke group behind the car, inside the `#race-car` group and before the car body. Smoke puffs should use muted gray/off-white fills, remain subordinate to the track and project panel, rotate with the car because they are positioned in the car's local coordinate system, dissipate quickly, scale down on mobile, and become static or disabled for reduced motion.

## Visual hierarchy

Desktop composition:

```text
LARGE LEFT FEATURE CARD           FULL-WIDTH CIRCUIT STAGE
large project artwork             Suzuka path
left-aligned project title        blue completed trail
award + category + description    small car with smoke
project link                      numbered checkpoint dots
```

The track remains large and visually important, but cropping is minimal and intentional. Expanding the track stage should allow most of the Suzuka circuit to remain visible without shrinking it excessively. The card remains readable and stable while the circuit supplies movement and spatial drama.

## Interaction behavior

- Scroll progress continues to drive one continuous car path.
- A small shared start/end buffer prevents the car, trail, and project transition from activating or ending abruptly at the section boundaries.
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
2. At 0%, 10%, 25%, 50%, 75%, 90%, and 100% progress, the completed trail ends at the car center.
3. The same car/trail invariant holds on desktop and mobile layouts.
4. The project panel never moves from the left side on desktop.
5. The track remains large and visually important while most of the Suzuka circuit remains visible and recognizable; any cropping is minimal and intentional.
6. Dashboard-like status, percentage, and duplicate progress UI are removed.
7. Checkpoints are small numbered dots with the blue completed trail preserved.
8. Ghosted current project number changes with the active project and stays secondary to `SUZUKA`.
9. `SUZUKA` remains visible as oversized ghost typography.
10. The car is smaller and flatter while remaining visible along the path.
11. Every project has a distinct, large artwork slot above its content.
12. Panel artwork and text transition together at checkpoints.
13. Real future screenshots can replace the artwork slots without changing scroll logic.
14. Car smoke is deferred and is not present in the current implementation.
15. Mobile remains readable and reduced-motion behavior still works.
16. The track stage uses the full available viewport width within the page margins and is not constrained by the project-card width.
17. The active project card is substantially larger than the previous draft and visually occupies the left side as a primary portfolio feature.
18. The project image preview is the dominant visual element inside the project card.
19. Project card hierarchy is image, title, award/meta, category, description, then project CTA.
20. Track cropping occurs only because of deliberate viewport composition, not because the track-stage wrapper is too narrow.
21. Future car smoke must originate behind the car, follow its orientation, dissipate quickly, and never obscure track checkpoints or project content.
22. The car and trail hold briefly at the path origin before moving and at the finish before the sticky section releases.
23. The same normalized start/end buffer is used on desktop and mobile without separate progress corrections.
