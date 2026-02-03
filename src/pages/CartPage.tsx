import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, RefreshCw, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import BottomNav from '@/components/BottomNav';

const CartPage = () => {
  const navigate = useNavigate();
  const { 
    cart, updateQuantity, removeFromCart, getCartTotal, 
    exchangeProduct, setExchangeProduct 
  } = useStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const exchangeDiscount = exchangeProduct?.exchangeValue || 0;
  const deliveryFee = subtotal > 499 ? 0 : 49;
  const total = Math.max(0, subtotal - exchangeDiscount + deliveryFee);

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    toast.info('Item removed from cart');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
          <div className="container py-3 flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-semibold">My Cart</h1>
          </div>
        </header>

        <div className="flex flex-col items-center justify-center py-20">
          <ShoppingBag className="w-24 h-24 text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add items to get started</p>
          <Button onClick={() => navigate('/home')}>
            Start Shopping
          </Button>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-48">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold">My Cart ({cart.length})</h1>
        </div>
      </header>

      {/* Cart Items */}
      <div className="container py-4 space-y-4">
        {cart.map((item) => (
          <div
            key={item.product.id}
            className="flex gap-4 p-4 bg-card rounded-xl shadow-sm"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-24 h-24 rounded-lg object-cover cursor-pointer"
              onClick={() => navigate(`/product/${item.product.id}`)}
            />
            
            <div className="flex-1">
              <h3 
                className="font-medium line-clamp-2 cursor-pointer hover:text-primary"
                onClick={() => navigate(`/product/${item.product.id}`)}
              >
                {item.product.name}
              </h3>
              
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-bold text-foreground">
                  {formatPrice(item.product.price)}
                </span>
                {item.product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(item.product.originalPrice)}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-7 h-7"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-6 text-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-7 h-7"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleRemove(item.product.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Exchange Discount */}
        {exchangeProduct && (
          <div className="p-4 bg-success/5 border border-success/20 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-success" />
                <div>
                  <p className="font-medium text-success">Exchange Discount Applied</p>
                  <p className="text-sm text-muted-foreground">
                    {exchangeProduct.name}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-success">
                  -{formatPrice(exchangeProduct.exchangeValue || 0)}
                </p>
                <Button
                  variant="link"
                  className="text-xs text-muted-foreground p-0 h-auto"
                  onClick={() => setExchangeProduct(null)}
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Price Summary */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="container py-4 space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {exchangeDiscount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-success">Exchange Discount</span>
                <span className="text-success">-{formatPrice(exchangeDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery</span>
              <span className={deliveryFee === 0 ? 'text-success' : ''}>
                {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <Button
            className="w-full h-12 gradient-accent text-accent-foreground btn-bounce"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default CartPage;
