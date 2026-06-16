import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/:id/text", async (req, res) => {
  const { id } = req.params;

  try {
    // Gutenberg-URL
    const url = `https://www.gutenberg.org/files/${id}/${id}-0.txt`;

    const response = await fetch(url);
    const text = await response.text();

    // Text in Abschnitte zu je 3 Absätzen splitten
    const paragraphs = text.split("\n");
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
