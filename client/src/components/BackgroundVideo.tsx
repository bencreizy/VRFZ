
import React from 'react';

interface BackgroundVideoProps {
  showLogo?: boolean;
  className?: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ showLogo = false, className = "" }) => {
  return (
    <div className={`fixed inset-0 z-[-1] ${className}`} style={{ width: '100vw', height: '100vh' }}>
      {/* Circuit board background - only this image */}
      <img 
        src="/attached_assets/file_000000001a7c6243b5d6a0a353ce6708_1758424894098.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          animation: 'zoom-animation 8s ease-in-out infinite'
        }}
        onLoad={() => console.log('Circuit board image loaded successfully')}
        onError={(e) => console.error('Failed to load circuit board image:', e)}
      />

      {/* Subtle overlay for content readability */}
      <div className="absolute inset-0 bg-black/15" />
    </div>
  );
};

export default BackgroundVideo;
