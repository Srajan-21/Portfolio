import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, Space_Mono, Caveat } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-spacemono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Srajan Srivastava — Sticker-Bomb World & Portfolio",
  description:
    "Software Developer, Guitarist, Ex-President of Octave, and Builder of CLAVIS & Tourphin. An interactive sticker-bomb adventure from BPIT Delhi (2022) to Hudle.",
  keywords: [
    "Srajan Srivastava",
    "Software Developer",
    "Full Stack Engineer",
    "Next.js",
    "TypeScript",
    "Supabase",
    "New Delhi",
    "CLAVIS",
    "Tourphin",
    "Hudle",
  ],
  authors: [{ name: "Srajan Srivastava", url: "https://github.com/Srajan-21" }],
  creator: "Srajan Srivastava",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://srajansrivastava.dev",
    siteName: "Srajan Srivastava Portfolio",
    title: "Srajan Srivastava — Sticker-Bomb World",
    description:
      "Travel through Srajan's journey from day one at BPIT Delhi to production at Hudle. Full of stickers, retro OS windows, and trading cards.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Srajan Srivastava — Sticker-Bomb World",
    description: "Software Developer. Guitarist. Ex-President of Octave. Currently debugging payments at Hudle.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${dmSans.variable} ${spaceMono.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen bg-[#FFF8EC] font-sans text-[#14121A] antialiased bg-dot-grid">
        {children}
      </body>
    </html>
  );
}
