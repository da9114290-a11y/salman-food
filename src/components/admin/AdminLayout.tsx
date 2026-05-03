/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (!auth && location.pathname !== '/admin/login') {
      navigate('/admin/login');
    }
    setIsAuthChecking(false);
  }, [navigate, location]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (isAuthChecking) return null;

  // Don't show layout on login page
  if (location.pathname === '/admin/login') {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black/50 z-[100] lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 z-[101] lg:hidden"
            >
              <AdminSidebar onClose={toggleSidebar} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <h1 className="font-heading font-black text-xl text-brand-dark uppercase tracking-tight">
              {location.pathname === '/admin' ? 'Dashboard' : 
               location.pathname.includes('/menu') ? 'Menu Management' : 
               'Admin Portal'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-brand-dark">Admin User</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Store Manager</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
