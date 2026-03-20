"use client";
import React, { useState } from 'react';
import { MessageCircleHeart, MoonStar, Sparkles, ChevronRight, BookOpen } from 'lucide-react';

interface AffirmationScreenProps {
  // Menambahkan '?' agar bersifat opsional dan mencegah crash jika lupa diisi
  onNext?: () => void;
}

export default function AffirmationScreen({ onNext }: AffirmationScreenProps) {
  const [isIslamic, setIsIslamic] = useState(false);
  const [affirmation, setAffirmation] = useState("Klik ikon di bawah untuk pesan hangat...");

  const content = {
    umum: {
      title: "Kotak Pesan Hangat",
      hint: "Ketuk untuk memeluk pesan baru",
      theme: "from-orange-50 to-orange-100/50",
      accent: "bg-orange-500 hover:bg-orange-600 shadow-orange-200",
      text: "text-orange-900",
      subText: "text-orange-600",
      card: "bg-orange-200",
      messages: [
        "Kamu sudah berusaha hebat hari ini! 🌟",
        "Istirahat bukan berarti kalah, kamu butuh jeda. ☕",
        "Inner child-mu bangga melihatmu sekarang. 🧸",
        "Tidak apa-apa untuk tidak menjadi sempurna. ✨",
        "Hari esok adalah kesempatan baru untuk mekar. 🌱"
      ]
    },
    islami: {
      title: "Pesan Penyejuk Hati",
      hint: "Ketuk untuk menjemput ketenangan",
      theme: "from-emerald-50 to-teal-100/50",
      accent: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200",
      text: "text-emerald-900",
      subText: "text-emerald-700",
      card: "bg-emerald-200",
      messages: [
        "Maka sesungguhnya bersama kesulitan ada kemudahan. (QS. 94:5) ✨",
        "Cukup Allah bagi kita, dan Dia sebaik-baik pelindung. ❤️",
        "Jangan berduka cita, sesungguhnya Allah bersama kita. 🌙",
        "Allah tidak membebani seseorang melainkan sesuai kesanggupannya. 🌿",
        "Titipkan lelahmu pada-Nya melalui sujud malam ini. 🤲"
      ]
    }
  };

  const currentTheme = isIslamic ? content.islami : content.umum;

  const nextAffirmation = () => {
    const list = currentTheme.messages;
    const random = list[Math.floor(Math.random() * list.length)];
    setAffirmation(random);
  };

  const toggleMode = () => {
    setIsIslamic(!isIslamic);
    setAffirmation(!isIslamic ? "Klik ikon di bawah untuk pesan penuh berkah..." : "Klik ikon di bawah untuk pesan hangat...");
  };

  // Handler internal untuk memastikan onNext ada sebelum dipanggil
  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Tombol Buka Bab diklik");
    if (typeof onNext === 'function') {
      onNext();
    } else {
      console.warn("Peringatan: Props onNext belum dipasang di file RuangPulih.tsx");
    }
  };

  return (
    <section className={`min-w-full h-full snap-start flex flex-col items-center justify-center p-8 bg-gradient-to-b ${currentTheme.theme} relative overflow-hidden transition-colors duration-700`}>
      
      {/* Tombol Buka Bab (Samping) */}
      <div 
        className="absolute right-0 top-1/2 -translate-y-1/2 z-50 flex items-center group cursor-pointer translate-x-4 hover:translate-x-0 transition-all duration-300 select-none"
        onClick={handleNextClick} 
      >
        <div className={`flex flex-col items-center gap-2 p-3 pr-6 rounded-l-3xl backdrop-blur-md border border-white/50 shadow-lg ${isIslamic ? 'bg-emerald-100/60' : 'bg-orange-100/60'}`}>
          <div className="animate-bounce-x flex items-center gap-1">
             <ChevronRight className={currentTheme.subText} size={20} />
          </div>
          <BookOpen className={currentTheme.subText} size={24} />
          <p className={`[writing-mode:vertical-lr] text-[10px] font-black tracking-widest uppercase ${currentTheme.subText}`}>
            Buka Bab
          </p>
        </div>
      </div>

      {/* Switcher Mode */}
      <div className="absolute top-10 z-20 flex bg-white/50 backdrop-blur-md p-1 rounded-full border border-white/50 shadow-sm">
        <button 
          onClick={() => isIslamic && toggleMode()}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${!isIslamic ? 'bg-orange-500 text-white shadow-md' : 'text-orange-900'}`}
        >
          Umum
        </button>
        <button 
          onClick={() => !isIslamic && toggleMode()}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${isIslamic ? 'bg-emerald-600 text-white shadow-md' : 'text-emerald-900'}`}
        >
          Islami
        </button>
      </div>

      <div className="max-w-md w-full text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-8">
          <h2 className={`text-3xl font-black tracking-tight transition-colors duration-500 ${isIslamic ? 'text-emerald-800' : 'text-orange-800'}`}>
            {currentTheme.title}
          </h2>
          <span className="text-3xl animate-bounce inline-block">{isIslamic ? '✨' : '💌'}</span>
        </div>

        <div className="group relative">
          <div className={`absolute inset-0 rounded-[3rem] rotate-3 scale-105 opacity-50 group-hover:rotate-0 transition-all duration-500 ${currentTheme.card}`} />
          <div className="relative bg-white/80 backdrop-blur-sm p-10 rounded-[3rem] shadow-xl border-2 border-white mb-10 min-h-[220px] flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2">
            <p className={`text-xl md:text-2xl font-semibold italic leading-relaxed animate-in fade-in zoom-in duration-500 ${currentTheme.text}`}>
              "{affirmation}"
            </p>
          </div>
        </div>

        <div className="relative inline-block">
          <button 
            onClick={nextAffirmation} 
            className={`relative z-10 text-white p-6 rounded-full transition-all active:scale-95 hover:scale-110 group ${currentTheme.accent}`}
          >
            <MessageCircleHeart size={36} className="group-hover:rotate-12 transition-transform" />
          </button>
          <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${currentTheme.accent}`} />
        </div>
        
        <div className="mt-6">
          <p className={`font-bold text-sm tracking-wide uppercase transition-colors ${currentTheme.subText}`}>
            {currentTheme.hint}
          </p>
        </div>
      </div>

      {/* Floating Icons */}
      <div className="absolute top-1/4 right-10 opacity-20 rotate-12 transition-all">
        {isIslamic ? <MoonStar size={40} className="text-emerald-400" /> : <Sparkles size={40} className="text-orange-400" />}
      </div>

      <style jsx global>{`
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1s infinite;
        }
      `}</style>
    </section>
  );
}