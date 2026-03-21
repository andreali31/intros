import RouteTransitionLink from "@/components/route-transition-link";

export default function HomePage() {
  return (
    <main className="screen">
      <div className="screen-frame">
        <header className="screen-header">
          <div className="brand-slot" aria-hidden="true" />
        </header>

        <section className="screen-body">
          <h1 className="screen-title intros-word">intros</h1>
          <div className="view-copy">
            <p>for students, founders, and builders</p>
          </div>
          <RouteTransitionLink className="footer-link events-word" href="/events">
            events
          </RouteTransitionLink>
        </section>
      </div>
    </main>
  );
}
