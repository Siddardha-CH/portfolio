import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Float } from '@react-three/drei';
import * as THREE from 'three';

interface CodeBlock3DProps {
  position?: [number, number, number];
  code?: string;
  rotation?: [number, number, number];
  scale?: number;
}

export const CodeBlock3D = ({
  position = [0, 0, 0],
  code = 'const dev = "Siddardha";',
  rotation = [0, 0, 0],
  scale = 1,
}: CodeBlock3DProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + rotation[1];
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
        <RoundedBox args={[4, 1, 0.1]} radius={0.1} smoothness={4}>
          <meshStandardMaterial
            color="#0d1117"
            transparent
            opacity={0.9}
            roughness={0.3}
            metalness={0.5}
          />
        </RoundedBox>
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.18}
          color="#00f5ff"
          font="/fonts/JetBrainsMono-Regular.woff"
          anchorX="center"
          anchorY="middle"
          maxWidth={3.5}
        >
          {code}
        </Text>
        {/* Glow effect */}
        <pointLight position={[0, 0, 0.5]} color="#00f5ff" intensity={0.5} distance={3} />
      </group>
    </Float>
  );
};
