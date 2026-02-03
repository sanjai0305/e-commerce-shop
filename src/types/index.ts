export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  specifications: Record<string, string>;
  reviews: Review[];
  exchangeValue?: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  email: string;
  name: string;
  phone: string;
}

export interface Address {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  address: Address;
  paymentMethod: string;
  total: number;
  status: string;
  deliveryDate: string;
  orderDate: string;
}

export type Category = 
  | 'gadgets' 
  | 'electronics' 
  | 'sports' 
  | 'fashion' 
  | 'beauty' 
  | 'home';
