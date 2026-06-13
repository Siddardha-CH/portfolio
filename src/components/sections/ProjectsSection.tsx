import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Brain, Camera, Code2, Layout, ChevronRight, X } from 'lucide-react';
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
  github?: string;
  demo?: string;
  features: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'CodeRefine — AI Code Review',
    subtitle: 'AI-Powered Developer Tool',
    description: 'Full-stack platform where users submit code and receive an AI-powered analysis: quality score, severity-bucketed vulnerabilities, refactored code, and a code converter — all in real time.',
    problem: 'Developers lack fast, actionable feedback on code quality without waiting for peer reviews or running static analysis tools.',
    solution: 'Built a Spring Boot + PostgreSQL backend with JWT auth and a Groq (Llama 3.3 70B) AI pipeline. React frontend streams results with animated score rings and collapsible issue cards.',
    techStack: ['Spring Boot', 'PostgreSQL', 'React', 'TypeScript', 'Groq AI', 'JWT', 'Tailwind CSS'],
    icon: <Code2 className="w-8 h-8" />,
    color: '#7c3aed',
    github: 'https://github.com/Siddardha-CH/STRAM',
    features: [
      'AI quality score (0–100) with animated ring',
      'Issue breakdown: Critical / High / Medium / Low',
      'Full code refactor by Llama 3.3 70B',
      'Code converter across 7 languages',
      'JWT auth + review history',
      'Spring Boot + PostgreSQL backend',
    ],
  },
  {
    id: 2,
    title: 'Smart Attendance System',
    subtitle: 'Computer Vision Platform',
    description: 'Full-stack attendance platform with real-time face recognition in the browser. Spring Boot REST backend with 3-role RBAC; teachers enroll faces and run live scanning via webcam.',
    problem: 'Manual attendance is time-consuming and prone to proxy fraud, with no easy audit trail across multiple institutes.',
    solution: 'Used face-api.js to run recognition client-side (no server uploads), backed by 14 Spring Boot REST endpoints and JWT-protected roles.',
    techStack: ['Spring Boot', 'PostgreSQL', 'React', 'TypeScript', 'face-api.js', 'JWT', 'Tailwind CSS'],
    icon: <Camera className="w-8 h-8" />,
    color: '#d946ef',
    github: 'https://github.com/Siddardha-CH/SmartAttendenceSystem',
    features: [
      'Real-time browser-side face recognition',
      '3-role RBAC: Admin / Teacher / Viewer',
      '14 REST endpoints across 7 controllers',
      'Multi-institute & multi-class management',
      'Excel report export',
      'Deployed on Render + Vercel',
    ],
  },
  {
    id: 3,
    title: 'MSME Credit Assessment',
    subtitle: 'Fintech Scoring Engine',
    description: 'Loan-screening platform that scores MSMEs (0–100) using 10 alternative financial signals — GST compliance, UPI frequency, ITR filing — replacing the need for formal bureau data.',
    problem: 'Millions of small businesses in India are credit-invisible despite strong business fundamentals, blocked from formal loans.',
    solution: 'Built a Spring Boot scoring engine with weighted factor analysis, role-based API (admin/analyst/viewer), and a React dashboard for lenders.',
    techStack: ['Spring Boot', 'PostgreSQL', 'React', 'TypeScript', 'JWT', 'Tailwind CSS'],
    icon: <Brain className="w-8 h-8" />,
    color: '#f97316',
    github: 'https://github.com/Siddardha-CH/msme-signal-score',
    features: [
      '10-factor deterministic scoring engine',
      'Credit grades A–F with per-factor breakdown',
      'Role-based access: admin / analyst / viewer',
      'JUnit tests on service and scoring layers',
      'Spring Boot + PostgreSQL backend',
      'GSTIN-based business lookup',
    ],
  },
  {
    id: 4,
    title: 'DesignMate — AI Interview Partner',
    subtitle: 'AI Learning Tool',
    description: 'AI web app for system design interview practice. Three modes — Practice, Learn, Design — streaming responses token-by-token via SSE. API key secured behind a Vercel serverless proxy.',
    problem: 'System design interviews require structured practice that goes beyond reading articles — candidates need interactive, guided sessions.',
    solution: 'Built a React + TypeScript chat UI with Framer Motion animations; Groq Llama 3.3 70B responds in three structured modes; deployed live on Vercel.',
    techStack: ['React 18', 'TypeScript', 'Groq API', 'Vercel Serverless', 'Framer Motion', 'Tailwind CSS'],
    icon: <Layout className="w-8 h-8" />,
    color: '#22d3ee',
    github: 'https://github.com/Siddardha-CH/designmate',
    demo: 'https://designmate.vercel.app',
    features: [
      'Practice mode: mock interviewer with follow-ups',
      'Learn mode: structured concept explainer',
      'Design mode: requirements → HLD → schema → scaling',
      'Token-by-token streaming via SSE',
      'API key secured in Vercel serverless function',
      'Live deployment on Vercel',
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
        style={{ boxShadow: `0 0 0 1px ${project.color}20` }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at 50% 50%, ${project.color}10, transparent 70%)` }}
        />
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 relative"
          style={{ backgroundColor: `${project.color}15`, color: project.color, boxShadow: `0 0 30px ${project.color}30` }}
        >
          {project.icon}
        </div>
        <div className="relative z-10">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{project.subtitle}</span>
          <h3 className="text-2xl font-display font-bold text-foreground mt-1 mb-3">{project.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 4).map((tech) => (
              <span key={tech} className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground">{tech}</span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground">+{project.techStack.length - 4}</span>
            )}
          </div>
          <div className="flex items-center gap-2 font-medium transition-colors" style={{ color: project.color }}>
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
        style={{ boxShadow: `0 0 60px ${project.color}20` }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-start gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${project.color}15`, color: project.color }}
          >
            {project.icon}
          </div>
          <div>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{project.subtitle}</span>
            <h2 className="text-3xl font-display font-bold text-foreground">{project.title}</h2>
          </div>
        </div>
        <p className="text-lg text-muted-foreground mb-6">{project.description}</p>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
            <h4 className="font-display font-semibold text-destructive mb-2">The Problem</h4>
            <p className="text-sm text-muted-foreground">{project.problem}</p>
          </div>
          <div className="p-4 rounded-xl bg-neon-lime/10 border border-neon-lime/20">
            <h4 className="font-display font-semibold text-neon-lime mb-2">The Solution</h4>
            <p className="text-sm text-muted-foreground">{project.solution}</p>
          </div>
        </div>
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
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color }} />
                <span className="text-sm text-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h4 className="font-display font-semibold text-foreground mb-4">Technologies Used</h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm rounded-full font-mono"
                style={{ backgroundColor: `${project.color}15`, color: project.color }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {project.github && (
            <GlowingButton href={project.github} variant="primary" external>
              <Github className="w-4 h-4" />
              View Code
            </GlowingButton>
          )}
          {project.demo && (
            <GlowingButton href={project.demo} variant="outline" external>
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
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-neon-coral/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-neon-magenta/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-neon-lime/5 rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          accent="Projects"
          title="What I've Built"
          subtitle="Full-stack applications with Spring Boot backends, React frontends, and AI integrations"
        />
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} index={index} />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};
