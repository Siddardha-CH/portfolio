import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface TechIcon {
  name: string;
  color: string;
  orbitRadius: number;
  speed: number;
  startAngle: number;
}

const techIcons: TechIcon[] = [
  { name: 'Java', color: '#f89820', orbitRadius: 3, speed: 0.3, startAngle: 0 },
  { name: 'Python', color: '#3776ab', orbitRadius: 3.5, speed: 0.25, startAngle: Math.PI / 3 },
  { name: 'JS', color: '#f7df1e', orbitRadius: 4, speed: 0.2, startAngle: (2 * Math.PI) / 3 },
  { name: 'Spring', color: '#6db33f', orbitRadius: 4.5, speed: 0.15, startAngle: Math.PI },
  { name: 'SQL', color: '#00758f', orbitRadius: 3.2, speed: 0.35, startAngle: (4 * Math.PI) / 3 },
  { name: 'Git', color: '#f05032', orbitRadius: 3.8, speed: 0.28, startAngle: (5 * Math.PI) / 3 },
];

interface OrbitingIconProps {
  icon: TechIcon;
}

const OrbitingIcon = ({ icon }: OrbitingIconProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const angle = icon.startAngle + state.clock.elapsedTime * icon.speed;
    groupRef.current.position.x = Math.cos(angle) * icon.orbitRadius;
    groupRef.current.position.z = Math.sin(angle) * icon.orbitRadius;
    groupRef.current.position.y = Math.sin(angle * 2) * 0.5;
    groupRef.current.rotation.y = -angle;
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[0.3, 16, 16]}>
        <meshStandardMaterial
          color={icon.color}
          emissive={icon.color}
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.7}
        />
      </Sphere>
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.2}
        color={icon.color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {icon.name}
      </Text>
      <pointLight color={icon.color} intensity={0.3} distance={2} />
    </group>
  );
};

export const TechOrbit = () => {
  const orbitRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!orbitRef.current) return;
    orbitRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={orbitRef}>
      {/* Orbit rings */}
      {[3, 3.5, 4, 4.5].map((radius, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.01, radius + 0.01, 64]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {/* Tech icons */}
      {techIcons.map((icon) => (
        <OrbitingIcon key={icon.name} icon={icon} />
      ))}
    </group>
  );
};
