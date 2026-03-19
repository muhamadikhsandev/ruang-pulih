import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ruang Pulih 🌸',
  description: 'Tempat aman untuk healing dan berdamai dengan masa lalu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} overflow-hidden`}>
        {children}
      </body>
    </html>
  )
}