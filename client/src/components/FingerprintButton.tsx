import { Button } from "@/components/ui/button";
import { Fingerprint } from "lucide-react";
import CircuitBoard from "./CircuitBoard";

interface FingerprintButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}

// Complete realistic fingerprint icon - properly centered and full
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
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Complete outer fingerprint ridges - full oval fingerprint */}
      <ellipse
        cx="50"
        cy="50"
        rx="38"
        ry="45"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        filter="url(#fingerprint-glow)"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="33"
        ry="40"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        filter="url(#fingerprint-glow)"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="28"
        ry="35"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        filter="url(#fingerprint-glow)"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="23"
        ry="30"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        filter="url(#fingerprint-glow)"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="18"
        ry="25"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        filter="url(#fingerprint-glow)"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="13"
        ry="20"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        filter="url(#fingerprint-glow)"
      />
      
      {/* Inner core patterns */}
      <ellipse
        cx="50"
        cy="50"
        rx="8"
        ry="15"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        filter="url(#fingerprint-glow)"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="4"
        ry="10"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        filter="url(#fingerprint-glow)"
      />
      
      {/* Central whorl pattern */}
      <circle
        cx="50"
        cy="50"
        r="2"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        filter="url(#fingerprint-glow)"
      />
      
      {/* Detailed ridge patterns for realism */}
      <path
        d="M30 60 Q50 62, 70 60"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M25 70 Q50 72, 75 70"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M20 80 Q50 82, 80 80"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.7"
      />
      
      {/* Top ridge details */}
      <path
        d="M30 40 Q50 38, 70 40"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M25 30 Q50 28, 75 30"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M20 20 Q50 18, 80 20"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.7"
      />
      
      {/* Side curve details */}
      <path
        d="M15 50 Q20 45, 15 40"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M85 50 Q80 45, 85 40"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}

export default function FingerprintButton({ onClick, isLoading = false, className = "" }: FingerprintButtonProps) {
  return (
    <div className="relative w-32 h-32 mx-auto">
      {/* Circuit board background - this replaces the fingerprint background */}
      <div className="absolute inset-0 rounded-full border-2 border-cyan-400 overflow-hidden animate-pulse-glow bg-black">
        <CircuitBoard className="absolute inset-0 opacity-100" />
        <div className="absolute inset-0 bg-black/10 rounded-full"></div>
      </div>
      
      {/* Clickable button overlay */}
      <Button
        onClick={onClick}
        disabled={isLoading}
        className="fingerprint-button relative z-10 w-full h-full bg-transparent border-0 rounded-full p-2 transition-all duration-300 flex items-center justify-center"
        style={{ background: 'none', backgroundImage: 'none' }}
      >
        {/* Custom fingerprint icon with circuit patterns */}
        <CompleteFingerprint 
          className={`w-16 h-16 text-cyan-400 ${isLoading ? 'animate-spin' : 'animate-fingerprint-scan'}`}
          isLoading={isLoading}
        />
      </Button>
    </div>
  );
}
