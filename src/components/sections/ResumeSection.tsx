import { motion } from 'framer-motion';
import { FileText, Download, Github, Linkedin, Code2, ExternalLink, Briefcase, Award } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlowingButton } from '@/components/ui/GlowingButton';

interface ResumeItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  period?: string;
}

const resumeItems: ResumeItem[] = [
  {
    icon: <Briefcase className="w-5 h-5" />,
    title: 'Software Development',
    subtitle: 'Full Stack Developer',
    description: 'Building robust web applications with Java, Spring Boot, and modern frontend technologies.',
    period: 'Present',
  },
  {
    icon: <Code2 className="w-5 h-5" />,
    title: 'Problem Solving',
    subtitle: 'DSA Enthusiast',
    description: '500+ problems solved on LeetCode, focusing on algorithms and data structures.',
    period: 'Ongoing',
  },
  {
    icon: <Award className="w-5 h-5" />,
    title: 'Academic Excellence',
    subtitle: 'B.Tech CSE',
    description: 'Pursuing Computer Science & Engineering at Anurag University, Hyderabad.',
    period: '2021 - 2025',
  },
];

const socialLinks = [
  { name: 'GitHub', icon: <Github className="w-5 h-5" />, url: 'https://github.com', color: '#ffffff' },
  { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, url: 'https://linkedin.com', color: '#0077b5' },
  { name: 'LeetCode', icon: <Code2 className="w-5 h-5" />, url: 'https://leetcode.com', color: '#ffa116' },
];

export const ResumeSection = () => {
  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neon-magenta/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-neon-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle
          accent="Resume"
          title="Professional Snapshot"
          subtitle="A quick overview of my experience and capabilities"
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Resume Capsule */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-6 md:p-8 relative overflow-hidden"
          >
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                <FileText className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-foreground">Siddardha Chiluveru</h3>
                <p className="text-muted-foreground">Software Developer</p>
              </div>
            </div>

            {/* Summary */}
            <p className="text-muted-foreground mb-8">
              Passionate Computer Science student with a strong foundation in full-stack development and 
              problem-solving. Experienced in building scalable applications using Java, Spring Boot, and 
              modern web technologies. Committed to writing clean, efficient code and continuously learning 
              new technologies.
            </p>

            {/* Resume items */}
            <div className="space-y-4 mb-8">
              {resumeItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 text-primary">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <p className="text-sm text-primary">{item.subtitle}</p>
                      </div>
                      {item.period && (
                        <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                          {item.period}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Download button */}
            <GlowingButton variant="coral" size="lg" className="w-full">
              <Download className="w-5 h-5" />
              Download Resume
            </GlowingButton>
          </motion.div>

          {/* Connect Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Social Links */}
            <div className="glass rounded-3xl p-6 md:p-8">
              <h3 className="text-xl font-display font-bold text-foreground mb-6">Connect With Me</h3>
              <div className="space-y-4">
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-all group"
                    whileHover={{ x: 10 }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${link.color}20`, color: link.color }}
                      >
                        {link.icon}
                      </div>
                      <span className="font-semibold text-foreground">{link.name}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="glass rounded-3xl p-6 md:p-8">
              <h3 className="text-xl font-display font-bold text-foreground mb-6">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'LeetCode Rank', value: 'Top 10%' },
                  { label: 'GitHub Streak', value: '100+ days' },
                  { label: 'Projects', value: '10+' },
                  { label: 'Languages', value: '5+' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-4 rounded-xl bg-muted/50"
                  >
                    <p className="text-2xl font-display font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
