
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleCloud = ({ count = 1000 }) => {
  const points = useRef<THREE.Points>(null!);
  
  // Generate random particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [count]);

  // Animate particles
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.1;
    if (points.current) {
      points.current.rotation.x = Math.sin(t / 4);
      points.current.rotation.y = Math.sin(t / 4);
      points.current.rotation.z = Math.sin(t / 4);
    }
  });

  return (
    <Points ref={points} positions={particles} stride={3}>
      <PointMaterial
        transparent
        color="#9b87f5"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  );
};

interface ParticleBackgroundProps {
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ className }) => {
  return (
    <div className={`absolute inset-0 z-0 opacity-60 ${className}`}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleCloud />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
