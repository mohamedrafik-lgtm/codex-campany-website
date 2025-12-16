"use client";

import { useEffect } from 'react';

export function useScrollAnimation() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section')) as HTMLElement[];
    let currentIndex = 0;
    let isAnimating = false;

    if (sections.length === 0) return;

    // Animate content elements in a section
    const animateInContent = (section: HTMLElement, force = false) => {
      const items = section.querySelectorAll('[data-animate]') as NodeListOf<HTMLElement>;
      items.forEach((item, i) => {
        // Only hide if not already visible, unless forced
        if (force || item.style.opacity !== '1') {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          item.style.transition = 'none';
          
          setTimeout(() => {
            item.style.transition = `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s`;
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        }
      });
    };

    // Scroll to next/prev section with animation
    const scrollToSection = (index: number) => {
      if (index < 0 || index >= sections.length || isAnimating) return;

      isAnimating = true;
      const targetSection = sections[index];

      // Animate current section out
      const currentSection = sections[currentIndex];
      currentSection.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      
      if (index > currentIndex) {
        currentSection.style.transform = 'translateY(-100px)';
        currentSection.style.opacity = '0';
      } else {
        currentSection.style.transform = 'translateY(100px)';
        currentSection.style.opacity = '0';
      }

      // Animate target section in
      setTimeout(() => {
        targetSection.scrollIntoView({ behavior: 'instant' });
        targetSection.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        targetSection.style.transform = 'translateY(0)';
        targetSection.style.opacity = '1';

        // Animate content
        setTimeout(() => {
          animateInContent(targetSection);
          currentIndex = index;
          isAnimating = false;
        }, 100);
      }, 50);
    };

    // Mouse wheel handler
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating) {
        e.preventDefault();
        return;
      }

      if (e.deltaY > 0 && currentIndex < sections.length - 1) {
        e.preventDefault();
        scrollToSection(currentIndex + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        e.preventDefault();
        scrollToSection(currentIndex - 1);
      }
    };

    // Initial setup - make all sections visible
    sections.forEach((section) => {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
      
      // Make all content visible by default
      const items = section.querySelectorAll('[data-animate]') as NodeListOf<HTMLElement>;
      items.forEach((item) => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      });
    });

    // Animate first section content
    setTimeout(() => {
      animateInContent(sections[0]);
    }, 300);

    // Handle hash navigation (from navbar clicks)
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;

      const targetIndex = sections.findIndex(section => section.id === hash);
      if (targetIndex !== -1) {
        const targetSection = sections[targetIndex];
        
        // First make sure section is visible
        targetSection.style.opacity = '1';
        targetSection.style.transform = 'translateY(0)';
        
        // Show all items immediately
        const items = targetSection.querySelectorAll('[data-animate]') as NodeListOf<HTMLElement>;
        items.forEach((item, i) => {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            item.style.transition = `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s`;
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 150);
        });
        
        currentIndex = targetIndex;
      }
    };

    // Observe when sections come into view
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target as HTMLElement;
          const items = section.querySelectorAll('[data-animate]') as NodeListOf<HTMLElement>;
          
          // Animate content when section is in view
          items.forEach((item, i) => {
            setTimeout(() => {
              item.style.transition = `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)`;
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, i * 100);
          });
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => observer.observe(section));
    
    // Journey steps progress (timeline)
    const journeySteps = Array.from(document.querySelectorAll('.journey-step')) as HTMLElement[];
    const progressEl = document.getElementById('journey-progress');
    let stepObserver: IntersectionObserver | null = null;

    if (journeySteps.length && progressEl) {
      stepObserver = new IntersectionObserver((entries) => {
        // choose the most visible entry
        let best: IntersectionObserverEntry | null = null;
        entries.forEach((e) => {
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        });
        if (!best) return;

        const idx = journeySteps.findIndex((s) => s === (best!.target as HTMLElement));
        journeySteps.forEach((s, i) => {
          if (i === idx) s.classList.add('active');
          else s.classList.remove('active');
        });

        const percent = ((idx + 1) / journeySteps.length) * 100;
        progressEl.style.transition = 'height 420ms cubic-bezier(0.2,0.9,0.2,1)';
        progressEl.style.height = `${percent}%`;
      }, { root: null, threshold: [0.25, 0.5, 0.75] });

      journeySteps.forEach((s) => stepObserver!.observe(s));
    }
    
    // Also add scroll event listener as backup
    const handleScroll = () => {
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        
        if (isVisible) {
          const items = section.querySelectorAll('[data-animate]') as NodeListOf<HTMLElement>;
          items.forEach((item) => {
            if (item.style.opacity !== '1') {
              item.style.transition = 'all 0.8s ease-out';
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }
          });
        }
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check initial hash on load
    handleHashChange();
    
    // Trigger scroll check immediately to show visible content
    handleScroll();

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      if (stepObserver) stepObserver.disconnect();
    };
  }, []);
}

