"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Award, Download, Home, Leaf, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { QRCodeCanvas } from 'qrcode.react';

export default function CertificatePage() {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [userName, setUserName] = useState("Jiwa yang Berani");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [inputName, setInputName] = useState("");
  const [zoom, setZoom] = useState(1);

  // Logic buat ngitung scale otomatis biar pas di layar HP
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        const padding = 32; // px
        const availableWidth = window.innerWidth - padding;
        const scale = availableWidth / 1123;
        setZoom(scale);
      } else {
        setZoom(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    try {
      const { generatePDF } = await import('./downloader');
      await generatePDF(certificateRef.current);
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal mengunduh PDF, coba lagi bro.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      setUserName(inputName);
      setIsModalOpen(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fafaf9] py-4 md:py-12 px-4 flex flex-col items-center overflow-x-hidden">
      
      {/* Modal Input Nama (Tetap Responsif) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="text-center mb-6">
              <div className="bg-emerald-50 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-emerald-600" size={28} />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-stone-800">Tulis Namamu</h2>
              <p className="text-stone-500 text-xs md:text-sm mt-2 px-4">Nama ini akan terukir di Sertifikat Apresiasi Dirimu.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text"
                autoFocus
                placeholder="Masukkan nama lengkap..."
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="w-full px-5 py-3.5 md:py-4 bg-stone-100 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-xl md:rounded-2xl outline-none transition-all font-semibold text-stone-800 text-sm md:text-base"
              />
              <button 
                type="submit"
                className="w-full py-3.5 md:py-4 bg-emerald-600 text-white rounded-xl md:rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95 text-sm md:text-base"
              >
                Terapkan Nama
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Navigasi - Stick to Top on Mobile */}
      <div className="max-w-4xl w-full flex justify-between items-center mb-6 md:mb-12">
        <Link href="/" className="flex items-center gap-2 text-[#a8a29e] hover:text-[#047857] transition-colors">
          <Home size={18} />
          <span className="font-semibold text-xs md:text-sm">Beranda</span>
        </Link>
        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 bg-[#10b981] text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-xs md:text-sm shadow-lg shadow-[#d1fae5] hover:bg-[#059669] transition-all active:scale-95"
        >
          <Download size={14} /> <span className="hidden xs:inline">Unduh PDF</span><span className="xs:hidden">Unduh</span>
        </button>
      </div>

      {/* Container Sertifikat dengan Magic Scaling */}
      <div 
        className="relative flex justify-center items-start w-full overflow-hidden"
        style={{ height: zoom < 1 ? `${794 * zoom}px` : '794px' }} // Jaga tinggi container biar gak kosong bawahnya
      >
        <div 
          ref={certificateRef}
          style={{ 
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            color: '#1c1917'
          }}
          className="relative w-[1123px] h-[794px] bg-[#ffffff] border-[16px] border-[#ecfdf5] p-2 flex flex-col shadow-2xl flex-shrink-0"
        >
          <div className="flex-1 border-2 border-[#d1fae5] m-1 relative overflow-hidden flex flex-col items-center justify-center p-12 text-center">
            
            <div className="absolute top-[-25%] right-[-15%] w-[500px] h-[500px] bg-[#d1fae5] opacity-40 rounded-full blur-3xl" />
            <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-[#f0fdfa] rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col items-center mb-8">
              <div className="p-5 bg-[#f0fdf4] rounded-full mb-4 border border-[#d1fae5] relative">
                <Award size={48} className="text-[#059669]" />
                <Leaf size={16} className="absolute -top-1 -right-1 text-[#34d399]" />
              </div>
              <h1 className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#047857] opacity-70">Sertifikat Apresiasi Diri</h1>
            </div>

            <div className="relative z-10 max-w-3xl">
              <h2 className="text-6xl font-serif italic font-semibold text-[#064e3b] mb-6 tracking-tight">Langkah Menuju Pulih</h2>
              <div className="mb-12 py-4 border-b-2 border-[#d1fae5] inline-block px-14 relative">
                <p className="text-[10px] uppercase text-[#10b981] font-bold mb-2 tracking-widest">Diberikan kepada</p>
                <h3 className="text-5xl font-extrabold text-[#1c1917]">{userName}</h3>
                <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 bg-[#ffffff] px-2">
                   <ShieldCheck size={12} className="text-[#6ee7b7]" />
                </div>
              </div>
            </div>

            <div className="relative z-10 w-full flex justify-between items-end mt-12 px-12 text-left">
              <div className="flex items-center gap-6">
                <div className="p-2 bg-[#ffffff] border border-[#d1fae5] rounded-lg">
                  <QRCodeCanvas value={`https://ruang-pulih.com/v/${encodeURIComponent(userName)}`} size={70} level="H" />
                </div>
                <div>
                  <span className="text-sm font-bold uppercase text-[#064e3b] block mb-1 leading-none">Ruang Pulih</span>
                  <p className="text-[9px] text-[#059669] opacity-70 font-bold leading-none uppercase">ID: RP-{Math.floor(1000 + Math.random() * 9000)}</p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <p className="font-serif italic text-4xl text-[#064e3b] opacity-40 mb-[-10px]">M. Ikhsan</p>
                <div className="w-44 h-[1.5px] bg-[#d1fae5] mb-2" />
                <p className="text-[10px] font-bold uppercase text-[#0c0a09] tracking-wider">Muhamad Ikhsan</p>
                <p className="text-[9px] text-[#059669] font-bold uppercase">Konselor Utama</p>
              </div>
            </div>

            <div className="absolute top-6 left-6 border-t-2 border-l-2 border-[#d1fae5] w-12 h-12" />
            <div className="absolute bottom-6 right-6 border-b-2 border-r-2 border-[#d1fae5] w-12 h-12" />
          </div>
        </div>
      </div>

      <div className="mt-8 text-[#a8a29e] text-[10px] font-medium text-center px-6">
        *Saran: Gunakan tampilan Desktop atau Landscape untuk preview terbaik. <br/>
        Hasil PDF akan tetap berkualitas A4 Landscape.
      </div>
    </main>
  );
}