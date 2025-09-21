
import React from 'react';

interface BackgroundVideoProps {
  showLogo?: boolean;
  className?: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ showLogo = false, className = "" }) => {
  return (
    <div className={`fixed inset-0 z-[-1] ${className}`} style={{ width: '100vw', height: '100vh' }}>
      {/* Circuit board background */}
      <img 
        src="/attached_assets/file_000000001a7c6243b5d6a0a353ce6708_1758424894098.png"
        alt="Circuit board background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          animation: 'zoom-animation 8s ease-in-out infinite',
          filter: 'brightness(0.8) contrast(1.1)'
        }}
        onLoad={() => console.log('✅ Circuit board image loaded successfully')}
        onError={(e) => {
          console.error('❌ Failed to load circuit board image:', e);
          console.log('Attempted path: /attached_assets/file_000000001a7c6243b5d6a0a353ce6708_1758424894098.png');
        }}
      />

      {/* Subtle overlay for content readability */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
};

export default BackgroundVideo;
