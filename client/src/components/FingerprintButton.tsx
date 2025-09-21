import { useState } from "react";
import { Button } from "@/components/ui/button";
import fingerprintIcon from "../assets/fingerprint-icon.png";

interface FingerprintButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}



export default function FingerprintButton({ onClick, isLoading = false, className = "" }: FingerprintButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPressed(true);
  };

  const handlePressEnd = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPressed(false);
    onClick();
  };

  return (
    <div className="relative w-32 h-32 mx-auto">
      {/* Clickable button - no background styling for landing page */}
      <Button
        disabled={isLoading}
        className="fingerprint-button relative z-10 w-full h-full bg-transparent border-0 rounded-full p-2 flex items-center justify-center cursor-pointer"
        style={{ background: 'none', backgroundImage: 'none' }}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
      >
        {/* Custom fingerprint icon - using your actual image */}
        <img 
          src={fingerprintIcon}
          alt="Fingerprint Scanner"
          className={`transition-transform duration-150 ${
            isPressed ? 'scale-90' : 'scale-100'
          } ${isLoading ? 'animate-pulse' : ''}`}
          style={{ width: '110px', height: '110px' }}
        />
      </Button>
    </div>
  );
}
