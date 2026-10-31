import type { Metadata } from "next";
import { Cormorant_Garamond, Newsreader, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Srajan Srivastava — The Collector's Edition",
  description:
    "An editorial archive charting the software engineering journey of Srajan Srivastava — from BPIT Delhi (2022) to the CLAVIS startup and production at Hudle.",
  keywords: [
    "Srajan Srivastava",
    "Software Developer",
    "Full Stack Engineer",
    "Next.js",
    "TypeScript",
    "Supabase",
    "New Delhi",
    "CLAVIS",
    "Hudle",
  ],
  authors: [{ name: "Srajan Srivastava", url: "https://github.com/Srajan-21" }],
  openGraph: {
    title: "Srajan Srivastava — The Collector's Edition",
    description:
      "Editorial monograph of a software developer: BPIT Delhi, Octave Music President, Tourphin, CLAVIS startup, and production at Hudle.",
    url: "https://srajansrivastava.com",
    siteName: "Srajan Srivastava Monograph",
    locale: "en_US",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Srajan Srivastava",
  jobTitle: "Software Developer",
  url: "https://srajansrivastava.com",
  sameAs: [
    "https://github.com/Srajan-21",
    "https://linkedin.com/in/srajan-srivastava",
    "https://leetcode.com/u/SRAJAN 9839",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "New Delhi",
    addressCountry: "India",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Bhagwan Parshuram Institute of Technology (BPIT Delhi)",
  },
  knowsAbout: [
    "Full Stack Engineering",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "Supabase",
    "Data Structures & Algorithms",
    "Payment Webhook Idempotency",
    "System Architecture",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${newsreader.variable} ${jetbrainsMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F6F1E7] text-[#14110F] font-serif selection:bg-[#6B1E1E] selection:text-[#F6F1E7]">
        {children}
      </body>
    </html>
  );
}
