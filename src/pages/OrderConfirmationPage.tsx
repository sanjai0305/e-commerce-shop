import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Order } from '@/types';
import { 
  CheckCircle2, Package, Truck, MapPin, 
  Calendar, CreditCard, Home, Share2
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order as Order;

  React.useEffect(() => {
    // Celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  if (!order) {
    navigate('/home');
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Order Confirmed!',
        text: `My order #${order.id} has been confirmed!`,
      });
    } else {
      navigator.clipboard.writeText(`Order #${order.id} confirmed!`);
      toast.success('Order ID copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Success Header */}
      <div className="gradient-hero text-primary-foreground py-12 text-center">
        <div className="animate-bounce-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-card/20 backdrop-blur-sm mb-4">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-2xl font-display font-bold mb-2">Order Confirmed!</h1>
          <p className="text-primary-foreground/80">
            Thank you for shopping with us
          </p>
        </div>
      </div>

      <div className="container py-6 space-y-6">
        {/* Order ID */}
        <div className="bg-card rounded-xl p-4 shadow-sm text-center">
          <p className="text-sm text-muted-foreground mb-1">Order ID</p>
          <p className="text-lg font-mono font-bold text-primary">{order.id}</p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-2"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Delivery Info */}
        <div className="bg-card rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="font-semibold">Expected Delivery</p>
              <p className="text-sm text-muted-foreground">
                {order.deliveryDate}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-4 border-t border-border">
            <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">{order.address.name}</p>
              <p className="text-sm text-muted-foreground">
                {order.address.address}, {order.address.city}, {order.address.state} - {order.address.pincode}
              </p>
              <p className="text-sm text-muted-foreground">{order.address.phone}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-card rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Order Items ({order.items.length})</h2>
          </div>

          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.product.id} className="flex gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium line-clamp-1">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  <p className="text-sm font-medium">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          {/* Payment Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CreditCard className="w-4 h-4" />
              <span>Paid via {order.paymentMethod}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Ordered on {order.orderDate}</span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total Paid</span>
            <span className="text-primary">{formatPrice(order.total)}</span>
          </div>
        </div>

        {/* Order Status Timeline */}
        <div className="bg-card rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold mb-4">Order Status</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-success-foreground" />
              </div>
              <div>
                <p className="font-medium">Order Confirmed</p>
                <p className="text-sm text-muted-foreground">{order.orderDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <Package className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Processing</p>
                <p className="text-sm text-muted-foreground">Your order is being prepared</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <Truck className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Out for Delivery</p>
                <p className="text-sm text-muted-foreground">Expected by {order.deliveryDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="container">
          <Button
            className="w-full h-12 gradient-primary text-primary-foreground btn-bounce"
            onClick={() => navigate('/home')}
          >
            <Home className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
