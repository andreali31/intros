"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import RouteTransitionLink from "@/components/route-transition-link";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqykegk";

export default function JoinPage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<{
    kind: "idle" | "success" | "error";
    message: string;
  }>({ kind: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setState({ kind: "idle", message: "" });

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const result = (await response.json()) as {
        message?: string;
      };

      if (!response.ok) {
        setState({
          kind: "error",
          message: result.message || "Submission failed."
        });
        return;
      }

      setEmail("");
      setState({
        kind: "success",
        message: "thanks, we'll reach out if there's a fit"
      });
    } catch {
      setState({
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
          <div className="header-link-stack">
            <RouteTransitionLink className="header-home-link intros-word" href="/">
              intros
            </RouteTransitionLink>
            <Link className="header-events-link events-word" href="/events">
              events
            </Link>
          </div>
        </header>

        <section className="screen-body join-screen-body">
          <form className="join-block" onSubmit={handleSubmit}>
            <input
              aria-label="Email"
              autoComplete="email"
              className="join-input"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@caltech.edu"
              type="email"
              value={email}
            />
            <button className="join-title-submit screen-title screen-title-event events-word" disabled={isSubmitting} type="submit">
              submit
            </button>
            {state.kind !== "idle" ? (
              <p className={state.kind === "success" ? "join-message success" : "join-message error"}>
                {state.message}
              </p>
            ) : null}
          </form>
        </section>
      </div>
    </main>
  );
}
