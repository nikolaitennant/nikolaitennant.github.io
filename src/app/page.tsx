"use client";

import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Interactive3D from "@/components/Interactive3D";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Publications from "@/components/Publications";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const GhostPeek = dynamic(() => import("@/components/ghost/GhostPeek"), { ssr: false });

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Interactive3D />
        <Education />
        <Publications />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <GhostPeek />
    </>
  );
}
