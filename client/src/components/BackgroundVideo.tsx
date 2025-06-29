import logoBackground from "@assets/Logopit_1751223470962_1751223588785.png";

interface BackgroundVideoProps {
  className?: string;
}

export default function BackgroundVideo({ className = "" }: BackgroundVideoProps) {
  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      {/* VeriFyz Protocol logo background */}
      <div className="w-full h-full bg-black relative flex items-center justify-center">
        <img 
          src={logoBackground} 
          alt="VeriFyz Protocol" 
          className="w-full h-full object-contain opacity-30 max-w-2xl max-h-2xl"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        {/* Subtle glow effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
