import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';

interface Skill {
  name: string;
  category: 'Languages' | 'Backend' | 'Frontend' | 'Database' | 'Tools' | 'Core';
  proficiency: number;
  color: string;
  description: string;
}

const skillsData: Skill[] = [
  // Languages
  { name: 'Java', category: 'Languages', proficiency: 90, color: '#f89820', description: 'Primary backend language — Spring Boot + DSA' },
  { name: 'TypeScript', category: 'Languages', proficiency: 80, color: '#3178c6', description: 'All React frontends written in TypeScript' },
  { name: 'Python', category: 'Languages', proficiency: 78, color: '#3776ab', description: 'Scripting, data processing, ML experiments' },
  { name: 'JavaScript', category: 'Languages', proficiency: 78, color: '#f7df1e', description: 'Web interactivity and serverless functions' },
  { name: 'C', category: 'Languages', proficiency: 65, color: '#00599c', description: 'Systems programming fundamentals' },

  // Backend
  { name: 'Spring Boot', category: 'Backend', proficiency: 88, color: '#6db33f', description: 'Production REST APIs with Security + JPA' },
  { name: 'Spring Security', category: 'Backend', proficiency: 82, color: '#5a9e3a', description: 'JWT auth, BCrypt, RBAC with @PreAuthorize' },
  { name: 'JPA / Hibernate', category: 'Backend', proficiency: 82, color: '#59666c', description: 'ORM, entity relations, query optimization' },
  { name: 'REST APIs', category: 'Backend', proficiency: 88, color: '#00f5ff', description: 'RESTful design, pagination, error handling' },
  { name: 'Groq AI', category: 'Backend', proficiency: 75, color: '#f55036', description: 'Llama 3.3 70B integration for AI features' },

  // Frontend
  { name: 'React 18', category: 'Frontend', proficiency: 82, color: '#61dafb', description: 'Hooks, context, component architecture' },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 85, color: '#06b6d4', description: 'Utility-first responsive UI across all projects' },
  { name: 'Framer Motion', category: 'Frontend', proficiency: 78, color: '#ff0055', description: 'Page transitions, scroll animations, gestures' },
  { name: 'Vite', category: 'Frontend', proficiency: 80, color: '#646cff', description: 'Fast dev server + build toolchain' },
  { name: 'HTML / CSS', category: 'Frontend', proficiency: 90, color: '#e34f26', description: 'Semantic markup, layouts, responsive design' },

  // Database
  { name: 'PostgreSQL', category: 'Database', proficiency: 84, color: '#336791', description: 'Primary database across all Spring Boot projects' },
  { name: 'SQL', category: 'Database', proficiency: 85, color: '#00758f', description: 'Joins, indexing, query optimisation' },

  // Tools
  { name: 'Git', category: 'Tools', proficiency: 88, color: '#f05032', description: 'Branching, rebasing, collaborative workflow' },
  { name: 'Maven', category: 'Tools', proficiency: 82, color: '#c71a36', description: 'Dependency management and build lifecycle' },
  { name: 'Linux', category: 'Tools', proficiency: 72, color: '#fcc624', description: 'CLI, shell scripting, process management' },

  // Core CS
  { name: 'DSA', category: 'Core', proficiency: 90, color: '#8b5cf6', description: '726 problems solved on LeetCode — Top 17%' },
  { name: 'OOP', category: 'Core', proficiency: 90, color: '#ec4899', description: 'SOLID principles, design patterns, clean code' },
  { name: 'System Design', category: 'Core', proficiency: 72, color: '#f97316', description: 'HLD, scalability, caching, distributed systems' },
];

const categories: ('All' | Skill['category'])[] = [
  'All', 'Languages', 'Backend', 'Frontend', 'Database', 'Tools', 'Core',
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
          subtitle="Languages, frameworks, and tools I use across backend, frontend, and infrastructure"
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
                  <span className="font-mono text-sm text-primary">{skill.proficiency}%</span>
                </div>

                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.proficiency}%` }}
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
