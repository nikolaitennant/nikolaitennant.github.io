"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useGhostMovement } from "@/hooks/useGhostMovement";
import { useGhostAI } from "@/hooks/useGhostAI";
import GhostCharacter from "./GhostCharacter";
import GhostChat from "./GhostChat";

/* ── Thought messages (About section, idle) ────────── */
const PERIODIC_THOUGHTS = [
  "Hmm, what should I tell them...",
  "I helped build some of these AI systems",
  "NatureAlpha is doing really cool work",
  "Click me if you want to chat!",
];

/* ── Peek messages per section ─────────────────────── */
const PEEK_MESSAGES: Record<string, string[]> = {
  education: [
    "4.0 GPA at Brown \u2014 not bad right?",
    "Ask me about his thesis!",
    "History degree is actually useful for AI",
  ],
  experience: [
    "NatureAlpha is his favorite role so far",
    "\u00A3829K value at dunnhumby",
    "He loved research at Singh Lab",
  ],
  projects: [
    "RAG Scholar AI is his proudest side project",
    "0.96 AUC on SenID \u2014 impressive",
    "225 people in that hackathon!",
  ],
};

const ABOUT_SECTION = "about";
const THOUGHT_SHOW_DURATION = 3500;
const THOUGHT_MIN_INTERVAL = 5000;
const THOUGHT_MAX_INTERVAL = 12000;
const PEEK_INITIAL_MIN = 1200;
const PEEK_INITIAL_MAX = 2700;
const PEEK_SHOW_DURATION = 6000;
const PEEK_GAP_MIN = 3000;
const PEEK_GAP_MAX = 6000;
const CHAT_WIDTH = 360;
const CHAT_GAP = 15;

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export default function GhostCompanion() {
  /* ── Core state ──────────────────────────────────── */
  const [currentSection, setCurrentSection] = useState("hero");
  const [chatOpen, setChatOpen] = useState(false);
  const [mouth, setMouth] = useState<"idle" | "happy" | "talk" | "ooh">("idle");

  /* ── Thought bubble ──────────────────────────────── */
  const [thoughtText, setThoughtText] = useState("");
  const [thoughtVisible, setThoughtVisible] = useState(false);

  /* ── Peek state ──────────────────────────────────── */
  const [peekVisible, setPeekVisible] = useState(false);
  const [peekSide, setPeekSide] = useState<"left" | "right">("right");
  const [peekMessage, setPeekMessage] = useState("");
  const [peekY, setPeekY] = useState("45%");

  /* ── Tracking refs ───────────────────────────────── */
  const introShownRef = useRef(false);
  const thoughtIndexRef = useRef(0);
  const peekIndexRef = useRef(0);
  const peekSideRef = useRef<"left" | "right">("right");
  const chatOpenRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  /* ── Chat position (computed from ghost position) ── */
  const [chatPosition, setChatPosition] = useState({ left: 0, top: 0 });

  /* ── Derived ─────────────────────────────────────── */
  const ghostVisible = currentSection === ABOUT_SECTION || chatOpen;

  /* ── Movement + AI hooks ─────────────────────────── */
  const { setElement, posRef, mouseRef } = useGhostMovement({
    enabled: ghostVisible,
    speedMultiplier: chatOpen ? 0.15 : 1,
  });
  const { sendMessage } = useGhostAI();

  /* ── Render-time tilt/speed from posRef ──────────── */
  const [renderTilt, setRenderTilt] = useState(0);
  const [renderSpeed, setRenderSpeed] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      if (posRef.current) {
        setRenderTilt(posRef.current.tilt);
        setRenderSpeed(posRef.current.speed);
      }
    }, 100);
    return () => clearInterval(id);
  }, [posRef]);

  /* Keep chatOpenRef in sync */
  useEffect(() => {
    chatOpenRef.current = chatOpen;
  }, [chatOpen]);

  /* ── Timer helper ────────────────────────────────── */
  const addTimer = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(() => {
      timersRef.current = timersRef.current.filter((t) => t !== id);
      fn();
    }, ms);
    timersRef.current = [...timersRef.current, id];
    return id;
  }, []);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  /* ── Section observer ────────────────────────────── */
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) {
            setCurrentSection(entry.target.id);
          }
        }
      },
      { threshold: 0.5 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ── Intro sequence (first time About visible) ───── */
  useEffect(() => {
    if (currentSection !== ABOUT_SECTION) return;
    if (introShownRef.current) return;
    if (chatOpen) return;

    introShownRef.current = true;

    /* 1. Wait 1.5s, show "Hi!" */
    addTimer(() => {
      if (chatOpenRef.current) return;
      setThoughtText("Hi! I\u2019m Nikolai\u2019s AI");
      setThoughtVisible(true);
      setMouth("happy");

      /* 2. Hide after 2.5s */
      addTimer(() => {
        setThoughtVisible(false);
        setMouth("idle");

        /* 3. After 0.6s show second message */
        addTimer(() => {
          if (chatOpenRef.current) return;
          setThoughtText("Click me to chat!");
          setThoughtVisible(true);

          /* 4. Hide after 3s — periodic thoughts start via the cycling effect */
          addTimer(() => {
            setThoughtVisible(false);
          }, 3000);
        }, 600);
      }, 2500);
    }, 1500);
  }, [currentSection, chatOpen, addTimer]);

  /* ── Periodic thought cycling (About section, chat closed) ── */
  useEffect(() => {
    if (currentSection !== ABOUT_SECTION) return;
    if (chatOpen) return;
    /* Don't start cycling until intro is done — intro takes ~8.6s total */
    if (!introShownRef.current) return;

    let cancelled = false;

    const cycle = () => {
      if (cancelled || chatOpenRef.current) return;

      const delay = randomBetween(THOUGHT_MIN_INTERVAL, THOUGHT_MAX_INTERVAL);

      addTimer(() => {
        if (cancelled || chatOpenRef.current) return;

        const msg = PERIODIC_THOUGHTS[thoughtIndexRef.current % PERIODIC_THOUGHTS.length];
        thoughtIndexRef.current += 1;

        setThoughtText(msg);
        setThoughtVisible(true);
        setMouth("ooh");

        addTimer(() => {
          setThoughtVisible(false);
          setMouth("idle");
          cycle();
        }, THOUGHT_SHOW_DURATION);
      }, delay);
    };

    /* Wait a beat before first periodic thought (gives intro time to finish) */
    const startId = addTimer(cycle, 2000);

    return () => {
      cancelled = true;
      clearTimeout(startId);
    };
  }, [currentSection, chatOpen, addTimer]);

  /* ── Peek behavior (non-About sections) ──────────── */
  useEffect(() => {
    if (currentSection === ABOUT_SECTION || currentSection === "hero") return;
    if (chatOpen) return;

    const messages = PEEK_MESSAGES[currentSection];
    if (!messages || messages.length === 0) return;

    let cancelled = false;

    const showPeek = () => {
      if (cancelled || chatOpenRef.current) return;

      const msg = messages[peekIndexRef.current % messages.length];
      peekIndexRef.current += 1;

      /* Alternate sides */
      const side = peekSideRef.current === "right" ? "left" : "right";
      peekSideRef.current = side;

      setPeekMessage(msg);
      setPeekSide(side);
      setPeekY(`${35 + Math.random() * 25}%`);
      setPeekVisible(true);

      /* Stay for PEEK_SHOW_DURATION then hide */
      addTimer(() => {
        if (cancelled) return;
        setPeekVisible(false);

        /* After gap, show next */
        addTimer(() => {
          showPeek();
        }, randomBetween(PEEK_GAP_MIN, PEEK_GAP_MAX));
      }, PEEK_SHOW_DURATION);
    };

    /* Initial delay before first peek */
    const startId = addTimer(() => {
      showPeek();
    }, randomBetween(PEEK_INITIAL_MIN, PEEK_INITIAL_MAX));

    return () => {
      cancelled = true;
      clearTimeout(startId);
      setPeekVisible(false);
    };
  }, [currentSection, chatOpen, addTimer]);

  /* ── Chat position calculation ───────────────────── */
  useEffect(() => {
    if (!chatOpen) return;

    const updatePos = () => {
      const pos = posRef.current;
      if (!pos) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const inLeftHalf = pos.x < vw / 2;

      let left: number;
      if (inLeftHalf) {
        /* Ghost is left, chat goes right */
        left = pos.x + 110 + CHAT_GAP;
      } else {
        /* Ghost is right, chat goes left */
        left = pos.x - CHAT_WIDTH - CHAT_GAP;
      }

      /* Clamp horizontal */
      left = Math.max(8, Math.min(left, vw - CHAT_WIDTH - 8));

      /* Vertical: align with ghost, clamp to viewport */
      let top = pos.y;
      top = Math.max(8, Math.min(top, vh - 420));

      setChatPosition({ left, top });
    };

    updatePos();
    const id = setInterval(updatePos, 100);
    return () => clearInterval(id);
  }, [chatOpen, posRef]);

  /* ── Cleanup all timers on unmount ───────────────── */
  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  /* ── Toggle chat ─────────────────────────────────── */
  const toggleChat = useCallback(() => {
    setChatOpen((prev) => {
      const next = !prev;
      if (next) {
        /* Opening: stop thoughts */
        setThoughtVisible(false);
        setPeekVisible(false);
      } else {
        /* Closing */
        if (currentSection !== ABOUT_SECTION) {
          /* On non-About sections ghost fades instantly — no special action needed,
             ghostVisible will become false via the derived value */
        }
        setMouth("idle");
      }
      return next;
    });
  }, [currentSection]);

  /* ── Peek ghost click → teleport + open chat ─────── */
  const handlePeekClick = useCallback(() => {
    /* Teleport ghost to peek position */
    const peekEl = document.querySelector(".ghost-peek-wrap.visible") as HTMLElement | null;
    if (peekEl && posRef.current) {
      const rect = peekEl.getBoundingClientRect();
      posRef.current.x = rect.left;
      posRef.current.y = rect.top;
      posRef.current.vx = 0;
      posRef.current.vy = 0;
    }

    /* Stop peek, open chat */
    setPeekVisible(false);
    clearAllTimers();
    setChatOpen(true);
  }, [posRef, clearAllTimers]);

  /* ── Close chat handler ──────────────────────────── */
  const closeChat = useCallback(() => {
    setChatOpen(false);
    setMouth("idle");

    if (currentSection === ABOUT_SECTION) {
      /* Resume thoughts after 2s */
      addTimer(() => {
        /* Thoughts will restart via the cycling effect when chatOpen becomes false */
      }, 2000);
    }
  }, [currentSection, addTimer]);

  /* ── Render ──────────────────────────────────────── */
  return (
    <>
      {/* Main ghost — position managed by useGhostMovement */}
      <div
        ref={setElement}
        className={`fixed z-[1000] pointer-events-none transition-opacity duration-500${
          ghostVisible ? "" : " opacity-0"
        }`}
        aria-hidden={!ghostVisible}
      >
        <GhostCharacter
          mouseRef={mouseRef}
          tilt={renderTilt}
          speed={renderSpeed}
          mouth={mouth}
          onClick={toggleChat}
        />
        <div className={`ghost-thought${thoughtVisible ? " visible" : ""}`}>
          {thoughtText}
        </div>
      </div>

      {/* Peek ghost — slides in from edges on non-About sections */}
      <div
        className={`ghost-peek-wrap from-${peekSide}${peekVisible ? " visible" : ""}`}
        style={{ top: peekY }}
      >
        <div className="ghost-peek-msg">{peekMessage}</div>
        <GhostCharacter
          size={65}
          mouseRef={mouseRef}
          mouth="idle"
          onClick={handlePeekClick}
        />
      </div>

      {/* Chat dialog */}
      <GhostChat
        open={chatOpen}
        onClose={closeChat}
        onSend={sendMessage}
        position={chatPosition}
        onMouthChange={setMouth}
      />
    </>
  );
}
