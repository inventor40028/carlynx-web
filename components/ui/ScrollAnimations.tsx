// Scroll animation component
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset all animations when route changes
    const resetAnimations = () => {
      const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in, .scale-in');
      animatedElements.forEach((el) => {
        el.classList.remove('visible');
      });
    };

    resetAnimations();

    // Initialize animations after a short delay
    const timer = setTimeout(() => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, observerOptions);

      // Observe all elements with animation classes
      const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in, .scale-in');

      if (animatedElements.length > 0) {
        animatedElements.forEach((el) => observer.observe(el));
      }

      return () => {
        const elements = document.querySelectorAll('.fade-in-up, .fade-in, .scale-in');
        elements.forEach((el) => observer.unobserve(el));
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]); // Re-run when route changes

  return null;
}
