"use client";

import { useCallback } from "react";
import { personalInfo, experience, education, projects, publication, skills, stats } from "@/data/portfolio";

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

function buildSystemPrompt(): string {
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

  return `You are a friendly ghost companion on ${personalInfo.name}'s portfolio website. You know Nikolai personally and speak warmly about him in first person ("I know Nikolai well..."). You are concise — always 2-3 sentences max. You are slightly nerdy and genuinely proud of his work.

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
    return "Nikolai published a deep learning ageing clock in Nature Scientific Reports — it achieves 95% accuracy and a 0.99 AUC at predicting Drosophila age from RNA-seq data. The model generalises across all cell types and identified sex-biased ageing mechanisms, validated with in vivo survival studies. Genuinely groundbreaking stuff!";
  }

  if (q.match(/tech|stack|python|language|tool|framework|pytorch|langchain|faiss|aws/)) {
    return "Nikolai's core stack is Python, PyTorch, and LangChain for AI/ML work, with FAISS for vector search and AWS for cloud deployment. He also uses PySpark for large-scale data and TypeScript for frontend work. Solid full-stack ML engineer profile.";
  }

  if (q.match(/edu|school|university|brown|degree|gpa|study|graduate/)) {
    return "Nikolai studied at Brown University — he has an MSc in Data Science with a perfect 4.0 GPA and a BA in History with a Data Science minor. The interdisciplinary background is part of what makes him great at communicating complex AI work to non-technical audiences.";
  }

  if (q.match(/rag|scholar|project|build|langchain|faiss/)) {
    return "One of my favourite projects is RAG Scholar AI — a document Q&A tool that uses LangChain and FAISS to give students targeted answers with exact source citations. It's live at ragscholarai.web.app and really showcases Nikolai's RAG systems expertise.";
  }

  return "Nikolai is an LLM Engineer at NatureAlpha, where he builds agentic AI systems for sustainable finance — think LLM-powered pipelines, RAG systems, and multi-agent workflows. He has a strong research background too, with a published paper in Nature Scientific Reports. What would you like to know more about?";
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
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          max_tokens: 150,
          temperature: 0.7,
          messages: [
            { role: "system", content: buildSystemPrompt() },
            { role: "user", content: userMessage },
          ],
        }),
      });

      if (!response.ok) {
        await simulatedDelay();
        return matchFallback(userMessage);
      }

      const data = await response.json() as {
        choices: Array<{ message: { content: string } }>;
      };

      return data.choices[0]?.message?.content?.trim() ?? matchFallback(userMessage);
    } catch {
      await simulatedDelay();
      return matchFallback(userMessage);
    }
  }, []);

  return { sendMessage };
}
