import type { Metadata } from "next";
import "./globals.css";
import FloatingChatWrapper from '@/components/FloatingChatWrapper'
import BackToTop from '@/components/BackToTop'
import Navbar from '@/components/Navbar'
import Script from 'next/script'

export const metadata: Metadata = {
  title: "ProtoForge — Idea to Prototype in Seconds | AI Prototype Generator",
  description: "Describe your idea. Get a branded 5-page prototype with real copy, colors, and layout — instantly. Free, no signup required.",
  metadataBase: new URL("https://protofast.app"),
  keywords: ['prototype generator', 'AI prototype', 'idea to prototype', 'product prototype', 'startup prototype', 'MVP builder'],
  openGraph: {
    title: "ProtoForge — Idea to Prototype in Seconds",
    description: "Describe your idea. Get a branded 5-page prototype with real copy, colors, and layout — instantly.",
    url: "https://protofast.app",
    siteName: "ProtoForge",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "ProtoForge — Idea to Prototype in Seconds", description: "Idea to prototype in seconds. Free AI prototype generator.", images: ['/og.png'] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "ProtoForge",
              "description": "AI-powered prototype generator — idea to 5-page prototype in seconds",
              "applicationCategory": "DeveloperApplication",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
            })
          }}
        />
      </head>
      <body className="min-h-full antialiased">
        {/* Aurora blobs */}
        <div className="aurora aurora-primary" aria-hidden />
        <div className="aurora aurora-secondary" aria-hidden />
        <div className="aurora aurora-third" aria-hidden />
        <div className="grain" aria-hidden />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <Navbar />
          {children}
        </div>

        <FloatingChatWrapper />
        <BackToTop accentColor="#6366f1" />
      </body>
    </html>
  );
}
