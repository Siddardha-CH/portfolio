import { useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { SectionTitle } from '@/components/ui/SectionTitle';

interface Skill {
  name: string;
  category: string;
  proficiency: number;
  color: string;
  description: string;
}

const skillsData: Skill[] = [
  // Programming Languages
  { name: 'Java', category: 'Languages', proficiency: 90, color: '#f89820', description: 'Primary language for backend and DSA' },
  { name: 'Python', category: 'Languages', proficiency: 80, color: '#3776ab', description: 'Scripting and ML projects' },
  { name: 'JavaScript', category: 'Languages', proficiency: 75, color: '#f7df1e', description: 'Web development and interactivity' },
  { name: 'C', category: 'Languages', proficiency: 70, color: '#00599c', description: 'Systems programming fundamentals' },
  
  // Backend
  { name: 'Spring Boot', category: 'Backend', proficiency: 85, color: '#6db33f', description: 'Enterprise Java applications' },
  { name: 'REST APIs', category: 'Backend', proficiency: 85, color: '#00f5ff', description: 'RESTful service design' },
  { name: 'JPA/Hibernate', category: 'Backend', proficiency: 80, color: '#59666c', description: 'Object-relational mapping' },
  { name: 'MySQL', category: 'Backend', proficiency: 85, color: '#00758f', description: 'Relational database management' },
  
  // Frontend
  { name: 'HTML', category: 'Frontend', proficiency: 90, color: '#e34f26', description: 'Semantic markup structure' },
  { name: 'CSS', category: 'Frontend', proficiency: 85, color: '#1572b6', description: 'Styling and layouts' },
  { name: 'React', category: 'Frontend', proficiency: 70, color: '#61dafb', description: 'Component-based UI development' },
  
  // Tools
  { name: 'Git', category: 'Tools', proficiency: 85, color: '#f05032', description: 'Version control and collaboration' },
  { name: 'GitHub', category: 'Tools', proficiency: 90, color: '#ffffff', description: 'Code hosting and CI/CD' },
  { name: 'Linux', category: 'Tools', proficiency: 75, color: '#fcc624', description: 'Command line and scripting' },
  
  // Core CS
  { name: 'DSA', category: 'Core', proficiency: 90, color: '#8b5cf6', description: 'Data Structures & Algorithms' },
  { name: 'OOP', category: 'Core', proficiency: 90, color: '#ec4899', description: 'Object-Oriented Programming' },
];

const categories = ['All', 'Languages', 'Backend', 'Frontend', 'Tools', 'Core'];

interface SkillOrb3DProps {
  skill: Skill;
  position: [number, number, number];
  isHovered: boolean;
  onHover: (skill: Skill | null) => void;
}

const SkillOrb3D = ({ skill, position, isHovered, onHover }: SkillOrb3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const scale = 0.3 + (skill.proficiency / 100) * 0.4;

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    if (isHovered) {
      meshRef.current.scale.lerp(new THREE.Vector3(scale * 1.3, scale * 1.3, scale * 1.3), 0.1);
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onPointerOver={() => onHover(skill)}
          onPointerOut={() => onHover(null)}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={isHovered ? 0.8 : 0.3}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={isHovered ? 1 : 0.8}
          />
        </mesh>
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.3}
          color={skill.color}
          anchorX="center"
          anchorY="middle"
        >
          {skill.name}
        </Text>
        {isHovered && (
          <pointLight color={skill.color} intensity={2} distance={5} />
        )}
      </group>
    </Float>
  );
};

const SkillsGalaxy3D = ({ 
  skills, 
  hoveredSkill, 
  onHover 
}: { 
  skills: Skill[]; 
  hoveredSkill: Skill | null;
  onHover: (skill: Skill | null) => void;
}) => {
  const positions = skills.map((_, i) => {
    const angle = (i / skills.length) * Math.PI * 2;
    const radius = 4 + Math.random() * 2;
    const y = (Math.random() - 0.5) * 4;
    return [
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius,
    ] as [number, number, number];
  });

  return (
    <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        {skills.map((skill, i) => (
          <SkillOrb3D
            key={skill.name}
            skill={skill}
            position={positions[i]}
            isHovered={hoveredSkill?.name === skill.name}
            onHover={onHover}
          />
        ))}
      </Suspense>
    </Canvas>
  );
};

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const filteredSkills = activeCategory === 'All' 
    ? skillsData 
    : skillsData.filter(s => s.category === activeCategory);

  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-space-nebula/20 to-background" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          accent="Skills"
          title="Tech Universe"
          subtitle="Technologies and tools I use to bring ideas to life"
        />

        {/* Category filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full font-mono text-sm transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-neon-coral text-space-void glow-coral'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* 3D Galaxy and Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* 3D View */}
          <div className="h-[500px] rounded-2xl overflow-hidden glass">
            <SkillsGalaxy3D
              skills={filteredSkills}
              hoveredSkill={hoveredSkill}
              onHover={setHoveredSkill}
            />
          </div>

          {/* Skills Grid */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ delay: index * 0.05 }}
                  className={`glass rounded-xl p-4 transition-all duration-300 cursor-pointer ${
                    hoveredSkill?.name === skill.name ? 'scale-[1.02]' : ''
                  }`}
                  style={{
                    boxShadow: hoveredSkill?.name === skill.name 
                      ? `0 0 30px ${skill.color}40` 
                      : 'none',
                  }}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: skill.color }}
                      />
                      <span className="font-display font-semibold text-foreground">
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
                  
                  {/* Progress bar */}
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 1, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    />
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-2">
                    {skill.description}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
