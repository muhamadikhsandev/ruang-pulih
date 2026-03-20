// app/certificate/downloader.ts
export const generatePDF = async (element: HTMLElement) => {
  // @ts-ignore - html2pdf tidak punya types resmi yang bagus
  const html2pdf = (await import('html2pdf.js')).default;

  const options = {
    margin: 0,
    filename: 'Sertifikat-Ruang-Pulih.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { 
      scale: 3, // Bikin hasil download TAJAM (High Res)
      useCORS: true, 
      letterRendering: true,
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'landscape' 
    }
  };

  html2pdf().set(options).from(element).save();
};