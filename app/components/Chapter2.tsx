"use client";
import React, { useState } from 'react';
import { Leaf, ArrowRight, Sparkles } from 'lucide-react';

export default function Chapter2({ onNext, onScoreUpdate }: { onNext: () => void, onScoreUpdate: (score: number) => void }) {
  const [isReading, setIsReading] = useState(true);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    "Apakah kamu masih sering memikirkan kesalahan di masa lalu yang sebenarnya sudah selesai?",
    "Apakah kamu merasa sulit memaafkan dirimu yang dulu karena 'terlalu polos'?",
    "Seringkah kamu merasa ingin mengulang waktu hanya untuk mengubah satu kejadian?",
    "Apakah kamu masih menyimpan barang yang sebenarnya menyakitkan untuk dilihat?",
    "Apakah kamu merasa masa lalumu menghalangimu untuk bahagia hari ini?",
    "Seringkah kamu membandingkan pencapaianmu sekarang dengan ekspektasi masa lalumu?",
    "Apakah kamu merasa terjebak dalam pola hubungan yang sama berulang kali?",
    "Apakah kamu merasa dendam pada orang yang menyakitimu di masa lalu masih terasa nyata?",
    "Sulitkah bagimu untuk percaya bahwa hari ini bisa lebih baik dari kemarin?",
    "Apakah kamu merasa identitasmu didefinisikan oleh kegagalan masa lalumu?"
  ];

  const handleAnswer = (isYes: boolean) => {
    const newScore = isYes ? score + 1 : score;
    setScore(newScore);
    if (step < questions.length - 1) setStep(step + 1);
    else { onScoreUpdate(newScore); setStep(step + 1); }
  };

  return (
    <section className="min-w-full h-full snap-start flex flex-col items-center justify-center p-8 bg-[#F0F4F0] relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl animate-pulse" />
      <Leaf className="absolute top-20 left-10 opacity-10 rotate-12 text-emerald-800" size={60} />
      <div className="max-w-md w-full relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-emerald-50/50 min-h-[550px] flex flex-col">
          {isReading ? (
            <div className="flex flex-col h-full justify-center animate-in fade-in duration-700">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-600">Bab 2</span>
              <h2 className="text-3xl font-serif font-bold text-stone-800 mt-2 italic">Melepas Bayang Masa Lalu</h2>
              <p className="text-stone-500 mt-4 leading-relaxed">Masa lalu adalah tempat belajar, bukan tempat tinggal. Mari kita lihat seberapa jauh kamu sudah melangkah.</p>
              <button onClick={() => setIsReading(false)} className="mt-10 py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 group">Mulai <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></button>
            </div>
          ) : step < questions.length ? (
            <div className="flex flex-col h-full justify-between animate-in slide-in-from-right-8">
              <div>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Pertanyaan {step + 1}/10</span>
                <h3 className="text-xl font-bold text-stone-800 mt-4 leading-snug">{questions[step]}</h3>
              </div>
              <div className="grid gap-3">
                <button onClick={() => handleAnswer(true)} className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 text-stone-700 font-semibold hover:bg-emerald-100 transition-all">Iya, Benar</button>
                <button onClick={() => handleAnswer(false)} className="p-5 rounded-2xl bg-stone-50 border border-stone-100 text-stone-600 font-semibold hover:bg-stone-100 transition-all">Tidak Terlalu</button>
              </div>
            </div>
          ) : (
            <div className="text-center flex flex-col items-center justify-center h-full animate-in zoom-in-95">
              <div className="p-6 bg-emerald-50 rounded-full mb-6 border-2 border-emerald-100"><Sparkles className="text-emerald-500" size={44} /></div>
              <h3 className="text-2xl font-serif font-bold text-stone-800 mb-2">Bab 2 Selesai</h3>
              <p className="text-emerald-600 font-bold text-lg mb-8">Penerimaan Masa Lalu: {100 - (score * 10)}%</p>
              <button onClick={onNext} className="w-full py-4 bg-stone-800 text-white rounded-2xl font-bold uppercase text-xs tracking-widest shadow-lg">Lanjut ke Bab 3</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}