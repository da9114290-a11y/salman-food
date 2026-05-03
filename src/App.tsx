/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { AdminLogin } from './pages/admin/Login';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminMenuManagement } from './pages/admin/MenuManagement';
import { AdminLayout } from './components/admin/AdminLayout';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="login" element={<AdminLogin />} />
          <Route path="menu" element={<AdminMenuManagement />} />
          {/* Fallbacks for missing admin pages */}
          <Route path="orders" element={<AdminDashboard />} />
          <Route path="deals" element={<AdminDashboard />} />
          <Route path="analytics" element={<AdminDashboard />} />
          <Route path="settings" element={<AdminDashboard />} />
        </Route>

        {/* Global Fallback */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
