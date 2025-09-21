
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import FingerprintButton from "@/components/FingerprintButton";
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [location, setLocation] = useLocation();
  const [showLanding, setShowLanding] = useState(true);
  const [showArrowAndText, setShowArrowAndText] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const verifyMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/verify", {
        location: "Home Page Verification",
        method: "fingerprint"
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Verification Successful!",
        description: `You earned ${data.reward} VFZ tokens`,
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard"] });
    },
    onError: () => {
      toast({
        title: "Verification Failed",
        description: "Please try again",
        variant: "destructive",
        duration: 3000,
      });
    },
  });

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('verifyz-visited');
    
    if (hasVisited) {
      // User has visited before - skip landing and show main page
      setShowLanding(false);
    } else {
      // First-time visitor - show arrow and text after 1 second
      const timer = setTimeout(() => {
        setShowArrowAndText(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleFingerprintScan = () => {
    if (showLanding) {
      // Mark as visited
      localStorage.setItem('verifyz-visited', 'true');
      
      // Start fade out animation
      setFadeOut(true);
      
      // Wait for fade out to complete, then navigate to dashboard
      setTimeout(() => {
        setLocation('/dashboard');
      }, 600); // Slightly longer to ensure fade completes
    } else {
      // Normal verification
      verifyMutation.mutate();
    }
  };

  if (showLanding) {
    return (
      <div 
        className={`fixed inset-0 bg-black flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
          fadeOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
        style={{ zIndex: 9999 }}
      >
        {/* Fingerprint Button without styling */}
        <div className="relative mb-8">
          <FingerprintButton 
            onClick={handleFingerprintScan} 
            isLoading={verifyMutation.isPending}
          />
        </div>
        
        {/* Arrow and Text - fade in after 1 second */}
        <div 
          className={`flex flex-col items-center transition-opacity duration-700 ${
            showArrowAndText ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Bouncing Arrow */}
          <ChevronUp 
            className="text-cyan-400 w-8 h-8 mb-4 animate-bounce-gentle" 
          />
          
          {/* Touch to Verifyz Text */}
          <p className="text-cyan-400 text-xl font-medium tracking-wide">
            Touch to Verifyz
          </p>
        </div>
      </div>
    );
  }

  // Main homepage content (original content)
  return (
    <div className="relative">
      {/* Home Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        
        {/* Content */}
        <div className="relative z-10 text-center animate-slide-up px-6 max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent leading-tight">
              VeriFyz Protocol
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-light tracking-wide mb-8">
              Proof of Presence — Privacy First
            </p>
          </div>
          
          {/* Fingerprint Button */}
          <div className="mb-16">
            <FingerprintButton 
              onClick={handleFingerprintScan} 
              isLoading={verifyMutation.isPending}
            />
            <p className="mt-6 text-cyan-400 font-medium text-lg">Touch to Verify Presence</p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400">12,847</div>
              <div className="text-gray-400 text-sm md:text-base">Verifications</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400">3,521</div>
              <div className="text-gray-400 text-sm md:text-base">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400">$89,432</div>
              <div className="text-gray-400 text-sm md:text-base">Rewards Paid</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
