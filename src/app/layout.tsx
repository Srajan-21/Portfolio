import type { Metadata } from "next";
import { Fraunces, Newsreader, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Srajan Srivastava — The Player's Journal",
  description:
    "An interactive field journal and game world charting Srajan Srivastava's software engineering journey from day zero at BPIT Delhi to production at Hudle.",
  keywords: [
    "Srajan Srivastava",
    "Software Developer",
    "Full Stack Engineer",
    "Next.js",
    "Supabase",
    "Portfolio",
    "New Delhi",
    "CLAVIS",
    "Tourphin",
    "Hudle",
  ],
  authors: [{ name: "Srajan Srivastava", url: "https://github.com/Srajan-21" }],
  openGraph: {
    title: "Srajan Srivastava — The Player's Journal",
    description:
      "Field journal of a software developer: BPIT Delhi, Octave Music President, Tourphin, CLAVIS startup, and production at Hudle.",
    url: "https://srajansrivastava.com",
    siteName: "Srajan Srivastava Portfolio",
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
    "Full Stack Development",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "Supabase",
    "Data Structures & Algorithms",
    "Payment Webhook Idempotency",
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
      className={`${fraunces.variable} ${newsreader.variable} ${jetbrainsMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F2EBDD] text-[#1B1A17] font-serif selection:bg-[#D9432B] selection:text-[#F2EBDD]">
        {children}
      </body>
    </html>
  );
}
