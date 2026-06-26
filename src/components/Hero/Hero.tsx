import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import CookieScene from './CookieScene';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-cocoa-dark overflow-hidden flex items-center pt-16">
      
      {/* Steam Particles Overlay (Static CSS based for simplicity) */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')]"></div>

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* Left Copy block */}
        <div className="text-cream-foam space-y-6 pt-12 lg:pt-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-px bg-caramel"></div>
              <span className="font-mono text-xs tracking-widest text-caramel">MAIN STREET, CASTLEMUNGRET</span>
            </div>
            
            <h1 className="font-display italic text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter mb-6">
              Chill The<br/>Beans
            </h1>
            
            <p className="font-body text-lg md:text-xl font-light text-oat/90 max-w-md leading-relaxed mb-8">
              The tiny cafe Limerick queues for. Rich hot chocolate, caramel SOS cookies, and the fastest line you'll ever be glad to stand in.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#menu" 
                className="bg-caramel text-cream-foam px-8 py-4 rounded-full font-medium text-center hover:bg-white hover:text-cocoa-dark transition-colors"
              >
                See the menu
              </a>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Chill+The+Beans+Mungret" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border border-oat/30 text-cream-foam px-8 py-4 rounded-full font-medium text-center hover:border-caramel hover:text-caramel transition-colors"
              >
                Get directions
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right 3D Canvas */}
        <div className="h-[50vh] lg:h-[80vh] w-full relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center text-caramel font-mono text-sm">
                Loading...
              </div>
            }>
              <Canvas camera={{ position: [0, 3, 6], fov: 45 }}>
                <CookieScene />
              </Canvas>
            </Suspense>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
