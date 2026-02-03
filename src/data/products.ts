import { Product } from '@/types';

export const products: Product[] = [
  // Gadgets
  {
    id: 'g1',
    name: 'Smart Watch Pro X',
    description: 'Advanced smartwatch with health monitoring, GPS tracking, and 7-day battery life. Water resistant up to 50m.',
    price: 12999,
    originalPrice: 18999,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    category: 'gadgets',
    rating: 4.5,
    reviewCount: 2847,
    inStock: true,
    exchangeValue: 3000,
    specifications: {
      'Display': '1.4" AMOLED',
      'Battery': '7 days',
      'Water Resistance': '50m',
      'Sensors': 'Heart Rate, SpO2, GPS',
      'Connectivity': 'Bluetooth 5.0, WiFi'
    },
    reviews: [
      { id: 'r1', userName: 'Rahul K.', rating: 5, comment: 'Excellent watch! Battery lasts a week easily.', date: '2024-01-15', verified: true },
      { id: 'r2', userName: 'Priya S.', rating: 4, comment: 'Great features but strap could be better.', date: '2024-01-10', verified: true }
    ]
  },
  {
    id: 'g2',
    name: 'Wireless Earbuds Elite',
    description: 'Premium wireless earbuds with active noise cancellation and 30-hour battery life with case.',
    price: 4999,
    originalPrice: 7999,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400',
    category: 'gadgets',
    rating: 4.7,
    reviewCount: 5621,
    inStock: true,
    exchangeValue: 1500,
    specifications: {
      'Driver Size': '11mm',
      'Battery': '8hrs (30hrs with case)',
      'ANC': 'Active Noise Cancellation',
      'Codec': 'AAC, SBC, aptX'
    },
    reviews: [
      { id: 'r3', userName: 'Amit T.', rating: 5, comment: 'Best earbuds in this price range!', date: '2024-01-20', verified: true }
    ]
  },
  // Electronics
  {
    id: 'e1',
    name: 'Ultra HD Smart TV 55"',
    description: '55-inch 4K Ultra HD Smart LED TV with Dolby Vision, HDR10+, and built-in streaming apps.',
    price: 42999,
    originalPrice: 59999,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
    category: 'electronics',
    rating: 4.4,
    reviewCount: 1823,
    inStock: true,
    exchangeValue: 8000,
    specifications: {
      'Screen Size': '55 inches',
      'Resolution': '4K Ultra HD',
      'HDR': 'Dolby Vision, HDR10+',
      'Smart TV': 'Android TV 11',
      'Refresh Rate': '120Hz'
    },
    reviews: [
      { id: 'r4', userName: 'Suresh M.', rating: 5, comment: 'Picture quality is amazing!', date: '2024-01-18', verified: true }
    ]
  },
  {
    id: 'e2',
    name: 'Laptop Pro 15',
    description: 'Powerful laptop with Intel i7, 16GB RAM, 512GB SSD, and dedicated graphics.',
    price: 72999,
    originalPrice: 89999,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    category: 'electronics',
    rating: 4.6,
    reviewCount: 982,
    inStock: true,
    exchangeValue: 15000,
    specifications: {
      'Processor': 'Intel Core i7-12th Gen',
      'RAM': '16GB DDR5',
      'Storage': '512GB NVMe SSD',
      'Display': '15.6" FHD IPS',
      'Graphics': 'NVIDIA RTX 3050'
    },
    reviews: [
      { id: 'r5', userName: 'Vikram R.', rating: 5, comment: 'Perfect for work and gaming!', date: '2024-01-12', verified: true }
    ]
  },
  // Sports
  {
    id: 's1',
    name: 'Professional Running Shoes',
    description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper.',
    price: 3499,
    originalPrice: 5999,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    category: 'sports',
    rating: 4.3,
    reviewCount: 3421,
    inStock: true,
    exchangeValue: 800,
    specifications: {
      'Material': 'Breathable Mesh',
      'Sole': 'Responsive Foam',
      'Weight': '280g',
      'Closure': 'Lace-up'
    },
    reviews: [
      { id: 'r6', userName: 'Ankit P.', rating: 4, comment: 'Very comfortable for long runs.', date: '2024-01-14', verified: true }
    ]
  },
  {
    id: 's2',
    name: 'Yoga Mat Premium',
    description: 'Extra thick yoga mat with non-slip surface and carrying strap.',
    price: 1299,
    originalPrice: 1999,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
    category: 'sports',
    rating: 4.8,
    reviewCount: 1567,
    inStock: true,
    exchangeValue: 300,
    specifications: {
      'Thickness': '8mm',
      'Material': 'TPE Eco-friendly',
      'Size': '183 x 61 cm',
      'Features': 'Non-slip, Carrying strap'
    },
    reviews: [
      { id: 'r7', userName: 'Meera L.', rating: 5, comment: 'Best yoga mat I have used!', date: '2024-01-16', verified: true }
    ]
  },
  // Fashion
  {
    id: 'f1',
    name: 'Classic Denim Jacket',
    description: 'Timeless denim jacket with modern fit. Perfect for casual and semi-formal occasions.',
    price: 2499,
    originalPrice: 3999,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    category: 'fashion',
    rating: 4.5,
    reviewCount: 2134,
    inStock: true,
    exchangeValue: 600,
    specifications: {
      'Material': '100% Cotton Denim',
      'Fit': 'Regular',
      'Care': 'Machine Washable',
      'Closure': 'Button'
    },
    reviews: [
      { id: 'r8', userName: 'Neha G.', rating: 5, comment: 'Fits perfectly and looks great!', date: '2024-01-19', verified: true }
    ]
  },
  {
    id: 'f2',
    name: 'Designer Sneakers',
    description: 'Premium leather sneakers with cushioned insole and durable rubber outsole.',
    price: 4999,
    originalPrice: 6999,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
    category: 'fashion',
    rating: 4.6,
    reviewCount: 1876,
    inStock: true,
    exchangeValue: 1200,
    specifications: {
      'Material': 'Premium Leather',
      'Sole': 'Rubber',
      'Insole': 'Memory Foam',
      'Style': 'Casual'
    },
    reviews: [
      { id: 'r9', userName: 'Karan S.', rating: 5, comment: 'Super comfortable and stylish!', date: '2024-01-17', verified: true }
    ]
  },
  // Beauty
  {
    id: 'b1',
    name: 'Skincare Essential Kit',
    description: 'Complete skincare routine with cleanser, toner, serum, and moisturizer.',
    price: 1899,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
    category: 'beauty',
    rating: 4.7,
    reviewCount: 4532,
    inStock: true,
    exchangeValue: 400,
    specifications: {
      'Contains': '4 Products',
      'Skin Type': 'All',
      'Benefits': 'Hydration, Glow',
      'Size': 'Full Size'
    },
    reviews: [
      { id: 'r10', userName: 'Deepika M.', rating: 5, comment: 'My skin has never looked better!', date: '2024-01-21', verified: true }
    ]
  },
  {
    id: 'b2',
    name: 'Hair Care Bundle',
    description: 'Professional hair care set with shampoo, conditioner, and hair serum.',
    price: 1499,
    originalPrice: 2199,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',
    category: 'beauty',
    rating: 4.4,
    reviewCount: 2187,
    inStock: true,
    exchangeValue: 350,
    specifications: {
      'Contains': '3 Products',
      'Hair Type': 'All',
      'Benefits': 'Repair, Shine',
      'Sulfate Free': 'Yes'
    },
    reviews: [
      { id: 'r11', userName: 'Shruti K.', rating: 4, comment: 'Great products, lovely fragrance!', date: '2024-01-13', verified: true }
    ]
  },
  // Home
  {
    id: 'h1',
    name: 'Smart Air Purifier',
    description: 'HEPA air purifier with smart controls, covers up to 500 sq ft.',
    price: 8999,
    originalPrice: 12999,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400',
    category: 'home',
    rating: 4.5,
    reviewCount: 1234,
    inStock: true,
    exchangeValue: 2000,
    specifications: {
      'Coverage': '500 sq ft',
      'Filter': 'True HEPA',
      'CADR': '350 m³/h',
      'Smart Features': 'App Control, Auto Mode'
    },
    reviews: [
      { id: 'r12', userName: 'Rajesh N.', rating: 5, comment: 'Air quality improved significantly!', date: '2024-01-22', verified: true }
    ]
  },
  {
    id: 'h2',
    name: 'Robot Vacuum Cleaner',
    description: 'Smart robot vacuum with mapping, auto-charging, and app control.',
    price: 15999,
    originalPrice: 22999,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    category: 'home',
    rating: 4.3,
    reviewCount: 876,
    inStock: true,
    exchangeValue: 3500,
    specifications: {
      'Suction': '2500Pa',
      'Battery': '150 min',
      'Navigation': 'LiDAR Mapping',
      'Smart Features': 'App, Voice Control'
    },
    reviews: [
      { id: 'r13', userName: 'Kavita T.', rating: 4, comment: 'Makes cleaning so easy!', date: '2024-01-11', verified: true }
    ]
  }
];

export const categories = [
  { id: 'gadgets', name: 'Gadgets', icon: '📱', color: 'from-blue-500 to-cyan-500' },
  { id: 'electronics', name: 'Electronics', icon: '🖥️', color: 'from-purple-500 to-pink-500' },
  { id: 'sports', name: 'Sports', icon: '⚽', color: 'from-green-500 to-emerald-500' },
  { id: 'fashion', name: 'Fashion', icon: '👗', color: 'from-orange-500 to-red-500' },
  { id: 'beauty', name: 'Beauty', icon: '💄', color: 'from-pink-500 to-rose-500' },
  { id: 'home', name: 'Home', icon: '🏠', color: 'from-amber-500 to-yellow-500' }
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowercaseQuery) ||
    p.description.toLowerCase().includes(lowercaseQuery) ||
    p.category.toLowerCase().includes(lowercaseQuery)
  );
};
