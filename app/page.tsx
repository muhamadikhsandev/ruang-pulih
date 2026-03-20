"use client";
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import komponen yang sudah dipisah
// Pakai ../ untuk keluar dari folder app ke root, lalu masuk ke components
import WelcomeScreen from './components/WelcomeScreen';
import AffirmationScreen from './components/AffirmationScreen';
import Chapter1 from './components/Chapter1';
import Chapter2 from './components/Chapter2';
import Chapter3 from './components/Chapter3';
import Chapter4 from './components/Chapter4';
import Chapter5 from './components/Chapter5';
import FinalDashboard from './components/FinalDashboard';

export default function RuangPulih() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // State untuk menyimpan skor dari setiap bab secara terpusat
  const [scores, setScores] = useState({ c1: 0, c2: 0, c3: 0, c4: 0, c5: 0 });
  
  // Trik untuk reset state anak komponen secara instan tanpa loading
  const [resetKey, setResetKey] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setScores({ c1: 0, c2: 0, c3: 0, c4: 0, c5: 0 });
    setResetKey(prev => prev + 1); 
    
    // Scroll balik ke layar pertama
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  return (
    <main className="relative w-full h-dvh overflow-hidden bg-pink-50 font-sans selection:bg-pink-200">
      
      {/* DESKTOP NAVIGATION BUTTONS */}
      <div className="hidden md:flex absolute inset-y-0 left-4 items-center z-50">
        <button onClick={() => scroll('left')} className="p-3 bg-white/50 hover:bg-white rounded-full shadow-lg text-pink-400 transition-all active:scale-90">
          <ChevronLeft size={32} />
        </button>
      </div>
      <div className="hidden md:flex absolute inset-y-0 right-4 items-center z-50">
        <button onClick={() => scroll('right')} className="p-3 bg-white/50 hover:bg-white rounded-full shadow-lg text-pink-400 transition-all active:scale-90">
          <ChevronRight size={32} />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex flex-row w-full h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide scroll-smooth"
      >
        <WelcomeScreen onNext={() => scroll('right')} />
        <AffirmationScreen />
        
        <Chapter1 key={`c1-${resetKey}`} onNext={() => scroll('right')} onScoreUpdate={(val) => setScores(p => ({ ...p, c1: val }))} />
        <Chapter2 key={`c2-${resetKey}`} onNext={() => scroll('right')} onScoreUpdate={(val) => setScores(p => ({ ...p, c2: val }))} />
        <Chapter3 key={`c3-${resetKey}`} onNext={() => scroll('right')} onScoreUpdate={(val) => setScores(p => ({ ...p, c3: val }))} />
        <Chapter4 key={`c4-${resetKey}`} onNext={() => scroll('right')} onScoreUpdate={(val) => setScores(p => ({ ...p, c4: val }))} />
        <Chapter5 key={`c5-${resetKey}`} onNext={() => scroll('right')} onScoreUpdate={(val) => setScores(p => ({ ...p, c5: val }))} />
        
        <FinalDashboard scores={scores} onReset={handleReset} />
      </div>
    </main>
  );
}