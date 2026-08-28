# Project TODO

## Original Features (Completed)

- [x] Phase 1-5 roadmap sections with detailed steps
- [x] Donation flow diagram (7 steps)
- [x] All 8 donation types
- [x] Fund allocation dashboard
- [x] Transparency & cost breakdown
- [x] Platform comparison table
- [x] Compliance checklist
- [x] Recent Donations table with sample data
- [x] Top Donor Spotlight card
- [x] Filter dropdowns (campaign + type)
- [x] Monthly leaderboard
- [x] Community milestones
- [x] GrinOne branding (logo, favicon, colors)
- [x] Scroll-to-top button
- [x] Sticky command-bar navigation

## New Features (Completed)

- [x] Donation modal form (amount, campaign, frequency, payment methods, anonymous, message)
- [x] Crypto payment options (BTC, ETH, USDT)
- [x] Donor Message Wall section

## Restructuring (In Progress)

- [x] Remove tRPC/database dependencies from frontend (donation form, message wall)
- [x] Create separate Demo section/page clearly labeled as a DEMO
- [x] Update Roadmap navigation to have a "Demo" link
- [x] Add a visual separator/label between Roadmap and Demo sections
- [x] Ensure donation form works fully client-side (simulated, no backend calls)
- [x] Remove backend routers for donations/messages (not needed — frontend is fully client-side)
- [x] Verify TypeScript compiles cleanly

## Issue Audit & Fixes

- [x] Audit code for bugs, performance issues, UX problems
- [x] Fix identified issues
- [x] Add "Common Issues & Solutions" section to the roadmap

## Issues Found During Audit

- [x] No email validation regex in donation form
- [x] No minimum amount validation (allows $0 or negative via number input)
- [x] No character limit/sanitization on donor message (potential XSS if data were stored)
- [x] No input type email attribute for email field
- [x] Missing aria-labels on icon-only buttons (accessibility)
- [x] Missing max length on text inputs

## Missing Features Research & Addition

- [x] Add "Essential Features Checklist" section to roadmap (missing donation platform features)
- [x] Add mock One-click donate widget to demo section (saved cards, Apple Pay/Google Pay, progress thermometer, countdown timer, multi-currency, guest checkout)
- [x] Add interactive Impact Calculator below donate button (amount-to-impact mapping with visual icons)
- [x] Update Impact Calculator with campaign category tabs (Education, Healthcare, Environment, Emergency Relief) and unique impact data per category
- [x] Add General Fund tab to Impact Calculator that splits donation across all categories with combined impact summary
- [x] Add hover effect to General Fund impact cards showing detailed breakdown of each portion
- [x] Reorder all sections in correct logical flow

## Physical / In-Kind Donations

- [x] Add physical donation category to donation types data (clothes, toys, books, electronics, furniture, food, medical supplies, vehicles)
- [x] Add in-kind donation section to roadmap showing collection & distribution flow
- [x] Add demo widget for physical donation scheduling (pickup/drop-off options, condition categories, photos)
