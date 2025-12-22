import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * useGsapSectionTransition
 * يضيف أنيميشن Reveal للعناصر داخل كل سكشن عند الدخول (بدون Loader)
 * استخدم الكلاس section-gsap على كل سكشن رئيسي، و reveal-gsap على العناصر الداخلية
 */
export function useGsapSectionTransition() {
  const revealedSections = useRef<Set<HTMLElement>>(new Set());

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('.section-gsap')) as HTMLElement[];
    sections.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 80, scale: 0.98, filter: 'none' });
    });
    let lastSection: HTMLElement | null = null;
    let ticking = false;
    let lastIndex = -1;
    function animateSectionIn(section: HTMLElement) {
      // Parallax effect for .parallax-gsap children
      const parallaxEls = Array.from(section.querySelectorAll('.parallax-gsap')) as HTMLElement[];
      // Reveal all direct children with .reveal-gsap class in order
      const revealEls = Array.from(section.querySelectorAll(':scope > .reveal-gsap')) as HTMLElement[];
      revealEls.forEach((el, idx) => {
        gsap.fromTo(el, {
          opacity: 0,
          y: 28,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.28,
          delay: 0.06 + idx * 0.06,
          ease: 'power1.out',
        });
      });
      // Section itself: فقط ظهور تدريجي وحركة رأسية بسيطة
      gsap.fromTo(section, {
        opacity: 0,
        y: 36,
        filter: 'none',
      }, {
        opacity: 1,
        y: 0,
        filter: 'none',
        boxShadow: 'none',
        borderColor: '#a855f7',
        duration: 0.28,
        ease: 'power1.out',
        overwrite: 'auto',
      });
    }
    function animateSectionOut(section: HTMLElement, direction: 1 | -1) {
      gsap.to(section, {
        opacity: 0,
        y: 24 * direction,
        filter: 'none',
        boxShadow: 'none',
        borderColor: '#e5e7eb',
        duration: 0.16,
        ease: 'power1.in',
        overwrite: 'auto',
      });
    }
    function handleScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        let found = false;
        for (let i = 0; i < sections.length; i++) {
          const el = sections[i];
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.2) {
            if (lastSection !== el) {
              // Determine direction
              const direction = lastIndex !== -1 && i > lastIndex ? 1 : -1;
              if (lastSection) {
                animateSectionOut(lastSection, direction);
                setTimeout(() => animateSectionIn(el), 180);
              } else {
                animateSectionIn(el);
              }
              lastSection = el;
              lastIndex = i;
            }
            found = true;
            break;
          }
        }
        ticking = false;
      });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}
