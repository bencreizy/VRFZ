import { Button } from "@/components/ui/button";
import CircuitBoard from "./CircuitBoard";

interface FingerprintButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}

// Realistic fingerprint SVG component
function RealisticFingerprint({ className = "", isLoading = false }: { className?: string; isLoading?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="fingerprint-glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Outer fingerprint ridges */}
      <path
        d="M50 10 C70 10, 85 25, 85 45 C85 65, 70 80, 50 90 C30 80, 15 65, 15 45 C15 25, 30 10, 50 10"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        filter="url(#fingerprint-glow)"
      />
      <path
        d="M50 15 C65 15, 75 25, 75 40 C75 60, 65 75, 50 85 C35 75, 25 60, 25 40 C25 25, 35 15, 50 15"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        filter="url(#fingerprint-glow)"
      />
      <path
        d="M50 20 C60 20, 70 30, 70 45 C70 60, 60 70, 50 80 C40 70, 30 60, 30 45 C30 30, 40 20, 50 20"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        filter="url(#fingerprint-glow)"
      />
      <path
        d="M50 25 C57 25, 65 32, 65 45 C65 58, 57 65, 50 75 C43 65, 35 58, 35 45 C35 32, 43 25, 50 25"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        filter="url(#fingerprint-glow)"
      />
      <path
        d="M50 30 C55 30, 60 35, 60 45 C60 55, 55 60, 50 70 C45 60, 40 55, 40 45 C40 35, 45 30, 50 30"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        filter="url(#fingerprint-glow)"
      />
      
      {/* Inner core patterns */}
      <path
        d="M50 35 C52 35, 55 38, 55 45 C55 52, 52 55, 50 65 C48 55, 45 52, 45 45 C45 38, 48 35, 50 35"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        filter="url(#fingerprint-glow)"
      />
      
      {/* Central whorl pattern */}
      <circle
        cx="50"
        cy="45"
        r="3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        filter="url(#fingerprint-glow)"
      />
      <circle
        cx="50"
        cy="45"
        r="6"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.7"
        filter="url(#fingerprint-glow)"
      />
      
      {/* Ridge details for realism */}
      <path
        d="M45 50 Q50 52, 55 50"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M42 55 Q50 57, 58 55"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M40 60 Q50 62, 60 60"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.8"
      />
    </svg>
  );
}

export default function FingerprintButton({ onClick, isLoading = false, className = "" }: FingerprintButtonProps) {
  return (
    <div className="relative">
      <Button
        onClick={onClick}
        disabled={isLoading}
        className={`fingerprint-button relative bg-black/50 border-2 border-cyan-400 rounded-full p-8 animate-pulse-glow hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 overflow-hidden ${className}`}
      >
        {/* Circuit board background */}
        <CircuitBoard className="absolute inset-0 opacity-30" />
        
        {/* Fingerprint icon */}
        <RealisticFingerprint 
          className={`relative z-10 w-16 h-16 text-cyan-400 ${isLoading ? 'animate-spin' : 'animate-fingerprint-scan'}`}
          isLoading={isLoading}
        />
      </Button>
    </div>
  );
}
