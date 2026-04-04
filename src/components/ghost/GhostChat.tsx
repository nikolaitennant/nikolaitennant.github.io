"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface GhostChatProps {
  open: boolean;
  onClose: () => void;
  onSend: (message: string) => Promise<string>;
  position: { left: number; top: number };
  onMouthChange: (mouth: "idle" | "happy" | "talk" | "ooh") => void;
}

type Message = {
  role: "ai" | "user";
  text: string;
};

const SUGGESTION_CHIPS = ["What does he do?", "Research", "Tech stack", "Education"];

export default function GhostChat({
  open,
  onClose,
  onSend,
  position,
  onMouthChange,
}: GhostChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const msgsEndRef = useRef<HTMLDivElement>(null);
  const mouthTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-focus after open animation settles
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => inputRef.current?.focus(), 400);
    return () => clearTimeout(id);
  }, [open]);

  // Scroll to bottom when messages change or thinking state changes
  useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const clearMouthTimer = () => {
    if (mouthTimerRef.current !== null) {
      clearTimeout(mouthTimerRef.current);
      mouthTimerRef.current = null;
    }
  };

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || thinking) return;

      setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
      setInput("");
      setChipsVisible(false);
      setThinking(true);
      clearMouthTimer();
      onMouthChange("talk");

      try {
        const reply = await onSend(trimmed);
        setMessages((prev) => [...prev, { role: "ai", text: reply }]);
        onMouthChange("happy");
        mouthTimerRef.current = setTimeout(() => onMouthChange("idle"), 2000);
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "ai", text: "Sorry, I couldn't process that. Try again?" },
        ]);
        onMouthChange("idle");
      } finally {
        setThinking(false);
      }
    },
    [thinking, onSend, onMouthChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage(input);
    }
  };

  const handleChip = (chip: string) => {
    sendMessage(chip);
  };

  // Cleanup mouth timer on unmount
  useEffect(() => {
    return () => clearMouthTimer();
  }, []);

  return (
    <div
      className={`ghost-chat${open ? " open" : ""}`}
      style={{ left: position.left, top: position.top }}
      role="dialog"
      aria-label="Ghost AI chat"
      aria-modal="false"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close chat"
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "rgba(160, 200, 255, 0.4)",
          lineHeight: 1,
          padding: 2,
          fontSize: "0.9rem",
          transition: "color 150ms ease",
          zIndex: 1,
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.color =
            "rgba(190, 220, 255, 0.75)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.color =
            "rgba(160, 200, 255, 0.4)")
        }
      >
        ✕
      </button>

      {/* Messages */}
      <div className="ghost-chat-msgs">
        {messages.map((msg, i) => (
          <p
            key={i}
            className={`ghost-chat-msg ${
              msg.role === "ai" ? "ghost-chat-msg-ai" : "ghost-chat-msg-user"
            }`}
          >
            {msg.text}
          </p>
        ))}

        {thinking && (
          <div className="ghost-chat-thinking" aria-label="Thinking">
            <span />
            <span />
            <span />
          </div>
        )}

        <div ref={msgsEndRef} />
      </div>

      {/* Suggestion chips */}
      {chipsVisible && (
        <div className="ghost-chat-chips">
          {SUGGESTION_CHIPS.map((chip) => (
            <button
              key={chip}
              className="ghost-chat-chip"
              onClick={() => handleChip(chip)}
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="ghost-chat-input">
        <input
          ref={inputRef}
          type="text"
          placeholder="Ask anything…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={thinking}
          aria-label="Chat input"
        />
      </div>
    </div>
  );
}
