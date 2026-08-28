# GrinOne — Donation Platform Roadmap

A "Mission Control"-styled single-page website that walks through every phase of planning, designing, building, testing, and launching a transparent donation platform — plus a fully client-side **Live Demo Zone** with an interactive donation form, impact calculator, one-click donate showcase, physical (in-kind) donation scheduler, and donor message wall.

![Stack](https://img.shields.io/badge/React_19-Vite_7-blue) ![Styling](https://img.shields.io/badge/TailwindCSS_4-Framer_Motion-purple)

## Features

- **5-phase roadmap** — Planning, Design, Development, Testing, Launch — each with color-coded steps, telemetry framing, and scroll-triggered animations
- **Donation flow diagram** — 7-step journey from donor click to funds deployed
- **All 9 donation types** — one-time, recurring, tribute, corporate matching, crypto, planned giving, peer-to-peer, crowdfunding, and physical/in-kind goods
- **Fund allocation dashboard** with full transparency & monthly cost breakdown
- **Interactive demos (client-side only, clearly labeled DEMO):**
  - Donation modal (amount, campaign, frequency, card/PayPal/crypto/bank, anonymous giving)
  - Impact calculator with per-campaign tabs and a General Fund split view
  - One-click donate with saved cards, live countdown, progress thermometer, multi-currency
  - Physical donation scheduler (categories, condition, pickup/drop-off/ship)
  - Donor message wall
  - **Live Activity Bots** — a toggleable simulator (in the Recent Donors module) that
    periodically "donates" and posts gratitude messages as fictional supporters, bumping
    the campaign thermometer, live donor count, and message wall in real time so the demo
    feels active. Pauses automatically on hidden tabs or `prefers-reduced-motion`; every
    bot-generated row/message is tagged with a `BOT` badge and can be paused with one click.
- Compliance checklist, platform comparison, tech-stack guide, troubleshooting, timeline
- Accessible: `prefers-reduced-motion` support, keyboard-closable modal, aria labels

## Getting started

```bash
pnpm install
pnpm dev        # start Vite dev server
pnpm check      # TypeScript type-check
pnpm build      # production build (client → dist/public, server → dist)
pnpm start      # serve the production build with Express
```

## Project structure

```
client/          React app (Vite root)
  src/pages/Home.tsx   the entire roadmap + demo page
  src/components/      GrinOne logo, ErrorBoundary, shadcn/ui library
server/index.ts  minimal Express static server for production
DOCS/            design brief (ideas.md), feature log (todo.md), original ZIP
```

All demo interactions are simulated in the browser — no backend calls, no real payments.
