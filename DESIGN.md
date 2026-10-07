# ProtoForge design

Source of truth: `design-system/` (MASTER.md, tokens, `components/AnimatedBg.tsx`). This file only records project choices.

- Accent: `#818cf8` (indigo, from the icon mark and `theme-vars.css` fallback); palette checked with `design-system/scripts/check-palettes.mjs`.
- Hub override: Edge Config `theme_protoforge.design` (dials, brief, palette, `layout.bgAnimation`/`bgSpeed`) wins over these values; loaded by `lib/theme-loader.ts` and applied in `app/layout.tsx`.
- Background: `components/AnimatedBg.tsx` (hub-driven, reduced-motion safe).
- Logo: `components/Logo.tsx` (ProtoForge wordmark), used in the navbar/header; favicon is `app/icon.svg` (same mark).
- ai-core: exempt: prototype generation on the shared free-first chain; no documents, RAG or memory.
