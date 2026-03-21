# Home And Events Simplification Design

## Goal

Keep the existing `intros` homepage as the primary landing page, remove the top navigation buttons, remove the join flow from the homepage, and add a small underlined `Events` link at the bottom that routes to a dedicated `/events` page.

## Approved Scope

- Preserve the current homepage title and supporting copy
- Remove the top `Home / Events / Join` controls
- Remove the homepage join submission UI and related state
- Add a small footer link labeled `Events` on the homepage
- Create or populate the `/events` route so it becomes the single destination for event content

## Implementation Notes

- Simplify `app/page.tsx` into a static landing page with a footer link
- Move event presentation to `app/events/page.tsx`
- Reuse `data/events.ts` so event content remains editable in one place
- Remove unused join-related styles from `app/globals.css`
