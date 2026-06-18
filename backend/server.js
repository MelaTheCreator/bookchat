import express from "express";
import cors from "cors";

import db from "./libs/db.js";
import "./models/associations.js";

import { initWebSocketServer } from "./websocket/wsServer.js";

import authRouter from "./routes/auth.js";
import booksRouter from "./routes/books.js";
import aiRouter from "./routes/ai.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/books", booksRouter);
app.use("/api", aiRouter);

await db.sync({ force: true }); // oder alter?

const server = app.listen(PORT, () => {
  console.log(`Backend läuft auf http://localhost:${PORT}`);
});

initWebSocketServer(server);
