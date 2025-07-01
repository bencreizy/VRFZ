interface BackgroundVideoProps {
  className?: string;
  showLogo?: boolean;
}

export default function BackgroundVideo({ className = "", showLogo = false }: BackgroundVideoProps) {
  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      {/* Circuit board background using SVG - guaranteed to be visible */}
      <div className="w-full h-full bg-black relative">
        <svg 
          className="absolute inset-0 w-full h-full"
          style={{ background: 'black' }}
        >
          <defs>
            <pattern id="circuitGrid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <rect width="50" height="50" fill="black"/>
              <path d="M0 25 L50 25 M25 0 L25 50" stroke="#06b6d4" strokeWidth="1" opacity="0.3"/>
              <circle cx="25" cy="25" r="2" fill="#06b6d4" opacity="0.4"/>
            </pattern>
            
            <pattern id="circuitLines" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="url(#circuitGrid)"/>
              <path d="M0 50 L100 50 M50 0 L50 100" stroke="#06b6d4" strokeWidth="2" opacity="0.2"/>
              <path d="M0 25 L50 25 L50 75 L100 75" stroke="#06b6d4" strokeWidth="1.5" opacity="0.25"/>
              <path d="M25 0 L25 50 L75 50 L75 100" stroke="#06b6d4" strokeWidth="1.5" opacity="0.25"/>
            </pattern>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#circuitLines)"/>
        </svg>
        
        {/* Bright pulsing circuit nodes */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute top-3/4 left-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 left-2/3 w-3 h-3 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-1/6 right-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-1/6 left-1/6 w-3 h-3 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '2.5s'}}></div>
          <div className="absolute top-2/3 right-1/6 w-3 h-3 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
        </div>
      </div>
    </div>
  );
}
