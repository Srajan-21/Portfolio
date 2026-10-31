"use client";

import React, { useRef, useState, useEffect } from "react";
import { soundEngine } from "@/lib/sound";
import { Eraser, PenTool } from "lucide-react";

interface InkDoodleCanvasProps {
  onDoodleChange: (doodleData: string | null) => void;
}

export function InkDoodleCanvas({ onDoodleChange }: InkDoodleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // High DPI scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 280 * dpr;
    canvas.height = 120 * dpr;
    ctx.scale(dpr, dpr);

    ctx.strokeStyle = "#1B1A17";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);
    soundEngine.playPenScratch();

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      onDoodleChange(canvas.toDataURL("image/png"));
    }
  };

  const clearCanvas = () => {
    soundEngine.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    setHasDrawn(false);
    onDoodleChange(null);
  };

  return (
    <div className="space-y-1.5 font-mono text-xs">
      <div className="flex items-center justify-between text-[11px] text-[#837B6D] dark:text-[#7E7565]">
        <div className="flex items-center gap-1 font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
          <PenTool className="h-3.5 w-3.5 text-[#D9432B]" />
          <span>DRAW INK DOODLE / INITIALS (OPTIONAL)</span>
        </div>
        {hasDrawn && (
          <button
            type="button"
            onClick={clearCanvas}
            className="flex items-center gap-1 text-[#D9432B] hover:underline"
          >
            <Eraser className="h-3 w-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div className="relative rounded border border-dashed border-[#1B1A17] bg-[#F2EBDD] dark:border-[#EBE3D3] dark:bg-[#181512]">
        <canvas
          ref={canvasRef}
          style={{ width: "280px", height: "120px" }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="cursor-crosshair touch-none"
        />
        {!hasDrawn && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center font-hand text-sm text-[#837B6D]/70">
            Draw a sketch, signature, or stamp here...
          </div>
        )}
      </div>
    </div>
  );
}
