/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SalmanFoodLogo } from '../logo/SalmanFoodLogo';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && /^\S+@\S+$/i.test(email)) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="relative">
      {/* PART 1: NEWSLETTER STRIP */}
      <div className="bg-brand-red py-10 md:py-14 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10"
        >
          <div className="text-center lg:text-left">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white uppercase tracking-tight mb-2">
              Get Exclusive Deals in Your Inbox
            </h2>
            <p className="text-white/80 font-body text-sm md:text-base">
              Join 25,000+ food lovers. No spam, just deals.
            </p>
          </div>

          <div className="w-full max-w-md">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white px-6 py-4 text-brand-dark focus:outline-none rounded-t-pill sm:rounded-l-pill sm:rounded-tr-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-brand-yellow hover:bg-white text-brand-dark font-heading font-black px-8 py-4 uppercase tracking-widest text-sm transition-all rounded-b-pill sm:rounded-r-pill sm:rounded-bl-none shadow-xl"
              >
                Subscribe
              </button>
            </form>
            <AnimatePresence>
              {subscribed && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-white font-bold text-xs mt-3 text-center sm:text-left bg-green-500/50 p-2 rounded-brand"
                >
                  You're in! Check your inbox for a welcome deal.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* PART 2: MAIN FOOTER */}
      <div className="bg-[#1A1A1A] pt-20 pb-10 text-white font-body">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
            
            {/* COLUMN 1: Brand Info */}
            <div className="space-y-6">
              <SalmanFoodLogo variant="full" size="lg" color="white" />
              <p className="font-heading italic text-brand-yellow uppercase font-bold tracking-widest text-sm">
                Bold Flavors. Real Fast.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Serving Karachi's boldest fast food since 2018. Fresh ingredients, unbeatable prices, delivered fast.
              </p>
              <div className="flex gap-3">
                {[
                  { id: 'fb', icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />, color: 'hover:bg-[#1877F2]' },
                  { id: 'ig', icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>, color: 'hover:bg-[#E4405F]' },
                  { id: 'tw', icon: <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768m2.464-2.464L20 4" />, color: 'hover:bg-slate-700' },
                  { id: 'tk', icon: <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />, color: 'hover:bg-black' },
                  { id: 'yt', icon: <><path d="m22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.46-5.58z" /><path d="m9.75 15.02 5.75-3.02-5.75-3.02z" fill="white" /></>, color: 'hover:bg-red-600' }
                ].map((social) => (
                  <a 
                    key={social.id}
                    href="#" 
                    className={`w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center transition-all group ${social.color} hover:scale-110 active:scale-95`}
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2 group-hover:text-white text-gray-400" strokeLinecap="round" strokeLinejoin="round">
                      {social.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* COLUMN 2: Quick Links */}
            <div className="space-y-8">
              <h3 className="font-heading font-semibold text-sm text-brand-yellow uppercase tracking-[0.2em]">Quick Links</h3>
              <ul className="space-y-4">
                {['Home', 'Menu', 'Deals', 'About Us', 'Contact', 'Careers', 'Franchise Inquiry'].map((link) => (
                  <li key={`quick-link-${link}`} className="flex items-center gap-2 group cursor-pointer">
                    <span className="text-brand-red transition-all group-hover:translate-x-1">›</span>
                    <a href={link === 'Home' ? '#' : `#${link.toLowerCase().replace(' ', '')}`} className="text-gray-400 text-sm hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3: Our Menu */}
            <div className="space-y-8">
              <h3 className="font-heading font-semibold text-sm text-brand-yellow uppercase tracking-[0.2em]">Our Menu</h3>
              <ul className="space-y-4">
                {['Burgers', 'Crispy Chicken', 'Hot Deals', 'Sides & Fries', 'Drinks', 'Desserts', 'Family Meals', 'Student Deals'].map((link) => (
                  <li key={`menu-link-${link}`} className="flex items-center gap-2 group cursor-pointer">
                    <span className="text-brand-red transition-all group-hover:translate-x-1">›</span>
                    <a href="#menu" className="text-gray-400 text-sm hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 4: Contact & App */}
            <div className="space-y-8">
              <h3 className="font-heading font-semibold text-sm text-brand-yellow uppercase tracking-[0.2em]">Get in Touch</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 items-start group">
                  <svg className="w-4 h-4 text-brand-red mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3" /></svg>
                  <span className="text-gray-400 text-sm hover:text-white transition-colors">Shop 4, Block 6, Gulshan-e-Iqbal, Karachi</span>
                </li>
                <li className="flex gap-3 items-center group">
                  <svg className="w-4 h-4 text-brand-red flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <a href="tel:02134567890" className="text-gray-400 text-sm hover:text-white transition-colors">021-34567890</a>
                </li>
                <li className="flex gap-3 items-center group">
                  <svg className="w-4 h-4 text-brand-red flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <a href="tel:0800725626" className="text-gray-400 text-sm hover:text-white transition-colors">0800-SALMAN (Toll Free)</a>
                </li>
                <li className="flex gap-3 items-center group">
                  <svg className="w-4 h-4 text-brand-red flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  <a href="mailto:orders@salmanfood.pk" className="text-gray-400 text-sm hover:text-white transition-colors">orders@salmanfood.pk</a>
                </li>
                <li className="flex gap-3 items-center group">
                  <svg className="w-4 h-4 text-brand-red flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  <span className="text-gray-400 text-sm hover:text-white transition-colors">Open Daily: 10 AM – 12 AM</span>
                </li>
              </ul>

              <div className="space-y-4 pt-4">
                 <h4 className="text-brand-yellow font-heading font-black text-[10px] uppercase tracking-widest">Download Our App</h4>
                 <div className="flex flex-wrap gap-3">
                    <button className="bg-[#2A2A2A] hover:bg-brand-red p-3 rounded-card border border-white/5 flex items-center gap-3 transition-all">
                       <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .76-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.36 2.35-1.04 3.14-.69.8-1.86 1.49-2.97 1.45-.14-1.12.35-2.25 1.07-3.09"/></svg>
                       <div className="text-left">
                          <p className="text-[8px] uppercase tracking-tighter opacity-60 leading-none mb-1">iOS 12+</p>
                          <p className="font-heading font-bold text-xs uppercase leading-none">App Store</p>
                       </div>
                    </button>
                    <button className="bg-[#2A2A2A] hover:bg-brand-red p-3 rounded-card border border-white/5 flex items-center gap-3 transition-all">
                       <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M3.25 1.8c-.37.4-.53 1.03-.53 1.83v16.74c0 .8.16 1.43.53 1.83l.11.1L12.5 12l.14-.14L3.36 1.7l-.11.1M15.5 14.88l-2.86-2.88.16-.16L15.5 9.12l3.3 1.88c.94.54.94 1.42 0 1.96l-3.3 1.92M12.64 11.86l-9.28-9.4L3.25 1.8l9.39 9.39-.11.11m-1 1.1l1 1 .11.11-9.5 9.5-.11-.11 9.5-10.51z"/></svg>
                       <div className="text-left">
                          <p className="text-[8px] uppercase tracking-tighter opacity-60 leading-none mb-1">Android 6+</p>
                          <p className="font-heading font-bold text-xs uppercase leading-none">Google Play</p>
                       </div>
                    </button>
                 </div>
              </div>
            </div>

          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* BOTTOM LEFT */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-gray-500 text-xs uppercase tracking-[0.2em] font-medium">
               <span>&copy; {new Date().getFullYear()} SALMAN FOOD. All Rights Reserved.</span>
               <span className="hidden md:inline text-white/10">|</span>
               <div className="flex gap-4">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-white transition-colors">Sitemap</a>
               </div>
            </div>

            {/* PAYMENT ICONS */}
            <div className="flex items-center gap-3 flex-wrap justify-center">
               {[
                 { id: 'visa', label: 'Visa', color: 'text-[#1A1F71]' },
                 { id: 'mc', label: 'Mastercard', color: 'text-[#EB001B]' },
                 { id: 'jc', label: 'JazzCash', color: 'text-[#FFD700]' },
                 { id: 'ep', label: 'EasyPaisa', color: 'text-[#00A859]' }
               ].map((pay) => (
                 <div key={pay.id} className="px-3 py-1 bg-white/5 rounded border border-white/5 text-[10px] font-black uppercase tracking-widest text-[#9CA3AF] hover:bg-white/10 transition-colors">
                    {pay.label}
                 </div>
               ))}
            </div>

            {/* BACK TO TOP */}
            <div className="absolute right-6 -top-6">
               <button 
                onClick={scrollToTop}
                className="w-12 h-12 bg-brand-red hover:bg-brand-red-hover text-white rounded-full flex items-center justify-center shadow-red transition-all hover:scale-110 active:scale-95 group"
               >
                 <svg className="w-6 h-6 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="18 15 12 9 6 15" /></svg>
               </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
