/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { SalmanFoodLogo } from '../../components/logo/SalmanFoodLogo';

export const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (password === 'SALMAN2024') {
      sessionStorage.setItem('admin_auth', '1');
      navigate('/admin');
    } else {
      setError('Incorrect password. Please try again.');
      // Shake animation effect is handled by Framer Motion on the error message
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#2A2A2A] to-[#1A1A1A]">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12 text-center space-y-8">
            <div className="flex flex-col items-center gap-4">
              <SalmanFoodLogo size="lg" />
              <div className="h-1 w-12 bg-brand-red rounded-full" />
              <h1 className="font-heading font-black text-2xl text-brand-dark uppercase tracking-tighter">
                Admin <span className="text-brand-red">Portal</span>
              </h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
                  Access Key
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-red transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border border-gray-100 rounded-pill pl-12 pr-12 py-4 text-sm focus:outline-none focus:border-brand-red focus:bg-white transition-all shadow-inner"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-dark transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: [0, -10, 10, -10, 10, 0], opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <AlertCircle size={14} />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-dark hover:bg-brand-red text-white py-5 rounded-pill font-heading font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
              Authorized Personnel Only<br />
              &copy; 2024 Salman Food
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
