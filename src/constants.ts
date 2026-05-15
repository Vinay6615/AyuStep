export interface GaitData {
  phase: string;
  left: number;
  right: number;
}

export const gaitData: GaitData[] = [
  { phase: 'Heel Strike', left: 68, right: 71 },
  { phase: 'Loading', left: 74, right: 70 },
  { phase: 'Mid Stance', left: 62, right: 66 },
  { phase: 'Toe Off', left: 81, right: 77 },
  { phase: 'Swing', left: 49, right: 52 },
];

export interface Insight {
  id: string;
  title: string;
  description: string;
  severity: 'moderate' | 'high' | 'low';
  category: string;
}

export const insights: Insight[] = [
  {
    id: '1',
    title: 'Excess pressure on heel region',
    description: 'Left heel pressure is 15% above normal baseline. Indicators suggest potential gait compensation.',
    severity: 'high',
    category: 'Heel region'
  },
  {
    id: '2',
    title: 'Uneven weight distribution',
    description: 'A 5.4% asymmetry in average load suggests the patient is unconsciously shifting weight.',
    severity: 'moderate',
    category: 'Bilateral'
  },
  {
    id: '3',
    title: 'Midfoot gait imbalance',
    description: 'Pressure profile across the arch deviates from the expected symmetric pattern.',
    severity: 'moderate',
    category: 'Midfoot'
  },
  {
    id: '4',
    title: 'Toe-off phase lag',
    description: 'Delayed propulsion in the left toe region identified during stance-to-swing transition.',
    severity: 'moderate',
    category: 'Propulsion'
  },
  {
    id: '5',
    title: 'Arch instability detected',
    description: 'Metatarsal arch region shows inconsistent loading patterns throughout the mid-stance phase.',
    severity: 'high',
    category: 'Arch Support'
  },
  {
    id: '6',
    title: 'Reduced pronation control',
    description: 'Lateral midfoot load suggests insufficient natural dampening during the loading response.',
    severity: 'low',
    category: 'Control'
  }
];
