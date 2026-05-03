/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SalmanFoodLogo } from '../logo/SalmanFoodLogo';

export const LoadingScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('visited');
    if (hasVisited) {
      setIsVisible(false);
      setShouldRender(false);
    } else {
      setShouldRender(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('visited', 'true');
      }, 2500); // 2s loading + 0.5s buffer
      return () => clearTimeout(timer);
    }
  }, []);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[10000] bg-[#1A1A1A] flex flex-col items-center justify-center p-6 text-center"
        >
          <div className="space-y-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SalmanFoodLogo size="xl" color="white" />
            </motion.div>

            <div className="space-y-3 flex flex-col items-center">
              <div className="w-[200px] h-[3px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="h-full bg-brand-yellow"
                />
              </div>
              <p className="text-white/40 font-body text-[13px] tracking-widest uppercase">
                Loading boldness...
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
