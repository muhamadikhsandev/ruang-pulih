"use client";
import React from 'react';
import { Award, Download, Home, Leaf, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CertificatePage() {
  const handleDownload = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-stone-50 py-12 px-4 flex flex-col items-center font-sans print:bg-white print:py-0 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Navigasi - Print Hidden */}
      <div className="max-w-4xl w-full flex justify-between items-center mb-8 print:hidden">
        <Link href="/" className="flex items-center gap-2 text-stone-400 hover:text-emerald-700 transition-colors group">
          <Home size={19} />
          <span className="font-semibold text-sm group-hover:underline">Kembali</span>
        </Link>
        <button 
          onClick={handleDownload}
          className="flex items-center gap-2.5 bg-emerald-600 text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95"
        >
          <Download size={18} /> Simpan PDF
        </button>
      </div>

      {/* Area Sertifikat */}
      <div className="relative max-w-4xl w-full aspect-[1.414/1] bg-white shadow-[0_30px_60px_rgba(16,185,129,0.12)] border-[16px] border-emerald-50 p-2 flex flex-col print:shadow-none print:border-[12px]">
        
        {/* Border Dalam Premium */}
        <div className="flex-1 border-2 border-emerald-100/60 m-1 relative overflow-hidden flex flex-col items-center justify-center p-12 text-center">
          
          {/* Background Decor - Full Green Gradient Focus */}
          <div className="absolute top-[-25%] right-[-15%] w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-teal-50 rounded-full blur-3xl" />
          
          {/* Header */}
          <div className="relative z-10 flex flex-col items-center mb-8">
            <div className="p-5 bg-emerald-50 rounded-full mb-4 border border-emerald-100 shadow-sm relative">
              <Award size={48} className="text-emerald-600" strokeWidth={1.5} />
              <Leaf size={16} className="absolute -top-1 -right-1 text-emerald-400" />
            </div>
            <h1 className="text-[11px] font-black tracking-[0.5em] uppercase text-emerald-700/70">
              Sertifikat Apresiasi Diri
            </h1>
          </div>

          {/* Isi Sertifikat */}
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif italic font-semibold text-emerald-900 mb-6">
              Langkah Menuju Pulih
            </h2>
            <p className="text-stone-600 max-w-lg mx-auto leading-relaxed mb-10 text-sm font-medium">
              Diberikan sebagai pengakuan atas keberanian luar biasa dalam menghadapi masa lalu, 
              menghargai setiap proses pertumbuhan, dan berkomitmen pada kesehatan mental diri sendiri.
            </p>

            {/* Nama Penerima - Strong Emerald Accent */}
            <div className="mb-12 py-4 border-b-2 border-emerald-100 inline-block px-14 relative">
              <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-500 font-bold mb-2">Diberikan kepada</p>
              <h3 className="text-4xl font-extrabold text-stone-800 tracking-tight">
                Jiwa yang Berani
              </h3>
              <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 bg-white px-2">
                 <ShieldCheck size={12} className="text-emerald-300" />
              </div>
            </div>
          </div>

          {/* Footer Sertifikat */}
          <div className="relative z-10 w-full flex justify-between items-end mt-4 px-12">
            {/* Logo Ruang Pulih */}
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center">
                    <Leaf size={10} className="text-white" fill="currentColor" />
                </div>
                <span className="text-xs font-black uppercase tracking-tighter text-emerald-900">Ruang Pulih</span>
              </div>
              <p className="text-[9px] text-emerald-700/60 font-bold">Official Digital Affirmation • 2026</p>
            </div>
            
            {/* Tanda Tangan */}
            <div className="flex flex-col items-center">
              <p className="font-serif italic text-3xl text-emerald-900/40 mb-[-8px] select-none">
                M. Ikhsan
              </p>
              <div className="w-40 h-[1.5px] bg-emerald-200 mb-2" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-950">Muhamad Ikhsan</p>
              <p className="text-[9px] text-emerald-600 uppercase font-bold tracking-tighter">Konselor Utama</p>
            </div>
          </div>

          {/* Ornamen Sudut - More Visible Emerald */}
          <div className="absolute top-6 left-6 border-t-2 border-l-2 border-emerald-200/50 w-12 h-12" />
          <div className="absolute bottom-6 right-6 border-b-2 border-r-2 border-emerald-200/50 w-12 h-12" />
        </div>
      </div>

      {/* Global CSS for Print */}
      <style jsx global>{`
        @media print {
          body { background: white !important; }
          nav, button, .print-hidden { display: none !important; }
          @page { size: landscape; margin: 0; }
        }
      `}</style>
    </main>
  );
}