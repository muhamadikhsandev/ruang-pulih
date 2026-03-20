"use client";
import React, { useState } from 'react';
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';

export default function Chapter5({ onNext, onScoreUpdate }: { onNext: () => void, onScoreUpdate: (score: number) => void }) {
  const [isReading, setIsReading] = useState(true);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    "Apakah kamu merasa cemas jika pasangan atau teman tidak langsung membalas pesanmu?",
    "Apakah kamu merasa sulit untuk benar-benar mengandalkan orang lain?",
    "Seringkah kamu merasa ingin 'lari' saat hubungan mulai terasa terlalu serius?",
    "Apakah kamu sering mencari validasi berlebihan dari orang yang kamu cintai?",
    "Apakah kamu merasa bahwa orang lain pada akhirnya akan mengecewakanmu?",
    "Seringkah kamu merasa takut orang lain akan melihat sisi 'burukmu' dan pergi?",
    "Apakah kamu merasa lebih aman saat sendirian daripada menjalin hubungan?",
    "Seringkah kamu merasa cemburu tanpa alasan yang mendasar?",
    "Apakah kamu merasa sulit untuk mengekspresikan kebutuhanmu secara langsung?",
    "Apakah kamu merasa sering mengabaikan dirimu demi mempertahankan seseorang?"
  ];

  const handleAnswer = (isYes: boolean) => {
    const newScore = isYes ? score + 1 : score;
    setScore(newScore);
    if (step < questions.length - 1) setStep(step + 1);
    else { onScoreUpdate(newScore); setStep(step + 1); }
  };

  return (
    <section className="min-w-full h-full snap-start flex flex-col items-center justify-center p-8 bg-[#FFF9F0] relative overflow-hidden font-sans">
      <div className="absolute top-[-5%] right-[-5%] w-96 h-96 bg-orange-100/50 rounded-full blur-3xl animate-pulse" />
      <BookOpen className="absolute top-20 left-10 opacity-10 -rotate-12 text-orange-800" size={60} />
      <div className="max-w-md w-full relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-orange-50/50 min-h-[550px] flex flex-col">
          {isReading ? (
            <div className="flex flex-col h-full justify-center animate-in fade-in duration-700">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-orange-600">Bab 5</span>
              <h2 className="text-3xl font-serif font-bold text-stone-800 mt-2 italic">Belajar Mencinta Kembali</h2>
              <p className="text-stone-500 mt-4 leading-relaxed">Cara kita berhubungan dengan orang lain berakar dari cara kita dicintai dahulu. Mari kita pahami polamu.</p>
              <button onClick={() => setIsReading(false)} className="mt-10 py-4 bg-orange-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 group">Mulai Analisis <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></button>
            </div>
          ) : step < questions.length ? (
            <div className="flex flex-col h-full justify-between animate-in slide-in-from-right-8">
              <div>
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Pola Hubungan {step + 1}/10</span>
                <h3 className="text-xl font-bold text-stone-800 mt-4 leading-snug">{questions[step]}</h3>
              </div>
              <div className="grid gap-3">
                <button onClick={() => handleAnswer(true)} className="p-5 rounded-2xl bg-orange-50 border border-orange-100 text-stone-700 font-semibold hover:bg-orange-100 transition-all">Sering Merasa Begitu</button>
                <button onClick={() => handleAnswer(false)} className="p-5 rounded-2xl bg-stone-50 border border-stone-100 text-stone-600 font-semibold hover:bg-stone-100 transition-all">Tidak Pernah</button>
              </div>
            </div>
          ) : (
            <div className="text-center flex flex-col items-center justify-center h-full animate-in zoom-in-95">
              <div className="p-6 bg-orange-50 rounded-full mb-6 border-2 border-orange-100"><Sparkles className="text-orange-500" size={44} /></div>
              <h3 className="text-2xl font-serif font-bold text-stone-800 mb-2">Bab 5 Selesai</h3>
              <p className="text-orange-600 font-bold text-lg mb-8">Kerapuhan Relasi: {score * 10}%</p>
              <button onClick={onNext} className="w-full py-4 bg-stone-800 text-white rounded-2xl font-bold uppercase text-xs tracking-widest shadow-lg">Lihat Hasil Akhir</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}