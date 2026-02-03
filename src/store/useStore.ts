import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, User, Address, Order } from '@/types';

interface AppState {
  // Auth
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Wishlist
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Exchange
  exchangeProduct: Product | null;
  setExchangeProduct: (product: Product | null) => void;

  // Address
  savedAddress: Address | null;
  setSavedAddress: (address: Address) => void;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      isAuthenticated: false,
      user: null,
      setUser: (user) => set({ user }),
      login: (user) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null }),

      // Cart
      cart: [],
      addToCart: (product) => {
        const cart = get().cart;
        const existingItem = cart.find(item => item.product.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({ cart: [...cart, { product, quantity: 1 }] });
        }
      },
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item.product.id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          )
        });
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        const { cart, exchangeProduct } = get();
        const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        const exchangeDiscount = exchangeProduct?.exchangeValue || 0;
        return Math.max(0, total - exchangeDiscount);
      },
      getCartCount: () => {
        return get().cart.reduce((sum, item) => sum + item.quantity, 0);
      },

      // Wishlist
      wishlist: [],
      addToWishlist: (product) => {
        if (!get().isInWishlist(product.id)) {
          set({ wishlist: [...get().wishlist, product] });
        }
      },
      removeFromWishlist: (productId) => {
        set({ wishlist: get().wishlist.filter(p => p.id !== productId) });
      },
      isInWishlist: (productId) => {
        return get().wishlist.some(p => p.id === productId);
      },

      // Exchange
      exchangeProduct: null,
      setExchangeProduct: (product) => set({ exchangeProduct: product }),

      // Address
      savedAddress: null,
      setSavedAddress: (address) => set({ savedAddress: address }),

      // Orders
      orders: [],
      addOrder: (order) => set({ orders: [...get().orders, order] }),
    }),
    {
      name: 'shop-storage',
    }
  )
);
