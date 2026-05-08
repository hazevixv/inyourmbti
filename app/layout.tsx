import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./design-system-v3.css";

const siteUrl = "https://mbti.haze.biz.id";
const siteName = "inyourmbti";
const siteDescription =
  "Tes MBTI berbasis sains dengan 96 pertanyaan fungsi kognitif, hasil mendalam, dan AI psychologist untuk membantu memahami kepribadianmu lebih dalam.";

export const metadata: Metadata = {
  title: {
    default: "inyourmbti | Tes MBTI Berbasis Sains dan AI Psychologist",
    template: "%s | inyourmbti",
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "MBTI",
    "tes MBTI",
    "tes kepribadian",
    "personality test",
    "fungsi kognitif",
    "cognitive functions",
    "AI psychologist",
    "tes personality gratis",
    "tes MBTI Indonesia",
    "inyourmbti",
  ],
  authors: [{ name: "INYOURMBTI Team" }],
  creator: "INYOURMBTI",
  publisher: "INYOURMBTI",
  category: "education",
  classification: "Personality assessment and psychology education",
  alternates: {
    canonical: siteUrl,
  },
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "inyourmbti — Kenali Dirimu, Lebih Dalam",
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image",
        width: 1200,
        height: 630,
        alt: "inyourmbti - Tes MBTI berbasis sains",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "inyourmbti — Kenali Dirimu, Lebih Dalam",
    description: siteDescription,
    images: ["/og-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-mbti.avif", type: "image/avif" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: ["/favicon-mbti.avif"],
    apple: [{ url: "/favicon-mbti.avif", type: "image/avif" }],
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0EA5E9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
        logo: `${siteUrl}/logo-mbti.avif`,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        inLanguage: "id-ID",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
      {
        "@type": "WebApplication",
        name: siteName,
        url: siteUrl,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        description: siteDescription,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "IDR",
        },
      },
    ],
  };

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.groq.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
