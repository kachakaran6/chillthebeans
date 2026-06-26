import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuData, MenuItem } from '../../data/menuData';

const categories = [
  { id: 'hot-drinks', label: 'Hot Drinks' },
  { id: 'chill-drinks', label: 'Iced & Chill Drinks' },
  { id: 'smoothie-bowls', label: 'Smoothie Bowls' },
  { id: 'ice-cream', label: 'Ice Cream Range' },
  { id: 'treats', label: 'Treats & Snacks' },
  { id: 'addons', label: 'Extras & Add-ons' },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  // Fallback in case of HMR or stale state where activeCategory no longer exists
  const activeCatExists = categories.some(c => c.id === activeCategory);
  const currentCategory = activeCatExists ? activeCategory : categories[0].id;

  const filteredMenu = menuData.filter(item => item.category === currentCategory);

  return (
    <section id="menu" className="py-24 bg-cream-foam text-cocoa-dark relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-4xl md:text-5xl mb-12 md:mb-20 text-center">Behind the Counter</h2>
        
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Vertical Tabs (Desktop) / Horizontal Scroll (Mobile) */}
          <div className="md:w-1/4 flex md:flex-col overflow-x-auto md:overflow-visible pb-4 md:pb-0 gap-4 md:gap-2 snap-x hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`snap-start whitespace-nowrap px-6 py-4 md:px-4 md:py-4 text-left transition-all rounded-xl md:rounded-r-none relative md:border-r-2 ${
                  currentCategory === cat.id 
                    ? 'text-caramel font-medium border-caramel bg-oat/50' 
                    : 'text-cocoa-rich/70 hover:text-cocoa-dark border-transparent hover:bg-oat/30'
                }`}
              >
                <span className="font-display text-xl">{cat.label}</span>
                {currentCategory === cat.id && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-1 md:h-auto md:top-0 md:bottom-0 md:right-[-2px] md:left-auto md:w-1 bg-caramel"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="md:w-3/4">
            <motion.div 
              layout
              className="grid sm:grid-cols-2 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredMenu.map((item: MenuItem, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-oat/50 hover:border-caramel/30 group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-lg text-cocoa-dark group-hover:text-caramel transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-mono text-sm font-medium text-cocoa-rich/80">
                        {item.price ? `€${item.price}` : 'Ask inside'}
                      </span>
                    </div>
                    <p className="text-sm opacity-80 leading-relaxed font-light font-body">
                      {item.description}
                    </p>
                    {item.mostLoved && (
                      <div className="mt-4 inline-flex items-center space-x-1 bg-caramel/10 text-caramel px-2 py-1 rounded text-xs font-medium">
                        <span>🔥</span>
                        <span>Most loved</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
