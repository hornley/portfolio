# Project Image Viewer

**Issue:** [#3](https://github.com/hornley/portfolio/issues/3)

**Status:** Approved by the user on 2026-11-26; builder check found no planning-blocking questions.

## Intent

Let visitors inspect project screenshots at full size without leaving the portfolio. The current homepage has nine static project cards and twelve image elements; GestureDeck, Near But Far, and DevCompanion each show two separate screenshots in one card.

## Goals

- Make every project screenshot open a larger view, including each screenshot layered or grouped in the newer cards.
- Show the selected source image uncropped and contained within the viewport.
- Keep the visitor on the same page and preserve their scroll position.
- Provide pointer and keyboard activation, a visible close button, Escape to close, and return focus to the image that opened the view.

## Non-goals

- Add image-to-image navigation, zoom controls, captions, or download controls.
- Open a combined image for multi-image cards; each screenshot opens individually.
- Change project card copy, ordering, image composition, or image files.

## Constraints

- Keep the dependency-free static HTML, CSS, and JavaScript structure.
- Keep all current project images and their alternative text.
- Keep the project grid layout unchanged when the viewer is closed.
- Use browser-native dialog behavior for modal focus handling and Escape dismissal.

## Approaches

1. **Same-page modal dialog — selected.** Open the activated image in a centered overlay. This preserves the page and grid while giving the image room to fit the viewport. The user chose to keep the experience on the same page; using a modal dialog is the implementation call because it meets the full-size viewing request without shifting the grid.
2. **Open the image in a new tab.** This needs less interface code and lets the browser display the source, but takes the visitor away from the portfolio context.
3. **Expand the image in the card.** This keeps the visitor in place, but changes the grid height and gives less room on narrow screens.

## Interaction

- Each project screenshot has a native button trigger with an accessible name describing the larger-view action and the project image.
- Activating a trigger opens a native modal dialog and displays that image's existing source URL and alternative text.
- The dialog image uses contained sizing so the full source is visible without cropping, bounded by the viewport dimensions.
- A visible close button and Escape close the dialog. Closing returns focus to the trigger and leaves the visitor at the same page position.
- For cards with multiple screenshots, each screenshot is a separate trigger and opens its own source image.

## Acceptance criteria

- All twelve current project image elements can be opened from their cards.
- Every opened image fits inside the viewport and is not cropped.
- The viewer stays on the homepage and does not alter the grid after closing.
- Mouse, Enter, and Space activate each image trigger; the visible close button and Escape close the viewer.
- Keyboard focus returns to the image trigger that opened the viewer.
- The viewer remains usable on narrow and wide screens and respects reduced-motion preferences if transitions are used.

## Implementation calls left to the builder

- Keep styling and event handling in the existing `styles.css` and `script.js` files.
- Use a small shared dialog in `index.html`; avoid a dependency or a new route.
- Do not add motion unless it can be disabled for reduced-motion users.
