# Simplified Portfolio Design

## Status

Approved by the user on 2026-11-23; responsive project grid selected.

## Intent

Make the portfolio easier to scan by removing the racing theme from Work, the five-stage avatar effect, and the decorative image backgrounds from Work, Wins, Skills, and Contact.

## Approaches

- **Responsive project grid (selected):** show all six projects as cards. It removes the track-driven scroll interaction and lets visitors scan the work directly.
- **Click-through carousel:** keep one featured project visible at a time with controls. It removes the racing artwork but retains extra interaction and hides projects until visitors navigate.

The grid is the implementation choice because it best fits the request to simplify the page.

## Scope

- Replace the 620vh scroll-driven Work section with a responsive grid of the six existing projects.
- Preserve each project's image, title, category, description, and existing public or private source state.
- Remove the inline SVG circuit, car, checkpoints, and their scroll-driven JavaScript and styles.
- Redirect the legacy `/projects/` page to the canonical Work grid and remove its track-only script and stylesheet.
- Show the user-provided formal photo as a single static hero image; keep the separate hero copy sequence unchanged.
- Remove section background images from `#work`, `#achievements`, `#skills`, and `#contact`, leaving the shared page color and existing card surfaces.
- Show a visible `Achievements` heading and navigation label for the `#achievements` section; label the `#work` navigation link `Projects`.
- Keep the other section content and interactions intact.

## Non-goals

- Rewrite project or achievement copy.
- Redesign the hero, achievement film, skills cards, or contact cards.
- Delete image files that become unused.

## Constraints

- Use the existing HTML, CSS, and JavaScript; add no dependencies.
- Keep project links, heading structure, and mobile readability.
