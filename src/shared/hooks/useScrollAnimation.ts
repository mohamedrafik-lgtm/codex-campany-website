"use client";

import { useEffect } from 'react';

export function useScrollAnimation() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section')) as HTMLElement[];
    let currentIndex = 0;
    let isAnimating = false;

    if (sections.length === 0) return;

    // Animate content elements in a section
    const animateInContent = (section: HTMLElement) => {
      const items = section.querySelectorAll('[data-animate]') as NodeListOf<HTMLElement>;
      items.forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'none';
        
        setTimeout(() => {
          item.style.transition = `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s`;
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 100);
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

    // Initial setup
    sections.forEach((section) => {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    });

    // Animate first section content
    setTimeout(() => {
      animateInContent(sections[0]);
    }, 300);

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);
}

