# Scroll-Driven Achievements Film Design

## Status

Approved design for replacing the homepage `#wins` list with a scroll-driven achievements film sequence. This document defines the implementation boundary and behavior; it does not implement the feature.

## Goal

Turn the homepage Wins section into one full-viewport cinematic sequence. The visitor scrolls through a single open 180-degree film arc containing photographs from three achievements. Supporting photographs roll along the arc; a designated focal photograph for each achievement pauses at the arc's focal point, then receives a camera-style zoom and a restrained achievement overlay before the film resumes.

The existing `Wins` navigation item continues to link to `#wins`. No `/achievements/` route is created.

## Existing context

- The homepage currently contains a normal two-row `.wins-list` inside `#wins`.
- The homepage `script.js` already owns the menu toggle and generic reveal observer.
- The separate `/projects/` route demonstrates the required scroll architecture: a tall section, a `100dvh` sticky stage, normalized scroll progress, `requestAnimationFrame` rendering, and reduced-motion handling.
- The homepage keeps its existing paper, ink, muted, line, and cobalt-blue design tokens.

## Design direction

Use an SVG-first film camera rather than a carousel or a collection of independently transformed cards.

The scene contains one mathematically defined, open 180-degree arc. A continuous film ribbon follows that path. Each photo frame is an SVG group positioned from the same path geometry and rotated to the path tangent. This guarantees that the frames physically follow the ribbon during travel and prevents the arc from becoming a loosely arranged ring.

The arc is intentionally oversized and cropped by the viewport. Only approximately 40–60% of the full semicircle needs to be visible at once. The film should feel like a large physical strip passing through the viewport, not like a complete reel or a carousel component.

Film details remain restrained: a dark ribbon, frame borders, and subtle sprocket holes are sufficient. No projector, transport controls, film icons, fake timestamps, or dashboard UI are included.

## Homepage structure

Replace the current Wins heading and two-row list with this structure:

```text
#wins
  .achievements-scroll
    .achievements-sticky
      .achievements-intro
      .achievements-film-viewport
        .achievements-film-world
          SVG film path and frame groups
      .achievement-detail
      accessible ordered fallback content
```

`#wins` becomes a full-bleed section that breaks out of `.site-shell` using the existing viewport breakout pattern:

- `width: 100vw`;
- `margin-left: calc(50% - 50vw)`;
- no dependency on the shell's `max-width` for the visual stage.

`.achievements-scroll` defines the scroll distance. `.achievements-sticky` is `position: sticky`, `top: 0`, `width: 100vw`, `height: 100dvh`, and `overflow: hidden`. Because the outer section remains in normal document flow, the Skills section cannot appear until the film sequence reaches its final progress and the sticky stage releases.

The opening contains only:

```text
02 / WINS
ACHIEVEMENTS
```

“Moments worth remembering.” remains optional and should only be added if the composition needs a small supporting line after visual testing.

## Content order and data model

The default chronological order is:

1. ACM-Comp — 2024
2. CodeKada — 2025
3. Hack-It-UP — 2026

Achievement content is data-driven. Each entry owns its metadata, ordered image manifest, and focal image reference. The browser does not enumerate directories; the manifest lists the actual filenames added to each folder.

The initial metadata is:

| Slug | Title | Result | Context | Date |
| --- | --- | --- | --- | --- |
| `acm-comp` | Code Relay Competition | Champion | ACM Org · Team M.J.P.T.B. | November 27, 2024 |
| `codekada` | CodeKada 2025 | Champion | Rekado Lens · Sci-Coders | November 8, 2025 |
| `hack-it-up` | Hack-It-UP 2026 | Champion | AyudaPay Stellar · 48-Hour Hackathon | May 16, 2026 |

Images are supplied under:

```text
achievements/acm-comp/
achievements/codekada/
achievements/hack-it-up/
```

Each event uses a data-defined total frame count, including one designated focal/winning frame. The approved initial counts are three frames for ACM-Comp, six for CodeKada, and six for Hack-It-UP. Supporting images are ordered as `photo_1.jpeg`, `photo_2.jpeg`, and so on. The focal filename is `focal_photo.jpeg` for ACM-Comp and Hack-It-UP, and `focal_photo.png` for CodeKada. The number of frames is independent of the number of achievements, so each event can still be expanded later without changing the scroll architecture.

The detail model supports an optional one-sentence summary. No unsupported summary text should be invented when the supplied achievement information does not include one.

## Scroll model and timeline

The controller uses one normalized progress value from `0` to `1`, calculated from the `#wins` section bounds. Rendering is scheduled with `requestAnimationFrame`, matching the existing projects route pattern. Reverse scrolling uses the same mapping in reverse, so travel, zoom, overlays, and image transitions unwind naturally.

The initial scroll-distance targets are intentionally shorter than the earlier 900vh proposal:

- Desktop baseline: `660vh`.
- Mobile baseline: `600vh`.

These values may be tuned within the requested ranges of `600–700vh` on desktop and `550–650vh` on mobile after interaction testing. The stage percentages remain stable while the total height is tuned.

| Progress | Stage | Film behavior |
| --- | --- | --- |
| `0.00–0.08` | Opening | Intro is visible; film is already present and quiet |
| `0.08–0.18` | Travel to ACM-Comp | Film ribbon and frames roll along the arc |
| `0.18–0.20` | ACM settle | Film reaches the focal position and stops |
| `0.20–0.27` | ACM zoom-in | Camera moves toward the fixed focal frame; no film travel |
| `0.27–0.32` | ACM focus | Full-size image and minimal detail overlay remain readable |
| `0.32–0.36` | ACM zoom-out | Camera returns to the film-scale frame; no film travel |
| `0.36–0.46` | Travel to CodeKada | Film resumes rolling toward the next focal frame |
| `0.46–0.48` | CodeKada settle | Film stops at the focal frame |
| `0.48–0.55` | CodeKada zoom-in | Camera zooms into the fixed frame |
| `0.55–0.60` | CodeKada focus | Detail overlay remains readable |
| `0.60–0.64` | CodeKada zoom-out | Camera returns to the film-scale frame |
| `0.64–0.74` | Travel to Hack-It-UP | Film resumes rolling |
| `0.74–0.76` | Hack-It-UP settle | Film stops at the focal frame |
| `0.76–0.83` | Hack-It-UP zoom-in | Camera zooms into the fixed frame |
| `0.83–0.88` | Hack-It-UP focus | Detail overlay remains readable |
| `0.88–0.92` | Hack-It-UP zoom-out | Camera returns to the film-scale frame |
| `0.92–1.00` | Exit | Final frames continue through the viewport; sticky stage releases |

Film movement is allowed only during the three travel windows. It is completely paused during each settle, zoom-in, focus, and zoom-out window. The camera transform is the only changing visual motion during focus sequences.

## SVG geometry and camera behavior

The implementation will define one open SVG path representing an exact upper-facing 180-degree arc. The path will not close back onto itself and will not include a second loop.

The ribbon and frames share this geometry:

- the ribbon follows the SVG arc as a visible continuous band;
- every frame samples a point along that same arc;
- every frame rotates to the local tangent angle;
- travel changes the shared frame offset along the arc;
- frame spacing remains consistent through responsive resizing.

The scene is rendered inside an inner film-world transform. During a focus sequence, the controller calculates the focal frame's coordinates and translates/scales the film world so that the frame reaches the viewport's focus point. The image grows from film-frame scale to a large viewport image. Frame borders and sprocket details fade as the photo becomes dominant. The detail overlay is rendered outside the transformed film world so it remains crisp and readable.

The focal frame should occupy most of the viewport at maximum zoom without requiring horizontal panning. The photo remains the visual priority; the detail overlay is minimal and uses the existing typography and cobalt accent.

## Responsive composition

Desktop:

- The semicircle is larger than the viewport and intentionally cropped.
- The arc's focal point sits near the visual center after the intro fades.
- Approximately five to seven frames can be visible during travel.
- The detail overlay sits in a stable lower or side region and does not follow the film.

Mobile:

- The stage remains `100dvh` and full-width.
- The same open 180-degree geometry is retained rather than switching to a carousel.
- The arc is taller and more aggressively cropped.
- Fewer frames are visible at once.
- The detail overlay occupies a stable lower region with safe-area spacing and does not cover the focal photo's important content.

No layout decision should introduce a second motion coordinate system. Responsive changes affect presentation and scale only; the normalized progress and shared SVG path remain authoritative.

## Accessibility and reduced motion

- The navigation link remains `href="#wins"`.
- Achievement images receive meaningful alt text derived from their event and frame description.
- Achievement details are available in the DOM as an ordered fallback, not only through visual animation.
- The active detail region may use `aria-live="polite"`, but updates must not repeatedly announce every travel frame.
- The animation must not rely on hover or pointer input.
- With `prefers-reduced-motion: reduce`, the long scroll-driven camera sequence is disabled. The section becomes a static, readable achievement composition with the film arc and all three achievement details available in order.
- If the scroll controller cannot initialize, the static fallback remains visible and the homepage remains navigable.

## Files in scope for implementation

- `index.html`: replace the current `#wins` markup while preserving the existing navigation target.
- `styles.css`: remove the normal `.wins-list` presentation and add the full-bleed sticky film-stage styles, responsive geometry, focus overlay, and reduced-motion fallback.
- `script.js`: add a guarded achievements controller alongside the existing menu and reveal behavior. It owns normalized progress, frame placement, travel offsets, camera zoom phases, active detail content, resize handling, and fallback behavior.
- `achievements/acm-comp/`, `achievements/codekada/`, and `achievements/hack-it-up/`: user-supplied photos referenced by the data manifest.

The `/projects/` route is not modified by this feature.

## Non-goals

- No separate `/achievements/` route.
- No carousel controls, autoplay timer, or pointer-driven gallery.
- No complete film reel, circular orbit, or closed path.
- No movie/projector theme or dashboard controls.
- No changes to the existing Projects route.
- No invented achievement links, summaries, organizers, or image filenames.

## Verification criteria

1. The `Wins` nav item still lands on `#wins`.
2. `#wins` renders as a full `100vw × 100dvh` sticky stage.
3. The next homepage section remains hidden until the sequence reaches its final progress.
4. The film is a visibly open 180-degree arc with no closed loop.
5. The ribbon and every frame use the same SVG path geometry.
6. Supporting frames roll only during travel stages.
7. Film movement is completely paused during settle, zoom, and focus stages.
8. Each focal frame receives a camera-style zoom and a restrained achievement overlay.
9. The chronological sequence is ACM-Comp, CodeKada, then Hack-It-UP.
10. The stage starts near 660vh desktop and 600vh mobile, with tuning kept inside the approved ranges.
11. The arc remains intentionally oversized and cropped on desktop and mobile.
12. Reverse scrolling reverses the sequence without desynchronizing the film and camera.
13. The three achievement folders are represented by an explicit data/image manifest.
14. Reduced-motion users receive a complete static fallback with all achievement details.
15. The existing homepage header, project section, skills section, footer, and `/projects/` route remain intact.
