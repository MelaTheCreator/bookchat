// Book-Controller

// Dieser Controller lädt Buchtexte aus der Gutenberg API. Nach dem Abrufen wird geprüft, ob das Buch bereits in unserer lokalen Datenbank gespeichert ist. Falls nicht, wird ein
// neuer Datensatz angelegt.

// Der Buchtext wird anschließend aufbereitet:
// 1. Vorspann vor dem ersten Kapitel entfernen
// 2. In Absätze aufteilen
// 3. In Chunks zu je 30 Absätzen gruppieren (Die Chunks werden an das FE zurückgegeben, damit längere Texte abschnittsweise gelesen werden können.)

import fetch from "node-fetch";
import Book from "../models/Book.js";

export const books = async (req, res) => {
  // const { gutenbergId } = req.params;

  // GutenbergId aus der URL lesen und in Zahl umwandeln, weil in Model so festgelegt
  const gutenbergId = Number(req.params.gutenbergId);

  try {
    // URL des Buchtextes bei Gutenberg erstellen
    const url = `https://www.gutenberg.org/files/${gutenbergId}/${gutenbergId}-0.txt`;

    const response = await fetch(url);

    // Prüfen, ob das Buch bei Gutenberg existiert
    if (!response.ok) {
      return res.status(404).json({
        error: "Buch wurde bei Gutenberg nicht gefunden.",
      });
    }

    // vollständigen Buchtext laden
    let text = await response.text();

    const title = req.query.title || null;
    const author = req.query.author || null;

    // Buch in DB suchen
    let book = await Book.findOne({
      where: {
        gutenbergId,
      },
    });

    // wenn Buch noch nicht vorhanden, dann speichern
    if (!book) {
      book = await Book.create({
        gutenbergId,
        title,
        author,
      });
    } else {
      // Falls wir neue Metadaten erhalten, aktualisieren wir sie
      let updated = false;
      if (title && book.title !== title) {
        book.title = title;
        updated = true;
      }
      if (author && book.author !== author) {
        book.author = author;
        updated = true;
      }
      if (updated) {
        await book.save();
      }
    }

    // Kapitelanfang finden, um Vorworte etc. zu enfernen
    const chapterRegex = /(chapter\s+(one|\d+|i|v|x|first))/i;
    const match = text.match(chapterRegex);

    if (match && match.index !== undefined) {
      const index = match.index;

      // alles vor Kapitel 1 entfernen
      text = text.slice(index);
    }

    // In Absätze splitten
    const paragraphs = text.split("\n").filter((p) => p.trim() !== "");

    // In Chunks zu je 30 Absätzen zusammenfassen
    const chunks = [];

    for (let i = 0; i < paragraphs.length; i += 30) {
      chunks.push(paragraphs.slice(i, i + 30).join("\n"));
    }

    // Buchinfos und Chunks zurückgeben
    res.json({ id: book.id, gutenbergId: book.gutenbergId, chunks });
  } catch (e) {
    console.error(e);

    res.status(500).json({ error: "Fehler beim Laden des Buchtexts" });
  }
};
