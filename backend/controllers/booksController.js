import fetch from "node-fetch";
import Book from "../models/Book.js";

export const books = async (req, res) => {
  // const { gutenbergId } = req.params;
  const gutenbergId = Number(req.params.gutenbergId); // das ist die GutenbergId // umwandeln, weil in model als integer, aber aus req.params kommt string

  try {
    // buch holen
    const url = `https://www.gutenberg.org/files/${gutenbergId}/${gutenbergId}-0.txt`;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(404).json({
        error: "Buch wurde bei Gutenberg nicht gefunden.",
      });
    }

    let text = await response.text();

    // buch erst nach erfolgreichem gutenberg-check sichern // hier erst suchen
    let book = await Book.findOne({
      where: {
        gutenbergId,
      },
    });

    // wenn nicht vorhanden, dann speichern
    if (!book) {
      book = await Book.create({
        gutenbergId,
      });
    }

    // Kapitelanfang finden
    const chapterRegex = /(chapter\s+(one|\d+|i|v|x|first))/i;
    const match = text.match(chapterRegex);

    if (match && match.index !== undefined) {
      const index = match.index;
      text = text.slice(index); // alles davor entfernen
    }

    // In Absätze splitten
    const paragraphs = text.split("\n").filter((p) => p.trim() !== "");

    // In Chunks zu je 30 Absätzen
    const chunks = [];

    for (let i = 0; i < paragraphs.length; i += 30) {
      chunks.push(paragraphs.slice(i, i + 30).join("\n"));
    }

    res.json({ id: book.id, gutenbergId: book.gutenbergId, chunks });
  } catch (e) {
    console.error(e);

    res.status(500).json({ error: "Fehler beim Laden des Buchtexts" });
  }
};
