import { useState } from "react";
import { API_URL } from "../config.js";

const BASE_URL = API_URL;

export default function AIChat({ bookId, chunkIndex, chunkText }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          message: input,
          bookId,
          chunkIndex,
          chunkText,
        }),
      });

      const data = await res.json();
      const botMessage = { role: "assistant", content: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = { role: "assistant", content: "An error occured." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setInput("");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3 rounded-[32px] border border-slate-200 bg-white/90 p-4 shadow-sm">
      <button
        className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close AI Chat" : "Open AI Chat"}
      </button>

      {!isOpen ? (
        <div className="text-sm italic text-slate-500">AI chat closed</div>
      ) : (
        <div className="flex h-[330px] flex-col gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900">AI Chat</h3>
          </div>

          <div className="flex-1 overflow-y-auto rounded-3xl border border-slate-200 bg-slate-50 p-4">
            {messages.length === 0 ? (
              <p className="text-sm text-slate-500">Ask a question.</p>
            ) : (
              <div className="space-y-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`rounded-3xl p-4 shadow-sm ${
                      msg.role === "assistant"
                        ? "bg-amber-50 text-slate-900"
                        : "bg-white text-slate-800"
                    }`}
                  >
                    <p className="text-sm font-semibold text-slate-900">
                      {msg.role === "assistant" ? "AI" : "You"}:
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {msg.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-3">
            <textarea
              className="flex-1 rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-amber-100"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={1}
              placeholder="Ask me ..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <button
              className="whitespace-nowrap rounded-3xl bg-[var(--color-yellow)] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[var(--color-yellow-80)] disabled:cursor-not-allowed disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading…" : "Send"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
