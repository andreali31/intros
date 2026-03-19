import { NextResponse } from "next/server";
import { events } from "@/data/events";
import { appendRsvpSubmission, isSheetsConfigured } from "@/lib/google-sheets";

type Payload = {
  eventSlug?: string;
  name?: string;
  email?: string;
  affiliation?: string;
  interestNote?: string;
};

const fallbackEmail = process.env.RSVP_FALLBACK_EMAIL || "andrea@example.com";

function buildFallbackUrl({
  eventTitle,
  name,
  email,
  affiliation,
  interestNote
}: {
  eventTitle: string;
  name: string;
  email: string;
  affiliation: string;
  interestNote: string;
}) {
  const params = new URLSearchParams({
    subject: `intros RSVP fallback: ${eventTitle}`,
    body:
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Affiliation: ${affiliation}\n` +
      `Event: ${eventTitle}\n\n` +
      `Note:\n${interestNote || "None"}`
  });

  return `mailto:${fallbackEmail}?${params.toString()}`;
}

function validate(payload: Payload) {
  const errors: string[] = [];

  if (!payload.eventSlug) errors.push("Event is required.");
  if (!payload.name?.trim()) errors.push("Name is required.");
  if (!payload.email?.trim()) errors.push("Email is required.");
  if (!payload.affiliation?.trim()) errors.push("Affiliation is required.");

  const event = events.find((item) => item.slug === payload.eventSlug);
  if (!event) errors.push("Selected event was not found.");

  return { errors, event };
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Payload;
  const { errors, event } = validate(payload);

  if (errors.length > 0 || !event) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const submission = {
    eventSlug: event.slug,
    eventTitle: event.title,
    name: payload.name!.trim(),
    email: payload.email!.trim(),
    affiliation: payload.affiliation!.trim(),
    interestNote: payload.interestNote?.trim() || "",
    timestamp: new Date().toISOString()
  };

  const fallbackUrl = buildFallbackUrl(submission);

  if (!isSheetsConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        mode: "fallback",
        message: "RSVP storage is not configured yet. Use the fallback email path.",
        fallbackUrl
      },
      { status: 503 }
    );
  }

  try {
    await appendRsvpSubmission(submission);
    return NextResponse.json({
      ok: true,
      message: "You are on the list. Andrea will follow up with details."
    });
  } catch (error) {
    console.error("Failed to append RSVP submission", error);

    return NextResponse.json(
      {
        ok: false,
        mode: "fallback",
        message: "The RSVP service is temporarily unavailable. Use the fallback email path.",
        fallbackUrl
      },
      { status: 502 }
    );
  }
}
