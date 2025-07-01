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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <BackgroundVideo showLogo={true} />
        
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
