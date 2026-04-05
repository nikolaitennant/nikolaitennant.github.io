"use client";

import { useCallback } from "react";
import { personalInfo, experience, education, projects, publication, skills, stats } from "@/data/portfolio";

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

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
    return "Nikolai published a deep learning ageing clock in Nature Scientific Reports — 95% accuracy and 0.99 AUC. The model generalises across all cell types and identified sex-biased ageing mechanisms with in vivo validation.";
  }

  if (q.match(/tech|stack|python|language|tool|framework|pytorch|langchain|faiss|aws/)) {
    return "Python, PyTorch, and LangChain for AI/ML, FAISS for vector search, AWS for cloud. PySpark for big data, TypeScript for frontend.";
  }

  if (q.match(/edu|school|university|brown|degree|gpa|study|graduate/)) {
    return "Brown University — MSc Data Science with a perfect 4.0 GPA, and BA History with a Data Science minor.";
  }

  if (q.match(/rag|scholar|project|build/)) {
    return "RAG Scholar AI is a document Q&A tool with smart citations, built with LangChain and FAISS. Live at ragscholarai.web.app!";
  }

  return "Nikolai is an LLM Engineer at NatureAlpha, building agentic AI systems for sustainable finance — LLM pipelines, RAG systems, and multi-agent workflows. What would you like to know?";
}

function simulatedDelay(): Promise<void> {
  const ms = 600 + Math.random() * 600;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useGhostAI() {
  const sendMessage = useCallback(async (userMessage: string): Promise<string> => {
    if (!OPENAI_API_KEY) {
      await simulatedDelay();
      return matchFallback(userMessage);
    }

    try {
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-5-mini",
          instructions: buildInstructions(),
          input: userMessage,
          max_output_tokens: 300,
        }),
      });

      if (response.status === 429) {
        await new Promise((r) => setTimeout(r, 2000));
        const retry = await fetch("https://api.openai.com/v1/responses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-5-mini",
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
        console.warn("[GhostAI] API error:", response.status);
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
