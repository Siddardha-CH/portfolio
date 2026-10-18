import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';

type Level = 'Strong' | 'Working' | 'Beginner';

interface Skill {
  name: string;
  category: 'Languages' | 'Backend' | 'Database' | 'AI & Platforms' | 'Tools' | 'Core';
  level: Level;
  color: string;
  description: string;
}

const levelWidth: Record<Level, number> = { Strong: 90, Working: 65, Beginner: 30 };

const skillsData: Skill[] = [
  // Languages
  { name: 'Java', category: 'Languages', level: 'Strong', color: '#f89820', description: 'Primary language for backends and DSA' },
  { name: 'SQL', category: 'Languages', level: 'Strong', color: '#00758f', description: 'Joins, constraints, schema design' },
  { name: 'JavaScript', category: 'Languages', level: 'Working', color: '#f7df1e', description: 'Frontends and serverless functions in projects' },
  { name: 'Python', category: 'Languages', level: 'Beginner', color: '#3776ab', description: 'Coursework level' },

  // Backend
  { name: 'Spring Boot', category: 'Backend', level: 'Strong', color: '#6db33f', description: 'REST APIs in CreditSense, SmartAttend, CodeRefine' },
  { name: 'Spring Data JPA', category: 'Backend', level: 'Strong', color: '#59666c', description: 'Entities, repositories, relations' },
  { name: 'REST API Design', category: 'Backend', level: 'Strong', color: '#00f5ff', description: 'Resource design, validation, error handling' },
  { name: 'JWT / OAuth2', category: 'Backend', level: 'Strong', color: '#5a9e3a', description: 'Rotating refresh tokens, OAuth2 login, RBAC' },
  { name: 'JUnit / API Testing', category: 'Backend', level: 'Strong', color: '#25a162', description: 'Backend tests wired into CI' },

  // Database
  { name: 'PostgreSQL', category: 'Database', level: 'Strong', color: '#336791', description: 'CreditSense and SmartAttend' },
  { name: 'MySQL', category: 'Database', level: 'Strong', color: '#00758f', description: 'MSME Credit Assessment System' },
  { name: 'SQLite', category: 'Database', level: 'Working', color: '#0f80cc', description: 'CodeRefine persistence' },

  // AI & Platforms
  { name: 'Groq / LLM APIs', category: 'AI & Platforms', level: 'Working', color: '#f55036', description: 'Streaming and structured prompts in CodeRefine, DesignMate' },
  { name: 'Prompt Engineering', category: 'AI & Platforms', level: 'Working', color: '#ec4899', description: 'Structured output, severity bucketing' },
  { name: 'Salesforce Agentforce + Apex', category: 'AI & Platforms', level: 'Working', color: '#00a1e0', description: 'AGENTX runner-up loan agent; certified specialist' },
  { name: 'Vercel / Render', category: 'AI & Platforms', level: 'Working', color: '#a3a3a3', description: 'Deploying live projects' },

  // Tools
  { name: 'Git / GitHub', category: 'Tools', level: 'Strong', color: '#f05032', description: 'Branching, pull requests, CI' },
  { name: 'Postman', category: 'Tools', level: 'Working', color: '#ff6c37', description: 'API testing and debugging' },
  { name: 'IntelliJ IDEA', category: 'Tools', level: 'Working', color: '#fe315d', description: 'Primary Java IDE' },
  { name: 'Claude Code / Cursor / Codex', category: 'Tools', level: 'Working', color: '#d97757', description: 'AI-assisted workflow, verified through tests and debugging' },

  // Core CS
  { name: 'DSA', category: 'Core', level: 'Strong', color: '#8b5cf6', description: '880+ LeetCode problems, CodeVita Global Rank 873' },
  { name: 'OOP', category: 'Core', level: 'Strong', color: '#ec4899', description: 'Clean, layered Java design' },
];

const categories: ('All' | Skill['category'])[] = [
  'All', 'Languages', 'Backend', 'Database', 'AI & Platforms', 'Tools', 'Core',
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('All');

  const filteredSkills =
    activeCategory === 'All'
      ? skillsData
      : skillsData.filter(skill => skill.category === activeCategory);

  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          accent="Skills"
          title="Tech Stack"
          subtitle="Honest levels: what I use daily, what I have shipped with, and what I am still learning"
        />

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-sm font-mono text-sm uppercase tracking-wider transition ${
                activeCategory === category
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, type: 'spring', stiffness: 120 }}
                whileHover={{ scale: 1.04, boxShadow: `0 0 25px ${skill.color}55` }}
                className="glass rounded-xl p-4 cursor-pointer border border-transparent"
                style={{ transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: skill.color }} />
                    <span className="font-semibold text-foreground">{skill.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {skill.category}
                    </span>
                  </div>
                  <span className="font-mono text-sm text-primary">{skill.level}</span>
                </div>

                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${levelWidth[skill.level]}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>

                <p className="text-sm text-muted-foreground mt-2">{skill.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
