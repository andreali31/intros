# intros

Community-facing website for Caltech builders, founders, and innovators.

## Stack

- Next.js App Router
- TypeScript
- Local event content stored in `data/events.ts`
- Server-side RSVP endpoint at `app/api/rsvp/route.ts`
- Optional Google Sheets storage through service account credentials

## Local setup

1. Run `npm install`
2. Copy `.env.example` to `.env.local`
3. Fill in the Google Sheets values if you want live RSVP storage
4. Run `npm run dev`

If the Google Sheets credentials are missing or the write fails, the RSVP form returns a fallback email path instead of silently failing.
