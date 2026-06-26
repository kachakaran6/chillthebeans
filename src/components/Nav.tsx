import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const { scrollY } = useScroll();

  // Crossfade background from transparent to solid after 80px scroll
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const textColor = useTransform(scrollY, [0, 80], ['#F7EFE3', '#2B1810']);
  
  const navLinks = [
    { name: 'Menu', href: '#menu' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Find Us', href: '#find-us' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['menu', 'reviews', 'find-us'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            return;
          }
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        style={{ 
          backgroundColor: useTransform(bgOpacity, v => `rgba(247, 239, 227, ${v})`),
          color: textColor,
          boxShadow: useTransform(bgOpacity, v => v > 0.8 ? '0 4px 6px -1px rgba(0, 0, 0, 0.05)' : 'none')
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-[60px] md:h-[72px] flex items-center justify-between">
          <a href="#" className="font-display italic text-2xl tracking-tighter" onClick={(e) => { e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'})}}>
            Chill The Beans
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative ${activeSection === link.href.substring(1) ? 'text-caramel' : 'hover:text-caramel'}`}
                >
                  {link.name}
                  {activeSection === link.href.substring(1) && (
                    <motion.div layoutId="underline" className="absolute left-0 right-0 h-0.5 bg-caramel bottom-[-4px]" />
                  )}
                </a>
              ))}
            </div>
            
            <a 
              href="tel:+353830811943" 
              className="bg-caramel text-cream-foam px-5 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition flex items-center space-x-2"
            >
              <Phone size={16} />
              <span>Call Us</span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-cream-foam text-cocoa-dark flex flex-col items-center justify-center space-y-8"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display italic text-4xl"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="tel:+353830811943" 
              className="bg-caramel text-cream-foam px-8 py-3 rounded-full text-lg font-medium mt-8 flex items-center space-x-3"
            >
              <Phone size={20} />
              <span>+353 83 081 1943</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
