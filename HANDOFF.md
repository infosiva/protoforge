# HANDOFF — protoforge improvements
**Date:** 2026-05-29  **Status:** IN PROGRESS
**Goal:** Add projects dashboard, build history panel, compact hero, tab switcher on proto viewer

## Files to touch
- `components/ProjectsDashboard.tsx` — new component, reads localStorage
- `app/ProtoForgePage.tsx` — integrate dashboard, compact hero, feature pills
- `app/proto/[id]/page.tsx` — add Preview/Code/Export tab switcher, build history panel

## Steps
- [ ] Step 1: Create ProjectsDashboard.tsx component
- [ ] Step 2: Compact hero in ProtoForgePage.tsx + integrate dashboard
- [ ] Step 3: Add tab switcher (Preview/Code/Export) + build history to proto/[id]/page.tsx
- [ ] Step 4: npm run build passes
- [ ] Step 5: Commit

## Success criteria
- ProjectsDashboard reads/writes localStorage, shows 3 stat cards + recent list
- Hero max ~320px tall, CTA visible above fold, feature pills present
- Proto viewer has Preview/Code/Export tabs + build history panel
- npm run build passes with 0 errors

## Resume from here if interrupted
Not started
