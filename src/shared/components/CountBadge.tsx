import React from 'react';
import ToolTip from './Tooltip';

interface CountBadgeProps {
  title: string;
  count: number;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

const CountBadge: React.FC<CountBadgeProps> = ({
  title,
  count,
  bgColor = 'bg-accent-purple',
  textColor = 'text-white',
  className = '',
}) => {
  const displayText = count > 9 ? '9+' : count.toString();

  return (
    <ToolTip label={`${title}: ${count.toString()}`}>
      <span
        className={`w-6 h-6 p-2 font-bold flex items-center justify-center text-xs rounded-full ${bgColor} ${textColor} ${className} overflow-hidden whitespace-nowrap`}
        aria-label={`Count Badge: ${displayText}`}
        role="img"
      >
        {displayText}
      </span>
    </ToolTip>
  );
};

export default CountBadge;
