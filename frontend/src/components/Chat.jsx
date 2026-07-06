import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";

export default function Chat({ bookId, chunkIndex }) {
  const { user } = useAuth();
  const userId = user?.id;
  const username = user?.username;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [warning, setWarning] = useState("");
  const [messageTimes, setMessageTimes] = useState([]);
  const wsRef = useRef(null);

  useEffect(() => {
    setMessages([]);
    const channel = `book-${bookId}-chunk-${chunkIndex}`;
    wsRef.current = new WebSocket(
      `wss://gutenread-4cle.onrender.com/?channel=${channel}`,
    );

    wsRef.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages((prev) => [...prev, msg]);
    };

    wsRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
    };
  }, [bookId, chunkIndex]);

  const sendMessage = () => {
    const now = Date.now();
    const windowMs = 10_000;
    const maxMessages = 5;
    const recent = messageTimes.filter((t) => now - t < windowMs);

    if (recent.length >= maxMessages) {
      setWarning("Slow down.");
      setTimeout(() => setWarning(""), 3000);
      return;
    }

    setMessageTimes([...recent, now]);
    if (!input.trim()) return;

    const msg = {
      userId,
      username,
      text: input,
      timestamp: now,
    };

    wsRef.current.send(JSON.stringify(msg));
    setInput("");
  };

  return (
    <div className="space-y-3 rounded-[32px] border border-slate-200 bg-white/90 p-4 shadow-sm">
      <button
        className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close Chat" : "Open Chat"}
      </button>

      {!isOpen ? (
        <div className="text-sm italic text-slate-500">Chat closed</div>
      ) : (
        <div className="flex h-[330px] flex-col gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900">Chat</h3>
          </div>

          {warning && (
            <div className="rounded-2xl bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
              {warning}
            </div>
          )}

          <div className="flex-1 overflow-y-auto rounded-3xl border border-slate-200 bg-slate-50 p-4">
            {messages.length === 0 ? (
              <p className="text-sm text-slate-500">
                Start a chat with other readers on the same page.
              </p>
            ) : (
              <div className="space-y-3">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className="space-y-1 rounded-3xl bg-white/90 p-3 shadow-sm"
                  >
                    <strong className="block text-sm text-slate-900">
                      {m.username}:
                    </strong>
                    <p className="text-sm leading-6 text-slate-700">{m.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <textarea
              className="flex-1 rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-amber-100"
              value={input}
              rows={1}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write a message..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button
              className="whitespace-nowrap rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
