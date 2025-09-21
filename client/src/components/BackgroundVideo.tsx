
import React from 'react';

interface BackgroundVideoProps {
  showLogo?: boolean;
  className?: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ showLogo = false, className = "" }) => {
  return (
    <div 
      className={`fixed inset-0 z-[-1] ${className}`} 
      style={{ 
        width: '100vw', 
        height: '100vh',
        backgroundColor: 'black' // Fallback background
      }}
    >
      {/* Circuit board background */}
      <img 
        src="/attached_assets/file_000000001a7c6243b5d6a0a353ce6708_1758424894098.png"
        alt="Circuit board background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          // Temporarily disable animation and filters to test
          // animation: 'zoom-animation 8s ease-in-out infinite',
          // filter: 'brightness(0.8) contrast(1.1)'
          filter: 'none'
        }}
        onLoad={() => {
          console.log('✅ Circuit board image loaded successfully');
          console.log('Image dimensions and properties:', {
            naturalWidth: (document.querySelector('img[alt="Circuit board background"]') as HTMLImageElement)?.naturalWidth,
            naturalHeight: (document.querySelector('img[alt="Circuit board background"]') as HTMLImageElement)?.naturalHeight
          });
        }}
        onError={(e) => {
          console.error('❌ Failed to load circuit board image:', e);
          console.log('Attempted path: /attached_assets/file_000000001a7c6243b5d6a0a353ce6708_1758424894098.png');
          console.log('Trying alternative path...');
          // Fallback to test image
          (e.target as HTMLImageElement).src = "https://upload.wikimedia.org/wikipedia/commons/9/96/Electronic_Frontier_Foundation_video_conferencing_background_circuit-1_%2828343179979%29.png";
        }}
      />

      {/* Subtle overlay for content readability */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
};

export default BackgroundVideo;
