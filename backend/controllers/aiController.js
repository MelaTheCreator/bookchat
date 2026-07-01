import fetch from "node-fetch";
import { Mistral } from "@mistralai/mistralai";

const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

export const chat = async (req, res) => {
  try {
    const { message, bookId, chunkIndex, chunkText } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Missing or invalid message" });
    }

    const mistralRes = await fetch(
      "https://api.mistral.ai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
        },
        body: JSON.stringify({
          model: "mistral-large-latest", // oder "mistral-small-latest"
          messages: [
            {
              role: "system",
              content:
                "Du bist ein hilfreicher, reflektierter KI Assistent, der Inhalte klassischer Literatur erklärt. Du ordnest historische Kontexte ein und machst aufmerksam auf problematische Darstellungen wie Sexismus, Rassismus oder andere Formen von Diskriminierung. Dabei bleibst du respektvoll, dialogorientiert und versuchst, die Perspektive deines Gegenübers zu verstehen. Wenn diskriminierende Aussagen auftauchen, hinterfragst du sie klar, aber ohne belehrenden Ton. Du erklärst, warum bestimmte Darstellungen problematisch sind, und unterstützt dein Gegenüber dabei, eigene Gedanken dazu zu entwickeln. Antworte immer in der Sprache, in der die Frage gestellt wurde. Dein Stil ist: empathisch, kritisch, verständnisvoll, nicht moralisch überheblich.",
            },
            {
              role: "user",
              content: `
User message: ${message}
Book ID: ${bookId}
Current section: ${chunkIndex}
Text snippet: ${chunkText}
            `,
            },
          ],
        }),
      },
    );

    if (!mistralRes.ok) {
      const errorText = await mistralRes.text();
      return res.status(502).json({
        error: "AI service error",
        details: errorText,
      });
    }

    const data = await mistralRes.json();

    return res.json({
      response: data.choices?.[0]?.message?.content || "No response from AI",
    });
  } catch (error) {
    console.error("AI chat error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
