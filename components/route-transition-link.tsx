"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";

type RouteTransitionLinkProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
};

export default function RouteTransitionLink({
  children,
  className,
  href
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
    }, 420);
  }

  return (
    <>
      <button className={className} onClick={handleClick} type="button">
        {children}
      </button>
      <div
        aria-hidden="true"
        className={isTransitioning ? "route-transition-overlay active" : "route-transition-overlay"}
      />
    </>
  );
}
