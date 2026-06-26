import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function CookieScene() {
  const groupRef = useRef<THREE.Group>(null);

  // Idle rotation
  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#F7EFE3" />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#C8843A" />
      
      {/* Controls */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
      />

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={groupRef}>
          {/* Placeholder for SOS Cookie Model */}
          {/* Base cookie */}
          <mesh castShadow receiveShadow position={[0, 0, 0]}>
            <cylinderGeometry args={[2, 2.1, 0.5, 32]} />
            <meshStandardMaterial color="#C8843A" roughness={0.8} />
          </mesh>
          {/* Caramel Drip (Placeholder) */}
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[1.8, 1.9, 0.2, 32]} />
            <meshStandardMaterial color="#5C3A28" roughness={0.3} metalness={0.1} />
          </mesh>
          {/* Plate */}
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[2.8, 2.5, 0.1, 32]} />
            <meshStandardMaterial color="#F7EFE3" roughness={0.1} />
          </mesh>
        </group>
      </Float>
    </>
  );
}
