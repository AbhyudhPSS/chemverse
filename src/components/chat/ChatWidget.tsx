import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, BookOpen, MessageCircle, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Source {
  title: string;
  href: string;
}

interface Message {
  role: "user" | "model";
  text: string;
  sources?: Source[];
  error?: boolean;
  /** The assistant could not answer; sources point at the verified notes. */
  unavailable?: boolean;
  /** Quoted word-for-word from the notes, not generated. */
  verbatim?: boolean;
  /** Served from the answer cache. */
  cached?: boolean;
}

const SUGGESTIONS = [
  "What is a displacement reaction?",
  "Why does tooth decay start below pH 5.5?",
  "How is bleaching powder made?",
];

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [busy, setBusy] = useState(false);
  const [retrying, setRetrying] = useState(0);
  const [lastQuestion, setLastQuestion] = useState("");

  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  // Escape closes the panel, as with any dialog.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const ask = async (question: string) => {
    const q = question.trim();
    if (!q || busy) return;

    const history = messages.filter((m) => !m.error).map((m) => ({ role: m.role, text: m.text }));
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setBusy(true);
    setLastQuestion(q);

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    // Gemini's free tier returns 503 during demand spikes. Those pass in
    // seconds, so retry quietly rather than making the student ask again.
    const MAX_TRIES = 3;
    let lastError = "Something went wrong.";
    let lastSources: Source[] = [];
    let lastUnavailable = false;

    try {
      for (let attempt = 1; attempt <= MAX_TRIES; attempt += 1) {
        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ question: q, history }),
          });
          const data = await res.json();

          if (res.ok) {
            setMessages((m) => [
              ...m,
              {
                role: "model",
                text: data.answer,
                sources: data.sources,
                unavailable: data.unavailable,
                verbatim: data.verbatim,
                cached: data.cached,
              },
            ]);
            setRetrying(0);
            return;
          }

          lastError = data.error ?? "Something went wrong.";
          lastSources = Array.isArray(data.sources) ? data.sources : [];
          lastUnavailable = Boolean(data.unavailable);

          if (res.status === 503 && attempt < MAX_TRIES) {
            setRetrying(attempt);
            await sleep(2500 * attempt);
            continue;
          }
          break;
        } catch {
          lastError = "Could not reach the assistant. Check your connection.";
          if (attempt < MAX_TRIES) {
            setRetrying(attempt);
            await sleep(2000 * attempt);
            continue;
          }
          break;
        }
      }

      setMessages((m) => [
        ...m,
        { role: "model", text: lastError, error: true, sources: lastSources, unavailable: lastUnavailable },
      ]);
    } finally {
      setBusy(false);
      setRetrying(0);
    }
  };

  /** Re-send the last question after a failure. */
  const retryLast = () => {
    if (!lastQuestion || busy) return;
    // Drop the failed reply so the log does not fill with error bubbles.
    setMessages((m) => {
      const trimmed = [...m];
      if (trimmed.at(-1)?.error) trimmed.pop();
      if (trimmed.at(-1)?.role === "user") trimmed.pop();
      return trimmed;
    });
    ask(lastQuestion);
  };

  return (
    <>
      {/* Launcher */}
      <Button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="chem-assistant"
        className={cn(
          "fixed bottom-5 right-5 z-50 h-12 rounded-full pl-4 pr-5 shadow-md",
          open && "hidden",
        )}
      >
        <MessageCircle aria-hidden="true" className="h-4 w-4" />
        Ask about this
      </Button>

      {/* Panel */}
      {open && (
        <div
          id="chem-assistant"
          role="dialog"
          aria-label="ChemVerse study assistant"
          className="glass-panel fixed bottom-5 right-5 z-50 flex h-[32rem] w-[calc(100vw-2.5rem)] max-w-[24rem] flex-col rounded-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <Sparkles aria-hidden="true" className="h-4 w-4 text-cobalt" />
              <div>
                <p className="text-sm font-semibold text-foreground">Study assistant</p>
                <p className="text-[0.6875rem] text-muted-foreground">
                  Answers from this site's notes — always check the chapter
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setOpen(false)} aria-label="Close assistant">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Log */}
          <div ref={logRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.length === 0 && (
              <div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Ask about anything in the Class 10 chapters, the AP lessons, the reaction bench or
                  the periodic table. I'll only answer from what's on this site.
                </p>
                <div className="mt-4 space-y-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => ask(s)}
                      className="block w-full rounded-md border border-border px-3 py-2 text-left text-[0.8125rem] text-muted-foreground transition-colors hover:border-foreground/25 hover:text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={cn(m.role === "user" && "flex justify-end")}>
                <div
                  className={cn(
                    "max-w-[92%] rounded-lg px-3 py-2 text-[0.8125rem] leading-relaxed",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : m.error
                        ? "border border-crimson/40 bg-crimson/10 text-foreground"
                        : "border border-border bg-card/70 text-foreground/90",
                  )}
                >
                  {m.text}

                  {m.verbatim && (
                    <p className="mt-2 flex items-start gap-1.5 border-t border-border pt-2 text-[0.6875rem] leading-snug text-muted-foreground">
                      <BookOpen aria-hidden="true" className="mt-px h-3 w-3 shrink-0" />
                      Straight from the notes, word for word.
                    </p>
                  )}

                  {m.unavailable && m.sources && m.sources.length > 0 && (
                    <p className="mt-2 flex items-start gap-1.5 border-t border-border pt-2 text-[0.6875rem] leading-snug text-muted-foreground">
                      <BookOpen aria-hidden="true" className="mt-px h-3 w-3 shrink-0" />
                      Rather than risk a wrong answer, here are the verified notes that cover it.
                    </p>
                  )}

                  {m.error && i === messages.length - 1 && !busy && (
                    <button
                      type="button"
                      onClick={retryLast}
                      className="mt-2 block text-[0.75rem] font-medium text-primary underline-offset-2 hover:underline"
                    >
                      Try again
                    </button>
                  )}

                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-2.5 border-t border-border pt-2">
                      <p className="eyebrow mb-1">From</p>
                      <ul className="space-y-0.5">
                        {m.sources.map((s) => (
                          <li key={s.href + s.title}>
                            <Link
                              to={s.href}
                              onClick={() => setOpen(false)}
                              className="text-[0.75rem] text-primary underline-offset-2 hover:underline"
                            >
                              {s.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {busy && (
              <p className="flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground">
                {retrying > 0 ? `Gemini is busy — retrying (${retrying}/2)` : "Thinking"}
                <span className="inline-flex gap-0.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1 w-1 animate-pulse rounded-full bg-muted-foreground"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </span>
              </p>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="border-t border-border p-3"
          >
            <div className="flex items-end gap-2">
              <label htmlFor="chem-question" className="sr-only">
                Ask a chemistry question
              </label>
              <textarea
                id="chem-question"
                ref={inputRef}
                rows={1}
                value={input}
                maxLength={500}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    ask(input);
                  }
                }}
                placeholder="Ask about a topic on this site…"
                className="max-h-24 min-h-[2.25rem] flex-1 resize-none rounded-md border border-input bg-card px-3 py-2 text-[0.8125rem] text-foreground placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25"
              />
              <Button type="submit" size="icon" className="h-9 w-9 shrink-0" disabled={!input.trim() || busy} aria-label="Send question">
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
