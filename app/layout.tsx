import type { Metadata, Viewport } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Glunova — Generasi Sadar Diabetes",
  description:
    "Platform manajemen diabetes dengan AI, edukasi interaktif, dan konsultasi dokter untuk membantu Anda mengelola gula darah secara cerdas.",
  keywords: [
    "diabetes",
    "gula darah",
    "manajemen diabetes",
    "kesehatan",
    "HbA1c",
    "konsultasi dokter",
    "edukasi diabetes",
  ],
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#1A56DB",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const dynamic = "force-dynamic";

import { Providers } from "@/components/providers/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${sora.variable} ${dmSans.variable}`}
    >
      <body className="font-sans overflow-x-hidden">
        <Providers>
          <main className="relative z-10 w-full min-h-screen transition-colors duration-300">
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
