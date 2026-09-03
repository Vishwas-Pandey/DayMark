import { useState, useEffect } from 'react';

export const useActiveSection = (sectionIds, offset = 100) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const observers = [];
    const visibleSections = new Map();

    const callback = (entries) => {
      entries.forEach((entry) => {
        visibleSections.set(entry.target.id, entry.isIntersecting);
      });

      // Find the first section that is currently visible
      for (const id of sectionIds) {
        if (visibleSections.get(id)) {
          setActiveSection(id);
          break;
        }
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: `-${offset}px 0px -40% 0px`,
      threshold: 0
    });

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        observers.push(element);
      }
    });

    return () => {
      observers.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [sectionIds, offset]);

  return activeSection;
};

export const scrollToSection = (e, id) => {
  e.preventDefault();
  // Don't scroll if we are not on the landing page (i.e. URL has path other than /)
  if (window.location.pathname !== '/') {
    window.location.href = `/#${id}`;
    return;
  }
  
  const element = document.getElementById(id);
  if (element) {
    const navbarHeight = 70; // Approximation of sticky navbar
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // Update URL hash cleanly
    window.history.pushState(null, '', `/#${id}`);
  }
};
