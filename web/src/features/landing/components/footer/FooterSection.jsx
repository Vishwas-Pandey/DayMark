import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Globe, ArrowUpRight } from 'lucide-react';

const FooterLink = ({ children, href = "#" }) => (
  <a 
    href={href}
    className="group relative inline-flex items-center gap-1 py-1 text-sm text-text-muted transition-colors hover:text-text-heading focus-ring rounded"
  >
    <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
      {children}
    </span>
    <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-gradient-to-r from-interactive-primary to-purple-400 transition-all duration-300 group-hover:w-full opacity-50" />
  </a>
);

const SocialIcon = ({ icon: Icon, href, label }) => (
  <a
    href={href}
    aria-label={label}
    className="group relative flex h-10 w-10 items-center justify-center rounded-xl bg-surface-secondary/30 border border-border-default transition-all hover:bg-surface-secondary hover:border-interactive-primary/40 focus-ring"
  >
    <Icon className="h-4 w-4 text-text-muted transition-all duration-300 group-hover:text-text-heading group-hover:scale-110" />
    <div className="absolute inset-0 rounded-xl bg-interactive-primary/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
  </a>
);

export const FooterSection = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-surface-primary pt-32 pb-10 border-t border-border-default/20">
      
      {/* Subtle top fade & background effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-default/50 to-transparent" />
        <div className="absolute top-[-20%] left-[30%] w-[500px] h-[500px] rounded-full bg-interactive-primary/5 blur-[120px] mix-blend-screen" />
        
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        
        {/* Faint grid */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,black_10%,transparent_90%)]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-5 flex flex-col gap-6 items-center text-center md:items-start md:text-left">
            <motion.div 
              className="flex items-center gap-3 cursor-default"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-interactive-primary to-purple-600 p-[1px]">
                <div className="w-full h-full bg-surface-primary rounded-xl flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-surface-primary/10" />
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-text-heading">DayMark</span>
            </motion.div>
            
            <p className="text-sm md:text-base text-text-muted leading-relaxed max-w-sm">
              The operating system for your life. Track habits, organize goals, understand your progress and build consistency one day at a time.
            </p>
            
            <div className="flex items-center gap-3">
              <motion.div 
                className="px-2.5 py-1 rounded-full bg-interactive-primary/10 border border-interactive-primary/20 text-interactive-primary text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5"
                animate={{ boxShadow: ['0 0 0 rgba(var(--color-interactive-primary-rgb),0)', '0 0 15px rgba(var(--color-interactive-primary-rgb),0.2)', '0 0 0 rgba(var(--color-interactive-primary-rgb),0)'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 7 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-interactive-primary" />
                v1.0 MVP
              </motion.div>
              <span className="text-xs font-medium text-text-muted/50">Last Updated 2026</span>
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start">
            <h4 className="text-text-heading font-semibold mb-6 tracking-wide">Product</h4>
            <div className="flex flex-col gap-4 text-center md:text-left items-center md:items-start">
              <FooterLink>Features</FooterLink>
              <FooterLink>AI Coach</FooterLink>
              <FooterLink>Dashboard</FooterLink>
              <FooterLink>Live Demo</FooterLink>
              <FooterLink>Goals & Habits</FooterLink>
            </div>
          </div>

          {/* Column 3: Resources */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start">
            <h4 className="text-text-heading font-semibold mb-6 tracking-wide">Resources</h4>
            <div className="flex flex-col gap-4 text-center md:text-left items-center md:items-start">
              <FooterLink>Documentation</FooterLink>
              <FooterLink>Roadmap</FooterLink>
              <FooterLink>Architecture</FooterLink>
              <FooterLink>Privacy Policy</FooterLink>
              <FooterLink>Terms of Service</FooterLink>
            </div>
          </div>

          {/* Column 4: Connect */}
          <div className="lg:col-span-3 flex flex-col items-center md:items-start lg:items-end">
            <h4 className="text-text-heading font-semibold mb-6 tracking-wide text-center md:text-left lg:text-right w-full">Connect</h4>
            <div className="flex gap-3">
              <SocialIcon icon={Github} href="https://github.com/vishwaspandey" label="GitHub" />
              <SocialIcon icon={Linkedin} href="#" label="LinkedIn" />
              <SocialIcon icon={Mail} href="#" label="Email" />
              <SocialIcon icon={Globe} href="#" label="Portfolio" />
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-default/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-sm font-medium text-text-heading">© 2026 DayMark</span>
            <span className="text-[11px] text-text-muted/60">Built with React, Tailwind, Framer Motion and Node.js.</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-medium text-text-muted bg-surface-secondary/30 px-3 py-1.5 rounded-full border border-border-default">
            <span>Designed & Engineered by</span>
            <a href="#" className="text-interactive-primary hover:text-interactive-primary/80 transition-colors flex items-center gap-0.5 group">
              Vishwas Pandey
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
        
      </div>
    </footer>
  );
};
