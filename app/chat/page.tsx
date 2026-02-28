"use client";

import { useState, useRef, useEffect } from "react";
import { sendMessage } from "./actions";
import { Scale, ArrowUp } from "lucide-react";
import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (!loading) {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    const updated = [...messages, userMessage];

    setMessages(updated);
    setInput("");
    setLoading(true);

    const reply = await sendMessage(updated);

    const assistantMessage: Message = {
      role: "assistant",
      content: reply,
    };

    setMessages([...updated, assistantMessage]);
    setLoading(false);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.06)_0%,transparent_65%)]" />

      <div className="container px-4 md:px-6 py-12 flex flex-col flex-1 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-8"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
            <Scale className="h-5 w-5 text-primary" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            AI Legal Assistant
          </h1>

          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Ask questions about Indian law and receive structured,
            easy-to-understand legal guidance.
          </p>
        </motion.div>

        {/* Chat Panel */}
        <div className="relative flex-1 flex flex-col border border-border rounded bg-card shadow-[0_20px_60px_hsl(0_0%_0%/0.25)] overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4 text-sm sm:text-base leading-snug">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm">
                Start by asking about tenancy laws, IPC sections, consumer
                disputes, IT Act, etc.
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] whitespace-pre-wrap ${
                  msg.role === "user" ? "ml-auto text-right" : "mr-auto"
                }`}
              >
                <div
                  className={`px-5 py-3 rounded border ${
                    msg.role === "user"
                      ? "bg-primary/10 border-primary/30"
                      : "bg-muted border-border"
                  }`}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1
                          className="text-xl font-bold mt-4 mb-2"
                          {...props}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          className="text-lg font-semibold mt-4 mb-2"
                          {...props}
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3
                          className="text-base font-semibold mt-3 mb-1"
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="mb-1 leading-snug" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          className="list-disc pl-6 mb-2 space-y-0.5"
                          {...props}
                        />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol
                          className="list-decimal pl-6 mb-2 space-y-0.5"
                          {...props}
                        />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong className="font-semibold" {...props} />
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-muted-foreground text-sm animate-pulse">
                Thinking...
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 bg-background">
            <div className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Indian law..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loading) {
                    handleSend();
                  }
                }}
                disabled={loading}
                className="flex-1 px-4 py-3 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary text-sm"
              />

              <button
                onClick={handleSend}
                disabled={loading}
                className="inline-flex items-center justify-center px-5 py-3 rounded 
bg-gradient-to-r from-primary via-primary/70 to-primary/90 
text-primary-foreground font-semibold text-xs tracking-widest uppercase
hover:shadow-[0_4px_24px_hsl(var(--primary)/0.4)]
transition-all disabled:opacity-50"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-xs text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
          ⚖️ This AI provides general legal information based on Indian laws. It
          is not a substitute for professional legal advice.
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
    </div>
  );
}
