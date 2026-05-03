/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Share, ChevronRight } from 'lucide-react';
import { SalmanFoodLogo } from '../logo/SalmanFoodLogo';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const installEvent = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Check if already installed or dismissed this session
    const isDismissed = sessionStorage.getItem('pwa_dismissed');
    const isModalShown = sessionStorage.getItem('pwa_shown');
    
    if (isDismissed) return;

    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      installEvent.current = e;
      
      // Delay showing the banner for 30 seconds as requested
      if (!isModalShown) {
        const timer = setTimeout(() => {
          setIsVisible(true);
          sessionStorage.setItem('pwa_shown', 'true');
        }, 30000);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For iOS, we still want to show the instructions after 30s
    if (isIOSDevice && !isModalShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('pwa_shown', 'true');
      }, 30000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (installEvent.current) {
      await installEvent.current.prompt();
      const { outcome } = await installEvent.current.userChoice;
      if (outcome === 'accepted') {
        setIsVisible(false);
      }
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('pwa_dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 lg:p-6 pointer-events-none"
        >
          <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl border-t-4 border-brand-red p-4 flex items-center gap-4 pointer-events-auto">
            <div className="flex-shrink-0">
              <SalmanFoodLogo size="sm" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-heading font-black text-sm text-brand-dark uppercase tracking-tight">
                Add Salman Food to your homescreen!
              </h4>
              <p className="text-xs text-brand-muted font-medium mt-1">
                {isIOS 
                  ? "Tap the share button → 'Add to Home Screen'" 
                  : "Order faster, get exclusive app-only deals"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {!isIOS && (
                <button
                  onClick={handleInstall}
                  className="bg-brand-red text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg shadow-brand-red/20 flex items-center gap-1 active:scale-95 transition-transform"
                >
                  Install <ChevronRight size={12} />
                </button>
              )}
              {isIOS && (
                <div className="bg-blue-50 text-blue-600 p-2 rounded-full">
                  <Share size={16} />
                </div>
              )}
              <button
                onClick={handleDismiss}
                className="p-2 text-gray-400 hover:text-brand-red transition-colors"
                aria-label="Dismiss install prompt"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
