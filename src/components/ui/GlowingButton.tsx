import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowingButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
}

export const GlowingButton = ({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  external = false,
}: GlowingButtonProps) => {
  const variantStyles = {
    primary: 'bg-foreground text-background hover:bg-foreground/90 glow-white-soft hover:glow-white',
    outline: 'bg-transparent border-2 border-foreground text-foreground hover:bg-foreground hover:text-background',
    ghost: 'bg-foreground/5 border border-foreground/20 text-foreground hover:bg-foreground/10 hover:border-foreground/40',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const baseStyles = cn(
    'relative inline-flex items-center justify-center gap-2 rounded-sm font-medium tracking-wider uppercase transition-all duration-300',
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </MotionComponent>
  );
};