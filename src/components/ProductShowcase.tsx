import { useRef, Suspense } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ScrollLinkedCookie = ({ scrollProgress }: { scrollProgress: MotionValue<number> }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      // Rotate exactly one full turn (2 * Math.PI) based on scroll progress
      groupRef.current.rotation.y = scrollProgress.get() * Math.PI * 2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#F7EFE3" />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#C8843A" />
      
      <group ref={groupRef}>
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <cylinderGeometry args={[2, 2.1, 0.5, 32]} />
          <meshStandardMaterial color="#C8843A" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[1.8, 1.9, 0.2, 32]} />
          <meshStandardMaterial color="#5C3A28" roughness={0.3} metalness={0.1} />
        </mesh>
      </group>
    </>
  );
};

export default function ProductShowcase() {
  const containerRef = useRef(null);
  
  // Track scroll progress within this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <section ref={containerRef} className="h-[150vh] bg-cocoa-rich relative">
      {/* Sticky container stays in place while we scroll through the 150vh */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Text */}
          <motion.div 
            style={{ opacity, scale }}
            className="text-cream-foam z-10"
          >
            <h2 className="font-display italic text-5xl md:text-6xl mb-6 text-caramel">
              The Cookie,<br/>Up Close
            </h2>
            <p className="font-body text-xl font-light opacity-90 leading-relaxed max-w-md">
              "Caramel SOS Cookies. The thing people drive for. A soft, caramel-laced cookie that's become this little cafe's calling card — ask any of the 170 reviewers."
            </p>
          </motion.div>

          {/* Right 3D Canvas */}
          <div className="h-[50vh] md:h-[70vh] relative z-0">
            <Suspense fallback={null}>
              <Canvas camera={{ position: [0, 3, 6], fov: 45 }}>
                <ScrollLinkedCookie scrollProgress={scrollYProgress} />
              </Canvas>
            </Suspense>
          </div>

        </div>

      </div>
    </section>
  );
}
