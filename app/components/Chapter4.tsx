"use client";
import React, { useState } from 'react';
import { 
  Stars, ArrowRight, Sparkles, Moon, 
  Eye, Wand2, Fingerprint, HeartHandshake 
} from 'lucide-react';

interface ChapterProps {
  onNext: () => void;
  onScoreUpdate: (score: number) => void;
}

export default function Chapter4({ onNext, onScoreUpdate }: ChapterProps) {
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

  const getAnalysis = (s: number) => {
    if (s <= 3) return { 
      status: "Emosi Terintegrasi", 
      desc: "Kamu memiliki hubungan yang sehat dengan perasaanmu. Kamu tidak takut pada air mata maupun amarah.",
      future: "Kejujuran emosionalmu akan membawamu pada hubungan yang sangat dalam dan tulus dengan orang-orang di sekitarmu."
    };
    if (s <= 7) return { 
      status: "Peredam Rasa", 
      desc: "Kamu cenderung memilah emosi mana yang 'boleh' dirasakan. Ada banyak perasaan yang kamu telan demi menjaga ketenangan luar.",
      future: "Saat kamu berani memproses emosi yang terpendam, kamu akan menemukan kelegaan kreatif yang belum pernah kamu rasakan sebelumnya."
    };
    return { 
      status: "Kabut Emosional", 
      desc: "Emosimu terasa seperti badai yang membingungkan atau justru kekosongan yang mati rasa. Kamu lelah karena terus berperang dengan dirimu sendiri.",
      future: "Keberanianmu menghadapi 'gelap' di dalam diri akan mengubahmu menjadi sosok yang paling tangguh dan sulit dijatuhkan oleh keadaan."
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
    <section className="min-w-full h-full snap-start flex flex-col items-center justify-center p-4 bg-[#f9f8ff] relative overflow-hidden font-sans">
      
      {/* Background Decor - Violet/Mystic Theme */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-violet-100/40 rounded-full blur-[110px]" />
        <div className="absolute bottom-[0%] right-[-5%] w-[40%] h-[40%] bg-purple-50/50 rounded-full blur-[90px]" />
        <Moon className="absolute top-20 left-10 text-violet-200/40 -rotate-12" size={40} />
      </div>

      <div className="max-w-md w-full relative z-10 flex flex-col h-[85vh] md:h-[80vh]">
        <div className="bg-white/90 backdrop-blur-2xl rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(139,92,246,0.12)] border border-violet-50 flex flex-col h-full overflow-hidden">
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto scrollbar-hide p-8 md:p-10">
            {isReading ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 text-center flex flex-col items-center">
                <div className="p-5 bg-violet-50 rounded-[2rem] mb-6 border border-violet-100 shadow-sm">
                  <Stars className="text-violet-500" size={42} />
                </div>
                <span className="text-[10px] font-black tracking-[0.4em] text-violet-400 uppercase mb-2">Kedalaman Rasa</span>
                <h2 className="text-3xl font-serif font-bold text-stone-800 leading-tight mb-6 italic">Bab 4: <br/><span className="not-italic text-violet-700">Berani Merasa</span></h2>
                <div className="p-6 bg-violet-50/50 rounded-3xl border border-violet-100 italic text-violet-800 text-sm leading-relaxed mb-4">
                  "Setiap emosi yang muncul adalah tamu yang membawa pesan penting tentang dirimu."
                </div>
              </div>

            ) : step < questions.length ? (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="w-full h-1.5 bg-violet-50 rounded-full mb-10 overflow-hidden">
                  <div className="h-full bg-violet-400 transition-all duration-500" style={{ width: `${(step / questions.length) * 100}%` }} />
                </div>
                <div className="text-center">
                  <span className="text-[10px] font-black tracking-widest text-violet-400 uppercase block mb-4">Validasi Emosi {step + 1} / 10</span>
                  <h3 className="text-xl md:text-2xl font-bold text-stone-800 leading-snug">{questions[step]}</h3>
                </div>
              </div>

            ) : (
              <div className="animate-in fade-in zoom-in-95 duration-700 space-y-6">
                <div className="text-center pb-2">
                  <div className="inline-flex p-4 bg-violet-50 rounded-full border border-violet-100 mb-4 shadow-sm">
                    <Sparkles className="text-violet-500" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-800 mb-1 tracking-tight">Cermin Emosi</h3>
                  <div className="inline-block px-5 py-1.5 bg-violet-600 text-white rounded-full font-black text-xs uppercase tracking-widest">
                    {analysis.status}
                  </div>
                </div>

                {/* Realita Emosional */}
                <div className="bg-stone-50 border border-stone-200 rounded-[2rem] p-6">
                  <div className="flex items-center gap-2 mb-3 text-violet-600 font-black text-[9px] uppercase tracking-widest">
                    <Eye size={14} /> Lanskap Perasaanmu
                  </div>
                  <p className="text-sm text-stone-700 leading-relaxed font-medium">{analysis.desc}</p>
                </div>

                {/* Potensi Transformasi */}
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 rounded-[2rem] p-6 shadow-inner">
                  <div className="flex items-center gap-2 mb-3 text-violet-700 font-black text-[9px] uppercase tracking-widest">
                    <Wand2 size={14} /> Alchemy Emosional
                  </div>
                  <p className="text-sm text-stone-800 leading-relaxed font-bold italic">"{analysis.future}"</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-violet-50 rounded-2xl flex flex-col gap-1 shadow-sm">
                    <Fingerprint size={16} className="text-violet-400 mb-1" />
                    <span className="text-[10px] font-bold text-stone-800 uppercase tracking-tighter">Strategi</span>
                    <p className="text-[9px] text-stone-500 leading-tight italic">Beri nama pada setiap perasaanmu.</p>
                  </div>
                  <div className="p-4 bg-white border border-violet-50 rounded-2xl flex flex-col gap-1 shadow-sm">
                    <HeartHandshake size={16} className="text-purple-400 mb-1" />
                    <span className="text-[10px] font-bold text-stone-800 uppercase tracking-tighter">Hasil</span>
                    <p className="text-[9px] text-stone-500 leading-tight italic">Kedamaian batin yang stabil.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="p-8 pt-0 bg-white/50 backdrop-blur-sm">
            {isReading ? (
              <button onClick={() => setIsReading(false)} className="w-full py-5 bg-violet-600 hover:bg-violet-700 text-white rounded-[1.5rem] font-bold shadow-xl shadow-violet-100 transition-all flex items-center justify-center gap-2 group active:scale-95">
                Mulai Validasi <ArrowRight size={20} className="group-hover:translate-x-1" />
              </button>
            ) : step < questions.length ? (
              <div className="flex flex-col gap-3">
                <button onClick={() => handleAnswer(true)} className="w-full py-4 bg-violet-600 text-white rounded-2xl font-bold shadow-lg shadow-violet-100 hover:bg-violet-700 transition-all active:scale-95">Iya, Sering</button>
                <button onClick={() => handleAnswer(false)} className="w-full py-4 bg-stone-100 text-stone-600 rounded-2xl font-bold hover:bg-stone-200 transition-all active:scale-95">Jarang Sekali</button>
              </div>
            ) : (
              <button onClick={onNext} className="w-full py-5 bg-stone-800 hover:bg-black text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.25em] shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-95 group">
                Lanjut ke Penutup Bab 5 <ArrowRight size={18} className="group-hover:translate-x-1" />
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