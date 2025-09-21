import React from 'react';

interface BackgroundVideoProps {
  showLogo?: boolean;
  className?: string;
}

export default function BackgroundVideo({ showLogo = false, className = "" }: BackgroundVideoProps) {
  return (
    <div className={`fixed inset-0 z-[-1] ${className}`}>
      {/* Background Image with Animation */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/attached_assets/file_000000001a7c6243b5d6a0a353ce6708_1758424546605.png')`,
          animation: 'zoom-animation 10s ease-in-out infinite'
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/50" />

      {/* Logo */}
      {showLogo && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="text-6xl md:text-8xl font-bold text-center">
            <div className="bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-clip-text text-transparent">
              VFZ
            </div>
          </div>
        </div>
      )}
    </div>
  );
}