"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useGhostAI } from "@/hooks/useGhostAI";

/* ── Section-aware content ───────────────────────── */
const SECTION_THOUGHTS: Record<string, string[]> = {
  about: [
    "Hmm, what should I tell them...",
    "I helped build some of these AI systems",
    "NatureAlpha is doing really cool work",
    "Click me if you want to chat!",
  ],
};

const PEEK_MESSAGES: Record<string, string[]> = {
  publications: [
    "Published in Nature Scientific Reports!",
    "95% accuracy on the ageing clock",
    "Ask me about the Drosophila paper!",
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

const SUGGESTION_CHIPS = [
  "What does he do?",
  "Research",
  "Tech stack",
  "Education",
];

/* ── Noise function (matches v6 exactly) ─────────── */
function noise(t: number, seed: number): number {
  return (
    Math.sin(t * 0.7 + seed) * 0.5 +
    Math.sin(t * 1.3 + seed * 2.1) * 0.3 +
    Math.sin(t * 2.1 + seed * 0.7) * 0.2
  );
}

/* ── Ghost SVG body (shared between main + peek) ─── */
function GhostSVG() {
  return (
    <svg viewBox="0 0 90 105" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="gb" cx="45%" cy="25%" r="65%" fx="45%" fy="15%">
          <stop offset="0%" stopColor="rgba(210,235,255,0.45)" />
          <stop offset="30%" stopColor="rgba(180,215,255,0.3)" />
          <stop offset="60%" stopColor="rgba(150,190,250,0.15)" />
          <stop offset="100%" stopColor="rgba(120,170,240,0.05)" />
        </radialGradient>
        <radialGradient id="gi" cx="50%" cy="35%" r="55%">
          <stop offset="0%" stopColor="rgba(200,230,255,0.25)" />
          <stop offset="100%" stopColor="rgba(160,200,255,0)" />
        </radialGradient>
      </defs>
      <path
        d="M45 6C65 6 78 20 78 40L78 65C78 68 76 72 74 75L70 85C68 88 66 86 64 82L60 72C58 69 56 71 54 75L50 85C48 88 46 86 44 82L40 72C38 69 36 71 34 75L30 85C28 88 26 86 24 82L20 72C18 68 14 68 12 65L12 40C12 20 25 6 45 6Z"
        fill="url(#gb)"
        stroke="rgba(180,220,255,0.18)"
        strokeWidth="0.8"
      />
      <ellipse cx="45" cy="38" rx="22" ry="26" fill="url(#gi)" opacity="0.7" />
    </svg>
  );
}

/* ── Types ────────────────────────────────────────── */
interface ChatMessage {
  role: "ai" | "user";
  text: string;
}

/* ── Main component ──────────────────────────────── */
export default function GhostCompanion() {
  /* Refs for DOM elements */
  const gwRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const pupilLRef = useRef<HTMLDivElement>(null);
  const pupilRRef = useRef<HTMLDivElement>(null);
  const mwRef = useRef<HTMLDivElement>(null);
  const thoughtRef = useRef<HTMLDivElement>(null);
  const cbRef = useRef<HTMLDivElement>(null);
  const peekWrapRef = useRef<HTMLDivElement>(null);
  const peekMsgRef = useRef<HTMLDivElement>(null);
  const msgsEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Mutable state refs (no re-renders during animation) */
  const chatOpenRef = useRef(false);
  const mxRef = useRef(0);
  const myRef = useRef(0);
  const gxRef = useRef(0);
  const gyRef = useRef(0);
  const vxRef = useRef(0);
  const vyRef = useRef(0);
  const timeRef = useRef(0);
  const currentSecRef = useRef("hero");
  const peekTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const peekIdxRef = useRef(0);
  const introShownRef = useRef(false);
  const mouthRef = useRef("idle");
  const blinkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const thoughtTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* React state (triggers re-render for chat UI) */
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [thinking, setThinking] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const { sendMessage: askAI } = useGhostAI();

  /* ── Mouse tracking ──────────────────────────────── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mxRef.current = e.clientX;
      myRef.current = e.clientY;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  /* ── Mouth helper ────────────────────────────────── */
  const setMouth = useCallback((shape: string) => {
    mouthRef.current = shape;
    const el = mwRef.current;
    if (!el) return;
    el.className = `mw m-${shape}`;
  }, []);

  /* ── Thought bubble helper ───────────────────────── */
  const showThought = useCallback((text: string, duration: number) => {
    const el = thoughtRef.current;
    if (!el) return;
    el.textContent = text;
    el.classList.add("show");
    if (thoughtTimerRef.current) clearTimeout(thoughtTimerRef.current);
    thoughtTimerRef.current = setTimeout(() => {
      el.classList.remove("show");
    }, duration);
  }, []);

  /* ── Chat position calculation ───────────────────── */
  const positionChat = useCallback(() => {
    const cb = cbRef.current;
    const gh = ghostRef.current;
    if (!cb || !gh) return;
    const rect = gh.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;

    if (cx < window.innerWidth * 0.5) {
      cb.style.left = `${Math.min(rect.right + 15, window.innerWidth - 375)}px`;
    } else {
      cb.style.left = `${Math.max(15, rect.left - 360 - 15)}px`;
    }
    cb.style.top = `${Math.max(15, Math.min(rect.top - 20, window.innerHeight - 380))}px`;
  }, []);

  /* ── Toggle chat ─────────────────────────────────── */
  const openChat = useCallback(() => {
    chatOpenRef.current = true;
    cbRef.current?.classList.add("open");
    positionChat();
    setTimeout(() => inputRef.current?.focus(), 350);
    /* Hide thought */
    thoughtRef.current?.classList.remove("show");
    /* Hide peek */
    peekWrapRef.current?.classList.remove("vis");
    if (peekTimerRef.current) {
      clearTimeout(peekTimerRef.current);
      peekTimerRef.current = null;
    }
  }, [positionChat]);

  const closeChat = useCallback(() => {
    chatOpenRef.current = false;
    cbRef.current?.classList.remove("open");
    setMouth("idle");
  }, [setMouth]);

  const toggleChat = useCallback(() => {
    if (chatOpenRef.current) {
      closeChat();
    } else {
      openChat();
    }
  }, [openChat, closeChat]);

  /* ── Send message ────────────────────────────────── */
  const handleSend = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || thinking) return;

      setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
      setInputValue("");
      setChipsVisible(false);
      setThinking(true);
      setMouth("talk");

      try {
        const reply = await askAI(trimmed);
        setMessages((prev) => [...prev, { role: "ai", text: reply }]);
        setMouth("happy");
        setTimeout(() => setMouth("idle"), 2000);
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "ai", text: "Sorry, I couldn't process that. Try again?" },
        ]);
        setMouth("idle");
      } finally {
        setThinking(false);
      }
    },
    [thinking, askAI, setMouth]
  );

  /* ── Scroll chat to bottom ───────────────────────── */
  useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  /* ── Movement loop ───────────────────────────────── */
  useEffect(() => {
    /* Initialize position */
    gxRef.current = window.innerWidth * 0.6;
    gyRef.current = window.innerHeight * 0.4;

    let raf: number;

    function tick() {
      timeRef.current += 0.006;
      const t = timeRef.current;
      const sp = chatOpenRef.current ? 0.15 : 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      /* Wander target */
      const wx = noise(t, 1.0) * w * 0.3 * sp;
      const wy = noise(t * 0.7, 5.0) * h * 0.25 * sp;
      const baseX = w * 0.55 + wx;
      const baseY = h * 0.4 + wy;

      /* Cursor attraction */
      const dx = mxRef.current - gxRef.current;
      const dy = myRef.current - gyRef.current;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const attraction = chatOpenRef.current
        ? 0
        : Math.min(0.0003, 12 / (dist + 200));

      vxRef.current += (baseX - gxRef.current) * 0.003 * sp + dx * attraction;
      vyRef.current += (baseY - gyRef.current) * 0.003 * sp + dy * attraction;
      vxRef.current *= 0.97;
      vyRef.current *= 0.97;

      /* Burst */
      if (Math.random() < 0.002) {
        vxRef.current += (Math.random() - 0.5) * 2.5;
        vyRef.current += (Math.random() - 0.5) * 2;
      }

      gxRef.current += vxRef.current;
      gyRef.current += vyRef.current;

      /* Bounds */
      const margin = 30;
      if (gxRef.current < margin) {
        gxRef.current = margin;
        vxRef.current = Math.abs(vxRef.current) * 0.4;
      }
      if (gxRef.current > w - 120) {
        gxRef.current = w - 120;
        vxRef.current = -Math.abs(vxRef.current) * 0.4;
      }
      if (gyRef.current < margin) {
        gyRef.current = margin;
        vyRef.current = Math.abs(vyRef.current) * 0.4;
      }
      if (gyRef.current > h - 130) {
        gyRef.current = h - 130;
        vyRef.current = -Math.abs(vyRef.current) * 0.4;
      }

      /* Apply position */
      const gw = gwRef.current;
      if (gw) {
        gw.style.left = `${gxRef.current}px`;
        gw.style.top = `${gyRef.current}px`;
      }

      /* Tilt */
      const tilt = Math.max(-10, Math.min(10, vxRef.current * 2.5));
      const gh = ghostRef.current;
      if (gh) gh.style.transform = `rotate(${tilt}deg)`;

      /* Chat follow */
      if (chatOpenRef.current) positionChat();

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [positionChat]);

  /* ── Eye tracking loop ───────────────────────────── */
  useEffect(() => {
    let raf: number;

    function trackEyes() {
      const pL = pupilLRef.current;
      const pR = pupilRRef.current;
      if (!pL || !pR) {
        raf = requestAnimationFrame(trackEyes);
        return;
      }

      const dx = mxRef.current - gxRef.current - 45;
      const dy = myRef.current - gyRef.current - 35;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let sx: number;
      let sy: number;

      if (dist > 300) {
        /* Wander */
        const t = timeRef.current;
        sx = noise(t * 2.5, 10) * 2;
        sy = noise(t * 2.5, 20) * 1.5;
      } else {
        /* Track cursor */
        const a = Math.atan2(dy, dx);
        const m = Math.min(dist / 120, 1);
        sx = Math.cos(a) * m * 2.8;
        sy = Math.sin(a) * m * 2.8;
      }

      const transform = `translate(${sx}px,${sy}px)`;
      pL.style.transform = transform;
      pR.style.transform = transform;

      raf = requestAnimationFrame(trackEyes);
    }

    raf = requestAnimationFrame(trackEyes);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ── Blink timer ─────────────────────────────────── */
  useEffect(() => {
    function scheduleBlink() {
      blinkTimerRef.current = setTimeout(() => {
        const gh = ghostRef.current;
        if (!gh) {
          scheduleBlink();
          return;
        }

        gh.classList.add("blink");
        setTimeout(() => {
          gh.classList.remove("blink");

          /* 25% chance double blink */
          if (Math.random() < 0.25) {
            setTimeout(() => {
              gh.classList.add("blink");
              setTimeout(() => {
                gh.classList.remove("blink");
                scheduleBlink();
              }, 110);
            }, 180);
          } else {
            scheduleBlink();
          }
        }, 110);
      }, 2000 + Math.random() * 4500);
    }

    scheduleBlink();
    return () => {
      if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current);
    };
  }, []);

  /* ── Section observer ────────────────────────────── */
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    if (sections.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) {
            const prev = currentSecRef.current;
            const next = entry.target.id;
            currentSecRef.current = next;

            /* Show/hide main ghost */
            const gw = gwRef.current;
            if (gw) {
              if (next === "about" || chatOpenRef.current) {
                gw.classList.remove("hidden");
              } else {
                gw.classList.add("hidden");
              }
            }

            /* Intro on first about visit */
            if (next === "about" && !introShownRef.current && !chatOpenRef.current) {
              introShownRef.current = true;
              setTimeout(() => {
                if (chatOpenRef.current) return;
                showThought("Hi! I\u2019m Nikolai\u2019s AI", 2500);
                setMouth("happy");
                setTimeout(() => {
                  setMouth("idle");
                  setTimeout(() => {
                    if (chatOpenRef.current) return;
                    showThought("Click me to chat!", 3000);
                  }, 600);
                }, 2500);
              }, 1500);
            }

            /* Start/stop peek for non-about sections */
            if (prev !== next) {
              /* Clear any existing peek timer */
              if (peekTimerRef.current) {
                clearTimeout(peekTimerRef.current);
                peekTimerRef.current = null;
              }
              peekWrapRef.current?.classList.remove("vis");

              /* Schedule peek if section has messages */
              if (PEEK_MESSAGES[next] && !chatOpenRef.current) {
                schedulePeek(next);
              }
            }
          }
        }
      },
      { threshold: 0.5 }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Peek scheduling ─────────────────────────────── */
  const schedulePeek = useCallback(
    (section: string) => {
      const msgs = PEEK_MESSAGES[section];
      if (!msgs) return;

      const delay = 1200 + Math.random() * 1500;
      peekTimerRef.current = setTimeout(() => {
        showPeek(section);
      }, delay);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const showPeek = useCallback(
    (section: string) => {
      const msgs = PEEK_MESSAGES[section];
      if (!msgs || chatOpenRef.current) return;

      const pw = peekWrapRef.current;
      const pm = peekMsgRef.current;
      if (!pw || !pm) return;

      const msg = msgs[peekIdxRef.current % msgs.length];
      peekIdxRef.current += 1;
      pm.textContent = msg;

      /* Alternate sides */
      const fromRight = peekIdxRef.current % 2 === 0;
      pw.className = `peek-wrap ${fromRight ? "from-r" : "from-l"}`;
      pw.style.top = `${35 + Math.random() * 25}%`;

      /* Trigger enter */
      requestAnimationFrame(() => {
        pw.classList.add("vis");
      });

      /* Hide after 6s, then gap before next */
      peekTimerRef.current = setTimeout(() => {
        pw.classList.remove("vis");

        peekTimerRef.current = setTimeout(() => {
          /* Only show next if still on the same section */
          if (currentSecRef.current === section && !chatOpenRef.current) {
            showPeek(section);
          }
        }, 3000 + Math.random() * 3000);
      }, 6000);
    },
    []
  );

  /* ── Peek click handler ──────────────────────────── */
  const handlePeekClick = useCallback(() => {
    /* Teleport ghost to peek position */
    const pw = peekWrapRef.current;
    if (pw) {
      const rect = pw.getBoundingClientRect();
      gxRef.current = rect.left;
      gyRef.current = rect.top;
      vxRef.current = 0;
      vyRef.current = 0;
    }

    /* Show main ghost */
    gwRef.current?.classList.remove("hidden");

    /* Stop peek, open chat */
    peekWrapRef.current?.classList.remove("vis");
    if (peekTimerRef.current) {
      clearTimeout(peekTimerRef.current);
      peekTimerRef.current = null;
    }
    openChat();
  }, [openChat]);

  /* ── Key handler for chat input ──────────────────── */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSend(inputValue);
      }
    },
    [handleSend, inputValue]
  );

  /* ── Cleanup on unmount ──────────────────────────── */
  useEffect(() => {
    return () => {
      if (peekTimerRef.current) clearTimeout(peekTimerRef.current);
      if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current);
      if (thoughtTimerRef.current) clearTimeout(thoughtTimerRef.current);
    };
  }, []);

  /* ── Render ──────────────────────────────────────── */
  return (
    <>
      {/* SVG defs (shared gradients) */}
      <div className="ghost-svg-defs">
        <svg>
          <defs>
            <radialGradient id="gb" cx="45%" cy="25%" r="65%" fx="45%" fy="15%">
              <stop offset="0%" stopColor="rgba(210,235,255,0.45)" />
              <stop offset="30%" stopColor="rgba(180,215,255,0.3)" />
              <stop offset="60%" stopColor="rgba(150,190,250,0.15)" />
              <stop offset="100%" stopColor="rgba(120,170,240,0.05)" />
            </radialGradient>
            <radialGradient id="gi" cx="50%" cy="35%" r="55%">
              <stop offset="0%" stopColor="rgba(200,230,255,0.25)" />
              <stop offset="100%" stopColor="rgba(160,200,255,0)" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Main floating ghost */}
      <div ref={gwRef} className="gw hidden">
        <div
          ref={ghostRef}
          className="ghost"
          onClick={toggleChat}
        >
          <div className="g-glow" />
          <div className="g-shape">
            <GhostSVG />
          </div>
          <div className="g-eyes">
            <div className="eye">
              <div ref={pupilLRef} className="pupil" />
              <div className="lid" />
            </div>
            <div className="eye">
              <div ref={pupilRRef} className="pupil" />
              <div className="lid" />
            </div>
          </div>
          <div ref={mwRef} className="mw m-idle" />
          <div className="sparkles">
            <div className="spark s1" />
            <div className="spark s2" />
            <div className="spark s3" />
          </div>
        </div>
        <div ref={thoughtRef} className="thought" />
      </div>

      {/* Chat box */}
      <div ref={cbRef} className="chatbox" role="dialog" aria-label="Ghost AI chat">
        <button className="chat-x" onClick={closeChat} aria-label="Close chat">
          &#x2715;
        </button>
        <div className="chat-msgs">
          {messages.map((msg, i) => (
            <p key={i} className={`cm ${msg.role === "ai" ? "cm-ai" : "cm-u"}`}>
              {msg.text}
            </p>
          ))}
          {thinking && (
            <div className="thinking" aria-label="Thinking">
              <span />
              <span />
              <span />
            </div>
          )}
          <div ref={msgsEndRef} />
        </div>
        {chipsVisible && (
          <div className="chat-chips">
            {SUGGESTION_CHIPS.map((chip) => (
              <button
                key={chip}
                className="chip"
                onClick={() => handleSend(chip)}
              >
                {chip}
              </button>
            ))}
          </div>
        )}
        <div className="chat-input">
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={thinking}
            aria-label="Chat input"
          />
        </div>
      </div>

      {/* Peek ghost */}
      <div ref={peekWrapRef} className="peek-wrap from-r">
        <div ref={peekMsgRef} className="peek-msg" />
        <div className="ghost" onClick={handlePeekClick}>
          <div className="g-glow" />
          <div className="g-shape">
            <GhostSVG />
          </div>
          <div className="g-eyes">
            <div className="eye">
              <div className="pupil" />
              <div className="lid" />
            </div>
            <div className="eye">
              <div className="pupil" />
              <div className="lid" />
            </div>
          </div>
          <div className="mw m-idle" />
          <div className="sparkles">
            <div className="spark s1" />
            <div className="spark s2" />
            <div className="spark s3" />
          </div>
        </div>
      </div>
    </>
  );
}
