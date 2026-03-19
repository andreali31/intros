"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

type View = "home" | "events" | "join";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqykegk";

const views: { id: View; label: string; title: string }[] = [
  { id: "home", label: "Home", title: "intros" },
  { id: "events", label: "Events", title: "Pareto Holdings" },
  { id: "join", label: "Join", title: "Join us" }
];

export default function HomePage() {
  const [activeView, setActiveView] = useState<View>("home");
  const [joinEmail, setJoinEmail] = useState("");
  const [joinState, setJoinState] = useState<{
    kind: "idle" | "success" | "error";
    message: string;
  }>({ kind: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentView = views.find((view) => view.id === activeView) ?? views[0];

  async function handleJoinSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setJoinState({ kind: "idle", message: "" });

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: joinEmail })
      });

      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
      };

      if (!response.ok) {
        setJoinState({
          kind: "error",
          message: result.message || "Submission failed."
        });
        return;
      }

      setJoinEmail("");
      setJoinState({
        kind: "success",
        message: "Submitted."
      });
    } catch {
      setJoinState({
        kind: "error",
        message: "Submission failed."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="screen">
      <div className="screen-frame">
        <header className="screen-header">
          <div className="brand-slot" aria-hidden="true" />
          <nav className="screen-nav" aria-label="Primary">
            {views.map((view) => (
              <button
                key={view.id}
                className={view.id === activeView ? "nav-button active" : "nav-button"}
                onClick={() => setActiveView(view.id)}
                type="button"
              >
                {view.label}
              </button>
            ))}
          </nav>
        </header>

        <section className="screen-body">
          {activeView === "events" ? (
            <div className="event-title-block">
              <a
                className="event-logo-link"
                href="https://www.pareto20.com/"
                rel="noreferrer"
                target="_blank"
              >
                <Image
                  alt="Pareto logo"
                  className="event-logo"
                  height={72}
                  priority
                  src="/paretologo.png"
                  width={360}
                />
              </a>
              <h1 className="screen-title screen-title-event">{currentView.title}</h1>
              <p className="event-date">04/02/2026</p>
            </div>
          ) : activeView === "join" ? (
            <form className="join-block" onSubmit={handleJoinSubmit}>
              <h1 className="screen-title screen-title-event">Drop your email</h1>
              <input
                aria-label="Email"
                autoComplete="email"
                className="join-input"
                onChange={(event) => setJoinEmail(event.target.value)}
                placeholder="name@caltech.edu"
                type="email"
                value={joinEmail}
              />
              <button className="join-button" disabled={isSubmitting} type="submit">
                {isSubmitting ? "Submitting" : "Submit"}
              </button>
              {joinState.kind !== "idle" ? (
                <p className={joinState.kind === "success" ? "join-message success" : "join-message error"}>
                  {joinState.message}
                </p>
              ) : null}
            </form>
          ) : (
            <h1 className="screen-title">{currentView.title}</h1>
          )}

          {activeView === "home" ? (
            <div className="view-copy">
              <p>for students, founders, and builders</p>
            </div>
          ) : null}

        </section>
      </div>
    </main>
  );
}
