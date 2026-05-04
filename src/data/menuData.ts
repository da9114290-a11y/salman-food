/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  // BURGERS
  { 
    id: 'b1', 
    name: 'Zinger Supreme', 
    description: 'Crispy fried chicken fillet, jalapeños, coleslaw, sriracha mayo', 
    price: 650, 
    originalPrice: 750, 
    category: 'Burgers', 
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80', 
    badge: 'Bestseller', 
    isSpicy: true, 
    calories: 620, 
    rating: 4.8, 
    reviewCount: 1240 
  },
  { 
    id: 'b2', 
    name: 'Double Smash Burger', 
    description: 'Two smashed beef patties, cheddar cheese, pickles, special sauce', 
    price: 750, 
    category: 'Burgers', 
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80', 
    badge: 'New', 
    calories: 780, 
    rating: 4.7, 
    reviewCount: 430 
  },
  { 
    id: 'b3', 
    name: 'Classic Beef Burger', 
    description: 'Juicy beef patty, lettuce, tomato, onion, ketchup & mustard', 
    price: 500, 
    category: 'Burgers', 
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&q=80', 
    calories: 540, 
    rating: 4.5, 
    reviewCount: 890 
  },
  { 
    id: 'b4', 
    name: 'BBQ Bacon Burger', 
    description: 'Beef patty, crispy bacon strips, BBQ sauce, caramelized onions', 
    price: 800, 
    category: 'Burgers', 
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&q=80', 
    calories: 850, 
    rating: 4.6, 
    reviewCount: 320 
  },
  { 
    id: 'b5', 
    name: 'Veggie Deluxe', 
    description: 'Crispy veggie patty, avocado, tomato, lettuce, herb mayo', 
    price: 550, 
    category: 'Burgers', 
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', 
    calories: 480, 
    rating: 4.3, 
    reviewCount: 210 
  },

  // CHICKEN
  { 
    id: 'c1', 
    name: 'Crispy Fried Chicken (3pc)', 
    description: 'Original recipe crispy fried chicken, 11 secret herbs & spices', 
    price: 700, 
    originalPrice: 850, 
    category: 'Chicken', 
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80', 
    badge: 'Bestseller', 
    calories: 720, 
    rating: 4.9, 
    reviewCount: 2100 
  },
  { 
    id: 'c2', 
    name: 'Hot & Spicy Wings (6pc)', 
    description: 'Fiery spiced chicken wings, served with blue cheese dip', 
    price: 650, 
    category: 'Chicken', 
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&q=80', 
    badge: 'Spicy', 
    isSpicy: true, 
    calories: 580, 
    rating: 4.7, 
    reviewCount: 1560 
  },
  { 
    id: 'c3', 
    name: 'Chicken Strips (4pc)', 
    description: 'Tender chicken breast strips, golden fried, honey mustard dip', 
    price: 600, 
    category: 'Chicken', 
    image: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=600&q=80', 
    calories: 490, 
    rating: 4.6, 
    reviewCount: 780 
  },
  { 
    id: 'c4', 
    name: 'Grilled Chicken Platter', 
    description: 'Chargrilled chicken breast, seasoned rice, coleslaw, garlic bread', 
    price: 900, 
    category: 'Chicken', 
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&q=80', 
    calories: 650, 
    rating: 4.5, 
    reviewCount: 340 
  },
  { 
    id: 'c5', 
    name: 'Popcorn Chicken', 
    description: 'Bite-sized crispy chicken pieces, classic seasoning', 
    price: 450, 
    category: 'Chicken', 
    image: 'https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?w=600&q=80', 
    badge: 'Value', 
    calories: 380, 
    rating: 4.4, 
    reviewCount: 920 
  },

  // DEALS
  {
    id: 'd1',
    name: 'Family Feast',
    description: '10pc Fried Chicken, 2 Large Fries, 1 Coleslaw, 1.5L Pepsi',
    price: 1400,
    originalPrice: 1800,
    category: 'Deals',
    image: 'https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=600&q=80',
    badge: 'Value',
    rating: 4.8,
    reviewCount: 540
  },
  {
    id: 'd2',
    name: 'Duo Meal Deal',
    description: '2 Zinger Burgers, 2 Fries, 2 Drinks',
    price: 1100,
    originalPrice: 1300,
    category: 'Deals',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&q=80',
    badge: 'New',
    rating: 4.7,
    reviewCount: 280
  },
  {
    id: 'd3',
    name: 'Student Meal',
    description: '1 Zinger Burger, 1 Regular Fries, 1 Regular Drink',
    price: 750,
    category: 'Deals',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&q=80',
    badge: 'Value',
    rating: 4.6,
    reviewCount: 420
  },
  {
    id: 'd4',
    name: 'Zinger Box',
    description: '1 Zinger Burger, 1pc Chicken, Fries, Regular Drink',
    price: 950,
    originalPrice: 1100,
    category: 'Deals',
    image: 'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?w=600&q=80',
    badge: 'Bestseller',
    rating: 4.7,
    reviewCount: 670
  },

  // SIDES
  {
    id: 's1',
    name: 'Large Fries',
    description: 'Signature golden fries, lightly salted and hot',
    price: 200,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&q=80',
    calories: 450,
    rating: 4.5,
    reviewCount: 1300
  },
  {
    id: 's2',
    name: 'Coleslaw Cup',
    description: 'Creamy cabbage and carrot salad in signature dressing',
    price: 150,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&q=80',
    calories: 120,
    rating: 4.3,
    reviewCount: 450
  },
  {
    id: 's3',
    name: 'Onion Rings',
    description: 'Crispy batter-fried onion circles with dipping sauce',
    price: 250,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1601004176214-7f154446f251?w=800&q=80',
    calories: 320,
    rating: 4.4,
    reviewCount: 320
  },

  // DRINKS
  {
    id: 'dr1', 
    name: 'Pepsi', 
    description: 'Refreshing chilled cola (500ml)', 
    price: 150, 
    category: 'Drinks', 
    image: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=800&q=80', 
    calories: 210, 
    rating: 4.6,
    reviewCount: 890
  },
  {
    id: 'dr2',
    name: 'Fresh Lemonade',
    description: 'Cold pressed lemon juice with a hint of mint',
    price: 200,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80',
    calories: 150,
    rating: 4.8,
    reviewCount: 230
  },
  {
    id: 'dr3',
    name: 'Mango Lassi',
    description: 'Traditional creamy yogurt drink with sweet mango pulp',
    price: 250,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=600&q=80',
    calories: 350,
    rating: 4.9,
    reviewCount: 150
  },
  {
    id: 'dr4',
    name: 'Mineral Water',
    description: 'Pure drinking water (500ml)',
    price: 80,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80',
    calories: 0,
    rating: 4.4,
    reviewCount: 120
  },

  // DESSERTS
  {
    id: 'des1',
    name: 'Chocolate Fudge Brownie',
    description: 'Warm, gooey chocolate brownie with fudge sauce',
    price: 300,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&q=80',
    calories: 450,
    rating: 4.8,
    reviewCount: 340
  },
  {
    id: 'des2',
    name: 'Soft Serve Cone',
    description: 'Creamy vanilla soft serve in a crunchy waffle cone',
    price: 150,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&q=80',
    calories: 250,
    rating: 4.6,
    reviewCount: 1200
  },
  {
    id: 'des3',
    name: 'Apple Pie',
    description: 'Flaky pastry crust filled with hot spiced apples',
    price: 200,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1568571780765-9276ac4b7fcb?w=800&q=80',
    calories: 320,
    rating: 4.5,
    reviewCount: 180
  }
];
