import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export const LoaderParticles = ({ isExiting }) => {
  const canvasRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Bounds check
    const width = window.innerWidth;
    const maxParticles = width > 1024 ? 32 : width > 768 ? 20 : 12;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 2 + 0.5; // Depth for parallax speed
        this.size = Math.random() * 1.2 + 0.5;
        this.speedY = ((Math.random() - 0.5) * 0.15) / this.z;
        this.speedX = ((Math.random() - 0.5) * 0.15) / this.z;
        this.baseOpacity = Math.random() * 0.2 + 0.05;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        
        // Wrap around bounds
        if (this.y < -10) this.y = canvas.height + 10;
        if (this.y > canvas.height + 10) this.y = -10;
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;
        
        this.pulse += this.pulseSpeed;
      }
      draw() {
        const currentOpacity = this.baseOpacity + Math.sin(this.pulse) * 0.05;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Soft glow color (indigo-ish)
        ctx.fillStyle = `rgba(139, 142, 255, ${Math.max(0, currentOpacity)})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < maxParticles; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isExiting ? 'opacity-0' : 'opacity-100'}`}
    />
  );
};