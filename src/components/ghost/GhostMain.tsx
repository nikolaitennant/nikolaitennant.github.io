"use client";

import React, { useEffect, useRef, useState } from "react";
import { useGhostAI } from "@/hooks/useGhostAI";

export default function GhostMain() {
  const initialized = useRef(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [thinking, setThinking] = useState(false);
  const { sendMessage } = useGhostAI();
  const sendMessageRef = useRef(sendMessage);
  sendMessageRef.current = sendMessage;

  async function handleSend() {
    const text = inputValue.trim();
    if (!text || thinking) return;
    setInputValue("");
    setThinking(true);

    // Show user's message briefly as a thought
    const thought = document.getElementById("thought-main");
    const mw = document.getElementById("mw-main");
    if (mw) mw.innerHTML = '<div class="m-talk"></div>';

    // Show thinking state
    if (thought) {
      thought.classList.remove("long");
      thought.textContent = "hmm, let me think...";
      thought.classList.add("show");
    }

    try {
      const reply = await sendMessageRef.current(text);
      if (thought) {
        thought.textContent = reply;
        if (reply.length > 40) thought.classList.add("long");
        else thought.classList.remove("long");
        thought.classList.add("show");
      }
      if (mw) mw.innerHTML = '<div class="m-happy"></div>';

      // Keep response visible longer for longer text
      const readTime = Math.max(4000, reply.length * 50);
      setTimeout(() => {
        thought?.classList.remove("show");
        if (mw) mw.innerHTML = '<div class="m-idle"></div>';
      }, readTime);
    } catch {
      if (thought) {
        thought.textContent = "sorry, brain fog...";
        thought.classList.add("show");
        setTimeout(() => thought.classList.remove("show"), 3000);
      }
      if (mw) mw.innerHTML = '<div class="m-idle"></div>';
    } finally {
      setThinking(false);
    }
  }

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const gw = document.getElementById("gw-main")!;
    const gh = document.getElementById("gh-main")!;
    const mw = document.getElementById("mw-main")!;
    const pL = document.getElementById("pL-main")!;
    const pR = document.getElementById("pR-main")!;
    const thought = document.getElementById("thought-main")!;

    if (!gw || !gh || !mw || !pL || !pR || !thought) return;

    let conversing = false;
    let mx = 0, my = 0;
    let cursorNear = false;
    let cursorGreeted = false;
    const section = gw.parentElement!;
    let gx = section.offsetWidth * 0.65, gy = section.offsetHeight * 0.4;
    let vx = 0, vy = 0, time = 0;
    let thoughtTimer: ReturnType<typeof setTimeout> | null = null;
    let idleTimeout: ReturnType<typeof setTimeout> | null = null;

    const thoughts = [
      "ooh someone's visiting!",
      "click me, I don't bite",
      "that Nature paper was wild",
      "wonder what they'll ask me",
      "Brown was a good time",
      "should I say hi?",
      "his code is pretty cool",
      "RAG Scholar AI is neat",
      "£829K in value... not bad",
      "0.99 AUC, just saying",
      "I know things, ask me!",
      "LLMs are my jam",
      "psst... click me",
    ];

    document.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });

    function noise(t: number, seed: number): number {
      return Math.sin(t * 0.7 + seed) * 0.5 + Math.sin(t * 1.3 + seed * 2.1) * 0.3 + Math.sin(t * 2.1 + seed * 0.7) * 0.2;
    }

    function setMouth(t: string) {
      const c: Record<string, string> = { idle: "m-idle", happy: "m-happy", talk: "m-talk", ooh: "m-ooh" };
      mw.innerHTML = `<div class="${c[t] || c.idle}"></div>`;
    }

    // ===== MOVEMENT =====
    function moveLoop() {
      time += 0.006;
      const sp = conversing ? 0.15 : 1.0;
      const sw = section.offsetWidth;
      const sh = section.offsetHeight;

      const wx = noise(time, 1.0) * sw * 0.2 * sp;
      const wy = noise(time * 0.7, 5.0) * sh * 0.3 * sp;
      const bx = sw * 0.65 + wx;
      const by = sh * 0.45 + wy;

      const sRect = section.getBoundingClientRect();
      const relMx = mx - sRect.left;
      const relMy = my - sRect.top;

      const dx = relMx - gx, dy = relMy - gy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const att = conversing ? 0 : Math.min(0.0003, 12 / (dist + 200));

      vx += (bx - gx) * 0.003 * sp + dx * att;
      vy += (by - gy) * 0.003 * sp + dy * att;
      vx *= 0.97;
      vy *= 0.97;

      if (!conversing && Math.random() < 0.002) {
        vx += (Math.random() - 0.5) * 2.5;
        vy += (Math.random() - 0.5) * 2;
      }

      gx += vx;
      gy += vy;

      const leftBound = sw * 0.35;
      if (gx < leftBound) { gx = leftBound; vx = Math.abs(vx) * 0.4; }
      if (gx > sw - 160) { gx = sw - 160; vx = -Math.abs(vx) * 0.4; }
      if (gy < 30) { gy = 30; vy = Math.abs(vy) * 0.4; }
      if (gy > sh - 180) { gy = sh - 180; vy = -Math.abs(vy) * 0.4; }

      gw.style.left = gx + "px";
      gw.style.top = gy + "px";

      const tilt = Math.max(-10, Math.min(10, vx * 2.5));
      gh.style.transform = `rotate(${tilt}deg)`;

      const speed = Math.sqrt(vx * vx + vy * vy);
      if (speed > 1.5 && !conversing) gh.classList.add("squint");
      else gh.classList.remove("squint");

      // ===== CURSOR PROXIMITY =====
      const ghostScreenX = sRect.left + gx + 65;
      const ghostScreenY = sRect.top + gy + 75;
      const cursorDist = Math.sqrt(Math.pow(mx - ghostScreenX, 2) + Math.pow(my - ghostScreenY, 2));

      if (cursorDist < 150 && !cursorNear && !conversing) {
        cursorNear = true;
        if (!cursorGreeted) {
          cursorGreeted = true;
          stopThoughts();
          setMouth("happy");
          thought.textContent = "oh, hey there!";
          thought.classList.add("show");
          setTimeout(() => {
            thought.classList.remove("show");
            setMouth("idle");
            thought.textContent = "click me to chat!";
            thought.classList.add("show");
            setTimeout(() => {
              thought.classList.remove("show");
              if (!conversing) startThoughts();
            }, 2500);
          }, 2000);
        }
      } else if (cursorDist > 250) {
        cursorNear = false;
      }

      requestAnimationFrame(moveLoop);
    }
    requestAnimationFrame(moveLoop);

    // ===== EYES =====
    function eyeLoop() {
      const rect = gw.getBoundingClientRect();
      const cx = rect.left + 65, cy = rect.top + 45;
      const dx = mx - cx, dy = my - cy;
      const d = Math.sqrt(dx * dx + dy * dy);
      let sx = (dx / Math.max(d, 60)) * 2.8;
      let sy = (dy / Math.max(d, 60)) * 2.8;
      if (d > 300) {
        sx += noise(time * 2.5, 10) * 2;
        sy += noise(time * 2.5, 20) * 1.5;
      }
      pL.style.transform = `translate(${sx}px, ${sy}px)`;
      pR.style.transform = `translate(${sx}px, ${sy}px)`;
      requestAnimationFrame(eyeLoop);
    }
    requestAnimationFrame(eyeLoop);

    // ===== BLINK =====
    function blink() {
      gh.classList.add("blink");
      setTimeout(() => {
        gh.classList.remove("blink");
        if (Math.random() < 0.25) {
          setTimeout(() => { gh.classList.add("blink"); setTimeout(() => gh.classList.remove("blink"), 90); }, 180);
        }
      }, 110);
      setTimeout(blink, 2000 + Math.random() * 4500);
    }
    setTimeout(blink, 1200);

    // ===== THOUGHTS =====
    let generatedThoughts = [...thoughts];
    let thoughtIdx = 0;

    (async function loadThoughts() {
      try {
        const reply = await sendMessageRef.current(
          "Generate 10 short idle thoughts (3-6 words each) as Nikolai's AI assistant on his portfolio site. Mix of: curious about the visitor, proud of his work, playful, inviting them to chat. One per line. No numbering, no quotes."
        );
        const lines = reply.split("\n").map((l: string) => l.trim()).filter((l: string) => l.length > 0 && l.length < 45);
        if (lines.length >= 3) generatedThoughts = lines;
      } catch { /* keep defaults */ }
    })();

    function startThoughts() {
      stopThoughts();
      function show() {
        if (conversing) return;
        thought.classList.remove("long");
        thought.textContent = generatedThoughts[thoughtIdx++ % generatedThoughts.length];
        thought.classList.add("show");
        setMouth("ooh");
        thoughtTimer = setTimeout(() => {
          thought.classList.remove("show");
          setMouth("idle");
          thoughtTimer = setTimeout(show, 3000 + Math.random() * 4000);
        }, 3500);
      }
      thoughtTimer = setTimeout(show, 2000 + Math.random() * 2000);
    }

    function stopThoughts() {
      if (thoughtTimer) clearTimeout(thoughtTimer);
      thought.classList.remove("show");
    }

    // ===== INTRO =====
    let introShown = false;
    function showIntro() {
      if (introShown) return;
      introShown = true;
      setMouth("happy");
      setTimeout(() => {
        thought.textContent = "Hi! I\u2019m Nikolai\u2019s AI";
        thought.classList.add("show");
        setTimeout(() => {
          thought.classList.remove("show");
          setTimeout(() => {
            thought.textContent = "click me to chat!";
            thought.classList.add("show");
            setMouth("idle");
            setTimeout(() => { thought.classList.remove("show"); startThoughts(); }, 3000);
          }, 600);
        }, 2500);
      }, 1500);
    }

    // ===== CLICK → START CONVERSATION =====
    gh.addEventListener("click", () => {
      if (conversing) {
        // Already conversing — toggle input off
        conversing = false;
        setInputVisible(false);
        if (idleTimeout) clearTimeout(idleTimeout);
        setTimeout(() => startThoughts(), 2000);
        return;
      }

      conversing = true;
      stopThoughts();
      setMouth("happy");

      // Ghost greets
      thought.textContent = "what would you like to know?";
      thought.classList.add("show");

      // Show input after a beat
      setTimeout(() => {
        setInputVisible(true);
      }, 800);

      // Auto-close conversation after 30s of no input
      if (idleTimeout) clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        if (conversing) {
          conversing = false;
          setInputVisible(false);
          thought.classList.remove("show");
          setMouth("idle");
          setTimeout(() => startThoughts(), 2000);
        }
      }, 30000);
    });

    // Expose conversing state for input handler
    (window as unknown as Record<string, unknown>).__ghostResetIdle = () => {
      if (idleTimeout) clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        if (conversing) {
          conversing = false;
          setInputVisible(false);
          thought.classList.remove("show");
          const mwEl = document.getElementById("mw-main");
          if (mwEl) mwEl.innerHTML = '<div class="m-idle"></div>';
          setTimeout(() => startThoughts(), 2000);
        }
      }, 30000);
    };

    showIntro();
  }, []);

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSend();
      // Reset idle timeout
      const resetIdle = (window as unknown as Record<string, unknown>).__ghostResetIdle as (() => void) | undefined;
      if (resetIdle) resetIdle();
    }
    if (e.key === "Escape") {
      setInputVisible(false);
    }
  }

  return (
    <>
      <div className="gw-main" id="gw-main">
        <div className="ghost" id="gh-main">
          <div className="g-glow" />
          <div className="g-shape" dangerouslySetInnerHTML={{ __html: `
            <svg viewBox="0 0 90 105" fill="none">
              <defs>
                <radialGradient id="gGrad" cx="45" cy="30" r="50" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="rgba(220, 240, 255, 0.6)"/>
                  <stop offset="25%" stop-color="rgba(195, 225, 255, 0.4)"/>
                  <stop offset="50%" stop-color="rgba(170, 205, 250, 0.25)"/>
                  <stop offset="75%" stop-color="rgba(145, 185, 245, 0.12)"/>
                  <stop offset="100%" stop-color="rgba(120, 170, 240, 0.05)"/>
                </radialGradient>
                <radialGradient id="gInner" cx="45" cy="35" r="25" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="rgba(210, 235, 255, 0.35)"/>
                  <stop offset="100%" stop-color="rgba(160, 200, 255, 0)"/>
                </radialGradient>
                <filter id="gBlur"><feGaussianBlur in="SourceGraphic" stdDeviation="0.4"/></filter>
              </defs>
              <path d="M 45 6 C 65 6, 78 20, 78 40 L 78 65 C 78 68, 76 72, 74 75 L 70 85 C 68 88, 66 86, 64 82 L 60 72 C 58 69, 56 71, 54 75 L 50 85 C 48 88, 46 86, 44 82 L 40 72 C 38 69, 36 71, 34 75 L 30 85 C 28 88, 26 86, 24 82 L 20 72 C 18 68, 14 68, 12 65 L 12 40 C 12 20, 25 6, 45 6 Z" fill="url(#gGrad)" stroke="rgba(190,225,255,0.25)" stroke-width="0.8" filter="url(#gBlur)"/>
              <circle cx="45" cy="35" r="22" fill="url(#gInner)"><animate attributeName="r" values="22;24;22" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/></circle>
            </svg>
          ` }} />
          <div className="g-eyes">
            <div className="eye"><div className="lid" /><div className="pupil" id="pL-main" /></div>
            <div className="eye"><div className="lid" /><div className="pupil" id="pR-main" /></div>
          </div>
          <div className="mw" id="mw-main"><div className="m-idle" /></div>
          <div className="sparkles">
            <div className="spark s1" />
            <div className="spark s2" />
            <div className="spark s3" />
          </div>
        </div>

        {/* Thought bubble */}
        <div className="thought" id="thought-main" />

        {/* Floating input — appears when conversing */}
        {inputVisible && (
          <div className="ghost-input-wrap">
            <input
              className="ghost-input"
              type="text"
              placeholder="ask me anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={onInputKeyDown}
              autoFocus
              disabled={thinking}
            />
            {thinking && (
              <div className="ghost-input-dots">
                <span /><span /><span />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
