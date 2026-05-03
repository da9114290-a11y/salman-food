/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCartStore } from '../../store/cartStore';
import { useToast } from '../../store/toastStore';
import { menuItems } from '../../data/menuData';
import { MenuItem, Category } from '../../types';
import { MENU_CATEGORIES } from '../../lib/constants';
import { Search, Star, Flame, ChevronDown, CheckCircle2 } from 'lucide-react';

import { MenuCardSkeleton } from '../ui/Skeletons';
import { OptimizedImage } from '../ui/OptimizedImage';

// Internal MenuCard Component
const MenuCard: React.FC<{ item: MenuItem; onAdd: (item: MenuItem, rect: DOMRect) => void }> = ({ item, onAdd }) => {
  const [isAdded, setIsAdded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  const handleAdd = () => {
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      onAdd(item, rect);
    } else {
      // Fallback
      onAdd(item, new DOMRect());
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  const badgeColors = {
    Bestseller: 'bg-brand-red',
    New: 'bg-green-600',
    Spicy: 'bg-orange-500',
    Value: 'bg-brand-yellow text-brand-dark',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className="bg-brand-surface rounded-card shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden flex flex-col h-full group"
    >
      {/* Image Wrapper */}
      <div ref={imgRef} className="relative">
        <OptimizedImage
          src={item.image}
          alt={item.name}
          className="group-hover:scale-105 transition-transform duration-500"
          aspectRatio="aspect-[16/9]"
        />
        {item.badge && (
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-pill text-[10px] font-bold uppercase tracking-widest text-white shadow-lg ${badgeColors[item.badge]}`}>
            {item.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-heading font-bold text-lg text-brand-dark truncate leading-tight">
              {item.name}
            </h3>
            {item.isSpicy && <Flame size={16} className="text-orange-500 fill-current" />}
          </div>
          <p className="text-brand-muted text-xs font-body line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs font-body">
          <div className="flex items-center gap-1 text-brand-yellow">
            <Star size={14} className="fill-current" />
            <span className="font-bold text-brand-dark">{item.rating}</span>
            <span className="text-brand-muted">({item.reviewCount})</span>
          </div>
          {item.calories && (
            <span className="text-brand-muted">{item.calories} kcal</span>
          )}
        </div>

        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-accent text-3xl text-brand-red leading-none transition-all duration-300">
              Rs. {item.price}
            </span>
            {item.originalPrice && (
              <span className="text-xs text-brand-muted line-through">
                Rs. {item.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`font-heading font-bold uppercase tracking-widest text-sm px-6 py-2.5 rounded-brand transition-all active:scale-95 ${
              isAdded 
              ? 'bg-green-600 text-white' 
              : 'bg-brand-red text-white hover:bg-brand-red-hover hover:scale-[1.02]'
            }`}
          >
            {isAdded ? (
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Added!</span>
              </div>
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'Popular' | 'PriceLow' | 'PriceHigh' | 'New'>('Popular');
  const [flyItem, setFlyItem] = useState<{ id: string; x: number; y: number; imageUrl: string } | null>(null);
  
  const { addItem } = useCartStore();
  const { addToast } = useToast();

  const handleAddItem = (item: MenuItem, rect: DOMRect) => {
    addItem(item);
    addToast(`${item.name} added to cart!`, 'success');

    // Fly animation logic
    setFlyItem({
      id: Math.random().toString(),
      x: rect.left,
      y: rect.top,
      imageUrl: item.image
    });

    setTimeout(() => {
      setFlyItem(null);
    }, 1000);
  };

  const filteredItems = useMemo(() => {
    let result = [...menuItems];

    // Category Filter
    if (activeCategory !== 'All') {
      result = result.filter(item => item.category === activeCategory);
    }

    // Search Query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      );
    }

    // Sorting
    switch (sortBy) {
      case 'PriceLow':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'PriceHigh':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'New':
        result.sort((a, b) => (a.badge === 'New' ? -1 : 1));
        break;
      default:
        result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <section id="menu" className="py-24 bg-brand-light relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-brand-red font-heading font-black tracking-[0.2em] uppercase text-sm block">
            — Our Menu —
          </span>
          <h2 className="font-heading font-black text-5xl md:text-7xl text-brand-dark uppercase tracking-tighter leading-none">
            What are you <br/>
            <span className="text-brand-red italic">Craving?</span>
          </h2>
          <p className="text-brand-muted max-w-xl mx-auto font-body text-base md:text-lg">
            Choose from our world-class menu featuring premium smashed burgers, legendary crispy chicken, and mouth-watering deals.
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="space-y-8 mb-12">
          {/* Category Tabs */}
          <div className="flex overflow-x-auto pb-4 -mx-6 px-6 hide-scrollbar gap-3">
             <button
              onClick={() => setActiveCategory('All')}
              className={`whitespace-nowrap px-8 py-3 rounded-pill font-heading font-bold uppercase tracking-wider text-sm transition-all shadow-sm border ${
                activeCategory === 'All' 
                ? 'bg-brand-red text-white border-brand-red shadow-red' 
                : 'bg-white text-brand-dark border-brand-border hover:border-brand-red'
              }`}
            >
              All
            </button>
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={`menu-cat-${cat}`}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-8 py-3 rounded-pill font-heading font-bold uppercase tracking-wider text-sm transition-all shadow-sm border ${
                  activeCategory === cat 
                  ? 'bg-brand-red text-white border-brand-red shadow-red' 
                  : 'bg-white text-brand-dark border-brand-border hover:border-brand-red'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-muted" size={20} />
              <input
                type="text"
                placeholder="Search for wings, burgers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-brand-border rounded-pill pl-12 pr-6 py-4 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all shadow-sm"
              />
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <span className="text-brand-muted text-sm font-body font-medium hidden sm:inline">Sort by:</span>
              <div className="relative w-full sm:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none w-full sm:w-48 bg-white border border-brand-border rounded-pill px-6 py-4 text-sm font-heading font-bold uppercase text-brand-dark focus:outline-none focus:border-brand-red cursor-pointer shadow-sm"
                >
                  <option value="Popular">Most Popular</option>
                  <option value="PriceLow">Price: Low to High</option>
                  <option value="PriceHigh">Price: High to Low</option>
                  <option value="New">New Arrivals</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-brand-muted" size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} onAdd={handleAddItem} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Fly to Cart Animation Element */}
        <AnimatePresence>
          {flyItem && (
            <motion.div
              initial={{ 
                position: 'fixed', 
                left: flyItem.x, 
                top: flyItem.y, 
                width: 150, 
                height: 100, 
                zIndex: 1000, 
                borderRadius: 12, 
                overflow: 'hidden', 
                opacity: 1, 
                scale: 1 
              }}
              animate={{ 
                left: window.innerWidth - 80, 
                top: 40, 
                width: 20, 
                height: 20, 
                opacity: 0, 
                scale: 0.1 
              }}
              transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
            >
              <img src={flyItem.imageUrl} className="w-full h-full object-cover" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results Fallback */}
        {filteredItems.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-heading font-bold text-2xl text-brand-dark uppercase">No items found</h3>
            <p className="text-brand-muted">Try adjusting your filters or search query.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-6 text-brand-red font-bold underline"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};
