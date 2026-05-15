import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Activity, Thermometer, ShieldCheck } from 'lucide-react';

const generateMockData = () => {
  return Array.from({ length: 12 }, () => ({
    value: Math.floor(Math.random() * 40) + 20
  }));
};

const SensorCard: React.FC<{ id: number, label: string }> = ({ id, label }) => {
  const [currentVal, setCurrentVal] = useState(Math.floor(Math.random() * 40) + 20);
  const [history] = useState(generateMockData());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVal(prev => {
        const delta = (Math.random() - 0.5) * 5;
        return Math.max(0, Math.min(100, Math.round((prev + delta) * 10) / 10));
      });
    }, 2000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  // Calculate health based on value
  const getStatusColor = (val: number) => {
    if (val > 80) return 'text-red-500 bg-red-50 border-red-100';
    if (val > 60) return 'text-amber-500 bg-amber-50 border-amber-100';
    return 'text-emerald-500 bg-emerald-50 border-emerald-100';
  };

  const statusStyle = getStatusColor(currentVal);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: id * 0.03 }}
      className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow group h-[140px] flex flex-col justify-between"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{label}</div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-gray-800">{currentVal}</span>
            <span className="text-[10px] text-gray-400 font-medium">psi</span>
          </div>
        </div>
        <div className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase border ${statusStyle.split(' ')[0]} ${statusStyle.split(' ')[1]} ${statusStyle.split(' ')[2]}`}>
          {currentVal > 80 ? 'Heavy' : currentVal > 60 ? 'Moderate' : 'Normal'}
        </div>
      </div>

      <div className="h-10 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history}>
            <defs>
              <linearGradient id={`gradient-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={currentVal > 60 ? "#F59E0B" : "#8B5CF6"} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={currentVal > 60 ? "#F59E0B" : "#8B5CF6"} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={currentVal > 60 ? "#F59E0B" : "#8B5CF6"} 
              strokeWidth={1.5}
              fillOpacity={1} 
              fill={`url(#gradient-${id})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between items-center mt-1">
        <div className="flex gap-1">
           <div className={`w-1 h-1 rounded-full ${currentVal > 80 ? 'bg-red-400' : 'bg-emerald-400'} animate-pulse`} />
           <div className="text-[8px] text-gray-400 uppercase font-bold tracking-tighter">Live Telemetry</div>
        </div>
        <Activity size={10} className="text-gray-300" />
      </div>
    </motion.div>
  );
};

export default function SensorGrid() {
  const zones = [
    "Heel (L)", "Midfoot (L)", "Forefoot (L)", "Hallux (L)",
    "Heel (R)", "Midfoot (R)", "Forefoot (R)", "Hallux (R)",
    "Lateral (L)", "Medial (L)", "Metatarsal 1 (L)", "Metatarsal 5 (L)",
    "Lateral (R)", "Medial (R)", "Metatarsal 1 (R)", "Metatarsal 5 (R)"
  ];

  return (
    <div className="mt-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-brand-purple/10 border border-brand-purple/20">
              <ShieldCheck className="text-brand-purple" size={14} />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Multi-Zone Telemetry</span>
          </div>
          <h3 className="text-3xl font-serif font-bold text-brand-dark">Detailed Sensor Array</h3>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Thermometer size={14} className="text-gray-400" />
            <div className="text-[10px] text-gray-500 font-medium">Internal Temp: <span className="font-bold text-gray-800">32.4°C</span></div>
          </div>
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-gray-400" />
            <div className="text-[10px] text-gray-500 font-medium">Sampling rate: <span className="font-bold text-gray-800">500Hz</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {zones.map((zone, i) => (
          <SensorCard key={i} id={i} label={zone} />
        ))}
      </div>
      
      <div className="mt-6 flex flex-wrap gap-4 items-center justify-center p-4 rounded-2xl bg-zinc-50 border border-dashed border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Optimal (&lt;60 psi)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Increased Load (60-80 psi)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Critical (&gt;80 psi)</span>
        </div>
      </div>
    </div>
  );
}
