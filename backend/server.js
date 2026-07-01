import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import db from "./libs/db.js";
import "./models/associations.js";

import { initWebSocketServer } from "./websocket/wsServer.js";

import authRouter from "./routes/authRoutes.js";
import booksRouter from "./routes/booksRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";

const PORT = process.env.PORT || 3000;
const ORIGIN = process.env.ORIGIN;
const app = express();

console.log({ ORIGIN });

app.use(
  cors({
    origin: ORIGIN,
    credentials: true, // damit cookies wirklich mitgeschickt werden
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/books", booksRouter);
app.use("/api", aiRouter); // hier noch als api/ai vereinheitlichen?
app.use("/api/progress", progressRoutes);

await db.sync({ alter: true }); // bei force wird Database komplett neu erstellt

const server = app.listen(PORT, () => {
  console.log(`Backend läuft auf http://localhost:${PORT}.`);
});

initWebSocketServer(server);
