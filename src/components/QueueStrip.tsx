import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const AnimatedCounter = ({ from = 0, to, duration = 1.5 }: { from?: number, to: number, duration?: number }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let start = performance.now();
    let animationFrame: number;

    const animate = (time: number) => {
      const progress = Math.min((time - start) / (duration * 1000), 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(from + (to - from) * easeProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);

  return <span>{count}</span>;
};

export default function QueueStrip() {
  return (
    <section className="bg-cocoa-dark text-cream-foam py-12 relative overflow-hidden">
      {/* Animated Queue Line (Top & Bottom borders) */}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute top-0 left-0 right-0 h-px bg-caramel origin-left opacity-30" 
      />
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-caramel origin-left opacity-30" 
      />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 divide-x divide-cocoa-rich/50 text-center">
        <div className="flex flex-col items-center justify-center space-y-1">
          <div className="font-display text-4xl md:text-5xl text-caramel flex items-baseline">
            <span className="text-2xl mr-1">★</span> 
            <span>4.8</span>
          </div>
          <div className="font-mono text-xs tracking-widest text-oat/70">RATING</div>
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-1">
          <div className="font-display text-4xl md:text-5xl text-caramel">
            <AnimatedCounter to={170} />
          </div>
          <div className="font-mono text-xs tracking-widest text-oat/70">REVIEWS</div>
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-1">
          <div className="font-display text-2xl md:text-4xl text-caramel">
            €1–10
          </div>
          <div className="font-mono text-xs tracking-widest text-oat/70">PER PERSON</div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-12 px-6 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-body text-lg md:text-xl text-oat italic font-light leading-relaxed"
        >
          "Regulars say the queue used to stretch out the door — now the line moves fast, and the hot chocolate is still the reason they keep coming back."
        </motion.p>
      </div>
    </section>
  );
}
