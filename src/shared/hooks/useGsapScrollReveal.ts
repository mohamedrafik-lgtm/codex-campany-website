import { useEffect } from "react";
import gsap from "gsap";

/**
 * Hook: useGsapScrollReveal
 * يضيف أنيميشن GSAP Reveal على العناصر عند ظهورها في السكرول
 * استخدم الكلاس reveal-gsap على أي عنصر تريد أن يظهر بتأثير
 */
export function useGsapScrollReveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll('.reveal-gsap')) as HTMLElement[];
    items.forEach((el, i) => {
      gsap.set(el, {
        opacity: 0,
        y: 0,
        scale: 1,
        filter: 'none',
        boxShadow: 'none'
      });
    });
    const reveal = () => {
      items.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        // Parallax effect (y based on scroll)
        // لا يوجد أي حركة أو بارالكس
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0 && !el.classList.contains('gsap-revealed')) {
          el.classList.add('gsap-revealed');
          gsap.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'none',
            boxShadow: 'none',
            duration: 0.38,
            delay: i * 0.04,
            ease: 'power1.out',
          });
        }
      });
    };
    window.addEventListener('scroll', reveal, { passive: true });
    reveal();
    return () => window.removeEventListener('scroll', reveal);
  }, []);
}
