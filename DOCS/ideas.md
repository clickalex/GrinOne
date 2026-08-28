# Donation Roadmap Webpage — Design Brainstorm

## Three Stylistic Approaches

### Approach 1: "Cartographer's Blueprint"

- **Very Brief Intro**: A technical, architectural blueprint aesthetic — dark navy backgrounds with precise grid lines, blueprint-style borders, and a sense of engineering precision. Feels like a master plan being unrolled.
- **Probability**: 0.07

### Approach 2: "Strategic Atlas"

- **Very Brief Intro**: A warm, editorial approach inspired by National Geographic atlases — cream/ivory backgrounds, serif headlines, muted earth tones, and hand-drawn map-like phase indicators. Feels authoritative yet approachable.
- **Probability**: 0.04

### Approach 3: "Mission Control"

- **Very Brief Intro**: A bold, high-contrast dark interface with vibrant accent colors for each phase — inspired by mission control dashboards. Each phase gets its own color identity, with progress bars, status indicators, and a sense of forward momentum.
- **Probability**: 0.08

---

## Selected Approach: "Mission Control"

### Design Movement

Neo-brutalist dashboard meets strategic planning interface. Inspired by mission control rooms and project management tools, but elevated with editorial typography and refined spacing.

### Core Principles

1. **Phase-driven visual identity** — Each of the 5 phases has its own distinct color, creating immediate visual separation and memorability
2. **Structured density** — Information-rich but never cluttered; tables, checklists, and content blocks use generous spacing to breathe
3. **Forward momentum** — The page scrolls like a journey; progress indicators and directional cues pull the reader downward
4. **Technical authority** — Monospaced accents for step numbers, precise borders, and data-table styling convey professionalism

### Color Philosophy

The palette is built around a warm dark background (not pure black) with five phase-specific accent colors:

- Phase 1 (Planning): Forest green `#2d6a4f` — grounded, foundational
- Phase 2 (Design): Ocean blue `#0077b6` — creative, exploratory
- Phase 3 (Development): Crimson red `#e63946` — execution, energy
- Phase 4 (Testing): Amber `#f77f00` — caution, attention
- Phase 5 (Launch): Royal purple `#6a4c93` — achievement, mastery

The background is a warm charcoal `#1a1a2e` that provides depth without the coldness of pure black. Text uses off-white `#e8e8e8` for readability.

### Layout Paradigm

Vertical scroll narrative with sticky phase navigation. Each phase is a full-viewport-adjacent section with its own color accent stripe on the left edge. Content flows in a single-column editorial layout with embedded tables, checklists, and comparison cards.

### Signature Elements

1. **Phase color stripes** — A 6px colored stripe runs along the left edge of each phase section
2. **Step number badges** — Monospaced step numbers (1.1, 1.2, etc.) in colored pill badges
3. **Milestone connectors** — Dotted lines connecting phases vertically with milestone markers

### Interaction Philosophy

Subtle scroll-triggered animations reveal each phase section. Tables expand/collapse on mobile. The sidebar navigation highlights the current phase as you scroll. Hover states on table rows and checklist items provide tactile feedback.

### Animation

- Sections fade in with a slight upward slide as they enter the viewport (180ms, ease-out)
- Phase navigation items highlight with a smooth color transition (200ms)
- Tables use row-level hover highlighting
- Checklists have satisfying check animations (150ms spring)
- All animations respect `prefers-reduced-motion`

### Typography System

- **Headlines**: "Space Grotesk" (Google Fonts) — geometric, technical, modern
- **Body**: "Source Sans 3" (Google Fonts) — clean, highly readable
- **Monospaced accents**: "JetBrains Mono" (Google Fonts) — for step numbers, code, and technical labels
- **Hierarchy**: Phase titles at 2.5rem bold, step titles at 1.25rem semibold, body at 1rem regular, table headers at 0.875rem uppercase tracking-wide

### Brand Essence

"A mission control dashboard for your donation platform — transforming a complex multi-phase project into a clear, actionable, and visually compelling journey."

**3 Personality Adjectives**: Authoritative, Systematic, Momentum-driven

### Brand Voice

- Headlines: Direct, imperative, action-oriented
- CTAs: Functional and clear, no fluff
- Microcopy: Technical but accessible, like a good project manager

**Examples**:

- "Phase 1: Establish the Foundation"
- "Every donation page is a checkpoint. Build it right the first time."

### Wordmark & Logo

A geometric "compass" icon — four directional arrows forming a square, with each arrow colored in one of the phase colors. Represents navigation through the roadmap. No text in the logo.

### Signature Brand Color

The phase accent system IS the signature. But if one color must be chosen: **Crimson `#e63946`** — the execution color, used for primary CTAs and the most important emphasis points.
