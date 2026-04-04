# Ghost AI Companion + Site Improvements

## Overview

Replace the Spline robot in the Interactive3D/About section with an LLM-powered ghost AI companion that roams the portfolio site, and add a dedicated Education section. Clean up unused code and dependencies.

---

## 1. Ghost Character

**Visual**: Translucent, friendly ghost spirit rendered as SVG (CSS mockup phase) with eventual Spline 3D upgrade path. Seamless body+tail as a single SVG path. Soft glow halo, sparkle particle trail, luminous eyes.

**Movement**: Noise-driven organic wandering. Not cursor-following. Slight cursor gravity (~10% pull) but autonomous. Variable speed with occasional bursts. Body tilts and stretches based on velocity direction. Squints when moving fast.

**Face**: Eyes loosely track cursor with soft lag. Random blinking (2-5s intervals, occasional double blink). Eye wander when cursor is far. Mouth expressions: idle, happy, talking, curious ("ooh").

## 2. Behavior Model

| Section | Ghost State |
|---------|------------|
| Hero | Not visible |
| About | Home -- roams freely, shows intro greeting then periodic thought bubbles |
| Education+ | Hidden -- peeks from edges with contextual messages |

**About section (home)**:
- Ghost drifts organically across the section
- First visit: intro sequence -- "Hi! I'm Nikolai's AI" then "Click me to chat!"
- After intro: periodic thought bubbles from personality-driven pool
- Click ghost to open chat

**Other sections (peek)**:
- Ghost fades out when scrolling past About
- After 1-2s on a new section, ghost peeks from left or right edge
- Peek ghost: smaller (65px), upright, half off-screen
- Shows contextual message in frosted glass pill (no border)
- Stays visible for 6 seconds, then slides back
- Cycles through 3 section-specific messages per section
- Click peek ghost: main ghost teleports to peek position, chat opens
- Close chat outside About: ghost fades instantly

**Chat open state**:
- Ghost keeps drifting but slower (15% speed)
- No cursor gravity when chatting
- Chat bubble follows ghost position smoothly

## 3. Chat Interface

Minimal design -- no header, no avatar, no status, no send button.

- Tiny X close button (top-right)
- Messages: AI in gray text (left-aligned), user in lighter text (right-aligned). No bubbles/borders around messages -- just text
- Thinking state: three animated dots before AI response
- Suggestion chips: "What does he do?", "Research", "Tech stack", "Education" -- hide after first question
- Input: borderless text field at bottom, Enter to send, placeholder "Ask anything..."
- Width: 360px
- Positioning: always on opposite side of screen from ghost, never overlaps ghost or page content

## 4. LLM Integration

- **API**: OpenAI, called directly from browser with user's API key
- **System prompt**: Contains all data from `src/data/portfolio.ts` -- experience, education, projects, publication, skills, stats
- **Personality**: Friendly, slightly nerdy, proud of Nikolai's work, occasionally makes jokes. First-person perspective as Nikolai's AI
- **Context**: System prompt includes which section the user is currently viewing
- **API key**: Stored in environment variable `NEXT_PUBLIC_OPENAI_API_KEY`, loaded at build time
- **Fallback**: If no API key or API fails, use pre-written responses for common questions (already prototyped in mockups)

## 5. Education Section (new)

Position: between About and Publications in page order.

Two cards side-by-side:
- MSc Data Science (4.0 GPA, 2022-2023) -- ML, NLP, Deep Learning, Statistics
- BA History with Data Science minor (3.6 GPA, 2018-2022) -- Research, Computational Methods

Each card: school label, degree title, date range, GPA badge, short description, course/topic tags.

## 6. Performance Cleanup

**Delete unused components** (~500 lines):
- `src/components/Dock.tsx`
- `src/components/ui/bento-tilt.tsx`
- `src/components/ui/border-beam.tsx`
- `src/components/ui/container-scroll.tsx`
- `src/components/ui/particle-text.tsx`
- `src/components/ui/stagger-text.tsx`
- `src/components/ui/wavy-background.tsx`

**Remove unused dependencies**:
- `gsap` (not imported anywhere)
- `motion` (redundant with `framer-motion`)

**Evaluate removing**:
- `three`, `@react-three/fiber`, `@react-three/drei` -- only used for Spline. If Spline React component works standalone, remove these.

**Fix**:
- Compress favicons (currently 6MB total, should be <100KB)
- Fix resume link in Nav (points to `/resume.pdf`, file is `resume.jpg`)
- Fix stale date in portfolio data: Singh Lab "2022 - Present" should be "2022 - 2023"

## 7. Data Fixes (`src/data/portfolio.ts`)

- Singh Lab period: "2022 - Present" → "2022 - 2023"
- Verify all dates are current

## 8. File Changes Summary

| Action | File |
|--------|------|
| New | `src/components/GhostCompanion.tsx` -- ghost character, movement, eyes, expressions |
| New | `src/components/GhostChat.tsx` -- minimal chat UI |
| New | `src/components/GhostPeek.tsx` -- peek behavior from edges |
| New | `src/hooks/useGhostMovement.ts` -- noise-based organic movement logic |
| New | `src/hooks/useGhostAI.ts` -- OpenAI API integration, personality system prompt |
| New | `src/components/Education.tsx` -- dedicated education section |
| Modify | `src/app/page.tsx` -- add Education, replace Interactive3D usage with GhostCompanion |
| Modify | `src/components/Interactive3D.tsx` -- remove Spline robot, integrate ghost |
| Modify | `src/data/portfolio.ts` -- fix dates |
| Modify | `src/components/Nav.tsx` -- fix resume link |
| Delete | 7 unused component files |
| Delete | `gsap`, `motion` from package.json |

## 9. Mobile

- Ghost appears smaller on mobile (60px)
- Peek behavior same but from bottom edge on mobile (sides too narrow)
- Chat opens as bottom sheet on mobile instead of floating panel
- Touch to open chat (no hover states)
- Reduced movement speed/range on mobile for performance

## 10. Accessibility

- `prefers-reduced-motion`: disable ghost movement, show static ghost with click-to-chat
- Ghost has `role="button"` and `aria-label="Chat with Nikolai's AI assistant"`
- Chat input has proper label
- Focus trap when chat is open
- Escape key closes chat
