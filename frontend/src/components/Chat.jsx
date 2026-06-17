import { useEffect, useState, useRef } from "react";

export default function Chat({ bookId, chunkIndex }) {
  const userId = "user-123";
  const username = "Mela";

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

    wsRef.current = new WebSocket(`ws://localhost:3000/?channel=${channel}`);

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
    <div style={styles.wrapper}>
      {/* Toggle Button */}
      <button style={styles.toggleBtn} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Chat einklappen" : "Chat ausklappen"}
      </button>

      {/* Wenn geschlossen */}
      {!isOpen && <div style={styles.closedInfo}>Chat ist eingeklappt</div>}

      {/* Wenn offen */}
      {isOpen && (
        <div style={styles.chatBox}>
          <h3 style={styles.title}>Chat</h3>

          {/* Warnung */}
          {warning && <div style={styles.warning}>{warning}</div>}

          <div style={styles.messages}>
            {messages.map((m, i) => (
              <div key={i} style={styles.message}>
                <strong>{m.username}:</strong> {m.text}
              </div>
            ))}
          </div>

          <div style={styles.inputRow}>
            <input
              style={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nachricht eingeben..."
            />
            <button onClick={sendMessage}>send</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: "300px",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
  },
  toggleBtn: {
    marginBottom: "0.5rem",
    padding: "0.5rem",
    cursor: "pointer",
  },
  closedInfo: {
    fontStyle: "italic",
    color: "#666",
  },
  chatBox: {
    backgroundColor: "#e9e9ed",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    height: "30%",
  },
  title: {
    textAlign: "center",
    marginBottom: "0.5rem",
  },
  warning: {
    background: "#ffe08a",
    color: "#7a4e00",
    padding: "0.5rem",
    borderRadius: "4px",
    marginBottom: "0.5rem",
    textAlign: "center",
    fontWeight: "bold",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    marginBottom: "1rem",
    background: "#f7f7f7",
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  message: {
    marginBottom: "0.5rem",
  },
  inputRow: {
    display: "flex",
    gap: "0.5rem",
  },
  input: {
    flex: 1,
  },
};
