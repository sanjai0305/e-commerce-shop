import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products, categories, searchProducts, getProductsByCategory } from '@/data/products';
import { useStore } from '@/store/useStore';
import { Product } from '@/types';
import { 
  Search, ShoppingCart, Heart, User, Menu, Star, 
  ChevronRight, Camera, X, Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import BottomNav from '@/components/BottomNav';
import CameraLens from '@/components/CameraLens';

const HomePage = () => {
  const navigate = useNavigate();
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist, getCartCount } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCameraLens, setShowCameraLens] = useState(false);

  const displayProducts = searchQuery 
    ? searchProducts(searchQuery)
    : selectedCategory 
      ? getProductsByCategory(selectedCategory)
      : products;

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleWishlistToggle = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.info('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!');
    }
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product);
    toast.success('Added to cart!');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getDiscountPercent = (price: number, originalPrice?: number) => {
    if (!originalPrice) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container py-3">
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 h-11 rounded-full bg-secondary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Camera Lens Button */}
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shrink-0 border-primary/20 hover:bg-primary/10"
              onClick={() => setShowCameraLens(true)}
            >
              <Camera className="w-5 h-5 text-primary" />
            </Button>

            {/* Cart Button */}
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shrink-0 relative"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="w-5 h-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-bold">
                  {getCartCount()}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Categories */}
      <section className="py-4 bg-card border-b border-border">
        <div className="container">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !selectedCategory
                  ? 'bg-primary text-primary-foreground shadow-glow'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Banner */}
      {!searchQuery && !selectedCategory && (
        <section className="py-6">
          <div className="container">
            <div className="relative overflow-hidden rounded-2xl gradient-hero p-6 md:p-10 text-primary-foreground">
              <div className="relative z-10 max-w-lg">
                <Badge className="bg-accent text-accent-foreground mb-3">
                  <Sparkles className="w-3 h-3 mr-1" />
                  New Feature
                </Badge>
                <h2 className="text-2xl md:text-4xl font-display font-bold mb-3">
                  AI-Powered Style Matching
                </h2>
                <p className="text-primary-foreground/80 mb-4">
                  Use our camera lens to find perfect matching products for your style!
                </p>
                <Button 
                  className="bg-card text-foreground hover:bg-card/90"
                  onClick={() => setShowCameraLens(true)}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Try Now
                </Button>
              </div>
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="py-6">
        <div className="container">
          {(searchQuery || selectedCategory) && (
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                {searchQuery 
                  ? `Results for "${searchQuery}"`
                  : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <span className="text-sm text-muted-foreground">
                {displayProducts.length} products
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayProducts.map((product, index) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="group bg-card rounded-xl overflow-hidden shadow-card card-hover cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-secondary/50 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => handleWishlistToggle(e, product)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-md transition-transform hover:scale-110"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isInWishlist(product.id)
                          ? 'fill-destructive text-destructive'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </button>

                  {/* Discount Badge */}
                  {product.originalPrice && (
                    <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs">
                      {getDiscountPercent(product.price, product.originalPrice)}% OFF
                    </Badge>
                  )}

                  {/* Exchange Badge */}
                  {product.exchangeValue && (
                    <Badge className="absolute bottom-2 left-2 bg-success text-success-foreground text-xs">
                      Exchange: -{formatPrice(product.exchangeValue)}
                    </Badge>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-success/10 text-success text-xs font-medium">
                      <Star className="w-3 h-3 fill-current" />
                      {product.rating}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviewCount.toLocaleString()})
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-bold text-foreground">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <Button
                    size="sm"
                    className="w-full mt-3 h-8 text-xs gradient-accent text-accent-foreground btn-bounce"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {displayProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found</p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Camera Lens Modal */}
      {showCameraLens && (
        <CameraLens onClose={() => setShowCameraLens(false)} />
      )}
    </div>
  );
};

export default HomePage;
