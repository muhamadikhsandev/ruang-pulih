"use client";
import React from 'react';
import { 
  Moon, MessageCircle, RotateCcw, Sparkles, 
  Award, TrendingUp, ShieldCheck, HeartPulse 
} from 'lucide-react';
import Link from 'next/link';

interface Scores {
  c1: number;
  c2: number;
  c3: number;
  c4: number;
  c5: number;
}

export default function FinalDashboard({ scores, onReset }: { scores: Scores, onReset: () => void }) {
  const totalScore = scores.c1 + scores.c2 + scores.c3 + scores.c4 + scores.c5;
  const avgPercent = Math.round((totalScore / 50) * 100);

  // Logika Analisis Akhir (Tahu Diri & Transformasi)
  const getFinalAnalysis = (percent: number) => {
    if (percent >= 70) return {
      character: "Penyintas yang Kuat",
      desc: "Beban yang kamu pikul sangat berat, namun kemampuanmu untuk tetap berdiri adalah sebuah keajaiban. Kamu tidak perlu selalu kuat sendirian.",
      future: "Ketika kamu mulai melepas beban ini, ketangguhanmu akan berubah menjadi kebijaksanaan luar biasa yang bisa membantu banyak orang."
    };
    if (percent >= 40) return {
      character: "Tunas yang Resilien",
      desc: "Kamu sedang dalam proses menembus tanah keras masa lalu. Kamu mulai sadar akan polamu dan itu adalah langkah awal keberanian.",
      future: "Sebentar lagi kamu akan tumbuh mekar. Kejujuranmu pada diri sendiri adalah nutrisi terbaik untuk masa depan yang lebih tenang."
    };
    return {
      character: "Samudra yang Damai",
      desc: "Kamu telah menemukan pusat ketenangan di dalam dirimu. Luka masa lalu bukan lagi penjara, melainkan guru yang sudah kamu maafkan.",
      future: "Pertahankan cahaya ini. Ketenangan batinmu adalah aset terbesar yang akan menarik segala hal baik ke dalam hidupmu."
    };
  };

  const analysis = getFinalAnalysis(avgPercent);

  const sendToWA = () => {
    const text = `Halo Ruang Pulih, saya telah menyelesaikan Sesi Refleksi.\n\n*Hasil Akhir:* ${analysis.character}\n*Intensitas:* ${avgPercent}%\n\n*Detail Skor:* \n- Inner Child: ${scores.c1 * 10}%\n- Masa Lalu: ${scores.c2 * 10}%\n- Tubuh: ${scores.c3 * 10}%\n- Emosi: ${scores.c4 * 10}%\n- Relasi: ${scores.c5 * 10}%\n\nSaya ingin berkonsultasi lebih lanjut.`;
    window.open(`https://wa.me/628989379116?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="min-w-full h-full snap-start flex flex-col items-center bg-[#fdfcfb] overflow-y-auto scrollbar-hide">
      <div className="max-w-md w-full p-6 md:p-8 flex flex-col min-h-screen">
        
        {/* Header Section */}
        <div className="text-center mt-10 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex p-4 bg-stone-100 rounded-full mb-4 shadow-sm">
            <Moon className="text-stone-500" size={32} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-stone-800 tracking-tight">Ringkasan Jiwa</h2>
          <p className="text-stone-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Personal Growth Journey</p>
        </div>

        {/* Main Result Card */}
        <div className="bg-white rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] p-8 border border-stone-100 mb-6 animate-in zoom-in-95 duration-1000">
          <div className="text-center mb-8">
            <span className="px-4 py-1.5 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-100">
              Hasil Akhir
            </span>
            <h3 className="text-2xl font-bold text-stone-800 mt-4 mb-2">{analysis.character}</h3>
            <div className="flex items-center justify-center gap-2">
               <div className="h-1 w-12 bg-stone-200 rounded-full" />
               <Sparkles className="text-amber-400" size={16} />
               <div className="h-1 w-12 bg-stone-200 rounded-full" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-100">
              <div className="flex items-center gap-2 mb-2 text-stone-400 font-bold text-[9px] uppercase tracking-widest">
                <ShieldCheck size={14} /> Kondisi Saat Ini
              </div>
              <p className="text-sm text-stone-600 italic leading-relaxed">"{analysis.desc}"</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-orange-100">
              <div className="flex items-center gap-2 mb-2 text-orange-600 font-bold text-[9px] uppercase tracking-widest">
                <TrendingUp size={14} /> Potensi Masa Depan
              </div>
              <p className="text-sm text-stone-800 font-bold leading-relaxed">{analysis.future}</p>
            </div>
          </div>

          {/* Mini Stats Grid */}
          <div className="mt-8 pt-8 border-t border-stone-50 grid grid-cols-2 gap-y-4 gap-x-6">
            {[
              { label: "Inner Child", val: scores.c1 },
              { label: "Masa Lalu", val: scores.c2 },
              { label: "Respon Tubuh", val: scores.c3 },
              { label: "Dinamika Emosi", val: scores.c4 },
              { label: "Pola Relasi", val: scores.c5 },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter">{item.label}</span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-stone-400" style={{ width: `${item.val * 10}%` }} />
                  </div>
                  <span className="text-[10px] font-black text-stone-700">{item.val * 10}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 pb-12">
          <Link 
            href="/certificate" 
            className="flex items-center justify-center gap-3 py-5 bg-stone-800 text-white rounded-3xl font-bold shadow-2xl hover:bg-black transition-all active:scale-[0.97] group"
          >
            <Award size={20} className="group-hover:rotate-12 transition-transform text-amber-400" />
            Ambil Sertifikat Pulih
          </Link>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={sendToWA} 
              className="flex items-center justify-center gap-2 py-4 bg-emerald-600 text-white rounded-[2rem] font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95"
            >
              <MessageCircle size={18} /> Konsultasi
            </button>
            <button 
              onClick={onReset} 
              className="flex items-center justify-center gap-2 py-4 bg-white border-2 border-stone-200 text-stone-500 rounded-[2rem] font-bold hover:bg-stone-50 transition-all active:scale-95"
            >
              <RotateCcw size={18} /> Ulangi
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-auto py-6 text-center">
          <p className="text-[9px] text-stone-400 font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3">
            <HeartPulse size={12} className="text-rose-300" /> 
            You Are Doing Great
            <HeartPulse size={12} className="text-rose-300" />
          </p>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}