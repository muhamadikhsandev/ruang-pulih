"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Award, Download, Home, Leaf, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { QRCodeCanvas } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export default function CertificatePage() {
  const hiddenRef = useRef<HTMLDivElement>(null); // Ref untuk "Master" yang di-download
  const [userName, setUserName] = useState("Jiwa yang Berani");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [inputName, setInputName] = useState("");
  const [zoom, setZoom] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);

  // Efek Zoom untuk Preview Layar HP/Laptop
  useEffect(() => {
    const handleResize = () => {
      const padding = 32; 
      const availableWidth = window.innerWidth - padding;
      const availableHeight = window.innerHeight - 200; 
      const scaleWidth = availableWidth / 1123;
      const scaleHeight = availableHeight / 794;
      const finalScale = Math.min(scaleWidth, scaleHeight);
      setZoom(finalScale > 1 ? 1 : finalScale); 
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDownload = async () => {
    if (!hiddenRef.current) return;
    setIsDownloading(true);
    try {
      // Ambil gambar dari elemen MASTER (Hidden) dengan Pixel Ratio Tinggi
      const dataUrl = await toPng(hiddenRef.current, { 
        quality: 1.0, 
        pixelRatio: 3, // Biar hasil PDF tajam (HD)
        cacheBust: true 
      });

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, 297, 210); // Ukuran A4 Landscape dalam mm
      pdf.save(`Sertifikat-${userName}.pdf`);
    } catch (err) {
      console.error(err);
      alert("Gagal mengunduh sertifikat, coba lagi bro!");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      setUserName(inputName);
      setIsModalOpen(false);
    }
  };

  // Komponen Sertifikat (Dibuat fungsi agar isinya selalu sama antara Preview & Master)
  const CertificateContent = () => (
    <div className="flex-1 border-2 border-[#d1fae5] m-1 relative overflow-hidden flex flex-col items-center justify-center p-12 text-center bg-white">
      {/* Background Ornaments */}
      <div className="absolute top-[-25%] right-[-15%] w-[500px] h-[500px] bg-[#d1fae5] opacity-40 rounded-full blur-3xl" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[384px] h-[384px] bg-[#f0fdfa] rounded-full blur-3xl" />
      
      <div className="relative z-10 flex flex-col items-center mb-8">
        <div className="p-5 bg-[#f0fdf4] rounded-full mb-4 border border-[#d1fae5] relative">
          <Award size={54} className="text-[#059669]" />
          <Leaf size={18} className="absolute -top-1 -right-1 text-[#34d399]" />
        </div>
        <h1 className="text-[12px] font-black uppercase tracking-[0.6em] text-[#047857] opacity-60">Sertifikat Apresiasi Diri</h1>
      </div>

      <div className="relative z-10 max-w-3xl">
        <h2 className="text-7xl font-serif italic font-semibold text-[#064e3b] mb-6 tracking-tighter">Langkah Menuju Pulih</h2>
        <div className="mb-12 py-5 border-b-2 border-[#d1fae5] inline-block px-16 relative">
          <p className="text-[11px] uppercase text-[#10b981] font-black mb-3 tracking-[0.3em]">Diberikan kepada</p>
          <h3 className="text-6xl font-black text-[#1c1917] tracking-tight">{userName}</h3>
          <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 bg-[#ffffff] px-3">
             <ShieldCheck size={18} className="text-[#6ee7b7]" />
          </div>
        </div>
        <p className="text-[#57534e] text-sm max-w-xl mx-auto leading-relaxed font-medium">
          Atas keberanianmu melangkah, mengakui luka, dan memilih untuk tetap tumbuh. 
          Kamu adalah bukti bahwa kesembuhan adalah perjalanan yang layak diperjuangkan.
        </p>
      </div>

      <div className="relative z-10 w-full flex justify-between items-end mt-16 px-12 text-left">
        <div className="flex items-center gap-6">
          <div className="p-3 bg-[#ffffff] border border-[#d1fae5] rounded-2xl shadow-sm">
            <QRCodeCanvas value={`https://ruang-pulih.com/v/${encodeURIComponent(userName)}`} size={80} level="H" />
          </div>
          <div>
            <span className="text-md font-black uppercase text-[#064e3b] block mb-1 leading-none">Ruang Pulih</span>
            <p className="text-[10px] text-[#059669] font-bold uppercase tracking-widest">Verifikasi Digital Aktif</p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <p className="font-serif italic text-5xl text-[#064e3b] opacity-30 mb-[-12px] select-none">M. Ikhsan</p>
          <div className="w-52 h-[2px] bg-[#d1fae5] mb-2" />
          <p className="text-[11px] font-black uppercase text-[#1c1917] tracking-[0.2em]">Muhamad Ikhsan</p>
          <p className="text-[9px] text-[#059669] font-bold uppercase tracking-widest">Konselor Utama & Pengembang</p>
        </div>
      </div>
      
      <div className="absolute top-8 left-8 border-t-4 border-l-4 border-[#d1fae5] w-16 h-16 rounded-tl-xl" />
      <div className="absolute bottom-8 right-8 border-b-4 border-r-4 border-[#d1fae5] w-16 h-16 rounded-br-xl" />
    </div>
  );

  return (
    <main className="min-h-dvh bg-[#fafaf9] flex flex-col items-center p-4 overflow-hidden font-sans">
      
      {/* 1. MASTER RENDER (Tersembunyi dari user, khusus buat di-foto jadi PDF) */}
      <div className="fixed left-[-9999px] top-0 pointer-events-none">
        <div 
          ref={hiddenRef}
          className="w-[1123px] h-[794px] border-[16px] border-[#ecfdf5] p-2 flex flex-col"
        >
          <CertificateContent />
        </div>
      </div>

      {/* 2. UI HEADER & MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-center mb-6">Tulis Namamu</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" autoFocus value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="w-full px-6 py-4 bg-[#f5f5f4] rounded-2xl outline-none border-2 border-transparent focus:border-[#10b981]"
                placeholder="Nama Lengkap..."
              />
              <button type="submit" className="w-full py-4 bg-[#059669] text-white rounded-2xl font-bold">
                Terapkan Nama
              </button>
            </form>
          </div>
        </div>
      )}

      <nav className="w-full max-w-4xl flex justify-between items-center mb-6 shrink-0 z-50">
        <Link href="/" className="flex items-center gap-2 text-[#a8a29e] hover:text-[#047857]">
          <Home size={20} /> <span className="font-bold text-sm">Beranda</span>
        </Link>
        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center gap-2 bg-[#10b981] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg active:scale-95 transition-all disabled:opacity-50"
        >
          {isDownloading ? "Memproses..." : <><Download size={16} /> <span>Unduh PDF HD</span></>}
        </button>
      </nav>

      {/* 3. PREVIEW RENDER (Yang dilihat user) */}
      <div className="flex-1 w-full flex items-center justify-center relative">
        <div 
          style={{ 
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
          }}
          className="w-[1123px] h-[794px] border-[16px] border-[#ecfdf5] p-2 flex flex-col shadow-2xl shrink-0 absolute bg-white"
        >
          <CertificateContent />
        </div>
      </div>

      <div className="mt-auto pt-4 text-[#a8a29e] text-[10px] font-bold text-center tracking-widest uppercase shrink-0">
        *Preview otomatis menyesuaikan layar perangkatmu
      </div>
    </main>
  );
}