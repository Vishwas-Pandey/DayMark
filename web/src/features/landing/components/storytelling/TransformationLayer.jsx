import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { MagneticAlignment } from './MagneticAlignment';
import { TimelineConnector } from './TimelineConnector';
import { ProgressBeam } from './ProgressBeam';

export const TransformationLayer = ({ scrollProgress }) => {
  // Visible during transition 0.3 - 0.7
  const opacity = useTransform(scrollProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const pointerEvents = 'none';

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity, pointerEvents }}
    >
      <ProgressBeam scrollProgress={scrollProgress} />
      <TimelineConnector scrollProgress={scrollProgress} />
      <MagneticAlignment scrollProgress={scrollProgress} />
    </motion.div>
  );
};