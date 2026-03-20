"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Award, Download, Home, Leaf, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { QRCodeCanvas } from 'qrcode.react';
import { toJpeg } from 'html-to-image'; 
import { jsPDF } from 'jspdf';

export default function CertificatePage() {
  const hiddenRef = useRef<HTMLDivElement>(null); 
  const [userName, setUserName] = useState("Jiwa yang Berani");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [inputName, setInputName] = useState("");
  const [zoom, setZoom] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);

  // Auto-scaling biar preview muat di layar HP/Laptop
  useEffect(() => {
    const handleResize = () => {
      const padding = 32; 
      const availableWidth = window.innerWidth - padding;
      const availableHeight = window.innerHeight - 220; 
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
      // Optimasi Gambar: JPEG + Ratio 2 + Quality 0.7 (File Kecil & Tajam)
      const dataUrl = await toJpeg(hiddenRef.current, { 
        quality: 0.7, 
        pixelRatio: 2, 
        cacheBust: true,
        backgroundColor: '#ffffff'
      });

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        compress: true 
      });

      pdf.addImage(dataUrl, 'JPEG', 0, 0, 297, 210, undefined, 'FAST');
      pdf.save(`Sertifikat-Ruang-Pulih-${userName.replace(/\s+/g, '-')}.pdf`);
      
    } catch (err) {
      console.error("Gagal download:", err);
      alert("Waduh, gagal download sertifikatnya bro. Coba lagi ya!");
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

  // --- KOMPONEN INTI SERTIFIKAT ---
  const CertificateContent = () => {
    const verifyUrl = `https://ruangpulih.vercel.app/verify/${encodeURIComponent(userName)}`;
    
    return (
      <div className="flex-1 border-2 border-[#d1fae5] m-1 relative overflow-hidden flex flex-col items-center justify-center p-12 text-center bg-white">
        {/* Background Blur Ornaments */}
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

        {/* Footer Area: QR & Signature */}
        <div className="relative z-10 w-full flex justify-between items-end mt-16 px-12 text-left">
          <div className="flex items-center gap-6">
            {/* QR CODE - BISA DI-SCAN & DI-KLIK */}
            <a 
              href={verifyUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white border border-[#d1fae5] rounded-2xl shadow-sm hover:scale-105 transition-transform cursor-pointer block"
              title="Klik untuk verifikasi digital"
            >
              <QRCodeCanvas 
                value={verifyUrl} 
                size={80} 
                level="H" 
                bgColor={"#ffffff"}
                fgColor={"#064e3b"}
              />
            </a>
            <div>
              <span className="text-md font-black uppercase text-[#064e3b] block mb-1 leading-none">Ruang Pulih</span>
              <p className="text-[10px] text-[#059669] font-bold uppercase tracking-widest flex items-center gap-1">
                <CheckCircle2 size={10} /> Verifikasi Digital Aktif
              </p>
              <p className="text-[8px] text-[#a8a29e] mt-1 italic">Klik QR untuk cek keaslian</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="font-serif italic text-5xl text-[#064e3b] opacity-30 mb-[-12px] select-none">M. Ikhsan</p>
            <div className="w-52 h-[2px] bg-[#d1fae5] mb-2" />
            <p className="text-[11px] font-black uppercase text-[#1c1917] tracking-[0.2em]">Muhamad Ikhsan</p>
            <p className="text-[9px] text-[#059669] font-bold uppercase tracking-widest">Konselor Utama & Pengembang</p>
          </div>
        </div>
        
        {/* Border Corners */}
        <div className="absolute top-8 left-8 border-t-4 border-l-4 border-[#d1fae5] w-16 h-16 rounded-tl-xl" />
        <div className="absolute bottom-8 right-8 border-b-4 border-r-4 border-[#d1fae5] w-16 h-16 rounded-br-xl" />
      </div>
    );
  };

  return (
    <main className="min-h-dvh bg-[#fafaf9] flex flex-col items-center p-4 overflow-hidden font-sans">
      
      {/* 1. MASTER RENDER (Hidden) - Area Kerja untuk PDF */}
      <div className="fixed left-[-9999px] top-0 pointer-events-none">
        <div ref={hiddenRef} className="w-[1123px] h-[794px] border-[16px] border-[#ecfdf5] p-2 flex flex-col bg-white">
          <CertificateContent />
        </div>
      </div>

      {/* 2. MODAL INPUT NAMA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl scale-in-center">
            <h2 className="text-2xl font-bold text-center mb-6 text-[#1c1917]">Siapa Namamu?</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" autoFocus value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="w-full px-6 py-4 bg-[#f5f5f4] rounded-2xl outline-none border-2 border-transparent focus:border-[#10b981] font-semibold text-lg transition-all"
                placeholder="Tulis nama lengkap..."
              />
              <button type="submit" className="w-full py-4 bg-[#059669] text-white rounded-2xl font-bold hover:bg-[#047857] transition-all active:scale-95 shadow-lg shadow-[#059669]/20">
                Buat Sertifikat Sekarang
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. NAVIGATION BAR */}
      <nav className="w-full max-w-4xl flex justify-between items-center mb-6 shrink-0 z-50 px-2">
        <Link href="/" className="flex items-center gap-2 text-[#a8a29e] hover:text-[#047857] transition-colors group">
          <div className="p-2 bg-white rounded-full shadow-sm group-hover:bg-[#f0fdf4] transition-colors">
            <Home size={18} className="text-[#1c1917]" />
          </div>
          <span className="font-bold text-sm text-[#1c1917]">Beranda</span>
        </Link>
        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center gap-2 bg-[#10b981] text-white px-7 py-3 rounded-full font-bold text-sm shadow-xl hover:bg-[#059669] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDownloading ? (
            <span className="flex items-center gap-2 italic">Mengompres PDF...</span>
          ) : (
            <>
              <Download size={18} /> <span>Simpan PDF HD</span>
            </>
          )}
        </button>
      </nav>

      {/* 4. PREVIEW AREA (User View) */}
      <div className="flex-1 w-full flex items-center justify-center relative">
        <div 
          style={{ 
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
          }}
          className="w-[1123px] h-[794px] border-[16px] border-[#ecfdf5] p-2 flex flex-col shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] shrink-0 absolute bg-white"
        >
          <CertificateContent />
        </div>
      </div>

      <div className="mt-auto pt-6 text-[#a8a29e] text-[10px] font-black text-center tracking-[0.4em] uppercase opacity-60">
        Ruang Pulih • Digital Certificate • 2026
      </div>
    </main>
  );
}