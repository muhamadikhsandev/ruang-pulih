"use client";
import React, { useState, useRef } from 'react';

// Import komponen
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
  const [scores, setScores] = useState({ c1: 0, c2: 0, c3: 0, c4: 0, c5: 0 });
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
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  return (
    <main className="relative w-full h-dvh overflow-hidden bg-pink-50 font-sans selection:bg-pink-200">
      
      {/* Tombol Navigasi Desktop Dihapus untuk Fokus pada Navigasi Alur (onNext) */}

      <div
        ref={scrollRef}
        className="flex flex-row w-full h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide scroll-smooth"
      >
        {/* Navigasi untuk Welcome */}
        <WelcomeScreen onNext={() => scroll('right')} />
        
        {/* PERBAIKAN: Menambahkan onNext agar fungsi scroll('right') terkirim ke komponen */}
        <AffirmationScreen onNext={() => scroll('right')} />
        
        {/* Navigasi untuk Chapters */}
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