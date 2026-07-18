import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { LensProvider } from "@/lib/LensContext";
import { AmbientBackground } from "@/components/effects/AmbientBackground";
import { ClientEffects } from "@/components/effects/ClientEffects";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Ali Raza: AI/ML Engineer & Researcher",
  description:
    "Portfolio of Ali Raza, an AI/ML Engineer and researcher building production systems across computer vision, medical AI, NLP, MLOps, and agentic systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        <AmbientBackground />
        <ClientEffects />
        <LensProvider>{children}</LensProvider>
      </body>
    </html>
  );
}
