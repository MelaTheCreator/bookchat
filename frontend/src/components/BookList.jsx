import { useEffect, useState } from "react";

export default function BookList({ onSelect }) {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Suche mit Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        fetch(
          `https://gutendex.com/books/?search=${encodeURIComponent(searchTerm)}`,
        )
          .then((res) => res.json())
          .then((data) => {
            setBooks(data.results.slice(0, 5));
          });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="booklist-sidebar">
      <h3>Books</h3>
      <input
        type="text"
        placeholder="search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="booklist-search-input"
      />

      {books.map((book) => (
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
