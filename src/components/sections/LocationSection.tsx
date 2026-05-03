/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Clock, MessageSquare, ExternalLink, Send, CheckCircle2, ChevronRight, Globe } from 'lucide-react';

interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: {
    open: number; // 24h format
    close: number; // 24h format, e.g., 1am = 25
  };
  mapLink: string;
}

const STORES: Store[] = [
  {
    id: 'gulshan',
    name: 'Gulshan Branch',
    address: 'Shop 4, Block 6, Gulshan-e-Iqbal, Karachi',
    phone: '021-34567890',
    hours: { open: 10, close: 25 }, // 10am - 1am
    mapLink: 'https://maps.google.com/maps?q=Gulshan-e-Iqbal,Karachi&z=15'
  },
  {
    id: 'dha',
    name: 'DHA Branch',
    address: 'Street 8, Phase 5, DHA, Karachi',
    phone: '021-35678901',
    hours: { open: 10, close: 24 }, // 10am - 12am
    mapLink: 'https://maps.google.com/maps?q=DHA+Phase+5,Karachi&z=15'
  },
  {
    id: 'clifton',
    name: 'Clifton Branch',
    address: 'Block 7, Clifton, Karachi',
    phone: '021-36789012',
    hours: { open: 12, close: 24 }, // 12pm - 12am
    mapLink: 'https://maps.google.com/maps?q=Clifton,Karachi&z=15'
  }
];

const OPENING_HOURS_DATA = [
  { day: 'Monday–Thursday', hours: '10:00 AM – 12:00 AM', days: [1, 2, 3, 4] },
  { day: 'Friday', hours: '10:00 AM – 1:00 AM', days: [5] },
  { day: 'Saturday', hours: '9:00 AM – 1:00 AM', days: [6] },
  { day: 'Sunday', hours: '11:00 AM – 11:00 PM', days: [0] },
];

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export const LocationSection: React.FC = () => {
  const [selectedStore, setSelectedStore] = useState<Store>(STORES[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>();

  const messageText = watch('message', '');

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    console.log('Form Submitted:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const isStoreOpen = (store: Store) => {
    const hour = currentTime.getHours();
    const day = currentTime.getDay();
    
    // Simple logic for Pakistan time (not accounting for timezone offsets if visitor is abroad)
    // In a real app we'd use a library or server time
    let currentHour = hour;
    // Handle late night hours (after midnight)
    if (hour < 5) currentHour += 24;

    return currentHour >= store.hours.open && currentHour < store.hours.close;
  };

  const currentDayIndex = currentTime.getDay();

  return (
    <section id="locations" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* PART 1: SECTION HEADER */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-brand-red font-heading font-black tracking-[0.3em] uppercase text-sm block">
            — Find Us —
          </span>
          <h2 className="font-heading font-black text-5xl md:text-6xl text-brand-dark uppercase tracking-tighter">
            We're <span className="text-brand-red italic">Close By</span>
          </h2>
          <p className="text-brand-muted max-w-xl mx-auto font-body text-base md:text-lg">
            Multiple locations across the city for your convenience. Fresh, hot food is never too far away.
          </p>
        </div>

        {/* PART 2: STORE LOCATOR TABS */}
        <div className="mb-20">
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {STORES.map((store) => (
              <button
                key={`store-tab-${store.id}`}
                onClick={() => setSelectedStore(store)}
                className={`px-8 py-4 rounded-pill font-heading font-bold uppercase tracking-widest text-xs transition-all shadow-sm border ${
                  selectedStore.id === store.id 
                  ? 'bg-brand-red text-white border-brand-red shadow-red' 
                  : 'bg-brand-light text-brand-dark border-brand-border hover:border-brand-red'
                }`}
              >
                {store.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStore.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-brand-light p-8 md:p-12 rounded-card border border-brand-border shadow-soft grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-3xl text-brand-dark uppercase">{selectedStore.name}</h3>
                  <span className={`px-4 py-1.5 rounded-pill text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
                    isStoreOpen(selectedStore) ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${isStoreOpen(selectedStore) ? 'bg-green-600 animate-pulse' : 'bg-red-600'}`} />
                    {isStoreOpen(selectedStore) ? 'Open Now' : 'Closed'}
                  </span>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-red/10 p-3 rounded-full text-brand-red">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted mb-1">Address</p>
                      <p className="font-body text-brand-dark font-medium leading-relaxed">{selectedStore.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-brand-red/10 p-3 rounded-full text-brand-red">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted mb-1">Contact No.</p>
                      <p className="font-body text-brand-dark font-medium">{selectedStore.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-brand-red/10 p-3 rounded-full text-brand-red">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted mb-1">Operating Hours</p>
                      <p className="font-body text-brand-dark font-medium">Daily: 10:00 AM – 1:00 AM</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a 
                    href={selectedStore.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-brand-dark text-white text-center py-4 rounded-pill font-heading font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-brand-red transition-all shadow-lg"
                  >
                    Get Directions <ExternalLink size={16} />
                  </a>
                  <a 
                    href="#menu"
                    className="flex-1 bg-brand-red text-white text-center py-4 rounded-pill font-heading font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-brand-red-hover transition-all shadow-red"
                  >
                    Order From This Branch <ChevronRight size={16} />
                  </a>
                </div>
              </div>

              <div className="hidden md:block overflow-hidden rounded-card shadow-inner border border-brand-border h-full min-h-[300px]">
                 <img 
                  src={`https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80&store=${selectedStore.id}`}
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" 
                  alt={selectedStore.name} 
                  referrerPolicy="no-referrer"
                 />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* PART 3: MAP + CONTACT FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          {/* MAP */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-2xl text-brand-dark uppercase tracking-tight">Locate Us On Map</h3>
              <a 
                href="https://maps.google.com/maps?q=Karachi,Pakistan" 
                target="_blank" 
                rel="noreferrer"
                className="text-[10px] font-black text-brand-red uppercase tracking-widest hover:underline flex items-center gap-1"
              >
                View on Google Maps <ExternalLink size={12} />
              </a>
            </div>
            <div className="relative group">
              <iframe 
                src="https://maps.google.com/maps?q=Karachi,Pakistan&z=13&output=embed"
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                className="rounded-card shadow-2xl grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="bg-white p-8 md:p-10 rounded-card border border-brand-border shadow-soft space-y-8">
            <div className="space-y-2">
              <h3 className="font-heading font-black text-3xl text-brand-dark uppercase tracking-tighter">Send Us a <span className="text-brand-red">Message</span></h3>
              <p className="text-brand-muted font-body text-sm">Have feedback or questions? We'd love to hear from you!</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-4">Your Name</label>
                  <input 
                    {...register('name', { required: 'Name is required' })}
                    placeholder="Enter your name"
                    className="w-full bg-brand-light border border-brand-border rounded-pill px-6 py-3.5 text-sm focus:outline-none focus:border-brand-red transition-all"
                  />
                  {errors.name && <p className="text-[10px] text-brand-red font-bold uppercase ml-4">{errors.name.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-4">Email Address</label>
                  <input 
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                    })}
                    placeholder="example@mail.com"
                    className="w-full bg-brand-light border border-brand-border rounded-pill px-6 py-3.5 text-sm focus:outline-none focus:border-brand-red transition-all"
                  />
                  {errors.email && <p className="text-[10px] text-brand-red font-bold uppercase ml-4">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-4">Phone (Optional)</label>
                  <input 
                    {...register('phone')}
                    placeholder="03XXXXXXXXX"
                    className="w-full bg-brand-light border border-brand-border rounded-pill px-6 py-3.5 text-sm focus:outline-none focus:border-brand-red transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-4">Subject</label>
                  <select 
                    {...register('subject')}
                    className="w-full bg-brand-light border border-brand-border rounded-pill px-6 py-3.5 text-sm focus:outline-none focus:border-brand-red transition-all appearance-none cursor-pointer"
                  >
                    <option>General Inquiry</option>
                    <option>Order Issue</option>
                    <option>Franchise Inquiry</option>
                    <option>Feedback</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 relative">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-4 text-left">Message</label>
                <textarea 
                  {...register('message', { 
                    required: 'Message is required',
                    minLength: { value: 20, message: 'Minimum 20 characters' },
                    maxLength: { value: 500, message: 'Maximum 500 characters' }
                  })}
                  placeholder="How can we help you today?"
                  className="w-full bg-brand-light border border-brand-border rounded-card px-6 py-4 text-sm focus:outline-none focus:border-brand-red transition-all h-32 resize-none"
                />
                <div className="flex justify-between items-center px-4 mt-1">
                  {errors.message ? (
                    <p className="text-[10px] text-brand-red font-bold uppercase">{errors.message.message}</p>
                  ) : (
                    <div />
                  )}
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${messageText.length > 450 ? 'text-brand-red' : 'text-brand-muted'}`}>
                    {messageText.length}/500
                  </span>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-red hover:bg-brand-red-hover text-white py-5 rounded-pill font-heading font-black uppercase tracking-[0.2em] transition-all shadow-red flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>

              <AnimatePresence>
                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-green-50 border border-green-200 rounded-brand text-center"
                  >
                    <p className="text-sm text-green-700 font-medium flex items-center justify-center gap-2">
                       <CheckCircle2 size={16} /> Your message has been sent! We'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>

        {/* PART 4: OPENING HOURS TABLE */}
        <div className="mb-24">
          <div className="bg-white rounded-card overflow-hidden border-l-4 border-brand-red shadow-soft border border-brand-border">
            <div className="bg-brand-light/50 p-6 border-b border-brand-border flex items-center gap-3">
              <Clock className="text-brand-red" size={24} />
              <h3 className="font-heading font-black text-xl text-brand-dark uppercase tracking-widest italic">Opening Hours</h3>
            </div>
            <div className="divide-y divide-brand-border/50">
              {OPENING_HOURS_DATA.map((row) => {
                const isToday = row.days.includes(currentDayIndex);
                return (
                  <div 
                    key={`timing-row-${row.day}`} 
                    className={`flex items-center justify-between p-6 transition-colors ${
                      isToday ? 'bg-brand-red/5' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`font-heading font-bold text-lg uppercase tracking-tight ${isToday ? 'text-brand-red' : 'text-brand-dark'}`}>
                        {row.day}
                      </span>
                      {isToday && (
                        <span className="bg-brand-red text-white text-[10px] font-black px-2 py-0.5 rounded-pill uppercase tracking-widest animate-pulse">Today</span>
                      )}
                    </div>
                    <span className={`font-accent text-2xl tracking-widest ${isToday ? 'text-brand-red' : 'text-brand-muted'}`}>
                      {row.hours}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* PART 5: CONTACT INFO STRIP */}
      <div className="bg-brand-red relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="bg-white/10 p-4 rounded-full text-white shadow-xl backdrop-blur-sm">
              <Phone size={32} />
            </div>
            <div>
              <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">Helpline</p>
              <p className="font-heading font-bold text-xl text-white">0800-SALMAN (725626)</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center space-y-2">
            <div className="bg-white/10 p-4 rounded-full text-white shadow-xl backdrop-blur-sm">
              <Globe size={32} />
            </div>
            <div>
              <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">Email Address</p>
              <p className="font-heading font-bold text-xl text-white">orders@salmanfood.pk</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center space-y-4">
            <a 
              href="https://wa.me/923001234567" 
              target="_blank" 
              rel="noreferrer"
              className="bg-brand-yellow hover:bg-white text-brand-dark px-10 py-4 rounded-pill font-heading font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all shadow-2xl group w-full sm:w-auto"
            >
              <div className="bg-[#25D366] p-1.5 rounded-full text-white">
                <MessageSquare size={16} className="fill-current" />
              </div>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
