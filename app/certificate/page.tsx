"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Award, Home, Leaf, ShieldCheck, CheckCircle2, Edit3, Sparkles, Download, FileText, Image as ImageIcon, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { QRCodeCanvas } from 'qrcode.react';
import { toJpeg, toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

// Definisi Tipe untuk Template
interface ThemeTemplate {
  id: string;
  accent: string;
  light: string;
  ultraLight: string;
  text: string;
}

const TEMPLATES: ThemeTemplate[] = [
  { id: 'emerald', accent: '#059669', light: '#d1fae5', ultraLight: '#f0fdf4', text: '#064e3b' },
  { id: 'blue', accent: '#2563eb', light: '#dbeafe', ultraLight: '#eff6ff', text: '#1e3a8a' },
  { id: 'pink', accent: '#db2777', light: '#fce7f3', ultraLight: '#fdf2f8', text: '#831843' },
  { id: 'purple', accent: '#7c3aed', light: '#ede9fe', ultraLight: '#f5f3ff', text: '#4c1d95' },
  { id: 'orange', accent: '#ea580c', light: '#ffedd5', ultraLight: '#fff7ed', text: '#7c2d12' },
];

export default function CertificatePage() {
  const hiddenRef = useRef(null);
  const [userName, setUserName] = useState("Jiwa yang Berani");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [inputName, setInputName] = useState("");
  const [activeTemplate, setActiveTemplate] = useState(0);
  const [zoom, setZoom] = useState(0.3);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const padding = window.innerWidth < 768 ? 32 : 64;
      const availableWidth = window.innerWidth - padding;
      const availableHeight = window.innerHeight - 340;
      const scale = Math.min(availableWidth / 1123, availableHeight / 794);
      setZoom(scale);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simpan sebagai Gambar (PNG)
  const downloadAsImage = async () => {
    if (!hiddenRef.current || isDownloading) return;
    setIsDownloading(true);
    setShowDownloadOptions(false);
    try {
      const dataUrl = await toPng(hiddenRef.current, {
        quality: 1,
        pixelRatio: 3,
        cacheBust: true
      });
      const link = document.createElement('a');
      link.download = `Sertifikat-${userName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert("Gagal mengunduh gambar.");
    } finally { setIsDownloading(false); }
  };

  // Simpan sebagai PDF
  const downloadAsPDF = async () => {
    if (!hiddenRef.current || isDownloading) return;
    setIsDownloading(true);
    setShowDownloadOptions(false);
    try {
      const dataUrl = await toJpeg(hiddenRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        cacheBust: true
      });
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      pdf.addImage(dataUrl, 'JPEG', 0, 0, 297, 210);
      pdf.save(`Sertifikat-${userName}.pdf`);
    } catch (err) {
      alert("Gagal mengunduh PDF.");
    } finally { setIsDownloading(false); }
  };

  const theme = TEMPLATES[activeTemplate];

  // URL Dinamis untuk QR Code (Bisa di-scan & diklik)
  const verifyUrl = `https://ruangpulih.vercel.app/verify/${encodeURIComponent(userName)}`;

  // Komponen Inti Sertifikat
  const CertificateContent = () => (
    <div className="flex-1 border-2 relative overflow-hidden flex flex-col items-center justify-center p-12 text-center bg-white w-full h-full" style={{ borderColor: theme.light }}>
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-3xl opacity-30" style={{ backgroundColor: theme.light }} />
      <div className="absolute bottom-[-15%] left-[-5%] w-[400px] h-[400px] rounded-full blur-3xl opacity-20" style={{ backgroundColor: theme.ultraLight }} />

      <div className="relative z-10 flex flex-col items-center mb-6">
        <div className="p-5 rounded-full mb-4 border relative shadow-sm" style={{ backgroundColor: theme.ultraLight, borderColor: theme.light }}>
          <Award size={54} style={{ color: theme.accent }} />
          <Leaf size={18} className="absolute -top-1 -right-1" style={{ color: theme.accent }} />
        </div>
        <h1 className="text-[11px] font-black uppercase tracking-[0.5em] opacity-70" style={{ color: theme.text }}>Digital Recovery Certificate</h1>
      </div>

      <div className="relative z-10 w-full px-8">
        <h2 className="text-7xl font-serif italic font-semibold mb-6 tracking-tighter" style={{ color: theme.text }}>Langkah Menuju Pulih</h2>
        <div className="mb-8 py-4 border-b-2 inline-block px-20 relative" style={{ borderColor: theme.light }}>
          <p className="text-[10px] uppercase font-black mb-2 tracking-[0.3em]" style={{ color: theme.accent }}>Diberikan kepada sosok tangguh</p>
          <h3 className="text-6xl font-black text-stone-900 tracking-tight mb-2">{userName}</h3>
          <div className="absolute -bottom-[12px] left-1/2 -translate-x-1/2 bg-white px-4">
            <ShieldCheck size={24} style={{ color: theme.accent }} />
          </div>
        </div>
        <p className="text-stone-600 text-sm max-w-2xl mx-auto leading-relaxed font-medium mb-6">
          Atas keberanianmu mengakui luka dan memilih untuk tetap bertumbuh. Sertifikat ini adalah saksi bisu perjalananmu menuju diri yang lebih utuh.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest" style={{ borderColor: theme.light, color: theme.accent, backgroundColor: theme.ultraLight }}>
          <Sparkles size={12} /> Terverifikasi Ruang Pulih 2026
        </div>
      </div>

      <div className="relative z-10 w-full flex justify-between items-end mt-12 px-16">
        <div className="flex items-center gap-6 text-left">
          {/* Perubahan di sini: Mengubah div menjadi tag a (link) agar bisa diklik */}
          <a
            href={verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white border rounded-xl shadow-sm block hover:opacity-80 transition-opacity cursor-pointer title"
            style={{ borderColor: theme.light }}
            title="Klik untuk cek link verifikasi"
          >
            <QRCodeCanvas value={verifyUrl} size={70} level="H" fgColor={theme.text} />
          </a>
          <div>
            <span className="text-md font-black uppercase block mb-1 leading-none" style={{ color: theme.text }}>Ruang Pulih</span>
            <p className="text-[9px] font-bold uppercase tracking-widest flex items-center gap-1" style={{ color: theme.accent }}>
              <CheckCircle2 size={10} /> Valid Digital Signature
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-serif italic text-4xl opacity-20 mb-[-10px] select-none" style={{ color: theme.text }}>M. Ikhsan</p>
          <div className="w-48 h-[1.5px] mb-2" style={{ backgroundColor: theme.light }} />
          <p className="text-[10px] font-black uppercase text-stone-900 tracking-[0.2em]">Muhamad Ikhsan</p>
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-stone-50 flex flex-col items-center relative overflow-hidden">
      {/* 1. Render Tersembunyi untuk Download (Tetap ada bingkai) */}
      <div className="absolute left-[-9999px] top-0 pointer-events-none">
        <div ref={hiddenRef} className="w-[1123px] h-[794px] border-[16px] p-2 flex flex-col bg-white" style={{ borderColor: theme.ultraLight }}>
          <CertificateContent />
        </div>
      </div>

      {/* 2. Modal Ganti Nama */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <h2 className="text-2xl font-bold text-center mb-6 text-stone-800">Nama Sertifikat</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              if(inputName.trim()) {
                setUserName(inputName);
                setIsModalOpen(false);
              }
            }} className="space-y-4">
              <input
                type="text"
                autoFocus
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="w-full px-6 py-4 bg-stone-50 rounded-2xl outline-none border-2 border-transparent focus:border-emerald-500 font-bold text-center"
                placeholder="Nama Lengkap"
              />
              <button type="submit" className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all hover:bg-emerald-700">
                Terbitkan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. Header Navigasi */}
      <nav className="w-full max-w-5xl flex justify-between items-center px-4 py-4 md:px-8 md:py-6 shrink-0 z-50">
        <div className="flex gap-2">
          <Link href="/" className="p-3 bg-white rounded-full shadow-sm border border-stone-100 hover:bg-stone-50 transition-colors">
            <Home size={20} />
          </Link>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-full font-bold text-xs transition-all active:scale-95 hover:shadow-md">
            <Edit3 size={14} /> Nama
          </button>
        </div>

        {/* Tombol Simpan dengan Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDownloadOptions(!showDownloadOptions)}
            disabled={isDownloading}
            className="flex items-center gap-2 bg-stone-900 text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-xl active:scale-95 transition-all disabled:opacity-50"
          >
            {isDownloading ? "Memproses..." : <><Download size={14} /> Simpan <ChevronDown size={14} /></>}
          </button>
          
          {showDownloadOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-stone-100 p-2 z-[60] animate-in slide-in-from-top-2">
              <button onClick={downloadAsPDF} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-stone-50 rounded-xl transition-colors text-left text-stone-800">
                <FileText size={18} className="text-rose-500" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold">Dokumen PDF</span>
                  <span className="text-[10px] text-stone-400">Terbaik untuk cetak</span>
                </div>
              </button>
              <button onClick={downloadAsImage} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-stone-50 rounded-xl transition-colors text-left text-stone-800">
                <ImageIcon size={18} className="text-blue-500" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold">Gambar PNG</span>
                  <span className="text-[10px] text-stone-400">Siap share ke sosmed</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* 4. Preview Area (Bingkai Tebal Balik Lagi) */}
      <div className="flex-1 w-full flex items-center justify-center p-4 relative overflow-hidden">
        <div
          style={{
            width: '1123px',
            height: '794px',
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
            borderColor: theme.ultraLight
          }}
          className="border-[16px] p-2 flex flex-col shadow-2xl bg-white transition-all duration-500 ease-out shrink-0"
        >
          <CertificateContent />
        </div>
      </div>

      {/* 5. Selector Tema */}
      <div className="py-6 flex flex-col items-center gap-4 z-50 bg-white/80 w-full backdrop-blur-md border-t border-stone-100 shrink-0 mt-auto">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">Pilih Tema Sertifikat</p>
        <div className="flex gap-5">
          {TEMPLATES.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveTemplate(i)}
              className={`w-6 h-6 rounded-full transition-all duration-300 ring-offset-4 ${activeTemplate === i ? 'ring-2 scale-125' : 'opacity-30 hover:opacity-100'}`}
              style={{
                backgroundColor: t.accent,
                boxShadow: activeTemplate === i ? `0 0 0 2px white, 0 0 0 4px ${t.accent}` : 'none'
              }}
            />
          ))}
        </div>
      </div>

      {/* Tutup Dropdown jika klik di luar */}
      {showDownloadOptions && <div className="fixed inset-0 z-40" onClick={() => setShowDownloadOptions(false)} />}
    </main>
  );
}
