/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCartStore } from '../../store/cartStore';
import { Clock, Check, Trophy, ArrowRight, Flame } from 'lucide-react';

// --- Sub-component 1: Countdown Timer ---
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<{ h: string; m: string; s: string }>({ h: '00', m: '00', s: '00' });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      
      const diff = midnight.getTime() - now.getTime();
      
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);
      
      setTimeLeft({
        h: h.toString().padStart(2, '0'),
        m: m.toString().padStart(2, '0'),
        s: s.toString().padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center">
      <motion.div 
        key={value}
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#8B0000] rounded-card w-16 h-20 md:w-20 md:h-24 flex items-center justify-center shadow-lg border border-white/5"
      >
        <span className="font-accent text-4xl md:text-5xl text-brand-yellow leading-none">{value}</span>
      </motion.div>
      <span className="text-white/40 font-body text-[10px] uppercase tracking-widest mt-2">{label}</span>
    </div>
  );

  return (
    <div className="flex items-center gap-2 md:gap-4">
      <TimeUnit value={timeLeft.h} label="Hours" />
      <span className="text-brand-yellow font-accent text-3xl mb-6">:</span>
      <TimeUnit value={timeLeft.m} label="Mins" />
      <span className="text-brand-yellow font-accent text-3xl mb-6">:</span>
      <TimeUnit value={timeLeft.s} label="Secs" />
    </div>
  );
};

// --- Sub-component 2: Hero Deal ---
const HeroDeal = () => {
  const { addItem } = useCartStore();
  
  const heroDealItem = {
    id: 'deal-hero',
    name: 'Family Feast Deal',
    description: '4x Chicken, 2x Large Burgers, 4x Fries, 4x Drinks',
    price: 2500,
    originalPrice: 3300,
    category: 'Deals' as any,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
    rating: 5,
    reviewCount: 99
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#2A2A2A] rounded-card overflow-hidden shadow-2xl border border-white/5 flex flex-col lg:flex-row mb-16"
    >
      <div className="lg:w-1/2 p-8 md:p-12 space-y-6 flex flex-col justify-center">
        <div className="inline-flex">
          <span className="bg-brand-red text-white font-heading font-bold uppercase tracking-widest text-xs px-4 py-1.5 rounded-pill shadow-lg animate-pulse">
            Deal of the Day
          </span>
        </div>
        
        <h2 className="font-heading font-black text-4xl md:text-6xl text-white uppercase leading-[0.9] tracking-tighter">
          FAMILY <br/><span className="text-brand-yellow italic">FEAST</span>
        </h2>

        <ul className="space-y-3">
          {['4x Crispy Fried Chicken', '2x Large Burgers', '4x Regular Fries', '4x Drinks'].map((item, i) => (
            <li key={`deal-hero-item-${i}`} className="flex items-center gap-3 text-white/80 font-body text-sm md:text-base">
              <div className="bg-brand-red/20 p-1 rounded-full text-brand-red">
                <Check size={16} strokeWidth={3} />
              </div>
              {item}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6 pt-4">
          <div className="flex flex-col">
             <span className="font-accent text-5xl md:text-6xl text-brand-yellow leading-none">Rs. 2,500</span>
             <span className="bg-green-600/20 text-green-500 font-heading font-bold text-[10px] uppercase tracking-widest px-2 py-0.5 mt-1 rounded self-start">
               Save Rs. 800!
             </span>
          </div>
          <button 
            onClick={() => addItem(heroDealItem as any)}
            className="flex-1 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark px-8 py-5 rounded-brand font-heading font-bold text-lg uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg group"
          >
            Order This Deal <ArrowRight size={20} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="lg:w-1/2 relative min-h-[300px]">
        <img 
          src={heroDealItem.image} 
          alt="Family Feast" 
          className="w-full h-full object-cover md:rotate-[-3deg] md:scale-110 md:translate-x-4 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-6 right-6 bg-brand-red text-white w-24 h-24 rounded-full flex flex-col items-center justify-center rotate-12 shadow-card border-4 border-brand-yellow">
           <span className="font-heading font-black text-[10px] uppercase leading-tight text-center">Extra<br/>Sauce<br/>Free</span>
        </div>
      </div>
    </motion.div>
  );
};

// --- Sub-component 3: Deal Cards Grid ---
const deals = [
  {
    id: 'deal-1',
    name: 'Zinger Combo',
    contents: 'Zinger Burger + Large Fries + Fresh Regular Drink',
    price: 950,
    originalPrice: 1200,
    save: '20%',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80'
  },
  {
    id: 'deal-2',
    name: 'Chicken Box',
    contents: '3pc Chicken + 2 Regular Sides + 2 Drinks',
    price: 1100,
    originalPrice: 1450,
    save: '25%',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c8d08f58?w=400&q=80'
  },
  {
    id: 'deal-3',
    name: 'Student Deal',
    contents: 'Any Burger + Regular Fries + Regular Drink',
    price: 750,
    originalPrice: 880,
    save: '15%',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&q=80'
  }
];

const DealCard: React.FC<{ deal: typeof deals[0] }> = ({ deal }) => {
  const { addItem } = useCartStore();

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-[#2A2A2A] rounded-card overflow-hidden border border-white/5 hover:border-brand-red transition-all duration-300 group hover:shadow-[0_0_30px_rgba(214,35,0,0.2)]"
    >
      <div className="relative aspect-[16/9]">
        <img src={deal.image} alt={deal.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
        <div className="absolute top-3 right-3 bg-brand-red text-white text-[10px] font-black px-2.5 py-1 rounded-pill shadow-lg">
          SAVE {deal.save}
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-heading font-bold text-xl text-white uppercase tracking-tight group-hover:text-brand-yellow transition-colors">{deal.name}</h3>
          <p className="text-white/40 text-xs font-body leading-relaxed mt-1 line-clamp-2">{deal.contents}</p>
        </div>
        <div className="flex items-center gap-4">
           <span className="font-accent text-3xl text-brand-yellow leading-none">Rs. {deal.price}</span>
           <span className="text-white/20 text-sm line-through">Rs. {deal.originalPrice}</span>
        </div>
        <button 
          onClick={() => addItem({ ...deal, description: deal.contents, category: 'Deals', rating: 5, reviewCount: 0 } as any)}
          className="w-full border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white py-3 rounded-brand font-heading font-bold uppercase tracking-widest text-xs transition-all"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

// --- Main Deals Section ---
export const DealsSection = () => {
  return (
    <section id="deals" className="py-24 bg-[#1A1A1A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
          <div className="text-center md:text-left space-y-4">
            <span className="bg-brand-red text-white font-heading font-black tracking-[0.2em] uppercase text-[10px] px-3 py-1 rounded-pill">
              LIMITED TIME
            </span>
            <h2 className="font-heading font-black text-5xl md:text-7xl text-white uppercase tracking-tighter leading-none">
              TODAY'S HOT <br/>
              <span className="text-brand-yellow italic">DEALS</span>
            </h2>
            <p className="text-white/40 max-w-sm font-body text-sm uppercase tracking-widest">
              Don't miss out — <span className="text-brand-red">these deals disappear fast!</span>
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-3 px-8 py-4 bg-white/5 rounded-card border border-white/5">
             <span className="text-white/60 font-heading font-bold uppercase tracking-widest text-xs flex items-center gap-2">
               <Clock size={14} className="text-brand-red" /> Deal ends in:
             </span>
             <CountdownTimer />
          </div>
        </div>

        {/* Hero Deal */}
        <HeroDeal />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {deals.map(deal => <DealCard key={deal.id} deal={deal} />)}
        </div>
      </div>

      {/* Loyalty Banner */}
      <motion.div 
        initial={{ x: '100%' }}
        whileInView={{ x: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', damping: 20 }}
        className="w-full bg-brand-red"
      >
        <div className="max-w-7xl mx-auto px-6 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-6">
              <div className="bg-brand-yellow p-3 rounded-full text-brand-dark shadow-lg">
                <Trophy size={32} />
              </div>
              <div className="text-center md:text-left">
                <h4 className="font-heading font-black text-white text-xl md:text-2xl uppercase tracking-wider">Join Salman Rewards</h4>
                <p className="text-white/80 font-body text-xs md:text-sm uppercase tracking-widest mt-1">Earn points on every bite. Get free food & exclusive secret menu access!</p>
              </div>
           </div>
           <button className="bg-brand-yellow hover:bg-white text-brand-dark px-10 py-4 rounded-pill font-heading font-black uppercase tracking-widest text-sm transition-all shadow-xl whitespace-nowrap">
              Sign Up Free
           </button>
        </div>
      </motion.div>
    </section>
  );
};
