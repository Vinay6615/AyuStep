import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, TrendingDown, Clock, Activity, Zap, ChevronRight, Target } from 'lucide-react';

const FutureInsight = ({ title, desc, timeframe, impact }: { title: string, desc: string, timeframe: string, impact: 'low' | 'med' | 'high' }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    className="p-4 rounded-2xl bg-white/50 border border-white/20 backdrop-blur-sm hover:translate-x-1 transition-transform"
  >
    <div className="flex justify-between items-start mb-2">
      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-purple">{timeframe} PROJECTION</span>
      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
        impact === 'high' ? 'bg-red-50 text-red-500' : 
        impact === 'med' ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-500'
      }`}>
        {impact} impact
      </span>
    </div>
    <h4 className="text-sm font-bold text-gray-800 mb-1">{title}</h4>
    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
  </motion.div>
);

export default function GaitPredictionPanel() {
  const [scanning, setScanning] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setScanning(false);
            return 100;
          }
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [scanning]);

  return (
    <div className="bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 text-white overflow-hidden relative group">
      {/* Background AI Grid Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-brand-purple/20 flex items-center justify-center border border-brand-purple/30">
              <Brain className="text-brand-purple animate-pulse" size={20} />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-lavender/60">AyuStep AI Engine v4.2</div>
              <h3 className="text-2xl font-serif font-bold text-white">Predictive Gait Analysis</h3>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-xl">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-gray-400">MODEL CONFIDENCE</span>
                <span className="text-xs font-mono text-brand-purple">98.4%</span>
              </div>
              
              <div className="mb-8 relative">
                 <div className="h-1.5 w-full bg-zinc-700 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: scanning ? `${progress}%` : '100%' }}
                      className="h-full bg-gradient-to-r from-brand-purple to-brand-lavender"
                    />
                 </div>
                 {scanning && (
                   <motion.div 
                     animate={{ x: ['-20%', '120%'] }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                     className="absolute top-0 w-20 h-full bg-white/20 blur-md pointer-events-none"
                   />
                 )}
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase mb-2">Fatigue Index</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-serif font-bold">14.2</span>
                    <TrendingDown size={14} className="text-emerald-500" />
                  </div>
                  <div className="text-[10px] text-emerald-500 mt-1">Low risk detected</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase mb-2">Injury Probability</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-serif font-bold">3%</span>
                    <Activity size={14} className="text-blue-400" />
                  </div>
                  <div className="text-[10px] text-blue-400 mt-1">Normal threshold</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-800/30 border border-zinc-700/30 flex items-center gap-3">
                <Clock size={16} className="text-gray-500" />
                <div className="text-[10px] text-gray-400 font-bold uppercase">7.2hr continuous</div>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-800/30 border border-zinc-700/30 flex items-center gap-3">
                <Zap size={16} className="text-brand-purple" />
                <div className="text-[10px] text-gray-400 font-bold uppercase">Live learning</div>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-800/30 border border-zinc-700/30 flex items-center gap-3">
                <Target size={16} className="text-brand-lavender" />
                <div className="text-[10px] text-gray-400 font-bold uppercase">Personalized</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
           <div className="flex items-center justify-between mb-4">
             <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Future Projections</h4>
             <button className="text-[10px] font-bold text-brand-purple hover:text-brand-lavender transition-colors flex items-center gap-1 group">
               VIEW FULL PDF REPORT <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
             </button>
           </div>

           <div className="space-y-3 lg:max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              <FutureInsight 
                timeframe="2-WEEK"
                impact="med"
                title="Potential Achilles Strain Risk"
                desc="Current foot placement pattern suggests a slow shift towards forefoot striking. If maintained, a 22% increase in calf muscle engagement is predicted, potentially leading to strain within 14 days."
              />
              <FutureInsight 
                timeframe="1-MONTH"
                impact="low"
                title="Gait Synchronization Improvement"
                desc="Consistently decreasing side-to-side asymmetry. Baseline of 8% is projected to drop to 3% by next month, indicating successful post-op recovery pace."
              />
              <FutureInsight 
                timeframe="3-MONTH"
                impact="high"
                title="Footbed Compression Warning"
                desc="Based on average daily steps (12k) and local heat density, mid-sole cushioning at the lateral arch will likely lose 40% efficiency. Replacement recommended by August."
              />
           </div>
        </div>
      </div>

      {/* Futuristic Aura */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-purple/10 blur-[100px] rounded-full" />
    </div>
  );
}
