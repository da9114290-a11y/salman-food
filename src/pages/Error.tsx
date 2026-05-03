/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { RefreshCw, PhoneCall, AlertTriangle } from 'lucide-react';

export const GlobalError: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center p-6 text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full bg-white p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-8"
      >
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-red-50 text-brand-red rounded-3xl flex items-center justify-center -rotate-6">
            <AlertTriangle size={40} />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="font-heading font-black text-3xl text-brand-dark uppercase tracking-tight">
            Oops! Something went wrong.
          </h1>
          <p className="text-brand-muted font-medium leading-relaxed">
            Our chefs are already on it. The kitchen had a small fire, but we're putting it out. Try refreshing the page.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleRefresh}
            className="w-full bg-brand-red text-white py-5 rounded-pill font-heading font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-brand-red/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <RefreshCw size={18} /> Refresh Page
          </button>
          
          <a
            href="tel:+923001234567"
            className="w-full bg-brand-dark text-white py-5 rounded-pill font-heading font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 hover:bg-brand-red transition-colors"
          >
            <PhoneCall size={18} /> Contact Support
          </a>
        </div>

        <div className="pt-4">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
            Error Code: SERVER_KITCHEN_OVERHEAT
          </p>
        </div>
      </motion.div>
    </div>
  );
};
