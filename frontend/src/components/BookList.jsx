import { useEffect, useState } from "react";

export default function BookList({ onSelect }) {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  // Suche mit Debounce
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
          .finally(() => {
            setLoading(false);
          });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="booklist-sidebar bg-[var(--color-accent)] text-[var(--color-text)]">
      <h3 className="text-2xl">Books</h3>
      <input
        type="text"
        placeholder="search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="booklist-search-input"
      />
      {/* Loading Indicator */}
      {loading && <div className="loading-spinner">Loading ...</div>}

      {!loading &&
        books.map((book) => (
          <div
            key={book.id}
            className="booklist-book-item"
            onClick={() => onSelect(book)}
          >
            {book.title}
          </div>
        ))}
    </div>
  );
}
