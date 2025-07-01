import { useEffect, useState } from 'react';

interface CircuitNode {
  id: number;
  x: number;
  y: number;
  active: boolean;
}

interface CircuitBoardProps {
  className?: string;
}

export default function CircuitBoard({ className = "" }: CircuitBoardProps) {
  const [nodes, setNodes] = useState<CircuitNode[]>([]);

  useEffect(() => {
    // Generate random circuit nodes
    const generateNodes = () => {
      const newNodes: CircuitNode[] = [];
      for (let i = 0; i < 20; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          active: Math.random() > 0.7,
        });
      }
      setNodes(newNodes);
    };

    generateNodes();

    // Animate nodes randomly
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        active: Math.random() > 0.6,
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Circuit paths */}
        <defs>
          <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M0 10 L20 10 M10 0 L10 20"
              stroke="rgba(6, 182, 212, 0.3)"
              strokeWidth="0.5"
              fill="none"
            />
          </pattern>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background circuit pattern */}
        <rect width="100%" height="100%" fill="url(#circuit)" opacity="0.4" />

        {/* Main circuit lines */}
        <g stroke="rgba(6, 182, 212, 0.5)" strokeWidth="1" fill="none">
          <path d="M20 50 L80 50 L80 100 L160 100" />
          <path d="M20 150 L60 150 L60 100 L120 100 L120 50 L180 50" />
          <path d="M50 20 L50 80 L100 80 L100 180" />
          <path d="M150 20 L150 60 L100 60 L100 120 L180 120" />
        </g>

        {/* Circuit nodes with pulsing animation */}
        {nodes.map(node => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="2"
              fill={node.active ? "#06b6d4" : "rgba(6, 182, 212, 0.3)"}
              filter={node.active ? "url(#glow)" : "none"}
              className={node.active ? "animate-pulse" : ""}
            />
            {node.active && (
              <circle
                cx={node.x}
                cy={node.y}
                r="4"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="0.5"
                opacity="0.6"
                className="animate-ping"
              />
            )}
          </g>
        ))}

        {/* Corner connection nodes */}
        <circle cx="20" cy="20" r="3" fill="#06b6d4" filter="url(#glow)" />
        <circle cx="180" cy="20" r="3" fill="#06b6d4" filter="url(#glow)" />
        <circle cx="20" cy="180" r="3" fill="#06b6d4" filter="url(#glow)" />
        <circle cx="180" cy="180" r="3" fill="#06b6d4" filter="url(#glow)" />

        {/* Central processing unit representation */}
        <rect
          x="90"
          y="90"
          width="20"
          height="20"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="1"
          filter="url(#glow)"
          className="animate-pulse"
        />
        <rect
          x="92"
          y="92"
          width="16"
          height="16"
          fill="rgba(6, 182, 212, 0.1)"
        />
      </svg>
    </div>
  );
}