import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getProductById, products } from '@/data/products';
import { useStore } from '@/store/useStore';
import { 
  ArrowLeft, Heart, ShoppingCart, Star, Truck, Shield, 
  RefreshCw, ChevronRight, Minus, Plus, Check
} from 'lucide-react';
import { toast } from 'sonner';
import BottomNav from '@/components/BottomNav';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    addToCart, addToWishlist, removeFromWishlist, isInWishlist,
    exchangeProduct, setExchangeProduct, cart
  } = useStore();
  
  const [quantity, setQuantity] = useState(1);
  const [showExchangeModal, setShowExchangeModal] = useState(false);

  const product = getProductById(id || '');

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

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

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigate('/checkout');
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.info('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!');
    }
  };

  const handleExchangeSelect = (exchangeProduct: typeof product) => {
    setExchangeProduct(exchangeProduct);
    setShowExchangeModal(false);
    toast.success(`Exchange discount of ${formatPrice(exchangeProduct.exchangeValue || 0)} applied!`);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-warning text-warning'
                : 'fill-muted text-muted'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleWishlistToggle}
            >
              <Heart
                className={`w-5 h-5 ${
                  isInWishlist(product.id)
                    ? 'fill-destructive text-destructive'
                    : ''
                }`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Product Image */}
      <div className="relative bg-secondary/30">
        <div className="container py-4">
          <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden bg-card shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Discount Badge */}
        {product.originalPrice && (
          <Badge className="absolute top-6 left-6 bg-accent text-accent-foreground text-sm px-3 py-1">
            {getDiscountPercent(product.price, product.originalPrice)}% OFF
          </Badge>
        )}
      </div>

      {/* Product Info */}
      <div className="container py-6 space-y-6">
        {/* Title & Rating */}
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">
            {product.name}
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-success/10 text-success">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-semibold">{product.rating}</span>
            </div>
            <span className="text-muted-foreground">
              {product.reviewCount.toLocaleString()} ratings
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <Badge variant="secondary" className="text-success">
                Save {formatPrice(product.originalPrice - product.price)}
              </Badge>
            </>
          )}
        </div>

        {/* Exchange Offer */}
        {product.exchangeValue && (
          <div 
            className="p-4 rounded-xl bg-success/5 border border-success/20 cursor-pointer"
            onClick={() => setShowExchangeModal(true)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-success" />
                <div>
                  <p className="font-medium text-foreground">Exchange Offer</p>
                  <p className="text-sm text-muted-foreground">
                    Get up to {formatPrice(product.exchangeValue)} off on exchange
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
            {exchangeProduct && (
              <div className="mt-3 pt-3 border-t border-success/20 flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span className="text-sm text-success font-medium">
                  {formatPrice(exchangeProduct.exchangeValue || 0)} discount applied
                </span>
              </div>
            )}
          </div>
        )}

        <Separator />

        {/* Description */}
        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-muted-foreground">{product.description}</p>
        </div>

        {/* Specifications */}
        <div>
          <h3 className="font-semibold mb-3">Specifications</h3>
          <div className="space-y-2">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">{key}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-3 rounded-lg bg-secondary/50 text-center">
            <Truck className="w-5 h-5 text-primary mb-1" />
            <span className="text-xs text-muted-foreground">Free Delivery</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-secondary/50 text-center">
            <RefreshCw className="w-5 h-5 text-primary mb-1" />
            <span className="text-xs text-muted-foreground">7 Day Return</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-secondary/50 text-center">
            <Shield className="w-5 h-5 text-primary mb-1" />
            <span className="text-xs text-muted-foreground">1 Year Warranty</span>
          </div>
        </div>

        <Separator />

        {/* Reviews */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Customer Reviews</h3>
            <Button variant="link" className="text-primary p-0 h-auto">
              See all
            </Button>
          </div>

          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div key={review.id} className="p-4 rounded-xl bg-secondary/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.userName}</span>
                    {review.verified && (
                      <Badge variant="secondary" className="text-xs">
                        <Check className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  {renderStars(review.rating)}
                </div>
                <p className="text-muted-foreground text-sm">{review.comment}</p>
                <p className="text-xs text-muted-foreground mt-2">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg">
        <div className="container flex items-center gap-4">
          {/* Quantity */}
          <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <Button
            variant="outline"
            className="flex-1 h-12"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>

          <Button
            className="flex-1 h-12 gradient-accent text-accent-foreground btn-bounce"
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </div>
      </div>

      {/* Exchange Modal */}
      {showExchangeModal && (
        <div className="fixed inset-0 z-50 bg-foreground/50 flex items-end">
          <div className="w-full bg-card rounded-t-3xl p-6 animate-slide-up max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Select Exchange Product</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowExchangeModal(false)}
              >
                Close
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Select a product you want to exchange for a discount
            </p>

            <div className="space-y-3">
              {products.filter(p => p.exchangeValue && p.id !== product.id).slice(0, 5).map(p => (
                <div
                  key={p.id}
                  onClick={() => handleExchangeSelect(p)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 cursor-pointer hover:bg-secondary transition-colors"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium line-clamp-1">{p.name}</p>
                    <p className="text-sm text-success font-medium">
                      Exchange value: {formatPrice(p.exchangeValue || 0)}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
