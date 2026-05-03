/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import { useCartStore, selectTotalItems } from '../../store/cartStore';

export const StickyOrderButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const totalItems = useCartStore(selectTotalItems);

  useEffect(() => {
    const handleScroll = () => {
      // Show after 500px scroll (approx hero height)
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] md:hidden w-[90%] max-w-[340px]"
        >
          <button
            onClick={scrollToMenu}
            className={`w-full bg-brand-yellow text-brand-dark px-6 py-4 rounded-pill font-heading font-black uppercase tracking-widest text-sm flex items-center justify-between shadow-2xl transition-all active:scale-95 ${
              totalItems > 0 ? 'animate-pulse-glow shadow-yellow-500/50' : 'shadow-black/20'
            }`}
          >
            <span className="flex items-center gap-3">
               <div className="relative">
                 <ShoppingBag size={20} />
                 {totalItems > 0 && (
                   <span className="absolute -top-2 -right-2 bg-brand-red text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                     {totalItems}
                   </span>
                 )}
               </div>
               Order Now
            </span>
            <span className="bg-brand-dark/10 px-3 py-1 rounded-pill text-[10px] font-black uppercase">
              View Menu
            </span>
          </button>
        </motion.div>
      )}
      
      <style>{`
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0 rgba(229, 184, 11, 0.4); }
          70% { box-shadow: 0 0 20px 10px rgba(229, 184, 11, 0); }
          100% { box-shadow: 0 0 0 0 rgba(229, 184, 11, 0); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
      `}</style>
    </AnimatePresence>
  );
};
