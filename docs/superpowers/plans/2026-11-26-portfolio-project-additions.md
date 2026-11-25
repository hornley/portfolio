# Portfolio Project Additions Implementation Plan

**Goal:** Add GestureDeck, Near But Far, and DevCompanion after the six existing selected-project cards on the deployed homepage.

**Architecture:** The deployed homepage contains a static `.project-grid` in `index.html`; it has no project data array or carousel. `/projects/` redirects to `../#work`, so the homepage grid is the single source of project cards. Add the three cards and their decorative artwork there, retaining the current card structure, visual style, and responsive grid.

**Tech stack:** Static HTML and CSS.

**Approved spec:** `docs/superpowers/specs/2026-11-26-portfolio-project-additions-design.md`

**Source reviewed:** `origin/main` at `eff20f4bfb7ba29b6c9450ee499f36401f47ce97`.

## Spec fit and deployment adaptation

The approved project scope, names, categories, descriptions, public/private link behavior, and Near But Far caveat still fit. Later user follow-ups supplied screenshots to replace only the GestureDeck and Near But Far CSS illustrations; DevCompanion retains its approved CSS artwork. The spec's page-specific implementation describes an earlier site version: project arrays on two pages, carousel checkpoints, fallback lists, duplicated artwork panels, and a 16:8 carousel frame. `origin/main` instead has six static cards in one homepage grid, a 16:10 card-media frame, and a `/projects/` redirect. Implement the approved project content once in the homepage grid; `/projects/` will continue to reach it through its existing redirect. Keep all media inside the current card-media frame. Do not recreate the former carousel or change the deployed layout to match it.

## Global constraints

- Keep exactly these nine projects, in this order: AyudaPay, Rekado Lens, Sora, Zeni, Kairo, SulatBaybayin, GestureDeck, Near But Far, DevCompanion.
- Leave all six existing cards, their order, text, links, artwork, and markup unchanged.
- Add no other project, including Tapit or Aegis.
- Use these exact additions:

| Name | Category | Description | Visitor-facing source |
| --- | --- | --- | --- |
| GestureDeck | Browser / Presentation | A browser presentation controller that connects a phone to a presentation workspace. | Link to `https://gesturedeck-two.vercel.app/workspace.html?experience=cloud&connect=phone`. |
| Near But Far | macOS / iPhone | A native macOS and iPhone proximity companion with QR pairing and BLE presence; physical BLE validation remains pending. | Show `Source / private`; do not link the private repository. |
| DevCompanion | Developer Tools / iOS | A private developer workspace with an iPhone app, self-hosted sync for projects, tasks, references, T3, and GitHub, plus an offline cache. | Show `Source / private`; do not link the private repository. |

- Keep repository URLs as source references only: GestureDeck `https://github.com/wehyn/GestureDeck`, Near But Far `https://github.com/hornley/near-but-far`, DevCompanion `https://github.com/hornley/devcompanion`.
- Do not describe Near But Far as locking, unlocking, reading, or otherwise using macOS secure lock state. State that physical BLE validation is pending.
- Preserve the deployed avatar and its loading behavior: `index.html` preloads and displays `avatars/formal-photo.png`; do not change the hero, avatar, or critical-asset gate.
- Preserve the deployed three-column desktop grid, responsive breakpoints, card content pattern, and 16:10 media ratio. `/projects/` remains a redirect to `../#work`.
- Use the supplied screenshots for GestureDeck and Near But Far in their existing 16:10 card media, with descriptive alt text and lazy loading. For Near But Far, use the Mac screenshot as the backdrop and the iPhone screenshot as an inset overlay. Keep DevCompanion's CSS-only artwork inside its current media area, use the existing palette, and mark that decorative markup `aria-hidden="true"`. Do not imply that Near But Far observes or controls macOS secure lock state. Add no other image assets.
- Do not add project data arrays, carousel checkpoints, fallback lists, duplicate cards, or shared rendering code.
- Do not add or run tests for this change; review the resulting content and diff manually.

## File map

| Path | Responsibility |
| --- | --- |
| `index.html` | Static homepage project cards and the deployed avatar preload/display. Add only the three cards after SulatBaybayin; preserve the avatar markup. |
| `styles.css` | Current project grid, card-media sizing, and responsive styling. Add only the Near But Far image composition and DevCompanion artwork styles. |
| `projects/gesturedeck/gesturedeck_image.png` | User-supplied GestureDeck screenshot used in its card media. |
| `projects/near-but-far/near-but-far-mac.png` | User-supplied Mac screenshot used as the Near But Far card media backdrop. |
| `projects/near-but-far/near-but-far-iphone.png` | User-supplied iPhone screenshot used as the Near But Far card media inset. |
| `projects/index.html` | Existing redirect to `../#work`; leave it unchanged. |
| `script.js` | Current critical-asset gate and page interactions; leave it unchanged. |

## Tasks

### Task 1: Append the three cards to the current homepage grid

**Files:** `index.html`

1. Append one `<article class="project-card">` per project after the existing SulatBaybayin article inside `.project-grid`.
2. Follow the existing card structure: media first, then `.project-card__content`, `.project-card__category`, heading, `.project-card__description`, and either `.project-card__link` or `.project-card__private`.
3. Keep the approved names, categories, descriptions, and link handling from the table above. GestureDeck's card link should use the live workspace URL and the current external-link attributes. Near But Far and DevCompanion should display `Source / private` without linking their repositories.
4. Do not reorder or rewrite any of the existing six cards.

### Task 2: Add abstract media for the new cards

**Files:** `index.html`, `styles.css`, `projects/gesturedeck/gesturedeck_image.png`, `projects/near-but-far/near-but-far-mac.png`, `projects/near-but-far/near-but-far-iphone.png`

1. Use the supplied screenshots for GestureDeck and Near But Far and CSS-only artwork for DevCompanion. Retain the current card-media geometry and 16:10 ratio.
2. Compose the Near But Far card with the Mac screenshot as a backdrop and the iPhone screen as an inset overlay. Use descriptive alt text for both visible screens, without implying that Near But Far observes or controls macOS secure lock state.
3. Keep the approved workspace-grid motif for DevCompanion in the current card palette and mark its decorative markup `aria-hidden="true"`. Scope screenshot composition styles to Near But Far and artwork styles to DevCompanion; leave existing cards and shared grid breakpoints unchanged.
4. Do not add other image files or alter the avatar and loader.

### Task 3: Review the integrated page content

**Files:** `index.html`, `styles.css`, `projects/index.html`, `script.js`

1. Manually confirm that the homepage contains exactly nine cards in the approved order and that the original six cards are unchanged.
2. Confirm the three new cards use the exact approved copy and categories, GestureDeck links only to its live workspace, and the other two show `Source / private` without repository links.
3. Confirm Near But Far mentions QR pairing, BLE presence, and pending physical BLE validation without making secure-lock-state claims.
4. Confirm `/projects/` still redirects to `../#work`, the new media retains the card's 16:10 ratio, the DevCompanion CSS motif uses the existing palette, and the deployed avatar preload and display still use `avatars/formal-photo.png`.
5. Review the diff to ensure only the homepage markup, card artwork styles, supplied screenshots, and this plan note changed; no tests or unrelated assets are added.
