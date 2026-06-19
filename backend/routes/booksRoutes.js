import express from "express";
import { checkAuth } from "../middleware/checkAuth";
import { books } from "../controllers/booksController";

const router = express.Router();

router.get("/:id/text", checkAuth, books);

export default router;
