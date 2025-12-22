import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Hook to animate section transitions using GSAP.
 * Usage: ضع ref على كل سكشن، ومرر array refs للهوك
 */
export function useSectionNavigation(sectionRefs: React.RefObject<HTMLElement>[]) {
  const isAnimating = useRef(false);
  const lastScroll = useRef(0);
  const initialLoad = useRef(true);

  useEffect(() => {
    if (!sectionRefs.length) return;

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }
      if (initialLoad.current) {
        initialLoad.current = false;
        return;
      }
      const windowH = window.innerHeight;
      let currentIdx = sectionRefs.findIndex(ref => {
        if (!ref.current) return false;
        const rect = ref.current.getBoundingClientRect();
        return rect.top <= windowH * 0.3 && rect.bottom > windowH * 0.3;
      });
      if (currentIdx === -1) return;
      const section = sectionRefs[currentIdx].current!;
      const atTop = section.scrollTop === 0;
      const atBottom = Math.abs(section.scrollHeight - section.scrollTop - section.clientHeight) < 2;
      // Scroll down
      if (e.deltaY > 0 && atBottom && currentIdx < sectionRefs.length - 1) {
        e.preventDefault();
        animateToSection(currentIdx, currentIdx + 1, 1);
      }
      // Scroll up
      else if (e.deltaY < 0 && atTop && currentIdx > 0) {
        e.preventDefault();
        animateToSection(currentIdx, currentIdx - 1, -1);
      }
    };

    function animateToSection(currentIdx: number, nextIdx: number, direction: 1 | -1) {
      isAnimating.current = true;
      document.body.style.overflow = "hidden";
      const current = sectionRefs[currentIdx].current!;
      const next = sectionRefs[nextIdx].current!;
      gsap.to(current, {
        opacity: 0,
        y: 100 * direction,
        duration: 0.5,
        onComplete: () => {
          window.scrollTo({
            top: next.offsetTop,
            behavior: "auto"
          });
          gsap.fromTo(
            next,
            { opacity: 0, y: -100 * direction },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              onComplete: () => {
                isAnimating.current = false;
                document.body.style.overflow = "auto";
              }
            }
          );
        }
      });
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [sectionRefs]);
}
