/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useCartStore, selectTotalItems } from '../../store/cartStore';
import { X, Plus, Minus, Trash2, ArrowRight, Tag, Info } from 'lucide-react';
import { CheckoutModal } from './CheckoutModal';
import { useState } from 'react';

export const CartSidebar = () => {
  const { items, isOpen, toggleCart, updateQuantity, removeItem } = useCartStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoStatus, setPromoStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const totalItems = useCartStore(selectTotalItems);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  // Calculations
  const discount = promoStatus === 'success' ? subtotal * 0.1 : 0;
  const deliveryFee = subtotal > 1500 ? 0 : 150;
  const tax = Math.round((subtotal - discount) * 0.05);
  const grandTotal = subtotal - discount + deliveryFee + tax;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'SALMAN10') {
      setPromoStatus('success');
    } else {
      setPromoStatus('error');
      setTimeout(() => setPromoStatus('idle'), 2000);
    }
  };

  const handleCheckout = () => {
    toggleCart(false);
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => toggleCart(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-md"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full sm:max-w-[420px] bg-brand-surface shadow-2xl z-[60] flex flex-col pt-0"
            >
              {/* Header */}
              <div className="p-6 border-b border-brand-border flex items-center justify-between bg-brand-red text-white shrink-0">
                <div className="flex items-center gap-3">
                  <h2 className="font-heading font-black text-2xl uppercase tracking-widest italic">Your Order</h2>
                  <span className="bg-brand-yellow text-brand-dark font-bold text-[10px] px-2 py-0.5 rounded-pill uppercase">
                    {totalItems} Items
                  </span>
                </div>
                <button
                  onClick={() => toggleCart(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  id="close-cart"
                >
                  <X size={24} />
                </button>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth" style={{ maxHeight: 'calc(100vh - 280px)' }}>
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-32 h-32 bg-brand-light rounded-full flex items-center justify-center border-4 border-dashed border-brand-border animate-pulse">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-brand-muted">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <line x1="3" y1="6" x2="21" y2="6" strokeWidth="2"></line>
                        <path d="M16 10a4 4 0 0 1-8 0" strokeWidth="2"></path>
                      </svg>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-heading font-bold text-xl text-brand-dark uppercase tracking-tight">Your cart is empty</h3>
                      <p className="text-brand-muted text-sm px-12 leading-relaxed">Delicious deals are just a few clicks away. Add something tasty!</p>
                    </div>
                    <button
                      onClick={() => toggleCart(false)}
                      className="bg-brand-red text-white px-10 py-4 rounded-pill font-heading font-bold uppercase tracking-widest hover:bg-brand-red-hover transition-all active:scale-95 shadow-red"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div 
                      key={item.id} 
                      layout
                      className="flex gap-5 group"
                    >
                      <div className="relative w-20 h-20 rounded-card overflow-hidden bg-brand-light flex-shrink-0 border border-brand-border">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-heading font-bold text-brand-dark uppercase tracking-tight text-sm leading-tight group-hover:text-brand-red transition-colors">{item.name}</h4>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-brand-muted hover:text-brand-red transition-colors p-1"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <span className="text-[10px] uppercase font-bold text-brand-muted tracking-widest">{item.category}</span>
                        </div>
                        <div className="flex justify-between items-center bg-brand-light/50 p-1 rounded-pill">
                          <span className="font-accent text-xl text-brand-red pl-2">Rs. {item.price}</span>
                            <div className="flex items-center gap-3 bg-white rounded-pill px-3 py-1 shadow-sm border border-brand-border">
                              <button
                                onClick={() => {
                                  if (item.quantity === 1) {
                                    removeItem(item.id);
                                  } else {
                                    updateQuantity(item.id, item.quantity - 1);
                                  }
                                }}
                                className={`w-6 h-6 flex items-center justify-center rounded-full transition-all ${
                                  item.quantity === 1 
                                  ? 'text-brand-red border border-brand-red hover:bg-brand-red hover:text-white' 
                                  : 'text-brand-dark border border-brand-border hover:border-brand-red hover:text-brand-red'
                                }`}
                              >
                                {item.quantity === 1 ? <Trash2 size={10} /> : <Minus size={12} />}
                              </button>
                              
                              <div className="relative w-4 text-center overflow-visible">
                                <AnimatePresence mode="wait">
                                  <motion.span
                                    key={`qty-${item.id}-${item.quantity}`} 
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    className="font-black text-sm absolute inset-0 flex items-center justify-center"
                                  >
                                    {item.quantity}
                                  </motion.span>
                                </AnimatePresence>
                                <span className="opacity-0">0</span>
                              </div>

                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="relative w-6 h-6 flex items-center justify-center rounded-full text-brand-dark border border-brand-border hover:border-brand-red hover:text-brand-red transition-all group"
                              >
                                <Plus size={12} />
                                <AnimatePresence>
                                   <motion.span 
                                     key={`plus-${item.id}-${item.quantity}-${Math.random()}`} 
                                     initial={{ opacity: 1, y: 0 }}
                                     animate={{ opacity: 0, y: -20 }}
                                     className="absolute top-0 text-brand-red font-bold text-[10px] pointer-events-none"
                                   >
                                     +1
                                   </motion.span>
                                </AnimatePresence>
                              </button>
                            </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Summary Section */}
              {items.length > 0 && (
                <div className="p-6 bg-brand-light border-t-2 border-brand-border space-y-5 rounded-t-card shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                  {/* Promo Code */}
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" size={14} />
                        <input 
                          type="text" 
                          placeholder="Enter Coupon Code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className={`w-full bg-white border ${promoStatus === 'error' ? 'border-brand-red' : 'border-brand-border'} rounded-pill pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-brand-red transition-all`}
                        />
                      </div>
                      <button 
                        onClick={handleApplyPromo}
                        className="bg-brand-dark text-white px-6 py-2 rounded-pill font-heading font-bold uppercase text-[10px] tracking-widest hover:bg-brand-red transition-all"
                      >
                        Apply
                      </button>
                    </div>
                    {promoStatus === 'success' && <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest ml-4">10% Discount Applied! 🎉</p>}
                    {promoStatus === 'error' && <p className="text-[10px] text-brand-red font-bold uppercase tracking-widest ml-4">Invalid Code</p>}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-brand-muted uppercase tracking-widest">
                      <span>Subtotal</span>
                      <span>Rs. {subtotal.toLocaleString()}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-xs font-bold text-green-600 uppercase tracking-widest">
                        <span>Discount (10%)</span>
                        <span>- Rs. {discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs font-bold text-brand-muted uppercase tracking-widest">
                      <span className="flex items-center gap-1">Delivery <Info size={10} /></span>
                      <span className={deliveryFee === 0 ? 'text-green-600' : ''}>{deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-brand-muted uppercase tracking-widest">
                      <span>Tax (5%)</span>
                      <span>Rs. {tax.toLocaleString()}</span>
                    </div>
                    <div className="h-[1px] bg-brand-border my-2" />
                    <div className="flex justify-between items-center">
                      <span className="font-heading font-black uppercase text-lg text-brand-dark">Grand Total</span>
                      <motion.span 
                        key={grandTotal}
                        initial={{ scale: 1.1, color: '#E41E26' }}
                        animate={{ scale: 1, color: '#E41E26' }}
                        className="font-accent text-3xl text-brand-red inline-block"
                      >
                        Rs. {grandTotal.toLocaleString()}
                      </motion.span>
                    </div>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    className="group w-full bg-brand-red hover:bg-brand-red-hover text-white py-5 rounded-card font-heading font-black text-lg uppercase tracking-[0.2em] shadow-red transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    Checkout Now 
                    <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </>
  );
};

