# intros v1 Design

## Overview

`intros` is a community-facing website for Caltech builders, founders, and innovators. It should launch as a lightweight hub for dinners, events, and future community programming, with Andrea as the host and connector rather than the main subject of the site.

The v1 goal is to create a strong landing page for the community, publish curated events, and collect RSVPs or interest submissions through the site. The product should feel ambitious and founder-oriented, while staying simple enough to run manually.

## Goals

- Establish `intros` as a recognizable Caltech builder community brand
- Make the homepage a clear entry point for new visitors
- Publish dinners and events curated by Andrea
- Collect RSVPs or interest submissions through the site
- Store submissions in a Google Sheet through a server-side integration
- Leave room for future expansion into builder and founder discovery

## Non-Goals

- A full personal portfolio site
- Public event creation by students in v1
- A builder directory in the first release
- A full CMS or admin panel
- A production database requirement for launch

## Audience

The primary audience is Caltech students and collaborators. The tone should be community-first, but visually sharp and ambitious, more like an early-stage founder network than a campus bulletin board.

## Product Structure

The initial site structure should have three primary areas:

- `Home`
- `Events`
- `About Andrea`

### Home

The homepage is the main funnel and should establish the `intros` brand immediately. It should position the site as a welcoming but high-agency community for Caltech builders, founders, and innovators.

Suggested homepage sections:

- Hero section with the `intros` brand and a welcome statement
- Primary call to action to view events
- Short explanation of why the community exists
- Featured upcoming events block with 1 to 3 active items
- Short preview of Andrea's role as host and connector
- Small note that more builder and founder features are planned later

### Events

The `Events` page is the main operational page in v1. Andrea is the only curator and publisher initially. Each event should include:

- title
- date
- time
- location
- short description
- target audience or who it is for
- a primary action such as `RSVP` or `I'm Interested`

### About Andrea

The `About Andrea` page explains who Andrea is, why she is organizing this community, and why visitors should engage with the site. It should support trust and context without turning the site into a personal portfolio.

## Visual Direction

The visual tone should feel sharp, ambitious, and builder-focused. The site should not look like a generic academic profile or a campus club flyer. It should feel intentional and modern, with a clear identity around high-agency community building.

## Architecture

The recommended v1 architecture is a lightweight web app with static-style content and one server-side form integration.

Core pieces:

- frontend app for the public website
- event content stored locally in the codebase
- server-side form endpoint for RSVP or interest submissions
- Google Sheets as the initial response store

This keeps the public experience polished while avoiding unnecessary backend complexity. Event publishing remains simple because Andrea can update content directly in the app.

## Data Flow

### Event Publishing

Andrea creates and edits event content manually in the codebase. No CMS is required in v1.

### RSVP Submission

When a visitor submits an RSVP or interest form:

1. The visitor fills out a form on the site
2. The form posts to a server-side endpoint
3. The endpoint validates the submission
4. The endpoint appends the response to a Google Sheet
5. The site returns a success or failure message to the user

## Suggested Data Model

### Event

- title
- slug
- date
- time
- location
- summary
- audience
- status
- RSVP action label

### RSVP Submission

- event slug
- name
- email
- affiliation
- interest note
- timestamp

## Admin Workflow

The admin workflow should stay manual in v1.

- Andrea adds or edits events directly in site content
- Andrea publishes site updates when event content changes
- Andrea reviews RSVPs and submissions in Google Sheets

This is the right tradeoff for launch. It keeps the scope focused on community value rather than internal tooling.

## Error Handling

The most important operational risk is failed submissions.

Requirements:

- show a clear success state after a valid submission
- show a clear retry state if the Google Sheets write fails
- avoid silent failure
- provide a safe fallback path if the form backend is temporarily unavailable

If the integration is not ready, the product should degrade gracefully rather than present a broken RSVP flow.

## Testing

V1 testing should cover:

- homepage rendering with core navigation and sections
- events page rendering current event data correctly
- form validation for required RSVP fields
- successful submission path through the server endpoint
- failure state messaging when submission fails

## Future Expansion

The architecture should support later additions without forcing a redesign. Expected future directions:

- student founder and builder profiles
- project idea or collaboration postings
- broader opportunity postings
- submission and review workflows
- migration from Google Sheets to a database if usage increases

## Recommendation

Launch `intros` as a community landing page with curated events and a simple RSVP flow backed by Google Sheets. This matches the current need, creates a strong branded entry point for Caltech builders, and leaves clean room for future community features.
