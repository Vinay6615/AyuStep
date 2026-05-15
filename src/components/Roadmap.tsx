import React from 'react';
import { motion } from 'motion/react';
import { Milestone, Rocket, Users, Laptop } from 'lucide-react';

const phases = [
  {
    id: '01',
    title: 'Clinical Validation',
    description: 'Pilot testing with orthopedic clinics and real patient data streams to calibrate sensor thresholds.',
    icon: Milestone,
    status: 'In Progress'
  },
  {
    id: '02',
    title: 'AI Gait Prediction',
    description: 'Implementing deep learning models to predict early-stage arthritis progression from gait anomalies.',
    icon: Rocket,
    status: 'Upcoming'
  },
  {
    id: '03',
    title: 'Doctor Dashboard',
    description: 'Web-based clinical interface for multi-patient management and longitudinal health reports.',
    icon: Laptop,
    status: 'Phase 3'
  },
  {
    id: '04',
    title: 'Mobile Companion',
    description: 'Direct-to-patient app for daily pain logging and guided physical therapy exercises.',
    icon: Users,
    status: 'Phase 4'
  }
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-24 bg-zinc-950 text-white relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#3b0764,transparent_60%)] opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20">
          <div className="text-xs uppercase tracking-widest text-brand-lavender font-bold mb-4">06 • Roadmap</div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6">What comes next</h2>
          <p className="text-xl text-zinc-400 max-w-2xl font-light">
            Phased development from concept to clinical-grade product, prioritizing patient safety and data integrity at every stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group p-10 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 hover:border-brand-lavender/30 transition-all hover:bg-zinc-900"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 rounded-2xl bg-brand-purple/20 flex items-center justify-center text-brand-lavender group-hover:scale-110 group-hover:bg-brand-purple group-hover:text-white transition-all">
                  <phase.icon size={28} />
                </div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest border border-zinc-800 px-3 py-1 rounded-full">
                  Phase {phase.id}
                </div>
              </div>
              
              <h3 className="text-2xl font-serif font-bold mb-4 group-hover:text-brand-lavender transition-colors">{phase.title}</h3>
              <p className="text-zinc-400 leading-relaxed font-light mb-8 italic">
                "{phase.description}"
              </p>
              
              <div className="flex items-center gap-2">
                <div className="h-0.5 flex-1 bg-zinc-800 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: phase.status === 'In Progress' ? '40%' : '0%' }}
                    viewport={{ once: true }}
                    className="h-full bg-brand-purple" 
                   />
                </div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{phase.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
