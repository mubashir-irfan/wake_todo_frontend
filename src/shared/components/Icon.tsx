import React, { ReactNode } from 'react';

interface IconProps {
  icon: ReactNode;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  icon,
  className = 'text-text-dark dark:text-text-light',
}) => {
  return (
    <div data-testid='icon-wrapper' className={className} aria-hidden="true">
      {icon}
    </div>
  );
};

export default Icon;
