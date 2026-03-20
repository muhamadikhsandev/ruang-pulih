"use client";
import React, { useState } from 'react';
import { Stars, ArrowRight, Sparkles } from 'lucide-react';

export default function Chapter4({ onNext, onScoreUpdate }: { onNext: () => void, onScoreUpdate: (score: number) => void }) {
  const [isReading, setIsReading] = useState(true);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    "Apakah kamu sering merasa marah secara tiba-tiba tanpa pemicu yang jelas?",
    "Apakah kamu merasa sulit untuk menangis meskipun hatimu sangat sedih?",
    "Seringkah kamu merasa emosimu 'datar' atau hampa?",
    "Apakah kamu sering merasa iri pada kebahagiaan orang lain secara diam-diam?",
    "Apakah kamu merasa harus selalu terlihat ceria di depan orang lain?",
    "Seringkah kamu merasa bahwa perasaanmu tidak penting bagi orang lain?",
    "Apakah kamu merasa kesulitan untuk mendeskripsikan apa yang sedang kamu rasakan?",
    "Pernahkah kamu merasa benci pada dirimu sendiri saat merasa lemah?",
    "Apakah kamu merasa emosi negatifmu adalah sebuah kesalahan?",
    "Seringkah kamu merasa kewalahan saat menghadapi emosi yang intens?"
  ];

  const handleAnswer = (isYes: boolean) => {
    const newScore = isYes ? score + 1 : score;
    setScore(newScore);
    if (step < questions.length - 1) setStep(step + 1);
    else { onScoreUpdate(newScore); setStep(step + 1); }
  };

  return (
    <section className="min-w-full h-full snap-start flex flex-col items-center justify-center p-8 bg-[#F8F5FF] relative overflow-hidden font-sans">
      <div className="absolute top-[10%] left-[-5%] w-96 h-96 bg-violet-100/50 rounded-full blur-3xl animate-pulse" />
      <Stars className="absolute bottom-20 right-10 opacity-10 rotate-12 text-violet-800" size={60} />
      <div className="max-w-md w-full relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-violet-50/50 min-h-[550px] flex flex-col">
          {isReading ? (
            <div className="flex flex-col h-full justify-center animate-in fade-in duration-700">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-violet-600">Bab 4</span>
              <h2 className="text-3xl font-serif font-bold text-stone-800 mt-2 italic">Ruang Untuk Berani Merasa</h2>
              <p className="text-stone-500 mt-4 leading-relaxed italic">"Setiap emosi yang muncul adalah tamu yang membawa pesan."</p>
              <button onClick={() => setIsReading(false)} className="mt-10 py-4 bg-violet-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 group">Mulai Validasi <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></button>
            </div>
          ) : step < questions.length ? (
            <div className="flex flex-col h-full justify-between animate-in slide-in-from-right-8">
              <div>
                <span className="text-[10px] font-bold text-violet-500 uppercase tracking-widest">Alur Emosi {step + 1}/10</span>
                <h3 className="text-xl font-bold text-stone-800 mt-4 leading-snug">{questions[step]}</h3>
              </div>
              <div className="grid gap-3">
                <button onClick={() => handleAnswer(true)} className="p-5 rounded-2xl bg-violet-50 border border-violet-100 text-stone-700 font-semibold hover:bg-violet-100 transition-all">Iya, Sering</button>
                <button onClick={() => handleAnswer(false)} className="p-5 rounded-2xl bg-stone-50 border border-stone-100 text-stone-600 font-semibold hover:bg-stone-100 transition-all">Jarang Sekali</button>
              </div>
            </div>
          ) : (
            <div className="text-center flex flex-col items-center justify-center h-full animate-in zoom-in-95">
              <div className="p-6 bg-violet-50 rounded-full mb-6 border-2 border-violet-100"><Sparkles className="text-violet-500" size={44} /></div>
              <h3 className="text-2xl font-serif font-bold text-stone-800 mb-2">Bab 4 Selesai</h3>
              <p className="text-violet-600 font-bold text-lg mb-8">Kepadatan Emosi: {score * 10}%</p>
              <button onClick={onNext} className="w-full py-4 bg-stone-800 text-white rounded-2xl font-bold uppercase text-xs tracking-widest shadow-lg">Lanjut ke Bab 5</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}