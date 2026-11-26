# Project Image Viewer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `workflow-implementation` to implement this plan with subagent delegation. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let visitors open any project screenshot in a same-page, uncropped modal viewer.

**Architecture:** Keep the nine project cards as static HTML. Make each of their twelve screenshots a native button trigger and add one native `<dialog>` to the homepage. A delegated handler copies the selected image's source and alternative text into the dialog; CSS contains the image within the viewport.

**Tech Stack:** Static HTML, CSS, JavaScript, and the browser's native dialog element.

**Spec:** `docs/superpowers/specs/2026-11-26-project-image-viewer-design.md`

## Global Constraints

- Support all twelve image elements across the nine project cards.
- Keep each screenshot in the page; screenshots in multi-image cards open individually.
- Keep the displayed source image uncropped and within the viewport.
- Keep the portfolio page and its scroll position when the viewer opens and closes.
- Use native buttons, a visible close button, Escape, and restore focus to the opening trigger.
- Preserve existing image URLs, alternative text, lazy loading, card order, copy, and composition.
- Add no dependencies, routes, zoom controls, captions, or image navigation.
- Add no motion; if any is introduced, it must respect reduced-motion preferences.

## Review Focus

- Each screenshot in the layered cards must open its own source image; check all six triggers across those three cards.
- A trigger button must not change the card's 16:10 frame or overlay placement; compare the grid before and after wrapping its images.
- Enter and Space must open the dialog; Escape and the visible close button must close it.
- Closing must return focus to the same trigger and preserve the visitor's scroll position.
- Portrait and landscape images must remain uncropped and fit both a narrow viewport and a desktop viewport.

## File Map

| Path | Responsibility |
| --- | --- |
| `index.html` | Wrap all twelve project screenshots in accessible button triggers and add one shared image dialog. |
| `styles.css` | Preserve card media geometry through the new wrappers; style focus, dialog backdrop, close button, and contained image sizing. |
| `script.js` | Delegate trigger activation, copy the selected image source and alt text, and open the dialog. |

## Task 1: Add the accessible project image viewer

**Files:** `index.html`, `styles.css`, `script.js`

**Interfaces:**

- Consumes: each project card's existing `<img>` source and alternative text.
- Produces: native button triggers with `.project-image-trigger`, one `#project-image-viewer` dialog, one `.project-image-viewer__image`, and a close button using `method="dialog"`.

- [x] In `index.html`, wrap each of the twelve existing project images in a `type="button"` trigger with a clear accessible name. Keep the image's existing `src`, `alt`, and `loading` attributes. For GestureDeck, Near But Far, and DevCompanion, wrap the two images separately so each opens individually.
- [x] Add one native modal dialog after the project grid. Include a visible close button and an image element for the selected full-size source. Give the dialog an accessible name.
- [x] In `script.js`, add one delegated click handler for `.project-image-trigger`. Copy the contained image's current source and alternative text to the dialog image, then call `showModal()`. Let the native dialog close on Escape and the `method="dialog"` close button.
- [x] In `styles.css`, reset the trigger button's appearance without changing the existing card media sizing or layered compositions. Add a visible keyboard focus style. Style the dialog and backdrop, and contain its image within the viewport with `object-fit: contain`.
- [ ] Manually inspect the Vercel preview at a narrow phone width and a desktop width. Activate each of the twelve images by pointer and keyboard; confirm every source opens uncropped, including all six images in the layered cards.
- [ ] Close with the visible button and Escape. Confirm focus returns to the trigger and the page remains at its prior scroll position.
- [ ] Review all nine cards for unchanged order, copy, image composition, and closed-state layout. Confirm all `src` paths resolve and run `git diff --check`.

**Automated tests:** None are planned. The repository has no test runner or required test suite; validate the interaction in the project preview instead.
