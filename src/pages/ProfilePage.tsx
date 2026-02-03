import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { 
  ArrowLeft, User, Package, MapPin, CreditCard, 
  Heart, Settings, LogOut, ChevronRight, Bell
} from 'lucide-react';
import { toast } from 'sonner';
import BottomNav from '@/components/BottomNav';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, orders, savedAddress, wishlist } = useStore();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const menuItems = [
    { icon: Package, label: 'My Orders', value: `${orders.length} orders`, path: '/orders' },
    { icon: MapPin, label: 'Saved Addresses', value: savedAddress ? '1 address' : 'No address', path: '/addresses' },
    { icon: Heart, label: 'Wishlist', value: `${wishlist.length} items`, path: '/wishlist' },
    { icon: CreditCard, label: 'Payment Methods', value: 'Manage', path: '/payments' },
    { icon: Bell, label: 'Notifications', value: 'On', path: '/notifications' },
    { icon: Settings, label: 'Settings', value: '', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold">My Profile</h1>
        </div>
      </header>

      {/* Profile Header */}
      <div className="gradient-hero p-6 text-primary-foreground">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold">
              {isAuthenticated && user ? user.name : 'Guest User'}
            </h2>
            <p className="text-primary-foreground/80 text-sm">
              {isAuthenticated && user ? user.email : 'Sign in to see your profile'}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="container py-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => item.path === '/wishlist' ? navigate('/wishlist') : toast.info('Coming soon!')}
              className="w-full flex items-center gap-4 p-4 bg-card rounded-xl shadow-sm hover:bg-secondary/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">{item.label}</p>
                {item.value && (
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                )}
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          );
        })}

        {/* Logout Button */}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 bg-card rounded-xl shadow-sm hover:bg-destructive/10 transition-colors text-destructive"
          >
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="font-medium">Logout</span>
          </button>
        )}

        {!isAuthenticated && (
          <Button
            className="w-full h-12 gradient-primary text-primary-foreground mt-4"
            onClick={() => navigate('/')}
          >
            Sign In / Sign Up
          </Button>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default ProfilePage;
