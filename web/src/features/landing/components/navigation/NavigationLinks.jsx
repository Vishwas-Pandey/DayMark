import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NavigationItem } from './NavigationItem';
import { useActiveSection, scrollToSection } from '../../../../hooks/useActiveSection';

const links = [
  { label: 'Home', id: 'hero' },
  { label: 'Features', id: 'features' },
  { label: 'AI', id: 'ai' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'Roadmap', id: 'roadmap' },
  { label: 'About', id: 'about' },
];

const sectionIds = links.map(l => l.id);

export const NavigationLinks = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const activeSection = useActiveSection(sectionIds);

  return (
    <div className="flex items-center gap-1">
      {links.map((link, idx) => (
        <NavigationItem 
          key={idx}
          label={link.label}
          href={`/#${link.id}`}
          isActive={activeSection === link.id}
          isHovered={hoveredIndex === idx}
          onHover={() => setHoveredIndex(idx)}
          onLeave={() => setHoveredIndex(null)}
          onClick={(e) => scrollToSection(e, link.id)}
        />
      ))}
    </div>
  );
};
