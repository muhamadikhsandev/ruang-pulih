"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { ShieldCheck, Award, Home, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function VerifyPage() {
  const params = useParams();
  const name = decodeURIComponent(params.name as string);
  const date = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <main className="min-h-screen bg-[#fafaf9] flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-xl border-2 border-[#ecfdf5] text-center relative overflow-hidden">
        
        {/* Dekorasi Background */}
        <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-[#d1fae5] opacity-40 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <div className="bg-[#f0fdf4] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#d1fae5]">
            <ShieldCheck className="text-[#059669]" size={40} />
          </div>

          <h1 className="text-3xl font-black text-[#1c1917] mb-2">Sertifikat Valid</h1>
          <div className="flex items-center justify-center gap-2 text-[#059669] font-bold mb-8">
            <CheckCircle2 size={18} />
            <p className="uppercase tracking-widest text-xs">Terverifikasi oleh Ruang Pulih</p>
          </div>

          <div className="space-y-6 text-left bg-[#f9fafb] p-6 rounded-3xl border border-[#f1f5f9]">
            <div>
              <p className="text-[10px] uppercase font-black text-[#a8a29e] tracking-widest mb-1">Nama Pemilik</p>
              <p className="text-xl font-bold text-[#1c1917]">{name}</p>
            </div>
            
            <div>
              <p className="text-[10px] uppercase font-black text-[#a8a29e] tracking-widest mb-1">Jenis Sertifikat</p>
              <p className="text-md font-semibold text-[#57534e]">Apresiasi Langkah Menuju Pulih</p>
            </div>

            <div>
              <p className="text-[10px] uppercase font-black text-[#a8a29e] tracking-widest mb-1">Tanggal Terbit</p>
              <p className="text-md font-semibold text-[#57534e]">{date}</p>
            </div>
          </div>

          <div className="mt-10 space-y-3">
            <p className="text-sm text-[#a8a29e] leading-relaxed">
              Sertifikat ini diberikan sebagai tanda apresiasi atas keberanian dalam perjalanan pemulihan diri.
            </p>
            
            <div className="pt-6">
              <Link href="/" className="inline-flex items-center gap-2 bg-[#059669] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#047857] transition-all active:scale-95 shadow-lg shadow-[#059669]/20">
                <Home size={18} />
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-8 text-[10px] font-black uppercase text-[#a8a29e] tracking-[0.3em]">
        © Ruang Pulih Digital Verification
      </p>
    </main>
  );
}