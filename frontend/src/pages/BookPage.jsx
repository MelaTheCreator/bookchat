import { useState } from "react";
import BookList from "../components/BookList";
import Chat from "../components/Chat";
import AIChat from "../components/AiChat";

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
  const currentChunkText = chunks.length > 0 ? chunks[currentIndex] : "no text";

  return (
    <div className="bookpage-container">
      <BookList onSelect={loadBookText} />

      <div className="bookpage-content">
        {!selectedBook && (
          <p className="bookpage-empty">Please select a book.</p>
        )}

        {selectedBook && (
          <>
            <h2 className="bookpage-title">{selectedBook.title}</h2>

            <div className="bookpage-readerbox">
              <div className="bookpage-text">{chunks[currentIndex]}</div>
            </div>

            <div className="bookpage-nav">
              <button
                className="bookpage-button"
                onClick={prevChunk}
                disabled={currentIndex === 0}
              >
                back
              </button>

              <span className="bookpage-progress">
                section {currentIndex + 1} / {chunks.length}
              </span>

              <button
                className="bookpage-button"
                onClick={nextChunk}
                disabled={currentIndex === chunks.length - 1}
              >
                next
              </button>
            </div>
          </>
        )}
      </div>
      <div>
        {selectedBook && (
          <Chat bookId={selectedBook.id} chunkIndex={currentIndex} />
        )}
        {selectedBook && (
          <AIChat
            bookId={selectedBook.id}
            chunkIndex={currentIndex}
            chunkText={currentChunkText}
          />
        )}
      </div>
    </div>
  );
}
