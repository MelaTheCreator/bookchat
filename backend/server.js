import express from "express";
import cors from "cors";
import booksRouter from "./routes/books.js";
import aiRouter from "./routes/ai.js";

import { initWebSocketServer } from "./websocket/wsServer.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/books", booksRouter);
app.use("/api", aiRouter);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Backend läuft auf http://localhost:${port}`);
});

initWebSocketServer(server);
