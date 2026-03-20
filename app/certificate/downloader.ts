export const generatePDF = async (element: HTMLElement): Promise<void> => {
  try {
    // @ts-ignore
    const html2pdf = (await import('html2pdf.js')).default;
    if (!element) return;

    // TRIK CLONE: Bikin duplikat elemen agar style aslinya di layar gak keganggu
    const clone = element.cloneNode(true) as HTMLElement;
    
    // Reset style di clone agar murni ukuran asli
    clone.style.transform = 'none';
    clone.style.position = 'relative';
    clone.style.display = 'flex';
    clone.style.top = '0';
    clone.style.left = '0';
    clone.style.boxShadow = 'none';

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

    // Render dari CLONE, bukan dari elemen yang nempel di layar
    await html2pdf().set(options).from(clone).save();

    console.log("PDF Berhasil diunduh!");
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Gagal mengunduh PDF. Coba lagi ya bro.");
  }
};