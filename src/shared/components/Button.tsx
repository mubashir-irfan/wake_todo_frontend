import { Button as UIButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'disabled';
  icon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  icon,
  className,
  children,
  ...props
}) => {
  const variants = {
    primary:
      'bg-bg-control-primary text-text-control-primary hover:bg-blue-700',
    secondary:
      'bg-bg-control-secondary text-text-control-secondary border border-[2px] !border-text-control-secondary border-solid hover:bg-gray-300',
    disabled: 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50',
  };

  return (
    <UIButton
      className={cn(
        variants[variant],
        'flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer',
        className,
      )}
      disabled={variant === 'disabled'}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </UIButton>
  );
};

export default Button;
