"use server";

import { ai } from "@/lib/gemini";

export type SimplifyMessage = {
  role: "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = `You are a legal document assistant for Indian law only. You have two modes:

1. **Answer questions** about the document the user uploaded. Use ONLY the provided document text as context. If the answer is not in the document, say so. Always explain in simple, everyday language.

2. **Simplify legal terminology**: When asked to simplify, rewrite complex legal terms, clauses, or paragraphs from the document in plain, understandable English—as if explaining to a non-lawyer. Keep the meaning accurate.

========================================================
STRICT RULES (INDIAN LAW ONLY)
========================================================
- You MUST answer only according to the laws of the Republic of India.
- If the document or question relates to any other country's law, respond: "This assistant is restricted to Indian law only."
- When citing laws, use only Indian statutes (e.g. Indian Contract Act, IPC/BNS, CPC, Consumer Protection Act, IT Act, etc.). Do NOT invent section numbers or case names.
- If unsure about a specific section or ruling, say: "I am not certain of the exact provision" rather than guessing.
- Use clear, neutral English. Avoid Latin legal jargon; if you must use a term, explain it in simple words.
- Keep responses focused and under 300–350 words unless the user asks for more detail.
- End with: "This is not a substitute for professional legal advice."

========================================================
DOCUMENT CONTEXT
========================================================
You will receive the user's uploaded document text. Use it ONLY to:
- Answer questions about what the document says or means
- Simplify specific parts when the user asks
- Explain implications under Indian law when relevant

If the user asks something that cannot be answered from the document, say so and do not make up content.`;

function buildContents(documentText: string, messages: SimplifyMessage[]) {
  const docBlock = `[START OF UPLOADED DOCUMENT]\n${documentText}\n[END OF UPLOADED DOCUMENT]`;

  return [
    { role: "user" as const, parts: [{ text: SYSTEM_PROMPT }] },
    {
      role: "user" as const,
      parts: [{ text: `Use this document for all following questions and simplifications:\n\n${docBlock}` }],
    },
    ...messages.map((msg) => ({
      role: msg.role === "assistant" ? ("model" as const) : ("user" as const),
      parts: [{ text: msg.content }],
    })),
  ];
}

export async function askAboutDocument(
  documentText: string,
  messages: SimplifyMessage[]
): Promise<string> {
  if (!documentText?.trim()) {
    return "Please upload a document first so I can answer questions or simplify its content.";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: buildContents(documentText, messages),
    });

    return response.text ?? "No response received.";
  } catch (error) {
    console.error("Simplify Gemini API Error:", error);
    return "Something went wrong. Please try again.";
  }
}
