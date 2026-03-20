"use client";
import React, { useState } from 'react';
import { Footprints, ArrowRight, Sparkles } from 'lucide-react';

export default function Chapter3({ onNext, onScoreUpdate }: { onNext: () => void, onScoreUpdate: (score: number) => void }) {
  const [isReading, setIsReading] = useState(true);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    "Apakah kamu sering merasa tegang di area bahu atau leher tanpa alasan?",
    "Seringkah kamu merasa sesak napas saat teringat sesuatu yang tidak nyaman?",
    "Apakah kamu merasa sulit untuk rileks meskipun sedang tidak melakukan apa-apa?",
    "Apakah kamu merasa 'terpisah' dari tubuhmu sendiri (seperti sedang menonton film)?",
    "Seringkah kamu mengalami sakit perut atau pusing saat merasa cemas?",
    "Apakah kamu merasa sulit untuk merasakan sensasi lapar atau kenyang secara akurat?",
    "Seringkah kamu merasa gemetar di tangan saat harus berbicara dengan orang lain?",
    "Apakah kamu merasa tubuhmu selalu dalam mode 'siaga' atau waspada?",
    "Pernahkah kamu merasa tubuhmu membeku saat menghadapi konflik?",
    "Apakah kamu merasa lelah secara fisik meskipun sudah tidur cukup?"
  ];

  const handleAnswer = (isYes: boolean) => {
    const newScore = isYes ? score + 1 : score;
    setScore(newScore);
    if (step < questions.length - 1) setStep(step + 1);
    else { onScoreUpdate(newScore); setStep(step + 1); }
  };

  return (
    <section className="min-w-full h-full snap-start flex flex-col items-center justify-center p-8 bg-[#F0F2F5] relative overflow-hidden font-sans">
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-100/50 rounded-full blur-3xl animate-pulse" />
      <Footprints className="absolute top-20 right-10 opacity-10 rotate-12 text-blue-800" size={60} />
      <div className="max-w-md w-full relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-blue-50/50 min-h-[550px] flex flex-col">
          {isReading ? (
            <div className="flex flex-col h-full justify-center animate-in fade-in duration-700">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-600">Bab 3</span>
              <h2 className="text-3xl font-serif font-bold text-stone-800 mt-2 italic">Mendengar Suara Tubuh</h2>
              <p className="text-stone-500 mt-4 leading-relaxed italic">"Tubuhmu mengingat apa yang pikiranmu coba lupakan."</p>
              <button onClick={() => setIsReading(false)} className="mt-10 py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 group">Mulai Refleksi <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></button>
            </div>
          ) : step < questions.length ? (
            <div className="flex flex-col h-full justify-between animate-in slide-in-from-right-8">
              <div>
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Respon Tubuh {step + 1}/10</span>
                <h3 className="text-xl font-bold text-stone-800 mt-4 leading-snug">{questions[step]}</h3>
              </div>
              <div className="grid gap-3">
                <button onClick={() => handleAnswer(true)} className="p-5 rounded-2xl bg-blue-50 border border-blue-100 text-stone-700 font-semibold hover:bg-blue-100 transition-all">Iya, Terasa</button>
                <button onClick={() => handleAnswer(false)} className="p-5 rounded-2xl bg-stone-50 border border-stone-100 text-stone-600 font-semibold hover:bg-stone-100 transition-all">Tidak Merasakan</button>
              </div>
            </div>
          ) : (
            <div className="text-center flex flex-col items-center justify-center h-full animate-in zoom-in-95">
              <div className="p-6 bg-blue-50 rounded-full mb-6 border-2 border-blue-100"><Sparkles className="text-blue-500" size={44} /></div>
              <h3 className="text-2xl font-serif font-bold text-stone-800 mb-2">Bab 3 Selesai</h3>
              <p className="text-blue-600 font-bold text-lg mb-8">Tingkat Ketegangan Tubuh: {score * 10}%</p>
              <button onClick={onNext} className="w-full py-4 bg-stone-800 text-white rounded-2xl font-bold uppercase text-xs tracking-widest shadow-lg">Lanjut ke Bab 4</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}