export const generatePDF = async (element: HTMLElement): Promise<void> => {
  try {
    // @ts-ignore - html2pdf tidak punya types resmi yang up-to-date
    const html2pdf = (await import('html2pdf.js')).default;
    if (!element) return;

    // SIMPAN STYLE ASLI
    const originalTransform = element.style.transform;
    const originalShadow = element.style.boxShadow;

    // RESET STYLE UNTUK RENDER (Ukuran asli 1:1)
    element.style.transform = 'none';
    element.style.boxShadow = 'none';

    const options = {
      margin: 0,
      filename: 'Sertifikat-Ruang-Pulih.pdf',
      image: { 
        type: 'jpeg' as const, // Fix error TS2345
        quality: 1 
      },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        letterRendering: true,
        logging: false,
        backgroundColor: '#ffffff',
      },
      jsPDF: { 
        unit: 'mm' as const, 
        format: 'a4' as const, 
        orientation: 'landscape' as const 
      }
    };

    // Jalankan proses render
    await html2pdf().set(options).from(element).save();

    // KEMBALIKAN STYLE KE SEMULA
    element.style.transform = originalTransform;
    element.style.boxShadow = originalShadow;

    console.log("PDF Berhasil diunduh!");
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Gagal mengunduh PDF. Coba lagi ya bro.");
  }
};