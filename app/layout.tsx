import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./design-system-v3.css";

export const metadata: Metadata = {
  title: "inyourmbti - Temukan Kepribadian Sejatimu",
  description: "Kenali dirimu lebih dalam dengan tes MBTI berbasis sains. Temukan tipe kepribadianmu, pahami kekuatanmu, dan diskusikan hasilmu dengan AI psychologist.",
  keywords: ["MBTI", "tes kepribadian", "personality test", "cognitive functions", "AI psychologist", "inyourmbti"],
  authors: [{ name: "INYOURMBTI Team" }],
  creator: "INYOURMBTI",
  publisher: "INYOURMBTI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mbti.haze.biz.id'),
  openGraph: {
    title: "inyourmbti — Kenali Dirimu, Lebih Dalam 🧠",
    description: "Tes MBTI berbasis sains dengan AI psychologist. Temukan tipe kepribadianmu & pahami kekuatanmu. Gratis!",
    url: 'https://mbti.haze.biz.id',
    siteName: "inyourmbti",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: '/og-image',
        width: 1200,
        height: 630,
        alt: 'inyourmbti - Temukan Kepribadian Sejatimu',
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "inyourmbti — Kenali Dirimu, Lebih Dalam 🧠",
    description: "Tes MBTI berbasis sains dengan AI psychologist. Temukan tipe kepribadianmu & pahami kekuatanmu. Gratis!",
    images: ['/og-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0EA5E9',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.groq.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
