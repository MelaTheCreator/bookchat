import { useEffect, useState } from "react";
import { API_URL } from "../config.js";

const BASE_URL = API_URL;

export default function ContinueReading({ onSelect }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInProgressBooks();
  }, []);

  const loadInProgressBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/progress`, {
        credentials: "include",
      });

      if (!response.ok) {
        console.error("ContinueReading: API returned", response.status);
        setBooks([]);
        return;
      }

      const data = await response.json();
      setBooks(data);
    } catch (err) {
      console.error("Fehler beim Laden der Bücher:", err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-2xl font-semibold text-slate-900">My books</h3>
        {loading && <span className="text-sm text-slate-500">Loading…</span>}
      </div>

      {!loading && books.length === 0 ? (
        <p className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-500">
          You haven’t started a book yet. Choose one from the search.
        </p>
      ) : (
        <div className="space-y-3">
          {books.map((book) => (
            <button
              key={book.id}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-left text-sm text-slate-900 transition hover:border-slate-300 hover:bg-slate-100"
              onClick={() => onSelect(book)}
              type="button"
            >
              <div className="font-semibold text-slate-900">
                {book.title || `Book #${book.gutenbergId}`}
              </div>
              <div className="mt-2 flex flex-wrap gap-2 text-sm text-slate-500">
                <span>{book.author || "Unknown author"}</span>
                <span>Section: {book.currentChunk + 1}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
