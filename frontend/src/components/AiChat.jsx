import { useState } from "react";

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
      const res = await fetch("http://localhost:3000/api/chat", {
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

      const botMessage = {
        role: "assistant",
        content: data.response,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        role: "assistant",
        content: "Upsi, an error occured.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setInput("");
      setLoading(false);
    }
  }

  return (
    <div className="chat-wrapper">
      <button className="chat-toggle-btn-ai" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "close AI Chat" : "open AI Chat"}
      </button>

      {!isOpen && <div className="chat-closed-info"></div>}

      {isOpen && (
        <div className="chat-box-ai">
          <h3 className="chat-title">AI Chat</h3>

          <div className="chat-messages">
            {messages.length === 0 && (
              <p className="chat-empty">Ask a question.</p>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-message ${
                  msg.role === "assistant" ? "assistant" : "user"
                }`}
              >
                <strong className="chat-username">
                  {msg.role === "assistant" ? "AI" : "You"}:
                </strong>
                <br />
                {msg.content}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="chat-input-row">
            <textarea
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={1}
              placeholder="ask me ..."
            />
            <button className="chat-button-ai" type="submit" disabled={loading}>
              {loading ? "loading…" : "send"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
