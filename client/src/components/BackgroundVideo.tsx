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
        height: '100vh'
      }}
    >
      {/* Subtle overlay for content readability */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
};

export default BackgroundVideo;