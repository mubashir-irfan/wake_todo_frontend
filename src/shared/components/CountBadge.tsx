import React from 'react';

interface CountBadgeProps {
  count: number;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

const CountBadge: React.FC<CountBadgeProps> = ({
  count,
  bgColor = 'bg-accent-purple',
  textColor = 'text-white',
  className = '',
}) => {
  const displayText = count > 9 ? '9+' : count.toString();

  return (
    <span
      className={`w-6 h-6 p-2 font-bold flex items-center justify-center text-sm rounded-full ${bgColor} ${textColor} ${className} overflow-hidden whitespace-nowrap`}
      aria-label={`Count Badge: ${displayText}`}
      role="img"
    >
      {displayText}
    </span>
  );
};

export default CountBadge;