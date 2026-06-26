import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

const SteamParticles = () => {
  const count = 120; // 3 streams * 40 particles
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  
  const steamTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    if (context) {
      const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
      // Soft cloud-like gradient
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 128, 128);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  const particles = useMemo(() => {
    const temp = [];
    const streams = [
      { x: -0.15, z: 0.1, cycle: 6.0 },
      { x: 0.1, z: -0.15, cycle: 7.2 },
      { x: 0.2, z: 0.1, cycle: 8.5 }
    ];
    
    for (let i = 0; i < count; i++) {
      const streamIdx = Math.floor(i / 40);
      const stream = streams[streamIdx];
      const phase = (i % 40) / 40;
      
      temp.push({
        baseX: stream.x,
        baseZ: stream.z,
        cycle: stream.cycle,
        phase: phase,
        driftX: (Math.random() - 0.5) * 0.8,
        driftZ: (Math.random() - 0.5) * 0.8,
        rotSpeed: (Math.random() - 0.5) * 1.5,
        baseRot: Math.random() * Math.PI * 2
      });
    }
    return temp;
  }, [count]);

  useFrame(({ clock, camera }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    
    particles.forEach((p, i) => {
      const progress = ((time / p.cycle) + p.phase) % 1;
      
      const y = progress * 4.5; // Rise up
      
      const x = p.baseX + p.driftX * progress + Math.sin(progress * Math.PI * 2 + p.cycle) * 0.4;
      const z = p.baseZ + p.driftZ * progress + Math.cos(progress * Math.PI * 2 + p.cycle) * 0.4;
      
      dummy.position.set(x, y, z);
      
      // Start small, grow large
      let scale = 0.5 + progress * 3.5;
      if (progress < 0.1) {
        scale = scale * (progress / 0.1); 
      }
      
      dummy.scale.set(scale, scale, scale);
      
      // Face camera and tumble
      dummy.quaternion.copy(camera.quaternion);
      dummy.rotateZ(p.baseRot + time * p.rotSpeed);
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      
      // Opacity fade via vertex color (Additive blending)
      // Oat color: #EADFC8 -> RGB(0.91, 0.87, 0.78)
      let opacity = 1;
      if (progress < 0.15) opacity = progress / 0.15; // Fade in
      else if (progress > 0.5) opacity = 1 - ((progress - 0.5) / 0.5); // Fade out slowly
      
      // Keep it subtle
      const intensity = opacity * 0.6;
      color.setRGB(0.91 * intensity, 0.87 * intensity, 0.78 * intensity);
      meshRef.current!.setColorAt(i, color);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined as any, undefined as any, count]} position={[0, 1.2, 0]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial 
        map={steamTexture}
        transparent 
        depthWrite={false} 
        blending={THREE.CustomBlending}
        blendEquation={THREE.AddEquation}
        blendSrc={THREE.SrcAlphaFactor}
        blendDst={THREE.OneFactor}
        blendEquationAlpha={THREE.AddEquation}
        blendSrcAlpha={THREE.ZeroFactor}
        blendDstAlpha={THREE.OneFactor}
        vertexColors={true}
      />
    </instancedMesh>
  );
};

export default function MugScene() {
  const groupRef = useRef<THREE.Group>(null);

  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Parametric heart formula
    for (let t = 0; t <= Math.PI * 2; t += 0.05) {
      const x = (16 * Math.pow(Math.sin(t), 3)) * 0.035;
      const y = (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) * 0.035;
      if (t === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    return shape;
  }, []);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#F7EFE3" />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#C8843A" />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.2}
      />

      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <group ref={groupRef} position={[0, -0.5, 0]}>
          
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[1.8, 1.5, 0.2, 32]} />
            <meshStandardMaterial color="#F7EFE3" roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[1.2, 1.2, 0.05, 32]} />
            <meshStandardMaterial color="#EADFC8" roughness={0.8} />
          </mesh>

          <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1.2, 1.0, 1.4, 32]} />
            <meshStandardMaterial color="#F7EFE3" roughness={0.3} />
          </mesh>
          
          <mesh position={[0, 1.41, 0]}>
            <cylinderGeometry args={[1.15, 1.15, 0.05, 32]} />
            <meshStandardMaterial color="#EADFC8" roughness={0.9} />
          </mesh>

          <mesh position={[0, 1.35, 0]}>
            <cylinderGeometry args={[1.1, 1.1, 0.1, 32]} />
            <meshStandardMaterial color="#5C3A28" roughness={0.2} metalness={0.1} />
          </mesh>
          
          {/* Heart Latte Art */}
          <mesh position={[0, 1.401, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <shapeGeometry args={[heartShape]} />
            <meshStandardMaterial color="#F7EFE3" roughness={0.9} side={THREE.DoubleSide} />
          </mesh>

          <mesh position={[1.2, 0.7, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <torusGeometry args={[0.4, 0.15, 16, 32, Math.PI]} />
            <meshStandardMaterial color="#F7EFE3" roughness={0.3} />
          </mesh>

          <SteamParticles />

        </group>
      </Float>
    </>
  );
}
