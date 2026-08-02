import React from 'react';

interface EmblemProps {
  size?: number;
  variant?: 'bd_crest' | 'golden_seal' | 'green_seal' | 'monochrome';
  className?: string;
}

export const GovernmentEmblem: React.FC<EmblemProps> = ({
  size = 64,
  variant = 'bd_crest',
  className = '',
}) => {
  // Official Govt Emblem Colors
  const isGold = variant === 'golden_seal';
  const isGreen = variant === 'green_seal';
  const isMono = variant === 'monochrome';

  const primaryRed = isGold ? '#b45309' : isGreen ? '#15803d' : isMono ? '#1e293b' : '#dc2626';
  const primaryGreen = isGold ? '#d97706' : isGreen ? '#166534' : isMono ? '#334155' : '#006a4e';
  const goldAccent = isMono ? '#475569' : '#eab308';

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          maxWidth: `${size}px`,
          maxHeight: `${size}px`,
          minWidth: `${size}px`,
          minHeight: `${size}px`,
          display: 'block',
        }}
      >
        {/* Outer Circle Ring */}
        <circle cx="100" cy="100" r="94" fill={primaryGreen} />
        <circle cx="100" cy="100" r="88" fill="#ffffff" stroke={goldAccent} strokeWidth="2" />
        <circle cx="100" cy="100" r="76" fill={primaryRed} />

        {/* Central Water Lily (Shapla) */}
        {/* Central Lily Petal */}
        <path
          d="M100 52 C94 72, 88 90, 100 112 C112 90, 106 72, 100 52 Z"
          fill="#ffffff"
          stroke={goldAccent}
          strokeWidth="1.5"
        />
        {/* Left Inner Petal */}
        <path
          d="M100 112 C82 98, 72 82, 78 68 C88 80, 94 98, 100 112 Z"
          fill="#ffffff"
          stroke={goldAccent}
          strokeWidth="1.5"
        />
        {/* Right Inner Petal */}
        <path
          d="M100 112 C118 98, 128 82, 122 68 C112 80, 106 98, 100 112 Z"
          fill="#ffffff"
          stroke={goldAccent}
          strokeWidth="1.5"
        />
        {/* Outer Left Petal */}
        <path
          d="M100 112 C68 108, 56 94, 62 82 C74 92, 88 104, 100 112 Z"
          fill="#ffffff"
          stroke={goldAccent}
          strokeWidth="1.5"
        />
        {/* Outer Right Petal */}
        <path
          d="M100 112 C132 108, 144 94, 138 82 C126 92, 112 104, 100 112 Z"
          fill="#ffffff"
          stroke={goldAccent}
          strokeWidth="1.5"
        />

        {/* Base Water Waves */}
        <path
          d="M60 128 C80 122, 120 122, 140 128 C125 136, 75 136, 60 128 Z"
          fill="#ffffff"
          opacity="0.9"
        />
        <path
          d="M68 134 C85 130, 115 130, 132 134 C120 140, 80 140, 68 134 Z"
          fill={goldAccent}
        />

        {/* Rice Sheaves Framing (Paddy Grains) */}
        <path
          d="M50 115 C44 92, 52 68, 70 55 C65 68, 62 88, 68 108"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M150 115 C156 92, 148 68, 130 55 C135 68, 138 88, 132 108"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Jute Leaves at Top */}
        <path
          d="M90 48 C94 40, 98 34, 100 30 C102 34, 106 40, 110 48 M100 30 L100 48"
          stroke={goldAccent}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* 4 Stars (2 Left, 2 Right) representing National Principles */}
        <g fill={goldAccent}>
          {/* Star 1 - Far Left */}
          <polygon points="76,146 78,150 82,150 79,153 80,157 76,154 72,157 73,153 70,150 74,150" />
          {/* Star 2 - Left Inner */}
          <polygon points="89,150 91,154 95,154 92,157 93,161 89,158 85,161 86,157 83,154 87,154" />
          {/* Star 3 - Right Inner */}
          <polygon points="111,150 113,154 117,154 114,157 115,161 111,158 107,161 108,157 105,154 109,154" />
          {/* Star 4 - Far Right */}
          <polygon points="124,146 126,150 130,150 127,153 128,157 124,154 120,157 121,153 118,150 122,150" />
        </g>
      </svg>
    </div>
  );
};
