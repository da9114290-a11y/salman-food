/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Receipt, 
  UtensilsCrossed, 
  Tag, 
  BarChart3, 
  Settings, 
  LogOut,
  X
} from 'lucide-react';
import { SalmanFoodLogo } from '../logo/SalmanFoodLogo';

interface AdminSidebarProps {
  onClose?: () => void;
}

const navItems = [
  { label: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/admin' },
  { label: 'Orders', icon: <Receipt size={20} />, href: '/admin/orders' },
  { label: 'Menu Mgmt', icon: <UtensilsCrossed size={20} />, href: '/admin/menu' },
  { label: 'Deals', icon: <Tag size={20} />, href: '/admin/deals' },
  { label: 'Analytics', icon: <BarChart3 size={20} />, href: '/admin/analytics' },
  { label: 'Settings', icon: <Settings size={20} />, href: '/admin/settings' },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    navigate('/admin/login');
  };

  return (
    <div className="h-full bg-[#1A1A1A] text-white flex flex-col w-64 border-r border-white/5">
      <div className="p-6 flex items-center justify-between">
        <SalmanFoodLogo size="md" color="white" />
        <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === '/admin'}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-heading font-medium text-sm tracking-wide ${
                isActive 
                ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:text-brand-red hover:bg-brand-red/10 transition-all font-heading font-medium text-sm tracking-wide"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};
