import { useEffect, useState } from "react";

export default function BookList({ onSelect }) {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        setLoading(true);
        fetch(
          `https://gutendex.com/books/?search=${encodeURIComponent(searchTerm)}`,
        )
          .then((res) => res.json())
          .then((data) => {
            setBooks(data.results.slice(0, 5));
          })
          .finally(() => setLoading(false));
      } else {
        setBooks([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="space-y-4 rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-2xl font-semibold text-slate-900">Books</h3>
        <span className="text-sm text-slate-500">search</span>
      </div>

      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-amber-100"
      />

      {loading ? (
        <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-500">
          Loading ...
        </div>
      ) : books.length === 0 ? (
        <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-500">
          Search for a book to begin.
        </div>
      ) : (
        <div className="space-y-3">
          {books.map((book) => (
            <button
              key={book.id}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm text-slate-900 transition hover:border-slate-300 hover:bg-slate-100"
              onClick={() => onSelect(book)}
              type="button"
            >
              {book.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
