import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nikolai Tennant | LLM Engineer",
  description:
    "LLM Engineer building agentic AI systems. MSc Data Science from Brown University. Published researcher in computational biology.",
  openGraph: {
    title: "Nikolai Tennant | LLM Engineer",
    description: "Building agentic AI systems at NatureAlpha",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">{children}</body>
    </html>
  );
}
