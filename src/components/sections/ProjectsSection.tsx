import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Brain, Camera, Music, ChevronRight, X } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlowingButton } from '@/components/ui/GlowingButton';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  techStack: string[];
  icon: React.ReactNode;
  color: string;
  image?: string;
  github?: string;
  demo?: string;
  features: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'AI-based MSME Manager',
    subtitle: 'Business Automation Platform',
    description: 'An intelligent platform designed to streamline operations for Micro, Small, and Medium Enterprises using AI-powered workflows.',
    problem: 'Small businesses struggle with manual processes, inventory management, and customer relationship tracking.',
    solution: 'Built an AI-driven system that automates routine tasks, provides intelligent insights, and integrates seamlessly with existing workflows.',
    techStack: ['Java', 'Spring Boot', 'MySQL', 'REST APIs', 'AI/ML'],
    icon: <Brain className="w-8 h-8" />,
    color: '#00f5ff',
    features: [
      'AI-powered task automation',
      'Intelligent inventory management',
      'Customer analytics dashboard',
      'Automated report generation',
    ],
  },
  {
    id: 2,
    title: 'Smart Attendance System',
    subtitle: 'Computer Vision Application',
    description: 'A real-time facial recognition attendance system that automates the attendance tracking process using computer vision.',
    problem: 'Manual attendance tracking is time-consuming, error-prone, and susceptible to proxy attendance.',
    solution: 'Developed a face recognition system using OpenCV that captures and verifies identities in real-time with high accuracy.',
    techStack: ['Python', 'OpenCV', 'Computer Vision', 'MySQL', 'Flask'],
    icon: <Camera className="w-8 h-8" />,
    color: '#8b5cf6',
    features: [
      'Real-time face detection',
      'High accuracy recognition',
      'Automated attendance logging',
      'Admin dashboard for reports',
    ],
  },
  {
    id: 3,
    title: 'Java CLI Music Player',
    subtitle: 'Performance-Focused Application',
    description: 'A lightweight, command-line music player built with pure Java, focusing on performance and clean code architecture.',
    problem: 'Need for a simple, resource-efficient music player without the overhead of graphical interfaces.',
    solution: 'Created a minimalist CLI music player with playlist management, audio controls, and efficient memory usage.',
    techStack: ['Java', 'Core Java', 'File I/O', 'Audio APIs'],
    icon: <Music className="w-8 h-8" />,
    color: '#10b981',
    features: [
      'Multiple audio format support',
      'Playlist management',
      'Low memory footprint',
      'Keyboard shortcuts',
    ],
  },
];

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

const ProjectCard = ({ project, onClick, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <motion.div
        className="glass rounded-2xl p-6 md:p-8 h-full cursor-pointer relative overflow-hidden"
        whileHover={{ y: -10, scale: 1.02 }}
        onClick={onClick}
        style={{
          boxShadow: `0 0 0 1px ${project.color}20`,
        }}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${project.color}10, transparent 70%)`,
          }}
        />

        {/* Icon */}
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 relative"
          style={{
            backgroundColor: `${project.color}15`,
            color: project.color,
            boxShadow: `0 0 30px ${project.color}30`,
          }}
        >
          {project.icon}
        </div>

        {/* Content */}
        <div className="relative z-10">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            {project.subtitle}
          </span>
          <h3 className="text-2xl font-display font-bold text-foreground mt-1 mb-3">
            {project.title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* View more */}
          <div
            className="flex items-center gap-2 font-medium transition-colors"
            style={{ color: project.color }}
          >
            <span>View Details</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-lg"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: 'spring', damping: 25 }}
        className="glass rounded-3xl p-6 md:p-10 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `0 0 60px ${project.color}20`,
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: `${project.color}15`,
              color: project.color,
            }}
          >
            {project.icon}
          </div>
          <div>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              {project.subtitle}
            </span>
            <h2 className="text-3xl font-display font-bold text-foreground">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-6">
          {project.description}
        </p>

        {/* Problem & Solution */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
            <h4 className="font-display font-semibold text-destructive mb-2">The Problem</h4>
            <p className="text-sm text-muted-foreground">{project.problem}</p>
          </div>
          <div className="p-4 rounded-xl bg-neon-green/10 border border-neon-green/20">
            <h4 className="font-display font-semibold text-neon-green mb-2">The Solution</h4>
            <p className="text-sm text-muted-foreground">{project.solution}</p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-8">
          <h4 className="font-display font-semibold text-foreground mb-4">Key Features</h4>
          <div className="grid sm:grid-cols-2 gap-3">
            {project.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted"
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <span className="text-sm text-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="mb-8">
          <h4 className="font-display font-semibold text-foreground mb-4">Technologies Used</h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm rounded-full font-mono"
                style={{
                  backgroundColor: `${project.color}15`,
                  color: project.color,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          {project.github && (
            <GlowingButton href={project.github} variant="cyan" external>
              <Github className="w-4 h-4" />
              View Code
            </GlowingButton>
          )}
          {project.demo && (
            <GlowingButton href={project.demo} variant="purple" external>
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </GlowingButton>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          accent="Projects"
          title="What I've Built"
          subtitle="Real-world solutions that showcase my problem-solving abilities"
        />

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
