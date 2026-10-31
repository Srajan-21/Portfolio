"use client";

import React, { useRef, useState, useEffect } from "react";
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

    ctx.strokeStyle = "#14110F";
    ctx.lineWidth = 2.0;
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
      <div className="flex items-center justify-between text-[10px] text-[#6F665A]">
        <div className="flex items-center gap-1.5 font-semibold text-[#14110F]">
          <PenTool className="h-3.5 w-3.5 text-[#B08D57]" />
          <span>CALLIGRAPHIC INITIALS / CIPHER (OPTIONAL)</span>
        </div>
        {hasDrawn && (
          <button
            type="button"
            onClick={clearCanvas}
            className="flex items-center gap-1 text-[#6B1E1E] hover:underline"
          >
            <Eraser className="h-3 w-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div className="relative rounded border border-[#6F665A]/20 bg-[#F6F1E7] p-1">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="h-[100px] w-full cursor-crosshair touch-none rounded bg-[#FAF7F2]"
          style={{ width: "100%", height: "100px" }}
        />
        {!hasDrawn && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center font-serif text-xs italic text-[#6F665A]/50">
            Sign or sketch your initial cipher here...
          </div>
        )}
      </div>
    </div>
  );
}
