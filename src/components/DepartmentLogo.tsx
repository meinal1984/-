import React from 'react';

interface DepartmentLogoProps {
  size?: number;
  variant?: 'bfa_logo' | 'dc_seal' | 'govt_crest' | 'none';
  className?: string;
}

export const DepartmentLogo: React.FC<DepartmentLogoProps> = ({
  size = 64,
  variant = 'bfa_logo',
  className = '',
}) => {
  if (variant === 'none') return null;

  if (variant === 'dc_seal') {
    return (
      <div className={`inline-flex flex-col items-center justify-center ${className}`}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
          <circle cx="60" cy="60" r="56" fill="#047857" />
          <circle cx="60" cy="60" r="50" fill="#ffffff" stroke="#eab308" strokeWidth="2" />
          <circle cx="60" cy="60" r="42" fill="#065f46" />
          <text x="60" y="52" textAnchor="middle" fill="#ffffff" fontSize="12" fontStyle="bold" fontFamily="sans-serif">
            জেলা প্রশাসন
          </text>
          <text x="60" y="70" textAnchor="middle" fill="#fef08a" fontSize="10" fontFamily="sans-serif">
            ঢাকা
          </text>
          <path d="M40 82 L80 82" stroke="#eab308" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  // Default: BFA Bangladesh Film Archive Logo (matching the uploaded image!)
  return (
    <div className={`inline-flex flex-col items-center justify-center text-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
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
        {/* Film Wheel Frame */}
        <circle cx="80" cy="50" r="42" fill="#1e293b" />
        <circle cx="80" cy="50" r="38" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />

        {/* Film Strip Cutouts / Apertures */}
        <path d="M80 50 L80 12 A38 38 0 0 1 113 31 Z" fill="#dc2626" />
        <path d="M80 50 L113 31 A38 38 0 0 1 113 69 Z" fill="#eab308" />
        <path d="M80 50 L113 69 A38 38 0 0 1 80 88 Z" fill="#2563eb" />

        <circle cx="80" cy="50" r="22" fill="#ffffff" />
        <circle cx="80" cy="50" r="16" fill="#0f172a" />

        {/* BFA Bold Acronym */}
        <text
          x="80"
          y="56"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="16"
          fontWeight="900"
          fontFamily="sans-serif"
          letterSpacing="1"
        >
          BFA
        </text>

        {/* Film Sprocket Perforations */}
        <rect x="42" y="46" width="6" height="8" rx="1" fill="#0f172a" />
        <rect x="112" y="46" width="6" height="8" rx="1" fill="#0f172a" />
      </svg>
      <span className="text-[10px] font-bold text-slate-900 tracking-tight leading-none mt-0.5">
        বাংলাদেশ ফিল্ম আর্কাইভ
      </span>
    </div>
  );
};
