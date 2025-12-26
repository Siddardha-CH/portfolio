import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';

interface Skill {
  name: string;
  category: 'Languages' | 'Backend' | 'Frontend' | 'Tools' | 'Core';
  proficiency: number;
  color: string;
  description: string;
}

const skillsData: Skill[] = [
  // Languages
  { name: 'Java', category: 'Languages', proficiency: 90, color: '#f89820', description: 'Primary backend language and DSA' },
  { name: 'Python', category: 'Languages', proficiency: 80, color: '#3776ab', description: 'Scripting and ML projects' },
  { name: 'JavaScript', category: 'Languages', proficiency: 75, color: '#f7df1e', description: 'Web development and interactivity' },
  { name: 'C', category: 'Languages', proficiency: 70, color: '#00599c', description: 'Systems programming fundamentals' },

  // Backend
  { name: 'Spring Boot', category: 'Backend', proficiency: 85, color: '#6db33f', description: 'Enterprise Java applications' },
  { name: 'REST APIs', category: 'Backend', proficiency: 85, color: '#00f5ff', description: 'RESTful service design' },
  { name: 'JPA / Hibernate', category: 'Backend', proficiency: 80, color: '#59666c', description: 'ORM and database interaction' },
  { name: 'MySQL', category: 'Backend', proficiency: 85, color: '#00758f', description: 'Relational database management' },

  // Frontend
  { name: 'HTML', category: 'Frontend', proficiency: 90, color: '#e34f26', description: 'Semantic markup and structure' },
  { name: 'CSS', category: 'Frontend', proficiency: 85, color: '#1572b6', description: 'Responsive layouts and styling' },
  { name: 'React', category: 'Frontend', proficiency: 75, color: '#61dafb', description: 'Component-based UI development' },

  // Tools
  { name: 'Git', category: 'Tools', proficiency: 85, color: '#f05032', description: 'Version control and collaboration' },
  { name: 'GitHub', category: 'Tools', proficiency: 90, color: '#ffffff', description: 'Code hosting and CI/CD workflows' },
  { name: 'Linux', category: 'Tools', proficiency: 75, color: '#fcc624', description: 'Command line and scripting' },

  // Core CS
  { name: 'OOP', category: 'Core', proficiency: 90, color: '#ec4899', description: 'Object-oriented design principles' },
  { name: 'DSA', category: 'Core', proficiency: 90, color: '#8b5cf6', description: 'Data structures and algorithms' },
];

const categories: ('All' | Skill['category'])[] = [
  'All',
  'Languages',
  'Backend',
  'Frontend',
  'Tools',
  'Core',
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
          title="Tech Universe"
          subtitle="Technologies and tools I use to bring ideas to life"
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
    whileHover={{
      scale: 1.04,
      boxShadow: `0 0 25px ${skill.color}55`,
    }}
    className="glass rounded-xl p-4 cursor-pointer border border-transparent"
    style={{
      transition: 'box-shadow 0.3s ease, transform 0.3s ease',
    }}
  >

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                    <span className="font-semibold text-foreground">
                      {skill.name}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {skill.category}
                    </span>
                  </div>
                  <span className="font-mono text-sm text-primary">
                    {skill.proficiency}%
                  </span>
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

                <p className="text-sm text-muted-foreground mt-2">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
