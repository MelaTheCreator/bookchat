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
      await fetch(`${BASE_URL}/api/progress`, {
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
    const gutenbergId = book.gutenbergId || book.id;
    const author = book.author || book.authors?.[0]?.name || "";

    const response = await fetch(
      `${BASE_URL}/api/books/${gutenbergId}/text?title=${encodeURIComponent(
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

    const bookWithUUID = { ...book, id: data.id };
    setSelectedBook(bookWithUUID);

    try {
      const progressRes = await fetch(`${BASE_URL}/api/progress/${data.id}`, {
        credentials: "include",
      });
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
      selectedBook && saveProgress(selectedBook.id, newIndex);
    }
  };

  const prevChunk = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      selectedBook && saveProgress(selectedBook.id, newIndex);
    }
  };

  const currentChunkText = chunks.length > 0 ? chunks[currentIndex] : "no text";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(260px,320px)_1fr_minmax(320px,380px)]">
      <div className="space-y-6">
        <BookList onSelect={loadBookText} />
        <ContinueReading onSelect={loadBookText} />
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-sm">
        {!selectedBook ? (
          <div className="flex items-center justify-center   p-8 text-center text-slate-600">
            Please select a book.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                {selectedBook.title}
              </h2>
              <p className="text-sm text-slate-500">
                {selectedBook.author ||
                  selectedBook.authors?.[0]?.name ||
                  "Unknown author"}
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-[var(--color-yellow-soft)] p-6 shadow-inner">
              <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-900 leading-7">
                {chunks[currentIndex]}
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <button
                className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={prevChunk}
                disabled={currentIndex === 0}
              >
                Back
              </button>

              <span className="text-sm font-medium text-slate-600">
                Section {currentIndex + 1} / {chunks.length}
              </span>

              <button
                className="rounded-full bg-[var(--color-yellow)] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[var(--color-yellow-80)] disabled:cursor-not-allowed disabled:opacity-50"
                onClick={nextChunk}
                disabled={currentIndex === chunks.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
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
