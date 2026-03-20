"use client";
import React, { useState } from 'react';
import { MessageCircleHeart } from 'lucide-react';

export default function AffirmationScreen() {
  const [affirmation, setAffirmation] = useState("Klik ikon di bawah untuk pesan hangat...");
  const affirmations = [
    "Kamu sudah berusaha hebat hari ini! 🌟",
    "Istirahat bukan berarti kalah, kamu butuh jeda. ☕",
    "Inner child-mu bangga melihatmu sekarang. 🧸",
    "Tidak apa-apa untuk tidak menjadi sempurna. ✨",
    "Hari esok adalah kesempatan baru untuk mekar. 🌱"
  ];

  const nextAffirmation = () => {
    const random = affirmations[Math.floor(Math.random() * affirmations.length)];
    setAffirmation(random);
  };

  return (
    <section className="min-w-full h-full snap-start flex flex-col items-center justify-center p-8 bg-gradient-to-b from-orange-50 to-orange-100/50 relative overflow-hidden">
      <div className="absolute top-20 left-[-10%] w-72 h-72 bg-orange-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-[-10%] w-72 h-72 bg-rose-200/20 rounded-full blur-3xl" />
      
      <div className="max-w-md w-full text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-8">
          <h2 className="text-3xl font-black text-orange-800 tracking-tight">Kotak Pesan Hangat</h2>
          <span className="text-3xl animate-bounce">💌</span>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-orange-200 rounded-[3rem] rotate-3 scale-105 opacity-50 group-hover:rotate-0 transition-transform duration-500" />
          <div className="relative bg-white/80 backdrop-blur-sm p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(251,146,60,0.2)] border-2 border-white mb-10 min-h-[220px] flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2">
            <p className="text-xl md:text-2xl text-orange-900 font-semibold italic leading-relaxed animate-in fade-in zoom-in duration-500">
              "{affirmation}"
            </p>
          </div>
        </div>

        <div className="relative inline-block">
          <button onClick={nextAffirmation} className="relative z-10 bg-orange-500 hover:bg-orange-600 text-white p-6 rounded-full shadow-[0_10px_25px_rgba(249,115,22,0.4)] transition-all active:scale-90 hover:scale-110 group">
            <MessageCircleHeart size={36} className="group-hover:rotate-12 transition-transform" />
          </button>
          <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-20" />
        </div>
        
        <div className="mt-6 space-y-1">
          <p className="text-orange-600 font-bold text-sm tracking-wide uppercase">Ketuk untuk memeluk pesan baru</p>
        </div>
      </div>
      <div className="absolute top-1/4 right-10 opacity-20 rotate-12"><MessageCircleHeart size={40} className="text-orange-400" /></div>
      <div className="absolute bottom-1/4 left-10 opacity-20 -rotate-12"><MessageCircleHeart size={32} className="text-orange-300" /></div>
    </section>
  );
}