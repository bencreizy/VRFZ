interface BackgroundVideoProps {
  className?: string;
  showLogo?: boolean;
}

export default function BackgroundVideo({ className = "", showLogo = false }: BackgroundVideoProps) {
  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      {/* Pure circuit board background - NO IMAGES */}
      <div className="w-full h-full bg-black relative" style={{ background: 'black', backgroundImage: 'none' }}>
        {/* Circuit board grid pattern - more visible */}
        <div 
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px),
              linear-gradient(45deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px, 50px 50px, 100px 100px, 100px 100px'
          }}
        ></div>
        
        {/* Circuit nodes pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 left-2/3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-1/6 right-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>
        
        {/* Glow effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-cyan-400/3 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
