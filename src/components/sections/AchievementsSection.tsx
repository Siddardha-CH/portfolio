import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Target, Star, Zap } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

interface Achievement {
  icon: React.ReactNode;
  title: string;
  value: number;
  suffix: string;
  description: string;
}

const achievements: Achievement[] = [
  {
    icon: <Target className="w-8 h-8" />,
    title: 'LeetCode Problems',
    value: 500,
    suffix: '+',
    description: 'Solved across Easy, Medium, and Hard difficulty',
  },
  {
    icon: <Trophy className="w-8 h-8" />,
    title: 'Competitions',
    value: 20,
    suffix: '+',
    description: 'Coding competitions and hackathons participated',
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: 'GitHub Repos',
    value: 15,
    suffix: '+',
    description: 'Open source projects and contributions',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'DSA Concepts',
    value: 50,
    suffix: '+',
    description: 'Algorithms and data structures mastered',
  },
];

interface BadgeProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const AchievementBadge = ({ title, description, icon, delay }: BadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay, duration: 0.6, type: 'spring' }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center group"
    >
      <motion.div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-4 relative border border-foreground/20 text-foreground bg-foreground/5"
        whileHover={{ scale: 1.1, rotate: 10 }}
      >
        {icon}
        <motion.div
          className="absolute inset-0 rounded-full border border-foreground/30"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      <h4 className="font-display font-semibold text-foreground mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
};

const LeetCodeProgress = () => {
  const difficulties = [
    { label: 'Easy', solved: 200, total: 800 },
    { label: 'Medium', solved: 250, total: 1700 },
    { label: 'Hard', solved: 50, total: 750 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-sm p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-sm bg-foreground/10 flex items-center justify-center border border-foreground/20">
          <Target className="w-6 h-6 text-foreground" />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold text-foreground tracking-wider">LEETCODE JOURNEY</h3>
          <p className="text-sm text-muted-foreground">Problem Solving Progress</p>
        </div>
      </div>

      <div className="text-center mb-8">
        <AnimatedCounter
          target={500}
          suffix="+"
          className="text-6xl font-display font-bold text-foreground text-glow"
        />
        <p className="text-muted-foreground mt-2">Total Problems Solved</p>
      </div>

      <div className="space-y-4">
        {difficulties.map((diff, i) => (
          <motion.div
            key={diff.label}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold text-foreground">
                {diff.label}
              </span>
              <span className="text-muted-foreground font-mono">
                {diff.solved} / {diff.total}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-foreground"
                initial={{ width: 0 }}
                whileInView={{ width: `${(diff.solved / diff.total) * 100}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                viewport={{ once: true }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export const AchievementsSection = () => {
  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-foreground/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          accent="Achievements"
          title="Milestones Unlocked"
          subtitle="Celebrating consistency, growth, and continuous learning"
        />

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, i) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-sm p-6 text-center group hover:glow-white-soft transition-all duration-300 border border-foreground/10"
            >
              <div className="w-14 h-14 rounded-sm flex items-center justify-center mx-auto mb-4 bg-foreground/5 text-foreground border border-foreground/20">
                {achievement.icon}
              </div>
              <AnimatedCounter
                target={achievement.value}
                suffix={achievement.suffix}
                className="text-4xl font-display font-bold text-foreground"
                duration={2}
              />
              <h4 className="font-display font-semibold text-foreground mt-2 mb-1 tracking-wider">
                {achievement.title.toUpperCase()}
              </h4>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
            </motion.div>
          ))}
        </div>

        {/* LeetCode Progress & Badges */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <LeetCodeProgress />

          {/* Achievement Badges */}
          <div className="glass rounded-sm p-6 md:p-8">
            <h3 className="text-xl font-display font-bold text-foreground mb-6 text-center tracking-wider">
              BADGES EARNED
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <AchievementBadge
                title="Problem Solver"
                description="500+ problems"
                icon={<Medal className="w-8 h-8" />}
                delay={0}
              />
              <AchievementBadge
                title="Consistent"
                description="Daily practice"
                icon={<Zap className="w-8 h-8" />}
                delay={0.1}
              />
              <AchievementBadge
                title="Hard Crusher"
                description="50+ hard problems"
                icon={<Award className="w-8 h-8" />}
                delay={0.2}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};