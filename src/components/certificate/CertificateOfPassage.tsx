"use client";

import React, { useRef, useState } from "react";
import { Download, Award, CheckCircle2 } from "lucide-react";
import { CollectorRank } from "@/types/database";
import { useCollector } from "@/context/CollectorContext";

interface CertificateProps {
  recipientName: string;
  onNameChange: (name: string) => void;
  rank: CollectorRank;
  sealsEarnedCount: number;
  dateStamp: string;
}

export function CertificateOfPassage({
  recipientName,
  onNameChange,
  rank,
  sealsEarnedCount,
  dateStamp,
}: CertificateProps) {
  const { setCursorLabel } = useCollector();
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const isMaster = rank === "Master" || sealsEarnedCount >= 12;

  const handleDownloadPng = async () => {
    setDownloading(true);
    setDownloadSuccess(false);

    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1600;
      canvas.height = 1000;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Background Ivory
      ctx.fillStyle = "#F6F1E7";
      ctx.fillRect(0, 0, 1600, 1000);

      // Fine Inner Margin Paper Surface
      ctx.fillStyle = "#FAF7F2";
      ctx.fillRect(40, 40, 1520, 920);

      // Outer Gold Foil Border
      ctx.strokeStyle = isMaster ? "#B08D57" : "#8C6B3A";
      ctx.lineWidth = isMaster ? 5 : 2;
      ctx.strokeRect(50, 50, 1500, 900);

      // Inner Delicate Hairline Rule
      ctx.strokeStyle = "#B08D57";
      ctx.lineWidth = 1;
      ctx.strokeRect(62, 62, 1476, 876);

      // Corner Rosette / Registration Marks
      const corners = [
        [62, 62],
        [1538, 62],
        [62, 938],
        [1538, 938],
      ];
      ctx.fillStyle = "#B08D57";
      corners.forEach(([cx, cy]) => {
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fill();
      });

      // Top Monograph Header
      ctx.textAlign = "center";
      ctx.fillStyle = "#6F665A";
      ctx.font = "14px 'JetBrains Mono', monospace";
      ctx.letterSpacing = "4px";
      ctx.fillText("MONOGRAPH NO. 01 — EDITION DE LUXE — NEW DELHI", 800, 140);

      // Certificate Title
      ctx.fillStyle = "#14110F";
      ctx.font = "bold 56px 'Cormorant Garamond', Georgia, serif";
      ctx.fillText("Certificate of Passage", 800, 230);

      // Hairline Accent Divider
      ctx.strokeStyle = "#B08D57";
      ctx.beginPath();
      ctx.moveTo(600, 260);
      ctx.lineTo(1000, 260);
      ctx.stroke();

      // Recipient Pre-text
      ctx.fillStyle = "#6F665A";
      ctx.font = "italic 22px 'Newsreader', Georgia, serif";
      ctx.fillText("This archival scroll hereby confers accreditation upon", 800, 330);

      // Recipient Name
      ctx.fillStyle = "#6B1E1E";
      ctx.font = "italic 64px 'Cormorant Garamond', Georgia, serif";
      ctx.fillText(recipientName || "Distinguished Reader", 800, 430);

      // Recipient Thesis Statement
      ctx.fillStyle = "#14110F";
      ctx.font = "20px 'Newsreader', Georgia, serif";
      ctx.fillText(
        "for traversing the complete chronicle of Srajan Srivastava's architectural journey,",
        800,
        510
      );
      ctx.fillText(
        "from matriculation at BPIT Delhi (2022) to high-throughput production at Hudle.",
        800,
        545
      );

      // Medallion Plinth Box in Center
      ctx.fillStyle = "#EDE5D3";
      ctx.fillRect(550, 610, 500, 110);
      ctx.strokeStyle = "#B08D57";
      ctx.strokeRect(550, 610, 500, 110);

      // Conferred Rank
      ctx.fillStyle = "#8C6B3A";
      ctx.font = "bold 16px 'JetBrains Mono', monospace";
      ctx.fillText(`COLLECTOR RANK: ${rank.toUpperCase()}`, 800, 650);

      ctx.fillStyle = "#14110F";
      ctx.font = "16px 'JetBrains Mono', monospace";
      ctx.fillText(`${sealsEarnedCount} OF 12 ARCHIVAL SEALS CONFERRED`, 800, 685);

      // Bottom Signatures & Seal Date
      ctx.textAlign = "left";
      ctx.fillStyle = "#6F665A";
      ctx.font = "14px 'JetBrains Mono', monospace";
      ctx.fillText(`ISSUED: ${dateStamp}`, 140, 830);
      ctx.fillText("LOCATION: NEW DELHI [28.6139° N, 77.2090° E]", 140, 855);

      ctx.textAlign = "right";
      ctx.fillStyle = "#14110F";
      ctx.font = "italic 28px 'Caveat', cursive, serif";
      ctx.fillText("Srajan Srivastava", 1460, 825);
      ctx.font = "12px 'JetBrains Mono', monospace";
      ctx.fillStyle = "#8C6B3A";
      ctx.fillText("AUTHOR & SYSTEMS ARCHITECT", 1460, 855);

      // Export as PNG
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `Srajan_Srivastava_Certificate_of_Passage_${rank}.png`;
      a.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch {
      // Fallback
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div
      className={`rounded border-2 bg-[#FAF7F2] p-8 sm:p-12 shadow-sm transition-all ${
        isMaster ? "border-[#B08D57] ring-2 ring-[#B08D57]/30" : "border-[#B08D57]/40"
      }`}
    >
      <div className="text-center">
        {/* Emblem */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#B08D57] bg-[#EDE5D3] text-[#8C6B3A] shadow-inner">
          <Award className="h-7 w-7" />
        </div>

        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#8C6B3A] font-semibold">
          CERTIFICATE OF PASSAGE &bull; THE COLLECTOR&apos;S EDITION
        </span>

        <h3 className="mt-3 font-display text-3xl sm:text-4xl font-light text-[#14110F]">
          This Certifies That
        </h3>

        {/* Interactive Recipient Name Input */}
        <div className="my-5 max-w-md mx-auto">
          <input
            type="text"
            value={recipientName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Type your name or identity"
            className="w-full text-center font-display text-3xl sm:text-4xl italic text-[#6B1E1E] bg-transparent border-b-2 border-[#B08D57]/50 py-1 focus:outline-none focus:border-[#B08D57] transition-colors"
          />
          <span className="block mt-1 font-mono text-[9px] uppercase tracking-wider text-[#6F665A]/60">
            [TYPE TO PERSONALIZE YOUR ARCHIVAL CERTIFICATE]
          </span>
        </div>

        <p className="mx-auto max-w-lg font-serif text-sm sm:text-base font-light text-[#6F665A] leading-relaxed">
          Has traversed the complete chapters of Srajan Srivastava&apos;s architectural portfolio &mdash; from matriculation at BPIT Delhi (2022) through algorithmic trials to production telemetry at Hudle.
        </p>

        {/* Accreditation Indicators */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-6 sm:gap-10 border-t border-[#6F665A]/20 pt-6 font-mono text-xs text-[#6F665A]">
          <div>
            <span className="block text-[9px] uppercase tracking-widest text-[#6F665A]/70">
              ACCREDITED RANK
            </span>
            <span className="font-medium text-[#14110F] text-sm">{rank}</span>
          </div>

          <span className="text-[#6F665A]/30">&bull;</span>

          <div>
            <span className="block text-[9px] uppercase tracking-widest text-[#6F665A]/70">
              SEALS CONFERRED
            </span>
            <span className="font-medium text-[#14110F] text-sm">{sealsEarnedCount} of 12</span>
          </div>

          <span className="text-[#6F665A]/30">&bull;</span>

          <div>
            <span className="block text-[9px] uppercase tracking-widest text-[#6F665A]/70">
              DATE OF ISSUANCE
            </span>
            <span className="font-medium text-[#14110F] text-sm">{dateStamp}</span>
          </div>
        </div>

        {/* Download Action */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleDownloadPng}
            disabled={downloading}
            onMouseEnter={() => setCursorLabel("EXPORT")}
            onMouseLeave={() => setCursorLabel(null)}
            className="flex items-center gap-2.5 rounded border border-[#B08D57] bg-[#EDE5D3] px-6 py-3 font-mono text-xs uppercase tracking-widest text-[#14110F] hover:bg-[#FAF7F2] transition-all shadow-sm"
          >
            {downloadSuccess ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-[#8C6B3A]" />
                <span className="text-[#8C6B3A] font-semibold">Certificate Generated!</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4 text-[#B08D57]" />
                <span>{downloading ? "Rendering Scroll..." : "Download Archival Certificate (.PNG)"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
