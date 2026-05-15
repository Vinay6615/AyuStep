import React from 'react';
import { motion } from 'motion/react';
import { Activity, Zap, Layers, ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-purple rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-brand-lavender rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink/30 text-brand-purple text-xs font-semibold mb-6">
            <Activity size={14} />
            <span>Concept Prototype • Health-tech Tech</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-serif font-bold leading-tight mb-6">
            <span className="gradient-text">AyuStep</span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-light text-gray-700 mb-6">
            Smart insole for Arthritis Care
          </h2>

          <p className="text-lg text-gray-500 max-w-xl mb-10 leading-relaxed">
            Visualizing foot pressure and gait patterns to support early diagnosis and better clinical insights. Engineered for precision health.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a 
              href="#design"
              className="bg-brand-purple text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              Explore Design <ChevronRight size={18} />
            </a>
            <a 
              href="#analysis"
              className="bg-white text-gray-800 border border-gray-200 px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-all"
            >
              View Analysis
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-100">
            <div>
              <div className="text-2xl font-bold text-brand-dark mb-1">16</div>
              <div className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Sensor Zones</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-dark mb-1">120<span className="text-sm font-normal text-gray-400">Hz</span></div>
              <div className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Sampling Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-dark mb-1">&lt;2<span className="text-sm font-normal text-gray-400">ms</span></div>
              <div className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Per Insole</div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="glass-panel rounded-[2rem] p-8 overflow-hidden relative border-white/40 bg-zinc-900 shadow-2xl">
            {/* Mock Dashboard Header */}
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
              <div>
                <div className="text-xs text-brand-lavender/60 font-mono mb-1 tracking-widest">SMARTSTEP</div>
                <div className="text-white text-xl font-serif">Arthritis Monitor v2.1</div>
              </div>
              <div className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-1 rounded-sm flex items-center gap-1 border border-emerald-500/30">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE
              </div>
            </div>

            {/* Mock UI Content */}
            <div className="grid grid-cols-2 gap-4 h-[400px]">
              <div className="bg-zinc-800/50 rounded-2xl p-4 flex flex-col items-center justify-center relative border border-white/5">
                <div className="absolute top-3 left-4 text-[10px] text-gray-500 uppercase tracking-widest">Pressure Mask</div>
                {/* Minimal Foot Outline */}
                <div className="w-24 h-48 rounded-full border border-brand-purple/30 relative mt-4">
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-brand-purple/40 blur-md" />
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-lavender/40 blur-lg" />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-zinc-800/50 rounded-2xl p-6 flex-1 border border-white/5">
                   <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Gait Cycle</div>
                   <div className="h-full flex items-end gap-2">
                     {[40, 70, 45, 90, 60, 80].map((h, i) => (
                       <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                        className="flex-1 bg-brand-lavender/40 rounded-t-sm" 
                       />
                     ))}
                   </div>
                </div>
                <div className="bg-zinc-800/50 rounded-2xl p-6 h-1/3 border border-white/5 flex flex-col justify-center">
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Session Duration</div>
                  <div className="text-2xl font-mono text-white">00:14:22</div>
                </div>
              </div>
            </div>
            
            {/* Floating Mini-cards */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -left-8 bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl z-10"
            >
              <div className="text-[10px] text-gray-400 mb-1">Stability Score</div>
              <div className="text-xl font-bold text-white">92%</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
