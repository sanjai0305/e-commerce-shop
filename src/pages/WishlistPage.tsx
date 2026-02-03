import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import BottomNav from '@/components/BottomNav';

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = (productId: string) => {
    const product = wishlist.find(p => p.id === productId);
    if (product) {
      addToCart(product);
      removeFromWishlist(productId);
      toast.success('Moved to cart!');
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
          <div className="container py-3 flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-semibold">My Wishlist</h1>
          </div>
        </header>

        <div className="flex flex-col items-center justify-center py-20">
          <Heart className="w-24 h-24 text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">Save items you love for later</p>
          <Button onClick={() => navigate('/home')}>
            Explore Products
          </Button>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold">My Wishlist ({wishlist.length})</h1>
        </div>
      </header>

      <div className="container py-4">
        <div className="grid grid-cols-2 gap-4">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-card rounded-xl overflow-hidden shadow-sm"
            >
              <div 
                className="aspect-square bg-secondary/50 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-3">
                <h3 
                  className="font-medium text-sm line-clamp-2 cursor-pointer hover:text-primary"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {product.name}
                </h3>
                
                <div className="flex items-baseline gap-2 mt-1 mb-3">
                  <span className="font-bold">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 h-8 text-xs gradient-accent text-accent-foreground"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => {
                      removeFromWishlist(product.id);
                      toast.info('Removed from wishlist');
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default WishlistPage;
