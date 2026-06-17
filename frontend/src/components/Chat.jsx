import { useEffect, useState, useRef } from "react";

export default function Chat({ bookId, chunkIndex }) {
  // Platzhalter – später ersetzt du das durch echte Login-Daten
  const userId = "user-123";
  const username = "Max";

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const wsRef = useRef(null);

  useEffect(() => {
    setMessages([]);
    // Channel eindeutig pro Buch + Abschnitt
    const channel = `book-${bookId}-chunk-${chunkIndex}`;

    // WebSocket-Verbindung öffnen
    wsRef.current = new WebSocket(`ws://localhost:3000/?channel=${channel}`);

    wsRef.current.onopen = () => {
      console.log("WebSocket verbunden:", channel);
    };

    wsRef.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages((prev) => [...prev, msg]);
    };

    wsRef.current.onclose = () => {
      console.log("WebSocket geschlossen");
    };

    // Verbindung schließen, wenn Abschnitt oder Buch wechselt
    return () => {
      wsRef.current.close();
    };
  }, [bookId, chunkIndex]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const msg = {
      userId,
      username,
      text: input,
      timestamp: Date.now(),
    };

    wsRef.current.send(JSON.stringify(msg));
    setInput("");
  };

  return (
    <div style={styles.wrapper}>
      {/* Toggle Button */}
      <button style={styles.toggleBtn} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "close Chat" : "open Chat"}
      </button>

      {/* Wenn offen → Chat anzeigen */}
      {isOpen && (
        <div style={styles.chatBox}>
          <h3>Chat</h3>

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
            <button onClick={sendMessage}>Senden</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    width: "300px",
    borderLeft: "1px solid #ccc",
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
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    marginBottom: "1rem",
    background: "#f7f7f7",
    padding: "0.5rem",
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
