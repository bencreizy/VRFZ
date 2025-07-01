import { Button } from "@/components/ui/button";
import CircuitBoard from "./CircuitBoard";

interface FingerprintButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}

// Clean fingerprint scanner interface
function FingerprintScanner({ className = "", isLoading = false }: { className?: string; isLoading?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="scanner-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Scanner outline */}
      <circle
        cx="50"
        cy="50"
        r="35"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        filter="url(#scanner-glow)"
      />
      
      {/* Scanner grid lines */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.6">
        <line x1="30" y1="30" x2="70" y2="30" />
        <line x1="30" y1="40" x2="70" y2="40" />
        <line x1="30" y1="50" x2="70" y2="50" />
        <line x1="30" y1="60" x2="70" y2="60" />
        <line x1="30" y1="70" x2="70" y2="70" />
        
        <line x1="30" y1="30" x2="30" y2="70" />
        <line x1="40" y1="30" x2="40" y2="70" />
        <line x1="50" y1="30" x2="50" y2="70" />
        <line x1="60" y1="30" x2="60" y2="70" />
        <line x1="70" y1="30" x2="70" y2="70" />
      </g>
      
      {/* Scanner center crosshair */}
      <g stroke="currentColor" strokeWidth="2" filter="url(#scanner-glow)">
        <line x1="40" y1="50" x2="60" y2="50" />
        <line x1="50" y1="40" x2="50" y2="60" />
      </g>
      
      {/* Corner brackets */}
      <g stroke="currentColor" strokeWidth="2" fill="none" filter="url(#scanner-glow)">
        <path d="M25 35 L25 25 L35 25" />
        <path d="M65 25 L75 25 L75 35" />
        <path d="M75 65 L75 75 L65 75" />
        <path d="M35 75 L25 75 L25 65" />
      </g>
      
      {/* Scanning line effect when loading */}
      {isLoading && (
        <line
          x1="20"
          y1="50"
          x2="80"
          y2="50"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.8"
          filter="url(#scanner-glow)"
          className="animate-pulse"
        />
      )}
    </svg>
  );
}

export default function FingerprintButton({ onClick, isLoading = false, className = "" }: FingerprintButtonProps) {
  return (
    <div className="relative w-32 h-32">
      {/* Circuit board background - this replaces any fingerprint background */}
      <div className="absolute inset-0 rounded-full border-2 border-cyan-400 overflow-hidden animate-pulse-glow">
        <CircuitBoard className="absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-black/30 rounded-full"></div>
      </div>
      
      {/* Clickable button overlay */}
      <Button
        onClick={onClick}
        disabled={isLoading}
        className="relative z-10 w-full h-full bg-transparent border-0 rounded-full p-6 hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300"
      >
        {/* Clean fingerprint scanner interface on top */}
        <FingerprintScanner 
          className={`w-full h-full text-cyan-400 ${isLoading ? 'animate-spin' : 'animate-fingerprint-scan'}`}
          isLoading={isLoading}
        />
      </Button>
    </div>
  );
}
