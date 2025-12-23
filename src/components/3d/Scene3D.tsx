import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Environment } from '@react-three/drei';
import { ParticleField } from './ParticleField';

interface Scene3DProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  enableControls?: boolean;
  enableStars?: boolean;
}

export const Scene3D = ({
  children,
  cameraPosition = [0, 0, 10],
  enableControls = false,
  enableStars = true,
}: Scene3DProps) => {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
    >
      <PerspectiveCamera makeDefault position={cameraPosition} fov={60} />
      
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
        <pointLight position={[10, -10, 10]} intensity={0.3} color="#00f5ff" />
        
        {/* Background elements */}
        {enableStars && (
          <Stars
            radius={100}
            depth={50}
            count={3000}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />
        )}
        
        <ParticleField count={1500} size={0.015} color="#00f5ff" spread={40} />
        
        {/* Scene content */}
        {children}
        
        {/* Controls */}
        {enableControls && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        )}
      </Suspense>
    </Canvas>
  );
};
