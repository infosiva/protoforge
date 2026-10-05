# protoforge

AI idea-to-prototype generator — describe your idea, get a shareable 5-page prototype

**Live:** https://protoforge-taupe.vercel.app

## Tech stack
Next.js, React, TypeScript, Tailwind CSS

## Run locally
```bash
git clone https://github.com/infosiva/protoforge.git && cd protoforge
npm install
cp .env.example .env.local   # names only, fill in your own values
npm run dev                    # http://localhost:3000
```

## Scripts
- `npm run dev`
- `npm run build`
- `npm run start`

## Environment variables
Names only; never commit real values. Everything is optional unless the feature needs it.

**AI providers (free-first chain; any one is enough):** `GEMINI_API_KEY`, `GROQ_API_KEY`

- `GNEWS_API_KEY`
- `PROMO_CODES`

## Deploy
Vercel (`vercel --prod`). Set the variables above in the project settings.

## Status & open items
See `HANDOFF.md` if present; otherwise open an issue.
