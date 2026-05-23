import type { Metadata } from "next";
import "./globals.css";
import FloatingChatWrapper from '@/components/FloatingChatWrapper'
import BackToTop from '@/components/BackToTop'

export const metadata: Metadata = {
  title: "ProtoForge — Idea to prototype in seconds",
  description: "Describe your idea. Get a branded 5-page prototype with real copy, colors, and layout — instantly.",
  metadataBase: new URL("https://protofast.app"),
  openGraph: {
    title: "ProtoForge — Idea to prototype in seconds",
    description: "Describe your idea. Get a branded 5-page prototype with real copy, colors, and layout — instantly.",
    url: "https://protofast.app",
    siteName: "ProtoForge",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "ProtoForge", description: "Idea to prototype in seconds." },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com" async />
      </head>
      <body>{children}<BackToTop accentColor="#f97316" /></body>
    </html>
  );
}
