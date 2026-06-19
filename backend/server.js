import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import db from "./libs/db.js";
import "./models/associations.js";

import { initWebSocketServer } from "./websocket/wsServer.js";

import authRouter from "./routes/authRoutes.js";
import booksRouter from "./routes/booksRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // damit cookies wirklich mitgeschickt werden
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/books", booksRouter);
app.use("/api", aiRouter);

await db.sync({ alter: true }); // oder force?

const server = app.listen(PORT, () => {
  console.log(`Backend läuft auf http://localhost:${PORT}`);
});

initWebSocketServer(server);
