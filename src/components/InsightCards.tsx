import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, TrendingUp, ShieldAlert, Footprints, Layers, Zap } from 'lucide-react';
import { insights } from '@/src/constants';
import { cn } from '@/src/lib/utils';

const iconMap: Record<string, any> = {
  'Heel region': AlertCircle,
  'Bilateral': TrendingUp,
  'Midfoot': Footprints,
  'Propulsion': Zap,
  'Arch Support': ShieldAlert,
  'Control': Layers,
};

export default function InsightCards() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="text-xs uppercase tracking-widest text-brand-purple font-bold mb-4">04 • Insights</div>
          <h2 className="text-5xl font-serif font-bold text-brand-dark mb-6 tracking-tight">From signals to understanding.</h2>
          <p className="text-xl text-gray-500 max-w-2xl font-light">
            Raw sensor data is translated into plain-language clinical observations a clinician or patient can act on.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((insight, index) => {
            const Icon = iconMap[insight.category] || AlertCircle;
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-3xl border border-gray-100 hover:border-brand-purple/20 bg-white hover:shadow-2xl hover:shadow-brand-purple/5 transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                    insight.severity === 'high' ? "bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white" :
                    insight.severity === 'moderate' ? "bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white" :
                    "bg-brand-lavender/10 text-brand-purple group-hover:bg-brand-purple group-hover:text-white"
                  )}>
                    <Icon size={24} />
                  </div>
                  <div className={cn(
                    "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border",
                    insight.severity === 'high' ? "text-red-500 border-red-100 bg-red-50" :
                    insight.severity === 'moderate' ? "text-amber-600 border-amber-100 bg-amber-50" :
                    "text-brand-purple border-brand-lavender/20 bg-brand-lavender/5"
                  )}>
                    {insight.severity}
                  </div>
                </div>
                
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">
                  {insight.category}
                </div>
                <h3 className="text-xl font-serif font-bold text-brand-dark mb-4 group-hover:text-brand-purple transition-colors">
                  {insight.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light">
                  {insight.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
