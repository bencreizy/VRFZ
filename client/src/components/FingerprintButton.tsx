import { Button } from "@/components/ui/button";
import CircuitBoard from "./CircuitBoard";

interface FingerprintButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}

// Complete realistic fingerprint icon
function CompleteFingerprint({ className = "", isLoading = false }: { className?: string; isLoading?: boolean }) {
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
      
      {/* Complete outer fingerprint ridges - full oval shape */}
      <ellipse
        cx="50"
        cy="50"
        rx="35"
        ry="40"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        filter="url(#fingerprint-glow)"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="30"
        ry="35"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        filter="url(#fingerprint-glow)"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="25"
        ry="30"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        filter="url(#fingerprint-glow)"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="20"
        ry="25"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        filter="url(#fingerprint-glow)"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="15"
        ry="20"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        filter="url(#fingerprint-glow)"
      />
      
      {/* Inner core patterns */}
      <ellipse
        cx="50"
        cy="50"
        rx="10"
        ry="15"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        filter="url(#fingerprint-glow)"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="6"
        ry="10"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        filter="url(#fingerprint-glow)"
      />
      
      {/* Central whorl pattern */}
      <circle
        cx="50"
        cy="50"
        r="3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        filter="url(#fingerprint-glow)"
      />
      
      {/* Ridge details for realism */}
      <path
        d="M35 55 Q50 57, 65 55"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M30 65 Q50 67, 70 65"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M25 75 Q50 77, 75 75"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.8"
      />
      
      {/* Top ridge details */}
      <path
        d="M35 35 Q50 33, 65 35"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M30 25 Q50 23, 70 25"
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
    <div className="relative w-32 h-32">
      {/* Circuit board background - this replaces any fingerprint background */}
      <div className="absolute inset-0 rounded-full border-2 border-cyan-400 overflow-hidden animate-pulse-glow bg-black">
        <CircuitBoard className="absolute inset-0 opacity-80" />
        <div className="absolute inset-0 bg-black/20 rounded-full"></div>
      </div>
      
      {/* Clickable button overlay */}
      <Button
        onClick={onClick}
        disabled={isLoading}
        className="relative z-10 w-full h-full bg-transparent border-0 rounded-full p-6 hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300"
        style={{ background: 'none', backgroundImage: 'none' }}
      >
        {/* Complete fingerprint icon on top */}
        <CompleteFingerprint 
          className={`w-full h-full text-cyan-400 ${isLoading ? 'animate-spin' : 'animate-fingerprint-scan'}`}
          isLoading={isLoading}
        />
      </Button>
    </div>
  );
}
