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
    <div style={styles.sidebar}>
      <h3>Books</h3>
      <input
        type="text"
        placeholder="search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />

      {books.map((book) => (
        <div
          key={book.id}
          style={styles.bookItem}
          onClick={() => onSelect(book)}
        >
          {book.title}
        </div>
      ))}
    </div>
  );
}

const styles = {
  sidebar: {
    width: "250px",
    padding: "1rem",
    background: "#ee1fa980",
    borderRadius: "10px",
    height: "100%",
  },
  searchInput: {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxSizing: "border-box",
  },
  bookItem: {
    padding: "0.5rem",
    marginBottom: "0.5rem",
    background: "white",
    border: "1px solid #ddd",
    cursor: "pointer",
  },
};
