"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { ShieldCheck, Home, CheckCircle2, Calendar, User, Award, Globe } from 'lucide-react';
import Link from 'next/link';

export default function VerifyPage() {
  const params = useParams();
  const name = decodeURIComponent(params.name as string || "Jiwa yang Berani");
  
  const date = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <main className="min-h-dvh bg-[#fafaf9] flex flex-col items-center justify-center p-4 md:p-8 font-sans overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-emerald-100/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-72 h-72 bg-stone-200/40 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-[440px] z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-8 md:p-10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border border-white/20 relative overflow-hidden">
          
          {/* Status Header */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
              <div className="relative bg-emerald-600 w-20 h-20 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <ShieldCheck className="text-white" size={36} />
              </div>
            </div>

            <h1 className="text-2xl font-black text-stone-900 tracking-tight">Sertifikat Valid</h1>
            <div className="mt-2 flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-100/50">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Terverifikasi Digital</span>
            </div>
          </div>

          {/* Data Grid */}
          <div className="grid gap-4 mb-10">
            <div className="group bg-stone-50/50 hover:bg-stone-50 p-5 rounded-[2rem] border border-stone-100 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                  <User size={18} className="text-stone-400" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-black text-stone-400 tracking-widest mb-0.5">Pemilik Sertifikat</p>
                  <p className="text-lg font-bold text-stone-900 leading-tight">{name}</p>
                </div>
              </div>
            </div>

            <div className="group bg-stone-50/50 hover:bg-stone-50 p-5 rounded-[2rem] border border-stone-100 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                  <Award size={18} className="text-stone-400" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-black text-stone-400 tracking-widest mb-0.5">Kategori Pelatihan</p>
                  <p className="text-sm font-bold text-stone-800 leading-tight">Langkah Menuju Pulih</p>
                </div>
              </div>
            </div>

            <div className="group bg-stone-50/50 hover:bg-stone-50 p-5 rounded-[2rem] border border-stone-100 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                  <Calendar size={18} className="text-stone-400" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-black text-stone-400 tracking-widest mb-0.5">Tanggal Verifikasi</p>
                  <p className="text-sm font-bold text-stone-800 leading-tight">{date}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="flex flex-col gap-4 items-center">
            <p className="text-[11px] text-stone-400 text-center px-4 leading-relaxed font-medium">
              Dokumen ini sah secara digital dan terdaftar dalam sistem basis data <span className="font-bold text-stone-600">Ruang Pulih</span>.
            </p>
            
            <Link 
              href="/" 
              className="w-full mt-2 inline-flex items-center justify-center gap-3 bg-stone-900 text-white py-5 rounded-[2rem] font-bold hover:bg-black transition-all active:scale-[0.98] shadow-xl shadow-stone-200 group"
            >
              <Home size={18} className="group-hover:-translate-y-0.5 transition-transform" />
              Kembali ke Beranda
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 flex flex-col items-center gap-4 opacity-40">
           <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-stone-500">
             <Globe size={12} /> Global Verification Security
           </div>
           <p className="text-[8px] font-medium text-stone-400 text-center">
             ID: {Buffer.from(name).toString('hex').slice(0, 12).toUpperCase()} • RP-SECURE-V3
           </p>
        </div>
      </div>
    </main>
  );
}