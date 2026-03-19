export type Event = {
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  summary: string;
  audience: string;
  status: "Open RSVP" | "Interest List" | "Invite Queue";
  actionLabel: string;
  featured: boolean;
};

export const events: Event[] = [
  {
    slug: "builders-dinner-01",
    title: "Builders Dinner No. 1",
    date: "April 11, 2026",
    time: "7:00 PM",
    location: "Pasadena, shared after confirmation",
    summary:
      "An intimate dinner for students actively building products, research spinouts, and ambitious side projects who want candid conversation instead of networking theater.",
    audience: "Caltech founders, operators, and technical builders ready to share what they are making.",
    status: "Open RSVP",
    actionLabel: "RSVP",
    featured: true
  },
  {
    slug: "idea-salon",
    title: "Idea Salon",
    date: "April 24, 2026",
    time: "6:30 PM",
    location: "Caltech campus, room announced to attendees",
    summary:
      "A fast-moving evening for early-stage ideas. Bring an unfinished concept, a technical edge, or a problem worth obsessing over.",
    audience: "Students exploring startup ideas, collaborators, and curious researchers crossing into product work.",
    status: "Interest List",
    actionLabel: "I’m Interested",
    featured: true
  },
  {
    slug: "founder-breakfast",
    title: "Founder Breakfast",
    date: "May 2, 2026",
    time: "9:00 AM",
    location: "Off-campus cafe in Pasadena",
    summary:
      "A smaller morning table for students already testing something in the world and looking for honest feedback on next steps.",
    audience: "Current founders, prospective co-founders, and builders preparing to launch.",
    status: "Invite Queue",
    actionLabel: "Join the Queue",
    featured: false
  }
];

export const featuredEvents = events.filter((event) => event.featured).slice(0, 3);
