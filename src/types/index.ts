/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Badge = 'New' | 'Bestseller' | 'Spicy' | 'Value' | 'Promo';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  image: string;
  badge?: Badge;
  isSpicy?: boolean;
  calories?: number;
  rating: number;
  reviewCount: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export type Category = 'Burgers' | 'Chicken' | 'Deals' | 'Sides' | 'Drinks' | 'Desserts';

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: number;
  address: Address;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  phone: string;
  email: string;
}
