import Image from "next/image";
import Link from "next/link";
import RouteTransitionLink from "@/components/route-transition-link";

export default function EventsPage() {
  return (
    <main className="screen events-screen">
      <div className="screen-frame">
        <header className="screen-header">
          <RouteTransitionLink className="header-home-link intros-word events-header-link" href="/">
            intros
          </RouteTransitionLink>
        </header>

        <section className="events-page">
          <div className="events-grid">
            <article className="event-card event-card-entrance">
              <div className="event-copy">
                <div className="event-card-header">
                  <p className="event-status">Invite Only</p>
                  <h2 className="event-name">PARETO x Caltech</h2>
                </div>
                <div className="event-meta">
                  <p>04/02/2026 12 pm</p>
                </div>
                <Link
                  className="event-join-link events-word"
                  href="https://luma.com/ev5e"
                  rel="noreferrer"
                  target="_blank"
                >
                  coming soon
                </Link>
              </div>
              <a
                className="event-logo-link event-logo-link-card"
                href="https://www.pareto20.com/"
                rel="noreferrer"
                target="_blank"
              >
                <Image
                  alt="Pareto logo"
                  className="event-logo event-logo-card"
                  height={72}
                  priority
                  src="/paretologo.png"
                  width={360}
                />
              </a>
            </article>
            <article className="event-card event-card-a16z event-card-entrance">
              <div className="event-copy">
                <div className="event-card-header">
                  <p className="event-status">Invite Only</p>
                  <h2 className="event-name">a16z Networking Event</h2>
                  <p className="event-summary">Caltech x USC x Art Center</p>
                </div>
                <div className="event-meta">
                  <p>04/03/2026 6:30 pm</p>
                </div>
                <Link
                  className="event-join-link events-word"
                  href="https://luma.com/3y684oak"
                  rel="noreferrer"
                  target="_blank"
                >
                  luma
                </Link>
              </div>
              <a
                className="event-logo-link event-logo-link-card"
                href="https://speedrun.a16z.com"
                rel="noreferrer"
                target="_blank"
              >
                <Image
                  alt="a16z logo"
                  className="event-logo event-logo-card"
                  height={83}
                  src="/speedrun.png"
                  width={600}
                />
              </a>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
