"use client";

import { useEffect } from "react";

export function useRevealOnScroll(ref: React.RefObject<HTMLElement>, options?: IntersectionObserverInit) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add('is-revealed');
          observer.unobserve(el);
        }
      });
    }, options || { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    // start hidden (ensure classes present)
    el.classList.add('reveal-initial');
    observer.observe(el);

    return () => observer.disconnect();
  }, [ref, options]);
}

export default useRevealOnScroll;
