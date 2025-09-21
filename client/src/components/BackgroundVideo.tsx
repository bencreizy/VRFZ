
import React from 'react';

interface BackgroundVideoProps {
  showLogo?: boolean;
  className?: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ showLogo = false, className = "" }) => {
  return (
    <div className={`fixed inset-0 z-[-1] ${className}`}>
      {/* Circuit board background */}
      <img 
        src="/attached_assets/file_000000001a7c6243b5d6a0a353ce6708_1758424894098.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          animation: 'zoom-animation 10s ease-in-out infinite'
        }}
      />

      {/* Very subtle overlay to maintain readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Logo - only show when explicitly requested */}
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
};

export default BackgroundVideo;
