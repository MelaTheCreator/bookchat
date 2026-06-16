import { useState } from "react";
import BookList from "../components/BookList";

export default function BookPage() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadBookText = async (book) => {
    setSelectedBook(book);
    setCurrentIndex(0);

    // Gutenberg liefert mehrere Formate – wir nehmen das Plaintext-Format
    const textUrl =
      book.formats["text/plain; charset=utf-8"] || book.formats["text/plain"];

    if (!textUrl) {
      setChunks(["Kein Text verfügbar"]);
      return;
    }

    const response = await fetch(
      `http://localhost:3000/api/books/${book.id}/text`,
    );

    if (!response.ok) {
      setChunks(["Fehler beim Laden des Buchtexts"]);
      return;
    }

    const data = await response.json();
    setChunks(data.chunks || ["Kein Text verfügbar"]);
  };

  const nextChunk = () => {
    if (currentIndex < chunks.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevChunk = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div style={styles.container}>
      <BookList onSelect={loadBookText} />

      <div style={styles.content}>
        {!selectedBook && <p>Bitte ein Buch auswählen.</p>}

        {selectedBook && (
          <>
            <h2>{selectedBook.title}</h2>

            <div style={styles.readerBox}>
              <pre style={styles.text}>{chunks[currentIndex]}</pre>
            </div>

            <div style={styles.nav}>
              <button onClick={prevChunk} disabled={currentIndex === 0}>
                Zurück
              </button>

              <span>
                Abschnitt {currentIndex + 1} / {chunks.length}
              </span>

              <button
                onClick={nextChunk}
                disabled={currentIndex === chunks.length - 1}
              >
                Weiter
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100%",
  },
  content: {
    flex: 1,
    padding: "2rem",
  },
  readerBox: {
    border: "1px solid #ccc",
    padding: "1rem",
    background: "#fafafa",
    minHeight: "300px",
    whiteSpace: "pre-wrap",
  },
  text: {
    fontFamily: "monospace",
    lineHeight: "20px",
    whiteSpace: "pre-wrap",
  },
  nav: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
