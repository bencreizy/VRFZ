import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import BackgroundVideo from "@/components/BackgroundVideo";
import FingerprintButton from "@/components/FingerprintButton";
import { Fingerprint, Users, TrendingUp, DollarSign } from "lucide-react";

export default function Home() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
      });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard"] });
    },
    onError: () => {
      toast({
        title: "Verification Failed",
        description: "Please try again",
        variant: "destructive",
      });
    },
  });

  const handleFingerprintScan = () => {
    verifyMutation.mutate();
  };

  return (
    <div className="relative">
      {/* Home Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <BackgroundVideo />
        
        {/* Content */}
        <div className="relative z-10 text-center animate-slide-up">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent">
              VeriFyz Protocol
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">
              Proof of Presence — Privacy First
            </p>
          </div>
          
          {/* Fingerprint Button */}
          <div className="mb-12">
            <FingerprintButton 
              onClick={handleFingerprintScan} 
              isLoading={verifyMutation.isPending}
            />
            <p className="mt-4 text-cyan-400 font-medium">Touch to Verify Presence</p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">12,847</div>
              <div className="text-gray-400">Verifications</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">3,521</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">$89,432</div>
              <div className="text-gray-400">Rewards Paid</div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-cyan-400 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
    </div>
  );
}
