"use client";

import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { useStickerWorld } from "@/context/StickerWorldContext";
import { Sparkles, RefreshCw } from "lucide-react";

interface StickerItem {
  id: string;
  label: string;
  sublabel: string;
  color: string;
  textColor: string;
  width: number;
  height: number;
  x: number;
  y: number;
  rotation: number;
  shape: "rect" | "star" | "pill";
}

export function PhysicsStickerPile() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { calmMode, collectSticker, completeQuest } = useStickerWorld();
  const [hasInteracted, setHasInteracted] = useState(false);

  const STICKERS: StickerItem[] = [
    { id: "s1", label: "NEXT.JS 14", sublabel: "App Router", color: "#14121A", textColor: "#FFFFFF", width: 140, height: 60, x: 120, y: -20, rotation: -0.2, shape: "pill" },
    { id: "s2", label: "TYPESCRIPT", sublabel: "Strict Mode", color: "#2F5BFF", textColor: "#FFFFFF", width: 130, height: 60, x: 280, y: -80, rotation: 0.15, shape: "rect" },
    { id: "s3", label: "GUITAR PICK", sublabel: "Octave Lead", color: "#FF4D2E", textColor: "#FFFFFF", width: 120, height: 65, x: 200, y: -140, rotation: -0.3, shape: "star" },
    { id: "s4", label: "OCTAVE HEAD", sublabel: "60+ Musicians", color: "#FFC93C", textColor: "#14121A", width: 140, height: 60, x: 380, y: -60, rotation: 0.25, shape: "pill" },
    { id: "s5", label: "POSTGRESQL", sublabel: "3NF Normalization", color: "#3DDC97", textColor: "#14121A", width: 135, height: 55, x: 150, y: -200, rotation: -0.1, shape: "rect" },
    { id: "s6", label: "99.8% JUSPAY", sublabel: "Hudle Webhooks", color: "#FF8FB8", textColor: "#14121A", width: 135, height: 60, x: 320, y: -180, rotation: 0.1, shape: "pill" },
    { id: "s7", label: "SUB-5MS ATS", sublabel: "Zero-LLM Engine", color: "#FFC93C", textColor: "#14121A", width: 140, height: 60, x: 220, y: -260, rotation: -0.25, shape: "rect" },
    { id: "s8", label: "SIH HACKATHON", sublabel: "Tourphin Build", color: "#7B4DFF", textColor: "#FFFFFF", width: 145, height: 65, x: 350, y: -300, rotation: 0.3, shape: "star" },
  ];

  useEffect(() => {
    if (calmMode) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 400;

    // Set canvas resolution
    canvas.width = width;
    canvas.height = height;

    const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;

    const engine = Engine.create({
      gravity: { x: 0, y: 1.1 },
    });

    // Boundaries
    const wallThickness = 60;
    const ground = Bodies.rectangle(width / 2, height + wallThickness / 2 - 10, width * 2, wallThickness, {
      isStatic: true,
      friction: 0.8,
      restitution: 0.4,
    });
    const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, {
      isStatic: true,
    });
    const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, {
      isStatic: true,
    });

    Composite.add(engine.world, [ground, leftWall, rightWall]);

    // Create Sticker Bodies
    const stickerBodies = STICKERS.map((s, idx) => {
      const startX = (width / (STICKERS.length + 1)) * (idx + 1) + (Math.random() * 40 - 20);
      const startY = -40 - idx * 50;

      const body = Bodies.rectangle(startX, startY, s.width, s.height, {
        restitution: 0.45,
        friction: 0.5,
        density: 0.002,
        chamfer: { radius: 14 },
      });

      // Attach custom sticker metadata
      (body as any).stickerData = s;
      return body;
    });

    Composite.add(engine.world, stickerBodies);

    // Mouse control
    const mouse = Mouse.create(canvas);
    // Allow touch scrolling on container if not touching a body
    mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.25,
        render: { visible: false },
      },
    });

    Composite.add(engine.world, mouseConstraint);

    // Detect interaction to complete quest
    Events.on(mouseConstraint, "startdrag", () => {
      setHasInteracted(true);
      collectSticker("sticker_grab", 2, "Flung a physics tech sticker!");
      completeQuest("q_physics");
    });

    // Device Tilt on Mobile
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null) {
        engine.gravity.x = Math.max(-1, Math.min(1, e.gamma / 30));
      }
    };
    window.addEventListener("deviceorientation", handleDeviceOrientation);

    // Custom Canvas Render Loop (Draws chunky stickers with hard offset shadows)
    const ctx = canvas.getContext("2d");
    const runner = Runner.create();
    Runner.run(runner, engine);

    let animId: number;
    const renderLoop = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      stickerBodies.forEach((body) => {
        const s = (body as any).stickerData as StickerItem;
        if (!s) return;

        const { x, y } = body.position;
        const angle = body.angle;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        const w = s.width;
        const h = s.height;
        const r = 12;

        // 1. Hard Offset Shadow (6px 6px in ink black)
        ctx.fillStyle = "#14121A";
        ctx.beginPath();
        ctx.roundRect(-w / 2 + 5, -h / 2 + 5, w, h, r);
        ctx.fill();

        // 2. White Die-Cut Border (Outer rim)
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.roundRect(-w / 2 - 3, -h / 2 - 3, w + 6, h + 6, r + 2);
        ctx.fill();
        ctx.strokeStyle = "#14121A";
        ctx.lineWidth = 3;
        ctx.stroke();

        // 3. Colored Sticker Face
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.roundRect(-w / 2, -h / 2, w, h, r);
        ctx.fill();

        // 4. Sticker Labels
        ctx.fillStyle = s.textColor;
        ctx.textAlign = "center";
        ctx.font = "bold 13px 'Bricolage Grotesque', sans-serif";
        ctx.fillText(s.label, 0, -2);

        ctx.font = "10px 'Space Mono', monospace";
        ctx.fillStyle = s.textColor;
        ctx.globalAlpha = 0.85;
        ctx.fillText(s.sublabel, 0, 15);
        ctx.globalAlpha = 1.0;

        ctx.restore();
      });

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, [calmMode, collectSticker, completeQuest]);

  if (calmMode) {
    // Static Layout for Calm / Accessibility Mode
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4">
        {STICKERS.map((s) => (
          <div
            key={s.id}
            style={{ backgroundColor: s.color, color: s.textColor }}
            className="rounded-2xl border-ink-2 p-3 text-center shadow-hard-sm"
          >
            <div className="font-bold text-xs">{s.label}</div>
            <div className="font-mono text-[9px] opacity-80">{s.sublabel}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[440px] rounded-3xl border-ink-4 bg-white/70 shadow-hard overflow-hidden"
    >
      {/* Top Banner Tag */}
      <div className="absolute top-3 left-4 z-10 flex items-center gap-2 rounded-lg border-ink-2 bg-[#FFC93C] px-3 py-1 font-mono text-[10px] font-black uppercase text-[#14121A] shadow-hard-sm">
        <Sparkles className="h-3.5 w-3.5" />
        <span>PHYSICS STICKER DESK // GRAB &amp; THROW!</span>
      </div>

      {!hasInteracted && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 z-10 rounded-full border-ink bg-[#FFF8EC] px-4 py-1.5 font-mono text-xs font-bold text-[#14121A] shadow-hard-sm animate-pulse">
          👉 Drag, toss, or stack any sticker!
        </div>
      )}

      {/* Physics Canvas */}
      <canvas ref={canvasRef} className="h-full w-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}
