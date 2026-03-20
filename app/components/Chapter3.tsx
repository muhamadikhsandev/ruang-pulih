"use client";
import React, { useState } from 'react';
import { 
  Footprints, ArrowRight, Sparkles, Activity, 
  Waves, Thermometer, ShieldAlert, HeartPulse 
} from 'lucide-react';

interface ChapterProps {
  onNext: () => void;
  onScoreUpdate: (score: number) => void;
}

export default function Chapter3({ onNext, onScoreUpdate }: ChapterProps) {
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

  const getAnalysis = (s: number) => {
    if (s <= 3) return { 
      status: "Tubuh Terkoneksi", 
      desc: "Kamu memiliki kesadaran tubuh yang baik. Sinyal stresmu terdeteksi dan terkelola sebelum menumpuk menjadi beban fisik.",
      future: "Kesehatan fisikmu akan sangat terjaga karena kamu tahu kapan harus berhenti sebelum tubuhmu memaksamu berhenti."
    };
    if (s <= 7) return { 
      status: "Respon Defensif", 
      desc: "Tubuhmu sedang menyimpan banyak cerita yang belum sempat kamu ceritakan. Ketegangan fisik ini adalah 'teriakan' minta istirahat.",
      future: "Saat kamu mulai merilis emosi ini, kamu akan merasakan energi fisik yang luar biasa ringan, seolah beban berat baru saja diangkat."
    };
    return { 
      status: "Somatisasi Tinggi", 
      desc: "Tubuhmu berada dalam mode 'Survival' yang kronis. Kamu sudah terlalu lama mengabaikan rasa sakit demi terus bertahan hidup.",
      future: "Proses pemulihan ini akan mengembalikan kendali tubuhmu. Kamu akan kembali merasa 'hidup' dan hadir sepenuhnya di setiap momen."
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
    <section className="min-w-full h-full snap-start flex flex-col items-center justify-center p-4 bg-[#f4f7fa] relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[110px]" />
        <div className="absolute top-[10%] right-[0%] w-[30%] h-[30%] bg-indigo-50/50 rounded-full blur-[80px]" />
        <Waves className="absolute bottom-20 left-10 text-blue-200/30" size={50} />
      </div>

      <div className="max-w-md w-full relative z-10 flex flex-col h-[85vh] md:h-[80vh]">
        <div className="bg-white/90 backdrop-blur-2xl rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(59,130,246,0.12)] border border-blue-50 flex flex-col h-full overflow-hidden">
          
          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto scrollbar-hide p-8 md:p-10">
            {isReading ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 text-center flex flex-col items-center">
                <div className="p-5 bg-blue-50 rounded-[2rem] mb-6 border border-blue-100">
                  <Activity className="text-blue-600" size={42} />
                </div>
                <span className="text-[10px] font-black tracking-[0.4em] text-blue-400 uppercase mb-2">Psikosomatik</span>
                <h2 className="text-3xl font-serif font-bold text-stone-800 leading-tight mb-6">Bab 3: <br/><span className="italic text-blue-600">Suara Tubuh</span></h2>
                <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100 italic text-blue-800 text-sm leading-relaxed mb-4">
                  "Tubuhmu mengingat setiap emosi yang coba disembunyikan oleh pikiranmu."
                </div>
              </div>

            ) : step < questions.length ? (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="w-full h-1.5 bg-blue-50 rounded-full mb-10 overflow-hidden">
                  <div className="h-full bg-blue-400 transition-all duration-500" style={{ width: `${(step / questions.length) * 100}%` }} />
                </div>
                <div className="text-center">
                  <span className="text-[10px] font-black tracking-widest text-blue-400 uppercase block mb-4">Sensasi Tubuh {step + 1} / 10</span>
                  <h3 className="text-xl md:text-2xl font-bold text-stone-800 leading-snug">{questions[step]}</h3>
                </div>
              </div>

            ) : (
              <div className="animate-in fade-in zoom-in-95 duration-700 space-y-6">
                <div className="text-center pb-2">
                  <div className="inline-flex p-4 bg-blue-50 rounded-full border border-blue-100 mb-4">
                    <Footprints className="text-blue-500" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-800 mb-1">Analisis Fisik</h3>
                  <div className="inline-block px-5 py-1.5 bg-blue-600 text-white rounded-full font-black text-xs uppercase tracking-widest">
                    {analysis.status}
                  </div>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-[2rem] p-6">
                  <div className="flex items-center gap-2 mb-3 text-blue-600 font-black text-[9px] uppercase tracking-widest">
                    <ShieldAlert size={14} /> Beban Tersimpan
                  </div>
                  <p className="text-sm text-stone-700 leading-relaxed font-medium">{analysis.desc}</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-[2rem] p-6 shadow-inner">
                  <div className="flex items-center gap-2 mb-3 text-blue-700 font-black text-[9px] uppercase tracking-widest">
                    <HeartPulse size={14} /> Potensi Kesembuhan
                  </div>
                  <p className="text-sm text-stone-800 leading-relaxed font-bold italic">"{analysis.future}"</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-blue-50 rounded-2xl flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter">Solusi</span>
                    <p className="text-[9px] text-stone-500 leading-tight italic">Mulai latihan pernapasan perut.</p>
                  </div>
                  <div className="p-4 bg-white border border-blue-50 rounded-2xl flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter">Hasil</span>
                    <p className="text-[9px] text-stone-500 leading-tight italic">Tidur lebih nyenyak & badan enteng.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Fixed Action Bar */}
          <div className="p-8 pt-0 bg-white/50 backdrop-blur-sm">
            {isReading ? (
              <button onClick={() => setIsReading(false)} className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[1.5rem] font-bold shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-2 group active:scale-95">
                Dengarkan Tubuh <ArrowRight size={20} className="group-hover:translate-x-1" />
              </button>
            ) : step < questions.length ? (
              <div className="flex flex-col gap-3">
                <button onClick={() => handleAnswer(true)} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95">Iya, Terasa</button>
                <button onClick={() => handleAnswer(false)} className="w-full py-4 bg-stone-100 text-stone-600 rounded-2xl font-bold hover:bg-stone-200 transition-all active:scale-95">Tidak Merasakan</button>
              </div>
            ) : (
              <button onClick={onNext} className="w-full py-5 bg-stone-800 hover:bg-black text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.25em] shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-95 group">
                Lanjut ke Tantangan Bab 4 <ArrowRight size={18} className="group-hover:translate-x-1" />
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