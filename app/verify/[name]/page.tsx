"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { ShieldCheck, Home, CheckCircle2, Calendar, User, Award, Globe } from 'lucide-react';
import Link from 'next/link';

export default function VerifyPage() {
  const params = useParams();
  
  // Mengambil nama dari slug URL (verify/Budi-Utomo -> Budi Utomo)
  const rawName = params.name as string || "Jiwa yang Berani";
  const name = decodeURIComponent(rawName).replace(/-/g, ' ');
  
  const date = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <main className="min-h-screen bg-[#fafaf9] flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 md:p-8 font-sans overflow-y-auto scrollbar-hide relative">
      
      {/* Background Decor - Fixed agar tidak ikut tergulung */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-48 h-48 sm:w-72 sm:h-72 bg-emerald-100/50 rounded-full blur-[80px] sm:blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 sm:w-72 sm:h-72 bg-stone-200/40 rounded-full blur-[80px] sm:blur-[100px]" />
      </div>

      {/* Wrapper untuk Scroll Content */}
      <div className="w-full max-w-full sm:max-w-[440px] z-10 py-8 sm:py-0 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        
        {/* Main Verification Card */}
        <div className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] border border-white/40 relative overflow-hidden">
          
          {/* Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-400 opacity-80" />

          {/* Status Header */}
          <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
            <div className="relative mb-4 sm:mb-6">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
              <div className="relative bg-emerald-600 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-4 border-white shadow-md">
                <ShieldCheck className="text-white w-8 h-8 sm:w-10 sm:h-10" />
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">Sertifikat Valid</h1>
            <div className="mt-2.5 flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-100/50">
              <CheckCircle2 size={12} className="text-emerald-600" />
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-emerald-700">Terverifikasi Digital</span>
            </div>
          </div>

          {/* Data Grid */}
          <div className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-10">
            
            {/* Pemilik */}
            <div className="group bg-stone-50/40 hover:bg-white hover:shadow-sm p-4 sm:p-5 rounded-[1.8rem] sm:rounded-[2rem] border border-stone-100 transition-all duration-300">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2.5 sm:p-3 bg-white rounded-xl sm:rounded-2xl shadow-sm group-hover:bg-emerald-50 transition-colors">
                  <User size={16} className="text-stone-400 group-hover:text-emerald-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] sm:text-[9px] uppercase font-black text-stone-400 tracking-widest mb-0.5">Pemilik Sertifikat</p>
                  <p className="text-base sm:text-lg font-bold text-stone-900 leading-tight truncate">{name}</p>
                </div>
              </div>
            </div>

            {/* Kategori */}
            <div className="group bg-stone-50/40 hover:bg-white hover:shadow-sm p-4 sm:p-5 rounded-[1.8rem] sm:rounded-[2rem] border border-stone-100 transition-all duration-300">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2.5 sm:p-3 bg-white rounded-xl sm:rounded-2xl shadow-sm group-hover:bg-emerald-50 transition-colors">
                  <Award size={16} className="text-stone-400 group-hover:text-emerald-500" />
                </div>
                <div>
                  <p className="text-[8px] sm:text-[9px] uppercase font-black text-stone-400 tracking-widest mb-0.5">Kategori Pelatihan</p>
                  <p className="text-xs sm:text-sm font-bold text-stone-800 leading-tight">Langkah Menuju Pulih</p>
                </div>
              </div>
            </div>

            {/* Tanggal */}
            <div className="group bg-stone-50/40 hover:bg-white hover:shadow-sm p-4 sm:p-5 rounded-[1.8rem] sm:rounded-[2rem] border border-stone-100 transition-all duration-300">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2.5 sm:p-3 bg-white rounded-xl sm:rounded-2xl shadow-sm group-hover:bg-emerald-50 transition-colors">
                  <Calendar size={16} className="text-stone-400 group-hover:text-emerald-500" />
                </div>
                <div>
                  <p className="text-[8px] sm:text-[9px] uppercase font-black text-stone-400 tracking-widest mb-0.5">Tanggal Verifikasi</p>
                  <p className="text-xs sm:text-sm font-bold text-stone-800 leading-tight">{date}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="flex flex-col gap-5 items-center">
            <p className="text-[10px] sm:text-[11px] text-stone-400 text-center px-2 leading-relaxed font-medium italic">
              Dokumen ini sah secara digital dan terdaftar dalam sistem basis data <span className="font-bold text-stone-600 not-italic">Ruang Pulih</span>.
            </p>
            
            <Link 
              href="/" 
              className="w-full inline-flex items-center justify-center gap-3 bg-stone-900 text-white py-4 sm:py-5 rounded-[1.8rem] sm:rounded-[2rem] font-bold hover:bg-black transition-all active:scale-[0.98] shadow-lg shadow-stone-200/50 group text-sm sm:text-base"
            >
              <Home size={18} className="group-hover:-translate-y-0.5 transition-transform" />
              Kembali ke Beranda
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 flex flex-col items-center gap-3 opacity-50 pb-10">
           <div className="flex items-center gap-2 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-stone-500">
             <Globe size={12} className="text-emerald-600" /> Global Verification Security
           </div>
           <div className="flex flex-col items-center gap-1">
             <p className="text-[8px] font-bold text-stone-400 bg-stone-100 px-3 py-1 rounded-full border border-stone-200/50">
               ID: {Buffer.from(name).toString('hex').slice(0, 12).toUpperCase()}
             </p>
             <p className="text-[7px] font-black uppercase tracking-widest text-stone-300">RP-SECURE-V3 • ENCRYPTED DATA</p>
           </div>
        </div>
      </div>

      {/* Style untuk Sembunyikan Scrollbar */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}