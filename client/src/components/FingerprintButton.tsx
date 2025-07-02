import { Button } from "@/components/ui/button";
import { Fingerprint } from "lucide-react";
import CircuitBoard from "./CircuitBoard";

interface FingerprintButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}

// Custom fingerprint icon with circuit patterns - matches user's design
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
      
      {/* Cyan fingerprint ridges - matching user's icon design */}
      <g stroke="hsl(179, 100%, 50%)" fill="none" strokeWidth="1.8" filter="url(#fingerprint-glow)">
        {/* Outer fingerprint curves */}
        <path d="M 20 25 Q 30 10, 50 15 Q 70 20, 80 35 Q 85 50, 80 65 Q 70 80, 50 85 Q 30 90, 20 75 Q 15 50, 20 25" strokeWidth="1.5"/>
        <path d="M 25 30 Q 32 18, 48 22 Q 64 26, 72 38 Q 78 50, 72 62 Q 64 74, 48 78 Q 32 82, 25 70 Q 20 50, 25 30" strokeWidth="1.5"/>
        <path d="M 30 35 Q 36 25, 46 28 Q 56 31, 64 40 Q 70 50, 64 60 Q 56 69, 46 72 Q 36 75, 30 65 Q 25 50, 30 35" strokeWidth="1.5"/>
        <path d="M 35 40 Q 40 32, 48 34 Q 56 36, 62 42 Q 66 50, 62 58 Q 56 64, 48 66 Q 40 68, 35 60 Q 32 50, 35 40" strokeWidth="1.5"/>
        <path d="M 40 45 Q 44 39, 50 40 Q 56 41, 60 45 Q 62 50, 60 55 Q 56 59, 50 60 Q 44 61, 40 55 Q 38 50, 40 45" strokeWidth="1.5"/>
        
        {/* Inner fingerprint curves */}
        <path d="M 42 47 Q 45 44, 50 45 Q 55 46, 58 49 Q 59 52, 58 55 Q 55 58, 50 59 Q 45 60, 42 57 Q 41 52, 42 47" strokeWidth="1.5"/>
        <path d="M 44 49 Q 46 47, 50 48 Q 54 49, 56 51 Q 57 53, 56 55 Q 54 57, 50 58 Q 46 59, 44 57 Q 43 53, 44 49" strokeWidth="1.5"/>
        
        {/* Additional curved ridges */}
        <path d="M 15 20 Q 35 5, 60 12 Q 85 19, 90 45" strokeWidth="1.2"/>
        <path d="M 10 50 Q 20 30, 40 35 Q 60 40, 85 60" strokeWidth="1.2"/>
        <path d="M 20 85 Q 40 80, 60 83 Q 80 86, 90 75" strokeWidth="1.2"/>
        <path d="M 12 35 Q 25 25, 45 30 Q 65 35, 88 55" strokeWidth="1"/>
        <path d="M 18 75 Q 35 70, 55 73 Q 75 76, 85 68" strokeWidth="1"/>
      </g>
      
      {/* Orange circuit patterns - positioned on right side */}
      <g stroke="hsl(20, 100%, 55%)" fill="hsl(20, 100%, 55%)" strokeWidth="2.5" filter="url(#fingerprint-glow)">
        {/* Circuit nodes */}
        <circle cx="70" cy="35" r="3.5" strokeWidth="1.5"/>
        <circle cx="78" cy="48" r="3" strokeWidth="1.5"/>
        <circle cx="72" cy="62" r="2.5" strokeWidth="1.5"/>
        <circle cx="65" cy="72" r="3" strokeWidth="1.5"/>
        
        {/* Main circuit path */}
        <path d="M 70 35 L 78 48 L 72 62 L 65 72" stroke="hsl(20, 100%, 55%)" strokeWidth="2.5" fill="none"/>
        
        {/* Branch circuits */}
        <path d="M 78 48 L 85 52 L 88 58" stroke="hsl(20, 100%, 55%)" strokeWidth="2" fill="none"/>
        <path d="M 72 62 L 80 67 L 84 73" stroke="hsl(20, 100%, 55%)" strokeWidth="2" fill="none"/>
        <path d="M 65 72 L 60 78 L 55 82" stroke="hsl(20, 100%, 55%)" strokeWidth="2" fill="none"/>
        
        {/* Circuit connection details */}
        <rect x="68" y="33" width="4" height="4" rx="1" strokeWidth="1"/>
        <rect x="76" y="46" width="4" height="4" rx="1" strokeWidth="1"/>
        <rect x="70" y="60" width="4" height="4" rx="1" strokeWidth="1"/>
        <rect x="63" y="70" width="4" height="4" rx="1" strokeWidth="1"/>
        
        {/* Small connection dots */}
        <circle cx="83" cy="54" r="1.5"/>
        <circle cx="77" cy="69" r="1.5"/>
        <circle cx="62" cy="76" r="1.5"/>
        <circle cx="87" cy="60" r="1"/>
        <circle cx="81" cy="75" r="1"/>
      </g>
      
      {/* Scanning animation lines when loading */}
      {isLoading && (
        <g>
          <line
            x1="0"
            y1="25"
            x2="100"
            y2="25"
            stroke="hsl(179, 100%, 50%)"
            strokeWidth="1"
            opacity="0.6"
          >
            <animate
              attributeName="y1"
              values="25;75;25"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y2"
              values="25;75;25"
              dur="2s"
              repeatCount="indefinite"
            />
          </line>
        </g>
      )}
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
          className={`w-20 h-20 text-cyan-400 ${isLoading ? 'animate-spin' : 'animate-fingerprint-scan'}`}
          isLoading={isLoading}
        />
      </Button>
    </div>
  );
}
