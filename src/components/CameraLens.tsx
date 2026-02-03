import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, Camera, Sparkles, Loader2 } from 'lucide-react';
import { products } from '@/data/products';
import { Product } from '@/types';
import { toast } from 'sonner';

interface CameraLensProps {
  onClose: () => void;
}

const CameraLens: React.FC<CameraLensProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [cameraReady, setCameraReady] = useState(false);
  const [hasCapture, setHasCapture] = useState(false);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraReady(true);
      }
    } catch (err) {
      toast.error('Could not access camera. Please grant permission.');
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
  };

  const captureAndAnalyze = async () => {
    setIsAnalyzing(true);
    setHasCapture(true);

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Get random fashion products as suggestions
    const fashionProducts = products.filter(p => 
      p.category === 'fashion' || p.category === 'beauty' || p.category === 'sports'
    );
    const shuffled = fashionProducts.sort(() => 0.5 - Math.random());
    setSuggestions(shuffled.slice(0, 4));
    setIsAnalyzing(false);

    toast.success('Found matching products for your style!');
  };

  const handleProductClick = (productId: string) => {
    stopCamera();
    onClose();
    navigate(`/product/${productId}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 bg-foreground/95">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-foreground/80 to-transparent">
        <div className="flex items-center gap-2 text-background">
          <Camera className="w-5 h-5" />
          <span className="font-medium">Style Lens</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-background hover:bg-background/10"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Camera View */}
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />

        {/* Scanning Overlay */}
        {isAnalyzing && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/50">
            <div className="text-center text-background">
              <div className="relative">
                <div className="w-48 h-48 border-4 border-primary rounded-2xl animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-12 h-12 animate-spin text-primary" />
                </div>
              </div>
              <p className="mt-4 font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Analyzing your style...
              </p>
            </div>
          </div>
        )}

        {/* Capture Button */}
        {!hasCapture && cameraReady && (
          <div className="absolute bottom-24 left-0 right-0 flex justify-center">
            <Button
              size="lg"
              className="w-20 h-20 rounded-full gradient-primary shadow-glow"
              onClick={captureAndAnalyze}
            >
              <Camera className="w-8 h-8" />
            </Button>
          </div>
        )}

        {/* Suggestions Panel */}
        {suggestions.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl p-4 animate-slide-up">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Matching Products</h3>
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-4">
              {suggestions.map(product => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="shrink-0 w-32 bg-secondary rounded-lg overflow-hidden cursor-pointer card-hover"
                >
                  <div className="aspect-square">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-medium line-clamp-1">{product.name}</p>
                    <p className="text-xs text-primary font-bold">{formatPrice(product.price)}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setHasCapture(false);
                setSuggestions([]);
              }}
            >
              Scan Again
            </Button>
          </div>
        )}

        {/* Instructions */}
        {!hasCapture && cameraReady && (
          <div className="absolute bottom-44 left-0 right-0 text-center">
            <p className="text-background/80 text-sm">
              Point camera at any fashion item to find matching products
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraLens;
