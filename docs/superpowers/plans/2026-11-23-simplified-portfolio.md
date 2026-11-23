# Simplified Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the racing project section with a responsive grid, use one static avatar, remove the four named section background images, and clarify the Projects and Wins labels.

**Architecture:** Keep project content as semantic static HTML cards and remove the scroll-driven project JavaScript. The old `/projects/` route redirects to `/#work`, making the home grid the single project view.

**Tech Stack:** HTML, CSS, vanilla JavaScript; no new dependencies.

**Spec:** `docs/superpowers/specs/2026-11-23-simplified-portfolio-design.md`

## Global Constraints

- Preserve each project's image, title, category, description, and existing public or private source state.
- Keep the other section content and interactions intact.
- Use the user-provided photo as one static hero avatar; keep the hero copy sequence.
- Show `Achievements` as the `#achievements` section heading and navigation label; label the `#work` nav link `Projects`.
- Use the existing HTML, CSS, and JavaScript; add no dependencies.
- Keep project links, heading structure, and mobile readability.

## Review Focus

- All six project cards remain visible and their image alt text and descriptions remain available if images fail to load.
- Public project links keep their destinations; private projects do not gain a fake link.
- The grid reflows at narrow widths without horizontal overflow.
- The legacy `/projects/` route reaches `/#work` without loading its old track code.
- `#work`, `#wins`, `#skills`, and `#contact` have no decorative background-image URL or preload.

---

### Task 1: Simplify the project experience and section backgrounds

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `script.js`
- Modify: `projects/index.html`
- Delete: `projects/styles.css`
- Delete: `projects/script.js`

**Interfaces:**
- Consumes: The six project entries and current copy, images, and source links in the existing home page markup and `script.js` project array.
- Produces: Static project cards in `#work`; no scroll-driven project runtime; a legacy route redirect to `../#work`.

- [x] Replace the scroll-driven home `#work` markup with six semantic project cards. Preserve the full existing descriptions, categories, previews, public links, and private source labels.
- [x] Remove the project-background preload and the project-track JavaScript from `script.js`; remove the background-image preloads for the four sections from `index.html` and `script.js`; keep the initial loader count aligned with the remaining critical assets.
- [x] Use the user-provided photo as the sole hero image, remove the avatar stage switching code and unused avatar preloads, and preserve the hero copy sequence.
- [x] Show the Achievements section heading and rename the Work navigation label to Projects.
- [x] Replace the racing panel and track styles with a responsive project grid; use the plain page color for `#work`, `#wins`, `#skills`, and `#contact`.
- [x] Replace `projects/index.html` with a small redirect and accessible fallback link to `../#work`, then delete its track-only CSS and JavaScript files.
- [x] Review the changed files and run `git diff --check`; search the shipped HTML, CSS, and JavaScript for remaining track/car selectors and the four background image URLs.
