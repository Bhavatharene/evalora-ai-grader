import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { content, rubric, action } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let systemPrompt = "";
    let userPrompt = "";

    if (action === "grade") {
      systemPrompt = `You are an expert academic grader. Grade the submission against the provided rubric. Return a JSON object with:
- score (0-100)
- feedback: array of { criterion: string, score: number, maxScore: number, comment: string }
- strengths: string[]
- improvements: string[]
- overallComment: string
- confidence: number (0-100, your confidence in this grade)`;
      userPrompt = `Rubric: ${JSON.stringify(rubric)}\n\nSubmission:\n${content}`;
    } else if (action === "generate_assignment") {
      systemPrompt = `You are an expert academic content creator. Based on the syllabus topics provided, generate an assignment. Return JSON with:
- title: string
- description: string
- rubric: array of { criterion: string, weight: number, description: string }
- difficulty: "easy" | "medium" | "hard"
- estimatedTime: string`;
      userPrompt = `Topics: ${content}`;
    } else if (action === "detect_plagiarism") {
      systemPrompt = `You are a plagiarism detection expert. Analyze the following submissions for similarity. Return JSON with:
- similarityScore: number (0-100)
- flaggedSections: array of { text: string, reason: string }
- verdict: "clean" | "suspicious" | "likely_plagiarized"`;
      userPrompt = content;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "return_result",
              description: "Return the structured result",
              parameters: {
                type: "object",
                properties: {
                  result: { type: "object" },
                },
                required: ["result"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "return_result" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI processing failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    let result;

    if (toolCall?.function?.arguments) {
      const parsed = JSON.parse(toolCall.function.arguments);
      result = parsed.result;
    } else {
      // Fallback: try to parse the message content as JSON
      const content = data.choices?.[0]?.message?.content || "{}";
      try {
        result = JSON.parse(content);
      } catch {
        result = { raw: content };
      }
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-grade error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
