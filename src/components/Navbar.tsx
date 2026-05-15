import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Design', href: '#design' },
    { name: 'Analysis', href: '#analysis' },
    { name: 'How it works', href: '#how-it-works' },
    { name: 'Roadmap', href: '#roadmap' },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-purple flex items-center justify-center transform rotate-12">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="text-xl font-serif font-bold tracking-tight">AyuStep</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-brand-purple transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button className="bg-brand-purple text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-brand-purple/90 transition-shadow shadow-md hover:shadow-lg active:scale-95 transition-transform">
            Start Session
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-gray-700 border-b border-gray-50 pb-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="bg-brand-purple text-white px-6 py-3 rounded-xl text-center font-medium shadow-md">
              Start Session
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
