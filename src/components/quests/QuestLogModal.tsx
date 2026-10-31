"use client";

import React from "react";
import { useStickerWorld } from "@/context/StickerWorldContext";
import { X, CheckCircle2, Circle, Sparkles, Trophy, Lock } from "lucide-react";

interface QuestLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuestLogModal({ isOpen, onClose }: QuestLogModalProps) {
  const { quests, completedQuests, stickers, level } = useStickerWorld();

  if (!isOpen) return null;

  const totalQuests = quests.length;
  const completedCount = completedQuests.length;
  const progressPercent = Math.round((completedCount / totalQuests) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-3xl max-h-[85vh] border-4 border-[#14121A] bg-[#FFF8EC] shadow-hard-pop flex flex-col overflow-hidden">
        {/* Quest Window Header */}
        <div className="bg-[#14121A] text-white px-5 py-3.5 flex items-center justify-between border-b-3 border-[#14121A]">
          <div className="flex items-center gap-3">
            <span className="text-xl">📜</span>
            <div>
              <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                SRAJAN&apos;S MISSION QUEST LOG
              </h3>
              <span className="font-mono text-[10px] text-[#FFC93C]">
                CURRENT LEVEL: {level.toUpperCase()} &bull; {stickers} STICKERS COLLECTED
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress Bar Header */}
        <div className="border-b-2 border-[#14121A]/20 bg-white p-5">
          <div className="flex items-center justify-between font-mono text-xs font-bold text-[#14121A] mb-2">
            <span>OVERALL MISSION COMPLETION</span>
            <span className="text-[#2F5BFF]">{completedCount} / {totalQuests} ({progressPercent}%)</span>
          </div>
          <div className="w-full h-4 border-2 border-[#14121A] bg-gray-100 overflow-hidden">
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-[#3DDC97] transition-all duration-300"
            />
          </div>
        </div>

        {/* Quests List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {quests.map((quest) => {
            const isDone = completedQuests.includes(quest.id);

            return (
              <div
                key={quest.id}
                className={`border-3 border-[#14121A] p-4 transition-all flex items-start justify-between gap-4 ${
                  isDone
                    ? "bg-[#3DDC97]/20 shadow-hard-sm"
                    : quest.isSecret
                    ? "bg-[#14121A] text-white"
                    : "bg-white shadow-hard-sm"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {isDone ? (
                      <CheckCircle2 className="h-5 w-5 text-[#3DDC97] fill-[#14121A]" />
                    ) : quest.isSecret ? (
                      <Lock className="h-5 w-5 text-[#FFC93C]" />
                    ) : (
                      <Circle className="h-5 w-5 text-[#14121A]/40" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4
                        className={`font-display text-base font-black ${
                          isDone ? "text-[#14121A]" : quest.isSecret ? "text-white" : "text-[#14121A]"
                        }`}
                      >
                        {quest.title}
                      </h4>
                      {quest.isSecret && (
                        <span className="bg-[#FF4D2E] text-white border border-white px-1.5 py-0.2 font-mono text-[9px] font-bold">
                          SECRET
                        </span>
                      )}
                    </div>
                    <p
                      className={`font-sans text-xs mt-0.5 ${
                        quest.isSecret && !isDone
                          ? "text-white/60 italic font-mono"
                          : "text-[#14121A]/80"
                      }`}
                    >
                      {quest.isSecret && !isDone
                        ? "Hidden arcade keystroke sequence. Can you enter the classic code?"
                        : quest.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right font-mono text-xs font-bold">
                  <span
                    className={`border border-[#14121A] px-2 py-0.5 inline-block ${
                      isDone
                        ? "bg-[#3DDC97] text-[#14121A]"
                        : "bg-[#FFC93C] text-[#14121A]"
                    }`}
                  >
                    +{quest.reward_stickers} ⭐
                  </span>
                  <div className="text-[10px] text-[#14121A]/60 mt-1">
                    {isDone ? "COMPLETED" : "INCOMPLETE"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
