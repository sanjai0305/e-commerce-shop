import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useStore } from '@/store/useStore';
import { 
  ArrowLeft, CreditCard, Smartphone, Wallet, 
  Banknote, ArrowRight, Shield
} from 'lucide-react';
import { toast } from 'sonner';
import { Order } from '@/types';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { cart, savedAddress, exchangeProduct, addOrder, clearCart, setExchangeProduct } = useStore();
  
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0 || !savedAddress) {
    navigate('/cart');
    return null;
  }

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

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Pay using any UPI app' },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, RuPay' },
    { id: 'emi', name: 'EMI', icon: Wallet, description: 'Easy monthly installments' },
    { id: 'cod', name: 'Cash on Delivery', icon: Banknote, description: 'Pay when you receive' },
  ];

  const handlePayment = async () => {
    // Validate payment method inputs
    if (paymentMethod === 'upi' && !upiId.includes('@')) {
      toast.error('Please enter a valid UPI ID');
      return;
    }
    if (paymentMethod === 'card') {
      if (cardNumber.replace(/\s/g, '').length < 16) {
        toast.error('Please enter a valid card number');
        return;
      }
      if (!cardExpiry.match(/^\d{2}\/\d{2}$/)) {
        toast.error('Please enter a valid expiry date (MM/YY)');
        return;
      }
      if (cardCvv.length < 3) {
        toast.error('Please enter a valid CVV');
        return;
      }
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Calculate delivery date (3-5 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3);

    // Create order
    const order: Order = {
      id: `ORD${Date.now()}`,
      items: cart,
      address: savedAddress,
      paymentMethod: paymentMethods.find(p => p.id === paymentMethod)?.name || paymentMethod,
      total,
      status: 'confirmed',
      deliveryDate: deliveryDate.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      orderDate: new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    addOrder(order);
    clearCart();
    setExchangeProduct(null);
    
    navigate('/order-confirmation', { state: { order } });
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.slice(0, 19);
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold">Payment</h1>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="container py-4">
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center text-sm font-medium">
              ✓
            </div>
            <span className="text-sm text-muted-foreground">Address</span>
          </div>
          <div className="w-8 h-0.5 bg-success" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              2
            </div>
            <span className="text-sm font-medium">Payment</span>
          </div>
          <div className="w-8 h-0.5 bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary text-muted-foreground flex items-center justify-center text-sm font-medium">
              3
            </div>
            <span className="text-sm text-muted-foreground">Confirm</span>
          </div>
        </div>
      </div>

      <div className="container py-4 space-y-4">
        {/* Payment Methods */}
        <div className="bg-card rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold mb-4">Select Payment Method</h2>
          
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <Label
                    key={method.id}
                    htmlFor={method.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === method.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Icon className="w-6 h-6 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{method.name}</p>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                  </Label>
                );
              })}
            </div>
          </RadioGroup>
        </div>

        {/* Payment Details */}
        {paymentMethod === 'upi' && (
          <div className="bg-card rounded-xl p-4 shadow-sm animate-fade-in">
            <h3 className="font-semibold mb-4">Enter UPI ID</h3>
            <Input
              placeholder="yourname@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
        )}

        {paymentMethod === 'card' && (
          <div className="bg-card rounded-xl p-4 shadow-sm space-y-4 animate-fade-in">
            <h3 className="font-semibold mb-4">Card Details</h3>
            
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="password"
                  placeholder="***"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  maxLength={4}
                />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === 'emi' && (
          <div className="bg-card rounded-xl p-4 shadow-sm animate-fade-in">
            <h3 className="font-semibold mb-4">EMI Options</h3>
            <div className="space-y-3">
              {[3, 6, 9, 12].map((months) => {
                const emi = Math.round(total / months);
                return (
                  <div
                    key={months}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                  >
                    <span>{months} months</span>
                    <span className="font-medium">{formatPrice(emi)}/month</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {paymentMethod === 'cod' && (
          <div className="bg-card rounded-xl p-4 shadow-sm animate-fade-in">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Banknote className="w-8 h-8" />
              <p className="text-sm">
                Pay cash when you receive your order. Please keep exact change ready.
              </p>
            </div>
          </div>
        )}

        {/* Security Note */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="w-4 h-4" />
          <span>Your payment is secured with 256-bit encryption</span>
        </div>
      </div>

      {/* Bottom Summary */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="container py-4 space-y-3">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          <Button
            className="w-full h-12 gradient-accent text-accent-foreground btn-bounce"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              <>
                Pay {formatPrice(total)}
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
