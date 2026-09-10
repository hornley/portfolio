# Achievements Focus Frame Refinement

## Status

Approved design for refining the focused achievement state inside the existing homepage Wins film sequence. This refinement changes only the focused-frame composition; it does not change the semicircular film path, scroll timeline, travel behavior, neighboring frames, or `/projects/`.

## Goal

Make a focused achievement feel like one cohesive editorial film frame rather than a photograph paired with a separate caption. The winning image, black film material, sprocket holes, typography, and technical metadata should remain part of the same camera-transformed composition.

## Existing context

- The homepage `#wins` section already owns a pinned, full-viewport SVG film sequence.
- The ribbon and all film frames are positioned from one open 180-degree SVG path.
- The controller already distinguishes travel from focal zoom/focus/zoom-out stages and supports reverse scrolling.
- The current visible achievement detail is an absolutely positioned HTML article below/over the stage. It creates a visually separate metadata block and must be removed from the enhanced visual composition.
- The project uses existing paper, ink, muted, line, and cobalt-blue design tokens.

## Design direction

Use an SVG `foreignObject` focus layer generated inside each achievement's focal frame group. Because the layer is a child of the same frame that contains the photo and is inside `#achievements-camera`, it automatically follows the existing frame tangent, travel offset, and camera zoom. No second screen-coordinate positioning system is introduced.

The focused frame remains a complete piece of film:

- the black shell stays visible around the photograph;
- sprocket holes remain clearly visible above and below the photograph;
- the photograph remains the dominant surface;
- the title and achievement details overlap the lower-left portion of the photograph and extend naturally toward the lower film edge;
- small metadata sits close to the inner top and bottom edges;
- no gray rectangle, panel, card, or large empty area is used.

The HACK-IT-UP reference establishes the visual hierarchy, while the same data-driven template is used for ACM-Comp and CodeKada. Per-achievement copy offsets are allowed in the manifest only when needed to avoid faces or other important image content.

## Focus-frame composition

Each focal frame gets one focus layer with these logical regions:

```text
top inner edge:       achievement mark                 event date

photo lower-left:     DISPLAY TITLE
                      YEAR
                      CHAMPION
                      team / project context
                      event format or organizer context

bottom inner edge:    organization                   frame identifier
```

The title is rendered in a large, bold, off-white display treatment. The year is stacked beneath it. `CHAMPION` uses the existing cobalt accent and sits immediately below the title block, followed by the data-defined context and event lines. The title block is anchored in the lower-left of the image, with data-defined offsets available for the certificate images and the group photograph.

Metadata remains small, uppercase, and low contrast relative to the title. It uses the existing values such as `03A`, `16 MAY 2026`, `UP SOCOMSCI`, and `FRAME 024`, positioned around the inner black film edges rather than in a separate footer.

The overlay is revealed only as the active frame reaches its focus state. It uses the current focus opacity timing while remaining at zero once zoom-out begins, so details disappear immediately when leaving the achievement. The frame and camera continue to use the existing scroll stages without changes to their sequencing.

## SVG and camera implementation

The frame builder will create a `foreignObject` only for focal frames. Its HTML content is populated from the achievement manifest and styled with a dedicated focus-layer class. The layer is transparent except for its text, allowing the photo, shell, and holes to remain visible beneath/around it.

The focus camera will receive a small scale increase and the active focal frame may receive a modest local emphasis scale. The maximum zoom remains bounded so the full film border and both rows of sprocket holes remain visible at focus, matching the supplied focal-photo reference rather than filling the viewport with only the image.

The grain treatment is static and subtle. Add a lightweight SVG pattern or equivalent texture to the black film shell/ribbon surface only. Do not apply turbulence, blur, or grain to the photo image. The texture must not introduce an animated effect or materially increase the number of expensive filters applied during scroll.

## Responsive behavior

Desktop keeps the existing oversized, cropped semicircle and uses the same focus layer dimensions in SVG coordinates. The editorial copy is large enough to read at maximum focus but remains inside the frame's lower-left safe region.

Mobile keeps the same open semicircular geometry and camera behavior. The focus layer uses smaller typography and safe-area-aware offsets. Achievement-specific copy offsets remain data-driven, and the copy must not be allowed to drift over known focal faces as the viewport changes.

No responsive branch changes the path, normalized progress model, travel windows, or focus stage boundaries.

## Accessibility and fallback

The visual `foreignObject` layer remains presentation-only because the main SVG viewport is decorative. The existing HTML achievement detail article remains in the DOM as a visually clipped semantic/live region for enhanced mode, and the ordered achievement fallback remains available for reduced-motion mode or controller failure. The enhanced mode must not leave a visible empty detail block.

Meaningful image alternative text continues to come from the achievement manifest. The detail article updates only on achievement changes, not for every travel frame.

## Error handling

- If a focal image fails, the existing frame placeholder/error behavior remains available and the focus layer still provides achievement text.
- If `foreignObject` content cannot render, the semantic HTML detail/fallback content still exposes the achievement information.
- If the scroll controller cannot initialize, the static reduced-motion/fallback presentation remains navigable.

## Verification criteria

1. The enhanced focused state has no visible external detail block beneath or beside the focal frame.
2. The focus title, year, result, context, event, and metadata are rendered inside the focal film frame through the SVG camera hierarchy.
3. The HACK-IT-UP title is large, bold, lower-left, and stacked with `2026` without covering important faces.
4. ACM-Comp and CodeKada use the same data-driven focus treatment, with only necessary safe-position overrides.
5. `CHAMPION` uses cobalt blue; the remaining detail uses the existing paper/ink treatment.
6. The photo remains dominant and the complete black film border plus top and bottom sprocket holes remain visible during focus.
7. The technical metadata is subtle and located around the inner film edges.
8. Grain is visible only as a restrained texture on black film material, never as an overlay on the photograph.
9. Focus detail is visible during focus and has zero opacity immediately when zoom-out begins.
10. Film path geometry, travel/focus stage boundaries, reverse scrolling, neighboring frames, and the `/projects/` route are unchanged.
11. `node --check script.js`, targeted `git diff --check`, and a local desktop/mobile visual pass succeed.

## Scope

Files expected to change:

- `index.html`: only if the existing semantic detail markup needs a small accessibility/visual-state hook.
- `styles.css`: focus-layer layout, metadata typography, shell texture, enhanced-mode clipping, and responsive adjustments.
- `script.js`: data-driven `foreignObject` creation, focus-layer opacity/position updates, and modest focus emphasis values.

No new route or changes to the Projects experience are included.
