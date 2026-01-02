import { useEffect } from "react";
import gsap from "gsap";

/**
 * Hook: useGsapJourneySteps
 * يضيف أنيميشن GSAP على خطوات رحلة العمل (journey-step) بمحور X
 */
export function useGsapJourneySteps() {
  useEffect(() => {
    const steps = Array.from(document.querySelectorAll('.journey-step')) as HTMLElement[];
    steps.forEach((el, i) => {
      gsap.set(el, {
        opacity: i === 0 ? 1 : 0,
        x: i === 0 ? 0 : 120,
        scale: i === 0 ? 1 : 0.96,
        filter: i === 0 ? 'blur(0px)' : 'blur(12px)',
        display: i === 0 ? 'flex' : 'none',
      });
      if (i === 0) {
        el.classList.add('gsap-revealed');
      } else {
        el.classList.remove('gsap-revealed');
      }
    });
    let lastActive = 0;
    function revealStep() {
      let activeIdx = -1;
      for (let i = 0; i < steps.length; i++) {
        const rect = steps[i].getBoundingClientRect();
        // Center of viewport
        if (rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.3) {
          activeIdx = i;
          break;
        }
      }
      if (activeIdx === -1) activeIdx = 0;
      steps.forEach((el, i) => {
        if (i === activeIdx) {
          el.classList.add('gsap-revealed');
          gsap.set(el, { display: 'flex' });
          gsap.fromTo(el,
            { opacity: 0, x: 120, scale: 0.96, filter: 'blur(12px)' },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.85,
              delay: 0.08,
              ease: 'back.out(1.5)',
              overwrite: 'auto',
              onComplete: () => { gsap.set(el, { display: 'flex' }); }
            }
          );
          // Stagger reveal for children
          const children = Array.from(el.querySelectorAll('h4, p, ul, li')) as HTMLElement[];
          gsap.fromTo(children,
            { opacity: 0, x: 40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              delay: 0.22,
              stagger: 0.08,
              ease: 'power2.out',
              overwrite: 'auto',
            }
          );
        } else {
          el.classList.remove('gsap-revealed');
          gsap.to(el, {
            opacity: 0,
            x: -120,
            scale: 0.96,
            filter: 'blur(12px)',
            duration: 0.5,
            ease: 'power1.in',
            overwrite: 'auto',
            onComplete: () => { setTimeout(() => gsap.set(el, { display: 'none' }), 80); }
          });
        }
      });
      lastActive = activeIdx;
    }
    window.addEventListener('scroll', revealStep, { passive: true });
    revealStep();
    return () => window.removeEventListener('scroll', revealStep);
  }, []);
}
