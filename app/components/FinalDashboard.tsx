"use client";
import React from 'react';
import { Moon, MessageCircle, RotateCcw, Sparkles, Award } from 'lucide-react';
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

  let character = "Samudra yang Damai";
  let desc = "Kamu telah menemukan pusat ketenanganmu. Teruslah menjaga cahaya di dalam hatimu.";
  
  if (avgPercent >= 70) {
    character = "Penyintas yang Kuat";
    desc = "Bebanmu berat, tapi kemampuanmu bertahan adalah sebuah keajaiban. Kamu butuh istirahat.";
  } else if (avgPercent >= 40) {
    character = "Tunas yang Resilien";
    desc = "Kamu sedang berjuang menembus tanah keras masa lalumu. Kamu mulai memahami pola lukamu.";
  }

  const sendToWA = () => {
    const text = `Halo Ruang Pulih, saya telah menyelesaikan Sesi Refleksi.\n\n*Hasil:* ${character} (${avgPercent}% Intensitas)\n*Detail Skor:* \n- Bab 1: ${scores.c1 * 10}%\n- Bab 2: ${scores.c2 * 10}%\n- Bab 3: ${scores.c3 * 10}%\n- Bab 4: ${scores.c4 * 10}%\n- Bab 5: ${scores.c5 * 10}%\n\nTerima kasih.`;
    window.open(`https://wa.me/628989379116?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="min-w-full h-full snap-start flex flex-col items-center justify-center p-8 bg-stone-50 overflow-y-auto">
      <div className="max-w-md w-full py-10">
        <div className="text-center mb-8">
          <Moon className="mx-auto text-stone-400 mb-4" size={40} />
          <h2 className="text-3xl font-serif font-bold text-stone-800">Ringkasan Jiwa</h2>
        </div>
        
        <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-stone-200 mb-6">
          <div className="text-center mb-6">
            <p className="text-xs font-bold text-stone-400 uppercase tracking-[0.2em] mb-2">Karakter Jiwamu</p>
            <h3 className="text-2xl font-bold text-stone-800 mb-2">{character}</h3>
            <div className="w-20 h-1 bg-stone-800 mx-auto rounded-full" />
          </div>
          
          <p className="text-stone-600 text-center italic mb-8 leading-relaxed">"{desc}"</p>
          
          <div className="space-y-4">
            {[
              { label: "Luka Inner Child", val: scores.c1 },
              { label: "Beban Masa Lalu", val: scores.c2 },
              { label: "Ketegangan Tubuh", val: scores.c3 },
              { label: "Kepadatan Emosi", val: scores.c4 },
              { label: "Kerapuhan Relasi", val: scores.c5 },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center text-sm font-medium">
                <span className="text-stone-500">{item.label}</span>
                <span className="text-stone-800">{item.val * 10}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={onReset} 
              className="flex items-center justify-center gap-2 py-4 border-2 border-stone-200 rounded-2xl font-bold text-stone-500 hover:bg-stone-100 transition-all active:scale-95"
            >
              <RotateCcw size={18} /> Ulangi
            </button>
            <button 
              onClick={sendToWA} 
              className="flex items-center justify-center gap-2 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95"
            >
              <MessageCircle size={18} /> Konsultasi
            </button>
          </div>

          {/* TOMBOL SERTIFIKAT */}
          <Link 
            href="/certificate" 
            className="flex items-center justify-center gap-3 py-4 bg-stone-800 text-white rounded-2xl font-bold shadow-xl hover:bg-black transition-all active:scale-[0.98] group"
          >
            <Award size={20} className="group-hover:rotate-12 transition-transform" />
            Ambil Sertifikat Pulih
          </Link>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2">
            <Sparkles size={12} /> Teruslah Bertumbuh <Sparkles size={12} />
          </p>
        </div>
      </div>
    </section>
  );
}