"use client";

import { useCallback } from "react";
import { personalInfo, experience, education, projects, publication, skills, stats } from "@/data/portfolio";

const PROXY_URL = process.env.NEXT_PUBLIC_GHOST_PROXY_URL || "";

function buildInstructions(): string {
  const skillsList = Object.entries(skills)
    .map(([cat, items]) => `${cat}: ${items.join(", ")}`)
    .join("; ");

  const experienceList = experience
    .map((e) => `${e.title} at ${e.company} (${e.period}): ${e.description}`)
    .join(" | ");

  const educationList = education
    .map((e) => `${e.degree} from ${e.school}, GPA ${e.gpa} (${e.period})`)
    .join("; ");

  const projectList = projects
    .map((p) => `${p.title}: ${p.description} [${p.technologies.join(", ")}]`)
    .join(" | ");

  const statsList = stats.map((s) => `${s.value} ${s.label}`).join(", ");

  return `You are a friendly AI companion on ${personalInfo.name}'s portfolio website. You know Nikolai personally and speak warmly about him. You are concise — always 2-3 sentences max. You are slightly nerdy and genuinely proud of his work.

About Nikolai:
- Role: ${personalInfo.title} — ${personalInfo.subtitle}
- Location: ${personalInfo.location}
- Bio: ${personalInfo.bio}

Experience: ${experienceList}

Education: ${educationList}

Key projects: ${projectList}

Publication: "${publication.title}" in ${publication.journal} (${publication.status}). ${publication.description} Key findings: ${publication.keyFindings.join("; ")}.

Skills: ${skillsList}

Notable stats: ${statsList}

Answer questions about Nikolai's background, skills, projects, and research. If asked something unrelated, gently steer the conversation back to his portfolio. Keep every reply to 2-3 sentences.`;
}

function matchFallback(query: string): string {
  const q = query.toLowerCase();

  if (q.match(/research|paper|nature|publication|timeflies|ageing|clock|drosophila/)) {
    return "He published a deep learning ageing clock in Nature Scientific Reports — 95% accuracy and 0.99 AUC! The model works across all cell types and even found sex-biased ageing mechanisms.";
  }

  if (q.match(/tech|stack|python|language|tool|framework|pytorch|langchain|faiss|aws/)) {
    return "His go-to stack is Python, PyTorch, and LangChain for AI/ML, with FAISS for vector search and AWS for cloud infrastructure. He also does TypeScript on the frontend!";
  }

  if (q.match(/edu|school|university|brown|degree|gpa|study|graduate/)) {
    return "He went to Brown University — got an MSc in Data Science with a perfect 4.0 GPA, plus a BA in History with a Data Science minor. Pretty impressive combo!";
  }

  if (q.match(/rag|scholar|project|build/)) {
    return "RAG Scholar AI is one of his coolest projects — it's a document Q&A tool with smart citations, built with LangChain and FAISS. You can try it at ragscholarai.web.app!";
  }

  if (q.match(/who|about|tell me|what does|what do|introduce|background/)) {
    return "He's an LLM Engineer at NatureAlpha, building agentic AI for sustainable finance. Think LLM pipelines, RAG systems, and multi-agent workflows — the fun stuff!";
  }

  if (q.match(/job|work|company|naturealpha|nature alpha|career|role|position/)) {
    return "He works at NatureAlpha as an LLM Engineer, building AI systems that help with sustainable finance decisions. He's also built out their NLP pipelines and data infrastructure.";
  }

  if (q.match(/skill|good at|capable|strength|best|expert/)) {
    return "He's strongest in ML engineering — PyTorch, LLMs, RAG systems. But he's also solid in data engineering with PySpark, cloud infra on AWS, and full-stack dev with React/TypeScript.";
  }

  if (q.match(/contact|reach|email|hire|connect|linkedin/)) {
    return "You can connect with him on LinkedIn or check out his GitHub — links are in the header! He's always up for interesting conversations about AI.";
  }

  if (q.match(/hi|hey|hello|sup|yo|what'?s up|how are/)) {
    const greetings = [
      "Hey! Welcome to the portfolio — ask me anything about his work, research, or projects!",
      "Hi there! I know a lot about what he's built — fire away with any questions!",
      "Hey! Good to chat. Curious about his research, skills, or experience? Just ask!",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  if (q.match(/experience|year|senior|junior|how long/)) {
    return "He's been building ML systems professionally since his time at Brown. At NatureAlpha, he's the lead LLM engineer — built their AI pipelines from the ground up and generated £829K in value.";
  }

  if (q.match(/you|ghost|this|what are|who are/)) {
    return "I'm his little AI companion! I live on this portfolio and know a bunch about his work. Ask me about his projects, research, tech stack — anything!";
  }

  const fallbacks = [
    "Hmm, I'm not sure about that one — but I can tell you about his research, projects, skills, or experience! What interests you?",
    "That's a bit outside my knowledge! I'm best at chatting about his work — try asking about his projects, tech stack, or that Nature paper!",
    "Good question! I'm mostly an expert on his portfolio though. Want to know about his AI work, education, or research?",
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

function simulatedDelay(): Promise<void> {
  const ms = 600 + Math.random() * 600;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useGhostAI() {
  const sendMessage = useCallback(async (userMessage: string): Promise<string> => {
    if (!PROXY_URL) {
      await simulatedDelay();
      return matchFallback(userMessage);
    }

    try {
      const response = await fetch(`${PROXY_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instructions: buildInstructions(),
          input: userMessage,
          max_output_tokens: 300,
        }),
      });

      if (response.status === 429) {
        await new Promise((r) => setTimeout(r, 2000));
        const retry = await fetch(`${PROXY_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            instructions: buildInstructions(),
            input: userMessage,
            max_output_tokens: 300,
          }),
        });
        if (retry.ok) {
          const retryData = await retry.json() as { output_text: string };
          return retryData.output_text?.trim() ?? matchFallback(userMessage);
        }
      }

      if (!response.ok) {
        console.warn("[GhostAI] proxy error:", response.status);
        await simulatedDelay();
        return matchFallback(userMessage);
      }

      const data = await response.json() as { output_text: string };
      return data.output_text?.trim() ?? matchFallback(userMessage);
    } catch (err) {
      console.warn("[GhostAI] fetch error:", err);
      await simulatedDelay();
      return matchFallback(userMessage);
    }
  }, []);

  return { sendMessage };
}
