import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowingButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'coral' | 'magenta' | 'lime' | 'gold' | 'azure';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
}

export const GlowingButton = ({
  children,
  href,
  onClick,
  variant = 'coral',
  size = 'md',
  className = '',
  external = false,
}: GlowingButtonProps) => {
  const variantStyles = {
    coral: 'bg-neon-coral/10 border-neon-coral text-neon-coral hover:bg-neon-coral hover:text-space-void shadow-[0_0_20px_hsl(var(--neon-coral)/0.3)] hover:shadow-[0_0_40px_hsl(var(--neon-coral)/0.6)]',
    magenta: 'bg-neon-magenta/10 border-neon-magenta text-neon-magenta hover:bg-neon-magenta hover:text-space-void shadow-[0_0_20px_hsl(var(--neon-magenta)/0.3)] hover:shadow-[0_0_40px_hsl(var(--neon-magenta)/0.6)]',
    lime: 'bg-neon-lime/10 border-neon-lime text-neon-lime hover:bg-neon-lime hover:text-space-void shadow-[0_0_20px_hsl(var(--neon-lime)/0.3)] hover:shadow-[0_0_40px_hsl(var(--neon-lime)/0.6)]',
    gold: 'bg-neon-gold/10 border-neon-gold text-neon-gold hover:bg-neon-gold hover:text-space-void shadow-[0_0_20px_hsl(var(--neon-gold)/0.3)] hover:shadow-[0_0_40px_hsl(var(--neon-gold)/0.6)]',
    azure: 'bg-neon-azure/10 border-neon-azure text-neon-azure hover:bg-neon-azure hover:text-space-void shadow-[0_0_20px_hsl(var(--neon-azure)/0.3)] hover:shadow-[0_0_40px_hsl(var(--neon-azure)/0.6)]',
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
