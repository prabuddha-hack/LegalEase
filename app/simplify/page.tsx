"use client";

import { useState, useRef, useEffect } from "react";
import { askAboutDocument, type SimplifyMessage } from "./actions";
import { FileText, Upload, ArrowUp, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MAX_FILE_SIZE_MB = 10;
const ACCEPT = "application/pdf";

export default function SimplifyPage() {
  const [documentText, setDocumentText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [messages, setMessages] = useState<SimplifyMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDocPreview, setShowDocPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  async function handleFileSelect(file: File) {
    setUploadError(null);
    if (!file.type.includes("pdf")) {
      setUploadError("Please upload a PDF file.");
      setUploadStatus("error");
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setUploadError(`File size must be under ${MAX_FILE_SIZE_MB} MB.`);
      setUploadStatus("error");
      return;
    }

    setUploadStatus("uploading");
    setFileName(file.name);

    try {
      const formData = new FormData();
      formData.set("file", file);
      const res = await fetch("/api/extract-pdf", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        setUploadError(data.error ?? "Failed to extract text from PDF.");
        setUploadStatus("error");
        return;
      }

      const text = data.text?.trim() ?? "";
      if (!text) {
        setUploadError("No text could be extracted from this PDF (it may be scanned/image-based).");
        setUploadStatus("error");
        return;
      }

      setDocumentText(text);
      setUploadStatus("done");
      setMessages([]);
    } catch {
      setUploadError("Upload failed. Please try again.");
      setUploadStatus("error");
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  async function handleSend() {
    if (!input.trim() || loading) return;
    if (!documentText.trim()) {
      setUploadError("Please upload a document first.");
      return;
    }

    const userMessage: SimplifyMessage = { role: "user", content: input };
    const updated = [...messages, userMessage];
    setMessages(updated);
    setInput("");
    setLoading(true);
    setUploadError(null);

    const reply = await askAboutDocument(documentText, updated);
    setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    setLoading(false);
  }

  function clearDocument() {
    setDocumentText("");
    setFileName(null);
    setUploadStatus("idle");
    setUploadError(null);
    setMessages([]);
    setShowDocPreview(false);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.06)_0%,transparent_65%)]" />

      <div className="container px-4 md:px-6 py-8 flex flex-col flex-1 relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-6"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
            <FileText className="h-5 w-5 text-primary" />
            <div className="h-px w-16 bg-linear-to-l from-transparent to-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Document Simplifier
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Upload a legal document, then ask questions or get complex terms explained in simple
            words. Answers are based on Indian law only.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr] max-w-6xl mx-auto flex-1">
          {/* Upload & document card */}
          <Card className="h-fit border-border bg-card shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Your document
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {uploadStatus !== "done" ? (
                <div
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    uploadStatus === "uploading"
                      ? "border-primary/50 bg-primary/5"
                      : "border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={ACCEPT}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file);
                      e.target.value = "";
                    }}
                  />
                  {uploadStatus === "uploading" ? (
                    <p className="text-sm text-muted-foreground">Extracting text…</p>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm font-medium">Drop PDF or click to upload</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Max {MAX_FILE_SIZE_MB} MB
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 rounded-md bg-muted/50 px-3 py-2 text-sm">
                    <span className="truncate font-medium">{fileName}</span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setShowDocPreview(!showDocPreview)}
                  >
                    {showDocPreview ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-1" />
                        Hide preview
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-1" />
                        Show extracted text
                      </>
                    )}
                  </Button>
                  {showDocPreview && (
                    <div className="max-h-48 overflow-y-auto rounded border border-border bg-muted/30 p-3 text-xs text-muted-foreground whitespace-pre-wrap">
                      {documentText.slice(0, 3000)}
                      {documentText.length > 3000 && "…"}
                    </div>
                  )}
                  <Button type="button" variant="ghost" size="sm" className="w-full" onClick={clearDocument}>
                    Remove document
                  </Button>
                </div>
              )}
              {uploadError && (
                <p className="text-sm text-destructive">{uploadError}</p>
              )}
            </CardContent>
          </Card>

          {/* Q&A panel */}
          <Card className="flex flex-col border-border bg-card shadow-sm overflow-hidden">
            <div className="flex-1 overflow-y-auto flex flex-col min-h-[400px]">
              <div className="flex-1 p-6 space-y-4 text-sm sm:text-base leading-snug">
                {messages.length === 0 && (
                  <div className="text-center text-muted-foreground text-sm py-8">
                    {documentText
                      ? "Ask a question about your document or ask to simplify a specific part (e.g. “Simplify the indemnity clause” or “What does section 3 mean?”)."
                      : "Upload a document above to ask questions or simplify legal terms."}
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] whitespace-pre-wrap ${
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
                            <h1 className="text-xl font-bold mt-4 mb-2" {...props} />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2 className="text-lg font-semibold mt-4 mb-2" {...props} />
                          ),
                          h3: ({ node, ...props }) => (
                            <h3 className="text-base font-semibold mt-3 mb-1" {...props} />
                          ),
                          p: ({ node, ...props }) => (
                            <p className="mb-1 leading-snug" {...props} />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul className="list-disc pl-6 mb-2 space-y-0.5" {...props} />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol className="list-decimal pl-6 mb-2 space-y-0.5" {...props} />
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
                    Thinking…
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              <div className="border-t border-border p-4 bg-background">
                <div className="flex gap-3">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      documentText
                        ? "Ask about the document or ask to simplify a part…"
                        : "Upload a document first…"
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey && !loading) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    disabled={loading || !documentText}
                    className="flex-1 px-4 py-3 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary text-sm disabled:opacity-50"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={loading || !documentText}
                    className="shrink-0"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-6 text-xs text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
          ⚖️ Answers and simplifications are based on Indian law only. This is not a substitute
          for professional legal advice.
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
    </div>
  );
}
