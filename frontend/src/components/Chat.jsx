import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";

export default function Chat({ bookId, chunkIndex }) {
  const { user } = useAuth();
  const userId = user?.id;
  const username = user?.username;

  console.log("Chat - user:", user);
  console.log("Chat - username:", username);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Chat ein-/ausklappen
  const [isOpen, setIsOpen] = useState(true);

  // Spam-Warnung
  const [warning, setWarning] = useState("");

  // Rate-Limit: Zeitstempel der letzten Nachrichten
  const [messageTimes, setMessageTimes] = useState([]);

  const wsRef = useRef(null);

  useEffect(() => {
    // Nachrichten löschen beim Channel-Wechsel
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

    // Rate-Limit: 5 Nachrichten in 10 Sekunden
    const windowMs = 10_000;
    const maxMessages = 5;
    const recent = messageTimes.filter((t) => now - t < windowMs);

    if (recent.length >= maxMessages) {
      setWarning("slow down.");

      // Warnung nach 3 Sekunden ausblenden
      setTimeout(() => setWarning(""), 3000);

      return;
    }

    // Zeitstempel hinzufügen
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
    <div className="chat-wrapper">
      {/* Toggle Button */}
      <button className="chat-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "close Chat" : "open Chat"}
      </button>

      {/* Wenn geschlossen */}
      {!isOpen && <div className="chat-closed-info"></div>}

      {/* Wenn offen */}
      {isOpen && (
        <div className="chat-box">
          <h3 className="chat-title">Chat</h3>

          {/* Warnung */}
          {warning && <div className="chat-warning">{warning}</div>}

          <div className="chat-messages">
            {messages.length === 0 && (
              <p className="chat-empty">
                Start a chat with other people, who are on the same page as you
                are.
              </p>
            )}
            {messages.map((m, i) => (
              <div key={i} className="chat-message">
                <strong className="chat-username">{m.username}:</strong>{" "}
                {m.text}
              </div>
            ))}
          </div>

          <div className="chat-input-row">
            <textarea
              className="chat-input"
              value={input}
              rows={1}
              onChange={(e) => setInput(e.target.value)}
              placeholder="write a message ..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button className="chat-button" onClick={sendMessage}>
              send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
