/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const FloatingWhatsApp: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '923001234567';
  const message = 'Hi! I\'d like to place an order.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex items-center gap-3">
      <style>
        {`
          @keyframes pulse-green {
            0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
            70% { box-shadow: 0 0 0 15px transparent; }
            100% { box-shadow: 0 0 0 0 transparent; }
          }
          .animate-pulse-whatsapp {
            animation: pulse-green 2s infinite;
          }
        `}
      </style>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="bg-brand-dark text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg shadow-xl shadow-black/20 hidden sm:block whitespace-nowrap mb-1"
          >
            Chat with us!
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group block w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-xl shadow-[#25D366]/20 transition-all hover:scale-110 active:scale-95 animate-pulse-whatsapp overflow-visible"
        aria-label="Chat with us on WhatsApp"
      >
        <svg 
          viewBox="0 0 24 24" 
          className="w-8 h-8 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.284l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.768-5.764-5.768zm3.392 8.127c-.147.412-.843.762-1.228.809-.386.046-.767.074-1.227-.123-.46-.197-1.077-.45-1.742-.777-1.579-.777-2.585-2.384-2.664-2.489-.078-.105-.646-.86-.646-1.642 0-.782.404-1.167.547-1.347.143-.18.33-.223.44-.223h.31c.11 0 .256-.041.4.31.146.35.503 1.226.547 1.32.044.093.073.201.014.32-.058.12-.088.192-.175.293-.088.102-.185.223-.264.298-.088.085-.181.18-.08.354.101.174.45.742.964 1.2.663.593 1.223.777 1.396.863.174.085.275.07.376-.044.101-.114.436-.508.552-.682.117-.174.234-.145.395-.084.16.06 1.017.48 1.192.566.174.085.29.128.334.202.044.073.044.423-.102.835z" />
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.83.49 3.542 1.35 5.02L2 22l5.074-1.313A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.477 0-2.872-.37-4.094-1.03l-.294-.158-3.03.784.8-2.923-.173-.28A7.954 7.954 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" clipRule="evenodd" />
        </svg>

        {/* Online Indicator */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-[#25D366] border-2 border-white rounded-full transition-transform group-hover:scale-110">
          <span className="absolute inset-0 bg-white/40 rounded-full animate-ping opacity-75" />
        </span>
      </a>
    </div>
  );
};
