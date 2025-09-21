
import React from 'react';

interface BackgroundVideoProps {
  showLogo?: boolean;
  className?: string;
}

export default function BackgroundVideo({ showLogo = false, className = "" }: BackgroundVideoProps) {
  return (
    <div className={`fixed inset-0 z-0 ${className}`}>
      {/* Circuit Board Background */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
              <defs>
                <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <g stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" fill="none">
                    <path d="M20 20 L80 20 L80 50 L50 50 L50 80 L80 80"/>
                    <path d="M20 80 L50 80 L50 50 L80 50"/>
                    <circle cx="20" cy="20" r="2" fill="#06b6d4"/>
                    <circle cx="80" cy="20" r="2" fill="#06b6d4"/>
                    <circle cx="80" cy="80" r="2" fill="#06b6d4"/>
                    <circle cx="20" cy="80" r="2" fill="#06b6d4"/>
                    <circle cx="50" cy="50" r="3" fill="#06b6d4" opacity="0.8"/>
                  </g>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit)"/>
            </svg>
          `)})`,
          backgroundSize: '200px 200px',
          animation: 'circuit-flow 20s linear infinite'
        }}
      />
      
      {/* Animated circuit traces */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            <linearGradient id="pulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent"/>
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="transparent"/>
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                values="-100 0;800 0;-100 0"
                dur="3s"
                repeatCount="indefinite"
              />
            </linearGradient>
          </defs>
          
          {/* Main circuit paths with pulsing animation */}
          <g stroke="rgba(6, 182, 212, 0.4)" strokeWidth="2" fill="none">
            <path d="M0 150 L200 150 L200 300 L400 300 L400 150 L600 150 L600 450 L800 450">
              <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="4s" repeatCount="indefinite"/>
            </path>
            <path d="M0 450 L150 450 L150 300 L350 300 L350 150 L500 150 L500 50 L800 50">
              <animate attributeName="stroke-opacity" values="0.8;0.2;0.8" dur="4s" repeatCount="indefinite"/>
            </path>
            <path d="M100 0 L100 200 L300 200 L300 400 L500 400 L500 600">
              <animate attributeName="stroke-opacity" values="0.4;0.9;0.4" dur="3s" repeatCount="indefinite"/>
            </path>
            <path d="M700 0 L700 250 L500 250 L500 100 L300 100 L300 500 L0 500">
              <animate attributeName="stroke-opacity" values="0.6;0.3;0.6" dur="5s" repeatCount="indefinite"/>
            </path>
          </g>
          
          {/* Circuit nodes */}
          <g>
            {[
              {x: 200, y: 150}, {x: 400, y: 300}, {x: 600, y: 150},
              {x: 150, y: 450}, {x: 350, y: 300}, {x: 500, y: 150},
              {x: 100, y: 200}, {x: 300, y: 200}, {x: 500, y: 400},
              {x: 700, y: 250}, {x: 500, y: 250}, {x: 300, y: 100}
            ].map((node, i) => (
              <g key={i}>
                <circle 
                  cx={node.x} 
                  cy={node.y} 
                  r="4" 
                  fill="#06b6d4" 
                  filter="url(#glow)"
                >
                  <animate 
                    attributeName="r" 
                    values="3;6;3" 
                    dur={`${2 + i * 0.3}s`} 
                    repeatCount="indefinite"
                  />
                  <animate 
                    attributeName="opacity" 
                    values="0.6;1;0.6" 
                    dur={`${2 + i * 0.3}s`} 
                    repeatCount="indefinite"
                  />
                </circle>
                <circle 
                  cx={node.x} 
                  cy={node.y} 
                  r="8" 
                  fill="none" 
                  stroke="#06b6d4" 
                  strokeWidth="1" 
                  opacity="0.4"
                >
                  <animate 
                    attributeName="r" 
                    values="8;12;8" 
                    dur={`${3 + i * 0.2}s`} 
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            ))}
          </g>
        </svg>
      </div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
      
      {/* Logo */}
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
}
