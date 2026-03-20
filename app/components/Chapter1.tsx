"use client";
import React, { useState } from 'react';
import { Sprout, ArrowRight, Sparkles } from 'lucide-react';

interface ChapterProps {
  onNext: () => void;
  onScoreUpdate: (score: number) => void;
}

export default function Chapter1({ onNext, onScoreUpdate }: ChapterProps) {
  const [isReading, setIsReading] = useState(true);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    "Apakah kamu sering merasa harus menyenangkan semua orang agar merasa aman?",
    "Apakah kamu sulit mengatakan 'tidak' meskipun kamu merasa lelah?",
    "Seringkah kamu merasa sangat bersalah saat melakukan kesalahan kecil?",
    "Apakah kamu merasa perlu pencapaian besar agar merasa berharga?",
    "Apakah kamu sering merasa takut diabaikan atau ditinggalkan?",
    "Sulitkah bagimu untuk meminta bantuan orang lain?",
    "Apakah kamu sering mengkritik dirimu sendiri dengan kata-kata kasar?",
    "Apakah kamu merasa harus menyembunyikan emosi sedihmu?",
    "Seringkah kamu merasa cemas tanpa alasan yang jelas di keramaian?",
    "Apakah kamu merasa sulit mempercayai niat baik orang lain?"
  ];

  const handleAnswer = (isYes: boolean) => {
    const newScore = isYes ? score + 1 : score;
    setScore(newScore);
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Selesai, kirim score ke parent (dikali 10 untuk persentase jika mau)
      onScoreUpdate(newScore);
      setStep(step + 1); // Masuk ke screen "Selesai"
    }
  };

  return (
    <section className="min-w-full h-full snap-start flex flex-col items-center justify-center p-8 bg-[#FDF8F5] relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-rose-100/50 rounded-full blur-3xl animate-pulse" />
      <Sprout className="absolute top-20 right-10 opacity-10 -rotate-12 text-rose-800" size={60} />

      <div className="max-w-md w-full relative z-10">
        {/* Progress Bar */}
        {!isReading && step < questions.length && (
          <div className="absolute -top-8 left-0 w-full h-1.5 bg-rose-100/50 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-rose-400 transition-all duration-700 ease-out" 
              style={{ width: `${(step / questions.length) * 100}%` }} 
            />
          </div>
        )}

        <div className="relative bg-white rounded-[2.5rem] shadow-2xl p-10 border border-rose-50/50 min-h-[550px] flex flex-col overflow-hidden">
          {isReading ? (
            /* Intro Section */
            <div className="animate-in fade-in zoom-in-95 duration-1000 flex flex-col h-full justify-center">
              <div className="mb-8 pl-4 border-l-4 border-rose-300">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-rose-500">Bab 1</span>
                <h2 className="text-3xl font-serif font-bold text-stone-800 mt-2 italic">Menyapa Luka Kecil</h2>
              </div>
              <div className="space-y-5 pl-4">
                <p className="text-stone-600 leading-relaxed italic">"Anak kecil di dalam dirimu tidak pernah pergi, ia hanya menunggu untuk didengar..."</p>
                <p className="text-stone-500 text-sm leading-relaxed">
                  Mari kita periksa seberapa banyak beban masa kecil yang masih kamu bawa hingga hari ini.
                </p>
              </div>
              <button 
                onClick={() => setIsReading(false)} 
                className="mt-10 w-full py-4 bg-rose-500 text-white rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 group hover:bg-rose-600 active:scale-95"
              >
                Mulai Refleksi <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : step < questions.length ? (
            /* Quiz Section */
            <div className="animate-in slide-in-from-right-8 duration-500 flex flex-col h-full justify-between">
              <div className="mb-10 pl-6">
                <span className="text-[10px] font-bold tracking-widest text-rose-400 uppercase">
                  Pertanyaan {step + 1}/{questions.length}
                </span>
                <h3 className="text-xl font-bold text-stone-800 leading-snug mt-4 min-h-[80px]">
                  {questions[step]}
                </h3>
              </div>
              <div className="grid gap-4 pl-6">
                <button 
                  onClick={() => handleAnswer(true)} 
                  className="w-full text-left p-5 rounded-2xl bg-rose-50/50 border border-rose-100 text-stone-700 text-sm font-semibold hover:bg-rose-100 transition-all hover:translate-x-1"
                >
                  Iya, Sering Merasa Begitu
                </button>
                <button 
                  onClick={() => handleAnswer(false)} 
                  className="w-full text-left p-5 rounded-2xl bg-stone-50/50 border border-stone-100 text-stone-600 text-sm font-semibold hover:bg-stone-100 transition-all hover:translate-x-1"
                >
                  Jarang / Tidak Pernah
                </button>
              </div>
            </div>
          ) : (
            /* Result Summary Section */
            <div className="text-center py-6 animate-in zoom-in-95 duration-1000 flex flex-col items-center justify-center h-full">
              <div className="p-6 bg-rose-50 rounded-full mb-6 border-2 border-rose-100">
                <Sparkles className="text-rose-400" size={44} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-800 mb-2">Bab 1 Selesai</h3>
              <p className="text-stone-500 text-sm mb-6 px-4 leading-relaxed">
                Terima kasih sudah jujur pada dirimu sendiri. Kamu baru saja melakukan langkah besar.
              </p>
              <div className="mb-8 p-4 bg-rose-50/50 rounded-xl border border-rose-100 w-full">
                <p className="text-xs uppercase tracking-widest text-rose-400 font-bold mb-1">Skor Inner Child</p>
                <p className="text-3xl font-black text-rose-600">{score * 10}%</p>
              </div>
              <button 
                onClick={onNext} 
                className="flex items-center justify-center gap-3 px-8 py-4 w-full bg-stone-800 text-white rounded-2xl font-bold uppercase text-xs tracking-widest shadow-lg hover:bg-black transition-all"
              >
                Lanjut ke Bab 2 <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}