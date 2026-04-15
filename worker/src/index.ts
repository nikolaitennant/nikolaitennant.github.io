interface Env {
  OPENAI_API_KEY: string;
}

const ALLOWED_ORIGINS = [
  "https://nikolaitennant.github.io",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
];

function corsHeaders(origin: string): Record<string, string> {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") || "";
    const headers = corsHeaders(origin);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers });
    }

    const url = new URL(request.url);
    if (url.pathname !== "/api/chat") {
      return new Response("Not found", { status: 404, headers });
    }

    // Validate origin
    if (!ALLOWED_ORIGINS.includes(origin)) {
      return new Response("Forbidden", { status: 403, headers });
    }

    try {
      const body = await request.json() as {
        instructions?: string;
        input?: string;
        max_output_tokens?: number;
      };

      // Proxy to OpenAI Responses API
      const openaiRes = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-5-mini",
          instructions: body.instructions || "",
          input: body.input || "",
          max_output_tokens: body.max_output_tokens || 300,
        }),
      });

      const data = await openaiRes.json();

      if (!openaiRes.ok) {
        return new Response(JSON.stringify(data), {
          status: openaiRes.status,
          headers: { ...headers, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "Proxy error" }), {
        status: 500,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }
  },
};
