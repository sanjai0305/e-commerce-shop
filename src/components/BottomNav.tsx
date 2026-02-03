import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, Heart, User, Menu } from 'lucide-react';
import { useStore } from '@/store/useStore';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartCount, wishlist } = useStore();

  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: ShoppingCart, label: 'Cart', path: '/cart', badge: getCartCount() },
    { icon: Heart, label: 'Wishlist', path: '/wishlist', badge: wishlist.length },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Menu, label: 'Menu', path: '/menu' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg">
      <div className="container">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`relative flex flex-col items-center justify-center py-2 px-4 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-bold">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] mt-1 ${isActive ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute -bottom-2 w-1 h-1 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
