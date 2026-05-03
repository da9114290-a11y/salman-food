/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// --- CountUp Hook ---
const useCountUp = (end: number, duration: number, start: boolean, decimals: number = 0) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = progress * end;
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  if (decimals > 0) return count.toFixed(decimals);
  return Math.floor(count).toLocaleString();
};

// --- Sub-component: Stat Item ---
const StatItem = ({ end, label, suffix = "", decimals = 0 }: { end: number; label: string; suffix?: string; decimals?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useCountUp(end, 2000, isInView, decimals);

  return (
    <div ref={ref} className="text-center space-y-2">
      <div className="font-accent text-[56px] text-white leading-none">
        {count}{suffix}
      </div>
      <div className="text-brand-yellow font-body text-sm uppercase tracking-widest font-medium">
        {label}
      </div>
    </div>
  );
};

// --- Testimonials Data ---
const testimonials = [
  {
    text: "The Zinger Supreme is absolutely incredible. I've tried KFC and everything, but Salman Food just hits different. The spice level is perfect!",
    name: "Ahmed K.",
    city: "Karachi",
    initials: "AK",
    color: "bg-blue-500"
  },
  {
    text: "Fast delivery, hot food, amazing prices. I order here at least 3 times a week. The family feast deal is unbeatable value.",
    name: "Sana R.",
    city: "Lahore",
    initials: "SR",
    color: "bg-purple-500"
  },
  {
    text: "Finally a place that gets crispy chicken right. The coating stays crispy even after 20 minutes. Addicted!",
    name: "Bilal M.",
    city: "Islamabad",
    initials: "BM",
    color: "bg-green-500"
  },
  {
    text: "Best burgers in the city, no competition. The double smash burger is life-changing. Highly recommend!",
    name: "Fatima A.",
    city: "Rawalpindi",
    initials: "FA",
    color: "bg-orange-500"
  },
  {
    text: "Ordered for a family birthday, 15 people, everything was hot and perfect. Staff was super helpful too!",
    name: "Omar T.",
    city: "Karachi",
    initials: "OT",
    color: "bg-brand-red"
  }
];

export const AboutSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentTestimonial((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  };

  const features = [
    {
      title: "Fresh Ingredients",
      desc: "Hand-selected produce and 100% fresh chicken daily.",
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1.35 14-1.3 6-6 4-8.35 4Z" />
          <path d="M11 20c-4 0-6-3-6-3" />
          <path d="M11 20c2-3 2-5 2-5" />
        </svg>
      )
    },
    {
      title: "Fast Delivery",
      desc: "Arrives hot at your doorstep within 20-30 minutes.",
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
          <path d="m13 2-2 10h3L11 22" />
        </svg>
      )
    },
    {
      title: "Best Prices",
      desc: "Premium taste that doesn't break your budget.",
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 5 4 4" />
          <path d="M20.38 3.46 16 2.14a1 1 0 0 0-1 .07L3.75 11.2a1 1 0 0 0-.3 1.25l4.5 7a1 1 0 0 0 1.25.3l11.45-6.25a1 1 0 0 0 .5-.91V5a2 2 0 0 0-1.07-1.54Z" />
          <path d="M11 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
        </svg>
      )
    },
    {
      title: "Halal Certified",
      desc: "Strict adherence to 100% Halal sourcing standards.",
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9" />
          <path d="M16 4.3 17 6h2l-1.5 1.2.7 1.8-1.5-1.1L13.2 9l.7-1.8-1.5-1.2h2l1.1-1.7Z" />
        </svg>
      )
    },
    {
      title: "No Preservatives",
      desc: "Clean labels and natural flavors in every bite.",
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    },
    {
      title: "24/7 Support",
      desc: "Reliable customer care for all your cravings.",
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
          <path d="M21 16v2a2 2 0 0 1-2 2h-1" />
        </svg>
      )
    }
  ];

  return (
    <div id="about" className="bg-brand-light">
      {/* Part 1: Brand Story */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <span className="text-brand-red font-heading font-black tracking-[0.3em] uppercase text-sm block">
              Our Story
            </span>
            <h2 className="font-heading font-bold text-[44px] text-brand-dark uppercase overflow-hidden leading-[1.1] tracking-tighter">
              From a Small Kitchen to <br/>
              <span className="text-brand-red italic">Your City's Favourite</span>
            </h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-brand-muted font-body leading-relaxed text-[16px]">
              Salman Food was born in 2018 from a simple obsession — making the crispiest, most flavour-packed fast food in the city. What started as a single outlet in Gulshan has grown into a beloved brand serving thousands of hungry customers every day.
            </p>
            <p className="text-brand-muted font-body leading-relaxed text-[16px]">
              We use only the freshest ingredients, hand-selected daily. Our chicken is marinated for 24 hours. Our burgers are built with care. Every item on our menu is a testament to our belief that fast food can be extraordinary.
            </p>
          </div>

          <div className="flex flex-wrap gap-12 pt-4">
            <div className="space-y-1">
              <div className="font-heading font-bold text-xl text-brand-dark leading-none">50,000+</div>
              <div className="text-[12px] text-brand-muted font-body">Happy Customers</div>
            </div>
            <div className="space-y-1">
              <div className="font-heading font-bold text-xl text-brand-dark leading-none">6</div>
              <div className="text-[12px] text-brand-muted font-body">Outlets Citywide</div>
            </div>
          </div>

          <a href="#menu" className="inline-block text-brand-red font-heading font-bold uppercase tracking-widest text-sm hover:underline transition-all">
            Read our full story →
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[3/4] rounded-[12px] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80" 
              className="w-full h-full object-cover" 
              alt="Our Story" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-[12px] shadow-card border border-brand-border space-y-2 z-10">
             <div className="space-y-0 text-left">
               <div className="font-accent text-[32px] text-brand-red leading-none">Since 2018</div>
               <div className="text-[13px] text-brand-muted font-body">6 Years of Bold Flavors</div>
             </div>
             <div className="flex items-center gap-1 text-brand-yellow">
               {[1, 2, 3, 4, 5].map(i => <Star key={`story-star-${i}`} size={14} fill="currentColor" />)}
               <span className="text-brand-dark font-black text-xs ml-1">4.8</span>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Part 2: Animated Stats Row */}
      <div className="bg-brand-red py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 lg:divide-x divide-white/20">
          <StatItem end={50000} suffix="+" label="Customers Served" />
          <StatItem end={24} label="Outlets Nationwide" />
          <StatItem end={4.8} decimals={1} suffix="★" label="Average Rating" />
          <StatItem end={20} suffix=" MIN" label="Avg. Delivery" />
        </div>
      </div>

      {/* Part 3: Why Choose Us */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-heading font-black text-4xl md:text-5xl text-brand-dark uppercase tracking-tighter">
            Why <span className="text-brand-red italic">Salman Food?</span>
          </h2>
          <div className="w-24 h-1 bg-brand-red mx-auto rounded-pill" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white p-8 rounded-[12px] border border-brand-border hover:border-brand-red transition-all duration-300 group"
            >
              <div className="w-[64px] h-[64px] bg-brand-red/10 rounded-full flex items-center justify-center text-brand-red mb-6 transition-colors group-hover:bg-brand-red group-hover:text-white">
                {feature.icon}
              </div>
              <h3 className="font-heading font-semibold text-[18px] text-brand-dark mb-2 group-hover:text-brand-red transition-colors capitalize">
                {feature.title}
              </h3>
              <p className="text-brand-muted font-body text-[14px] leading-relaxed line-clamp-2">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Part 4: Testimonials */}
      <section className="py-24 bg-brand-dark overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D62300 2px, transparent 2px)', backgroundSize: '16px 16px' }} />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-brand-yellow font-heading font-black tracking-[0.3em] uppercase text-sm block mb-4">
              Real Stories
            </span>
            <h2 className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tighter">
              What Our <span className="text-brand-red italic">Customers Say</span>
            </h2>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="bg-white rounded-[12px] p-8 md:p-16 relative shadow-2xl border border-brand-border"
              >
                <div className="absolute top-6 left-6 text-brand-red font-accent text-[80px] leading-none opacity-20 pointer-events-none">
                   "
                </div>
                
                <div className="space-y-8 relative z-10">
                   <p className="text-brand-dark font-body text-[16px] italic leading-relaxed">
                     "{testimonials[currentTestimonial].text}"
                   </p>

                   <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold font-heading text-lg shadow-sm ${testimonials[currentTestimonial].color}`}>
                          {testimonials[currentTestimonial].initials}
                        </div>
                        <div>
                          <h4 className="font-heading font-semibold text-[14px] text-brand-dark uppercase tracking-wide">
                            {testimonials[currentTestimonial].name}
                          </h4>
                          <span className="text-[12px] text-brand-muted font-body">
                            {testimonials[currentTestimonial].city}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 text-brand-yellow">
                        {[1, 2, 3, 4, 5].map(i => <Star key={`testimonial-star-${i}`} size={16} fill="currentColor" />)}
                      </div>
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between absolute top-1/2 -left-12 md:-left-20 -right-12 md:-right-20 -translate-y-1/2 pointer-events-none">
               <button 
                onClick={() => paginate(-1)}
                className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center hover:bg-brand-red-hover transition-all pointer-events-auto shadow-lg"
               >
                 <ChevronLeft size={24} />
               </button>
               <button 
                onClick={() => paginate(1)}
                className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center hover:bg-brand-red-hover transition-all pointer-events-auto shadow-lg"
               >
                 <ChevronRight size={24} />
               </button>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-12">
             {testimonials.map((_, i) => (
               <button
                key={`testimonial-dot-${i}`}
                onClick={() => {
                  setDirection(i > currentTestimonial ? 1 : -1);
                  setCurrentTestimonial(i);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentTestimonial === i ? 'bg-brand-red w-8' : 'bg-white/20 hover:bg-white/40'
                }`}
               />
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};
