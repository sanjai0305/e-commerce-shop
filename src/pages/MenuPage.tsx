import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, ShoppingBag, Package, Truck, RefreshCw, 
  HelpCircle, FileText, Shield, Star, Share2, ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';
import BottomNav from '@/components/BottomNav';
import { categories } from '@/data/products';

const MenuPage = () => {
  const navigate = useNavigate();

  const shopByCategory = categories;

  const helpItems = [
    { icon: Package, label: 'Track Order', description: 'Check your order status' },
    { icon: RefreshCw, label: 'Return/Exchange', description: 'Easy returns within 7 days' },
    { icon: HelpCircle, label: 'Help Center', description: 'FAQs and support' },
    { icon: FileText, label: 'Terms & Conditions', description: 'Read our policies' },
    { icon: Shield, label: 'Privacy Policy', description: 'Your data is safe' },
  ];

  const moreItems = [
    { icon: Star, label: 'Rate Us', description: 'Love the app? Rate us!' },
    { icon: Share2, label: 'Share App', description: 'Share with friends' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold">Menu</h1>
        </div>
      </header>

      <div className="container py-4 space-y-6">
        {/* Shop by Category */}
        <div>
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Shop by Category
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {shopByCategory.map((category) => (
              <button
                key={category.id}
                onClick={() => navigate('/home')}
                className="flex flex-col items-center p-4 bg-card rounded-xl shadow-sm hover:shadow-md transition-all card-hover"
              >
                <span className="text-3xl mb-2">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Help & Support */}
        <div>
          <h2 className="font-semibold mb-3">Help & Support</h2>
          <div className="space-y-2">
            {helpItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => toast.info('Coming soon!')}
                  className="w-full flex items-center gap-4 p-3 bg-card rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* More */}
        <div>
          <h2 className="font-semibold mb-3">More</h2>
          <div className="space-y-2">
            {moreItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => toast.info('Coming soon!')}
                  className="w-full flex items-center gap-4 p-3 bg-card rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              );
            })}
          </div>
        </div>

        {/* App Version */}
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">ShopEase v1.0.0</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default MenuPage;
