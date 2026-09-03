import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { PreviewContainer } from './PreviewContainer';

export const ProductPreview = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative w-full h-[600vh] bg-surface-primary">
      {/* Background continuous from Hero */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="sticky top-0 h-[100dvh] w-full">
           <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
           <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-interactive-primary/10 blur-[120px]" />
           <div className="absolute top-[30%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-[#38bdf8]/10 blur-[120px]" />
        </div>
      </div>

      <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        <PreviewContainer scrollProgress={scrollYProgress} />
      </div>
    </section>
  );
};