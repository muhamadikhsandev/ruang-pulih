"use client";
import React, { useState } from 'react';
import { 
  Leaf, ArrowRight, Sparkles, Wind, 
  History, Anchor, Sunrise, CheckCircle2 
} from 'lucide-react';

interface ChapterProps {
  onNext: () => void;
  onScoreUpdate: (score: number) => void;
}

export default function Chapter2({ onNext, onScoreUpdate }: ChapterProps) {
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

  const getAnalysis = (s: number) => {
    if (s <= 3) return { 
      status: "Pengamat Bijak", 
      desc: "Kamu sudah mampu berdamai dengan jejak langkahmu. Masa lalu bagimu adalah perpustakaan, bukan penjara.",
      future: "Ketenanganmu akan menjadi magnet bagi keberuntungan dan peluang baru yang lebih besar."
    };
    if (s <= 7) return { 
      status: "Pejuang Rindu", 
      desc: "Ada beberapa 'jangkar' yang masih menahanmu di pelabuhan lama. Kamu ingin maju, tapi satu kaki masih tertinggal di belakang.",
      future: "Begitu kamu melepaskan jangkar itu, kecepatanmu dalam mencapai impian akan meningkat berkali-kali lipat."
    };
    return { 
      status: "Tawanan Kenangan", 
      desc: "Masa lalu terasa lebih nyata bagimu daripada hari ini. Kamu terus menghukum dirimu atas hal yang tidak bisa diubah.",
      future: "Transformasimu akan sangat luar biasa; kamu akan menjadi bukti hidup bahwa bunga terindah bisa tumbuh dari tanah yang paling keras."
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
    <section className="min-w-full h-full snap-start flex flex-col items-center justify-center p-4 bg-[#f8faf8] relative overflow-hidden font-sans">
      
      {/* Background Layer - Emerald/Mint Theme */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[45%] h-[45%] bg-emerald-100/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-50/50 rounded-full blur-[80px]" />
        <Wind className="absolute top-20 right-10 text-emerald-200/40" size={40} />
      </div>

      <div className="max-w-md w-full relative z-10 flex flex-col h-[85vh] md:h-[80vh]">
        <div className="bg-white/90 backdrop-blur-2xl rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(5,150,105,0.1)] border border-emerald-50 flex flex-col h-full overflow-hidden">
          
          {/* Content Area */}
          <div className="flex-1 overflow-y-auto scrollbar-hide p-8 md:p-10">
            {isReading ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 text-center flex flex-col items-center">
                <div className="p-5 bg-emerald-50 rounded-[2rem] mb-6 border border-emerald-100">
                  <Leaf className="text-emerald-600 animate-pulse" size={42} />
                </div>
                <span className="text-[10px] font-black tracking-[0.4em] text-emerald-500 uppercase mb-2">Refleksi Waktu</span>
                <h2 className="text-3xl font-serif font-bold text-stone-800 leading-tight mb-6 italic">Bab 2: <br/><span className="not-italic text-emerald-700">Melepas Bayang</span></h2>
                <div className="p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100 italic text-emerald-800 text-sm leading-relaxed mb-4 shadow-sm">
                  "Masa lalu adalah tempat belajar, bukan tempat tinggal. Lepaskan beban yang tak lagi berguna."
                </div>
              </div>

            ) : step < questions.length ? (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="w-full h-1.5 bg-emerald-50 rounded-full mb-10 overflow-hidden">
                  <div className="h-full bg-emerald-400 transition-all duration-500" style={{ width: `${(step / questions.length) * 100}%` }} />
                </div>
                <div className="text-center">
                  <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase block mb-4">Langkah {step + 1} / 10</span>
                  <h3 className="text-xl md:text-2xl font-bold text-stone-800 leading-snug">{questions[step]}</h3>
                </div>
              </div>

            ) : (
              <div className="animate-in fade-in zoom-in-95 duration-700 space-y-6">
                <div className="text-center pb-2">
                  <div className="inline-flex p-4 bg-emerald-50 rounded-full border border-emerald-100 mb-4">
                    <Sparkles className="text-emerald-500" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-800 mb-1 tracking-tight">Cermin Waktu</h3>
                  <div className="inline-block px-5 py-1.5 bg-emerald-600 text-white rounded-full font-black text-xs uppercase tracking-widest">
                    {analysis.status}
                  </div>
                </div>

                {/* Tahu Diri / Kondisi Sekarang */}
                <div className="bg-stone-50 border border-stone-200 rounded-[2rem] p-6">
                  <div className="flex items-center gap-2 mb-3 text-emerald-600">
                    <Anchor size={14} />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">Pemberhentianmu</span>
                  </div>
                  <p className="text-sm text-stone-700 leading-relaxed font-medium">{analysis.desc}</p>
                </div>

                {/* Visi Masa Depan */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-[2rem] p-6 shadow-inner">
                  <div className="flex items-center gap-2 mb-3 text-emerald-700">
                    <Sunrise size={16} />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">Cahaya Esok</span>
                  </div>
                  <p className="text-sm text-stone-800 leading-relaxed font-bold italic">"{analysis.future}"</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-emerald-50 rounded-2xl flex flex-col gap-1">
                    <History size={16} className="text-emerald-400 mb-1" />
                    <span className="text-[10px] font-bold text-stone-800 uppercase">Strategi</span>
                    <p className="text-[9px] text-stone-500 italic">Terima kejadiannya, ubah maknanya.</p>
                  </div>
                  <div className="p-4 bg-white border border-emerald-50 rounded-2xl flex flex-col gap-1">
                    <CheckCircle2 size={16} className="text-teal-400 mb-1" />
                    <span className="text-[10px] font-bold text-stone-800 uppercase">Hasil</span>
                    <p className="text-[9px] text-stone-500 italic">Hidup terasa lebih ringan & lega.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Area */}
          <div className="p-8 pt-0 bg-white/50 backdrop-blur-sm">
            {isReading ? (
              <button onClick={() => setIsReading(false)} className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[1.5rem] font-bold shadow-xl shadow-emerald-100 transition-all flex items-center justify-center gap-2 group active:scale-95">
                Mulai Lepaskan <ArrowRight size={20} className="group-hover:translate-x-1" />
              </button>
            ) : step < questions.length ? (
              <div className="flex flex-col gap-3">
                <button onClick={() => handleAnswer(true)} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95">Iya, Benar</button>
                <button onClick={() => handleAnswer(false)} className="w-full py-4 bg-stone-100 text-stone-600 rounded-2xl font-bold hover:bg-stone-200 transition-all active:scale-95">Tidak Terlalu</button>
              </div>
            ) : (
              <button onClick={onNext} className="w-full py-5 bg-stone-800 hover:bg-black text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.25em] shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-95 group">
                Lanjut ke Tantangan Bab 3 <ArrowRight size={18} className="group-hover:translate-x-1" />
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