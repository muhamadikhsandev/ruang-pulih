"use client";
import React, { useState, useRef } from 'react';
import { Heart, Sprout, Footprints, ArrowRight, Leaf, RotateCcw, Sun, Sparkles, Cloud, Stars, BookOpen, ChevronLeft, ChevronRight, MessageCircleHeart, Coffee, MessageCircle, Moon } from 'lucide-react';

const RuangPulih = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [affirmation, setAffirmation] = useState("Klik ikon di bawah untuk pesan hangat...");

  // State untuk Bab 1 (Inner Child)
  const [c1Reading, setC1Reading] = useState(true);
  const [c1Step, setC1Step] = useState(0);
  const [c1Score, setC1Score] = useState(0);

  // State untuk Bab 2 (Masa Lalu)
  const [c2Reading, setC2Reading] = useState(true);
  const [c2Step, setC2Step] = useState(0);
  const [c2Score, setC2Score] = useState(0);

  // State untuk Bab 3 (Tubuh)
  const [c3Reading, setC3Reading] = useState(true);
  const [c3Step, setC3Step] = useState(0);
  const [c3Score, setC3Score] = useState(0);

  // Kalkulasi Rata-rata di Bab Terakhir
  const avgScore = Math.round(((c1Score + c2Score + c3Score) / 30) * 100);
  
  // Penentuan Karakter Jiwa
  let finalCharacter = "Langit Sore yang Tenang (Peaceful Horizon)";
  let finalDesc = "Kamu telah menemukan kedamaianmu. Teruslah menjaga cahaya kecil di dalam hatimu.";
  if (avgScore >= 80) {
    finalCharacter = "Penyintas yang Terluka (Wounded Healer)";
    finalDesc = "Bebanmu berat, tapi hatimu masih mampu mencintai. Kamu adalah bukti nyata kekuatan manusia.";
  } else if (avgScore >= 50) {
    finalCharacter = "Tunas di Sela Batu (Resilient Sprout)";
    finalDesc = "Kamu sedang berjuang menembus tanah keras. Teruslah tumbuh, cahaya sedikit lagi terlihat.";
  }

  // Fungsi untuk kirim WA
  const sendToWA = () => {
    const message = `Halo Ruang Pulih, saya telah menyelesaikan sesi refleksi.\n\nRincian Skor:\n- Bab 1 (Inner Child): ${c1Score * 10}%\n- Bab 2 (Masa Lalu): ${c2Score * 10}%\n- Bab 3 (Tubuh): ${c3Score * 10}%\n\nRata-rata Intensitas Luka: ${avgScore}%\nKarakter Jiwa: ${finalCharacter}\n\nTerima kasih telah menemani perjalanan sembuhku.`;
    window.open(`https://wa.me/628989379116?text=${encodeURIComponent(message)}`, '_blank');
  };

  const affirmations = [
    "Kamu sudah berusaha hebat hari ini! 🌟",
    "Istirahat bukan berarti kalah, kamu butuh jeda. ☕",
    "Inner child-mu bangga melihatmu sekarang. 🧸",
    "Tidak apa-apa untuk tidak menjadi sempurna. ✨",
    "Hari esok adalah kesempatan baru untuk mekar. 🌱"
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const nextAffirmation = () => {
    const random = affirmations[Math.floor(Math.random() * affirmations.length)];
    setAffirmation(random);
  };

  const resetAll = () => {
    setC1Step(0); setC1Score(0); setC1Reading(true);
    setC2Step(0); setC2Score(0); setC2Reading(true);
    setC3Step(0); setC3Score(0); setC3Reading(true);
    scroll('left'); scroll('left'); scroll('left'); // Geser kembali ke awal
  };

  return (
    <main className="relative w-full h-dvh overflow-hidden bg-pink-50 font-sans selection:bg-pink-200">

      {/* DESKTOP NAVIGATION BUTTONS */}
      <div className="hidden md:flex absolute inset-y-0 left-4 items-center z-50">
        <button onClick={() => scroll('left')} className="p-3 bg-white/50 hover:bg-white rounded-full shadow-lg text-pink-400 transition-all active:scale-90">
          <ChevronLeft size={32} />
        </button>
      </div>
      <div className="hidden md:flex absolute inset-y-0 right-4 items-center z-50">
        <button onClick={() => scroll('right')} className="p-3 bg-white/50 hover:bg-white rounded-full shadow-lg text-pink-400 transition-all active:scale-90">
          <ChevronRight size={32} />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex flex-row w-full h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide"
      >

        {/* SECTION 1: WELCOME */}
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
            <div className="mt-16 group cursor-pointer" onClick={() => scroll('right')}>
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

        {/* SECTION 2: INTERAKTIF - PESAN HANGAT */}
        <section className="min-w-full h-full snap-start flex flex-col items-center justify-center p-8 bg-gradient-to-b from-orange-50 to-orange-100/50 relative overflow-hidden">
          <div className="absolute top-20 left-[-10%] w-72 h-72 bg-orange-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-[-10%] w-72 h-72 bg-rose-200/20 rounded-full blur-3xl" />
          
          <div className="max-w-md w-full text-center relative z-10">
            <div className="flex items-center justify-center gap-2 mb-8">
              <h2 className="text-3xl font-black text-orange-800 tracking-tight">Kotak Pesan Hangat</h2>
              <span className="text-3xl animate-bounce">💌</span>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-orange-200 rounded-[3rem] rotate-3 scale-105 opacity-50 group-hover:rotate-0 transition-transform duration-500" />
              <div className="relative bg-white/80 backdrop-blur-sm p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(251,146,60,0.2)] border-2 border-white mb-10 min-h-[220px] flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2">
                <p className="text-xl md:text-2xl text-orange-900 font-semibold italic leading-relaxed animate-in fade-in zoom-in duration-500">
                  "{affirmation}"
                </p>
              </div>
            </div>

            <div className="relative inline-block">
              <button onClick={nextAffirmation} className="relative z-10 bg-orange-500 hover:bg-orange-600 text-white p-6 rounded-full shadow-[0_10px_25px_rgba(249,115,22,0.4)] transition-all active:scale-90 hover:scale-110 group">
                <MessageCircleHeart size={36} className="group-hover:rotate-12 transition-transform" />
              </button>
              <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-20" />
            </div>
            
            <div className="mt-6 space-y-1">
              <p className="text-orange-600 font-bold text-sm tracking-wide uppercase">Ketuk untuk memeluk pesan baru</p>
            </div>
          </div>
          <div className="absolute top-1/4 right-10 opacity-20 rotate-12"><MessageCircleHeart size={40} className="text-orange-400" /></div>
          <div className="absolute bottom-1/4 left-10 opacity-20 -rotate-12"><MessageCircleHeart size={32} className="text-orange-300" /></div>
        </section>

        {/* SECTION 3: BAB 1 (INNER CHILD) */}
        <section className="min-w-full h-full snap-start flex flex-col items-center justify-center p-8 bg-[#F0F4F0] relative overflow-hidden font-sans">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[30rem] h-[30rem] bg-sage-200/30 rounded-full blur-3xl" />

          <div className="max-w-md w-full relative z-10">
            <div className="relative bg-white rounded-[2.5rem] shadow-2xl p-10 border border-emerald-50/50 min-h-[550px] flex flex-col overflow-hidden">
              {!c1Reading && c1Step < 10 && (
                <div className="absolute top-0 left-0 w-full h-2 bg-emerald-50">
                  <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${(c1Step / 10) * 100}%` }} />
                </div>
              )}

              {c1Reading ? (
                <div className="flex flex-col justify-center h-full animate-in fade-in duration-1000">
                  <div className="mb-6">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-emerald-600 uppercase">Bab 1</span>
                    <h2 className="text-2xl font-serif font-bold text-stone-800 mt-2">Membuka Gerbang Ingatan</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-stone-600 leading-relaxed italic border-l-2 border-emerald-200 pl-4">
                      "Sebelum kita melangkah lebih jauh, tarik napas sejenak. Luka masa kecil bukanlah aib..."
                    </p>
                    <p className="text-stone-500 text-sm leading-relaxed">Bab ini akan membantumu mengenali pola yang mungkin selama ini tidak kamu sadari.</p>
                  </div>
                  <button onClick={() => setC1Reading(false)} className="mt-12 w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 group">
                    Buka Lembaran Soal <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ) : c1Step < 10 ? (
                <div className="flex flex-col justify-between h-full animate-in slide-in-from-right-8 duration-500">
                  <div>
                    <div className="flex justify-between items-end mb-8">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Pertanyaan</span>
                        <p className="text-3xl font-serif font-bold text-stone-300">{c1Step + 1}<span className="text-sm text-stone-400">/10</span></p>
                      </div>
                      <div className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter">Inner Child Check</div>
                    </div>
                    <h3 className="text-xl font-bold text-stone-800 leading-snug mb-8">
                      {c1Step === 0 && "Apakah kamu merasa harus selalu 'sempurna' agar merasa berharga?"}
                      {c1Step === 1 && "Apakah sulit bagimu untuk mengatakan 'tidak' pada orang lain?"}
                      {c1Step === 2 && "Seringkah kamu merasa bertanggung jawab atas kebahagiaan orang tuamu?"}
                      {c1Step >= 3 && "Pertanyaan refleksi diri untuk mengenal pola luka masa lalumu..."}
                    </h3>
                    <div className="grid gap-4">
                      <button onClick={() => { setC1Score(c1Score + 1); setC1Step(c1Step + 1); }} className="w-full text-left p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-stone-700 font-medium hover:bg-emerald-100 transition-all active:scale-95">Sangat merasakannya</button>
                      <button onClick={() => setC1Step(c1Step + 1)} className="w-full text-left p-5 rounded-2xl bg-stone-50 border border-stone-100 text-stone-600 font-medium hover:bg-stone-100 transition-all active:scale-95">Jarang / Tidak pernah</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 animate-in zoom-in-95 duration-1000 flex flex-col items-center justify-center h-full">
                  <div className="p-6 bg-emerald-50 rounded-full mb-6 border-2 border-emerald-100"><Heart className="text-emerald-500" size={44} fill="currentColor" /></div>
                  <h3 className="text-2xl font-serif font-bold text-stone-800 mb-2">Bab 1 Selesai</h3>
                  <p className="text-emerald-600 font-bold text-lg mb-4">Intensitas Luka: {c1Score * 10}%</p>
                  <p className="text-stone-500 text-sm mb-8 leading-relaxed px-4">
                    {c1Score > 6 ? "Luka masa kecilmu masih cukup membekas. Teruslah berlatih menyayangi dirimu." : "Kamu sudah berdamai dengan banyak hal dari masa kecilmu."}
                  </p>
                  <button onClick={() => scroll('right')} className="flex items-center justify-center gap-3 px-8 py-4 w-full bg-emerald-600 text-white rounded-2xl font-bold uppercase text-xs tracking-widest shadow-lg shadow-emerald-200 hover:scale-105 transition-all">
                    Lanjut ke Bab 2 <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 4: BAB 2 (MANTAN/MASA LALU) */}
        <section className="min-w-full h-full snap-start flex flex-col items-center justify-center p-8 bg-[#F0F4F0] relative overflow-hidden font-sans">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl animate-pulse" />
          <Leaf className="absolute top-20 left-10 opacity-10 rotate-12 text-emerald-800" size={60} />

          <div className="max-w-md w-full relative z-10">
            {!c2Reading && c2Step < 10 && (
              <div className="absolute -top-8 left-0 w-full h-1.5 bg-emerald-100/50 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-emerald-500 transition-all duration-700 ease-out" style={{ width: `${(c2Step / 10) * 100}%` }} />
              </div>
            )}
            <div className="relative bg-white rounded-[2.5rem] shadow-2xl p-10 border border-emerald-50/50 min-h-[550px] flex flex-col overflow-hidden">
              <div className="absolute left-5 top-12 bottom-12 w-[1.5px] bg-emerald-50" />

              {c2Reading ? (
                <div className="animate-in fade-in zoom-in-95 duration-1000 flex flex-col h-full justify-center">
                  <div className="mb-8 pl-4">
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-600">Bab 2</span>
                    <h2 className="text-3xl font-serif font-bold text-stone-800 mt-2 italic">Melepas Bayang Masa Lalu</h2>
                  </div>
                  <div className="space-y-5 pl-4">
                    <p className="text-stone-600 leading-relaxed italic">"Beberapa orang datang sebagai rumah, beberapa lagi hanya sebagai tamu..."</p>
                    <p className="text-stone-500 text-sm leading-relaxed">Masa lalu dengan seseorang seringkali meninggalkan pola. Mari kita lihat, sejauh mana kamu sudah melangkah.</p>
                  </div>
                  <button onClick={() => setC2Reading(false)} className="mt-10 w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 group">
                    Mulai Refleksi <ArrowRight size={18} className="group-hover:translate-x-1" />
                  </button>
                </div>
              ) : c2Step < 10 ? (
                <div className="animate-in slide-in-from-right-8 duration-500 flex flex-col h-full justify-between">
                  <div className="mb-10 pl-6">
                    <span className="text-[10px] font-bold tracking-widest text-emerald-500 uppercase">Refleksi {c2Step + 1}/10</span>
                    <h3 className="text-xl font-bold text-stone-800 leading-snug mt-4">
                      {c2Step === 0 && "Apakah kamu masih sering mengecek sosial medianya secara diam-diam?"}
                      {c2Step === 1 && "Apakah kamu sering membandingkan orang baru dengan standar masa lalumu?"}
                      {c2Step === 2 && "Seringkah kamu berandai-andai 'jika saja dulu kita...'?"}
                      {c2Step >= 3 && "Pertanyaan refleksi masa lalu yang mendalam berlanjut..."}
                    </h3>
                  </div>
                  <div className="grid gap-4 pl-6">
                    <button onClick={() => { setC2Score(c2Score + 1); setC2Step(c2Step + 1); }} className="w-full text-left p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-stone-700 text-sm font-semibold hover:scale-[1.02] transition-all">Jujur, Iya.</button>
                    <button onClick={() => setC2Step(c2Step + 1)} className="w-full text-left p-5 rounded-2xl bg-stone-50/50 border border-stone-100 text-stone-600 text-sm font-semibold hover:scale-[1.02] transition-all">Sudah Tidak Lagi.</button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 animate-in zoom-in-95 duration-1000 flex flex-col items-center justify-center h-full">
                  <div className="p-6 bg-emerald-50 rounded-full mb-6 border-2 border-emerald-100"><Sparkles className="text-emerald-500" size={44} /></div>
                  <h3 className="text-2xl font-serif font-bold text-stone-800 mb-2">Bab 2 Selesai</h3>
                  <p className="text-emerald-600 font-bold text-lg mb-4">Intensitas Belum Move-On: {c2Score * 10}%</p>
                  <p className="text-stone-500 text-sm leading-relaxed px-4 mb-8 italic">
                    {c2Score >= 6 ? "Kenangan itu masih punya tempat di hatimu. Sembuh itu maraton, bukan sprint." : "Masa lalu itu kini hanya menjadi buku tua di rakmu."}
                  </p>
                  <button onClick={() => scroll('right')} className="flex items-center justify-center gap-3 px-8 py-4 w-full bg-emerald-600 text-white rounded-2xl font-bold uppercase text-xs tracking-widest shadow-lg hover:scale-105 transition-all">
                    Lanjut ke Bab 3 <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 5: BAB 3 (TUBUH) & FINAL DASHBOARD */}
        <section className="min-w-full h-full snap-start flex flex-col items-center justify-center p-8 bg-[#F0F4F0] relative overflow-hidden font-sans">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
          <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl animate-pulse" />

          <div className="max-w-md w-full relative z-10">
            <div className="relative bg-white rounded-[2.5rem] shadow-2xl p-10 border border-emerald-50/50 min-h-[600px] flex flex-col overflow-hidden">
              <div className="absolute left-5 top-12 bottom-12 w-[1.5px] bg-red-50/50" />

              {c3Reading ? (
                <div className="animate-in fade-in zoom-in-95 duration-1000 flex flex-col h-full justify-center">
                  <div className="mb-8 pl-4 border-l-4 border-red-300">
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-red-400">Bab 3</span>
                    <h2 className="text-2xl font-serif font-bold text-stone-800 mt-2">Mengambil Kembali Kendali Atas Ragamu</h2>
                  </div>
                  <div className="space-y-5 pl-4">
                    <p className="text-stone-600 leading-relaxed italic">"Ada rahasia yang terlalu berat untuk dipikul sendiri..."</p>
                    <p className="text-stone-500 text-[13px] leading-relaxed">Hari ini, kita mengakui keberadaanmu sebagai penyintas yang luar biasa kuat. Jawablah dengan jujur.</p>
                  </div>
                  <button onClick={() => setC3Reading(false)} className="mt-10 w-full py-4 bg-stone-800 text-white rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 group">
                    Mulai Pengakuan Diri <ArrowRight size={18} />
                  </button>
                </div>
              ) : c3Step < 10 ? (
                <div className="animate-in slide-in-from-right-8 duration-500 flex flex-col h-full justify-between">
                  <div className="mb-10 pl-6">
                    <span className="text-[10px] font-bold tracking-widest text-red-400 uppercase">Refleksi Tubuh {c3Step + 1}/10</span>
                    <h3 className="text-lg font-bold text-stone-800 leading-snug mt-4">
                      {c3Step === 0 && "Apakah kamu sering merasa 'mati rasa' atau terpisah dari tubuhmu sendiri?"}
                      {c3Step === 1 && "Apakah ada bagian tubuh tertentu yang tidak berani kamu sentuh atau lihat?"}
                      {c3Step === 2 && "Seringkah kamu merasa kotor atau tidak layak meskipun sudah mencoba bersih?"}
                      {c3Step >= 3 && "Pertanyaan refleksi pemulihan ragamu terus berlanjut..."}
                    </h3>
                  </div>
                  <div className="grid gap-3 pl-6">
                    <button onClick={() => { setC3Score(c3Score + 1); setC3Step(c3Step + 1); }} className="w-full text-left p-4 rounded-xl bg-red-50/30 border border-red-100 text-stone-700 text-sm font-semibold">Masih Terasa Sesak</button>
                    <button onClick={() => setC3Step(c3Step + 1)} className="w-full text-left p-4 rounded-xl bg-stone-50 text-stone-600 text-sm font-semibold">Sudah Mencoba Melepas</button>
                  </div>
                </div>
              ) : (
                /* --- FINAL DASHBOARD (REKAP SEMUA BAB & RATA-RATA) --- */
                <div className="text-center py-2 animate-in zoom-in-95 duration-1000 flex flex-col items-center justify-center h-full">
                  <h3 className="text-2xl font-serif font-bold text-stone-800 mb-1">Perjalanan Selesai</h3>
                  <p className="text-stone-400 text-[10px] tracking-widest uppercase mb-4 text-center">Summary Report</p>
                  
                  {/* Rincian Skor Tiap Bab & Rata-rata */}
                  <div className="bg-[#F9FBF9] p-5 rounded-[2rem] w-full border border-emerald-100 mb-4">
                    <span className="text-[10px] font-bold text-emerald-600 block mb-3 uppercase text-center">Rincian Skala Lukamu</span>
                    <div className="space-y-2 mb-4 text-xs font-medium text-stone-600">
                      <div className="flex justify-between items-center border-b border-emerald-50 pb-2">
                        <span>Bab 1 (Inner Child)</span>
                        <span className="font-bold text-emerald-600">{c1Score * 10}%</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-emerald-50 pb-2">
                        <span>Bab 2 (Masa Lalu)</span>
                        <span className="font-bold text-emerald-600">{c2Score * 10}%</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-emerald-50 pb-2">
                        <span>Bab 3 (Penerimaan Tubuh)</span>
                        <span className="font-bold text-emerald-600">{c3Score * 10}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-emerald-100/50 p-3 rounded-xl">
                      <span className="font-bold text-stone-800 text-sm">Rata-rata Luka:</span>
                      <span className="font-bold text-emerald-700 text-lg">{avgScore}%</span>
                    </div>
                  </div>

                  {/* Karakter Jiwa */}
                  <div className="mb-6 w-full px-2">
                    <span className="text-[10px] font-bold text-emerald-600 block mb-1 uppercase">Karakter Jiwamu Saat Ini</span>
                    <p className="text-lg font-bold text-stone-800 leading-tight mb-2">{finalCharacter}</p>
                    <p className="text-[11px] text-stone-500 leading-relaxed italic">{finalDesc}</p>
                  </div>

                  <div className="flex flex-col gap-3 w-full">
                    <button onClick={sendToWA} className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg">
                      <MessageCircle size={18} /> Kirim Hasil ke Konselor
                    </button>
                    <button onClick={resetAll} className="w-full py-3 bg-stone-100 text-stone-500 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-stone-200 transition-all">
                      Ulangi Seluruh Refleksi
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};

export default RuangPulih;