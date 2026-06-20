// ReadingProgress-Controller

// Dieser Controller verwaltet den Lesefortschritt der User:innen. Für jedes Buch wird gespeichert, an welchem Abschnitt (Chunk) zuletzt gelesen wurde. Die User:innen-ID wird dabei aus dem JWT über die Auth Middleware bereit gestellt. Funktionen:

// 1. Lesefortschritt eines Buches abrufen
// 2. Lesefortschritt speichern oder aktualisieren

import ReadingProgress from "../models/ReadingProgress";
import Book from "../models/Book";

// Fortschritt eines Books laden
export const getProgress = async (req, res) => {
  try {
    // user aus dem verzifizierten JWT aus Middleware holen
    const userId = req.user.userId;
    // book-id aus url-Parametern holen
    const { bookId } = req.params;

    // prüfen, ob das angefragte Buch überhaupt existiert
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({
        msg: "Das Buch wurde nicht gefunden.",
      });
    }

    // wenn Buch gefunden, Fortschritt für User:in und Buch suchen
    const progress = await ReadingProgress.findOne({
      where: {
        userId,
        bookId,
      },
    });

    // Falls es noch keinen Fortschritt gibt, wird by default bei Chunk 0 begonnen
    res.json({
      currentChunk: progress?.currentChunk ?? 0,
    });
  } catch (e) {
    console.error(e);

    res.status(500).json({
      msg: "Es ist ein Fehler beim Laden des Fortschritts aufgetreten.",
    });
  }
};

// Fortschritt speichern bzw. aktualisiern
export const saveProgress = async (req, res) => {
  try {
    // userId wieder aus middleware / jwt holen // also uuid
    const userId = req.user.userId;

    // Buch-ID und aktueller Lesestand aus dem Request lesen
    const { bookId, currentChunk } = req.body; // FE muss sie im body mitsenden aufgrund der Route

    // Prüfen, ob das Buch schon in DB existiert
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({
        msg: "Das Buch wurde nicht gefunden.",
      });
    }

    // Vorhandenen Fortschritt für User:in und Buch suchen
    let progress = await ReadingProgress.findOne({
      where: {
        userId,
        bookId,
      },
    });

    // wenn noch kein Fortschritt vorhanden, neuen anlegen
    if (!progress) {
      progress = await ReadingProgress.create({
        userId,
        bookId,
        currentChunk,
      });
    } else {
      // bestehenden Fortschritt aktualisieren // falls User:in also weiter liest, wird hier der currentChunk mit dem progress.currentChunk überschrieben
      progress.currentChunk = currentChunk;

      // in DB speichern
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
