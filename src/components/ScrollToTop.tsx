"use client";

import { useEffect, useRef, useState } from "react";

// How long (ms) after scroll stops before the button hides itself
const HIDE_DELAY = 4500;

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // rAF handle – ensures the scroll handler runs at most once per frame
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Throttle to one read per animation frame (max ~60-120/s → 1/frame)
      if (rafRef.current !== null) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;

        if (window.scrollY > 300) {
          setIsVisible(true);

          // Reset the hide countdown on every scroll event
          if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
          hideTimerRef.current = setTimeout(() => {
            setIsVisible(false);
          }, HIDE_DELAY);
        } else {
          // Immediately hide when back near the top
          if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
          setIsVisible(false);
        }
      });
    };

    // { passive: true } tells the browser this handler never calls
    // preventDefault(), so it doesn't block the scroll pipeline.
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // No <style> tag here — all CSS lives in globals.css (static, cached).
  return (
    <button
      onClick={scrollToTop}
      className={`scroll-to-top-btn ${isVisible ? "visible" : "hidden"}`}
      aria-label="Scroll to top"
      title="Back to top"
    >
      <svg
        className="scroll-to-top-icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {/* Apple SF Symbols-style chevron up */}
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
};
