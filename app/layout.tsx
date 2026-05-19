import type { Metadata } from "next";
import "./globals.css";
import FloatingChatWrapper from '@/components/FloatingChatWrapper'

export const metadata: Metadata = {
  title: "ProtoForge — Idea to prototype in seconds",
  description: "Describe your idea. Get a branded 5-page prototype with real copy, colors, and layout — instantly.",
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
      <body>{children}</body>
    </html>
  );
}
