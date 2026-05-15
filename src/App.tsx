import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnatomySection from './components/AnatomySection';
import AnalysisDashboard from './components/AnalysisDashboard';
import InsightCards from './components/InsightCards';
import Timeline from './components/Timeline';
import Roadmap from './components/Roadmap';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-lavender/30">
      <Navbar />
      <main>
        <Hero />
        <AnatomySection />
        <AnalysisDashboard />
        <InsightCards />
        
        {/* Transitional Section */}
        <section id="how-it-works" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
             <div className="text-xs uppercase tracking-widest text-brand-purple font-bold mb-4 italic">The signal path</div>
             <h2 className="text-4xl font-serif font-bold text-brand-dark mb-12">From Foot to Cloud</h2>
             <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  { n: '01', t: 'Foot', s: 'Pressure sensing' },
                  { n: '02', t: 'Sensors', s: 'Force conversion' },
                  { n: '03', t: 'Edge', s: 'Local compute' },
                  { n: '04', t: 'Signals', s: 'AI Filtering' },
                  { n: '05', t: 'Insights', s: 'Clinical visualization' }
                ].map((step, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-brand-bg border border-gray-100 flex flex-col items-center">
                    <span className="text-[10px] font-mono text-brand-purple mb-4">STEP {step.n}</span>
                    <h4 className="font-serif font-bold text-lg mb-1">{step.t}</h4>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">{step.s}</p>
                  </div>
                ))}
             </div>
          </div>
        </section>

        <Timeline />
        <Roadmap />
      </main>
      <Footer />
    </div>
  );
}
