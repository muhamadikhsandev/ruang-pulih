"use client";
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Sun, Cloud, Sparkles, ArrowRight, Stars } from 'lucide-react';

export default function WelcomeScreen({ onNext }: { onNext: () => void }) {
  return (
    <section className="relative min-w-full h-screen overflow-hidden flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#fff5f5] via-[#fff0f6] to-[#f3f0ff] snap-start">
      
      {/* --- Latar Belakang Dekoratif (Animated) --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-rose-200/30 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-violet-200/30 rounded-full blur-[120px]" 
        />
      </div>

      {/* --- Ikon Melayang (Floating Icons) --- */}
      <motion.div 
        animate={{ y: [0, -20, 0] }} 
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] right-[10%] text-rose-300/40 hidden md:block"
      >
        <Sun size={56} />
      </motion.div>
      
      <motion.div 
        animate={{ x: [-10, 10, -10] }} 
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[12%] text-blue-200/50"
      >
        <Cloud size={48} />
      </motion.div>

      {/* --- Konten Utama --- */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        
        {/* Logo/Icon Container */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          className="relative mb-10"
        >
          <div className="absolute inset-0 bg-rose-400 blur-2xl opacity-20 animate-pulse" />
          <div className="relative bg-white/80 backdrop-blur-2xl p-7 rounded-[2.5rem] shadow-2xl border border-white group cursor-pointer overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Heart size={54} className="text-rose-500 fill-rose-500/20" />
            </motion.div>
            {/* Glossy Effect */}
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:left-full transition-all duration-700" />
          </div>
          <motion.div 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-4 -right-4 text-amber-400"
          >
            <Sparkles size={24} />
          </motion.div>
        </motion.div>

        {/* Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-800 leading-[1.1]">
            Halo, Selamat <br />
            <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-violet-600 bg-clip-text text-transparent">
              Datang di Ruang Pulih
            </span>
          </h1>
          
          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-md mx-auto leading-relaxed">
            Tempat tenang untuk <span className="text-rose-500 font-semibold underline decoration-rose-200 decoration-4 underline-offset-4">merawat luka</span> masa kecil dan bertumbuh jadi utuh.
          </p>
        </motion.div>

        {/* Interactive CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 relative"
        >
          <button 
            onClick={onNext}
            className="group relative flex flex-col items-center gap-4 transition-all active:scale-95"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 group-hover:text-rose-400 transition-colors">
              Mulai Perjalanan
            </span>
            
            <div className="relative">
              {/* Outer Ring Animation */}
              <div className="absolute inset-0 bg-rose-400 rounded-full blur group-hover:blur-md opacity-20 group-hover:opacity-40 transition-all animate-ping" />
              
              <div className="relative p-5 bg-white rounded-full shadow-xl shadow-rose-200/50 text-rose-500 border border-rose-50 transition-transform group-hover:translate-x-1">
                <ArrowRight size={32} strokeWidth={2.5} />
              </div>
            </div>
          </button>
        </motion.div>
      </div>

      {/* --- Progress Indicator (Subtle) --- */}
      <div className="absolute bottom-8 flex gap-2">
        <div className="w-8 h-1.5 bg-rose-400 rounded-full" />
        <div className="w-2 h-1.5 bg-slate-200 rounded-full" />
        <div className="w-2 h-1.5 bg-slate-200 rounded-full" />
      </div>
    </section>
  );
}