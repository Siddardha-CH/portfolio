import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowingButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'cyan' | 'purple' | 'green';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
}

export const GlowingButton = ({
  children,
  href,
  onClick,
  variant = 'cyan',
  size = 'md',
  className = '',
  external = false,
}: GlowingButtonProps) => {
  const variantStyles = {
    cyan: 'bg-primary/10 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-[0_0_20px_hsl(var(--neon-cyan)/0.3)] hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.6)]',
    purple: 'bg-secondary/10 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground shadow-[0_0_20px_hsl(var(--neon-purple)/0.3)] hover:shadow-[0_0_30px_hsl(var(--neon-purple)/0.6)]',
    green: 'bg-neon-green/10 border-neon-green text-neon-green hover:bg-neon-green hover:text-space-dark shadow-[0_0_20px_hsl(var(--neon-green)/0.3)] hover:shadow-[0_0_30px_hsl(var(--neon-green)/0.6)]',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const baseStyles = cn(
    'relative inline-flex items-center justify-center gap-2 rounded-lg border-2 font-display font-medium tracking-wide transition-all duration-300',
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const MotionComponent = href ? motion.a : motion.button;

  return (
    <MotionComponent
      href={href}
      onClick={onClick}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={baseStyles}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </MotionComponent>
  );
};
