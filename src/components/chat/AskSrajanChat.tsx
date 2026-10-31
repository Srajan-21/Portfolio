"use client";

import React, { useState, useRef, useEffect } from "react";
import { soundEngine } from "@/lib/sound";
import { useJournal } from "@/context/JournalContext";
import { MessageSquare, X, Send, Bot, Sparkles, Compass } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  action?: string | null;
}

export function AskSrajanChat() {
  const { addXP } = useJournal();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-0",
      sender: "bot",
      text: "Greetings, Player! I'm Srajan's field assistant. Ask me anything about his work at Hudle, the CLAVIS startup, Tourphin, his music at Octave, or how to get in touch.",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    soundEngine.playClick();
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: textToSend.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await res.json();
      soundEngine.playStamp();
      addXP(20, "JOURNAL ARCHIVE QUERIED");

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: "bot",
        text: data.reply || "Record located in the field notes.",
        action: data.action,
      };

      setMessages((prev) => [...prev, botMsg]);

      // If the answer targets a specific level on the page, scroll there
      if (data.action) {
        setTimeout(() => {
          document.getElementById(data.action)?.scrollIntoView({ behavior: "smooth" });
        }, 400);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `b-err-${Date.now()}`,
          sender: "bot",
          text: "I could not contact the archives at this moment. You can browse the levels directly or email Srajan at srivasrajan8@gmail.com!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const chips = [
    "Tell me about CLAVIS",
    "Tourphin demo?",
    "Nagarro Hackathon 3rd place",
    "What did he do at Hudle?",
    "How do I hire him?",
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            soundEngine.playClick();
            setIsOpen(!isOpen);
          }}
          data-cursor="pointer"
          className="group relative flex items-center gap-2 rounded-full border-2 border-[#1B1A17] bg-[#D9432B] px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[4px_4px_0px_0px_#1B1A17] transition-all hover:scale-105 active:scale-95 dark:border-[#EBE3D3] dark:shadow-[4px_4px_0px_0px_#EBE3D3]"
        >
          <Bot className="h-4 w-4" />
          <span className="hidden sm:inline">Ask Srajan&apos;s AI</span>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
        </button>
      </div>

      {/* Inked Chat Dialog */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-[92vw] max-w-sm rounded border-2 border-[#1B1A17] bg-[#FBF8F1] shadow-[8px_8px_0px_0px_#1B1A17] transition-all sm:right-6 dark:border-[#EBE3D3] dark:bg-[#24201A] dark:shadow-[8px_8px_0px_0px_#EBE3D3]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#D3C4A5] bg-[#E4D7C2] p-3 font-mono text-xs text-[#1B1A17] dark:border-[#3A3328] dark:bg-[#181512] dark:text-[#EBE3D3]">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-[#D9432B]" />
              <span className="font-bold">ARCHIVAL INTELLIGENCE</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#837B6D] hover:text-[#1B1A17] dark:hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Prompt Chips */}
          <div className="border-b border-[#D3C4A5] p-2 dark:border-[#3A3328]">
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {chips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSendMessage(chip)}
                  className="shrink-0 rounded border border-[#D3C4A5] bg-[#F2EBDD] px-2 py-0.5 font-mono text-[10px] text-[#1B1A17] hover:border-[#D9432B] dark:border-[#3A3328] dark:bg-[#181512] dark:text-[#EBE3D3]"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Message List */}
          <div className="max-h-[320px] min-h-[220px] space-y-3 overflow-y-auto p-3 font-serif text-sm">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded p-2.5 ${
                    m.sender === "user"
                      ? "border border-[#1B1A17] bg-[#D9432B] text-white font-mono text-xs"
                      : "border border-[#D3C4A5] bg-[#F2EBDD] text-[#1B1A17] dark:border-[#3A3328] dark:bg-[#181512] dark:text-[#EBE3D3]"
                  }`}
                >
                  {m.text}
                  {m.action && (
                    <div className="mt-1.5 flex items-center gap-1 font-mono text-[10px] text-[#D9432B] dark:text-[#E55840]">
                      <Compass className="h-3 w-3" />
                      <span>Navigated page to {m.action.toUpperCase()}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-1.5 font-mono text-xs text-[#837B6D]">
                <Sparkles className="h-3.5 w-3.5 animate-spin text-[#D9432B]" />
                <span>Consulting field records...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-1.5 border-t border-[#D3C4A5] p-2.5 dark:border-[#3A3328]"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Srajan's code, stack, or story..."
              className="flex-1 rounded border border-[#1B1A17] bg-[#F2EBDD] p-1.5 font-mono text-xs text-[#1B1A17] focus:border-[#D9432B] focus:outline-none dark:border-[#EBE3D3] dark:bg-[#181512] dark:text-[#EBE3D3]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-8 w-8 items-center justify-center rounded border border-[#1B1A17] bg-[#D9432B] text-white hover:opacity-90 disabled:opacity-40 dark:border-[#EBE3D3]"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

