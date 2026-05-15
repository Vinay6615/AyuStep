import React, { useRef, useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion } from 'motion/react';
import { FileDown, Loader2 } from 'lucide-react';
import { gaitData } from '@/src/constants';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import SensorGrid from './SensorGrid';

const HeatmapFoot = ({ side }: { side: 'left' | 'right' }) => (
  <div className="relative flex flex-col items-center">
    <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-4 font-semibold">{side} Foot Heatmap</div>
    <div className="relative w-32 h-64 rounded-full border border-gray-100 bg-gray-50 flex items-center justify-center shadow-inner overflow-hidden">
      {/* Simulation of heatmap zones */}
      <div className="absolute inset-0 p-4">
        {/* Heel Strike */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.35, 0.5, 0.35] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-brand-purple blur-xl rounded-full" 
        />
        {/* Mid stance */}
        <motion.div 
          animate={{ scale: [1, 1.03, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-24 bg-brand-lavender blur-xl rounded-full" 
        />
        {/* Toe off */}
        <motion.div 
          animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.6, 0.45] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-4 left-1/2 -translate-x-1/2 w-14 h-14 bg-brand-pink blur-xl rounded-full" 
        />
      </div>

      {/* Live Scan Line */}
      <motion.div
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[2px] bg-brand-purple/20 blur-[2px] z-10"
      />
      
      {/* Grid of dots */}
      <div className="grid grid-cols-4 grid-rows-10 gap-2 opacity-30">
        {[...Array(40)].map((_, i) => (
          <motion.div 
            key={i} 
            animate={{ 
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.3, 1],
              backgroundColor: ['#A78BFA', '#8B5CF6', '#A78BFA'],
              boxShadow: [
                '0 0 0px rgba(139, 92, 246, 0)',
                '0 0 6px rgba(139, 92, 246, 0.5)',
                '0 0 0px rgba(139, 92, 246, 0)'
              ]
            }}
            transition={{ 
              duration: 2.5 + Math.random() * 5, 
              repeat: Infinity, 
              ease: [0.4, 0, 0.6, 1],
              delay: Math.random() * 5 
            }}
            className="w-1 h-1 rounded-full cursor-pointer" 
          />
        ))}
      </div>
    </div>
    <div className="mt-4 text-center">
      <div className="text-sm font-bold text-gray-800">Peak: 74.2 psi</div>
      <div className="text-[10px] text-gray-400">Avg load: 38.5%</div>
    </div>
  </div>
);

const MetricBox = ({ label, value, unit, trend }: { label: string, value: string, unit: string, trend?: string }) => (
  <div className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
    <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">{label}</div>
    <div className="flex items-baseline gap-1">
      <span className="text-xl font-bold text-brand-dark">{value}</span>
      <span className="text-xs text-gray-400">{unit}</span>
    </div>
    {trend && (
      <div className="text-[10px] mt-1 text-emerald-500 font-medium">{trend}</div>
    )}
  </div>
);

export default function AnalysisDashboard() {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    
    setIsExporting(true);
    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FAFAFA',
        logging: false,
        onclone: (clonedDoc) => {
          // Robust sanitization for problematic CSS color functions
          const oklRegex = /okl(ch|ab)\s*\([^)]+?\)/gi;
          const fallbackHex = '#71717a';

          const sanitizeString = (str: string) => {
            if (!str) return str;
            return str.replace(oklRegex, fallbackHex);
          };

          // 1. Sanitize all style tags in the head and body
          const styleTags = clonedDoc.querySelectorAll('style');
          styleTags.forEach(tag => {
            if (tag.innerHTML) {
              tag.innerHTML = sanitizeString(tag.innerHTML);
            }
          });

          // 2. Deep sanitize all elements
          const allElements = clonedDoc.querySelectorAll('*');
          allElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            
            // Clean up inline styles
            if (htmlEl.style && htmlEl.style.cssText) {
              htmlEl.style.cssText = sanitizeString(htmlEl.style.cssText);
            }

            // Clean up SVG attributes
            ['fill', 'stroke', 'stop-color', 'color'].forEach(attr => {
              const val = htmlEl.getAttribute(attr);
              if (val && val.match(oklRegex)) {
                htmlEl.setAttribute(attr, fallbackHex);
              }
            });

            // Handle svg filters and backdrop filters specifically
            if (htmlEl.tagName === 'svg' || htmlEl.closest('svg')) {
              htmlEl.style.filter = 'none';
            }

            // Force computed styles that might still be problematic
            try {
              // Note: We use the property name as seen by getComputedStyle
              const style = window.getComputedStyle(htmlEl);
              ['color', 'background-color', 'border-color', 'fill', 'stroke'].forEach(prop => {
                const val = style.getPropertyValue(prop);
                if (val && (val.includes('oklch') || val.includes('oklab'))) {
                  htmlEl.style.setProperty(prop, prop === 'color' ? '#111827' : '#ffffff', 'important');
                }
              });
            } catch (e) {}
          });

          // 3. Inject global overrides to ensure clean capture
          const styles = clonedDoc.createElement('style');
          styles.innerHTML = `
            * {
              color-scheme: light !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              backdrop-filter: none !important;
              filter: none !important;
              transition: none !important;
              animation: none !important;
              box-shadow: none !important;
            }
            .glass-panel {
              background-color: rgba(255, 255, 255, 0.7) !important;
              border-color: rgba(255, 255, 255, 0.2) !important;
            }
            .animate-pulse, .animate-ping, .animate-spin, [class*="blur-"], .blur-xl {
              display: none !important;
            }
            /* Force hide any remaining elements with oklch in background-image (like gradients) */
            [style*="oklch"], [style*="oklab"] {
              background-image: none !important;
              background-color: ${fallbackHex} !important;
            }
          `;
          clonedDoc.head.appendChild(styles);
        }
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('AyuStep-Clinical-Report.pdf');
    } catch (error) {
      console.error('Failed to export PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section id="analysis" className="py-24 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6" ref={reportRef}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-brand-purple font-bold mb-4">03 • Analysis Dashboard</div>
            <h2 className="text-5xl font-serif font-bold text-brand-dark mb-6 tracking-tight">Pressure mapping, in real time.</h2>
            <p className="text-xl text-gray-500 max-w-2xl font-light leading-relaxed">
              A simulated view of how clinicians and patients would see pressure intensity across both feet mapped to the gait cycle.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              onClick={handleExportPDF}
              disabled={isExporting}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-purple text-sm font-bold border border-brand-purple/20 shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isExporting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <FileDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
              )}
              {isExporting ? 'Generating Report...' : 'Export Clinical Report'}
            </button>
            <motion.div 
              animate={{ 
                backgroundColor: ['rgba(16, 185, 129, 0.05)', 'rgba(16, 185, 129, 0.15)', 'rgba(16, 185, 129, 0.05)'],
                borderColor: ['rgba(16, 185, 129, 0.1)', 'rgba(16, 185, 129, 0.3)', 'rgba(16, 185, 129, 0.1)'],
                boxShadow: [
                  '0 0 0px rgba(16, 185, 129, 0)',
                  '0 0 15px rgba(16, 185, 129, 0.2)',
                  '0 0 0px rgba(16, 185, 129, 0)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-emerald-600 text-xs font-bold border whitespace-nowrap"
            >
              <div className="relative flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <div className="absolute w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-50" />
              </div>
              LIVE DEVICE CONNECTED
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Monitor - Heatmaps */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="xl:col-span-2 glass-panel rounded-[2.5rem] p-10 flex flex-col md:flex-row gap-12"
          >
            <div className="flex-1 flex justify-around items-center bg-white/40 rounded-3xl p-8 border border-white">
              <HeatmapFoot side="left" />
              <div className="w-px h-64 bg-gray-100 hidden md:block" />
              <HeatmapFoot side="right" />
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <div className="mb-8">
                <div className="text-xs text-gray-400 uppercase tracking-widest mb-4 font-bold">Key Indicators</div>
                <div className="grid grid-cols-2 gap-4">
                  <MetricBox label="Peak Pressure" value="81" unit="psi" trend="+2.4% vs baseline" />
                  <MetricBox label="Balance Ratio" value="52:48" unit="L/R" />
                  <MetricBox label="Heel Impact" value="12" unit="G" trend="Critical threshold" />
                  <MetricBox label="Arch Support" value="94" unit="%" />
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-zinc-900 text-white flex flex-col gap-2">
                <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">AI Clinical Insight</div>
                <p className="text-sm font-light text-zinc-300 italic">
                  "Detected 14% increase in lateral loading on Right foot during the mid-stance phase. Recommend patient assessment for over-pronation."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Graph Section */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="glass-panel rounded-[2.5rem] p-8 flex flex-col"
          >
            <div className="mb-8 flex justify-between items-start">
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">Gait cycle</div>
                <h3 className="text-xl font-serif font-bold text-brand-dark">Pressure over phases</h3>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-brand-purple" />
                  <span className="text-[10px] text-gray-500 font-bold">LEFT</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-brand-lavender" />
                  <span className="text-[10px] text-gray-500 font-bold">RIGHT</span>
                </div>
              </div>
            </div>
            
            <div className="h-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={gaitData}>
                  <defs>
                    <linearGradient id="colorLeft" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C084FC" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#C084FC" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="phase" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                    dy={10}
                  />
                  <YAxis 
                    hide 
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="left" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorLeft)" 
                    animationDuration={2000}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="right" 
                    stroke="#C084FC" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRight)" 
                    animationDuration={2000}
                    animationDelay={500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-auto pt-6 grid grid-cols-5 gap-1">
              {['H', 'L', 'M', 'T', 'S'].map((letter, i) => (
                <div key={i} className="text-center text-[10px] text-gray-300 font-bold">{letter}</div>
              ))}
            </div>
          </motion.div>
        </div>

        <SensorGrid />
      </div>
    </section>
  );
}
