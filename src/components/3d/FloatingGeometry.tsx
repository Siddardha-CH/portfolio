import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingGeometryProps {
  position?: [number, number, number];
  geometry?: 'box' | 'sphere' | 'torus' | 'octahedron' | 'icosahedron';
  color?: string;
  scale?: number;
  distort?: number;
  speed?: number;
}

export const FloatingGeometry = ({
  position = [0, 0, 0],
  geometry = 'octahedron',
  color = '#00f5ff',
  scale = 1,
  distort = 0.3,
  speed = 1,
}: FloatingGeometryProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
  });

  const getGeometry = () => {
    switch (geometry) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'sphere':
        return <sphereGeometry args={[0.7, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[0.6, 0.25, 16, 32]} />;
      case 'octahedron':
        return <octahedronGeometry args={[0.8]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[0.7]} />;
      default:
        return <octahedronGeometry args={[0.8]} />;
    }
  };

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        {getGeometry()}
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
};
