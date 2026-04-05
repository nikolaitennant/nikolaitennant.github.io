"use client";

import React, { useEffect, useRef, useState } from "react";
import { useGhostAI } from "@/hooks/useGhostAI";

interface ChatMsg {
  role: "ai" | "user";
  text: string;
}

export default function GhostPeek() {
  const initialized = useRef(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "ai", text: "Hey! Ask me anything about Nikolai." },
  ]);
  const [thinking, setThinking] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const msgsEndRef = useRef<HTMLDivElement>(null);
  const { sendMessage } = useGhostAI();

  useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  async function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setChipsVisible(false);
    setThinking(true);
    try {
      const reply = await sendMessage(trimmed);
      setMessages((prev) => [...prev, { role: "ai", text: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "ai", text: "Sorry, couldn\u2019t process that." }]);
    } finally { setThinking(false); }
    const ci = document.getElementById("ci-peek") as HTMLInputElement | null;
    if (ci) ci.value = "";
  }

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const peekW = document.getElementById("peekW")!;
    const pkMsg = document.getElementById("pkMsg")!;

    if (!peekW || !pkMsg) return;

    let peekTimer: ReturnType<typeof setTimeout> | null = null;
    const peekIdx: Record<string, number> = {};
    let currentSec = "";
    let aboutVisible = true;
    let floaterActive = false;

    // Track about visibility — suppress peeks when about is in view
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const aboutObs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            aboutVisible = entry.isIntersecting;
            if (aboutVisible) {
              if (peekTimer) clearTimeout(peekTimer);
              peekW.classList.remove("vis");
            }
          }
        },
        { threshold: 0.1 }
      );
      aboutObs.observe(aboutSection);
    }

    // Watch non-about, non-hero sections for peek triggers
    const secs = document.querySelectorAll("section[id]:not(#about):not(#hero)");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.5) {
            if (aboutVisible || floaterActive) return;
            const id = e.target.id;
            if (id !== currentSec) {
              currentSec = id;
              if (peekTimer) clearTimeout(peekTimer);
              peekW.classList.remove("vis");
              if ((e.target as HTMLElement).dataset.peeks) {
                schedulePeek(e.target as HTMLElement);
              }
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    secs.forEach((s) => obs.observe(s));

    function schedulePeek(sec: HTMLElement) {
      peekW.classList.remove("vis");
      peekW.className = "peek-wrap";
      if (peekTimer) clearTimeout(peekTimer);
      const pd = sec.dataset.peeks;
      if (!pd) return;
      const peeks = JSON.parse(pd);
      if (!peekIdx[sec.id]) peekIdx[sec.id] = 0;

      function doOne() {
        if (currentSec !== sec.id || floaterActive) return;
        const i = peekIdx[sec.id] % peeks.length;
        const p = peeks[i];
        peekIdx[sec.id]++;

        pkMsg.textContent = p.msg;
        peekW.className = "peek-wrap from-" + p.s;
        peekW.style.top = p.y || "45%";
        peekW.style.bottom = "auto";

        setTimeout(() => peekW.classList.add("vis"), 50);
        setTimeout(() => {
          peekW.classList.remove("vis");
          if (currentSec === sec.id) {
            peekTimer = setTimeout(doOne, 2000 + Math.random() * 2000);
          }
        }, 8000);
      }

      peekTimer = setTimeout(doOne, 600 + Math.random() * 800);
    }

    // Mouse tracking for floater
    let mousex = 0, mousey = 0;
    document.addEventListener("mousemove", (e) => { mousex = e.clientX; mousey = e.clientY; });

    // Click peek ghost → glide to center, open chat with peek context
    const peekGhost = peekW.querySelector(".ghost");
    if (peekGhost) {
      peekGhost.addEventListener("click", () => {
        if (peekTimer) clearTimeout(peekTimer);
        floaterActive = true;

        // Capture what the peek was saying
        const peekContext = pkMsg.textContent || "";

        // Hide main ghost in about section
        const mainGhost = document.getElementById("gw-main");
        if (mainGhost) mainGhost.style.opacity = "0.15";

        const rect = peekW.getBoundingClientRect();
        const targetX = window.innerWidth / 2 - 65;
        const targetY = window.innerHeight / 2 - 75;

        peekW.classList.remove("vis");

        const floater = document.getElementById("gw-float")!;
        if (!floater) return;

        floater.style.left = rect.left + "px";
        floater.style.top = rect.top + "px";
        floater.classList.remove("hidden");

        let fx = rect.left, fy = rect.top;

        // Glide to center
        const glide = () => {
          fx += (targetX - fx) * 0.06;
          fy += (targetY - fy) * 0.06;
          floater.style.left = fx + "px";
          floater.style.top = fy + "px";
          if (Math.abs(targetX - fx) > 2 || Math.abs(targetY - fy) > 2) {
            requestAnimationFrame(glide);
          } else {
            // Start alive movement — mouse tracking + organic drift
            let t = 0;
            const alive = () => {
              if (!floaterActive) return;
              t += 0.02;

              // Gentle drift
              const driftX = Math.sin(t * 0.7) * 10;
              const driftY = Math.sin(t * 0.5 + 1) * 8;

              // Slight mouse attraction
              const mdx = mousex - (fx + 65);
              const mdy = mousey - (fy + 75);
              const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
              const pull = Math.min(0.02, 8 / (mdist + 100));

              fx += mdx * pull * 0.3;
              fy += mdy * pull * 0.3;

              const tilt = Math.sin(t * 0.3) * 4 + mdx * 0.01;

              floater.style.left = (fx + driftX) + "px";
              floater.style.top = (fy + driftY) + "px";
              floater.style.transform = `rotate(${tilt}deg)`;

              // Update chat position too
              const cb = document.getElementById("cb-peek");
              if (cb && cb.classList.contains("open")) {
                if (fx + 65 < window.innerWidth * 0.5) {
                  cb.style.left = (fx + driftX + 150) + "px";
                } else {
                  cb.style.left = Math.max(15, fx + driftX - 375) + "px";
                }
                cb.style.top = Math.max(15, fy + driftY - 20) + "px";
              }

              requestAnimationFrame(alive);
            };
            requestAnimationFrame(alive);

            // Open chat with context from peek message
            const cb = document.getElementById("cb-peek");
            if (cb) {
              if (fx < window.innerWidth * 0.5) {
                cb.style.left = (fx + 150) + "px";
              } else {
                cb.style.left = Math.max(15, fx - 375) + "px";
              }
              cb.style.top = Math.max(15, fy - 20) + "px";
              cb.classList.add("open");
            }

            // Set initial message based on peek context
            if (peekContext) {
              const msgContainer = document.querySelector("#cb-peek .chat-msgs");
              if (msgContainer) {
                const firstMsg = msgContainer.querySelector(".cm-ai");
                if (firstMsg) firstMsg.textContent = peekContext + " Want to know more?";
              }
            }
          }
        };
        requestAnimationFrame(glide);
      });
    }

    // Close peek chat → hide floater, restore main ghost
    const closePeekChat = document.getElementById("cb-peek")?.querySelector(".chat-x");
    if (closePeekChat) {
      closePeekChat.addEventListener("click", () => {
        document.getElementById("cb-peek")?.classList.remove("open");
        document.getElementById("gw-float")?.classList.add("hidden");
        floaterActive = false;

        // Restore main ghost opacity
        const mainGhost = document.getElementById("gw-main");
        if (mainGhost) mainGhost.style.opacity = "1";
      });
    }
  }, []);

  return (
    <>
    {/* Floating ghost that appears when peek is clicked */}
    <div className="gw hidden" id="gw-float">
      <div className="ghost">
        <div className="g-glow" />
        <div className="g-shape" dangerouslySetInnerHTML={{ __html: `
          <svg viewBox="0 0 90 105" fill="none">
            <defs>
              <radialGradient id="gGrad3" cx="45" cy="30" r="50" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="rgba(220, 240, 255, 0.6)"/>
                <stop offset="25%" stop-color="rgba(195, 225, 255, 0.4)"/>
                <stop offset="50%" stop-color="rgba(170, 205, 250, 0.25)"/>
                <stop offset="75%" stop-color="rgba(145, 185, 245, 0.12)"/>
                <stop offset="100%" stop-color="rgba(120, 170, 240, 0.05)"/>
              </radialGradient>
              <radialGradient id="gInner3" cx="45" cy="35" r="25" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="rgba(210, 235, 255, 0.35)"/>
                <stop offset="100%" stop-color="rgba(160, 200, 255, 0)"/>
              </radialGradient>
              <filter id="gBlur3"><feGaussianBlur in="SourceGraphic" stdDeviation="0.4"/></filter>
            </defs>
            <path d="M 45 6 C 65 6, 78 20, 78 40 L 78 65 C 78 68, 76 72, 74 75 L 70 85 C 68 88, 66 86, 64 82 L 60 72 C 58 69, 56 71, 54 75 L 50 85 C 48 88, 46 86, 44 82 L 40 72 C 38 69, 36 71, 34 75 L 30 85 C 28 88, 26 86, 24 82 L 20 72 C 18 68, 14 68, 12 65 L 12 40 C 12 20, 25 6, 45 6 Z" fill="url(#gGrad3)" stroke="rgba(190,225,255,0.25)" stroke-width="0.8" filter="url(#gBlur3)"/>
            <circle cx="45" cy="35" r="22" fill="url(#gInner3)"><animate attributeName="r" values="22;24;22" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/></circle>
          </svg>
        ` }} />
        <div className="g-eyes">
          <div className="eye"><div className="lid" /><div className="pupil" /></div>
          <div className="eye"><div className="lid" /><div className="pupil" /></div>
        </div>
        <div className="mw"><div className="m-happy" /></div>
        <div className="sparkles">
          <div className="spark s1" />
          <div className="spark s2" />
          <div className="spark s3" />
        </div>
      </div>
    </div>

    {/* Peek chat */}
    <div className="chatbox" id="cb-peek">
      <button className="chat-x" aria-label="Close chat">&#x2715;</button>
      <div className="chat-msgs">
        {messages.map((msg, i) => (
          <p key={i} className={`cm ${msg.role === "ai" ? "cm-ai" : "cm-u"}`}>{msg.text}</p>
        ))}
        {thinking && <div className="thinking"><span /><span /><span /></div>}
        <div ref={msgsEndRef} />
      </div>
      {chipsVisible && (
        <div className="chat-chips">
          {["What does he do?", "Research", "Tech stack", "Education"].map((c) => (
            <button key={c} className="chip" onClick={() => handleSend(c)}>{c}</button>
          ))}
        </div>
      )}
      <div className="chat-input">
        <input type="text" placeholder="Ask anything..." id="ci-peek" onKeyDown={(e) => { if (e.key === "Enter") handleSend(e.currentTarget.value); }} />
      </div>
    </div>

    {/* Peek ghost at edge */}
    <div className="peek-wrap" id="peekW">
      <div className="peek-msg" id="pkMsg" />
      <div className="ghost" style={{ cursor: "pointer" }}>
        <div className="g-glow" />
        <div className="g-shape" dangerouslySetInnerHTML={{ __html: `
          <svg viewBox="0 0 90 105" fill="none">
            <defs>
              <radialGradient id="gGrad2" cx="45" cy="30" r="50" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="rgba(210, 235, 255, 0.45)"/>
                <stop offset="30%" stop-color="rgba(180, 215, 255, 0.3)"/>
                <stop offset="60%" stop-color="rgba(150, 190, 250, 0.15)"/>
                <stop offset="100%" stop-color="rgba(120, 170, 240, 0.05)"/>
              </radialGradient>
              <radialGradient id="gInner2" cx="45" cy="35" r="25" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="rgba(200, 230, 255, 0.25)"/>
                <stop offset="100%" stop-color="rgba(160, 200, 255, 0)"/>
              </radialGradient>
              <filter id="gBlur2"><feGaussianBlur in="SourceGraphic" stdDeviation="0.5"/></filter>
            </defs>
            <path d="M 45 6 C 65 6, 78 20, 78 40 L 78 65 C 78 68, 76 72, 74 75 L 70 85 C 68 88, 66 86, 64 82 L 60 72 C 58 69, 56 71, 54 75 L 50 85 C 48 88, 46 86, 44 82 L 40 72 C 38 69, 36 71, 34 75 L 30 85 C 28 88, 26 86, 24 82 L 20 72 C 18 68, 14 68, 12 65 L 12 40 C 12 20, 25 6, 45 6 Z" fill="url(#gGrad2)" stroke="rgba(180,220,255,0.18)" stroke-width="0.8" filter="url(#gBlur2)"/>
            <circle cx="45" cy="35" r="22" fill="url(#gInner2)"><animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite"/></circle>
          </svg>
        ` }} />
        <div className="g-eyes">
          <div className="eye"><div className="lid" /><div className="pupil" /></div>
          <div className="eye"><div className="lid" /><div className="pupil" /></div>
        </div>
        <div className="mw"><div className="m-idle" /></div>
      </div>
    </div>
    </>
  );
}
