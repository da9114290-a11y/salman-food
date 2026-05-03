/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SalmanFoodLogo } from '../logo/SalmanFoodLogo';
import { useCartStore, selectTotalItems } from '../../store/cartStore';
import { NAV_LINKS, PHONE } from '../../lib/constants';

// Custom Hook for Scroll Position
const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
};

export const Navbar = () => {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 80;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart } = useCartStore();
  const totalItems = useCartStore(selectTotalItems);
  const [pulse, setPulse] = useState(false);

  // Trigger pulse animation when totalItems changes
  useEffect(() => {
    if (totalItems > 0) {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  const navLinkClasses = `
    relative font-heading font-semibold uppercase tracking-[0.5px] text-sm md:text-base transition-colors duration-300
    after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-red after:transition-all after:duration-300
    hover:text-brand-red hover:after:w-full
  `;

  const scrolledTheme = isScrolled 
    ? 'bg-white text-brand-dark shadow-md py-3' 
    : 'bg-transparent text-white py-6';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolledTheme}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left: Logo */}
        <motion.a 
          href="/" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-shrink-0"
        >
          <SalmanFoodLogo 
            size={isScrolled ? 'sm' : 'md'} 
            variant="full" 
            className={!isScrolled ? 'invert brightness-200' : ''}
          />
        </motion.a>

        {/* Center: Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={`${navLinkClasses} ${isScrolled ? 'text-brand-dark' : 'text-white'}`}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Cart Icon */}
          <motion.button
            onClick={() => toggleCart(true)}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              ...(pulse ? { scale: [1, 1.2, 1] } : {}) 
            }}
            className="relative p-2 group"
            transition={{ duration: 0.3 }}
          >
            {/* Custom Shopping Bag SVG */}
            <svg 
              width="24" height="24" viewBox="0 0 24 24" fill="none" 
              className={`transition-colors duration-300 ${isScrolled ? 'stroke-brand-dark' : 'stroke-white'}`}
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                {totalItems}
              </span>
            )}
          </motion.button>

          {/* CTA Button */}
          <motion.a
            href={`tel:${PHONE}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden md:block bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark px-6 py-2.5 rounded-brand font-heading font-bold text-sm tracking-wider uppercase transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_4px_15px_rgba(214,35,0,0.25)]"
          >
            Order Now
          </motion.a>

          {/* Mobile Hamburger Hamburger to X animation */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span className={`w-6 h-0.5 transition-all ${isScrolled ? 'bg-brand-dark' : 'bg-white'}`}></span>
            <span className={`w-6 h-0.5 transition-all ${isScrolled ? 'bg-brand-dark' : 'bg-white'}`}></span>
            <span className={`w-6 h-0.5 transition-all ${isScrolled ? 'bg-brand-dark' : 'bg-white'}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[85%] max-w-sm bg-white z-[70] shadow-2xl flex flex-col p-8"
            >
              <div className="flex items-center justify-between mb-12">
                <SalmanFoodLogo size="sm" />
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-brand-dark hover:text-brand-red transition-colors"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="flex flex-col gap-8 flex-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-heading font-bold text-2xl uppercase tracking-widest text-brand-dark hover:text-brand-red border-l-4 border-transparent hover:border-brand-red pl-4 transition-all"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="mt-auto">
                <a 
                  href={`tel:${PHONE}`}
                  className="w-full bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark py-4 rounded-brand font-heading font-bold text-lg uppercase tracking-widest text-center shadow-card flex items-center justify-center"
                >
                  Order Now
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
