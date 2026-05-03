/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { useCartStore, selectTotalPrice } from '../../store/cartStore';
import { X, Check, MapPin, Truck, CreditCard, ChevronRight, Phone, User, MessageSquare } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CheckoutStep = 1 | 2 | 3;

interface CheckoutFormData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  deliveryTime: 'ASAP' | 'Schedule';
  paymentMethod: 'COD' | 'Card' | 'JazzCash' | 'EasyPaisa';
  instructions?: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<CheckoutStep>(1);
  const { items, clearCart } = useCartStore();
  const totalPriceFormatted = selectTotalPrice(useCartStore.getState());
  const [orderId] = useState(() => `SF-${Math.floor(100000 + Math.random() * 900000)}`);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<CheckoutFormData>({
    mode: 'onChange',
    defaultValues: {
      deliveryTime: 'ASAP',
      paymentMethod: 'COD',
      city: 'Lahore',
    },
  });

  const onSubmit = () => {
    setStep(2);
  };

  const placeOrder = () => {
    setStep(3);
    // In a real app, this would be an API call
    setTimeout(() => {
        clearCart();
    }, 500);
  };

  const handleFinalClose = () => {
    onClose();
    setTimeout(() => setStep(1), 500); // Reset after closing animation
  };

  const totalPriceNumber = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = totalPriceNumber > 1500 ? 0 : 150;
  const tax = Math.round(totalPriceNumber * 0.05);
  const grandTotal = totalPriceNumber + deliveryFee + tax;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={step === 3 ? handleFinalClose : onClose}
            className="fixed inset-0 bg-brand-dark/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-2xl rounded-card shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="bg-brand-red p-6 text-white flex justify-between items-center shrink-0">
               <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                     <Truck size={24} />
                  </div>
                  <h2 className="font-heading font-black text-2xl uppercase tracking-widest ">
                    {step === 3 ? 'Success!' : 'Checkout'}
                  </h2>
               </div>
               <button onClick={step === 3 ? handleFinalClose : onClose} className="hover:bg-white/20 rounded-full p-2 transition-colors">
                  <X size={24} />
               </button>
            </div>

            {/* Step Indicator */}
            {step < 3 && (
                <div className="p-6 border-b border-brand-border bg-brand-light shrink-0">
                    <div className="flex items-center justify-between relative max-w-md mx-auto">
                        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-brand-border -translate-y-1/2 z-0" />
                        <div 
                            className="absolute top-1/2 left-0 h-[2px] bg-brand-red -translate-y-1/2 z-0 transition-all duration-500" 
                            style={{ width: step === 1 ? '0%' : '100%' }}
                        />
                        
                        {[1, 2].map((s) => (
                            <div key={`step-${s}`} className="relative z-10 flex flex-col items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                                    step >= s ? 'bg-brand-red text-white border-brand-red' : 'bg-white text-brand-muted border-brand-border'
                                }`}>
                                    {step > s ? <Check size={16} /> : s}
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= s ? 'text-brand-red' : 'text-brand-muted'}`}>
                                    {s === 1 ? 'Details' : 'Review'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8">
              {step === 1 && (
                <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black tracking-widest text-brand-muted flex items-center gap-2">
                                <User size={14} /> Full Name
                            </label>
                            <input 
                                {...register('fullName', { required: 'Name is required', minLength: { value: 3, message: 'Minimum 3 characters' } })}
                                placeholder="Salman Khan"
                                className={`w-full bg-brand-light border ${errors.fullName ? 'border-brand-red' : 'border-brand-border'} rounded-pill px-6 py-3 text-sm focus:outline-none focus:border-brand-red transition-all`}
                            />
                            {errors.fullName && <p className="text-[10px] text-brand-red font-bold uppercase">{errors.fullName.message}</p>}
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black tracking-widest text-brand-muted flex items-center gap-2">
                                <Phone size={14} /> Phone Number
                            </label>
                            <input 
                                {...register('phone', { 
                                    required: 'Phone is required', 
                                    pattern: { value: /^(03)[0-9]{9}$/, message: 'Valid Pakistani format: 03XXXXXXXXX' } 
                                })}
                                placeholder="03XXXXXXXXX"
                                className={`w-full bg-brand-light border ${errors.phone ? 'border-brand-red' : 'border-brand-border'} rounded-pill px-6 py-3 text-sm focus:outline-none focus:border-brand-red transition-all`}
                            />
                            {errors.phone && <p className="text-[10px] text-brand-red font-bold uppercase">{errors.phone.message}</p>}
                        </div>

                        {/* Address */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] uppercase font-black tracking-widest text-brand-muted flex items-center gap-2">
                                <MapPin size={14} /> Delivery Address
                            </label>
                            <input 
                                {...register('address', { required: 'Address is required' })}
                                placeholder="House #, Street name, Area"
                                className={`w-full bg-brand-light border ${errors.address ? 'border-brand-red' : 'border-brand-border'} rounded-pill px-6 py-3 text-sm focus:outline-none focus:border-brand-red transition-all`}
                            />
                            {errors.address && <p className="text-[10px] text-brand-red font-bold uppercase">{errors.address.message}</p>}
                        </div>

                        {/* City */}
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black tracking-widest text-brand-muted">City</label>
                            <select 
                                {...register('city')}
                                className="w-full bg-brand-light border border-brand-border rounded-pill px-6 py-3 text-sm focus:outline-none focus:border-brand-red transition-all"
                            >
                                <option>Lahore</option>
                                <option>Karachi</option>
                                <option>Islamabad</option>
                                <option>Rawalpindi</option>
                                <option>Faisalabad</option>
                                <option>Other</option>
                            </select>
                        </div>

                        {/* Delivery Time */}
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black tracking-widest text-brand-muted">Delivery Time</label>
                            <div className="flex gap-4">
                                <label className="flex-1 cursor-pointer group">
                                    <input type="radio" {...register('deliveryTime')} value="ASAP" className="hidden peer" />
                                    <div className="text-center p-3 rounded-pill border border-brand-border peer-checked:bg-brand-red peer-checked:text-white peer-checked:border-brand-red transition-all text-xs font-bold uppercase tracking-widest">
                                        ASAP
                                    </div>
                                </label>
                                <label className="flex-1 cursor-pointer group">
                                    <input type="radio" {...register('deliveryTime')} value="Schedule" className="hidden peer" />
                                    <div className="text-center p-3 rounded-pill border border-brand-border peer-checked:bg-brand-red peer-checked:text-white peer-checked:border-brand-red transition-all text-xs font-bold uppercase tracking-widest">
                                        Later
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-4 pt-4 border-t border-brand-border">
                        <label className="text-[10px] uppercase font-black tracking-widest text-brand-muted flex items-center gap-2">
                            <CreditCard size={14} /> Payment Method
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                                { id: 'COD', label: 'Cash' },
                                { id: 'Card', label: 'Card' },
                                { id: 'JazzCash', label: 'Jazz' },
                                { id: 'EasyPaisa', label: 'Easy' },
                            ].map((p) => (
                                <label key={p.id} className="cursor-pointer group">
                                    <input type="radio" {...register('paymentMethod')} value={p.id} className="hidden peer" />
                                    <div className="flex flex-col items-center justify-center p-4 h-full rounded-card border-2 border-brand-light bg-brand-light peer-checked:bg-brand-red/5 peer-checked:border-brand-red peer-checked:text-brand-red transition-all">
                                        <div className="font-heading font-black text-xs uppercase tracking-widest">{p.label}</div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="space-y-2">
                         <label className="text-[10px] uppercase font-black tracking-widest text-brand-muted flex items-center gap-2">
                            <MessageSquare size={14} /> Special Instructions
                        </label>
                        <textarea 
                            {...register('instructions')}
                            placeholder="Add more ketchup, please!"
                            className="w-full bg-brand-light border border-brand-border rounded-card px-6 py-4 text-sm focus:outline-none focus:border-brand-red transition-all h-24 resize-none"
                        />
                    </div>
                </form>
              )}

              {step === 2 && (
                <div className="space-y-8">
                     {/* Summary Card */}
                    <div className="bg-brand-light p-6 rounded-card border border-brand-border space-y-4">
                        <div className="flex justify-between items-start">
                            <h3 className="font-heading font-black text-brand-dark uppercase tracking-widest text-sm">Delivery To</h3>
                            <button onClick={() => setStep(1)} className="text-[10px] font-black uppercase tracking-widest text-brand-red underline decoration-2">Edit</button>
                        </div>
                        <div className="space-y-1">
                             <p className="font-bold text-brand-dark">{getValues('fullName')}</p>
                             <p className="text-xs text-brand-muted font-medium">{getValues('phone')}</p>
                             <p className="text-xs text-brand-muted leading-relaxed">{getValues('address')}, {getValues('city')}</p>
                        </div>
                        <div className="pt-2 flex gap-4 text-[10px] font-black uppercase tracking-widest text-brand-muted">
                             <div className="flex items-center gap-1"><Truck size={12} /> {getValues('deliveryTime')}</div>
                             <div className="flex items-center gap-1"><CreditCard size={12} /> {getValues('paymentMethod')}</div>
                        </div>
                    </div>

                    {/* Order Review List */}
                    <div className="space-y-4">
                         <h3 className="font-heading font-black text-brand-dark uppercase tracking-widest text-sm">Review Order</h3>
                         <div className="space-y-3">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between py-2 border-b border-brand-border last:border-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-brand overflow-hidden flex-shrink-0">
                                            <img src={item.image} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-brand-dark leading-tight">{item.name}</p>
                                            <p className="text-[10px] text-brand-muted uppercase font-bold">{item.quantity} x Rs. {item.price}</p>
                                        </div>
                                    </div>
                                    <span className="font-accent text-xl text-brand-red">Rs. {item.price * item.quantity}</span>
                                </div>
                            ))}
                         </div>
                    </div>

                    {/* Calculation */}
                    <div className="space-y-2 pt-4">
                        <div className="flex justify-between text-xs font-bold text-brand-muted uppercase tracking-widest">
                            <span>Subtotal</span>
                            <span>Rs. {totalPriceNumber.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-brand-muted uppercase tracking-widest">
                            <span>Delivery</span>
                            <span className={deliveryFee === 0 ? 'text-green-600' : ''}>{deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-brand-muted uppercase tracking-widest">
                            <span>Tax (5%)</span>
                            <span>Rs. {tax.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
              )}

              {step === 3 && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="relative">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 overflow-hidden">
                             <motion.svg 
                                viewBox="0 0 50 50" 
                                className="w-12 h-12 stroke-current fill-none stroke-[4]"
                             >
                                <motion.path 
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                    d="M10 25L20 35L40 15"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                             </motion.svg>
                        </div>
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.2, 1] }}
                            transition={{ delay: 0.5 }}
                            className="absolute -top-2 -right-2 w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center shadow-lg"
                        >
                            <Truck size={16} className="text-brand-dark" />
                        </motion.div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="font-heading font-black text-4xl text-brand-red uppercase italic tracking-tighter">ORDER PLACED!</h2>
                        <p className="font-accent text-2xl text-brand-dark tracking-widest">#{orderId}</p>
                    </div>

                    <div className="bg-brand-light p-6 rounded-card border border-brand-border w-full max-w-sm">
                        <p className="text-sm text-brand-muted leading-relaxed font-body">
                            Great news! Your order is being prepared. It should arrive at your doorstep in <span className="font-black text-brand-dark">20-30 minutes</span>.
                        </p>
                    </div>

                    <div className="flex flex-col w-full max-w-sm gap-3">
                         <a 
                            href={`https://wa.me/923001234567?text=Track%20Order%3A%20${orderId}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="bg-[#25D366] text-white py-4 rounded-pill font-heading font-bold uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg hover:brightness-95 transition-all"
                         >
                            <MessageSquare size={20} />
                            Track on WhatsApp
                         </a>
                         <button 
                            onClick={handleFinalClose}
                            className="bg-brand-dark text-white py-4 rounded-pill font-heading font-bold uppercase tracking-widest hover:bg-brand-red transition-all"
                         >
                            Back to Menu
                         </button>
                    </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            {step < 3 && (
                <div className="shrink-0 p-6 bg-brand-light border-t border-brand-border px-8">
                {step === 1 ? (
                    <button 
                        type="submit" 
                        form="checkout-form"
                        className="w-full bg-brand-red hover:bg-brand-red-hover text-white py-5 rounded-card font-heading font-bold uppercase tracking-[0.2em] shadow-red transition-all flex items-center justify-center gap-2"
                    >
                        Review Order <ChevronRight size={20} />
                    </button>
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-brand-red p-4 rounded-card text-white overflow-hidden relative">
                             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)]" />
                             <span className="font-heading font-black uppercase text-xs tracking-[0.2em] relative z-10">Grand Total</span>
                             <span className="font-accent text-3xl relative z-10">Rs. {grandTotal.toLocaleString()}</span>
                        </div>
                        <button 
                            onClick={placeOrder}
                            className="w-full bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark py-5 rounded-card font-heading font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 active:scale-95"
                        >
                            Place Order Now
                        </button>
                    </div>
                )}
                </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
