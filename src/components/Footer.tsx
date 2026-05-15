import React from 'react';

export default function Footer() {
  return (
    <footer className="py-20 bg-brand-bg md:bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-purple flex items-center justify-center transform rotate-12">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight">AyuStep</span>
            </div>
            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed font-light">
              Designing the future of arthritis care through intelligent biomechanical visualization and clinical insights.
            </p>
            <div className="text-xs text-gray-400 font-mono italic">
              "Made with care for smarter clinical insights"
            </div>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-brand-dark mb-6">Product</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="#design" className="text-sm text-gray-500 hover:text-brand-purple transition-colors">Design Specs</a></li>
              <li><a href="#analysis" className="text-sm text-gray-500 hover:text-brand-purple transition-colors">Analytics</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-brand-purple transition-colors">Clinical Study</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-brand-dark mb-6">Company</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="#" className="text-sm text-gray-500 hover:text-brand-purple transition-colors">Research</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-brand-purple transition-colors">Roadmap</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-brand-purple transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
            © 2026 AyuStep Health-Tech. All rights reserved.
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] text-gray-400 hover:text-brand-purple transition-colors uppercase tracking-widest font-bold">Privacy Policy</a>
            <a href="#" className="text-[10px] text-gray-400 hover:text-brand-purple transition-colors uppercase tracking-widest font-bold">Clinical Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
