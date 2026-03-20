export const generatePDF = async (element: HTMLElement): Promise<void> => {
  try {
    // @ts-ignore - html2pdf tidak punya types resmi yang up-to-date
    const html2pdf = (await import('html2pdf.js')).default;

    if (!element) return;

    const options = {
      margin: 0,
      filename: 'Sertifikat-Ruang-Pulih.pdf',
      image: { 
        type: 'jpeg' as const, // Pakai 'as const' supaya tipenya bukan string biasa
        quality: 1 
      },
      html2canvas: { 
        scale: 3, 
        useCORS: true, 
        letterRendering: true,
        logging: false,
      },
      jsPDF: { 
        unit: 'mm' as const, 
        format: 'a4' as const, 
        orientation: 'landscape' as const 
      }
    };

    // PENTING: Simpan instance-nya dulu baru eksekusi
    const worker = html2pdf().set(options).from(element);
    
    // Tunggu proses save selesai
    await worker.save();

    console.log("PDF Berhasil diunduh!");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};