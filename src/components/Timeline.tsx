import React from 'react';
import { motion } from 'motion/react';
import { Users, Target, Lightbulb, Box, CheckCircle } from 'lucide-react';

const steps = [
  {
    title: 'Empathize',
    icon: Users,
    description: 'Understanding the daily walking pain experienced by arthritis patients.'
  },
  {
    title: 'Define',
    icon: Target,
    description: 'Identifying the need for passive, continuous monitoring outside the clinic.'
  },
  {
    title: 'Ideate',
    icon: Lightbulb,
    description: 'Exploring the smart insole concept as a non-intrusive form factor.'
  },
  {
    title: 'Prototype',
    icon: Box,
    description: 'CAD modeling and building multi-layer sensor flexible circuits.'
  },
  {
    title: 'Test',
    icon: CheckCircle,
    description: 'Simulated pressure analysis data feeds for clinical validation.'
  }
];

export default function Timeline() {
  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Decorative vertical line for mobile */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 w-0.5 h-3/4 bg-gray-200 md:hidden" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <div className="text-xs uppercase tracking-widest text-brand-purple font-bold mb-4">05 • Design Thinking</div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-brand-dark mb-6">From empathy to prototype</h2>
        </div>

        <div className="hidden md:flex relative items-start justify-between">
          {/* Horizontal connecting line */}
          <div className="absolute top-12 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
          
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex-1 flex flex-col items-center px-4 text-center group"
            >
              <div className="w-24 h-24 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center mb-8 relative group-hover:border-brand-purple group-hover:scale-110 transition-all shadow-sm group-hover:shadow-brand-purple/20">
                <step.icon size={32} className="text-gray-400 group-hover:text-brand-purple transition-colors" />
                <div className="absolute -top-4 -right-2 w-8 h-8 rounded-full bg-brand-purple text-white text-[10px] flex items-center justify-center font-bold">
                  0{index + 1}
                </div>
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-dark mb-4">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-light">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile Vertical View */}
        <div className="md:hidden flex flex-col gap-12 pl-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-16 top-0 w-12 h-12 rounded-full bg-brand-purple text-white flex items-center justify-center font-bold">
                0{index + 1}
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-dark mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-light">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
