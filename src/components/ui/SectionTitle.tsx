import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  accent?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export const SectionTitle = ({
  title,
  subtitle,
  accent,
  className = '',
  align = 'center',
}: SectionTitleProps) => {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <motion.div
      className={cn('mb-12', alignClass[align], className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {accent && (
        <motion.span
          className="inline-block text-primary font-mono text-sm tracking-widest uppercase mb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          {'// '}{accent}
        </motion.span>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4">
        {title.split(' ').map((word, i) => (
          <motion.span
            key={i}
            className={i % 2 === 1 ? 'text-neon-coral text-glow-coral' : ''}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {word}{' '}
          </motion.span>
        ))}
      </h2>
      {subtitle && (
        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};
