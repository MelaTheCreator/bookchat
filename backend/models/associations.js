import Book from "./Book";
import User from "./User";
import ReadingProgress from "./ReadingProgress";

// Book - User = n:m
// ein:e User:in kann mehrere Bücher lesen, ein Buch kann von mehreren User:innen gelesen werden
// jetzt mit zusätzlichem Feld currentChapter (festgelegt im Model ReadingProgress)
User.belongsToMany(Book, { through: ReadingProgress });
Book.belongsToMany(User, { through: ReadingProgress });

// ReadingProgress ist Association mit eigenen Daten
