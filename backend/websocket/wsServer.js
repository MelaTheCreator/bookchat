// WebSocket-Server importieren
import { WebSocketServer } from "ws";
import url from "url";

// Diese Funktion wird in server.js aufgerufen
export function initWebSocketServer(server) {
  // WebSocket-Server an denselben HTTP-Server hängen
  const wss = new WebSocketServer({ server });

  // Channels speichern alle Clients pro Buch/Abschnitt
  const channels = {};

  wss.on("connection", (ws, req) => {
    // Channel aus der URL lesen
    // Beispiel: ws://localhost:3000/ws?channel=book-1-chunk-0
    const query = url.parse(req.url, true).query;
    const channel = query.channel || "default";

    console.log("Neuer Client im Channel:", channel);

    // Channel anlegen, falls nicht vorhanden
    if (!channels[channel]) {
      channels[channel] = [];
    }

    // Client in Channel eintragen
    channels[channel].push(ws);

    // Nachricht empfangen
    ws.on("message", (data) => {
      const msg = JSON.parse(data);

      console.log("Nachricht erhalten:", msg);

      // Nachricht an alle Clients im gleichen Channel senden
      channels[channel].forEach((client) => {
        if (client.readyState === 1) {
          client.send(JSON.stringify(msg));
        }
      });
    });

    // Client trennt Verbindung
    ws.on("close", () => {
      console.log("Client getrennt:", channel);

      // Client aus Channel entfernen
      channels[channel] = channels[channel].filter((c) => c !== ws);

      // Wenn Channel leer → löschen
      if (channels[channel].length === 0) {
        delete channels[channel];
      }
    });
  });

  console.log("WebSocket-Server läuft über /ws");
}
