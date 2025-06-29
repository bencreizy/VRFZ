interface BackgroundVideoProps {
  className?: string;
}

export default function BackgroundVideo({ className = "" }: BackgroundVideoProps) {
  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      {/* Cyberpunk city skyline background */}
      <div className="w-full h-full bg-gradient-to-br from-black via-gray-900 to-black relative">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-r from-cyan-400/10 via-transparent to-cyan-400/10"></div>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-cyan-400/3 rounded-full blur-3xl"></div>
        </div>
        {/* Video overlay */}
        <div className="absolute inset-0 video-overlay"></div>
      </div>
      
      {/* TODO: Replace with actual video background when video file is available */}
      {/* 
      <video autoPlay loop muted playsInline className="w-full h-full object-cover">
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> 
      */}
    </div>
  );
}
