export const generatePDF = async (element: HTMLElement): Promise<void> => {
  try {
    // @ts-ignore
    const html2pdf = (await import('html2pdf.js')).default;
    if (!element) return;

    // SIMPAN STYLE ASLI
    const originalTransform = element.style.transform;
    const originalPosition = element.style.position;
    const originalShadow = element.style.boxShadow;

    // PERSIPKAN UNTUK RENDER
    // Kita paksa ke posisi static dan tanpa transform agar terdeteksi penuh oleh canvas
    element.style.transform = 'none';
    element.style.position = 'relative';
    element.style.boxShadow = 'none';

    const options = {
      margin: 0,
      filename: 'Sertifikat-Ruang-Pulih.pdf',
      image: { type: 'jpeg' as const, quality: 1 },
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

    // Kasih napas 100ms buat browser render ulang state 'transform: none'
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Eksekusi
    await html2pdf().set(options).from(element).save();

    // KEMBALIKAN STYLE PREVIEW
    element.style.transform = originalTransform;
    element.style.position = originalPosition;
    element.style.boxShadow = originalShadow;

    console.log("PDF Berhasil diunduh!");
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Gagal mengunduh PDF. Coba lagi ya bro.");
  }
};