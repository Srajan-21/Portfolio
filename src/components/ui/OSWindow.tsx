"use client";

import React, { useState } from "react";
import { X, Minus, Square, ExternalLink } from "lucide-react";

interface OSWindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  badge?: string;
  badgeColor?: string;
  children: React.ReactNode;
  widthClass?: string;
}

export function OSWindow({
  id,
  title,
  isOpen,
  onClose,
  badge,
  badgeColor = "#FFC93C",
  children,
  widthClass = "max-w-4xl",
}: OSWindowProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div
        className={`w-full ${widthClass} border-4 border-[#14121A] bg-white shadow-hard-pop transition-all duration-200 ${
          isMinimized ? "h-14 overflow-hidden" : ""
        }`}
      >
        {/* Retro Window Titlebar */}
        <div className="flex items-center justify-between border-b-3 border-[#14121A] bg-[#14121A] px-4 py-3 text-white select-none">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={onClose}
                className="w-3.5 h-3.5 rounded-full bg-[#FF4D2E] border border-black hover:opacity-80 transition-opacity"
                title="Close Window"
              />
              <button
                onClick={() => setIsMinimized((prev) => !prev)}
                className="w-3.5 h-3.5 rounded-full bg-[#FFC93C] border border-black hover:opacity-80 transition-opacity"
                title="Minimize Window"
              />
              <button
                className="w-3.5 h-3.5 rounded-full bg-[#3DDC97] border border-black hover:opacity-80 transition-opacity"
                title="Maximize Window"
              />
            </div>
            <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {badge && (
              <span
                className="border border-[#14121A] px-2 py-0.5 font-mono text-[10px] font-bold text-[#14121A]"
                style={{ backgroundColor: badgeColor }}
              >
                {badge}
              </span>
            )}
            <button
              onClick={onClose}
              className="p-1 text-white/70 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Window Content */}
        {!isMinimized && (
          <div className="max-h-[82vh] overflow-y-auto p-4 sm:p-6 bg-[#FFF8EC]">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
