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
      
      {/* Cyan fingerprint ridges - exact match to user's design */}
      <g stroke="hsl(179, 100%, 50%)" fill="none" strokeWidth="1.6" filter="url(#fingerprint-glow)">
        {/* Outer curved ridges following natural fingerprint pattern */}
        <path d="M 10 15 C 15 8, 30 5, 45 8 C 60 11, 75 18, 82 30 C 88 42, 88 58, 82 70 C 75 82, 60 89, 45 92 C 30 95, 15 92, 10 85 C 5 78, 5 62, 10 50 C 5 38, 5 22, 10 15" strokeWidth="1.4"/>
        
        <path d="M 15 18 C 20 12, 32 10, 45 12 C 58 14, 70 20, 76 30 C 82 40, 82 54, 76 64 C 70 74, 58 80, 45 82 C 32 84, 20 82, 15 76 C 10 70, 10 56, 15 46 C 10 36, 10 26, 15 18" strokeWidth="1.4"/>
        
        <path d="M 20 22 C 24 17, 34 15, 45 17 C 56 19, 66 24, 71 32 C 76 40, 76 52, 71 60 C 66 68, 56 73, 45 75 C 34 77, 24 75, 20 70 C 16 65, 16 53, 20 45 C 16 37, 16 29, 20 22" strokeWidth="1.4"/>
        
        <path d="M 25 26 C 28 22, 36 20, 45 22 C 54 24, 61 28, 65 34 C 69 40, 69 50, 65 56 C 61 62, 54 66, 45 68 C 36 70, 28 68, 25 64 C 22 60, 22 52, 25 46 C 22 40, 22 32, 25 26" strokeWidth="1.4"/>
        
        <path d="M 30 30 C 32 27, 38 25, 45 27 C 52 29, 57 32, 60 36 C 63 40, 63 48, 60 52 C 57 56, 52 59, 45 61 C 38 63, 32 61, 30 58 C 28 55, 28 49, 30 45 C 28 41, 28 35, 30 30" strokeWidth="1.4"/>
        
        <path d="M 35 34 C 36 32, 40 30, 45 32 C 50 34, 53 36, 55 39 C 57 42, 57 46, 55 49 C 53 52, 50 54, 45 56 C 40 58, 36 56, 35 54 C 34 52, 34 48, 35 45 C 34 42, 34 38, 35 34" strokeWidth="1.4"/>
        
        <path d="M 38 37 C 39 36, 42 35, 45 36 C 48 37, 50 38, 51 40 C 52 42, 52 44, 51 46 C 50 48, 48 49, 45 50 C 42 51, 39 50, 38 49 C 37 48, 37 46, 38 44 C 37 42, 37 39, 38 37" strokeWidth="1.4"/>
        
        {/* Additional ridge details */}
        <path d="M 8 50 C 12 35, 25 25, 40 28 C 55 31, 68 38, 75 50" strokeWidth="1.2"/>
        <path d="M 75 50 C 68 62, 55 69, 40 72 C 25 75, 12 65, 8 50" strokeWidth="1.2"/>
        <path d="M 12 25 C 20 15, 35 12, 50 15 C 65 18, 78 25, 85 35" strokeWidth="1"/>
        <path d="M 85 65 C 78 75, 65 82, 50 85 C 35 88, 20 85, 12 75" strokeWidth="1"/>
      </g>
      
      {/* Orange circuit patterns - positioned exactly like user's design */}
      <g stroke="hsl(20, 100%, 55%)" fill="hsl(20, 100%, 55%)" strokeWidth="2.2" filter="url(#fingerprint-glow)">
        {/* Main circuit nodes with holes */}
        <circle cx="68" cy="40" r="4" fill="none" strokeWidth="2.5"/>
        <circle cx="68" cy="40" r="1.8" fill="hsl(20, 100%, 55%)"/>
        
        <circle cx="72" cy="55" r="3.5" fill="none" strokeWidth="2.2"/>
        <circle cx="72" cy="55" r="1.5" fill="hsl(20, 100%, 55%)"/>
        
        <circle cx="65" cy="68" r="3.8" fill="none" strokeWidth="2.4"/>
        <circle cx="65" cy="68" r="1.6" fill="hsl(20, 100%, 55%)"/>
        
        {/* Main circuit connecting lines */}
        <path d="M 68 44 L 70 50 L 72 51" stroke="hsl(20, 100%, 55%)" strokeWidth="2.5" fill="none"/>
        <path d="M 72 59 L 69 63 L 65 64" stroke="hsl(20, 100%, 55%)" strokeWidth="2.5" fill="none"/>
        
        {/* Branch circuit paths */}
        <path d="M 72 40 L 78 42 L 82 46" stroke="hsl(20, 100%, 55%)" strokeWidth="2" fill="none"/>
        <path d="M 76 55 L 80 58 L 84 62" stroke="hsl(20, 100%, 55%)" strokeWidth="2" fill="none"/>
        <path d="M 61 68 L 58 72 L 54 75" stroke="hsl(20, 100%, 55%)" strokeWidth="2" fill="none"/>
        
        {/* Small connection elements */}
        <circle cx="78" cy="42" r="1.2"/>
        <circle cx="80" cy="58" r="1"/>
        <circle cx="58" cy="72" r="1.2"/>
        <circle cx="82" cy="46" r="0.8"/>
        <circle cx="84" cy="62" r="0.8"/>
        <circle cx="54" cy="75" r="0.8"/>
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
          className={`w-28 h-28 text-cyan-400 ${isLoading ? 'animate-spin' : 'animate-fingerprint-scan'}`}
          isLoading={isLoading}
        />
      </Button>
    </div>
  );
}
