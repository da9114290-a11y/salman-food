/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[110] p-4 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_-8px_40px_rgba(0,0,0,0.12)] border border-gray-100 p-6 flex flex-col md:flex-row items-center gap-6 pointer-events-auto">
            <div className="bg-brand-red/5 p-4 rounded-2xl text-brand-red flex-shrink-0">
              <ShieldCheck size={32} />
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-2">
              <h4 className="font-heading font-black text-lg text-brand-dark uppercase tracking-tight">
                We value your privacy
              </h4>
              <p className="text-sm text-brand-muted font-medium leading-relaxed">
                We use cookies to improve your experience, remember your cart items, and analyze site traffic. By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <button
                onClick={handleAccept}
                className="w-full sm:w-auto px-8 py-3 bg-brand-red text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-brand-red/20 active:scale-95 transition-all"
              >
                Accept All
              </button>
              <button
                onClick={handleDismiss}
                className="w-full sm:w-auto px-8 py-3 bg-white border border-gray-200 text-brand-dark text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-gray-50 active:scale-95 transition-all"
              >
                Manage Preferences
              </button>
            </div>

            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-brand-red transition-colors md:relative md:top-0 md:right-0"
              aria-label="Dismiss cookie banner"
            >
              <X size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
