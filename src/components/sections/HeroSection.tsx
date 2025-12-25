import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import { Github, Linkedin, Code2, ChevronDown, MapPin, ArrowRight } from 'lucide-react';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { GlowingButton } from '@/components/ui/GlowingButton';
import { ParticleField } from '@/components/3d/ParticleField';
import { FloatingGeometry } from '@/components/3d/FloatingGeometry';

const HeroScene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={60} />
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ffffff" />
      
      <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={0.3} />
      <ParticleField count={2000} size={0.015} color="#ffffff" spread={60} />
      
      {/* Minimal floating geometries - all white/gray */}
      <FloatingGeometry position={[-7, 3, -8]} geometry="octahedron" color="#ffffff" scale={0.6} />
      <FloatingGeometry position={[8, -3, -6]} geometry="icosahedron" color="#888888" scale={0.5} />
      <FloatingGeometry position={[-5, -4, -5]} geometry="torus" color="#ffffff" scale={0.4} />
      <FloatingGeometry position={[6, 5, -10]} geometry="box" color="#666666" scale={0.35} />
    </>
  );
};

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const roles = [
    'Full Stack Developer',
    'Software Engineer',
    'DSA Enthusiast',
    'Problem Solver',
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg z-10 pointer-events-none opacity-50" />
      
      {/* Gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-background/80 z-10 pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-20 text-center px-4 max-w-6xl mx-auto"
      >
        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8"
        >
          <MapPin className="w-4 h-4 text-foreground/70" />
          <span className="text-sm text-muted-foreground font-mono tracking-wider">HYDERABAD, INDIA</span>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-wider mb-2">
            <span className="text-foreground">SIDDARDHA</span>
          </h1>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-wider">
            <span className="text-outline">CHILUVERU</span>
          </h2>
        </motion.div>

        {/* Typewriter roles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="h-10 md:h-12 flex items-center justify-center my-8"
        >
          <span className="text-muted-foreground font-mono mr-2">{'//'}</span>
          <TypewriterText
            texts={roles}
            className="text-lg md:text-xl lg:text-2xl font-mono text-foreground/80"
            speed={80}
            delay={1500}
          />
        </motion.div>

        {/* Stats - minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-12 mb-12"
        >
          <div className="text-center">
            <AnimatedCounter
              target={500}
              suffix="+"
              className="text-5xl md:text-6xl font-display font-bold text-foreground text-glow"
            />
            <p className="text-xs text-muted-foreground mt-2 font-mono tracking-widest uppercase">LeetCode Problems</p>
          </div>
          <div className="text-center">
            <AnimatedCounter
              target={10}
              suffix="+"
              className="text-5xl md:text-6xl font-display font-bold text-foreground text-glow"
            />
            <p className="text-xs text-muted-foreground mt-2 font-mono tracking-widest uppercase">Projects</p>
          </div>
          <div className="text-center">
            <AnimatedCounter
              target={3}
              suffix="+"
              className="text-5xl md:text-6xl font-display font-bold text-foreground text-glow"
            />
            <p className="text-xs text-muted-foreground mt-2 font-mono tracking-widest uppercase">Years Coding</p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <GlowingButton href="https://github.com" variant="primary" external>
            <Github className="w-5 h-5" />
            GitHub
          </GlowingButton>
          <GlowingButton href="https://linkedin.com" variant="outline" external>
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </GlowingButton>
          <GlowingButton href="https://leetcode.com" variant="ghost" external>
            <Code2 className="w-5 h-5" />
            LeetCode
          </GlowingButton>
        </motion.div>

        {/* View Work Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <a href="#projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
            <span className="font-mono text-sm tracking-wider">VIEW MY WORK</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-foreground/50 to-foreground" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};