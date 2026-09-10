# Contact Section Layout Design

## Goal

Align the homepage contact section with `contact/final_contact_ref.png`. The former background asset is retained as `contact/sora_contact_background.png` for possible future use while a replacement contact background is prepared.

## Scope

The contact footer will contain only the reference layout's content: the project heading and supporting copy, GitHub/LinkedIn/email contact links, and a back-to-top link. The `Hey, Sora` action button is hidden for now. The Sora visualization and decorative cross elements remain in the retained reference asset and will not be recreated in HTML or CSS.

The existing footer structure will be adapted rather than replaced. The top area uses a responsive two-column layout: copy on the left and the button aligned beside the artwork on the right. A horizontal divider separates that area from the bottom contact navigation. The bottom row uses three contact links on the left and the back-to-top action on the right. On narrow screens, the layout collapses into a single column while retaining the same reading order and usable touch targets.

The button is a presentational contact affordance for this pass and does not introduce a new external integration. Existing reveal animations may remain attached to the content, but the layout must remain usable if animation is reduced or unavailable.

## Verification

- Confirm only the requested contact elements are rendered.
- Confirm all links have meaningful labels and valid destinations.
- Confirm the layout is responsive and does not duplicate background artwork.
- Run `git diff --check` and inspect the final diff for unrelated changes.
