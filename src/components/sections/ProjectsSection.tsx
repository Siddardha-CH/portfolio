import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Brain, Camera, Code2, Layout, ChevronRight, X, ShieldCheck, Bot } from 'lucide-react';
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
  badge?: string;
  github?: string;
  demo?: string;
  features: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'CreditSense — Explainable MSME Credit Risk',
    subtitle: 'Fintech · Team of 3 · 2026',
    badge: 'Featured',
    description: 'Compliance-first credit-risk platform for MSME lending. A rule-based eligibility gate runs ahead of ML scoring, and every decision is explainable and recorded in an append-only audit trail.',
    problem: 'Credit models for small businesses are often black boxes, and lenders need to show why a decision was made and prove nobody changed the record afterwards.',
    solution: 'I owned the security and reliability side of the Spring Boot backend: JWT authentication with rotating refresh tokens, an append-only audit trail, backend tests and CI. I also co-authored the IEEE-format paper. Runs on simulated data.',
    techStack: ['Java 21', 'Spring Boot 3.5', 'PostgreSQL', 'Docker', 'React'],
    icon: <ShieldCheck className="w-8 h-8" />,
    color: '#10b981',
    github: 'https://github.com/CreditSense-s/CreditSense',
    demo: 'https://creditsense-seven.vercel.app',
    features: [
      'Rule-based compliance gate before ML scoring',
      'Explainable, per-decision risk breakdown',
      'JWT auth with rotating refresh tokens',
      'Append-only audit trail',
      'Backend tests + CI pipeline',
      'IEEE-format paper (co-author)',
    ],
  },
  {
    id: 2,
    title: 'SmartAttend — Smart Attendance System',
    subtitle: 'Computer Vision · Solo · 2025',
    description: 'Live webcam attendance with face recognition running in the browser. Spring Boot REST API on PostgreSQL with three roles enforced server-side and Excel report export.',
    problem: 'Manual attendance is slow and open to proxy marking, with no easy audit trail or reporting.',
    solution: 'Built solo. face-api.js runs recognition client-side, the Spring Boot API handles data and roles, and auth uses BCrypt with HMAC-signed session tokens.',
    techStack: ['Java 17', 'Spring Boot 3.5', 'PostgreSQL', 'React', 'face-api.js'],
    icon: <Camera className="w-8 h-8" />,
    color: '#d946ef',
    github: 'https://github.com/Siddardha-CH/SmartAttendenceSystem',
    demo: 'https://smartattend-frontend-q97p.onrender.com',
    features: [
      'In-browser face recognition (face-api.js)',
      '3 roles: Admin / Teacher / Viewer (server-side)',
      'BCrypt + HMAC-signed session tokens',
      '.xlsx attendance reports',
      '11 backend API tests + CI',
      'Deployed on Render',
    ],
  },
  {
    id: 3,
    title: 'CodeRefine — AI Code Review',
    subtitle: 'AI Developer Tool · Feb 2026',
    description: 'Users submit code and get an AI quality score with severity-bucketed issues, powered by prompt-engineered Groq API calls behind a Spring Boot backend.',
    problem: 'Developers want fast, actionable feedback on code quality without waiting for a peer review.',
    solution: 'Spring Boot backend with OAuth2 + JWT, JPA persistence on SQLite and unit tests; structured prompts to the Groq API return a score and issues grouped by severity.',
    techStack: ['Spring Boot', 'Groq API', 'SQLite', 'OAuth2', 'JWT', 'React'],
    icon: <Code2 className="w-8 h-8" />,
    color: '#7c3aed',
    github: 'https://github.com/Siddardha-CH/STRAM',
    features: [
      'AI quality score for submitted code',
      'Issues bucketed by severity',
      'Prompt-engineered Groq API calls',
      'OAuth2 + JWT authentication',
      'JPA persistence (SQLite)',
      'Unit tests',
    ],
  },
  {
    id: 4,
    title: 'DesignMate — AI Interview Practice',
    subtitle: 'AI Learning Tool · Solo · 2026',
    description: 'Three-mode interview practice app that streams LLM output token by token over SSE through a serverless proxy, so the API key never reaches the browser.',
    problem: 'Interview prep needs interactive, guided practice, not just reading articles.',
    solution: 'Built and deployed solo. Rebuilt the core flows by hand after an AI-generated scaffold proved unfit. Used by a small group of outside users.',
    techStack: ['React 18', 'Groq API', 'Vercel Serverless', 'SSE'],
    icon: <Layout className="w-8 h-8" />,
    color: '#22d3ee',
    github: 'https://github.com/Siddardha-CH/designmate',
    demo: 'https://designmate-delta.vercel.app',
    features: [
      '3 practice modes',
      'Token-by-token streaming over SSE',
      'API key kept server-side in a serverless proxy',
      'Core flows rebuilt by hand',
      'Live on Vercel',
      'Used by outside users',
    ],
  },
  {
    id: 5,
    title: 'AI Loan Status Agent',
    subtitle: 'AGENTX Hackathon · Team of 3 · 2025',
    badge: 'Runner-Up',
    description: 'Conversational loan-status agent built on Salesforce Agentforce. Runner-up in the finance domain at the AGENTX Hackathon.',
    problem: 'An LLM answering loan questions can invent figures, which is unacceptable for financial data.',
    solution: 'Agentforce handles the conversation while a separate Apex class does deterministic data lookups, so the LLM never makes up loan data.',
    techStack: ['Salesforce Agentforce', 'Apex', 'Data Cloud'],
    icon: <Bot className="w-8 h-8" />,
    color: '#eab308',
    features: [
      'Runner-up, finance domain (AGENTX)',
      'Agentforce conversation layer',
      'Deterministic Apex data lookups',
      'No LLM-invented loan data',
    ],
  },
  {
    id: 6,
    title: 'MSME Credit Assessment System',
    subtitle: 'Backend · Fintech',
    description: 'Spring Boot backend for assessing MSME creditworthiness, backed by MySQL and tested with JUnit.',
    problem: 'Small businesses are often hard to assess with traditional credit data alone.',
    solution: 'A Java + Spring Boot service with MySQL persistence and JUnit tests for the assessment logic.',
    techStack: ['Java', 'Spring Boot', 'MySQL', 'JUnit'],
    icon: <Brain className="w-8 h-8" />,
    color: '#f97316',
    github: 'https://github.com/Siddardha-CH/Manager-AI',
    features: [
      'Spring Boot REST backend',
      'MySQL persistence',
      'JUnit-tested assessment logic',
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
        {project.badge && (
          <span
            className="absolute top-6 right-6 px-2.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider"
            style={{ backgroundColor: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}
          >
            {project.badge}
          </span>
        )}
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
          <div className="flex items-center gap-3 mt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all hover:scale-105"
                style={{ backgroundColor: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}
              >
                <Github className="w-3.5 h-3.5" />
                Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all hover:scale-105"
                style={{ backgroundColor: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
            <span className="flex items-center gap-1.5 text-xs font-medium ml-auto transition-colors" style={{ color: project.color }}>
              Details
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
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
          subtitle="Secure Spring Boot backends, AI integrations, and a hackathon runner-up Salesforce agent"
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
