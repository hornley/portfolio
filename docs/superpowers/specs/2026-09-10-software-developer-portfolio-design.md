# Software Developer Portfolio Design

## Status

Approved visual and content direction; ready for implementation planning.

## Goal

Create a single-page portfolio for Harley Albert Buendia that showcases finished software projects to clients, hiring managers, collaborators, and other visitors.

The first version is a project showcase, not a biography or résumé replacement. It should communicate what Harley has made, selected capabilities, and two hackathon wins without exposing the personal background or professional-summary paragraph from the résumé.

## Audience and positioning

- Primary audience: potential clients and hiring managers.
- Secondary audience: collaborators and general visitors.
- Lead identity: Software Developer.
- Core message: a concise presentation of selected, finished work and evidence of technical ability.
- No biography, personal-history section, résumé-style summary, or personal-background copy in the UI.

## Visual direction

The page uses a light editorial visual language:

- Warm-white or very light neutral background.
- Near-black text.
- One restrained cobalt-blue accent used consistently for links, active states, and selected emphasis.
- Large, clean sans-serif typography with compact supporting text.
- Generous whitespace and a strong reading rhythm.
- Numbered project rows with asymmetric previews rather than a repeated grid of equal cards.
- Mostly sharp or lightly rounded surfaces; no heavy shadows, decorative gradients, glassmorphism, or visual clutter.
- Subtle reveal and hover movement only where it improves navigation or project discovery.

Design dials: `DESIGN_VARIANCE 6`, `MOTION_INTENSITY 3`, `VISUAL_DENSITY 3`.

## Page structure

### 1. Header

- Display the name: `Harley Albert Buendia`.
- Provide compact links to the page sections, such as Work, Wins, Skills, and Contact.
- Keep the desktop navigation on one line.
- Collapse to a simple mobile menu or stacked navigation at smaller widths.

### 2. Hero

- Display only the role: `Software Developer`.
- Add a short selected-work prompt, without biography or self-description.
- Include one primary action that jumps to selected work.
- Keep the hero short enough that the project section is discoverable without excessive scrolling.

### 3. Selected work

Show exactly four finished projects, in this order unless the user changes it:

1. Zeni
2. Kairo
3. AyudaPay
4. SulatBaybayin

Each project row contains:

- An ordinal number.
- Project name.
- A short category or technology descriptor.
- A concise project description.
- A preview area or project image supplied by the user or generated from available project material.
- A clear project link.

For AyudaPay, place the achievement directly below the project name:

```text
AyudaPay
🏆 Champion — Hack-it-UP 2026 · UP SoComSci
```

The trophy mark is intentional and user-requested. AyudaPay and SulatBaybayin should link to GitHub repositories when their URLs are available. Zeni and Kairo should support the same link treatment later when their GitHub repositories are created; adding those URLs must require only content changes, not a layout change.

Do not invent project claims or descriptions for Zeni and Kairo. Keep their content data easy to update and use user-provided copy or verified project materials before launch.

### 4. Hackathon wins

Show two concise achievement rows, separate from the selected project list:

- `Champion — CodeKada 2025` — DevKada Community; project: Rekado Lens.
- `Champion — Hack-it-UP 2026` — UP Society of Computer Scientists (UP SoComSci); project: AyudaPay.

The CodeKada achievement may reference Rekado Lens as the winning project without adding Rekado Lens to the four-project selected-work list. The same Hack-it-UP win may appear both as the AyudaPay project label and as a compact achievement row because these placements serve different purposes: project context and proof of accomplishment.

### 5. Skills

Use a compact text-based skills section, not a badge wall or résumé dump. The section should include only current, defensible capabilities. The supplied résumé is a source of context but its outdated skills list is not authoritative.

Initial capability groupings can be organized around:

- Software development and full-stack web applications.
- AI-assisted product development.
- Artificial intelligence, machine learning, and computer vision.
- Database-backed applications.
- Blockchain-enabled applications and integrations.

Exact tools and technologies should be finalized from the user’s current skill set before launch rather than inferred from old résumé content.

### 6. Footer

- Provide GitHub and email links when confirmed.
- Keep the footer concise and utility-focused.
- Do not add a biography or résumé summary.

## Content and data model

Keep projects, awards, and skills in structured local data so content can be revised without changing layout components. A project record should support:

- `name`
- `number`
- `category`
- `description`
- `image` or `preview`
- `href`
- optional `awardLabel`
- optional `repositoryUrl`

Link fields should allow an unavailable URL to be omitted cleanly. The UI must never render a dead or invented link.

## Interaction and accessibility

- Project rows have a visible hover/focus state and a clear active/link state.
- Keyboard users can reach every project link, navigation item, and footer link.
- Focus indicators must remain visible against the light background.
- Decorative previews do not carry essential information without accompanying text.
- Respect `prefers-reduced-motion` by removing reveal transforms and hover movement.
- Use semantic headings, landmarks, and descriptive link text.
- Maintain readable contrast for all text and accent treatments.
- Keep primary link labels on one line at desktop widths.

## Responsive behavior

- Desktop: editorial project rows with text and preview arranged asymmetrically.
- Tablet: preserve the row composition where space allows, reducing preview size and type scale.
- Mobile: stack each project as preview, project information, award label when present, and link; no horizontal overflow.
- Mobile navigation must remain compact and usable without relying on hover.

## Scope exclusions for version one

- No separate project detail pages.
- No CMS or authentication.
- No filtering or search.
- No biography or personal-background section.
- No résumé download section unless added later as a deliberate requirement.
- No project claims, screenshots, or repository URLs that have not been supplied or verified.
- No heavy animation, autoplay media, or decorative interaction that competes with the work.

## Verification criteria

The implementation is ready when:

1. The page is a single responsive route containing the approved sections.
2. Only Zeni, Kairo, AyudaPay, and SulatBaybayin appear in selected work.
3. AyudaPay visibly carries the requested champion label.
4. Both hackathon wins are represented without turning Rekado Lens into a fifth selected project.
5. No biography or outdated résumé summary appears in the UI.
6. Missing future links for Zeni and Kairo do not produce broken controls.
7. Project, award, and footer links are keyboard accessible and visually focused.
8. Reduced-motion behavior is supported.
9. The page remains legible and usable on mobile.
