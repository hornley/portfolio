# Wire Sora Project Image

## Scope

Use the existing `projects/sora/sora_image.png` asset as Sora’s project artwork wherever the scroll-driven project panel is rendered.

## Design

Replace the Sora artwork text fallback in both `index.html` and `projects/index.html` with an image element. Keep the existing Sora variant class and project data attributes so the current JavaScript selection and CSS presentation continue to work unchanged. Use descriptive alternative text consistent with the other project previews.

## Verification

Confirm both HTML files reference the asset with the correct relative path and ensure the referenced file exists. Run a focused diff check after editing.

