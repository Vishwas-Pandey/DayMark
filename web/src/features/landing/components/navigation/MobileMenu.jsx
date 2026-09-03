import React, { useState } from 'react';
import { MobileMenuButton } from './MobileMenuButton';
import { MobileNavigationDrawer } from './MobileNavigationDrawer';

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MobileMenuButton isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
      <MobileNavigationDrawer isOpen={isOpen} close={() => setIsOpen(false)} />
    </>
  );
};