
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
      {/* Circuit board background - Debug Mode */}
      <img 
        src="/attached_assets/file_000000001a7c6243b5d6a0a353ce6708_1758424894098.png"
        alt="Circuit board background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: 'none', // No filters during debugging
          border: '2px solid red' // Temporary visual debug border
        }}
        onLoad={(e) => {
          const img = e.target as HTMLImageElement;
          console.log('✅ SUCCESS: Circuit board image loaded!');
          console.log('📏 Image details:', {
            src: img.src,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            displayWidth: img.offsetWidth,
            displayHeight: img.offsetHeight
          });
          // Remove debug border on successful load
          img.style.border = 'none';
        }}
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          console.error('❌ FAILED: Circuit board image failed to load');
          console.log('🔍 Debug info:', {
            attemptedSrc: img.src,
            currentURL: window.location.href,
            basePath: window.location.origin
          });
          
          // Try the @assets alias path
          console.log('🔄 Trying @assets alias path...');
          img.src = '@assets/file_000000001a7c6243b5d6a0a353ce6708_1758424894098.png';
        }}
      />

      {/* Subtle overlay for content readability */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
};

export default BackgroundVideo;
