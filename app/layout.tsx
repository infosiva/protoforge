import type { Metadata } from "next";
import "./globals.css";
import "./theme-vars.css";
import FloatingChatWrapper from '@/components/FloatingChatWrapper'
import FeedbackWidget from '@/components/FeedbackWidget'
import BackToTop from '@/components/BackToTop'
import Navbar from '@/components/Navbar'
import Script from 'next/script'
import { loadSiteTheme, buildThemeStyleTag, buildGa4Snippet, isValidGa4Id } from '@/lib/theme-loader'
import { AnimatedBg } from '@/components/AnimatedBg'
import { Telemetry } from '@/components/Telemetry'
import CookieConsent from '@/components/CookieConsent'
import { getSiteFlags } from '@/lib/flags'

import { MotionProvider } from "@infosiva/shared-ui/modern";
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

const DEFAULT_ACCENT = '#818cf8'
const DEFAULT_BG = '#0c0a1f'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const flags = await getSiteFlags('protoforge')
  const theme = await loadSiteTheme('protoforge')
  const accent = theme?.primary ?? DEFAULT_ACCENT
  const archetype = theme?.layout?.archetype ?? 'directory-marketplace'
  const ga4 = buildGa4Snippet(theme)
  return (
    <html lang="en" className="h-full" data-layout={archetype}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: buildThemeStyleTag(theme, { background: DEFAULT_BG, primary: DEFAULT_ACCENT }) }} />
        {ga4 && <script dangerouslySetInnerHTML={{ __html: ga4 }} />}
        <meta name="google-adsense-account" content="ca-pub-4237294630161176" />
        <Script
                  async
                  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4237294630161176"
                  crossOrigin="anonymous"
                  strategy="afterInteractive"
                />
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
        <AnimatedBg theme={theme} />
        {isValidGa4Id(theme?.analytics?.ga4Id) && <Script src={`https://www.googletagmanager.com/gtag/js?id=${theme?.analytics?.ga4Id}`} strategy="afterInteractive" />}
        <Telemetry archetype={archetype} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Navbar />
          <MotionProvider>{children}</MotionProvider>
        </div>

        {flags.chatbot && <FloatingChatWrapper />}
        <FeedbackWidget siteName="ProtoForge" accentColor={accent} accentColor2={theme?.secondary ?? accent} position="left" />
        <BackToTop accentColor={accent} />
        <CookieConsent />
      </body>
    </html>
  );
}
