import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { WindowControls } from './WindowControls';
import { PreviewSidebar } from './PreviewSidebar';
import { PreviewWorkspace } from './PreviewWorkspace';

export const DeviceFrame = ({ activeStepRaw }) => {
  // Perspective tilts based on scroll
  const rotateY = useTransform(activeStepRaw, [0, 5], [-4, 0]);
  const rotateX = useTransform(activeStepRaw, [0, 5], [2, 0]);
  const scale = useTransform(activeStepRaw, [0, 2.5, 5], [0.95, 1, 1.02]);

  return (
    <motion.div 
      className="w-full aspect-[16/10] max-w-[900px] rounded-xl border border-border-default bg-surface-primary shadow-2xl overflow-hidden flex flex-col perspective-[2000px] transform-gpu"
      style={{ rotateY, rotateX, scale }}
    >
      <WindowControls />
      <div className="flex flex-1 overflow-hidden">
        <PreviewSidebar activeStepRaw={activeStepRaw} />
        <PreviewWorkspace activeStepRaw={activeStepRaw} />
      </div>
    </motion.div>
  );
};