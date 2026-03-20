"use client";
import React from 'react';
import { Heart, Sun, Cloud, Sparkles, ArrowRight } from 'lucide-react';

export default function WelcomeScreen({ onNext }: { onNext: () => void }) {
  return (
    <section className="min-w-full h-full snap-start flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-rose-50 via-pink-100 to-violet-100 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/40 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-5%] right-[-5%] w-80 h-80 bg-pink-200/30 rounded-full blur-3xl" />
      <Sun className="absolute top-12 right-12 text-rose-300/60 animate-[spin_8s_linear_infinite]" size={48} />
      <Cloud className="absolute top-24 left-8 text-white/80 animate-[bounce_4s_ease-in-out_infinite]" size={40} />
      <Sparkles className="absolute bottom-32 right-16 text-pink-300/50 animate-pulse" size={28} />

      <div className="relative z-10 flex flex-col items-center">
        <div className="bg-white/70 backdrop-blur-md p-8 rounded-[3rem] shadow-[0_20px_50px_rgba(255,182,193,0.3)] mb-8 border border-white/50 group hover:scale-105 transition-transform duration-500">
          <Heart size={60} className="text-rose-400 fill-rose-400 drop-shadow-md group-hover:animate-ping" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600 mb-6 tracking-tight leading-tight">
          Halo, Selamat Datang <br />
          <span className="italic font-serif">di Ruang Pulih</span> ✨
        </h1>
        <p className="text-slate-600 max-w-md text-base md:text-lg font-medium leading-relaxed px-4">
          Tempat aman untukmu <span className="text-rose-400">memeluk luka</span> masa kecil dan tumbuh menjadi versi terbaikmu yang utuh.
        </p>
        <div className="mt-16 group cursor-pointer" onClick={onNext}>
          <div className="flex flex-col items-center gap-3 transition-all duration-300 group-hover:translate-x-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-rose-400/80">
              Geser untuk memulai
            </span>
            <div className="p-3 bg-white rounded-full shadow-lg text-rose-400 border border-rose-100 animate-bounce">
              <ArrowRight size={28} strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}