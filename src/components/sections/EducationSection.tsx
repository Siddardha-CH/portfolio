import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, BookOpen, Cpu, MapPin } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';

interface TimelineItem {
  year: string;
  title: string;
  institution: string;
  location?: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  details?: string[];
}

const timelineData: TimelineItem[] = [
  {
    year: '2021 - 2025',
    title: 'B.Tech in Computer Science & Engineering',
    institution: 'Anurag University',
    location: 'Hyderabad, India',
    description: 'Pursuing Computer Science with focus on Software Development, Data Structures, and Algorithms.',
    icon: <Cpu className="w-6 h-6" />,
    color: 'primary',
    details: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Database Management', 'Software Engineering'],
  },
  {
    year: '2019 - 2021',
    title: 'Intermediate (MPC)',
    institution: 'Junior College',
    location: 'Telangana, India',
    description: 'Completed intermediate education with focus on Mathematics, Physics, and Chemistry.',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'secondary',
    details: ['Mathematics', 'Physics', 'Chemistry'],
  },
  {
    year: '2019',
    title: 'Secondary Education',
    institution: 'High School',
    location: 'Telangana, India',
    description: 'Completed secondary education with strong foundation in science and mathematics.',
    icon: <GraduationCap className="w-6 h-6" />,
    color: 'accent',
    details: ['Science', 'Mathematics', 'Computer Basics'],
  },
];

interface TimelineNodeProps {
  item: TimelineItem;
  index: number;
  isLeft: boolean;
}

const TimelineNode = ({ item, index, isLeft }: TimelineNodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: nodeRef,
    offset: ['start end', 'center center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5], [isLeft ? -100 : 100, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  const colorClasses = {
    primary: 'border-primary bg-primary/10 text-primary shadow-[0_0_30px_hsl(var(--neon-cyan)/0.3)]',
    secondary: 'border-secondary bg-secondary/10 text-secondary shadow-[0_0_30px_hsl(var(--neon-purple)/0.3)]',
    accent: 'border-accent bg-accent/10 text-accent shadow-[0_0_30px_hsl(var(--neon-purple)/0.3)]',
  };

  return (
    <motion.div
      ref={nodeRef}
      style={{ opacity, x, scale }}
      className={`flex items-center gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'} mb-16 last:mb-0`}
    >
      {/* Content Card */}
      <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
        <motion.div
          className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
          whileHover={{ y: -5 }}
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-primary/20 text-primary mb-3">
              {item.year}
            </span>
            <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
              {item.title}
            </h3>
            <p className="text-lg font-semibold text-primary mb-1">{item.institution}</p>
            {item.location && (
              <p className="flex items-center gap-1 text-sm text-muted-foreground mb-3 justify-end">
                <MapPin className="w-3 h-3" />
                {item.location}
              </p>
            )}
            <p className="text-muted-foreground mb-4">{item.description}</p>
            
            {item.details && (
              <div className={`flex flex-wrap gap-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                {item.details.map((detail, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
                  >
                    {detail}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Timeline Node */}
      <div className="relative flex flex-col items-center">
        <motion.div
          className={`w-14 h-14 rounded-full border-2 flex items-center justify-center ${colorClasses[item.color as keyof typeof colorClasses]}`}
          whileHover={{ scale: 1.2 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          {item.icon}
        </motion.div>
        {index < timelineData.length - 1 && (
          <div className="absolute top-16 w-0.5 h-32 bg-gradient-to-b from-primary/50 to-transparent" />
        )}
      </div>

      {/* Empty space for alignment */}
      <div className="flex-1" />
    </motion.div>
  );
};

export const EducationSection = () => {
  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle
          accent="Education"
          title="The Journey"
          subtitle="My academic path from curious student to aspiring software engineer"
        />

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Central line - visible only on larger screens */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-30" />

          {/* Timeline items */}
          <div className="space-y-8">
            {timelineData.map((item, index) => (
              <TimelineNode
                key={index}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
