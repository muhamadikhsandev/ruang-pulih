import { renderToStream } from '@react-pdf/renderer';
import { CertificatePDF } from '@/app/certificate/pdf-template';
import { NextResponse } from 'next/server';

export async function GET() {
  const stream = await renderToStream(<CertificatePDF />);
  
  return new NextResponse(stream as any, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Sertifikat-Ruang-Pulih.pdf"',
    },
  });
}