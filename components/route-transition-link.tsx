"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";

type RouteTransitionLinkProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
  delayMs?: number;
  overlayDurationMs?: number;
};

export default function RouteTransitionLink({
  children,
  className,
  href,
  delayMs = 420,
  overlayDurationMs = 420
}: RouteTransitionLinkProps) {
  const router = useRouter();
  const timeoutRef = useRef<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleClick() {
    if (isTransitioning) return;

    setIsTransitioning(true);
    timeoutRef.current = window.setTimeout(() => {
      startTransition(() => {
        router.push(href);
      });
    }, delayMs);
  }

  return (
    <>
      <button className={className} onClick={handleClick} type="button">
        {children}
      </button>
      <div
        aria-hidden="true"
        className={isTransitioning ? "route-transition-overlay active" : "route-transition-overlay"}
        style={isTransitioning ? { animationDuration: `${overlayDurationMs}ms` } : undefined}
      />
    </>
  );
}
