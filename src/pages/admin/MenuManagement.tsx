/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Filter, 
  ChevronDown, 
  Check,
  X,
  Image as ImageIcon,
  Flame,
  Star
} from 'lucide-react';
import { menuItems as INITIAL_MENU } from '../../data/menuData';
import { MenuItem, Category, Badge } from '../../types/index';
import { MENU_CATEGORIES } from '../../lib/constants';

export const AdminMenuManagement: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>(INITIAL_MENU);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  
  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null);

  // Form states for Add/Edit
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    category: 'Burgers',
    image: '',
    isSpicy: false,
    calories: 0
  });

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenEdit = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        id: Math.random().toString(36).substring(7),
        name: '',
        description: '',
        price: 0,
        category: 'Burgers',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
        isSpicy: false,
        calories: 0,
        badge: undefined
      });
    }
    setIsEditModalOpen(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || (formData.price || 0) <= 0) return;

    if (editingItem) {
      setItems(items.map(item => item.id === editingItem.id ? { ...item, ...formData as MenuItem } : item));
    } else {
      setItems([{ ...formData as MenuItem, id: Date.now().toString() }, ...items]);
    }
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      setItems(items.filter(item => item.id !== itemToDelete.id));
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const badgeStyles = {
    'Bestseller': 'bg-amber-100 text-amber-700',
    'New': 'bg-emerald-100 text-emerald-700',
    'Promo': 'bg-rose-100 text-rose-700',
    'Spicy': 'bg-orange-100 text-orange-700',
  };

  return (
    <div className="space-y-6 pb-12">
      {/* TOOLBAR */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-1 gap-4 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-red/20 transition-all font-medium"
            />
          </div>
          <div className="relative min-w-[200px] hidden md:block">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value as any)}
              className="w-full pl-12 pr-10 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-red/20 transition-all font-bold appearance-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              {MENU_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
        <button
          onClick={() => handleOpenEdit()}
          className="w-full md:w-auto bg-brand-red text-white px-6 py-3 rounded-xl font-heading font-black uppercase tracking-widest text-xs shadow-lg shadow-brand-red/20 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-95"
        >
          <Plus size={18} /> Add New Item
        </button>
      </div>

      {/* MENU ITEMS TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Item</th>
                <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Price</th>
                <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Badge</th>
                <th className="text-right py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredItems.map((item) => (
                <tr key={`admin-menu-item-${item.id}`} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-brand-dark flex items-center gap-2">
                          {item.name}
                          {item.isSpicy && <Flame size={12} className="text-brand-red" />}
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium truncate max-w-[200px]">{item.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-black uppercase">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-sm text-brand-red">Rs. {item.price}</td>
                  <td className="py-4 px-6">
                    {item.badge && (
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-tight ${badgeStyles[item.badge]}`}>
                        {item.badge}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenEdit(item)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => { setItemToDelete(item); setIsDeleteModalOpen(true); }}
                        className="p-2 text-gray-400 hover:text-brand-red hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD/EDIT MODAL */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-brand-dark/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <form onSubmit={handleSaveItem} className="flex flex-col h-full">
                <div className="p-8 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-brand-red uppercase tracking-[0.2em]">Menu Management</p>
                    <h2 className="font-heading font-black text-2xl text-brand-dark uppercase tracking-tighter">
                      {editingItem ? 'Edit Item' : 'Add New Item'}
                    </h2>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-brand-red transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Item Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-red/20 font-bold"
                          placeholder="e.g. Smoky Beef Burger"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Price (PKR)</label>
                        <input
                          type="number"
                          value={formData.price}
                          onChange={e => setFormData({ ...formData, price: parseInt(e.target.value) })}
                          className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-red/20 font-bold"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Category</label>
                        <select
                          value={formData.category}
                          onChange={e => setFormData({ ...formData, category: e.target.value as Category })}
                          className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-red/20 font-bold"
                        >
                          {MENU_CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Badge</label>
                        <select
                          value={formData.badge || ''}
                          onChange={e => setFormData({ ...formData, badge: e.target.value as Badge || undefined })}
                          className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-red/20 font-bold"
                        >
                          <option value="">No Badge</option>
                          <option value="Bestseller">Bestseller</option>
                          <option value="New">New</option>
                          <option value="Promo">Promo</option>
                          <option value="Spicy">Spicy</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-red/20 font-medium h-24 resize-none"
                      placeholder="Describe the flavors..."
                      minLength={10}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Image URL</label>
                      <div className="relative">
                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="url"
                          value={formData.image}
                          onChange={e => setFormData({ ...formData, image: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-red/20 font-medium"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-6 mt-6">
                       <label className="flex items-center gap-3 cursor-pointer group">
                         <div className="relative">
                           <input 
                             type="checkbox" 
                             checked={formData.isSpicy} 
                             onChange={e => setFormData({ ...formData, isSpicy: e.target.checked })}
                             className="sr-only" 
                           />
                           <div className={`w-12 h-6 rounded-full transition-colors ${formData.isSpicy ? 'bg-brand-red' : 'bg-gray-200'}`} />
                           <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.isSpicy ? 'translate-x-6' : ''}`} />
                         </div>
                         <span className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-brand-dark transition-colors">Spicy Flavor</span>
                       </label>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-gray-50 border-t border-gray-100 flex gap-4">
                  <button 
                    type="submit"
                    className="flex-1 bg-brand-red text-white py-4 rounded-2xl font-heading font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-brand-red/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    {editingItem ? 'Save Changes' : 'Create Item'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 bg-white border border-gray-100 text-gray-400 py-4 rounded-2xl font-heading font-black uppercase tracking-widest text-xs hover:bg-gray-100 transition-all font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute inset-0 bg-brand-dark/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden p-8 text-center space-y-6"
            >
              <div className="w-20 h-20 bg-red-50 text-brand-red rounded-full flex items-center justify-center mx-auto">
                <Trash2 size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="font-heading font-black text-xl text-brand-dark uppercase tracking-tight">Delete Item?</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed px-4">
                  Are you sure you want to delete <span className="font-bold text-brand-dark">"{itemToDelete?.name}"</span>? This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handleDelete}
                  className="flex-1 bg-brand-red text-white py-4 rounded-xl font-heading font-black uppercase tracking-widest text-xs shadow-lg shadow-brand-red/20"
                >
                  Delete
                </button>
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-xl font-heading font-black uppercase tracking-widest text-xs"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
