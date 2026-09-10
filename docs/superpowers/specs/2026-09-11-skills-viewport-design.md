# Skills Viewport Redesign

## Objective

Replace the current two-column Skills list with a full-viewport, pinned section that belongs visually with the scroll-driven Projects and Achievements sections. The section should communicate three durable capability areas without adding another competing interaction: BUILD, INTELLIGENCE, and SYSTEMS.

## Direction

Use one 100dvh Skills stage with the existing paper/ink/blue visual language. The stage is horizontally organized as three equal capability cards on desktop. Cards share the existing hairline rules, square geometry, compact uppercase metadata, and high-contrast typography rather than introducing a new card style. The composition should feel like a capability index: precise, editorial, and easy to scan.

```text
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ 01 / BUILD      │ │02 / INTELLIGENCE│ │03 / SYSTEMS     │
│                 │ │                 │ │                 │
│ SOFTWARE        │ │ AI / ML         │ │ INFRASTRUCTURE  │
│ DEVELOPMENT     │ │ COMPUTER VISION │ │ AUTOMATION      │
│                 │ │                 │ │                 │
│ Python          │ │ PyTorch         │ │ Linux           │
│ TypeScript      │ │ OpenCV          │ │ Docker          │
│ React           │ │ YOLO            │ │ Tailscale       │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

The supplied category and technology copy is the source of truth:

- `01 — BUILD`: Full-stack, APIs, Databases, Software Architecture. Python / TypeScript / React / FastAPI / Flask / PostgreSQL / SQLite.
- `02 — INTELLIGENCE`: AI, Machine Learning, Computer Vision, AI Agents. PyTorch / OpenCV / YOLO / LLMs / RAG / Agent Systems.
- `03 — SYSTEMS`: Infrastructure, Automation, Networking, Self-hosting. Linux / Docker / Tailscale / Ollama / MCP / Homelab.

## Structure and behavior

The Skills section will use the same full-bleed viewport treatment as the existing interactive sections:

- The section owns a scroll track tall enough to hold a pinned stage.
- The stage is full viewport width, `min-height: 100dvh`, and sticky at the top while its scroll track is active.
- A compact section title, `Skills`, sits in the stage as an orientation marker rather than using the old `03 / Skills` heading and flat list.
- Three cards are rendered simultaneously. Each card contains its index, title, capability line, and technology list.
- On entry, the title and cards reveal with a short stagger. Scroll drives only the section entrance/reveal amount; there is no one-card-at-a-time carousel, so the complete capability model remains visible and scannable.
- The stage exits cleanly after the cards have settled, handing off to the Contact footer.

## Responsive and accessibility behavior

- Desktop and tablet use a three-column grid inside the viewport with explicit gaps and safe horizontal padding.
- Below the existing `800px` breakpoint, cards collapse to a single-column list inside a normal-flow Skills section. This avoids trying to force three dense cards into a small viewport.
- The mobile layout keeps every capability and technology available in the DOM and visible without depending on scroll animation.
- `prefers-reduced-motion: reduce` disables the pinned/scroll-driven state and shows a normal-flow section with the title and three cards.
- The section uses a real heading and list semantics. Decorative stage elements remain hidden from assistive technology.
- Existing focus-visible styling remains the focus treatment for any future interactive content; cards themselves are not made falsely interactive.

## Implementation boundaries

- Update only the homepage Skills markup, its dedicated CSS, and the minimal JavaScript needed for the viewport entrance state.
- Reuse the existing `--paper`, `--ink`, `--muted`, `--line`, and `--accent` tokens and the current Manrope/system font stack.
- Do not add dependencies, images, or new iconography; this section is intentionally typography-and-rule driven.
- Preserve the current Projects, Achievements, header, and footer behavior.
- Keep the existing non-JavaScript content readable as the fallback state.

## Verification

- Confirm the section renders with three equal desktop columns and the requested copy.
- Confirm the stage is full-bleed and pinned at `100dvh` without horizontal overflow.
- Confirm mobile stacks all three cards and remains readable at narrow widths.
- Confirm reduced-motion mode shows the static flow layout.
- Confirm existing sections and navigation still link to `#skills` correctly.
- Run a static syntax/markup check and inspect the final diff for unrelated changes.
