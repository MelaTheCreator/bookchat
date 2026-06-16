import express from "express";
import cors from "cors";
import booksRouter from "./routes/books.js";

const app = express();

app.use(cors()); // <-- erlaubt React-Zugriff
app.use(express.json());

app.use("/api/books", booksRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Backend läuft auf http://localhost:${port}`);
});
