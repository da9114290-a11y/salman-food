/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useToastStore, Toast } from '../../store/toastStore';

const SuccessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ErrorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="12" y1="8" x2="12.01" y2="8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ToastItem: React.FC<{ toast: Toast }> = ({ toast }) => {
  const removeToast = useToastStore((state) => state.removeToast);

  const configs = {
    success: {
      color: 'border-green-500 bg-green-50 text-green-800',
      icon: <SuccessIcon />,
      iconColor: 'bg-green-500',
    },
    error: {
      color: 'border-brand-red bg-red-50 text-red-800',
      icon: <ErrorIcon />,
      iconColor: 'bg-brand-red',
    },
    info: {
      color: 'border-blue-500 bg-blue-50 text-blue-800',
      icon: <InfoIcon />,
      iconColor: 'bg-blue-500',
    },
  };

  const config = configs[toast.type];

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      className={`flex items-center gap-3 px-4 py-3 min-w-[300px] border-l-4 rounded-r-lg shadow-xl mb-3 pointer-events-auto ${config.color}`}
    >
      <div className={`flex-shrink-0 w-8 h-8 rounded-full text-white flex items-center justify-center ${config.iconColor}`}>
        {config.icon}
      </div>
      <p className="flex-1 font-body text-sm font-medium">{toast.message}</p>
      <button 
        onClick={() => removeToast(toast.id)}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <ErrorIcon />
      </button>
    </motion.div>
  );
};

export const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] pointer-events-none flex flex-col items-end">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
};
