/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';
import { ChevronDown, ArrowRight, Star, Clock, Utensils } from 'lucide-react';

export const HeroSection = () => {
  const headlineWords1 = ["BOLD", "FLAVORS."];
  const headlineWords2 = ["REAL", "FAST."];

  const floatingAnimation = {
    y: [-10, 10],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  };

  const smoothScrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center bg-brand-dark">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&q=80"
          alt="Salman Food Hero"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#8B0000]/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20 flex flex-col justify-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex mb-8"
        >
          <span className="bg-brand-red text-white font-heading font-bold uppercase tracking-widest text-[10px] md:text-xs px-4 py-1.5 rounded-pill shadow-lg">
            Now Open in Your City
          </span>
        </motion.div>

        {/* Main Headline */}
        <div className="mb-6">
          <h1 className="font-heading font-black text-white leading-[0.9] tracking-tighter uppercase">
            <div className="flex flex-wrap md:flex-nowrap gap-x-4 text-6xl md:text-8xl">
              {headlineWords1.map((word, i) => (
                <motion.span
                  key={`headline-1-${i}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-x-4 text-brand-yellow text-6xl md:text-8xl">
              {headlineWords2.map((word, i) => (
                <motion.span
                  key={`headline-2-${i}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </h1>
        </div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-white/80 font-body text-base md:text-lg max-w-[520px] mb-10 leading-relaxed text-center md:text-left"
        >
          Crispy chicken, loaded burgers & legendary deals — ready in minutes. Experience the crunch that makes Salman Food the #1 choice.
        </motion.p>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 md:gap-6"
        >
          <button className="group w-full sm:w-auto bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark px-10 py-4 rounded-brand font-heading font-bold text-base uppercase tracking-widest transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_8px_30px_rgba(255,199,44,0.4)] flex items-center justify-center gap-2">
            Order Now
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-white hover:text-brand-dark text-white px-10 py-4 rounded-brand font-heading font-bold text-base uppercase tracking-widest transition-all duration-250">
            View Menu
          </button>
        </motion.div>
      </div>

      {/* Floating Food Images (Desktop) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-30">
        {/* Top Right: Chicken */}
        <motion.div
          animate={floatingAnimation}
          className="absolute top-[15%] right-[10%] w-48 h-48 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80"
            alt="Fried Chicken"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Middle Right: Fries */}
        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 0.5 },
          }}
          className="absolute top-[50%] right-[3%] w-40 h-40 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1573016608244-7d5fd1fb9fe8?w=600&q=80"
            alt="French Fries"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      {/* Stats Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-0 left-0 w-full bg-black/50 backdrop-blur-md border-t border-white/10 z-40 py-6"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 divide-x divide-white/10">
          <div className="text-center md:text-left md:px-8">
            <div className="font-accent text-brand-yellow text-3xl md:text-4xl leading-none">50+</div>
            <div className="text-white/60 font-body text-[10px] md:text-xs uppercase tracking-widest mt-1">Menu Items</div>
          </div>
          <div className="text-center md:px-8">
            <div className="font-accent text-brand-yellow text-3xl md:text-4xl leading-none">20 MIN</div>
            <div className="text-white/60 font-body text-[10px] md:text-xs uppercase tracking-widest mt-1">Free Delivery</div>
          </div>
          <div className="text-center md:text-right md:px-8">
            <div className="font-accent text-brand-yellow text-3xl md:text-4xl leading-none">4.8 ★</div>
            <div className="text-white/60 font-body text-[10px] md:text-xs uppercase tracking-widest mt-1">Trust Rating</div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={smoothScrollToMenu}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="text-white/50 font-heading font-bold text-[10px] uppercase tracking-[0.3em] group-hover:text-brand-yellow transition-colors">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-red to-transparent relative overflow-hidden">
             <motion.div 
               animate={{ y: [0, 48] }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
               className="w-full h-1/2 bg-white absolute top-0"
             />
        </div>
        <ChevronDown size={20} className="text-brand-red group-hover:text-brand-yellow transition-colors" />
      </motion.div>
    </section>
  );
};
