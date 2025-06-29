import { Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FingerprintButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}

export default function FingerprintButton({ onClick, isLoading = false, className = "" }: FingerprintButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className={`fingerprint-button bg-transparent border-2 border-cyan-400 rounded-full p-8 animate-pulse-glow hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 ${className}`}
    >
      <Fingerprint 
        className={`text-6xl text-cyan-400 ${isLoading ? 'animate-spin' : 'animate-fingerprint-scan'}`} 
        size={64}
      />
    </Button>
  );
}
