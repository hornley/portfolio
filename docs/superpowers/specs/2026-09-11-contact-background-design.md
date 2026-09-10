# Contact Background Design

## Goal

Use `contact/contact_background.png` as the full-viewport background for the homepage contact footer.

## Design

The existing `#contact.site-footer` remains the structural and content container. CSS will apply the supplied image as an edge-to-edge background using centered `cover` sizing, allowing it to fill the footer at different viewport sizes while preserving the current contact copy, email link, spacing, and reveal behavior. No markup or JavaScript changes are needed.

The image's light background is compatible with the current dark text palette, so no overlay is added in this first pass. Existing borders remain in place unless they visibly interfere with the artwork during verification.

## Verification

- Confirm the background declaration points to `contact/contact_background.png`.
- Confirm the contact footer remains at least one viewport high.
- Run a whitespace/style check and inspect the diff for unrelated changes.
