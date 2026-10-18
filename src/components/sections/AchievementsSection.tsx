import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Code2, Flame, Award, TrendingUp } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const stats = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: 'LeetCode Solved',
    value: 880,
    suffix: '+',
    description: 'Easy 462 · Medium 381 · Hard 38',
    color: '#f97316',
  },
  {
    icon: <Trophy className="w-8 h-8" />,
    title: 'CodeVita Global Rank',
    value: 873,
    suffix: '',
    description: 'TCS CodeVita Season 13, out of 50,000+ · College Topper',
    color: '#7c3aed',
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: 'Contest Rating',
    value: 1667,
    suffix: '',
    description: 'LeetCode, across 65 contests',
    color: '#22d3ee',
  },
  {
    icon: <Flame className="w-8 h-8" />,
    title: 'Day Streak Badge',
    value: 500,
    suffix: '',
    description: '9 LeetCode badges in total',
    color: '#ef4444',
  },
];

const highlights = [
  {
    icon: <Trophy className="w-7 h-7" />,
    title: 'AGENTX Hackathon Runner-Up',
    description: 'Finance domain, AI Loan Status Agent on Salesforce Agentforce (team of 3)',
    color: '#eab308',
  },
  {
    icon: <Star className="w-7 h-7" />,
    title: 'CodeVita College Topper',
    description: 'TCS CodeVita Season 13 (2025), Global Rank 873 / 50,000+',
    color: '#7c3aed',
  },
  {
    icon: <Award className="w-7 h-7" />,
    title: 'Salesforce Agentforce Specialist',
    description: 'Salesforce Certified, Dec 2025 (ID 7278025)',
    color: '#00a1e0',
  },
  {
    icon: <Award className="w-7 h-7" />,
    title: 'OCI AI Foundations Associate',
    description: 'Oracle Cloud Infrastructure 2025 Certified, Sep 2025',
    color: '#f80000',
  },
  {
    icon: <Award className="w-7 h-7" />,
    title: 'DSA in Java',
    description: 'Udemy certificate, Oct 2025',
    color: '#a435f0',
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: '384 Solutions Shared',
    description: 'LeetCode write-ups with 29.2K views',
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
          subtitle="Competitive programming, hackathons, and certifications"
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
