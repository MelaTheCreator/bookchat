import express from "express";
import fetch from "node-fetch";
import { checkAuth } from "../middleware/checkAuth";

const router = express.Router();

router.get("/:id/text", checkAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const url = `https://www.gutenberg.org/files/${id}/${id}-0.txt`;

    const response = await fetch(url);
    let text = await response.text();

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

    res.json({ chunks });
  } catch (err) {
    res.status(500).json({ error: "Fehler beim Laden des Buchtexts" });
  }
});

export default router;
