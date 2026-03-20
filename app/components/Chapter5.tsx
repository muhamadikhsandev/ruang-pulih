"use client";
import React, { useState } from 'react';
import { 
  BookOpen, ArrowRight, Sparkles, Heart, 
  Compass, Unlink, Sun, Flame 
} from 'lucide-react';

interface ChapterProps {
  onNext: () => void;
  onScoreUpdate: (score: number) => void;
}

export default function Chapter5({ onNext, onScoreUpdate }: ChapterProps) {
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

  const getAnalysis = (s: number) => {
    if (s <= 3) return { 
      status: "Akar Mandiri", 
      desc: "Kamu memiliki pola keterikatan yang cukup aman. Kamu memahami bahwa kehadiran orang lain adalah pelengkap, bukan penentu harga dirimu.",
      future: "Ke depannya, kamu akan membangun hubungan yang sangat sehat di mana kedua belah pihak tumbuh bersama tanpa saling mengekang."
    };
    if (s <= 7) return { 
      status: "Pola Cemas/Menghindar", 
      desc: "Ada ketakutan akan penolakan yang membayangimu. Kamu seringkali berkorban terlalu banyak atau justru menutup diri sebelum tersakiti.",
      future: "Saat kamu belajar memberikan rasa aman pada dirimu sendiri, kamu akan menarik orang-orang yang stabil dan mampu mencintaimu apa adanya."
    };
    return { 
      status: "Pertahanan Trauma", 
      desc: "Hubungan terasa seperti medan perang atau tempat yang sangat menakutkan bagimu. Kamu sulit percaya karena luka lama yang belum mengering.",
      future: "Kesadaran ini adalah awal kehebatanmu. Kamu akan menjadi sosok yang paling mampu memahami arti kesetiaan dan kasih sayang yang tulus."
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
    <section className="min-w-full h-full snap-start flex flex-col items-center justify-center p-4 bg-[#fffaf5] relative overflow-hidden font-sans">
      
      {/* Background Layer - Gold/Sunrise Theme */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[45%] h-[45%] bg-orange-100/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-amber-50/50 rounded-full blur-[80px]" />
        <Sun className="absolute top-20 left-10 text-orange-200/40 animate-spin-slow" size={60} style={{ animationDuration: '20s' }} />
      </div>

      <div className="max-w-md w-full relative z-10 flex flex-col h-[85vh] md:h-[80vh]">
        <div className="bg-white/90 backdrop-blur-2xl rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(245,158,11,0.15)] border border-orange-50 flex flex-col h-full overflow-hidden">
          
          {/* Content Area */}
          <div className="flex-1 overflow-y-auto scrollbar-hide p-8 md:p-10">
            {isReading ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 text-center flex flex-col items-center">
                <div className="p-5 bg-orange-50 rounded-[2rem] mb-6 border border-orange-100">
                  <BookOpen className="text-orange-500" size={42} />
                </div>
                <span className="text-[10px] font-black tracking-[0.4em] text-orange-400 uppercase mb-2">Pola Kedekatan</span>
                <h2 className="text-3xl font-serif font-bold text-stone-800 leading-tight mb-6">Bab 5: <br/><span className="italic text-orange-600 font-serif">Mencinta Kembali</span></h2>
                <div className="p-6 bg-orange-50/50 rounded-3xl border border-orange-100 italic text-orange-800 text-sm leading-relaxed mb-4 shadow-sm">
                  "Cara kita mencintai orang lain adalah refleksi dari bagaimana kita telah dicintai di masa lalu."
                </div>
              </div>

            ) : step < questions.length ? (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="w-full h-1.5 bg-orange-50 rounded-full mb-10 overflow-hidden">
                  <div className="h-full bg-orange-400 transition-all duration-500" style={{ width: `${(step / questions.length) * 100}%` }} />
                </div>
                <div className="text-center">
                  <span className="text-[10px] font-black tracking-widest text-orange-400 uppercase block mb-4">Relasi {step + 1} / 10</span>
                  <h3 className="text-xl md:text-2xl font-bold text-stone-800 leading-snug">{questions[step]}</h3>
                </div>
              </div>

            ) : (
              <div className="animate-in fade-in zoom-in-95 duration-700 space-y-6">
                <div className="text-center pb-2">
                  <div className="inline-flex p-4 bg-orange-50 rounded-full border border-orange-100 mb-4 shadow-sm">
                    <Sparkles className="text-orange-500" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-800 mb-1 tracking-tight">Cermin Relasi</h3>
                  <div className="inline-block px-5 py-1.5 bg-orange-500 text-white rounded-full font-black text-xs uppercase tracking-widest">
                    {analysis.status}
                  </div>
                </div>

                {/* Awareness Section */}
                <div className="bg-stone-50 border border-stone-200 rounded-[2rem] p-6">
                  <div className="flex items-center gap-2 mb-3 text-orange-600 font-black text-[9px] uppercase tracking-widest">
                    <Compass size={14} /> Pola Hubunganmu
                  </div>
                  <p className="text-sm text-stone-700 leading-relaxed font-medium">{analysis.desc}</p>
                </div>

                {/* Visi Masa Depan */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-[2rem] p-6 shadow-inner">
                  <div className="flex items-center gap-2 mb-3 text-orange-700 font-black text-[9px] uppercase tracking-widest">
                    <Flame size={14} /> Cahaya Kehebatan
                  </div>
                  <p className="text-sm text-stone-800 leading-relaxed font-bold italic">"{analysis.future}"</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-orange-50 rounded-2xl flex flex-col gap-1 shadow-sm">
                    <Unlink size={16} className="text-orange-400 mb-1" />
                    <span className="text-[10px] font-bold text-stone-800 uppercase tracking-tighter">Solusi</span>
                    <p className="text-[9px] text-stone-500 leading-tight italic">Mulai beri ruang untuk diri sendiri.</p>
                  </div>
                  <div className="p-4 bg-white border border-orange-50 rounded-2xl flex flex-col gap-1 shadow-sm">
                    <Heart size={16} className="text-orange-400 mb-1" />
                    <span className="text-[10px] font-bold text-stone-800 uppercase tracking-tighter">Hasil</span>
                    <p className="text-[9px] text-stone-500 leading-tight italic">Hubungan yang stabil & jujur.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Bar */}
          <div className="p-8 pt-0 bg-white/50 backdrop-blur-sm">
            {isReading ? (
              <button onClick={() => setIsReading(false)} className="w-full py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-[1.5rem] font-bold shadow-xl shadow-orange-100 transition-all flex items-center justify-center gap-2 group active:scale-95">
                Mulai Analisis <ArrowRight size={20} className="group-hover:translate-x-1" />
              </button>
            ) : step < questions.length ? (
              <div className="flex flex-col gap-3">
                <button onClick={() => handleAnswer(true)} className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all active:scale-95">Sering Merasa Begitu</button>
                <button onClick={() => handleAnswer(false)} className="w-full py-4 bg-stone-100 text-stone-600 rounded-2xl font-bold hover:bg-stone-200 transition-all active:scale-95">Tidak Pernah</button>
              </div>
            ) : (
              <button onClick={onNext} className="w-full py-5 bg-stone-800 hover:bg-black text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.25em] shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-95 group">
                Lihat Hasil Akhir <ArrowRight size={18} className="group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}