import { motion } from 'framer-motion';
import { ExternalLink, Trophy, Flame, Target, TrendingUp } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const stats = [
  { label: 'Problems Solved', value: 974, suffix: '', color: '#7c3aed', icon: <Target className="w-5 h-5" /> },
  { label: 'LeetCode Rating', value: 1653, suffix: '', color: '#f97316', icon: <Trophy className="w-5 h-5" /> },
  { label: 'Contests', value: 66, suffix: '', color: '#22d3ee', icon: <TrendingUp className="w-5 h-5" /> },
  { label: 'Max Streak', value: 299, suffix: ' days', color: '#10b981', icon: <Flame className="w-5 h-5" /> },
];

const difficulty = [
  { label: 'Easy', solved: 467, color: '#10b981' },
  { label: 'Medium', solved: 367, color: '#f59e0b' },
  { label: 'Hard', solved: 34, color: '#ef4444' },
];

const totalSolved = difficulty.reduce((sum, d) => sum + d.solved, 0);

const badges = [
  { name: 'LeetCode 1653', desc: 'Contest rating, max 1680 · 62 contests' },
  { name: 'CodeChef 867', desc: 'Rating, max 910 · 96 problems' },
  { name: '571 Active Days', desc: '10 awards across platforms' },
  { name: 'Weekly Contest 523', desc: 'Best result: 3 of 4, rank 3,646 of 39,157' },
];

export const LeetCodeSection = () => {
  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#f97316]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#7c3aed]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          accent="LeetCode"
          title="Coding Profile"
          subtitle="974 problems across LeetCode, GFG, CodeChef and Codeforces · 66 contests · 299-day max streak"
        />

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-5 text-center group"
              style={{ boxShadow: `0 0 0 1px ${s.color}20` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: `${s.color}15`, color: s.color }}
              >
                {s.icon}
              </div>
              <AnimatedCounter
                target={s.value}
                suffix={s.suffix}
                className="text-3xl font-display font-bold text-foreground"
              />
              <p className="text-xs text-muted-foreground mt-1 font-mono tracking-wide">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Difficulty breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-lg font-display font-bold text-foreground mb-6">Difficulty Breakdown</h3>
            <div className="space-y-5">
              {difficulty.map((d, i) => (
                <div key={d.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-semibold" style={{ color: d.color }}>{d.label}</span>
                    <span className="text-sm text-muted-foreground">
                      <span className="text-foreground font-bold">{d.solved}</span> solved
                    </span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: d.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(d.solved / totalSolved) * 100}%` }}
                      transition={{ delay: i * 0.15 + 0.3, duration: 1, ease: 'easeOut' }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{((d.solved / totalSolved) * 100).toFixed(1)}% of my solves</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-lg font-display font-bold text-foreground mb-6">Highlights</h3>
            <div className="grid grid-cols-2 gap-3">
              {badges.map((b, i) => (
                <motion.div
                  key={b.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-xl bg-muted/50 border border-muted hover:border-primary/30 transition-colors"
                >
                  <p className="font-semibold text-foreground text-sm mb-1">{b.name}</p>
                  <p className="text-xs text-muted-foreground">{b.desc}</p>
                </motion.div>
              ))}
            </div>

            <a
              href="https://leetcode.com/u/siddardha_1712/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-sm font-semibold transition-all hover:scale-105"
              style={{ backgroundColor: '#f97316', color: '#000' }}
            >
              <ExternalLink className="w-4 h-4" />
              View Full LeetCode Profile
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
