import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message, bookId, chunkIndex } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Missing or invalid message" });
    }

    const ollamaRes = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "phi3:mini",
        prompt: `User message: ${message}\nBook ID: ${bookId}\nCurrent section: ${chunkIndex}`,
        stream: false,
      }),
    });

    if (!ollamaRes.ok) {
      const errorText = await ollamaRes.text();
      return res
        .status(502)
        .json({ error: "AI service error", details: errorText });
    }

    const data = await ollamaRes.json();
    res.json({ response: data.response || "No response from AI" });
  } catch (error) {
    console.error("AI chat error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
