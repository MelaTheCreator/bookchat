import { useEffect, useState } from "react";

export default function ContinueReading({ onSelect }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInProgressBooks();
  }, []);

  const loadInProgressBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/progress", {
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

  if (loading) {
    return <div className="continue-reading">Loading...</div>;
  }

  return (
    <div className="continue-reading">
      <h3>My books: </h3>

      {books.length === 0 ? (
        <p className="continue-reading-empty">
          you havent startet a book, choose one from the seach.
        </p>
      ) : (
        <div className="continue-reading-list">
          {books.map((book) => (
            <div
              key={book.id}
              className="continue-reading-item"
              onClick={() => onSelect(book)}
            >
              <div className="continue-reading-title">
                {book.title || `Book #${book.gutenbergId}`}
              </div>
              <div className="continue-reading-info">
                <span className="continue-reading-author">
                  {book.author || "Unknown author"}
                </span>
                <span className="continue-reading-progress">
                  Section: {book.currentChunk + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
