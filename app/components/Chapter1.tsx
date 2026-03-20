"use client";
import React, { useState } from 'react';
import { 
  Sprout, ArrowRight, Sparkles, Heart, 
  ShieldCheck, Lightbulb, Star, Target, Zap
} from 'lucide-react';

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

  const getAnalysis = (s: number) => {
    if (s <= 3) return { 
      status: "Luka Ringan", 
      desc: "Kamu memiliki fondasi emosional yang stabil, namun ada keraguan kecil yang terkadang menghambat instingmu.",
      future: "Kamu akan menjadi pemimpin yang sangat tegas dan objektif karena mampu memisahkan emosi dari keputusan."
    };
    if (s <= 7) return { 
      status: "Beban Menengah", 
      desc: "Kamu sering mengorbankan diri demi harmoni orang lain. Anak kecil di dalammu sedang berteriak minta diperhatikan.",
      future: "Saat kamu mulai memprioritaskan diri, energi kreatifmu akan meluap dan kamu akan menarik orang-orang yang tulus menghargaimu."
    };
    return { 
      status: "Luka Mendalam", 
      desc: "Kamu membawa beban ekspektasi yang sangat berat. Rasa lelahmu adalah bukti bahwa kamu sudah terlalu lama berpura-pura kuat.",
      future: "Penyembuhan ini akan mengubahmu menjadi sosok dengan empati luar biasa dan kebijaksanaan yang menginspirasi banyak orang."
    };
  };

  const handleAnswer = (isYes: boolean) => {
    const newScore = isYes ? score + 1 : score;
    setScore(newScore);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onScoreUpdate(newScore);
      setStep(step + 1);
    }
  };

  const analysis = getAnalysis(score);

  return (
    <section className="min-w-full h-full snap-start flex flex-col items-center justify-center p-4 bg-[#fffdfc] relative overflow-hidden font-sans">
      
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-100/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-amber-50/50 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-md w-full relative z-10 flex flex-col h-[85vh] md:h-[80vh]">
        <div className="bg-white/90 backdrop-blur-2xl rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-white flex flex-col h-full overflow-hidden">
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto scrollbar-hide p-8 md:p-10">
            {isReading ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 flex flex-col items-center text-center">
                <div className="p-5 bg-rose-50 rounded-[2rem] mb-6 border border-rose-100">
                  <Sprout className="text-rose-500" size={42} />
                </div>
                <span className="text-[10px] font-black tracking-[0.4em] text-rose-400 uppercase mb-2">Eksplorasi Diri</span>
                <h2 className="text-3xl font-serif font-bold text-stone-800 leading-tight mb-6">Bab 1: <br/><span className="italic text-rose-500">Menyapa Luka</span></h2>
                <div className="p-6 bg-stone-50 rounded-3xl border border-stone-100 italic text-stone-600 text-sm leading-relaxed mb-4">
                  "Anak kecil di dalam dirimu tidak pernah pergi, ia hanya menunggu untuk divalidasi."
                </div>
              </div>

            ) : step < questions.length ? (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="w-full h-1.5 bg-stone-100 rounded-full mb-10 overflow-hidden">
                  <div className="h-full bg-rose-400 transition-all duration-500" style={{ width: `${(step / questions.length) * 100}%` }} />
                </div>
                <div className="text-center">
                  <span className="text-[10px] font-black tracking-widest text-rose-300 uppercase block mb-4">Step {step + 1} / 10</span>
                  <h3 className="text-xl md:text-2xl font-bold text-stone-800 leading-snug">{questions[step]}</h3>
                </div>
              </div>

            ) : (
              <div className="animate-in fade-in zoom-in-95 duration-700 space-y-6">
                <div className="text-center pb-2">
                  <div className="inline-flex p-4 bg-amber-50 rounded-full border border-amber-100 mb-4 shadow-sm">
                    <Sparkles className="text-amber-500" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-800 mb-1 tracking-tight">Cermin Kejujuran</h3>
                  <div className="inline-block px-5 py-1.5 bg-rose-500 text-white rounded-full font-black text-xs uppercase tracking-widest shadow-lg shadow-rose-200">
                    {analysis.status}
                  </div>
                </div>

                {/* Tahu Diri Section */}
                <div className="bg-stone-50 border border-stone-200 rounded-[2rem] p-6">
                  <div className="flex items-center gap-2 mb-3 text-stone-400">
                    <Target size={14} />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">Realita Saat Ini</span>
                  </div>
                  <p className="text-sm text-stone-700 leading-relaxed font-medium">{analysis.desc}</p>
                </div>

                {/* Transformasi Section */}
                <div className="bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-100 rounded-[2rem] p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-3 text-rose-600">
                    <Zap size={14} className="fill-rose-500" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">Visi Transformasi</span>
                  </div>
                  <p className="text-sm text-stone-800 leading-relaxed font-bold italic">"{analysis.future}"</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-rose-50 rounded-2xl flex flex-col gap-1">
                    <ShieldCheck size={16} className="text-rose-400 mb-1" />
                    <span className="text-[10px] font-bold text-stone-800">Cara Atasi</span>
                    <p className="text-[9px] text-stone-500 italic">Mulai pasang batas (boundaries).</p>
                  </div>
                  <div className="p-4 bg-white border border-amber-50 rounded-2xl flex flex-col gap-1">
                    <Lightbulb size={16} className="text-amber-400 mb-1" />
                    <span className="text-[10px] font-bold text-stone-800">Manfaat</span>
                    <p className="text-[9px] text-stone-500 italic">Bebas dari rasa bersalah.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Bar (Statis di Bawah) */}
          <div className="p-8 pt-0 bg-white/50 backdrop-blur-sm">
            {isReading ? (
              <button onClick={() => setIsReading(false)} className="w-full py-5 bg-rose-500 hover:bg-rose-600 text-white rounded-[1.5rem] font-bold shadow-xl shadow-rose-100 transition-all flex items-center justify-center gap-2 group active:scale-95">
                Mulai Refleksi <ArrowRight size={20} className="group-hover:translate-x-1" />
              </button>
            ) : step < questions.length ? (
              <div className="flex flex-col gap-3">
                <button onClick={() => handleAnswer(true)} className="w-full py-4 bg-rose-500 text-white rounded-2xl font-bold shadow-lg shadow-rose-100 hover:bg-rose-600 transition-all active:scale-95">Iya, Begitu</button>
                <button onClick={() => handleAnswer(false)} className="w-full py-4 bg-stone-100 text-stone-600 rounded-2xl font-bold hover:bg-stone-200 transition-all active:scale-95">Tidak Pernah</button>
              </div>
            ) : (
              <button onClick={onNext} className="w-full py-5 bg-stone-800 hover:bg-black text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.25em] shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-95 group">
                Lanjut ke Tantangan Bab 2 <ArrowRight size={18} className="group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}