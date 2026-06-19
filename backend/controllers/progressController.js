import ReadingProgress from "../models/ReadingProgress";
import Book from "../models/Book";

// Fortschritt laden
export const getProgress = async (req, res) => {
  try {
    // user holen
    const userId = req.user.id; // bekomme ich aus middleware
    // book-id aus url holen
    const { bookId } = req.params;

    // prüfen, ob buch überhaupt existiert
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({
        msg: "Das Buch wurde nicht gefunden.",
      });
    }

    // wenn buch gefunden, fortschritt suchen
    const progress = await ReadingProgress.findOne({
      where: {
        userId,
        bookId,
      },
    });

    res.json({
      currentChunk: progress?.currentChunk ?? 0, // wenn es keinen fortschritt gibt, starte bei chunk 0
    });
  } catch (e) {
    console.error(e);

    res.status(500).json({
      msg: "Es ist ein Fehler beim Laden des Fortschritts aufgetreten.",
    });
  }
};

export const saveProgress = async (req, res) => {
  try {
    // user aus middleware / jwt holen // also uuid
    const userId = req.user.id;

    const { bookId, currentChunk } = req.body; // warum ist das buch im body?

    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({
        msg: "Das Buch wurde nicht gefunden.",
      });
    }

    // fortschritt suchen
    let progress = await ReadingProgress.findOne({
      where: {
        userId,
        bookId,
      },
    });

    // wenn keiner da ist, einen fortschritt erstellen
    if (!progress) {
      progress = await ReadingProgress.create({
        userId,
        bookId,
        currentChunk,
      });
    } else {
      // falls user weiter liest, überschreibe ich hier den currentChunk mit dem progress.currentChunk
      progress.currentChunk = currentChunk;
      // in db speichern
      await progress.save();
    }

    // console.log(progress); // hier ist id, userId, bookId und churrentChunk enhalten

    res.json(progress);
  } catch (e) {
    console.error(e);

    res.status(500).json({
      msg: "Es ist ein Fehler beim Speichern des Fortschritts aufgetreten.",
    });
  }
};
