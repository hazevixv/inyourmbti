import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./design-system-v3.css";

export const metadata: Metadata = {
  title: "inyourmbti - Temukan Kepribadian Sejatimu",
  description: "Platform tes MBTI yang akurat dan modern dengan AI psychologist. Temukan tipe kepribadianmu dan pahami dirimu lebih dalam.",
  keywords: ["MBTI", "tes kepribadian", "personality test", "cognitive functions", "AI psychologist"],
  authors: [{ name: "INYOURMBTI Team" }],
  creator: "INYOURMBTI",
  publisher: "INYOURMBTI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:2002'),
  openGraph: {
    title: "INYOURMBTI - Temukan Kepribadian Sejatimu",
    description: "Platform tes MBTI yang akurat dan modern dengan AI psychologist",
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:2002',
    siteName: "INYOURMBTI",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "INYOURMBTI - Temukan Kepribadian Sejatimu",
    description: "Platform tes MBTI yang akurat dan modern dengan AI psychologist",
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
