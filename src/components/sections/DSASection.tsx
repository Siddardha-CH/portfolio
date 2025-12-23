import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';

interface Stage {
  level: string;
  count: number;
  color: string;
  bgColor: string;
  algorithms: string[];
}

const stages: Stage[] = [
  {
    level: 'Easy',
    count: 200,
    color: '#10b981',
    bgColor: '#10b98115',
    algorithms: ['Arrays', 'Strings', 'Hash Tables', 'Two Pointers'],
  },
  {
    level: 'Medium',
    count: 250,
    color: '#f59e0b',
    bgColor: '#f59e0b15',
    algorithms: ['Binary Search', 'Trees', 'Graphs', 'Dynamic Programming'],
  },
  {
    level: 'Hard',
    count: 50,
    color: '#ef4444',
    bgColor: '#ef444415',
    algorithms: ['Advanced DP', 'Segment Trees', 'Graph Algorithms', 'Bit Manipulation'],
  },
];

const dataStructures = [
  { name: 'Arrays', icon: '📊', mastery: 95 },
  { name: 'Linked Lists', icon: '🔗', mastery: 90 },
  { name: 'Stacks', icon: '📚', mastery: 92 },
  { name: 'Queues', icon: '📋', mastery: 90 },
  { name: 'Trees', icon: '🌳', mastery: 88 },
  { name: 'Graphs', icon: '🕸️', mastery: 85 },
  { name: 'Hash Tables', icon: '#️⃣', mastery: 92 },
  { name: 'Heaps', icon: '⛰️', mastery: 82 },
];

const StageCard = ({ stage, index }: { stage: Stage; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <motion.div
        className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden h-full"
        whileHover={{ y: -10, scale: 1.02 }}
        style={{
          boxShadow: `0 0 0 1px ${stage.color}30`,
        }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${stage.color}20, transparent 70%)`,
          }}
        />

        {/* Step indicator */}
        <div
          className="absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-lg"
          style={{
            backgroundColor: stage.color,
            color: '#0a0a0f',
          }}
        >
          {index + 1}
        </div>

        <div className="relative z-10">
          <h3
            className="text-2xl font-display font-bold mb-2"
            style={{ color: stage.color }}
          >
            {stage.level}
          </h3>
          
          <motion.div
            className="text-5xl font-display font-bold text-foreground mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: index * 0.15 + 0.3, type: 'spring' }}
            viewport={{ once: true }}
          >
            {stage.count}
            <span className="text-2xl text-muted-foreground ml-1">solved</span>
          </motion.div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">
              Key Algorithms
            </p>
            <div className="flex flex-wrap gap-2">
              {stage.algorithms.map((algo) => (
                <span
                  key={algo}
                  className="px-3 py-1 text-xs rounded-full font-mono"
                  style={{
                    backgroundColor: stage.bgColor,
                    color: stage.color,
                  }}
                >
                  {algo}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Progress steps */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: stage.color }}
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      </motion.div>

      {/* Connector line */}
      {index < stages.length - 1 && (
        <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-muted to-transparent" />
      )}
    </motion.div>
  );
};

export const DSASection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const pathProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={containerRef} className="py-20 md:py-32 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          accent="DSA Journey"
          title="Path of Problem Solving"
          subtitle="My journey from Easy to Hard, building algorithmic thinking step by step"
        />

        {/* Journey Path */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {stages.map((stage, index) => (
            <StageCard key={stage.level} stage={stage} index={index} />
          ))}
        </div>

        {/* Data Structures Mastery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-6 md:p-10"
        >
          <h3 className="text-2xl font-display font-bold text-foreground mb-8 text-center">
            Data Structures Mastery
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {dataStructures.map((ds, i) => (
              <motion.div
                key={ds.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="text-center p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
              >
                <motion.div
                  className="text-4xl mb-2"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  {ds.icon}
                </motion.div>
                <h4 className="font-semibold text-foreground mb-2">{ds.name}</h4>
                <div className="h-2 bg-space-dark rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${ds.mastery}%` }}
                    transition={{ delay: i * 0.05 + 0.3, duration: 0.8 }}
                    viewport={{ once: true }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{ds.mastery}%</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Consistency Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-xl text-muted-foreground font-body">
            "Consistency beats intensity. Every day, one problem at a time."
          </p>
        </motion.div>
      </div>
    </section>
  );
};
