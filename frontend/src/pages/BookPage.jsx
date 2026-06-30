import { useState, useEffect } from "react";
import BookList from "../components/BookList";
import ContinueReading from "../components/ContinueReading";
import Chat from "../components/Chat";
import AIChat from "../components/AiChat";
import { API_URL } from "../config.js";

const BASE_URL = API_URL;

export default function BookPage() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const saveProgress = async (bookId, chunkIndex) => {
    try {
      await fetch(`${BASE_URL}/api/progress"`, {
        // "https://gutenread-4cle.onrender.com/api/progress"
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ bookId, currentChunk: chunkIndex }),
      });
    } catch (err) {
      console.error("Fehler beim Speichern des Fortschritts:", err);
    }
  };

  const loadBookText = async (book) => {
    // Gutenberg-ID bestimmen (von Gutendex oder von Backend)
    const gutenbergId = book.gutenbergId || book.id;

    const author = book.author || book.authors?.[0]?.name || "";
    const response = await fetch(
      `${BASE_URL}/api/books/${gutenbergId}/text?title=${encodeURIComponent(
        // `https://gutenread-4cle.onrender.com/api/books/${gutenbergId}/text?title=${encodeURIComponent(...
        book.title,
      )}&author=${encodeURIComponent(author)}`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) {
      setChunks(["Fehler beim Laden des Buchtexts"]);
      return;
    }

    const data = await response.json();
    setChunks(data.chunks || ["Kein Text verfügbar"]);

    // Backend gibt die korrekte UUID zurück – diese muss für Progress verwendet werden
    const bookWithUUID = { ...book, id: data.id };
    setSelectedBook(bookWithUUID);

    // Fortschritt vom Backend laden (mit der korrekten UUID)
    try {
      const progressRes = await fetch(
        `${BASE_URL}/api/progress/${data.id}`, // https://gutenread-4cle.onrender.com/api/progress/${data.id}
        {
          credentials: "include",
        },
      );
      if (progressRes.ok) {
        const progressData = await progressRes.json();
        const savedChunk = progressData.currentChunk || 0;
        setCurrentIndex(Math.min(savedChunk, (data.chunks || []).length - 1));
      } else {
        setCurrentIndex(0);
      }
    } catch (err) {
      console.error("Fehler beim Laden des Fortschritts:", err);
      setCurrentIndex(0);
    }
  };

  const nextChunk = () => {
    if (currentIndex < chunks.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      if (selectedBook) {
        saveProgress(selectedBook.id, newIndex);
      }
    }
  };

  const prevChunk = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      if (selectedBook) {
        saveProgress(selectedBook.id, newIndex);
      }
    }
  };
  const currentChunkText = chunks.length > 0 ? chunks[currentIndex] : "no text";

  return (
    <div className="bookpage-container">
      <div>
        <BookList onSelect={loadBookText} />
        <ContinueReading onSelect={loadBookText} />
      </div>
      <div className="bookpage-content">
        {!selectedBook && (
          <p className="bookpage-empty"> Please select a book.</p>
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
