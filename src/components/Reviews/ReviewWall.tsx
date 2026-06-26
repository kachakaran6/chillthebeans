import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { reviewsData } from '../../data/reviewsData';

const ALL_TAGS = ['hot chocolate', 'protein balls', 'outdoor seating', 'fresh cookies'];

export default function ReviewWall() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredReviews = activeFilter 
    ? reviewsData.filter(r => r.tags.includes(activeFilter))
    : reviewsData;

  return (
    <section id="reviews" className="py-24 bg-oat/30 text-cocoa-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-4xl md:text-5xl mb-6">What Queuers Say</h2>
          
          {/* Filter Chips */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveFilter(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === null 
                  ? 'bg-cocoa-dark text-cream-foam' 
                  : 'bg-white text-cocoa-rich/70 hover:bg-caramel/10'
              }`}
            >
              All
            </button>
            {ALL_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === tag 
                    ? 'bg-cocoa-dark text-cream-foam' 
                    : 'bg-white text-cocoa-rich/70 hover:bg-caramel/10 hover:text-caramel'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Staggered Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((review, index) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1, type: 'spring' }}
                whileHover={{ y: -4, rotate: 1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-oat/50 flex flex-col h-full relative group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-display text-xl">{review.name}</span>
                    {review.isLocalGuide && (
                      <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                        Local Guide
                      </span>
                    )}
                  </div>
                  <div className="flex text-caramel text-sm">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
                
                <p className="font-body font-light text-cocoa-rich/90 leading-relaxed flex-grow">
                  "{review.takeaway}"
                </p>
                
                <div className="mt-6 flex items-center justify-between border-t border-oat pt-4">
                  <span className="text-xs text-cocoa-rich/60">{review.timeAgo}</span>
                  <div className="flex gap-1">
                    {review.tags.map(tag => (
                      <span key={tag} className="text-[10px] bg-oat/50 text-cocoa-dark px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Decorative queue ticket rail motif */}
                <div className="absolute top-4 left-0 w-1 h-8 bg-caramel rounded-r opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 text-center">
          <a 
            href="https://www.google.com/maps/place/Chill+The+Beans+Mungret" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-caramel font-medium hover:text-cocoa-dark transition-colors border-b border-caramel hover:border-cocoa-dark pb-1"
          >
            <span>Read all 170 reviews on Google</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
