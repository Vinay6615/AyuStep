import React from 'react';
import { motion } from 'motion/react';

interface AnatomyCardProps {
  title: string;
  subtitle: string;
  type: string;
  delay?: number;
}

const AnatomyCard = ({ title, subtitle, type, delay = 0 }: AnatomyCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden"
  >
    <div className="flex justify-between items-start mb-6">
      <div>
        <div className="text-[10px] uppercase tracking-widest text-brand-purple font-bold mb-1">{type}</div>
        <h3 className="text-2xl font-serif font-bold text-brand-dark">{title}</h3>
      </div>
      <div className="text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">CAD v1.2</div>
    </div>
    
    <div className="relative h-64 flex items-center justify-center mb-6">
      {/* Dynamic SVG Illustration based on view type */}
      {title === "Top View" && (
        <svg viewBox="0 0 100 200" className="h-full drop-shadow-2xl">
          <path d="M50,10 C30,10 20,40 20,100 C20,160 35,190 50,190 C65,190 80,160 80,100 C80,40 70,10 50,10 Z" fill="none" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="4 4" className="group-hover:stroke-brand-purple transition-colors" />
          {[...Array(16)].map((_, i) => (
            <circle 
              key={i} 
              cx={30 + Math.random() * 40} 
              cy={30 + Math.random() * 140} 
              r="2" 
              fill="#C084FC" 
              className="animate-pulse" 
              style={{ animationDelay: `${i * 0.2}s` }} 
            />
          ))}
        </svg>
      )}
      {title === "Side View" && (
        <svg viewBox="0 0 200 100" className="w-full drop-shadow-2xl">
          <path d="M10,60 Q10,40 50,40 L150,45 Q190,50 190,80 L10,80 Z" fill="none" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="40" cy="70" r="2" fill="#C084FC" />
          <circle cx="100" cy="72" r="2" fill="#C084FC" />
          <circle cx="160" cy="74" r="2" fill="#C084FC" />
        </svg>
      )}
      {title === "Exploded View" && (
        <div className="relative w-full h-full">
           <motion.div 
            animate={{ y: [-10, 0, -10] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
           >
              <svg viewBox="0 0 100 200" className="h-4/5 opacity-30">
                <path d="M50,10 C30,10 20,40 20,100 C20,160 35,190 50,190 C65,190 80,160 80,100 C80,40 70,10 50,10 Z" fill="#F5D0FE" />
              </svg>
           </motion.div>
           <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
           >
              <svg viewBox="0 0 100 200" className="h-3/5 opacity-60">
                <path d="M50,10 C30,10 20,40 20,100 C20,160 35,190 50,190 C65,190 80,160 80,100 C80,40 70,10 50,10 Z" fill="#C084FC" />
              </svg>
           </motion.div>
           <motion.div 
            animate={{ y: [15, 0, 15] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute inset-0 flex items-center justify-center"
           >
              <svg viewBox="0 0 100 200" className="h-2/5">
                <path d="M50,10 C30,10 20,40 20,100 C20,160 35,190 50,190 C65,190 80,160 80,100 C80,40 70,10 50,10 Z" fill="#8B5CF6" />
              </svg>
           </motion.div>
        </div>
      )}
    </div>
    
    <p className="text-sm text-gray-500 text-center leading-relaxed font-light">
      {subtitle}
    </p>
  </motion.div>
);

export default function AnatomySection() {
  return (
    <section id="design" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="text-xs uppercase tracking-widest text-brand-purple font-bold mb-4">02 • Product Design</div>
          <h2 className="text-5xl font-serif font-bold text-brand-dark mb-6 tracking-tight">Three views, one anatomy.</h2>
          <p className="text-xl text-gray-500 max-w-2xl font-light">
            The insole is engineered around six pressure-sensitive zones — heel, midfoot, metatarsal arch, and toe — laid into a flexible substrate that conforms to the foot's natural curvature.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnatomyCard 
            title="Top View" 
            type="Sensor Topology"
            subtitle="The hexagonal grid layout maximizes coverage across high-impact biomechanical zones."
            delay={0.1}
          />
          <AnatomyCard 
            title="Side View" 
            type="Profile & Contour"
            subtitle="Ultra-thin 1.8mm profile ensures zero interference with standard orthopedic footwear."
            delay={0.2}
          />
          <AnatomyCard 
            title="Exploded View" 
            type="Stack Architecture"
            subtitle="Layered composite material isolates digital noise from physical stress signals."
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
