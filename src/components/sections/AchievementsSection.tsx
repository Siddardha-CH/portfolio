import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Code2, GitBranch, Flame } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const stats = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: 'LeetCode Solved',
    value: 726,
    suffix: '',
    description: 'Problems solved — Easy 425 · Med 280 · Hard 21',
    color: '#f97316',
  },
  {
    icon: <Trophy className="w-8 h-8" />,
    title: 'Contest Rating',
    value: 1657,
    suffix: '',
    description: 'Global rank 81,302 — Top 17.26%',
    color: '#7c3aed',
  },
  {
    icon: <Flame className="w-8 h-8" />,
    title: 'Max Streak',
    value: 299,
    suffix: ' days',
    description: '363 active days in the past year',
    color: '#ef4444',
  },
  {
    icon: <GitBranch className="w-8 h-8" />,
    title: 'GitHub Repos',
    value: 12,
    suffix: '+',
    description: 'Full-stack apps, open source, experiments',
    color: '#10b981',
  },
];

const highlights = [
  {
    icon: <Trophy className="w-7 h-7" />,
    title: 'Top 17.26% Global',
    description: 'LeetCode contest percentile — consistently improving',
    color: '#f97316',
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: '299-Day Streak',
    description: 'Daily problem solving habit, max streak maintained',
    color: '#eab308',
  },
  {
    icon: <Star className="w-7 h-7" />,
    title: '4 Full-Stack Projects',
    description: 'Spring Boot + React + PostgreSQL production apps',
    color: '#7c3aed',
  },
  {
    icon: <Code2 className="w-7 h-7" />,
    title: 'AI Integrations',
    description: 'Groq Llama 3.3 70B in CodeRefine & DesignMate',
    color: '#f55036',
  },
  {
    icon: <GitBranch className="w-7 h-7" />,
    title: 'Spring Boot Expert',
    description: 'JWT auth, RBAC, JPA, REST APIs across 3 projects',
    color: '#6db33f',
  },
  {
    icon: <Flame className="w-7 h-7" />,
    title: '1,275 Submissions',
    description: 'Consistent code submissions in the past year',
    color: '#22d3ee',
  },
];

export const AchievementsSection = () => {
  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-foreground/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          accent="Achievements"
          title="Milestones"
          subtitle="Real numbers — contest performance, streaks, and projects shipped"
        />

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 text-center group hover:scale-[1.02] transition-transform duration-300"
              style={{ boxShadow: `0 0 0 1px ${s.color}20` }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${s.color}15`, color: s.color }}
              >
                {s.icon}
              </div>
              <AnimatedCounter
                target={s.value}
                suffix={s.suffix}
                className="text-4xl font-display font-bold text-foreground"
                duration={2}
              />
              <h4 className="font-display font-semibold text-foreground mt-2 mb-1 text-sm tracking-wide uppercase">
                {s.title}
              </h4>
              <p className="text-xs text-muted-foreground">{s.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Highlights Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.08, type: 'spring' }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-5 flex items-start gap-4 group hover:scale-[1.02] transition-transform duration-200"
              style={{ boxShadow: `0 0 0 1px ${h.color}15` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${h.color}15`, color: h.color }}
              >
                {h.icon}
              </div>
              <div>
                <h4 className="font-display font-semibold text-foreground mb-1">{h.title}</h4>
                <p className="text-sm text-muted-foreground">{h.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
