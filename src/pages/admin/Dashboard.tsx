/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Clock, 
  Users, 
  ChevronRight, 
  MoreVertical,
  Eye,
  CheckCircle2,
  AlertCircle,
  Truck,
  XCircle
} from 'lucide-react';

interface Order {
  id: string;
  customer: string;
  items: string;
  total: number;
  status: 'Pending' | 'Preparing' | 'Ready' | 'Delivered' | 'Cancelled';
  time: string;
  phone: string;
  address: string;
  payment: string;
}

const MOCK_ORDERS: Order[] = [
  { id: 'ORD-7281', customer: 'Ahmed Khan', items: '2x Big Salman Burger, 1x Large Fries', total: 1850, status: 'Pending', time: '12:45 PM', phone: '0300-1234567', address: 'Apartment 4B, Gulshan Tower, Karachi', payment: 'Cash' },
  { id: 'ORD-7282', customer: 'Sara Ali', items: '1x Crispy Bucket (9pcs), 1x Pepsi 1.5L', total: 2450, status: 'Preparing', time: '12:30 PM', phone: '0321-9876543', address: 'House 12, Street 5, Phase 6, DHA', payment: 'Credit Card' },
  { id: 'ORD-7283', customer: 'Bilal Sheikh', items: '4x Student Deal 1', total: 1600, status: 'Ready', time: '12:15 PM', phone: '0333-5556667', address: 'Block 7, Clifton, Karachi', payment: 'JazzCash' },
  { id: 'ORD-7284', customer: 'Zainab Qazi', items: '1x Zinger Combo, 1x Hot Wings (10pcs)', total: 1250, status: 'Delivered', time: '11:50 AM', phone: '0345-2223334', address: 'Plot 23, North Nazimabad', payment: 'Cash' },
  { id: 'ORD-7285', customer: 'Hamza Malik', items: '3x Chicken Tikka Burger', total: 1050, status: 'Delivered', time: '11:30 AM', phone: '0312-7778889', address: 'Saima Mall, Office 202, Karachi', payment: 'EasyPaisa' },
  { id: 'ORD-7286', customer: 'Mariam J.', items: '1x Family Fiesta Deal', total: 3200, status: 'Cancelled', time: '11:15 AM', phone: '0301-4441112', address: 'KDA Scheme 1, House A-1', payment: 'Cash' },
  { id: 'ORD-7287', customer: 'Umar Farooq', items: '2x Beef Smash Burger, 2x Sprite', total: 1900, status: 'Delivered', time: '11:00 AM', phone: '0310-9990001', address: 'Gulistan-e-Jauhar, Block 15', payment: 'Credit Card' },
  { id: 'ORD-7288', customer: 'Fatima R.', items: '1x Large Pepperoni Pizza (Promo)', total: 1450, status: 'Delivered', time: '10:45 AM', phone: '0322-3334445', address: 'Malir Cantt, Falcon Complex', payment: 'Cash' },
  { id: 'ORD-7289', customer: 'Ibrahim H.', items: '5x Hot Wings, 1x Loaded Fries', total: 950, status: 'Pending', time: '10:30 AM', phone: '0342-8887776', address: 'Bahria Town, Precinct 12', payment: 'Cash' },
  { id: 'ORD-7290', customer: 'Yousuf K.', items: '1x Mega Deal 4', total: 2800, status: 'Preparing', time: '10:15 AM', phone: '0302-1112223', address: 'PECHS Block 2, Street 7', payment: 'JazzCash' },
];

const stats = [
  { label: "Today's Orders", value: "47", trend: "+12%", color: "text-blue-600", bg: "bg-blue-50", icon: <ShoppingBag size={20} /> },
  { label: "Today's Revenue", value: "Rs. 38,450", trend: "+8%", color: "text-green-600", bg: "bg-green-50", icon: <TrendingUp size={20} /> },
  { label: "Pending Orders", value: "8", trend: "Critical", color: "text-orange-600", bg: "bg-orange-50", icon: <Clock size={20} /> },
  { label: "Avg Order Value", value: "Rs. 817", trend: "+3%", color: "text-purple-600", bg: "bg-purple-50", icon: <Users size={20} /> },
];

export const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const updateStatus = (id: string, newStatus: Order['status']) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    if (selectedOrder?.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const statusColors = {
    Pending: 'bg-orange-100 text-orange-700',
    Preparing: 'bg-blue-100 text-blue-700',
    Ready: 'bg-green-100 text-green-700',
    Delivered: 'bg-gray-100 text-gray-700',
    Cancelled: 'bg-red-100 text-red-700',
  };

  const statusIcons = {
    Pending: <Clock size={14} />,
    Preparing: <AlertCircle size={14} />,
    Ready: <CheckCircle2 size={14} />,
    Delivered: <Truck size={14} />,
    Cancelled: <XCircle size={14} />,
  };

  return (
    <div className="space-y-8 pb-12">
      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={`stat-card-${stat.label}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
          >
            <div className="space-y-1">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-brand-dark">{stat.value}</h3>
              <p className={`text-[10px] font-bold ${stat.color} flex items-center gap-1`}>
                <ChevronRight size={10} className="-rotate-90" /> {stat.trend} from yesterday
              </p>
            </div>
            <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* RECENT ORDERS TABLE */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-heading font-black text-lg text-brand-dark uppercase tracking-tight">Recent Orders</h3>
            <button className="text-brand-red font-bold text-xs uppercase tracking-widest hover:underline px-4 py-2">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Order ID</th>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer</th>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Total</th>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="text-right py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={`order-row-${order.id}`} className="hover:bg-gray-50/30 transition-colors group">
                    <td className="py-4 px-6 text-sm font-bold text-brand-dark">{order.id}</td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-bold text-brand-dark">{order.customer}</p>
                      <p className="text-[10px] text-gray-400 font-medium truncate max-w-[150px]">{order.items}</p>
                    </td>
                    <td className="py-4 px-6 text-sm font-bold text-brand-red">Rs. {order.total}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1.5 w-fit ${statusColors[order.status]}`}>
                        {statusIcons[order.status]}
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-gray-400 hover:text-brand-red hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ANALYTICS PREVIEW (CHART PLACEHOLDERS) */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h3 className="font-heading font-black text-lg text-brand-dark uppercase tracking-tight">Sales Analytics</h3>
            <div className="aspect-[4/3] bg-gray-50 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="flex items-end gap-2 h-32">
                {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                  <div key={`chart-bar-${i}`} className="w-4 bg-brand-red rounded-t-sm" style={{ height: `${h}%` }} />
                ))}
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Last 7 Days Revenue</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h3 className="font-heading font-black text-lg text-brand-dark uppercase tracking-tight">Popular Items</h3>
            <div className="space-y-4">
              {[
                { name: 'Big Salman Burger', count: 142, color: 'bg-brand-red' },
                { name: 'Crispy Wings (10pcs)', count: 98, color: 'bg-brand-yellow' },
                { name: 'Zinger Combo', count: 75, color: 'bg-brand-dark' },
              ].map((item, i) => (
                <div key={`popular-item-${item.name}`} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-tight">
                    <span className="text-brand-dark">{item.name}</span>
                    <span className="text-gray-400">{item.count} orders</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${(item.count / 150) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedOrder(null)}
            className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="relative bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-6 md:p-8 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-brand-red uppercase tracking-[0.2em]">Order Details</p>
                <h2 className="font-heading font-black text-2xl text-brand-dark uppercase tracking-tighter">
                  #{selectedOrder.id}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-brand-red transition-all"
              >
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Customer Information</h4>
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-brand-dark">{selectedOrder.customer}</p>
                    <p className="text-sm text-gray-500 font-medium">{selectedOrder.phone}</p>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">{selectedOrder.address}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Order Summary</h4>
                  <div className="space-y-3">
                    <p className="text-sm text-brand-dark font-medium leading-relaxed">{selectedOrder.items}</p>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs font-bold text-gray-400 uppercase">Payment Method</span>
                      <span className="text-sm font-black text-brand-dark uppercase">{selectedOrder.payment}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-400 uppercase">Grand Total</span>
                      <span className="text-xl font-black text-brand-red">Rs. {selectedOrder.total}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Update Status</h4>
                <div className="flex flex-wrap gap-3">
                  {(['Preparing', 'Ready', 'Delivered', 'Cancelled'] as Order['status'][]).map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedOrder.id, status)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        selectedOrder.status === status 
                        ? 'ring-2 ring-offset-2 ring-brand-red bg-brand-red text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-4">
              <button 
                className="flex-1 bg-brand-dark text-white py-4 rounded-xl font-heading font-black uppercase tracking-widest text-xs shadow-lg"
                onClick={() => setSelectedOrder(null)}
              >
                Print Receipt
              </button>
              <button 
                className="flex-1 bg-white border border-gray-200 text-gray-400 py-4 rounded-xl font-heading font-black uppercase tracking-widest text-xs shadow-sm"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
