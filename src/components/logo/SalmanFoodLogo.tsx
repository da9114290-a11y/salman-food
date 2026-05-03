/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SalmanFoodLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon';
  color?: 'default' | 'white';
  className?: string;
}

export const SalmanFoodLogo: React.FC<SalmanFoodLogoProps> = ({
  size = 'md',
  variant = 'full',
  color = 'default',
  className = '',
}) => {
  const sizes = {
    sm: { height: 32, box: '0 0 40 50' },
    md: { height: 48, box: '0 0 40 50' },
    lg: { height: 64, box: '0 0 40 50' },
    xl: { height: 96, box: '0 0 40 50' },
  };

  const currentSize = sizes[size];

  // Stylized flame mark with "SF" monogram
  const FlameIcon = (
    <svg
      viewBox="0 0 40 50"
      height={currentSize.height}
      className="inline-block fill-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Red Flame Base */}
      <path
        d="M20 50C30 50 40 40 40 25C40 10 20 0 20 0C20 0 0 10 0 25C0 40 10 50 20 50Z"
        fill="#D62300"
      />
      {/* Yellow Inner Highlight */}
      <path
        d="M20 42C26 42 32 36 32 25C32 15 20 8 20 8C20 8 8 15 8 25C8 36 14 42 20 42Z"
        fill="#FFC72C"
        opacity="0.8"
      />
      {/* SF Monogram */}
      <text
        x="50%"
        y="60%"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="bold"
        fontFamily="Oswald, sans-serif"
      >
        SF
      </text>
    </svg>
  );

  if (variant === 'icon') {
    return <div className={className}>{FlameIcon}</div>;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {FlameIcon}
      <div className="flex flex-col leading-none">
        <span className={`${color === 'white' ? 'text-white' : 'text-brand-red'} font-heading font-bold uppercase tracking-[0.15em] text-xl md:text-2xl`}>
          Salman
        </span>
        <span className="text-brand-yellow font-heading font-semibold uppercase tracking-[0.2em] text-xs md:text-sm">
          Food
        </span>
      </div>
    </div>
  );
};
