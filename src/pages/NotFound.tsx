/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Utensils, ArrowLeft, Menu as MenuIcon } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center p-6 text-center overflow-hidden">
      <div className="max-w-xl w-full relative">
        {/* Large Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 select-none">
          <span className="font-accent text-[200px] md:text-[300px] text-brand-red opacity-[0.03] leading-none">
            404
          </span>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="space-y-8"
        >
          {/* Empty Plate Illustration */}
          <div className="flex justify-center">
            <div className="relative">
              <svg 
                width="120" 
                height="120" 
                viewBox="0 0 120 120" 
                className="text-brand-red/20 fill-none"
              >
                <circle cx="60" cy="60" r="58" stroke="currentColor" strokeWidth="4" />
                <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-brand-red">
                <Utensils size={48} className="opacity-40" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="font-heading font-black text-4xl md:text-5xl text-brand-dark uppercase tracking-tighter">
              PAGE NOT FOUND
            </h1>
            <p className="text-brand-muted font-heading font-bold text-lg md:text-xl uppercase tracking-widest max-w-sm mx-auto">
              Looks like this page took a <span className="text-brand-red italic">lunch break.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link
              to="/"
              className="w-full sm:w-auto bg-brand-red text-white px-8 py-4 rounded-full font-heading font-black uppercase tracking-widest text-xs shadow-xl shadow-brand-red/20 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
            >
              <ArrowLeft size={18} /> Back to Home
            </Link>
            <Link
              to="/#menu"
              className="w-full sm:w-auto bg-white border border-brand-border text-brand-dark px-8 py-4 rounded-full font-heading font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-95 transition-all"
            >
              <MenuIcon size={18} /> View Menu
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
