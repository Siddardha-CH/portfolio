import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars, Float, Text, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import { Github, Linkedin, Code2, ChevronDown, MapPin } from 'lucide-react';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { GlowingButton } from '@/components/ui/GlowingButton';
import { ParticleField } from '@/components/3d/ParticleField';
import { FloatingGeometry } from '@/components/3d/FloatingGeometry';
import { TechOrbit } from '@/components/3d/TechOrbit';

const HeroScene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={60} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00f5ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
      
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
      <ParticleField count={1500} size={0.02} color="#00f5ff" spread={50} />
      
      {/* Floating geometries */}
      <FloatingGeometry position={[-6, 3, -5]} geometry="octahedron" color="#00f5ff" scale={0.8} />
      <FloatingGeometry position={[7, -2, -3]} geometry="icosahedron" color="#8b5cf6" scale={0.6} />
      <FloatingGeometry position={[-5, -3, -4]} geometry="torus" color="#10b981" scale={0.5} />
      <FloatingGeometry position={[5, 4, -6]} geometry="box" color="#f59e0b" scale={0.4} />
      
      {/* Tech orbit */}
      <TechOrbit />
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
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const roles = [
    'Full Stack Developer',
    'Software Engineer Aspirant',
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

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-20 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
        >
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground font-mono">Hyderabad, India</span>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="text-lg md:text-xl text-muted-foreground font-mono tracking-wider">
            {'// Hello, I am'}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mt-2 mb-4">
            <span className="text-foreground">Siddardha</span>
            <br />
            <span className="text-primary text-glow-cyan">Chiluveru</span>
          </h1>
        </motion.div>

        {/* Typewriter roles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="h-10 md:h-12 flex items-center justify-center mb-8"
        >
          <TypewriterText
            texts={roles}
            className="text-xl md:text-2xl lg:text-3xl font-body text-secondary font-medium"
            speed={80}
            delay={1500}
          />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-8 mb-10"
        >
          <div className="glass px-6 py-4 rounded-xl">
            <AnimatedCounter
              target={500}
              suffix="+"
              className="text-4xl md:text-5xl font-display font-bold text-primary text-glow-cyan"
            />
            <p className="text-sm text-muted-foreground mt-1">LeetCode Problems</p>
          </div>
          <div className="glass px-6 py-4 rounded-xl">
            <AnimatedCounter
              target={10}
              suffix="+"
              className="text-4xl md:text-5xl font-display font-bold text-secondary"
            />
            <p className="text-sm text-muted-foreground mt-1">Projects Built</p>
          </div>
          <div className="glass px-6 py-4 rounded-xl">
            <AnimatedCounter
              target={3}
              suffix="+"
              className="text-4xl md:text-5xl font-display font-bold text-neon-green"
            />
            <p className="text-sm text-muted-foreground mt-1">Years Coding</p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <GlowingButton href="https://github.com" variant="cyan" external>
            <Github className="w-5 h-5" />
            GitHub
          </GlowingButton>
          <GlowingButton href="https://linkedin.com" variant="purple" external>
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </GlowingButton>
          <GlowingButton href="https://leetcode.com" variant="green" external>
            <Code2 className="w-5 h-5" />
            LeetCode
          </GlowingButton>
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
            <span className="text-xs font-mono tracking-wider">SCROLL TO EXPLORE</span>
            <ChevronDown className="w-6 h-6 text-primary" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
