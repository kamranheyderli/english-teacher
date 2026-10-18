import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const display = Playfair_Display({ subsets: ["latin", "latin-ext"], variable: "--font-display", style: ["normal", "italic"] });
const body = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-body" });

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
