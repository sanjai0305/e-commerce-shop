import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore } from '@/store/useStore';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { Address } from '@/types';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, savedAddress, setSavedAddress } = useStore();
  
  const [address, setAddress] = useState<Address>(savedAddress || {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [errors, setErrors] = useState<Partial<Address>>({});

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Address> = {};
    
    if (!address.name.trim()) newErrors.name = 'Name is required';
    if (!address.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(address.email)) newErrors.email = 'Invalid email';
    if (!address.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(address.phone)) newErrors.phone = 'Invalid phone number';
    if (!address.address.trim()) newErrors.address = 'Address is required';
    if (!address.city.trim()) newErrors.city = 'City is required';
    if (!address.state.trim()) newErrors.state = 'State is required';
    if (!address.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(address.pincode)) newErrors.pincode = 'Invalid pincode';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill all required fields correctly');
      return;
    }

    setSavedAddress(address);
    navigate('/payment');
  };

  const handleInputChange = (field: keyof Address, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold">Delivery Address</h1>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="container py-4">
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              1
            </div>
            <span className="text-sm font-medium">Address</span>
          </div>
          <div className="w-8 h-0.5 bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary text-muted-foreground flex items-center justify-center text-sm font-medium">
              2
            </div>
            <span className="text-sm text-muted-foreground">Payment</span>
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="container py-4">
        <div className="bg-card rounded-xl p-4 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-primary mb-4">
            <MapPin className="w-5 h-5" />
            <h2 className="font-semibold">Enter Delivery Details</h2>
          </div>

          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={address.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p className="text-xs text-destructive mt-1">{errors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={address.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="10-digit number"
                  value={address.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={errors.phone ? 'border-destructive' : ''}
                />
                {errors.phone && (
                  <p className="text-xs text-destructive mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                placeholder="House/Flat No., Street, Landmark"
                value={address.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={errors.address ? 'border-destructive' : ''}
              />
              {errors.address && (
                <p className="text-xs text-destructive mt-1">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="Enter city"
                  value={address.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className={errors.city ? 'border-destructive' : ''}
                />
                {errors.city && (
                  <p className="text-xs text-destructive mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  placeholder="Enter state"
                  value={address.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className={errors.state ? 'border-destructive' : ''}
                />
                {errors.state && (
                  <p className="text-xs text-destructive mt-1">{errors.state}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="pincode">Pincode *</Label>
              <Input
                id="pincode"
                placeholder="6-digit pincode"
                value={address.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                className={errors.pincode ? 'border-destructive' : ''}
              />
              {errors.pincode && (
                <p className="text-xs text-destructive mt-1">{errors.pincode}</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
          <div className="container">
            <Button
              type="submit"
              className="w-full h-12 gradient-primary text-primary-foreground btn-bounce"
            >
              Continue to Payment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
