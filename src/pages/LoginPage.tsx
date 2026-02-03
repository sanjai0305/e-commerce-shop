import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/store/useStore';
import { ShoppingBag, Mail, Lock, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

type Step = 'login' | 'otp' | 'verified';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useStore();
  const [step, setStep] = useState<Step>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }
    setIsLoading(true);
    // Simulate OTP request
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast.success('OTP sent to your email!');
    setStep('otp');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast.error('Please enter complete OTP');
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep('verified');
    toast.success('OTP verified successfully!');
    
    // Login user and redirect after animation
    setTimeout(() => {
      login({ email, name: email.split('@')[0], phone: '' });
      navigate('/home');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary shadow-glow mb-4">
            <ShoppingBag className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground">ShopEase</h1>
          <p className="text-muted-foreground mt-1">Your one-stop shopping destination</p>
        </div>

        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-display">
              {step === 'login' && 'Welcome Back'}
              {step === 'otp' && 'Verify OTP'}
              {step === 'verified' && 'Verified!'}
            </CardTitle>
            <CardDescription>
              {step === 'login' && 'Sign in to access your account'}
              {step === 'otp' && `Enter the 6-digit code sent to ${email}`}
              {step === 'verified' && 'Redirecting to homepage...'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {step === 'login' && (
              <form onSubmit={handleGetOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email or Username
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 gradient-primary text-primary-foreground font-semibold btn-bounce"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <>
                      Get OTP
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <button type="button" className="text-primary font-medium hover:underline">
                    Sign up
                  </button>
                </p>
              </form>
            )}

            {step === 'otp' && (
              <div className="space-y-6">
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-14 text-center text-xl font-bold"
                    />
                  ))}
                </div>

                <Button
                  onClick={handleVerifyOTP}
                  className="w-full h-12 gradient-primary text-primary-foreground font-semibold btn-bounce"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    'Verify OTP'
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Didn't receive code?{' '}
                  <button type="button" className="text-primary font-medium hover:underline">
                    Resend OTP
                  </button>
                </p>
              </div>
            )}

            {step === 'verified' && (
              <div className="text-center py-8 animate-bounce-in">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-4">
                  <CheckCircle2 className="w-10 h-10 text-success" />
                </div>
                <p className="text-lg font-medium text-foreground">
                  Login Successful!
                </p>
                <div className="mt-4 flex justify-center">
                  <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
